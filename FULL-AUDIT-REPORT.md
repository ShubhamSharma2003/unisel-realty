# Full SEO Audit Report: uniselrealty.com

**Audit Date:** 2026-04-13
**Business:** Unisel Realty Pvt Ltd -- Real Estate Advisory, Gurgaon
**Business Type:** Hybrid (Local Service with Physical Office)
**Stack:** Next.js 15.2.8 / React 19 / Vercel / Sanity CMS / Tailwind CSS 4
**Domain:** www.uniselrealty.com (served) / uniselrealty.com (canonical -- mismatch)

---

## Executive Summary

### Overall SEO Health Score: 62/100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 68/100 | 14.96 |
| Content Quality | 23% | 74/100 | 17.02 |
| On-Page SEO | 20% | 70/100 | 14.00 |
| Schema / Structured Data | 10% | 80/100 | 8.00 |
| Performance (CWV) | 10% | 35/100 | 3.50 |
| AI Search Readiness | 10% | 72/100 | 7.20 |
| Images | 5% | 40/100 | 2.00 |
| **TOTAL** | **100%** | | **66.68** |

**Bonus: Local SEO Score: 68/100** (not weighted into main score but critical for this business)

### Top 5 Critical Issues

1. **Hero section has `ssr: false` -- LCP estimated 5-8s on mobile** (Performance)
2. **4+ MB unoptimized hero images with `unoptimized={true}`** (Images/Performance)
3. **307 Temporary Redirect for www canonicalization** (Technical)
4. **Dynamic service pages are critically thin content** (Content)
5. **OG images missing on all pages except homepage** (Images/Social)

### Top 5 Quick Wins

1. Fix `llms.txt` redirect URLs (`/properties` -> `/residential`, `/blogs` -> `/blog`) -- 5 min
2. Add `geo` coordinates to RealEstateAgent schema -- 5 min
3. Remove duplicate Organization schema from `/residential` page -- 5 min
4. Add missing `/properties/:slug` -> `/residential/:slug` redirect -- 5 min
5. Fix duplicate "Unisel Realty | Unisel Realty" in page titles -- 15 min

---

## Category Breakdown

---

### 1. Technical SEO (68/100)

#### Crawlability (72/100)
- PASS: robots.txt properly configured, AI crawlers explicitly allowed
- PASS: Sitemap referenced, 45 URLs, SSR content available to crawlers
- CRITICAL: `/properties/:slug` returns 200 soft-404 instead of 301 redirect
- CRITICAL: Non-www to www redirect uses 307 (Temporary) instead of 301/308 -- Vercel domain config issue
- HIGH: Internal blog links use `/blogs/:slug` causing unnecessary 308 redirect hops
- MEDIUM: All sitemap lastmod dates are identical (fake `new Date()`)
- MEDIUM: Sitemap uses non-www URLs but site serves from www

#### Indexability (70/100)
- PASS: Canonical tags present on all pages, meta robots correct, Google verification present
- HIGH: Duplicate site name in titles: "Page Title | Unisel Realty | Unisel Realty" on /residential, /commercial, /blog, /contact
- MEDIUM: Canonical URL domain (uniselrealty.com) mismatches serving domain (www.uniselrealty.com)

#### Security (78/100)
- PASS: HTTPS enforced, HSTS 2 years, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- HIGH: Missing Content-Security-Policy header
- LOW: X-XSS-Protection is deprecated (harmless but provides no protection)

#### URL Structure (75/100)
- PASS: Clean slugs, no query parameters, 301 redirects for legacy URLs
- CRITICAL: 307 non-www redirect (detailed above)
- HIGH: Double redirect chains (non-www + old path = 2-3 hops)

#### Mobile (85/100)
- PASS: Viewport meta, responsive Tailwind classes, font preloaded
- MEDIUM: Touch targets may be undersized on some elements

#### JavaScript Rendering (80/100)
- PASS: SSR via Next.js App Router, full HTML in view-source, ISR caching active
- MEDIUM: CSR bailout detected on /contact and /blog pages (Suspense boundary needed)

#### Redirect Analysis (55/100)
- CRITICAL: 307 temporary redirect for domain canonicalization
- CRITICAL: Missing `/properties/:slug` redirect
- HIGH: Blog links create unnecessary redirect hops

---

### 2. Content Quality (74/100)

#### E-E-A-T Assessment

| Signal | Score | Notes |
|--------|-------|-------|
| Experience | 17/20 | Strong transactional experience, specific market data. Weakness: no individual team profiles |
| Expertise | 19/25 | Deep domain knowledge on /residential. Weakness: no author credentials, thin dynamic service pages |
| Authoritativeness | 17/25 | Named developer partnerships, AggregateRating. Weakness: no press mentions, no external validation |
| Trustworthiness | 24/30 | Consistent NAP, RERA number, HTTPS. Weakness: no CIN number, no refund policy |

#### Page-by-Page Content Depth

| Page | Min Required | Actual | Status |
|------|-------------|--------|--------|
| /residential | 800 words | ~3,500 words | **STRONG PASS** |
| /about | 500 words | ~800 words | PASS |
| /blog (listing) | 500 words | ~50 words | **FAIL -- thin** |
| /services/[slug] (dynamic) | 800 words | ~30 words | **CRITICAL FAIL** |
| /services/home-loan-gurgaon | 800 words | ~1,000 words | PASS |
| /contact | Functional | N/A | PASS |
| /location/[micromarket] | 800 words | ~50-100 words | **FAIL -- thin/doorway** |

#### Critical Content Issues
- P0: Dynamic `/services/[slug]` pages are just property grids with no textual content -- quality rater fail
- P0: No team/people profiles anywhere on the site -- major E-E-A-T gap
- P1: Blog listing page has zero editorial text, no categories, no featured posts
- P1: Blog posts lack author bios, credentials, related posts
- P1: Location pages are borderline doorway pages (same template, minimal unique content)

---

### 3. On-Page SEO (70/100)

#### Titles & Meta
- PASS: Homepage title and meta description are strong and keyword-rich
- HIGH: Duplicate "| Unisel Realty" suffix on multiple pages
- PASS: OG tags and Twitter cards properly configured on homepage

#### Headings
- PASS: Single H1 per page, proper H2/H3 hierarchy on /residential
- MEDIUM: Some pages may have heading hierarchy gaps

#### Internal Linking
- HIGH: Blog links use old `/blogs/` path causing redirect chains
- MEDIUM: No "Areas We Serve" hub page linking to location pages
- PASS: Footer and navigation provide good site-wide links

---

### 4. Schema / Structured Data (80/100)

#### Implemented (Working Well)
- Organization (global, with @graph linking) -- PASS
- WebSite with SearchAction -- PASS
- BreadcrumbList (all inner pages) -- PASS
- RealEstateAgent (homepage) -- PASS (missing geo, phone, email)
- RealEstateListing (property pages) -- PASS
- Article (blog posts) -- PASS
- Service (service pages) -- PASS
- CollectionPage (listing pages) -- PASS
- FAQPage (homepage + /residential) -- INFO (no Google rich results for commercial sites, but useful for AI)

#### Issues
- HIGH: Missing `geo` GeoCoordinates on RealEstateAgent
- HIGH: `propertyItemListSchema` function exists but is never called
- HIGH: 3 static service pages have NO schema at all
- HIGH: Subcategory pages (8-9) missing CollectionPage schema
- MEDIUM: Duplicate Organization on /residential (already in root layout)
- MEDIUM: `openingHours` uses deprecated string format
- MEDIUM: Empty string fallbacks in Article schema
- LOW: Location pages missing CollectionPage/Place schema
- LOW: Article schema `dateModified` defaults to `datePublished`

---

### 5. Performance / Core Web Vitals (35/100)

**This is the weakest area. Estimated mobile Lighthouse score: 25-40.**

#### Estimated Metrics

| Metric | Mobile (est.) | Desktop (est.) | Target | Status |
|--------|--------------|----------------|--------|--------|
| LCP | 5.0-8.0s | 2.5-4.0s | <=2.5s | **FAIL** |
| INP | 200-350ms | 100-200ms | <=200ms | AT RISK |
| CLS | 0.05-0.15 | 0.02-0.08 | <=0.1 | AT RISK |
| FCP | 2.5-4.0s | 1.0-2.0s | <=1.8s | FAIL (mobile) |
| TTFB | 100-300ms | 50-200ms | <=200ms | PASS |

#### Critical Performance Issues
1. **Hero section `ssr: false`** -- the Largest Contentful Paint element requires 4+ network round trips before painting: HTML -> JS bundle -> HeroContent chunk -> Image request -> Download -> Paint
2. **`unoptimized={true}` on 20+ Image components** -- bypasses Next.js WebP/AVIF conversion entirely
3. **Hero images total 6+ MB** (hero-desk-1.png is 4.17 MB alone!)
4. **`@iconify/react` in 40 files** -- runtime CDN icon fetching, ~40KB library + network requests per icon
5. **Both `react-slick` AND `embla-carousel` installed** -- potentially ~30KB dead weight
6. **No preconnect hints** for cdn.sanity.io, googletagmanager.com
7. **GTM loaded eagerly** competing with critical resources
8. **Logo PNGs are 232KB + 155KB** for ~150px display (should be <10KB)

---

### 6. AI Search Readiness / GEO (72/100)

#### Strengths
- Excellent `llms.txt` with CC BY 4.0 licensing and AI permissions
- All AI crawlers explicitly allowed (GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, OAI-SearchBot)
- FAQ sections with specific, quotable answers
- Comprehensive JSON-LD structured data
- Server-rendered content accessible to all crawlers

#### Platform Readiness

| Platform | Score | Notes |
|----------|-------|-------|
| Google AI Overviews | 7/10 | Strong structured data, FAQs. Missing LocalBusiness schema |
| Perplexity | 7/10 | Excellent llms.txt. Blog weakness hurts |
| ChatGPT | 4/10 | No Wikipedia, no YouTube, minimal Reddit |
| Bing Copilot | 5/10 | No IndexNow, no Bing-specific optimization |

#### Key Gaps
- CRITICAL: No YouTube channel (highest correlation with AI citation at ~0.737)
- HIGH: No Wikipedia entity (strongest signal for ChatGPT citation)
- HIGH: Only 1 blog post -- critically thin content volume
- MEDIUM: llms.txt references old redirect URLs (`/properties`, `/blogs`)
- MEDIUM: Blog paragraphs too short for optimal AI citation (40-80 words vs recommended 134-167)

---

### 7. Images (40/100)

#### Critical Issues
1. **Missing OG image files** -- `/images/properties/og-image.jpg`, `/images/blog/og-image.jpg`, `/images/hero/og-image.jpg`, `/images/contactUs/og-image.jpg` -- ALL referenced but DO NOT EXIST on disk. Social sharing shows no preview on /residential, /commercial, /blog, /about, /contact, /services
2. **Hero images unoptimized** -- 4.17 MB + 2.12 MB PNGs served raw
3. **20+ components use `unoptimized={true}`** bypassing Next.js image pipeline
4. **Zero WebP/AVIF files** in `/public/images/` directory
5. **Missing `sizes` attribute** on ~28 of 30 Image components
6. **Slide1 hero has `priority={false}`** but may be the LCP element

#### What Works
- Sanity CDN images are properly configured with `urlFor()` dimensions
- Alt text is functional (property names, descriptive hero alts)
- Schema includes ImageObject for key entities
- Homepage has working dynamic OG image via `opengraph-image.tsx`

---

### Bonus: Local SEO (68/100)

| Dimension | Score |
|-----------|-------|
| GBP Signals | 55/100 |
| Reviews & Reputation | 72/100 |
| Local On-Page SEO | 78/100 |
| NAP Consistency | 75/100 |
| Local Schema | 80/100 |
| Local Authority | 50/100 |

#### Key Local Issues
- CRITICAL: No Google Maps embed on contact page (only Leaflet/OSM on homepage)
- CRITICAL: Location pages are thin/doorway pages (same template, ~50-100 words editorial)
- HIGH: RealEstateAgent schema missing `geo`, `telephone`, `email`
- HIGH: NAP format inconsistency (postal code/state omitted from visible displays)
- HIGH: Unknown citation presence on MagicBricks, 99acres, Housing.com, Justdial
- MEDIUM: Footer says "Unisel Realty" vs schema "Unisel Realty Pvt Ltd"
- MEDIUM: `openingHours` uses deprecated string format

---

## Prioritized Action Plan

### CRITICAL -- Fix Immediately (Week 1)

| # | Issue | Impact | Effort | Files |
|---|-------|--------|--------|-------|
| 1 | Remove `ssr: false` from HeroWrapper -- enable SSR for hero | LCP: -3-5s | Medium | `components/Home/Hero/HeroWrapper.tsx` |
| 2 | Remove `unoptimized={true}` from hero images, convert PNGs to WebP | LCP: -2-4s, bandwidth -80% | Medium | `Slide1.tsx`, `Slide2.tsx`, + 8 more files |
| 3 | Change 307 -> 301/308 for www redirect | Fix domain canonicalization | Low (Vercel dashboard) | Vercel domain settings |
| 4 | Add `/properties/:slug` -> `/residential/:slug` redirect | Fix soft 404s | Trivial | `next.config.ts` |
| 5 | Create/fix OG images for all key pages | Fix broken social sharing | Medium | 4 OG image files or dynamic generators |
| 6 | Fix thin dynamic service pages | Quality rater fail | High | `ServicePageContent.tsx` + Sanity schema |

### HIGH -- Fix This Week (Week 1-2)

| # | Issue | Impact | Effort | Files |
|---|-------|--------|--------|-------|
| 7 | Update internal blog links from `/blogs/` to `/blog/` | Eliminate redirect chains | Low | `blogCard.tsx` |
| 8 | Add `geo` coordinates to RealEstateAgent schema | Local search eligibility | Trivial | `jsonld.ts` |
| 9 | Fix duplicate "Unisel Realty" in page titles | Title tag optimization | Low | Layout metadata config |
| 10 | Add Content-Security-Policy header (report-only) | Security | Low | `next.config.ts` |
| 11 | Fix llms.txt redirect URLs | AI crawler efficiency | Trivial | `public/llms.txt` |
| 12 | Add team/people profiles to /about | E-E-A-T gap | Medium | `about/page.tsx` |
| 13 | Add Google Maps embed to contact page | Local SEO signal | Low | `contact/page.tsx` |
| 14 | Wire up `propertyItemListSchema` on listing pages | Schema completeness | Low | `residential/page.tsx`, `commercial/page.tsx` |
| 15 | Remove duplicate Organization schema from /residential | Clean markup | Trivial | `residential/page.tsx` |
| 16 | Add preconnect hints for cdn.sanity.io, GTM | Performance | Trivial | `layout.tsx` |
| 17 | Replace `@iconify/react` with static SVGs or lucide-react | -40KB JS + eliminate CDN fetches | High | 40 files |
| 18 | Add `priority={true}` to Slide1 hero image | LCP improvement | Trivial | `Slide1.tsx` |

### MEDIUM -- Fix This Month (Week 2-4)

| # | Issue | Impact | Effort | Files |
|---|-------|--------|--------|-------|
| 19 | Enrich location pages with 800+ words unique content per micromarket | Local organic #1 factor | High | `location/[micromarket]/page.tsx` + data |
| 20 | Use real lastmod dates from Sanity `_updatedAt` in sitemap | Crawl efficiency | Medium | `sitemap.ts` + Sanity queries |
| 21 | Add 19 missing pages to sitemap | Indexation coverage | Medium | `sitemap.ts` |
| 22 | Fix sitemap redirect URL (/commercial/pre-leased-properties-gurgaon) | Clean sitemap | Trivial | `sitemap.ts` |
| 23 | Align canonical domain (www vs non-www) across sitemap, canonicals, OG | Consistency | Medium | Multiple files |
| 24 | Add author bios to blog posts | E-E-A-T | Low | `blog/[slug]/page.tsx` |
| 25 | Add schema to 3 static service pages | Schema coverage | Low | 3 service page files |
| 26 | Add CollectionPage schema to subcategory pages | Schema coverage | Medium | 8-9 subcategory files |
| 27 | Standardize NAP format (full address everywhere) | Local NAP consistency | Low | Footer, contact, residential CTA |
| 28 | Add `sizes` attribute to all Image components | Responsive image efficiency | Medium | ~28 components |
| 29 | Fix CSR bailout on /contact and /blog with Suspense | JS rendering | Low | 2 page files |
| 30 | Defer GTM loading (lazyOnload) | Performance | Trivial | `layout.tsx` |
| 31 | Claim profiles on MagicBricks, 99acres, Housing.com, Justdial | Citation signals | Medium | External platforms |
| 32 | Convert all local PNG assets to WebP | -70-80% image size | Low | `/public/images/` batch conversion |
| 33 | Use OpeningHoursSpecification format in schema | Schema correctness | Trivial | `jsonld.ts` |
| 34 | Fix empty string fallbacks in Article schema | Schema validation | Trivial | `jsonld.ts` |
| 35 | Enrich /blog listing page with editorial intro + categories | Content depth | Low | `blog/page.tsx` |

### LOW -- Backlog

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 36 | Implement IndexNow for Bing/Yandex | Bing Copilot visibility | Low |
| 37 | Create YouTube channel with property walkthrough videos | AI citation #1 signal | Very High |
| 38 | Pursue Wikipedia entity creation | ChatGPT citation | Very High |
| 39 | Build Reddit presence in r/IndiaInvestments, r/Gurgaon | AI citation | Medium (ongoing) |
| 40 | Create "Areas We Serve" hub page | Internal linking | Medium |
| 41 | Add `dateModified` tracking from Sanity `_updatedAt` for blog | Content freshness | Medium |
| 42 | Remove `react-slick` if unused (potential 30KB dead weight) | Bundle size | Low |
| 43 | Add Google reviews embed/link on homepage or /about | Trust signals | Low |
| 44 | Add press mentions / industry memberships to /about | Authority | Low |
| 45 | Add `rel="noopener noreferrer"` to external footer links | Security | Trivial |

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `frontend/next.config.ts` | Redirects, security headers, image config |
| `frontend/src/app/robots.ts` | robots.txt generation |
| `frontend/src/app/sitemap.ts` | Sitemap generation |
| `frontend/src/lib/jsonld.ts` | All JSON-LD schema definitions |
| `frontend/src/app/layout.tsx` | Root layout, global metadata, scripts |
| `frontend/src/components/Home/Hero/HeroWrapper.tsx` | Hero SSR issue |
| `frontend/src/components/Home/Hero/Slide1.tsx` | Hero image #1 |
| `frontend/src/components/Home/Hero/Slide2.tsx` | Hero image #2 |
| `frontend/src/components/shared/Blog/blogCard.tsx` | Blog link URLs |
| `frontend/src/components/Properties/ServicePageContent.tsx` | Thin service pages |
| `frontend/src/components/Layout/Footer/index.tsx` | Footer NAP |
| `frontend/src/app/(site)/contact/page.tsx` | Contact page |
| `frontend/src/app/(site)/residential/page.tsx` | Residential listing |
| `frontend/src/app/(site)/location/[micromarket]/page.tsx` | Location pages |
| `frontend/public/llms.txt` | AI crawler instructions |

---

*Generated by SEO Audit on 2026-04-13. 8 specialized subagents analyzed technical SEO, content quality, schema, sitemap, performance, GEO/AI readiness, local SEO, and image optimization in parallel.*
