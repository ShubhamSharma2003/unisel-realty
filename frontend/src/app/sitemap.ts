import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity.client";
import { propertySlugsQuery, blogSlugsQuery, propertyFreshnessQuery } from "@/lib/sanity.queries";
import { MICROMARKETS } from "@/lib/micromarkets";
import { BLOG_CATEGORIES, MIN_POSTS_TO_INDEX } from "@/lib/blogCategories";

const SITE_URL = "https://www.uniselrealty.com";

type SlugDoc = { slug: string; _updatedAt: string };
type PostDoc = SlugDoc & { tag?: string };
type FreshnessDoc = { category?: string; status?: string; micromarket?: string; _updatedAt: string };

const STATIC_LASTMOD = new Date("2026-04-19");

/** The newest of `dates` (ISO strings), or the static fallback if there are none. */
const newest = (dates: string[]) =>
  dates.length ? new Date(dates.reduce((a, b) => (a > b ? a : b))) : STATIC_LASTMOD;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Tagged so /api/revalidate refreshes the prerendered sitemap when content
  // is published, instead of waiting for the next deploy.
  const [properties, blogs, freshness] = await Promise.all([
    sanityClient.fetch<SlugDoc[]>(propertySlugsQuery, {}, { next: { tags: ["properties"] } }),
    sanityClient.fetch<PostDoc[]>(blogSlugsQuery, {}, { next: { tags: ["blogs"] } }),
    sanityClient.fetch<FreshnessDoc[]>(propertyFreshnessQuery, {}, { next: { tags: ["properties"] } }),
  ]);

  // Listing pages change when their inventory does, and the blog when a post
  // is published, so their lastmod tracks that instead of a fixed date.
  const listed = (match: Partial<FreshnessDoc>) =>
    newest(
      freshness
        .filter((p) => Object.entries(match).every(([key, value]) => p[key as keyof FreshnessDoc] === value))
        .map((p) => p._updatedAt)
    );
  const blogLastmod = newest(blogs.map((b) => b._updatedAt));
  const homeLastmod = newest([...freshness, ...blogs].map((d) => d._updatedAt));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: homeLastmod },
    { url: `${SITE_URL}/residential`, lastModified: listed({ category: "residential" }) },
    { url: `${SITE_URL}/residential/new-launch`, lastModified: listed({ category: "residential", status: "new-launch" }) },
    { url: `${SITE_URL}/residential/ready-to-move`, lastModified: listed({ category: "residential", status: "ready-to-move" }) },
    { url: `${SITE_URL}/residential/under-construction`, lastModified: listed({ category: "residential", status: "under-construction" }) },
    { url: `${SITE_URL}/residential/near-possession`, lastModified: listed({ category: "residential", status: "near-possession" }) },
    { url: `${SITE_URL}/commercial`, lastModified: listed({ category: "commercial" }) },
    { url: `${SITE_URL}/commercial/pre-leased`, lastModified: listed({ category: "commercial", status: "pre-leased" }) },
    { url: `${SITE_URL}/commercial/new-launch`, lastModified: listed({ category: "commercial", status: "new-launch" }) },
    { url: `${SITE_URL}/commercial/under-construction`, lastModified: listed({ category: "commercial", status: "under-construction" }) },
    { url: `${SITE_URL}/commercial/near-possession`, lastModified: listed({ category: "commercial", status: "near-possession" }) },
    { url: `${SITE_URL}/all-properties`, lastModified: listed({}) },
    { url: `${SITE_URL}/blog`, lastModified: blogLastmod },
    { url: `${SITE_URL}/services`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/services/home-loan-gurgaon`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/services/nri-property-investment-gurgaon`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/services/property-management-gurgaon`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/about`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/contact`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/property-valuation`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/insights-report`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/privacy-policy`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/terms-and-conditions`, lastModified: STATIC_LASTMOD },
  ];

  // Micromarket pages are live, linked in the nav, and were missing here.
  // The /location hub replaced the old redirect to /residential.
  const locationRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/location`, lastModified: listed({}) },
    ...Object.keys(MICROMARKETS).map(
    (micromarket) => ({
      url: `${SITE_URL}/location/${micromarket}`,
      lastModified: listed({ micromarket }),
    })),
  ];

  // Category pages are listed once they have enough posts to be indexed.
  const categoryRoutes: MetadataRoute.Sitemap = Object.entries(BLOG_CATEGORIES).flatMap(([slug, { tag }]) => {
    const posts = blogs.filter((b) => b.tag?.toLowerCase() === tag.toLowerCase());
    return posts.length >= MIN_POSTS_TO_INDEX
      ? [{ url: `${SITE_URL}/blog/category/${slug}`, lastModified: newest(posts.map((p) => p._updatedAt)) }]
      : [];
  });

  const isValidSlug = (slug: string) => slug && !slug.includes("/");

  const propertyRoutes: MetadataRoute.Sitemap = properties
    .filter((p) => isValidSlug(p.slug))
    .map((p) => ({
      url: `${SITE_URL}/properties/${p.slug}`,
      lastModified: new Date(p._updatedAt),
    }));

  const blogRoutes: MetadataRoute.Sitemap = blogs
    .filter((b) => isValidSlug(b.slug))
    .map((b) => ({
      url: `${SITE_URL}/blog/${b.slug}`,
      lastModified: new Date(b._updatedAt),
    }));

  return [...staticRoutes, ...locationRoutes, ...categoryRoutes, ...propertyRoutes, ...blogRoutes];
}
