import PropertiesListing from "@/components/Properties/PropertyList";
import { Metadata } from "next";
import { propertyCollectionSchema, breadcrumbSchema } from "@/lib/jsonld";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Commercial Property in Gurgaon | SCO Plots, Offices & Pre-Leased",
    description:
        "Buy commercial property in Gurgaon with confidence. SCO plots, Grade-A offices, high-street retail and pre-leased assets across Golf Course Road, Golf Course Extension Road, Dwarka Expressway and SPR. RERA-registered advisory since 2006.",
    keywords: [
        "commercial property in Gurgaon",
        "SCO plots Gurgaon",
        "pre-leased property Gurgaon",
        "office space for sale Gurgaon",
        "Grade A office Cyber City",
        "commercial property Golf Course Road",
        "commercial property Dwarka Expressway",
        "commercial real estate Gurugram",
        "retail shops Gurgaon",
        "NRI commercial investment Gurgaon",
    ],
    alternates: { canonical: "https://www.uniselrealty.com/commercial" },
    openGraph: {
        title: "Commercial Property in Gurgaon | SCO, Offices, Pre-Leased | Unisel Realty",
        description:
            "A working investor's guide to commercial real estate in Gurgaon — SCO plots, Grade-A offices, retail and pre-leased assets. ₹15,000 Cr+ transactions, 20+ years on the ground.",
        url: "https://www.uniselrealty.com/commercial",
        siteName: "Unisel Realty",
        images: [{ url: "/commercial/opengraph-image", width: 1200, height: 630, alt: "Commercial properties Gurgaon" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Commercial Property in Gurgaon | Unisel Realty",
        description:
            "SCO plots, Grade-A offices, retail and pre-leased assets across Gurgaon's prime corridors.",
        images: ["/commercial/opengraph-image"],
    },
};

const heroStats = [
    { num: "20+", label: "Years on the Ground" },
    { num: "₹15,000 Cr+", label: "Transactions Advised" },
    { num: "10,000+", label: "Families & Investors Served" },
    { num: "90%", label: "Investor Retention" },
];

const assetClasses = [
    {
        tag: "Shop-Cum-Office",
        icon: "ph:storefront-fill",
        title: "SCO Plots",
        description:
            "Freehold land parcels in approved commercial zones — typically Basement + Ground + 4 floors. You own the land and design the building. Strong appreciation runway, but you carry construction and tenanting risk until stabilisation.",
        meta: [
            { value: "6–10%", label: "Yield post-stabilisation" },
            { value: "₹1.7–6 Cr", label: "Typical entry ticket" },
        ],
    },
    {
        tag: "Income from Day One",
        icon: "ph:bank-fill",
        title: "Pre-Leased Assets",
        description:
            "Built and already tenanted to a bank, MNC, retail brand or BFSI occupier on a 5–9 year lock-in. The closest thing in Indian commercial real estate to a fixed-income instrument with capital upside.",
        meta: [
            { value: "5.5–8%", label: "Yield from day one" },
            { value: "₹2.5 Cr+", label: "Typical entry ticket" },
        ],
    },
    {
        tag: "Institutional Grade",
        icon: "ph:buildings-fill",
        title: "Grade-A Office Floors",
        description:
            "Cyber City, DLF Downtown, Worldmark, One Horizon Center and similar towers. LEED-certified, large floor plates, MNC tenancy. Lowest vacancy risk in NCR, smoothest rental escalations, easiest institutional exit.",
        meta: [
            { value: "7–8%", label: "Stabilised yield" },
            { value: "₹6–50 Cr+", label: "Per floor plate" },
        ],
    },
    {
        tag: "High-Street Retail",
        icon: "ph:shopping-bag-fill",
        title: "Retail & F&B Units",
        description:
            "Ground-floor retail in projects like M3M Broadway, AIPL Joy Street, Elan The Mark and integrated mixed-use developments. Footfall-driven; ground floor typically appreciates faster than upper floors of the same building.",
        meta: [
            { value: "6–9%", label: "Stabilised yield" },
            { value: "₹1.5–8 Cr", label: "Typical entry ticket" },
        ],
    },
];

const corridors = [
    {
        name: "Cyber City & DLF Downtown",
        sectors: "Sectors 24, 25, 25A",
        bestFor: "MNC headquarters, Fortune 500 occupiers, lowest vacancy risk in NCR",
        yield: "7–8%",
        yieldTone: "primary",
        profile:
            "Established. ₹140–₹155/sqft/month asking. LEED-certified Grade-A. Highest exit liquidity.",
    },
    {
        name: "Golf Course Road",
        sectors: "Sectors 42–54",
        bestFor: "Boutique offices, premium retail, BFSI and consulting tenants",
        yield: "7–8%",
        yieldTone: "primary",
        profile:
            "Established. ₹110–₹200/sqft/month. Rapid Metro spine. Worldmark, One Horizon Center.",
    },
    {
        name: "Golf Course Extension Road",
        sectors: "Sectors 58–67",
        bestFor: "SCO plots, premium retail, Grade-A offices in catchment of luxury residential",
        yield: "8–9%",
        yieldTone: "amber",
        profile:
            "Premium emerging. ₹18,000–₹28,000/sqft capital values for offices. EBD 65, M3M, DLF SCO clusters.",
    },
    {
        name: "Dwarka Expressway",
        sectors: "Sectors 88–114",
        bestFor: "SCO plots, high-street retail, early-cycle capital appreciation play",
        yield: "9–10%",
        yieldTone: "amber",
        profile:
            "Emerging hotspot. SCO plot rates ₹1.99–₹4.5 lakh/sq yd. Strong residential catchment build-up.",
    },
    {
        name: "SPR & New Gurgaon",
        sectors: "Sectors 70–86",
        bestFor: "Mixed-use, IT/ITES offices, balanced risk-reward",
        yield: "8–10%",
        yieldTone: "amber",
        profile:
            "Building out. ₹15,000–₹22,000/sqft. EBD 75A, M3M Broadway, Elan Miracle.",
    },
    {
        name: "MG Road & Sohna Road",
        sectors: "Sectors 28, 32, 67",
        bestFor: "Established retail, value-buy office space, stable cash flow",
        yield: "6–8%",
        yieldTone: "neutral",
        profile:
            "Mature. Lower entry, slower appreciation. Strong for first-time commercial buyers.",
    },
];

const buyerProfiles = [
    {
        icon: "ph:cash-register-fill",
        title: "If you want monthly cash flow",
        items: [
            "Pre-leased retail or office unit on Golf Course Road or Cyber City — 5.5–7% from day one, branded tenant, 5–9 year lock-in",
            "Pre-leased SCO floor on Golf Course Extension or SPR — 7–8.5%, slightly higher tenant churn risk, better appreciation",
            "Avoid: pre-launch \"assured return\" instruments quoting 11–24% — these are usually marketing returns, not stabilised yields",
        ],
    },
    {
        icon: "ph:trend-up-fill",
        title: "If you want capital appreciation",
        items: [
            "SCO plot on Dwarka Expressway in Sectors 88, 113 or 114 — early-cycle, strong residential catchment forming, freehold land",
            "SCO on Golf Course Extension Road in established projects — premium pricing but lower execution risk",
            "Ground-floor retail in landmark mixed-use projects nearing possession — ground floor outperforms upper floors of the same building",
        ],
    },
    {
        icon: "ph:airplane-tilt-fill",
        title: "If you're an NRI parking capital",
        items: [
            "Pre-leased Grade-A office in Cyber City — institutional tenancy, INR cash flow fully repatriable up to USD 1M/year",
            "Pre-leased retail in branded F&B clusters — strong demand from Indian and global brands, recession-resilient",
            "SCO plot held through a Power of Attorney with on-ground asset management — appreciation play with hands-off execution",
        ],
    },
    {
        icon: "ph:briefcase-fill",
        title: "If you're a business owner",
        items: [
            "Buy your own SCO floor in Golf Course Extension or SPR — operate from one floor, lease the rest. Equity build-up replaces rent",
            "Grade-A managed office space in Cyber City — speed-to-occupancy is the trade-off; you pay a premium for it",
            "Boutique office on Golf Course Road for client-facing businesses — the address itself is part of the proposition",
        ],
    },
];

const processSteps = [
    {
        title: "Brief",
        description:
            "One conversation about what you're trying to do — yield, appreciation, end-use, time horizon, exit plan, any tax or FEMA constraints.",
    },
    {
        title: "Shortlist",
        description:
            "3–5 deals matched to the brief, with comparable transactions, rental benchmarks, and a clear-eyed view of what each one is and isn't.",
    },
    {
        title: "Due Diligence",
        description:
            "RERA verification, title chain, encumbrance, builder track record, lease document review for pre-leased assets. We do not skip steps.",
    },
    {
        title: "Close & Hold",
        description:
            "Negotiation, paperwork, registration, handover. For NRI clients, we coordinate banking, repatriation paperwork and ongoing asset management.",
    },
];

const nriPoints = [
    { tag: "FEMA", text: "Commercial property fully permitted; no RBI approval required for NRIs/OCIs." },
    { tag: "Repatriation", text: "Up to USD 1M / financial year of rental and sale proceeds via NRO." },
    { tag: "TDS", text: "20.8% on long-term capital gains; lower rates available with Form 13 application." },
    { tag: "Power of Attorney", text: "Apostilled and registered POA lets us close the deal end-to-end on your behalf." },
    { tag: "Banking", text: "NRE, NRO and FCNR account structuring is part of the engagement." },
];

const faqs = [
    {
        q: "What is the difference between SCO plots and pre-leased commercial property in Gurgaon?",
        a: [
            "An SCO (Shop-Cum-Office) plot is freehold land where you construct your own building and lease floors out over time — higher upside, but you carry construction and tenant risk. A pre-leased property is already built and rented to a tenant, so rental income starts from day one.",
            "SCO plots in Gurgaon currently yield 6–10% post-stabilisation; pre-leased assets typically deliver 5.5–8% from day one with lower volatility. Most well-built portfolios hold both — SCO for appreciation, pre-leased for cash flow.",
        ],
    },
    {
        q: "Which Gurgaon corridor offers the best commercial yields in 2026?",
        a: [
            "Dwarka Expressway and Golf Course Extension Road offer the strongest projected yields, in the 8–10% range, driven by new Grade-A supply, residential catchment build-up and metro proposals. Golf Course Road and Cyber City sit at 7–8% but with the lowest vacancy and tenant credit risk in NCR. SPR and New Gurgaon are early-cycle plays with 8–10% projected yields and stronger capital appreciation runway.",
            "Picking the corridor is not really about who has the highest number — it's about matching the corridor's risk profile to your holding period.",
        ],
    },
    {
        q: "What is the minimum investment for commercial property in Gurgaon?",
        a: [
            "Entry tickets in 2026 vary widely. Smaller SCO plots in Dwarka Expressway start near ₹1.7–2 Cr in the secondary market. New launches on Golf Course Extension and SPR typically start at ₹3 Cr+. Pre-leased retail shops in established projects begin near ₹2.5 Cr. Grade-A office floor plates in Cyber City and Golf Course Road typically start at ₹6–8 Cr per unit.",
            "We help investors match ticket size to yield, lock-in and exit profile rather than buying the cheapest available unit — the cheapest unit is rarely the best risk-adjusted deal.",
        ],
    },
    {
        q: "Can NRIs buy commercial property in Gurgaon?",
        a: [
            "Yes. Under FEMA and RBI rules, NRIs and OCIs can buy commercial property in India without prior approval, except for agricultural land, plantation property and farmhouses. Rental income is fully repatriable up to USD 1 million per financial year through the NRO route, subject to TDS and a Form 15CA/CB filing by a chartered accountant.",
            "We structure transactions for NRIs in the UAE, UK, US, Canada and Singapore, including end-to-end documentation, banking and Power of Attorney coordination.",
        ],
    },
    {
        q: "What rental yield should I expect from commercial property in Gurgaon?",
        a: [
            "Realistic, post-cost yields in Gurgaon as of 2026:",
            "Grade-A offices in Cyber City and Golf Course Road — 7–8%. SCO plots after construction and stabilisation — 6–10%. Pre-leased retail and offices with branded tenants — 5.5–8% from day one. High-street retail in established markets — 6–9%.",
            "Projects advertising 11–24% \"assured returns\" should be examined carefully — these are usually pre-possession marketing instruments funded by the developer, not stabilised post-handover yields.",
        ],
    },
    {
        q: "Are SCO plots a better investment than office space in Gurgaon?",
        a: [
            "Different instruments for different investors. SCO plots give you freehold land ownership and significantly higher capital appreciation potential, but you handle construction and tenanting. Grade-A offices in Cyber City or Golf Course Road give you institutional-quality tenants on long lock-ins and zero construction risk, with smoother yields.",
            "A balanced HNI portfolio in Gurgaon typically holds both — an SCO for appreciation, a pre-leased office or retail unit for cash flow.",
        ],
    },
    {
        q: "How does Unisel Realty get paid?",
        a: [
            "For primary market transactions (new launches), our brokerage is paid by the developer — so our advisory is free for the buyer. For secondary market and pre-leased deals, brokerage is typically split between buyer and seller as per market norms, and we disclose this upfront before the engagement begins.",
            "We do not work on developer \"exclusive\" arrangements that compromise our ability to recommend a competitor's project. If a different developer's deal is the right one for you, we will tell you.",
        ],
    },
    {
        q: "What does due diligence look like for a commercial property in Gurgaon?",
        a: [
            "For SCO plots and offices: RERA registration verification, title chain (typically 30 years), encumbrance certificate, occupation certificate where applicable, builder financial track record, and project completion timelines against original RERA commitments.",
            "For pre-leased assets: everything above plus the actual lease deed review — lock-in period, escalation clauses, security deposit, exit terms, tenant balance sheet quality, and registered/notarised status of the lease.",
            "This is where most informal \"broker\" engagements fall short. We do not.",
        ],
    },
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
    })),
};

const yieldPillClass = (tone: string) => {
    if (tone === "primary") return "bg-primary/15 text-primary";
    if (tone === "amber") return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400";
    return "bg-dark/10 text-dark dark:bg-white/10 dark:text-white";
};

const CommercialPage = () => {
    const schema = propertyCollectionSchema({
        name: "Commercial Property in Gurgaon | Unisel Realty",
        description:
            "SCO plots, Grade-A offices, retail and pre-leased assets across Gurgaon's prime corridors.",
        url: "https://www.uniselrealty.com/commercial",
    });
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://www.uniselrealty.com" },
        { name: "Commercial", url: "https://www.uniselrealty.com/commercial" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Hero */}
            <section className="text-center !pt-40 pb-0 relative overflow-hidden">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                    <div className="flex gap-2.5 items-center justify-center">
                        <Icon
                            icon="ph:buildings-fill"
                            width={20}
                            height={20}
                            className="text-primary"
                        />
                        <p className="text-sm font-semibold text-dark/75 dark:text-white/75 uppercase tracking-widest">
                            Commercial Real Estate · Gurugram
                        </p>
                    </div>
                    <h1 className="text-dark text-3xl sm:text-40 lg:text-52 relative font-bold dark:text-white leading-tight mt-4">
                        Commercial Property in Gurgaon
                    </h1>
                    <p className="text-lg text-dark/50 dark:text-white/50 font-normal max-w-3xl mx-auto mt-4">
                        Chosen the Way Investors Actually Buy
                    </p>
                    <p className="text-base text-dark/60 dark:text-white/60 max-w-3xl mx-auto mt-4 leading-relaxed">
                        Most websites hand you a list. We start with a different question — what are you actually trying to do? Build rental income, park capital before a Dubai exit, set up a flagship office, or position for a 5-year flip on Dwarka Expressway. Each answer points to a very different deal.
                    </p>
                </div>

                <div className="bg-primary mt-10 border-y border-white/10">
                    <div className="max-w-4xl mx-auto flex flex-wrap justify-center">
                        {heroStats.map((s, i) => (
                            <div key={s.label} className="flex items-stretch">
                                <div className="flex flex-col items-center justify-center px-4 sm:px-8 py-6 flex-1 min-w-[140px] gap-1">
                                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-none">
                                        {s.num}
                                    </span>
                                    <span className="text-white/60 text-[10px] sm:text-xs font-medium tracking-widest uppercase text-center">
                                        {s.label}
                                    </span>
                                </div>
                                {i < heroStats.length - 1 && (
                                    <div className="self-center h-8 w-px bg-white/20 flex-shrink-0" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Inventory */}
            <PropertiesListing category="commercial" />

            {/* Intro / Overview */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-5">
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center mb-4">
                            <Icon icon="ph:chart-line-up-fill" className="text-2xl text-primary" />
                            The Gurgaon Commercial Market in 2026
                        </p>
                        <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight">
                            A Market That Has Quietly Become Institutional.
                        </h2>
                    </div>

                    <div className="lg:col-span-7 space-y-4">
                        <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                            For most of the last decade, Gurgaon&apos;s commercial market was a story about Cyber City and Golf Course Road. That story is still true — Cyber City Grade-A asking rents have moved from roughly ₹140 to ₹155 per square foot per month after the Google managed-office deal, and CBRE pegged Grade-A vacancy at around 14% pre-deal before that single transaction shaved nearly 90 basis points off the number. But it is no longer the whole story.
                        </p>
                        <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                            Three things have changed in 2025–26. SCO plots have moved from a niche format to the default investor product on Golf Course Extension Road and Dwarka Expressway, with rental yields sitting in the 6–10% range against 2–3% on residential. Pre-leased assets — retail and office units already tenanted to a bank, MNC or branded retailer — have emerged as the closest thing this market has to a &ldquo;real estate bond.&rdquo; And the new infrastructure thesis around Dwarka Expressway, SPR and the metro extensions has compressed the gap between &ldquo;established&rdquo; and &ldquo;emerging&rdquo; corridors faster than the broker community expected.
                        </p>
                        <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                            What follows is how we read the market — by asset class, by corridor, and by what each instrument is actually good for.
                        </p>

                        {/* At a glance */}
                        <div className="mt-8 bg-primary/5 border-l-4 border-primary rounded-2xl p-7">
                            <p className="text-xs tracking-[0.18em] uppercase text-primary font-semibold mb-3">
                                At a Glance
                            </p>
                            <p className="text-base text-dark dark:text-white leading-7">
                                Gurgaon&apos;s prime commercial corridors deliver rental yields of 6–10% — roughly three times what residential offers in the same micro-markets. SCO plots on Golf Course Extension Road and Dwarka Expressway lead capital appreciation; Cyber City and Golf Course Road lead on tenant credit quality and exit liquidity; pre-leased units offer day-one rental income with 5–9 year lock-ins. Entry tickets begin near ₹1.7 Cr (small-format SCO, secondary market) and scale to ₹50 Cr+ for institutional Grade-A floor plates.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Asset Classes */}
            <section className="bg-dark/[0.02] dark:bg-white/[0.02]">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                    <div className="mb-12 max-w-3xl">
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center mb-4">
                            <Icon icon="ph:squares-four-fill" className="text-2xl text-primary" />
                            Asset Classes
                        </p>
                        <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight mb-3">
                            Four Ways to Own Commercial Real Estate in Gurgaon.
                        </h2>
                        <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                            These are not interchangeable. The right answer depends on whether you want capital appreciation, day-one cash flow, operational use, or a position you can hand to a REIT or institutional buyer in five years.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {assetClasses.map((a) => (
                            <div
                                key={a.title}
                                className="relative border border-dark/10 dark:border-white/10 rounded-2xl p-7 group hover:border-primary/40 hover:shadow-3xl transition-all duration-300 bg-white dark:bg-white/5 overflow-hidden"
                            >
                                <span className="absolute top-0 left-0 right-0 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                                <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
                                    <Icon icon={a.icon} className="text-xl text-primary group-hover:text-white transition-colors duration-300" />
                                </div>
                                <p className="text-[11px] tracking-[0.18em] uppercase text-primary font-semibold mb-2">
                                    {a.tag}
                                </p>
                                <h3 className="text-xl font-semibold dark:text-white mb-3">{a.title}</h3>
                                <p className="text-sm text-dark/60 dark:text-white/60 leading-6 mb-5">
                                    {a.description}
                                </p>
                                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-dark/10 dark:border-white/10">
                                    {a.meta.map((m) => (
                                        <div key={m.label}>
                                            <p className="text-base font-semibold text-primary leading-tight">
                                                {m.value}
                                            </p>
                                            <p className="text-[11px] text-dark/60 dark:text-white/60 mt-1">
                                                {m.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Corridors */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28" id="corridors">
                <div className="mb-10 max-w-3xl">
                    <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center mb-4">
                        <Icon icon="ph:map-pin-fill" className="text-2xl text-primary" />
                        Corridor by Corridor
                    </p>
                    <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight mb-3">
                        Where the Money Is Actually Moving.
                    </h2>
                    <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                        Gurgaon is not one market. The corridor you pick determines tenant profile, rent cycle, capital appreciation curve and, critically, who you can sell to in year five. A summary of how we read each one in 2026:
                    </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-dark/10 dark:border-white/10">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="text-left px-5 py-4 text-xs tracking-[0.06em] uppercase font-semibold">Corridor</th>
                                <th className="text-left px-5 py-4 text-xs tracking-[0.06em] uppercase font-semibold">Best For</th>
                                <th className="text-left px-5 py-4 text-xs tracking-[0.06em] uppercase font-semibold">Yield</th>
                                <th className="text-left px-5 py-4 text-xs tracking-[0.06em] uppercase font-semibold">Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {corridors.map((c, i) => (
                                <tr
                                    key={c.name}
                                    className={`border-t border-dark/10 dark:border-white/10 ${
                                        i % 2 === 1 ? "bg-dark/[0.02] dark:bg-white/[0.02]" : ""
                                    }`}
                                >
                                    <td className="px-5 py-5 align-top">
                                        <p className="font-semibold dark:text-white">{c.name}</p>
                                        <p className="text-xs text-dark/60 dark:text-white/60 mt-1">
                                            {c.sectors}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 align-top text-dark/75 dark:text-white/75">
                                        {c.bestFor}
                                    </td>
                                    <td className="px-5 py-5 align-top">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${yieldPillClass(c.yieldTone)}`}
                                        >
                                            {c.yield}
                                        </span>
                                    </td>
                                    <td className="px-5 py-5 align-top text-dark/75 dark:text-white/75">
                                        {c.profile}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-dark/50 dark:text-white/50 mt-4">
                    Yield ranges and rental rates are advisory benchmarks based on Q1–Q2 2026 market activity. Project-level numbers will vary.
                </p>
            </section>

            {/* Buyer Profiles */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                <div className="mb-12 max-w-3xl">
                    <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center mb-4">
                        <Icon icon="ph:users-three-fill" className="text-2xl text-primary" />
                        How We Match Buyer to Asset
                    </p>
                    <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight">
                        Different Investors, Different Deals.
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {buyerProfiles.map((p) => (
                        <div
                            key={p.title}
                            className="border border-dark/10 dark:border-white/10 rounded-2xl p-8 hover:border-primary/40 hover:shadow-3xl transition-all duration-300"
                        >
                            <div className="flex items-start gap-4 mb-5">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Icon icon={p.icon} className="text-xl text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold dark:text-white pt-2">
                                    {p.title}
                                </h3>
                            </div>
                            <ul className="flex flex-col">
                                {p.items.map((item) => (
                                    <li
                                        key={item}
                                        className="flex gap-3 py-3 border-b last:border-b-0 border-dashed border-dark/10 dark:border-white/10 text-sm text-dark/75 dark:text-white/75 leading-6"
                                    >
                                        <Icon
                                            icon="ph:arrow-right-bold"
                                            className="text-primary text-base shrink-0 mt-1"
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Process */}
            <section className="bg-dark/[0.02] dark:bg-white/[0.02]">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                    <div className="mb-12 max-w-3xl">
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center mb-4">
                            <Icon icon="ph:path-fill" className="text-2xl text-primary" />
                            How We Work
                        </p>
                        <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight mb-3">
                            The Process, End to End.
                        </h2>
                        <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                            No rush, no last-minute pressure. We sit on the same side of the table as the buyer, not the developer.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {processSteps.map((s, i) => (
                            <div
                                key={s.title}
                                className="bg-white dark:bg-white/5 border border-dark/10 dark:border-white/10 rounded-2xl p-7 hover:border-primary/40 hover:shadow-3xl transition-all duration-300"
                            >
                                <p className="text-4xl font-medium text-primary leading-none mb-4">
                                    {String(i + 1).padStart(2, "0")}
                                </p>
                                <h4 className="text-lg font-semibold dark:text-white mb-2">
                                    {s.title}
                                </h4>
                                <p className="text-sm text-dark/60 dark:text-white/60 leading-6">
                                    {s.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NRI Block */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                <div className="bg-primary rounded-3xl p-8 md:p-14 grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
                    <div className="lg:col-span-3">
                        <p className="text-xs tracking-[0.18em] uppercase font-semibold text-white/80 mb-4">
                            NRI Investors
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-[42px] font-medium text-white leading-tight mb-5">
                            Investing from Dubai, London, Singapore or Toronto.
                        </h2>
                        <p className="text-white/85 text-base leading-7 mb-4">
                            Our Dubai office handles a meaningful share of the NRI book. Commercial real estate in India is one of the few asset classes where NRIs and OCIs can buy freely under FEMA — and rental income is fully repatriable up to USD 1 million per financial year through the NRO route, with a clean 15CA/15CB filing trail.
                        </p>
                        <p className="text-white/85 text-base leading-7 mb-6">
                            The complication is rarely the regulation. It&apos;s coordinating execution across time zones — site visits, document signings, banking, ongoing tenant management. That&apos;s the part we run for you.
                        </p>
                        <Link
                            href="/services/nri-property-investment-gurgaon"
                            className="inline-flex items-center gap-2 text-white font-semibold border-b border-white/40 hover:border-white pb-1 transition-colors"
                        >
                            Read the full NRI investor guide
                            <Icon icon="ph:arrow-right-bold" />
                        </Link>
                    </div>

                    <div className="lg:col-span-2 bg-white/10 backdrop-blur border-l-4 border-white rounded-2xl p-6">
                        <ul className="flex flex-col">
                            {nriPoints.map((n) => (
                                <li
                                    key={n.tag}
                                    className="py-3 border-b last:border-b-0 border-white/15"
                                >
                                    <p className="text-[11px] tracking-[0.12em] uppercase font-semibold text-white mb-1">
                                        {n.tag}
                                    </p>
                                    <p className="text-sm text-white/90 leading-6">{n.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Authority Strip */}
            <section className="bg-dark/[0.02] dark:bg-white/[0.02] border-y border-dark/10 dark:border-white/10">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0 py-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                        <div>
                            <p className="text-2xl md:text-3xl font-medium text-primary mb-1">2006</p>
                            <p className="text-xs text-dark/60 dark:text-white/60 tracking-[0.04em]">
                                Established
                            </p>
                        </div>
                        <div>
                            <p className="text-lg md:text-xl font-medium text-primary mb-1">RERA Registered</p>
                            <p className="text-[11px] text-dark/60 dark:text-white/60 tracking-[0.04em]">
                                RC/HARERA/GGM/1940/1535/2022/308
                            </p>
                        </div>
                        <div>
                            <p className="text-2xl md:text-3xl font-medium text-primary mb-1">
                                Gurgaon &amp; Dubai
                            </p>
                            <p className="text-xs text-dark/60 dark:text-white/60 tracking-[0.04em]">
                                Two office locations
                            </p>
                        </div>
                        <div>
                            <p className="text-base md:text-lg font-medium text-primary mb-1">
                                DLF · Godrej · M3M · Emaar
                            </p>
                            <p className="text-xs text-dark/60 dark:text-white/60 tracking-[0.04em]">
                                Channel partnerships
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center mb-4">
                            <Icon icon="ph:question-fill" className="text-2xl text-primary" />
                            Investor Questions, Answered Honestly
                        </p>
                        <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight">
                            Frequently Asked Questions.
                        </h2>
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-3">
                        {faqs.map((f) => (
                            <details
                                key={f.q}
                                className="group border border-dark/10 dark:border-white/10 rounded-2xl bg-white dark:bg-white/5 hover:border-primary/40 hover:shadow-3xl transition-all duration-300"
                            >
                                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 text-base font-semibold dark:text-white">
                                    <span>{f.q}</span>
                                    <Icon
                                        icon="ph:plus-bold"
                                        className="text-primary text-xl shrink-0 transition-transform duration-300 group-open:rotate-45"
                                    />
                                </summary>
                                <div className="px-6 pb-6 -mt-1 space-y-3">
                                    {f.a.map((p, i) => (
                                        <p
                                            key={i}
                                            className="text-sm text-dark/70 dark:text-white/70 leading-7"
                                        >
                                            {p}
                                        </p>
                                    ))}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA + Author Strip */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 pb-14 md:pb-28">
                <div className="bg-primary rounded-3xl p-10 md:p-16 text-center">
                    <p className="text-xs tracking-[0.18em] uppercase font-semibold text-white/80 mb-4">
                        Start the Conversation
                    </p>
                    <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">
                        Tell Us What You&apos;re Trying to Do.
                    </h2>
                    <p className="text-white/85 text-base md:text-lg max-w-2xl mx-auto mb-8">
                        One call. We&apos;ll either match you to 3–5 deals worth your time, or tell you that the right move is to wait six months. No pressure, no list of 40 properties to wade through.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:+918010303303"
                            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors duration-300"
                        >
                            <Icon icon="ph:phone-fill" />
                            Call +91 8010-303-303
                        </a>
                        <a
                            href="mailto:info@uniselrealty.com"
                            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors duration-300"
                        >
                            <Icon icon="ph:envelope-simple-fill" />
                            Email an Advisor
                        </a>
                    </div>
                </div>

                <div className="mt-8 flex items-center gap-4 border border-dark/10 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-white/5">
                    <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-lg shrink-0">
                        UR
                    </div>
                    <div>
                        <p className="text-sm font-semibold dark:text-white">
                            Reviewed by Unisel Realty Advisory Team
                        </p>
                        <p className="text-xs text-dark/60 dark:text-white/60 mt-1">
                            RERA Registered Advisory · Established 2006 · Gurugram &amp; Dubai · Last updated May 2026
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CommercialPage;
