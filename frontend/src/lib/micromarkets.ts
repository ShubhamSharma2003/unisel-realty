/** Gurgaon micromarkets served, and the single source for /location routing. */
export const MICROMARKETS: Record<string, { title: string; displayName: string; description: string }> = {
    "golf-course-road": {
        title: "Properties on Golf Course Road, Gurgaon",
        displayName: "Golf Course Road",
        description: "Explore premium residential and commercial properties on Golf Course Road, Gurgaon.",
    },
    "golf-course-extension-road": {
        title: "Properties on Golf Course Extension Road, Gurgaon",
        displayName: "Golf Course Extension Road",
        description: "Explore residential and commercial properties on Golf Course Extension Road, Gurgaon.",
    },
    "dwarka-expressway": {
        title: "Properties on Dwarka Expressway, Gurgaon",
        displayName: "Dwarka Expressway",
        description: "Explore residential and commercial properties on Dwarka Expressway, Gurgaon.",
    },
    "gwal-pahari": {
        title: "Properties in Gwal Pahari, Gurgaon",
        displayName: "Gwal Pahari",
        description: "Explore premium residential and commercial properties in Gwal Pahari, Gurgaon.",
    },
    "sohna-road": {
        title: "Properties on Sohna Road, Gurgaon",
        displayName: "Sohna Road",
        description: "Explore residential and commercial properties on Sohna Road, Gurgaon.",
    },
    "new-gurgaon": {
        title: "Properties in New Gurgaon",
        displayName: "New Gurgaon",
        description: "Explore residential and commercial properties in New Gurgaon (Sectors 73-95).",
    },
};

/**
 * Resolve a Sanity `service` document slug to a real route.
 *
 * Slugs are authored freehand in the CMS and do not all match routes: the
 * "Dwarka Expressway" card carried the slug "dwarka-expressway", which
 * linked to /dwarka-expressway and 404'd. Micromarket slugs belong under
 * /location/.
 */
export function resolveServiceHref(slug: string): string {
  const clean = slug.replace(/^\/+/, "");
  if (clean.startsWith("location/")) return `/${clean}`;
  if (clean in MICROMARKETS) return `/location/${clean}`;
  return `/${clean}`;
}

/**
 * Map legacy CMS-authored paths to their current routes.
 *
 * next.config.ts 308-redirects these, but an internal link that points at a
 * redirect costs a needless hop on every crawl. Editors still have
 * "/properties" and "/blogs" saved in Sanity ctaLink fields.
 */
const LEGACY_PATHS: Record<string, string> = {
  "/properties": "/residential",
  "/blogs": "/blog",
  "/contactus": "/contact",
  "/about-us": "/about",
  "/location": "/location",
};

export function normalizeInternalHref(href: string): string {
  if (!href?.startsWith("/")) return href;
  const [path, rest] = [href.split(/[?#]/)[0], href.slice(href.split(/[?#]/)[0].length)];
  const trimmed = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return (LEGACY_PATHS[trimmed] ?? trimmed) + rest;
}
