// Recent Gurugram real-estate headlines from Google News RSS (no API key).
// Links in the feed are news.google.com redirects, so they are only used as
// leads: the research step finds and cites the original reporting.

const QUERIES = [
  "gurugram real estate",
  "gurgaon real estate",
  "gurugram property prices",
  "gurugram housing project launch",
  "dwarka expressway gurugram",
  "haryana rera gurugram",
];

const feedUrl = (query, days) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(`${query} when:${days}d`)}&hl=en-IN&gl=IN&ceid=IN:en`;

const decodeXml = (s) =>
  s
    .replace(/^<!\[CDATA\[|\]\]>$/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decodeXml(m[1]) : "";
};

const normalizeTitle = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function parseFeed(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const publisher = tag(item, "source");
    let title = tag(item, "title");
    // Feed titles end in " - Publisher"; drop it so dedupe works across feeds.
    if (publisher && title.endsWith(` - ${publisher}`)) {
      title = title.slice(0, -(publisher.length + 3)).trim();
    }
    return {
      title,
      publisher,
      publishedAt: new Date(tag(item, "pubDate")),
      link: tag(item, "link"),
    };
  });
}

/** Headlines from the last `days` days, newest first, deduped by title. */
export async function fetchHeadlines({ days = 7, limit = 40 } = {}) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const feeds = await Promise.allSettled(
    QUERIES.map(async (q) => {
      const res = await fetch(feedUrl(q, days), {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; UniselRealtyBlogBot/1.0)" },
      });
      if (!res.ok) throw new Error(`Google News RSS ${res.status} for "${q}"`);
      return parseFeed(await res.text());
    }),
  );

  for (const f of feeds) {
    if (f.status === "rejected") console.warn(`warn: ${f.reason.message}`);
  }

  const seen = new Set();
  return feeds
    .flatMap((f) => (f.status === "fulfilled" ? f.value : []))
    .filter((h) => h.title && !Number.isNaN(h.publishedAt.getTime()) && h.publishedAt.getTime() >= cutoff)
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .filter((h) => {
      const key = normalizeTitle(h.title);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}
