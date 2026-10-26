import { sanityClient } from "@/lib/sanity.client";
import { recentNewsQuery } from "@/lib/sanity.queries";
import { COMPANY, SITE_URL } from "@/lib/company";

// Google News sitemap. Google only wants articles from the last two days, so
// older posts stay in /sitemap.xml only. Named news-sitemap.xml because
// middleware.ts answers /sitemap-*.xml with 410 Gone (old WordPress URLs).

type NewsPost = { title: string; slug: string; date?: string };

export const revalidate = 3600;

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const posts = await sanityClient.fetch<NewsPost[]>(recentNewsQuery, { limit: 20 }, { next: { tags: ["blogs"] } });
  const recent = posts.filter((p) => p.date && Date.now() - new Date(p.date).getTime() < TWO_DAYS_MS);

  const urls = recent
    .map(
      (post) => `<url>
<loc>${SITE_URL}/blog/${post.slug}</loc>
<news:news>
<news:publication><news:name>${escapeXml(COMPANY.name)}</news:name><news:language>en</news:language></news:publication>
<news:publication_date>${new Date(post.date!).toISOString()}</news:publication_date>
<news:title>${escapeXml(post.title)}</news:title>
</news:news>
</url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
