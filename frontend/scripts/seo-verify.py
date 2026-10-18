"""Verification suite for the Unisel Realty SEO changes.

Runs against a local `next start` server plus the repo source tree.
Usage: SSL_CERT_FILE=/etc/ssl/cert.pem python3 -I verify.py <base_url> <frontend_dir>
"""
import json, re, sys, urllib.request, urllib.error, pathlib
from urllib.parse import urljoin

BASE = sys.argv[1].rstrip('/')
ROOT = pathlib.Path(sys.argv[2])

results = []          # (section, name, ok, detail)
_cache = {}


def fetch(path, follow=True):
    key = (path, follow)
    if key in _cache:
        return _cache[key]

    class NoRedir(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, *a, **k):
            return None

    opener = urllib.request.build_opener(*( [] if follow else [NoRedir()] ))
    req = urllib.request.Request(BASE + path, headers={'User-Agent': 'verify/1.0'})
    try:
        r = opener.open(req, timeout=30)
        out = (r.status, r.read().decode('utf-8', 'replace'), dict(r.headers))
    except urllib.error.HTTPError as e:
        out = (e.code, (e.read().decode('utf-8', 'replace') if e.code != 404 else ''), dict(e.headers or {}))
    except Exception as e:  # noqa: BLE001
        out = (0, '', {'error': str(e)})
    _cache[key] = out
    return out


def check(section, name, ok, detail=''):
    results.append((section, name, bool(ok), detail))


def src(rel):
    p = ROOT / rel
    return p.read_text(encoding='utf-8') if p.exists() else ''


def text_of(html):
    body = html.split('<body', 1)[1] if '<body' in html else html
    t = re.sub(r'<script.*?</script>|<style.*?</style>', '', body, flags=re.S)
    return re.sub(r'<[^>]+>', ' ', t)


def jsonld(html):
    out = []
    for blob in re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S):
        try:
            out.append(json.loads(blob))
        except Exception:  # noqa: BLE001
            out.append({'__parse_error__': True})
    return out


def flatten(o, acc=None):
    acc = [] if acc is None else acc
    if isinstance(o, dict):
        acc.append(o)
        for v in o.values():
            flatten(v, acc)
    elif isinstance(o, list):
        for v in o:
            flatten(v, acc)
    return acc


PAGES = ['/', '/residential', '/commercial', '/about', '/contact', '/blog',
         '/services', '/location', '/location/golf-course-road',
         '/commercial/pre-leased', '/residential/new-launch',
         '/properties/dlf-the-camellias',
         '/services/nri-property-investment-gurgaon', '/all-properties',
         '/property-valuation', '/insights-report']

# ── 1. Rendering: the core regression ──────────────────────────────────────
S = '1. Server rendering'
for p in PAGES:
    status, html, _ = fetch(p)
    words = len(text_of(html).split())
    h1 = len(re.findall(r'<h1[ >]', html))
    links = len(re.findall(r'<a [^>]*href="/', html))
    bail = 'BAILOUT_TO_CLIENT_SIDE_RENDERING' in html
    check(S, f'{p} renders server-side', status == 200 and words >= 100,
          f'status={status} words={words} isolated_bailout_widget={bail}')
    check(S, f'{p} has exactly one h1', h1 == 1, f'h1={h1}')
    check(S, f'{p} has internal links in HTML', links >= 10, f'links={links}')

# ── 2. Canonicals ──────────────────────────────────────────────────────────
S = '2. Canonicals'
PROD = 'https://www.uniselrealty.com'
for p in PAGES:
    _, html, _ = fetch(p)
    m = re.search(r'<link rel="canonical" href="([^"]+)"', html)
    want = PROD + ('' if p == '/' else p)
    got = m.group(1) if m else None
    check(S, f'{p} self-canonical', got == want, f'got={got}')

# ── 3. Fabricated / contradictory facts ────────────────────────────────────
S = '3. Facts'
BAD = ['aggregateRating', '2006', '₹2,400', '₹15,000 Cr', '₹900Cr', '3,800',
       '122102', '122003', '400+ Reviews', 'en-US', 'en_US']
for p in PAGES:
    _, html, _ = fetch(p)
    hits = [b for b in BAD if b in html]
    # "₹15,000" also appears as a legitimate per-sqft price range on /commercial
    if p == '/commercial':
        hits = [h for h in hits if h != '₹15,000 Cr']
    check(S, f'{p} free of stale/fabricated facts', not hits, f'found={hits}')

_, home, _ = fetch('/')
for token in ['$2B+', '10,000+', '2005', '122011']:
    check(S, f'homepage states {token}', token in home)

# ── 4. Schema ──────────────────────────────────────────────────────────────
S = '4. Schema'
nodes = flatten(jsonld(home))
org = [n for n in nodes if isinstance(n.get('@type'), list)
       and 'RealEstateAgent' in n['@type'] and 'LocalBusiness' in n['@type']]
check(S, 'single merged RealEstateAgent+LocalBusiness', len(org) == 1, f'count={len(org)}')
if org:
    o = org[0]
    check(S, 'openingHoursSpecification (not legacy string)',
          isinstance(o.get('openingHoursSpecification'), list) and 'openingHours' not in o)
    check(S, 'hasMap present', bool(o.get('hasMap')))
    check(S, 'CIN identifier', (o.get('identifier') or {}).get('value', '').startswith('U70200'))
    sa = o.get('sameAs') or []
    check(S, 'sameAs includes x.com and youtube',
          any('x.com' in s for s in sa) and any('youtube' in s for s in sa))
    check(S, 'postalCode 122011', (o.get('address') or {}).get('postalCode') == '122011')
    check(S, 'foundingDate 2005', o.get('foundingDate') == '2005')
check(S, 'no aggregateRating anywhere in homepage schema',
      not any('aggregateRating' in n for n in nodes))
check(S, 'founder Person node', any(n.get('@type') == 'Person' and n.get('@id', '').endswith('#founder')
                                    for n in nodes))
for p in ['/services/nri-property-investment-gurgaon', '/services/home-loan-gurgaon',
          '/services/property-management-gurgaon']:
    _, html, _ = fetch(p)
    n = flatten(jsonld(html))
    check(S, f'{p} emits Service schema', any(x.get('@type') == 'Service' for x in n))
    check(S, f'{p} emits BreadcrumbList', any(x.get('@type') == 'BreadcrumbList' for x in n))

_, prop, _ = fetch('/properties/dlf-the-camellias')
pn = flatten(jsonld(prop))
check(S, 'property page has exactly one BreadcrumbList',
      sum(1 for x in pn if x.get('@type') == 'BreadcrumbList') == 1)
offers = [x for x in pn if x.get('@type') == 'Offer']
check(S, 'Offer.price numeric or offer omitted',
      all(isinstance(o.get('price'), (int, float)) for o in offers),
      f'prices={[o.get("price") for o in offers]}')
check(S, 'no JSON-LD parse errors on sampled pages',
      not any('__parse_error__' in n for p in PAGES for n in flatten(jsonld(fetch(p)[1]))))

# ── 5. Redirects and status codes ──────────────────────────────────────────
S = '5. Redirects / status'
REDIR = [('/residential/dlf-the-camellias', 308, '/properties/dlf-the-camellias'),
         ('/commercial/emaar-ibc', 308, '/properties/emaar-ibc'),
         ('/contact-us', 308, '/contact'),
         ('/about-us', 308, '/about'),
         ('/blogs/foo', 308, '/blog/foo'),
         ('/property/dlf-the-camellias', 308, '/properties/dlf-the-camellias')]
for path, code, dest in REDIR:
    st, _, hdr = fetch(path, follow=False)
    loc = (hdr.get('Location') or hdr.get('location') or '').replace(BASE, '')
    check(S, f'{path} -> {code} {dest}', st == code and loc == dest, f'got={st} {loc}')

NO_REDIR = ['/residential/new-launch', '/residential/ready-to-move',
            '/residential/under-construction', '/residential/near-possession',
            '/commercial/pre-leased', '/commercial/new-launch',
            '/commercial/under-construction', '/commercial/near-possession',
            '/residential/opengraph-image', '/commercial/opengraph-image']
for path in NO_REDIR:
    st, _, _ = fetch(path, follow=False)
    check(S, f'{path} not swallowed by slug redirect', st == 200, f'status={st}')

for path in ['/properties/zzz-nope', '/location/zzz-nope', '/blog/zzz-nope', '/qwerty-random']:
    st, _, _ = fetch(path, follow=False)
    check(S, f'{path} returns real 404', st == 404, f'status={st}')

st, _, _ = fetch('/api/auth/session', follow=False)
check(S, '/api/auth/session no longer 500', st != 500, f'status={st}')

# ── 6. Sitemap ─────────────────────────────────────────────────────────────
S = '6. Sitemap'
_, sm, _ = fetch('/sitemap.xml')
locs = re.findall(r'<loc>([^<]+)</loc>', sm)
check(S, 'sitemap non-empty', len(locs) >= 60, f'count={len(locs)}')
check(S, 'all 6 location pages listed',
      sum(1 for l in locs if '/location/' in l) == 6)
check(S, '/location hub listed', f'{PROD}/location' in locs)
check(S, 'all URLs use www host', all(l.startswith(PROD) for l in locs))
check(S, 'no legacy /residential/{slug} URLs',
      not [l for l in locs if re.match(rf'{PROD}/residential/[^/]+$', l)
           and not l.endswith(('new-launch', 'ready-to-move', 'under-construction', 'near-possession'))])
bad_sm = []
for l in locs[:70]:
    st, _, _ = fetch(l.replace(PROD, ''), follow=False)
    if st != 200:
        bad_sm.append((l.replace(PROD, ''), st))
check(S, 'every sitemap URL returns 200 (no redirects/404)', not bad_sm, f'bad={bad_sm[:5]}')

# ── 7. Social preview images ───────────────────────────────────────────────
S = '7. OG images'
for p in PAGES:
    _, html, _ = fetch(p)
    m = re.search(r'property="og:image" content="([^"]+)"', html)
    if not m:
        check(S, f'{p} declares og:image', False, 'missing')
        continue
    u = m.group(1)
    if u.startswith('https://www.uniselrealty.com'):
        u = u.replace('https://www.uniselrealty.com', '')
    if u.startswith('http'):
        check(S, f'{p} og:image (remote CDN)', True, u[:50])
        continue
    st, _, hdr = fetch(u, follow=False)
    ct = hdr.get('Content-Type') or hdr.get('content-type') or ''
    check(S, f'{p} og:image resolves to an image', st == 200 and ct.startswith('image/'),
          f'status={st} type={ct}')

# ── 8. Listing pages de-index when empty ───────────────────────────────────
S = '8. Empty-listing noindex'
for p in ['/commercial/pre-leased', '/commercial/near-possession',
          '/residential/near-possession', '/residential/ready-to-move']:
    _, html, _ = fetch(p)
    empty = 'No properties found' in html
    noindex = bool(re.search(r'<meta name="robots" content="[^"]*noindex', html))
    check(S, f'{p} robots matches inventory', empty == noindex,
          f'empty={empty} noindex={noindex}')

# ── 9. Local / mobile UX ───────────────────────────────────────────────────
S = '9. Local + mobile'
_, contact, _ = fetch('/contact')
check(S, 'contact has a map embed', 'google.com/maps/embed' in contact or '<iframe' in contact)
check(S, 'contact has a directions link', 'maps' in contact.lower() and 'direction' in contact.lower())
check(S, 'contact shows postal code', '122011' in contact)
check(S, 'click-to-call present sitewide', 'tel:+918010303303' in home)
check(S, 'popup 15s timer gone', 'POPUP_DELAY_MS' not in src('src/components/shared/PopupForm.tsx'))
check(S, 'legal pages use correct PIN',
      '122011' in fetch('/privacy-policy')[1] and '122011' in fetch('/terms-and-conditions')[1])

# ── 10. On-page / internal linking ─────────────────────────────────────────
S = '10. On-page'
check(S, 'homepage h1 has category + city',
      bool(re.search(r'<h1[^>]*>[^<]*Real Estate[^<]*Gurgaon', home)))
_, comm, _ = fetch('/commercial')
check(S, '/commercial title drops "Pre-Leased"',
      'Pre-Leased' not in (re.search(r'<title>(.*?)</title>', comm).group(1) if '<title>' in comm else ''))
check(S, '/commercial links to pre-leased page', '/commercial/pre-leased' in comm)
_, nl, _ = fetch('/residential/new-launch')
check(S, 'insights-report linked from new-launch', '/insights-report' in nl)
_, loc, _ = fetch('/location')
check(S, '/location hub lists 6 micromarkets',
      len(re.findall(r'href="/location/[a-z-]+"', loc)) >= 6)
for p in PAGES:
    _, html, _ = fetch(p)
    t = re.search(r'<title>(.*?)</title>', html)
    title = t.group(1) if t else ''
    check(S, f'{p} title not double-branded', title.count('Unisel Realty') <= 1, f'title={title}')
_, prop_html, _ = fetch('/properties/dlf-the-camellias')
d = re.search(r'<meta name="description" content="([^"]*)"', prop_html)
desc = d.group(1) if d else ''
check(S, 'property description free of "Gurgaon, Gurgaon"', 'Gurgaon, Gurgaon' not in desc, desc[:70])
check(S, 'property description free of doubled period', 'ft..' not in desc)

# ── 11. Locale ─────────────────────────────────────────────────────────────
S = '11. Locale'
check(S, 'html lang=en-IN', 'lang="en-IN"' in home)
check(S, 'og:locale en_IN', 'en_IN' in home)

# ── 12. Source-level checks ────────────────────────────────────────────────
S = '12. Source'
ap = src('src/components/Analytics/AnalyticsProvider.tsx')
check(S, 'tracker is a sibling, not a wrapper',
      '<PageViewTracker />' in ap and '{children}' in ap
      and 'useSearchParams' not in ap.split('*/')[-1])
check(S, 'calculator default is 9%', 'useState("9")' in src('src/components/Properties/EMICalculator/index.tsx'))
check(S, 'countdown has no load-time deadline',
      'OFFER_DEADLINE_ISO' in src('src/components/InsightsReport/InsightsReportClient.tsx'))
check(S, 'HeroSub renders h1', '<h1' in src('src/components/shared/HeroSub/index.tsx'))
pkg = json.loads(src('package.json'))
deps = {**pkg.get('dependencies', {}), **pkg.get('devDependencies', {})}
check(S, 'next-auth removed', 'next-auth' not in deps)
check(S, 'react-slick/slick-carousel removed',
      not any(k in deps for k in ['react-slick', 'slick-carousel', '@types/react-slick']))
check(S, 'no unoptimized Image props left',
      not any('unoptimized' in (ROOT / f).read_text() for f in
              ['src/components/Home/FeaturedProperty/index.tsx',
               'src/components/Layout/Header/BrandLogo/Logo.tsx']))
check(S, 'preconnect to Sanity CDN', 'preconnect' in src('src/app/layout.tsx'))
car = src('src/components/Properties/PropertyImageCarousel.tsx')
check(S, 'gallery LCP has sizes + fetchPriority', 'sizes=' in car and 'fetchPriority' in car)
check(S, 'no global canonical in root layout',
      "alternates" not in src('src/app/layout.tsx'))
check(S, 'legacy slug route files deleted',
      not (ROOT / 'src/app/(site)/residential/[slug]').exists()
      and not (ROOT / 'src/app/(site)/commercial/[slug]').exists())
check(S, 'nextauth component removed', not (ROOT / 'src/components/nextauth').exists())

# ── Report ─────────────────────────────────────────────────────────────────
sections = {}
for sec, name, ok, detail in results:
    sections.setdefault(sec, []).append((name, ok, detail))

total = len(results)
passed = sum(1 for r in results if r[2])
print(f'\n{"="*78}\nVERIFICATION: {passed}/{total} passed\n{"="*78}')
for sec in sections:
    rows = sections[sec]
    nfail = sum(1 for _, ok, _ in rows if not ok)
    print(f'\n{sec}  [{len(rows)-nfail}/{len(rows)}]')
    for name, ok, detail in rows:
        if not ok:
            print(f'   FAIL  {name}   {detail}')
    if nfail == 0:
        print(f'   all {len(rows)} passed')

print(f'\n{"="*78}')
fails = [(s, n, d) for s, n, ok, d in results if not ok]
if fails:
    print(f'{len(fails)} FAILURES:')
    for s, n, d in fails:
        print(f'  [{s}] {n}  {d}')
else:
    print('ALL CHECKS PASSED')
sys.exit(1 if fails else 0)
