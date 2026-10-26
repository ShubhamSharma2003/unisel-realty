// Two OpenAI Responses API calls: research (hosted web search, free text)
// then write (structured output, no tools), so the article is drafted only
// from facts the research step found and sourced.

import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import * as z from "zod/v4";
import { format } from "date-fns";
import { normalizeUrl } from "./portable-text.mjs";

// Newest low-cost model as of Oct 2026 ($0.10 in / $0.50 out per 1M tokens).
const MODEL = process.env.AUTO_BLOG_MODEL || "gpt-6-luna";
// Web search is billed per call ($10 per 1,000), so cap it per run.
const MAX_SEARCH_CALLS = 15;
// Both calls run in background mode and are polled. A single HTTP request held
// open for minutes can stall silently and only fail at the client timeout.
const DEADLINE_MS = 30 * 60 * 1000;
const POLL_MS = 10 * 1000;

// Must match the `tag` values in src/lib/blogCategories.ts (the category pages).
export const TAGS = ["Market", "Infrastructure", "Policy", "Launches", "Legal", "NRI"];

let client;
// Every request is short (submit or poll), so a stalled one fails fast and the
// SDK retries just that request.
const openai = () => (client ??= new OpenAI({ timeout: 60 * 1000 }));

const RESEARCH_INSTRUCTIONS = `You are the research desk at Unisel Realty, a RERA-registered real estate advisory firm in Gurugram (Gurgaon), India. Each run you pick one recent news story about Gurugram real estate and research it, so a writer can turn it into an original, well-sourced analysis for home buyers, NRIs and investors.

Choosing the story:
- Pick the candidate most useful to someone buying, selling or investing in Gurugram property. When several are useful, prefer them in this order: new project launches and upcoming projects (HARERA registrations, launches, land bought for new housing); infrastructure that changes a micromarket (metro, expressways, roads); regulation (HARERA orders, stamp duty, circle rates, taxes, loans); then prices and sales data.
- Skip celebrity purchases, sponsored or promotional pieces, event listings, crime and accident reports, stories that are not really about Gurugram, and anything an already-published post covers.
- Skip any story whose main subject is a lawsuit, court case, criminal or regulatory proceeding, fraud allegation, insolvency, penalty, project delay or buyer complaint involving one of Unisel Realty's builder partners (listed in the input) or their group companies and associated brands. Positive or neutral news about partners, such as launches, deliveries and sales data, is fine.

Researching it:
- Use web search to find the original reporting, then at least one independent source. Prefer primary sources (HRERA orders, government notifications, developer filings, official data) where they exist.
- Open the key pages and read them. Do not rely on search snippets for figures.
- Add context a buyer needs: what happened before, the micromarket or sectors affected, price levels or timelines from recent reliable reporting.

Write the brief as plain text with these parts:
1. The story you chose and why it matters to buyers or investors.
2. Key facts. Give every fact its source URL. Quote figures exactly as reported, with their date.
3. Context, with source URLs.
4. What is unconfirmed, disputed or still unknown.
5. Gurugram micromarkets or sectors affected.
6. Source list: publisher, article title, URL. Only list pages you actually opened or saw in search results.

If none of the candidates is worth a full article, reply with exactly "SKIP: " followed by the reason, and nothing else.`;

const WRITER_INSTRUCTIONS = `You write for the Unisel Realty blog (uniselrealty.com), a Gurugram real estate advisory. Readers are home buyers, NRIs and investors weighing Gurugram (Gurgaon) property. You turn a research brief into one original article.

Substance:
- This is analysis, not a news rewrite. Cover what happened in one or two paragraphs, then spend most of the article on what it means: for prices, supply, timelines, which micromarkets and buyers it affects, the risks, and what a buyer should check or do next.
- Use only facts that are in the brief. Attribute every figure, date and claim inline and link to its source, for example: according to [Hindustan Times](https://...). Never invent numbers, quotes, project details or prices.
- Do not predict specific returns or price moves, promise outcomes, or call anything the "best investment". When something is unconfirmed, say so.
- Do not copy sentences from the sources. Write your own.

Voice:
- Write as Unisel Realty's research team: plain, specific and calm. Use "we" sparingly. No first-person anecdotes, no claimed years of experience, no hype, no exclamation marks.
- Indian English. Use the units and currency the sources use (₹, lakh, crore, sq ft). Say "Gurugram (Gurgaon)" once early on, then either name.
- Write as a finished article. Never mention the brief, the research, the links or these instructions.
- The intro and each section must say something new. Never repeat a paragraph.

Structure and SEO:
- title: 50 to 65 characters. Put "Gurugram" or "Gurgaon" and the main search phrase near the start. No clickbait, no year unless the story needs it.
- slug: lowercase words joined by hyphens, 4 to 8 words, no dates or stop words.
- metaDescription: 140 to 158 characters, contains the main search phrase, plain text.
- dek: one sentence, under 160 characters, shown under the title.
- tag: exactly one of ${TAGS.join(", ")}. Use Launches for any story about a new or upcoming project.
- micromarket: the key of the most affected micromarket from the list you are given, or "gurugram" if the story is citywide.
- intro: two paragraphs. The first two sentences must work alone as a summary of what happened and why it matters.
- sections: 4 to 6. Phrase headings as the questions people search for where it reads naturally. Each section body mixes paragraphs (40 to 90 words each) with bullets where a list helps.
- faqs: 3 or 4 questions a buyer would ask. Each answer is 40 to 70 words and makes sense on its own.
- sources: every external page you linked, with publisher, article title and URL exactly as in the brief.
- Total length 900 to 1,300 words, excluding sources.

Links and markup:
- Add 2 to 4 internal links from the list you are given, only where they help the reader, with descriptive anchor text. Use the path exactly as listed, starting with "/". For a story about a launch or upcoming project, one of them should be /residential/new-launch.
- External links only to URLs in the brief.
- Inside text fields, the only markup allowed is [anchor text](url) and **bold**. Do not nest them, and do not use any other Markdown.`;

const Article = z.object({
  title: z.string(),
  slug: z.string(),
  metaDescription: z.string(),
  dek: z.string(),
  tag: z.string().describe(`One of: ${TAGS.join(", ")}`),
  micromarket: z.string(),
  intro: z.array(z.string()),
  sections: z.array(
    z.object({
      heading: z.string(),
      body: z.array(
        z.object({
          type: z.string().describe('"paragraph" or "bullet"'),
          text: z.string(),
        }),
      ),
    }),
  ),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
  sources: z.array(z.object({ publisher: z.string(), title: z.string(), url: z.string() })),
});

const day = (d) => format(d, "MMM d, yyyy");

function logUsage(step, response) {
  const { usage } = response;
  const searches = response.output.filter((item) => item.type === "web_search_call").length;
  console.log(
    `${step} (${response.model}): ${usage.input_tokens} in (${usage.input_tokens_details?.cached_tokens ?? 0} cached), ` +
      `${usage.output_tokens} out (${usage.output_tokens_details?.reasoning_tokens ?? 0} reasoning)` +
      (searches ? `, ${searches} web search calls` : ""),
  );
}

function assertCompleted(response, step) {
  if (response.status !== "completed") {
    const reason = response.incomplete_details?.reason ?? response.error?.message ?? "no details";
    throw new Error(`${step}: response ${response.status} (${reason})`);
  }
}

/**
 * URLs the hosted search actually returned or opened, plus citation targets.
 * The model's own text is ignored, so a URL it made up never counts as a
 * source. Pages it asked to open count only if the call succeeded.
 */
function collectSeenUrls(output, seen) {
  const add = (url) => {
    const normalized = url && normalizeUrl(url);
    if (normalized) seen.add(normalized);
  };
  for (const item of output) {
    if (item.type === "web_search_call") {
      if (item.action?.type === "search") item.action.sources?.forEach((s) => add(s.url));
      else if (item.status === "completed") add(item.action?.url);
    } else if (item.type === "message") {
      for (const part of item.content) {
        if (part.type !== "output_text") continue;
        for (const a of part.annotations ?? []) if (a.type === "url_citation") add(a.url);
      }
    }
  }
}

export async function research({ headlines, recentPosts, partners, today }) {
  const candidates = headlines
    .map((h, i) => `${i + 1}. [${day(h.publishedAt)}] ${h.publisher}: ${h.title}`)
    .join("\n");
  const published = recentPosts.length
    ? recentPosts.map((p) => `- ${p.title} (${day(new Date(p.date))})`).join("\n")
    : "- None yet";

  const include = ["web_search_call.action.sources"];
  const response = await runInBackground("research", {
    model: MODEL,
    reasoning: { effort: "high" },
    instructions: RESEARCH_INSTRUCTIONS,
    input: `Today is ${day(today)}.\n\nCandidate headlines from Google News, last 7 days:\n${candidates}\n\nAlready published on uniselrealty.com. Do not repeat these stories:\n${published}\n\nUnisel Realty's builder partners (short names as stored in the CMS): ${partners.join(", ") || "none"}`,
    tools: [
      {
        type: "web_search",
        user_location: { type: "approximate", city: "Gurugram", region: "Haryana", country: "IN", timezone: "Asia/Kolkata" },
      },
    ],
    include,
    max_tool_calls: MAX_SEARCH_CALLS,
  });

  const brief = outputText(response);
  if (brief.startsWith("SKIP:")) return { skip: brief.slice(5).trim() };

  const seenUrls = new Set();
  collectSeenUrls(response.output, seenUrls);
  return { brief, seenUrls };
}

export async function write({ brief, internalLinks, today }) {
  const links = internalLinks.map((l) => `- ${l.path}: ${l.label}`).join("\n");
  const input = `Today is ${day(today)}.\n\nInternal pages you may link to:\n${links}\n\nResearch brief:\n\n${brief}`;

  // One retry covers the rare reply that does not match the schema.
  for (let attempt = 1; ; attempt++) {
    const response = await runInBackground("write", {
      model: MODEL,
      reasoning: { effort: "high" },
      instructions: WRITER_INSTRUCTIONS,
      input,
      text: { format: zodTextFormat(Article, "article") },
    });

    const refusal = response.output
      .flatMap((item) => (item.type === "message" ? item.content : []))
      .find((part) => part.type === "refusal");
    if (refusal) throw new Error(`write: model refused (${refusal.refusal})`);

    let problem;
    try {
      const parsed = Article.safeParse(JSON.parse(outputText(response)));
      if (parsed.success) return parsed.data;
      problem = parsed.error.message;
    } catch (err) {
      problem = `invalid JSON (${err.message})`;
    }
    if (attempt >= 2) throw new Error(`write: reply did not match the article schema: ${problem}`);
    console.warn(`warn: write reply did not match the schema; retrying`);
  }
}

const outputText = (response) =>
  response.output
    .filter((item) => item.type === "message")
    .flatMap((item) => item.content)
    .filter((part) => part.type === "output_text")
    .map((part) => part.text)
    .join("")
    .trim();

/** Submits a background response, polls until it finishes, and checks it completed. */
async function runInBackground(step, params) {
  let response = await openai().responses.create({ ...params, background: true });
  const started = Date.now();
  let lastLog = started;

  const pending = () => response.status === "queued" || response.status === "in_progress";
  while (pending()) {
    await new Promise((resolve) => setTimeout(resolve, POLL_MS));
    response = await openai().responses.retrieve(response.id, params.include ? { include: params.include } : {});
    // Checked after polling, so a job that finished while this machine was
    // asleep is used rather than cancelled.
    if (pending() && Date.now() - started > DEADLINE_MS) {
      await openai().responses.cancel(response.id).catch(() => {});
      throw new Error(`${step}: no result after ${DEADLINE_MS / 60000} minutes, cancelled`);
    }
    if (Date.now() - lastLog >= 60 * 1000) {
      console.log(`${step}: ${response.status}, ${Math.round((Date.now() - started) / 60000)} min so far`);
      lastLog = Date.now();
    }
  }

  logUsage(step, response);
  assertCompleted(response, step);
  return response;
}
