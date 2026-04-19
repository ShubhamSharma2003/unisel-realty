# Sitemap Validation Report — uniselrealty.com

**Sitemap URL:** https://uniselrealty.com/sitemap.xml (redirects 301 → www)
**Source:** `frontend/src/app/sitemap.ts`
**URL count:** 42
**Format:** Valid XML, single urlset
**Date:** 2026-04-18

---

## Critical Issues

### 1. All sitemap URLs use apex domain, site redirects to www (301)
Every URL in sitemap = `https://uniselrealty.com/...`. All 301 → `https://www.uniselrealty.com/...`.
Sitemaps must list final canonical URLs. Crawl budget wasted, lastmod signal weakened.

**Fix:** change `SITE_URL` in `frontend/src/app/sitemap.ts:5` from `https://uniselrealty.com` → `https://www.uniselrealty.com` (or vice-versa — pick one canonical and enforce site-wide). Also update `Sitemap:` line in `frontend/public/robots.txt` if present.

### 2. Canonical/sitemap URL mismatch for property pages
- Sitemap emits: `/residential/{slug}` (37 URLs)
- Canonical tag emits: `/properties/{slug}` (see `residential/[slug]/page.tsx:50`, `commercial/[slug]/page.tsx:50`, `properties/[slug]/page.tsx:47`)

Sitemap points Google to non-canonical URLs. Google will likely drop them from index in favor of `/properties/{slug}`.

**Fix options:**
- A) Pick `/properties/{slug}` canonical → change sitemap property loop to `${SITE_URL}/properties/${p.slug}` + add 301 `/residential/:slug` → `/properties/:slug` and `/commercial/:slug` → `/properties/:slug`.
- B) Pick `/residential/{slug}` canonical (matches current memory "primary detail page" note is stale) → change canonicals in all three `[slug]/page.tsx` files + delete `/properties/[slug]` route.

### 3. 404 URL in sitemap
`https://uniselrealty.com/services/location/golf-course-road` → **404**. Invalid — no route exists (`/location/[micromarket]` is the correct path, not `/services/location/...`).

**Fix:** remove this URL. If location pages should be in sitemap, query them from Sanity (`location` schema if defined) and emit `/location/{micromarket}`.

### 4. Sitemap references redirected URL
`/commercial/pre-leased-properties-gurgaon` is 301-redirected to `/commercial/pre-leased` (see `next.config.ts:24`). Sitemap should list the destination, not the source.

**Fix:** change `sitemap.ts:46` to `${SITE_URL}/commercial/pre-leased`.

---

## High-Severity Issues

### 5. Missing pages from sitemap
Live 200 pages not in sitemap:
- `/all-properties`
- `/property-valuation`
- `/privacy-policy`
- `/terms-and-conditions`
- `/commercial/pre-leased` (canonical target of redirect)
- `/commercial/new-launch`
- `/commercial/under-construction`
- `/commercial/near-possession`
- `/residential/near-possession`
- `/residential/under-construction`

### 6. `lastmod` is `new Date()` on every URL
Every entry gets build-time timestamp (`2026-04-18T10:40:48.493Z`). Google treats uniform lastmod as noise and may ignore the signal.

**Fix:** use actual modification timestamp from Sanity:
- properties → `_updatedAt`
- blogs → `_updatedAt`
- services → `_updatedAt`

Update slug queries to include `_updatedAt`, e.g.:
```groq
*[_type == "property" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
```
Then in `sitemap.ts`: `lastModified: new Date(p._updatedAt)`.

For static routes, hardcode last edit date per route or use build date only for homepage.

---

## Medium / Low

| Issue | Severity | Note |
|-------|----------|------|
| `<priority>` and `<changefreq>` emitted | Info | Google ignores. Harmless but noise. Drop `priority`/`changeFrequency` fields from sitemap.ts. |
| Blogs present in Sanity may be more than 1 | Low | Only 1 blog URL emitted (`middle-east-war...`). Verify Sanity has other posts and query returns them. |
| Sitemap not gzipped | Info | 7.5 KB plaintext — OK at this size. |

---

## Robots.txt
- Present, lists correct AI crawlers, references `https://uniselrealty.com/sitemap.xml` (apex — will 301, same www issue as #1).

---

## Recommended Action Order
1. Decide canonical host: `www` or apex. Enforce in `sitemap.ts` `SITE_URL` and `robots.txt`.
2. Decide canonical property URL: `/properties/:slug` vs `/residential/:slug`. Align sitemap + canonical tags + consider 301 for the duplicate route.
3. Remove `/services/location/golf-course-road` (404) + replace `/commercial/pre-leased-properties-gurgaon` with `/commercial/pre-leased`.
4. Add missing static routes to `staticRoutes` array.
5. Wire `_updatedAt` from Sanity into lastmod.
6. Drop `priority` + `changeFrequency` (optional cleanup).

---

## Files to Edit
- `frontend/src/app/sitemap.ts` — URL + lastmod fixes, add missing routes
- `frontend/src/lib/sanity.queries.ts` — add `_updatedAt` to slug queries
- `frontend/src/app/(site)/residential/[slug]/page.tsx:50` — canonical decision
- `frontend/src/app/(site)/commercial/[slug]/page.tsx:50` — canonical decision
- `frontend/src/app/(site)/properties/[slug]/page.tsx:47` — canonical decision
- `frontend/public/robots.txt` — sitemap URL host
- `frontend/next.config.ts` — possibly add redirects for duplicate property routes
