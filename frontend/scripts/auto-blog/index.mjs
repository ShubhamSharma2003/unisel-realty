// Automated blog: picks a recent Gurugram real-estate news story, has an
// OpenAI model research it and write an original, sourced analysis, then
// publishes it to Sanity with a generated cover image. See README.md here.
//
//   npm run blog:auto -- [--dry-run] [--draft] [--out <dir>]

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { format } from "date-fns";
import { fetchHeadlines } from "./news.mjs";
import { research, write, writeRoundup, TAGS } from "./openai.mjs";
import { articleToPortableText, countWords, normalizeUrl, stripMarkup, stripTracking, toHtml } from "./portable-text.mjs";
import { renderCover } from "./cover.mjs";
import * as sanity from "./sanity.mjs";

const SITE_URL = process.env.SITE_URL || "https://www.uniselrealty.com";
// Public by design: IndexNow verifies it against public/{key}.txt on the site.
const INDEXNOW_KEY = "f93e5c301ed3f5520d4c276fc63765a2";
const AUTHOR = process.env.BLOG_AUTHOR || "Unisel Realty";
const MIN_WORDS = 700;
const MIN_SECTIONS = 3;
const MIN_SOURCES = 2;
const MIN_ROUNDUP_WORDS = 600;
const MIN_ROUNDUP_PROJECTS = 3;

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const draft = args.includes("--draft") || process.env.PUBLISH_MODE === "draft";
const outRoot = args.includes("--out") ? args[args.indexOf("--out") + 1] : "auto-blog-output";

const STATIC_PAGES = [
  { path: "/residential", label: "Residential property in Gurgaon (buying guide and listings)" },
  { path: "/residential/new-launch", label: "New launch & upcoming projects in Gurgaon (RERA-registered list with prices)" },
  { path: "/residential/ready-to-move", label: "Ready-to-move homes" },
  { path: "/residential/under-construction", label: "Under-construction homes" },
  { path: "/commercial", label: "Commercial property in Gurgaon" },
  { path: "/commercial/pre-leased", label: "Pre-leased commercial property" },
  { path: "/location", label: "Gurgaon micromarkets overview" },
  { path: "/services/nri-property-investment-gurgaon", label: "NRI property investment in Gurgaon" },
  { path: "/services/home-loan-gurgaon", label: "Home loan assistance" },
  { path: "/services/property-management-gurgaon", label: "Property management" },
  { path: "/property-valuation", label: "Free property valuation tool" },
  { path: "/insights-report", label: "Gurgaon real estate insights report" },
  { path: "/contact", label: "Talk to a Unisel Realty advisor" },
];

/** Reads the micromarket keys from the site's routing source of truth. */
async function loadMicromarkets() {
  const source = await readFile(new URL("../../src/lib/micromarkets.ts", import.meta.url), "utf8");
  const found = [...source.matchAll(/"([a-z0-9-]+)":\s*\{[^}]*?displayName:\s*"([^"]+)"/g)].map(
    ([, slug, name]) => ({ slug, name }),
  );
  if (!found.length) throw new Error("No micromarkets found in src/lib/micromarkets.ts");
  return found;
}

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .slice(0, 80)
    .replace(/-+$/, "");

async function uniqueSlug(base) {
  for (let n = 1; ; n++) {
    const slug = n === 1 ? base : `${base}-${n}`;
    if (!(await sanity.query(sanity.slugTakenQuery, { slug }))) return slug;
  }
}

const SITE_HOST = new URL(SITE_URL).hostname.replace(/^www\./, "");

/**
 * A link to this site in any form the model writes ("/x", "x",
 * "https://uniselrealty.com/x") as a path, or null for other sites.
 */
function toLocalPath(href) {
  try {
    const url = new URL(href, SITE_URL);
    if (url.hostname.replace(/^www\./, "") !== SITE_HOST) return null;
    return url.pathname.replace(/(.)\/+$/, "$1");
  } catch {
    return null;
  }
}

/**
 * Quiet-week fallback: one roundup per month of our own registered launches.
 * The slug is fixed per month, so further quiet runs that month publish nothing.
 */
async function planRoundup({ today, internalLinks }) {
  const slug = `new-launch-projects-gurgaon-${format(today, "MMMM-yyyy").toLowerCase()}`;
  if (await sanity.query(sanity.slugTakenQuery, { slug })) {
    console.log(`This month's launch roundup (/blog/${slug}) already exists; nothing to publish.`);
    return null;
  }
  const projects = await sanity.query(sanity.newLaunchListingsQuery);
  if (projects.length < MIN_ROUNDUP_PROJECTS) {
    console.log(`Only ${projects.length} registered new launches listed; not enough for a roundup.`);
    return null;
  }
  console.log(`Writing the ${format(today, "MMMM yyyy")} launch roundup from ${projects.length} listings`);
  return {
    kind: "roundup",
    slug,
    article: await writeRoundup({ projects, internalLinks, today }),
    brief: `Monthly roundup of Unisel Realty's registered new launches:\n${projects.map((p) => `- ${p.name}`).join("\n")}`,
    seenUrls: new Set(),
  };
}

/** Meta descriptions over ~160 characters get truncated in results anyway. */
function clampDescription(text, max = 160) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[\s,;:.-]+$/, "")}…`;
}

async function revalidate(id) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.warn("warn: SANITY_REVALIDATE_SECRET not set; /blog, the homepage and the sitemap update on the next deploy");
    return;
  }
  // The post is already live at this point, so a failure here is only a warning.
  const res = await fetch(`${SITE_URL}/api/revalidate`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-sanity-webhook-secret": secret },
    body: JSON.stringify({ _ids: [id] }),
  }).catch((err) => ({ ok: false, status: err.message }));
  if (!res.ok) console.warn(`warn: revalidate returned ${res.status}`);
}

/** Tells Bing (which also feeds ChatGPT search) and other IndexNow engines about new URLs. */
async function pingIndexNow(urls) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  }).catch((err) => ({ ok: false, status: err.message }));
  if (!res.ok) console.warn(`warn: IndexNow returned ${res.status}`);
}

function previewPage(doc, coverFile) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${doc.title}</title>
<style>body{font:17px/1.6 system-ui,sans-serif;max-width:760px;margin:40px auto;padding:0 16px;color:#172023}img{width:100%;border-radius:16px}a{color:#0f7398}.meta{color:#5b6b70;font-size:14px}</style>
</head><body>
<p class="meta">${doc.tag} · /blog/${doc.slug.current} · ${doc.excerpt.length} char description</p>
<h1>${doc.title}</h1><p><strong>${doc.detail}</strong></p><p class="meta">Meta description: ${doc.excerpt}</p>
<img src="${coverFile}" alt="">
${toHtml(doc.content)}
</body></html>`;
}

async function main() {
  const today = new Date();
  if (!dryRun && !sanity.hasWriteToken()) {
    throw new Error("SANITY_API_WRITE_TOKEN is required to publish (or pass --dry-run)");
  }

  const [headlines, recentPosts, properties, micromarkets, authorImage, partners] = await Promise.all([
    fetchHeadlines(),
    sanity.query(sanity.recentPostsQuery),
    sanity.query(sanity.propertiesQuery),
    loadMicromarkets(),
    sanity.query(sanity.authorImageQuery),
    sanity.query(sanity.builderPartnersQuery),
  ]);
  console.log(`${headlines.length} headlines from the last 7 days, ${recentPosts.length} existing posts`);

  const internalLinks = [
    ...STATIC_PAGES,
    ...micromarkets.map((m) => ({ path: `/location/${m.slug}`, label: `${m.name}: micromarket guide and listings` })),
    ...properties.map((p) => ({
      path: `/properties/${p.slug}`,
      label: `${p.name} (${p.category ?? "property"}, ${p.micromarket ?? "Gurgaon"})`,
    })),
    ...recentPosts
      .filter((p) => p.slug && !p.draft)
      .map((p) => ({ path: `/blog/${p.slug}`, label: `Earlier post: ${p.title}` })),
  ];

  // Topics are limited to launches, project updates and major infrastructure.
  // A run with no such story falls back to the monthly launch roundup.
  const found = headlines.length
    ? await research({ headlines, recentPosts, partners, today })
    : { skip: "no recent headlines" };

  let piece;
  if (found.skip) {
    console.log(`No qualifying news story: ${found.skip}`);
    piece = await planRoundup({ today, internalLinks });
    if (!piece) return;
  } else {
    console.log(`\n--- research brief ---\n${found.brief}\n--- end brief ---\n`);
    piece = {
      kind: "news",
      article: await write({ brief: found.brief, internalLinks, today }),
      brief: found.brief,
      seenUrls: found.seenUrls,
    };
  }
  const { article } = piece;
  const isRoundup = piece.kind === "roundup";

  // Links survive only if they point at a real page on this site or at a
  // page the research step actually opened.
  const internalPaths = new Set(internalLinks.map((l) => l.path));
  const resolveHref = (href) => {
    const local = toLocalPath(href);
    if (local) return internalPaths.has(local) ? local : null;
    return /^https?:\/\//.test(href) && piece.seenUrls.has(normalizeUrl(href)) ? stripTracking(href).toString() : null;
  };

  const sourceKeys = new Set();
  const sources = article.sources.filter((s) => {
    const key = normalizeUrl(s.url);
    if (!key || sourceKeys.has(key) || !/^https?:\/\//.test(s.url) || !resolveHref(s.url)) return false;
    sourceKeys.add(key);
    return true;
  });

  const words = countWords(
    [
      ...article.intro,
      ...article.sections.flatMap((s) => [s.heading, ...s.body.map((b) => b.text)]),
      ...article.faqs.flatMap((f) => [f.question, f.answer]),
    ].join(" "),
  );
  const problems = [
    !isRoundup && sources.length < MIN_SOURCES && `${sources.length} verifiable source(s), need ${MIN_SOURCES}`,
    words < (isRoundup ? MIN_ROUNDUP_WORDS : MIN_WORDS) && `${words} words, need ${isRoundup ? MIN_ROUNDUP_WORDS : MIN_WORDS}`,
    article.sections.length < MIN_SECTIONS && `${article.sections.length} sections, need ${MIN_SECTIONS}`,
  ].filter(Boolean);
  if (problems.length) throw new Error(`Quality check failed, not publishing: ${problems.join("; ")}`);

  const tag = isRoundup ? "Launches" : TAGS.find((t) => t.toLowerCase() === article.tag.trim().toLowerCase()) ?? "Market";
  const micromarket = micromarkets.find((m) => m.slug === article.micromarket.trim());
  const dateLabel = format(today, "MMM d, yyyy");

  // Added by code, not the model, so every article ends the same way. Linking
  // the article's micromarket also steers the "related projects" box on the post.
  const cta = micromarket
    ? `**Considering ${micromarket.name}?** Our advisors can share current prices, floor plans and site-visit slots for projects there. [See projects on ${micromarket.name}](/location/${micromarket.slug}) or [talk to a Unisel Realty advisor](/contact).`
    : `**Planning a purchase in Gurgaon?** Our advisors can share current prices, floor plans and site-visit slots for every registered launch. [See new launch projects](/residential/new-launch) or [talk to a Unisel Realty advisor](/contact).`;

  const { blocks, report } = articleToPortableText(article, {
    resolveHref,
    sources,
    cta,
    note: isRoundup
      ? `Prices and details are from Unisel Realty's listings as of ${dateLabel} and can change. Confirm current prices and RERA details with our advisors before you book.`
      : `Unisel Realty compiled this analysis from the public reports listed above, as available on ${dateLabel}. It is general information, not investment advice. Check RERA registration, approvals and current prices before you buy.`,
  });
  if (report.dropped.length) {
    console.warn(`warn: removed unverifiable link(s): ${[...new Set(report.dropped)].join(", ")}`);
  }
  if (report.duplicates) console.warn(`warn: removed ${report.duplicates} repeated paragraph(s)`);
  const projectLinks = new Set(report.links.filter((href) => href.startsWith("/properties/"))).size;
  if (isRoundup && projectLinks < MIN_ROUNDUP_PROJECTS) {
    throw new Error(`Quality check failed, not publishing: roundup links ${projectLinks} projects, need ${MIN_ROUNDUP_PROJECTS}`);
  }

  const title = stripMarkup(article.title).trim();
  const slug = isRoundup ? piece.slug : await uniqueSlug(slugify(article.slug || title));
  const cover = await renderCover({ title, tag, place: micromarket?.name ?? "Gurugram", date: dateLabel });

  const id = randomUUID();
  const doc = {
    _id: draft ? `drafts.${id}` : id,
    _type: "post",
    title,
    slug: { _type: "slug", current: slug },
    excerpt: clampDescription(stripMarkup(article.metaDescription).trim()),
    detail: stripMarkup(article.dek).trim(),
    tag,
    author: AUTHOR,
    ...(authorImage ? { authorImage } : {}),
    publishedAt: today.toISOString(),
    content: blocks,
  };

  const outDir = path.join(outRoot, `${format(today, "yyyy-MM-dd-HHmm")}-${slug}`);
  await mkdir(outDir, { recursive: true });
  await Promise.all([
    writeFile(path.join(outDir, "brief.md"), piece.brief),
    writeFile(path.join(outDir, "post.json"), JSON.stringify(doc, null, 2)),
    writeFile(path.join(outDir, "cover.png"), cover),
    writeFile(path.join(outDir, "preview.html"), previewPage(doc, "cover.png")),
  ]);
  console.log(`"${title}" (${words} words, ${sources.length} sources, ${report.links.length} links) saved to ${outDir}`);

  if (dryRun) {
    console.log("Dry run: nothing was published. Open preview.html to review.");
    return;
  }

  const assetId = await sanity.uploadImage(cover, `${slug}.png`);
  doc.coverImage = { _type: "image", asset: { _type: "reference", _ref: assetId } };
  await sanity.createDocument(doc);

  if (draft) {
    console.log(`Draft created. Review and publish it in Sanity Studio: "${title}"`);
  } else {
    await revalidate(doc._id);
    await pingIndexNow([`${SITE_URL}/blog/${slug}`, `${SITE_URL}/blog`]);
    console.log(`Published ${SITE_URL}/blog/${slug}`);
  }
}

main().catch((err) => {
  console.error(`error: ${err.message}`);
  process.exit(1);
});
