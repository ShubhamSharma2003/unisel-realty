import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity.client";
import { propertySlugsQuery, servicesSlugsQuery, blogSlugsQuery } from "@/lib/sanity.queries";

const SITE_URL = "https://www.uniselrealty.com";

type SlugDoc = { slug: string; _updatedAt: string };

const STATIC_LASTMOD = new Date("2026-04-19");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, services, blogs] = await Promise.all([
    sanityClient.fetch<SlugDoc[]>(propertySlugsQuery),
    sanityClient.fetch<SlugDoc[]>(servicesSlugsQuery),
    sanityClient.fetch<SlugDoc[]>(blogSlugsQuery),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/residential`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/residential/new-launch`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/residential/ready-to-move`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/residential/under-construction`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/residential/near-possession`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/commercial`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/commercial/pre-leased`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/commercial/new-launch`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/commercial/under-construction`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/commercial/near-possession`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/all-properties`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/blog`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/services`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/about`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/contact`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/property-valuation`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/privacy-policy`, lastModified: STATIC_LASTMOD },
    { url: `${SITE_URL}/terms-and-conditions`, lastModified: STATIC_LASTMOD },
  ];

  const isValidSlug = (slug: string) => slug && !slug.includes("/");

  const propertyRoutes: MetadataRoute.Sitemap = properties
    .filter((p) => isValidSlug(p.slug))
    .map((p) => ({
      url: `${SITE_URL}/properties/${p.slug}`,
      lastModified: new Date(p._updatedAt),
    }));

  const serviceRoutes: MetadataRoute.Sitemap = services
    .filter((s) => isValidSlug(s.slug))
    .map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: new Date(s._updatedAt),
    }));

  const blogRoutes: MetadataRoute.Sitemap = blogs
    .filter((b) => isValidSlug(b.slug))
    .map((b) => ({
      url: `${SITE_URL}/blog/${b.slug}`,
      lastModified: new Date(b._updatedAt),
    }));

  return [...staticRoutes, ...propertyRoutes, ...serviceRoutes, ...blogRoutes];
}
