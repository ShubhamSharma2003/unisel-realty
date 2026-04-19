# Sitemap Fix — Design

**Date:** 2026-04-19
**Source:** `VALIDATION-REPORT.md` (root)
**Goal:** make `https://www.uniselrealty.com/sitemap.xml` an industry-standard, Google-friendly sitemap that lists only canonical, 200-status URLs with accurate `lastmod`.

---

## Decisions (recommended defaults)

1. **Canonical host:** `https://www.uniselrealty.com` (apex 301s to www; align sitemap + robots).
2. **Canonical property URL:** `/properties/:slug` for every property regardless of type. Sitemap emits this URL. Add 301s `/residential/:slug` → `/properties/:slug` and `/commercial/:slug` → `/properties/:slug` (collection routes `/residential` and `/commercial` stay).
3. **Lastmod:** real `_updatedAt` from Sanity per dynamic doc; static page lastmods hardcoded per route to a sane edit date (no build-time `new Date()` floods).
4. **Drop `priority` and `changeFrequency`** (Google ignores; noise).

## Out of scope

- Location/micromarket sitemap entries (Sanity schema for `location` not confirmed yet — separate task).
- Image sitemap, video sitemap, hreflang.
- Sitemap index split (42 URLs → no need; threshold is 50k).

---

## Architecture

Single sitemap at `/sitemap.xml`, Next.js Metadata Route handler in `frontend/src/app/sitemap.ts`. No new files, no split.

Data flow:
```
sitemap.ts
 ├── staticRoutes[]  ← hardcoded canonical static pages + per-route lastmod
 ├── propertyRoutes[] ← Sanity `propertySlugsQuery` (now returns _updatedAt)
 ├── serviceRoutes[]  ← Sanity `servicesSlugsQuery` (now returns _updatedAt)
 └── blogRoutes[]     ← Sanity `blogSlugsQuery` (now returns _updatedAt)
```

All URLs prefixed with `SITE_URL = "https://www.uniselrealty.com"`.

---

## Component Changes

### 1. `frontend/src/lib/sanity.queries.ts`

Add `_updatedAt` to three slug queries:

```groq
*[_type == "property" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
*[_type == "service"  && defined(slug.current)]{ "slug": slug.current, _updatedAt }
*[_type == "post"     && defined(slug.current)]{ "slug": slug.current, _updatedAt }
```

### 2. `frontend/src/app/sitemap.ts`

- `SITE_URL` → `https://www.uniselrealty.com`
- Property loop URL → `${SITE_URL}/properties/${p.slug}` (was `/residential/`)
- Replace `/commercial/pre-leased-properties-gurgaon` → `/commercial/pre-leased`
- Keep `/services` (verified 200 — services collection page).
- Add static routes:
  - `/all-properties`
  - `/property-valuation`
  - `/privacy-policy`
  - `/terms-and-conditions`
  - `/commercial/new-launch`
  - `/commercial/under-construction`
  - `/commercial/near-possession`
  - `/residential/near-possession`
  - `/residential/under-construction`
- Drop `priority` and `changeFrequency` from every entry (Next allows omission).
- `lastModified` for dynamic = `new Date(doc._updatedAt)`. For static = a constant date per route (e.g., `new Date("2026-04-19")`) updated when the page changes.

### 3. `frontend/src/app/robots.ts`

`sitemap` field → `https://www.uniselrealty.com/sitemap.xml`.

### 4. `frontend/next.config.ts`

Add 301s for property route consolidation:

```ts
{ source: "/residential/:slug", destination: "/properties/:slug", permanent: true },
{ source: "/commercial/:slug",  destination: "/properties/:slug", permanent: true },
```

**Critical:** these must NOT match the collection sub-routes (`/residential/new-launch`, `/residential/ready-to-move`, `/residential/near-possession`, `/residential/under-construction`, and same for commercial). Next.js path-to-regexp `:slug` matches a single segment, so these collection routes also match — they would also redirect.

**Mitigation:** use `has`/`missing` constraints OR use explicit `:slug(?!new-launch|ready-to-move|under-construction|near-possession|pre-leased)` regex. Cleanest path: keep `/residential/[slug]` and `/commercial/[slug]` route files but make them `redirect()` to `/properties/[slug]` server-side (more reliable than next.config regex).

**Decision:** use server-side `redirect()` in the `[slug]/page.tsx` for residential and commercial. Simpler, no regex collisions, returns 308. Replace page body with:

```tsx
import { redirect } from "next/navigation";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/properties/${slug}`);
}
```

Also delete `generateMetadata` and `generateStaticParams` from those files since the page is a redirect.

### 5. `frontend/src/app/(site)/properties/[slug]/page.tsx`

Already canonical. No change.

---

## Validation Plan

After deploy:
1. `curl -sL https://www.uniselrealty.com/sitemap.xml | grep -c '<loc>'` → expect ~52 URLs (10 static + 37 properties + 4 services + 1 blog, give or take).
2. Spot-check 5 URLs return 200 with no redirect: `curl -o /dev/null -w "%{http_code} %{num_redirects}\n" -L <url>`.
3. Confirm canonical tag on a property page matches sitemap URL.
4. Verify `_updatedAt` varies across entries (`grep '<lastmod>' sitemap.xml | sort -u | wc -l` > 1).
5. Submit sitemap in Google Search Console.

---

## Risks

- **Sanity `_updatedAt` may be far in the past** for stale docs → that's accurate, not a bug.
- **Existing inbound links to `/residential/{slug}` and `/commercial/{slug}`** will 308 → fine, link equity passes.
- **`generateStaticParams` removal** on residential/commercial slug pages reduces ISR coverage for those paths, but they're now redirects so no static page is needed.
