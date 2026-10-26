import { sanityClient } from "@/lib/sanity.client";
import { recentNewsQuery } from "@/lib/sanity.queries";
import { SITE_URL } from "@/lib/company";

type FeedPost = { title: string; slug: string; excerpt?: string; date?: string; updatedAt?: string; tag?: string };

// Rebuilt when posts change (tag "blogs") and at most hourly otherwise.
export const revalidate = 3600;

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const posts = await sanityClient.fetch<FeedPost[]>(recentNewsQuery, { limit: 30 }, { next: { tags: ["blogs"] } });

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : "",
        post.excerpt ? `<description>${escapeXml(post.excerpt)}</description>` : "",
        post.tag ? `<category>${escapeXml(post.tag)}</category>` : "",
        "</item>",
      ].join("");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Unisel Realty: Gurgaon real estate news</title>
<link>${SITE_URL}/blog</link>
<description>New launches, RERA updates, infrastructure and market analysis for Gurgaon (Gurugram) property buyers and investors.</description>
<language>en-in</language>
<lastBuildDate>${new Date(posts[0]?.date ?? Date.now()).toUTCString()}</lastBuildDate>
<atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
