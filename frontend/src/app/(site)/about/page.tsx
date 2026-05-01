import { Metadata } from "next";
import HeroSub from "@/components/shared/HeroSub";
import AnimatedStats from "@/components/About/AnimatedStats";
import { aboutPageSchema, breadcrumbSchema } from "@/lib/jsonld";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import Image from "next/image";
import { getBuilderPartners } from "@/lib/sanity.services";
import { urlFor } from "@/lib/sanity.image";

export const metadata: Metadata = {
    title: "About Us | Gurgaon's Trusted Luxury Real Estate Advisory Since 2005",
    description:
        "Unisel Realty — 20+ years curating India's finest real estate. ₹2,400 Cr+ transacted, 3,800+ families housed, 4.9★ client rating. Pre-launch access to DLF, Godrej, M3M, Emaar. Gurgaon · Dubai NRI desk.",
    keywords: [
        "about unisel realty",
        "gurgaon luxury real estate channel partner",
        "luxury property advisory gurgaon",
        "real estate experts gurgaon",
        "NRI property services gurgaon",
        "golf course road real estate",
        "dwarka expressway properties",
        "rohit sharma unisel realty",
    ],
    alternates: { canonical: "https://www.uniselrealty.com/about" },
    openGraph: {
        title: "About Unisel Realty | Gurgaon's Trusted Luxury Real Estate Advisory",
        description:
            "20+ years of expertise in Gurgaon luxury real estate. ₹2,400 Cr+ transacted, 3,800+ families housed, 4.9★ rating.",
        url: "https://www.uniselrealty.com/about",
        siteName: "Unisel Realty",
        images: [{ url: "/about/opengraph-image", width: 1200, height: 630, alt: "About Unisel Realty" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Unisel Realty | Luxury Real Estate Advisory Since 2005",
        description:
            "Gurgaon's most trusted advisors for luxury real estate & high-return investments.",
        images: ["/about/opengraph-image"],
    },
};

const aboutTiles = [
    {
        icon: "ph:trophy-fill",
        title: "Market Leadership",
        description:
            "Consistently ranked among top channel partners by DLF, Godrej, M3M & Emaar in Gurgaon's premium segment.",
    },
    {
        icon: "ph:globe-hemisphere-east-fill",
        title: "Dubai Office",
        description:
            "Dedicated NRI investor desk in Dubai serving the Indian diaspora with seamless end-to-end transaction support.",
    },
    {
        icon: "ph:magnifying-glass-fill",
        title: "Curated Portfolio",
        description:
            "Access to pre-launch allocations and exclusive inventory not available in the open market.",
    },
    {
        icon: "ph:chart-line-up-fill",
        title: "Wealth Advisory",
        description:
            "Beyond transactions — portfolio strategy, rental yield optimisation, and exit planning.",
    },
];

const founderCreds = [
    { num: "20+", label: "Years in Luxury Real Estate" },
    { num: "₹2,400 Cr", label: "Transactions Supervised" },
    { num: "3,800+", label: "Families Served" },
    { num: "2", label: "Offices · Gurgaon & Dubai" },
];

const returns = [
    {
        project: "DLF The Camellias",
        multiple: "3.8×",
        period: "Over 6 years · 2018–2024",
        type: "Ultra-Luxury · Golf Course Road",
        featured: true,
    },
    {
        project: "Godrej Golf Links",
        multiple: "2.6×",
        period: "Over 5 years · 2019–2024",
        type: "Premium · Golf Course Extension",
    },
    {
        project: "M3M Golf Estate",
        multiple: "2.2×",
        period: "Over 4 years · 2020–2024",
        type: "Luxury · Sector 65",
    },
    {
        project: "Emaar Palm Heights",
        multiple: "1.9×",
        period: "Over 3 years · 2021–2024",
        type: "Premium · Dwarka Expressway",
    },
];

const markets = [
    {
        num: "01",
        name: "Golf Course Road",
        desc: "DLF Camellias · Aralias · Magnolias · Pinnacle",
        psf: "₹35K–₹80K",
    },
    {
        num: "02",
        name: "Golf Course Ext. Road",
        desc: "Godrej · M3M · Emaar · Sobha · Sector 65–70",
        psf: "₹14K–₹30K",
    },
    {
        num: "03",
        name: "Dwarka Expressway",
        desc: "Adani Realty · M3M · Sobha · Sector 99–113",
        psf: "₹10K–₹22K",
    },
    {
        num: "04",
        name: "New Gurgaon",
        desc: "High-yield emerging sectors with metro connectivity",
        psf: "₹7K–₹14K",
    },
];

const whyChoose = [
    {
        icon: "ph:target-fill",
        title: "Pre-Launch Access",
        description:
            "Developer relationships unlock inventory before public launch — often at 15–25% below market pricing at possession. This alone has generated extraordinary returns for our earliest investors.",
    },
    {
        icon: "ph:shield-check-fill",
        title: "Transparent Advisory",
        description:
            "We tell clients what to avoid, not just what to buy. Our no-pressure advisory has built 20 years of referral trust. 68% of our business comes from existing client recommendations.",
    },
    {
        icon: "ph:key-fill",
        title: "End-to-End Management",
        description:
            "From site visits and due diligence through home loans, legal, interior handover, and tenant placement — Unisel is your single point of contact across the entire ownership journey.",
    },
    {
        icon: "ph:globe-fill",
        title: "NRI Specialisation",
        description:
            "Our Dubai NRI desk understands FEMA compliance, power of attorney structures, and repatriation. NRI clients invest with confidence knowing every regulatory detail is handled.",
    },
    {
        icon: "ph:chart-line-up-fill",
        title: "Market Intelligence",
        description:
            "Proprietary micro-market data updated weekly. We track FSI changes, infrastructure announcements, and developer distress opportunities before they become public knowledge.",
    },
    {
        icon: "ph:diamond-fill",
        title: "Portfolio Curation",
        description:
            "Not every project earns our recommendation. We advise clients against purchases we wouldn't make ourselves. This filter is why our clients' portfolios consistently outperform the market.",
    },
];

const testimonials = [
    {
        badge: "287% Return · 6 Years",
        text: "Unisel advised us to book in DLF Camellias when everyone else thought ₹25K PSF was the ceiling. Today it's touching ₹80K. They didn't just sell us a flat — they gave us a generational asset.",
        initials: "RK",
        name: "Rajiv Khanna",
        tag: "MD, Pharmaceuticals",
        location: "NRI · London",
        featured: true,
    },
    {
        badge: "160% Return · 4 Years",
        text: "As an NRI, trust is everything. Unisel's Dubai team handled every detail — from legal due diligence to interior coordination — while I was 3,000 km away. Flawless experience, outstanding returns.",
        initials: "PS",
        name: "Priya Subramaniam",
        tag: "Senior Executive, ADNOC",
        location: "NRI · Abu Dhabi",
    },
    {
        badge: "120% Return · 3 Years",
        text: "I've worked with five agencies across Gurgaon. None come close to Unisel's market depth. They got me into M3M Golf Estate at pre-launch pricing. The appreciation has been extraordinary.",
        initials: "AM",
        name: "Ankit Mehrotra",
        tag: "Partner, Big 4 Consulting",
        location: "HNI · Gurgaon",
    },
    {
        badge: "90% Return · 3 Years",
        text: "The Unisel team understood my yield requirements immediately. They matched me to the perfect asset — a 4BHK on Golf Course Road now generating 5.2% net rental yield.",
        initials: "SB",
        name: "Sumit Bhatia",
        tag: "VP, Global Bank",
        location: "NRI · Singapore",
    },
    {
        badge: "210% Return · 5 Years",
        text: "We invested in two units on Golf Course Extension in 2019 on Unisel's recommendation. Both have tripled in value. We've since referred 11 friends and family — all equally satisfied.",
        initials: "VN",
        name: "Vikram Nair",
        tag: "Entrepreneur, Tech Sector",
        location: "HNI · Bengaluru",
    },
    {
        badge: "Rental Yield 5.8% p.a.",
        text: "Post-retirement, I wanted stable income from real estate. Unisel structured a portfolio of two mid-segment units. My monthly rental income has exceeded expectations every quarter for three years.",
        initials: "MG",
        name: "Meena Gupta",
        tag: "Retired IAS Officer",
        location: "HNI · Delhi NCR",
    },
];

const nriCapabilities = [
    "FEMA-compliant transaction structuring",
    "Power of Attorney documentation support",
    "Virtual site tours and 3D walkthroughs",
    "NRI home loan partnerships with leading banks",
    "Post-purchase rental management & yield reporting",
    "Seamless fund repatriation guidance",
];

const AboutPage = async () => {
    const partners = await getBuilderPartners();
    const track = partners && partners.length > 0 ? [...partners, ...partners] : [];
    const schema = aboutPageSchema();
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://www.uniselrealty.com" },
        { name: "About Us", url: "https://www.uniselrealty.com/about" },
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

            {/* Hero */}
            <HeroSub
                title="Where Exceptional Addresses Meet Exceptional Returns."
                description="Two decades of curating India's finest real estate opportunities for discerning investors across the globe. From Golf Course Road to Dwarka Expressway — we don't just sell properties, we engineer wealth."
                badge="Luxury Real Estate Channel Partner · Gurgaon NCR"
            />

            {/* Stats Bar */}
            <section className="bg-primary/5 dark:bg-primary/10">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0 py-10 md:py-14">
                    <AnimatedStats />
                </div>
            </section>

            {/* About / Our Story */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    <div>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center mb-4">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                            About Unisel
                        </p>
                        <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight mb-6">
                            Twenty Years of Trust<br /> in Every Transaction.
                        </h2>
                        <div className="space-y-4">
                            <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                                Established in the mid-2000s, Unisel Realty has emerged as Gurgaon&apos;s most trusted luxury real estate channel partner. Built on the twin pillars of market intelligence and client-first advisory, we&apos;ve guided HNIs, CXOs, and NRI investors toward addresses that don&apos;t just appreciate — they define lifestyles.
                            </p>
                            <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                                Our team combines deep hyperlocal expertise with a global perspective, operating across Gurgaon and Dubai to serve clients wherever they are.
                            </p>
                        </div>
                    </div>

                    {/* Tiles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {aboutTiles.map((tile) => (
                            <div
                                key={tile.title}
                                className="border border-dark/10 dark:border-white/10 rounded-2xl p-6 group hover:border-primary/40 hover:shadow-3xl transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
                                    <Icon icon={tile.icon} className="text-xl text-primary group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-lg font-semibold dark:text-white mb-2">{tile.title}</h3>
                                <p className="text-sm text-dark/60 dark:text-white/60 leading-6">{tile.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder */}
            <section className="bg-dark/[0.02] dark:bg-white/[0.02]">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
                        {/* Left: photo card + creds */}
                        <div className="lg:col-span-2">
                            <div className="relative aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex flex-col items-center justify-center overflow-hidden">
                                <span className="absolute top-4 left-4 w-7 h-7 border-t border-l border-primary" />
                                <span className="absolute top-4 right-4 w-7 h-7 border-t border-r border-primary" />
                                <span className="absolute bottom-4 left-4 w-7 h-7 border-b border-l border-primary" />
                                <span className="absolute bottom-4 right-4 w-7 h-7 border-b border-r border-primary" />
                                <span className="text-8xl font-medium text-primary/30">RS</span>
                                <span className="mt-2 text-xs tracking-[0.3em] uppercase text-primary/60">
                                    Founder &amp; Managing Director
                                </span>
                                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                            </div>

                            <div className="mt-5 bg-primary text-white rounded-xl px-5 py-4 flex items-center justify-between">
                                <div>
                                    <p className="text-base font-semibold">Rohit Sharma</p>
                                    <p className="text-[11px] tracking-[0.18em] uppercase text-white/75 mt-1">
                                        Founder &amp; MD · Unisel Realty
                                    </p>
                                </div>
                                <span className="text-xs text-white/70">Est. 2005</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-5">
                                {founderCreds.map((c) => (
                                    <div
                                        key={c.label}
                                        className="border border-dark/10 dark:border-white/10 rounded-xl p-4"
                                    >
                                        <p className="text-2xl font-medium text-primary leading-none">{c.num}</p>
                                        <p className="text-[11px] tracking-[0.15em] uppercase text-dark/60 dark:text-white/60 mt-2">
                                            {c.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: message */}
                        <div className="lg:col-span-3">
                            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center mb-4">
                                <Icon icon="ph:quotes-fill" className="text-2xl text-primary" />
                                Founder&apos;s Message
                            </p>
                            <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight mb-6">
                                We Built Unisel<br /> on One Promise — Your Trust.
                            </h2>

                            <div className="border-l-4 border-primary pl-5 mb-6">
                                <p className="text-lg md:text-xl italic text-dark dark:text-white leading-relaxed">
                                    &ldquo;I started Unisel Realty with a simple belief — that a homebuyer or investor deserves the same quality of advice that they give their most important business decisions. Not a sales pitch. Not a brochure. Real, honest counsel.&rdquo;
                                </p>
                            </div>

                            <div className="space-y-4">
                                <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                                    When I founded Unisel in 2005, Gurgaon&apos;s luxury segment was just beginning to take shape. Golf Course Road was still a promise. I saw what others didn&apos;t — that this corridor would become India&apos;s most coveted residential address. We positioned ourselves not as brokers, but as advisors who happened to facilitate transactions.
                                </p>
                                <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                                    Over two decades, I&apos;ve watched clients turn a single apartment purchase into a multi-crore portfolio. I&apos;ve seen NRI families secure their Indian roots with an address that reflects their success. And I&apos;ve seen the power of buying right — the right project, the right floor, the right timing — transform financial futures.
                                </p>
                                <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                                    Our Dubai office was born from one realisation: India&apos;s NRI community deserves a trusted partner in their own time zone who speaks their language — financially and culturally. Today, nearly 35% of our transactions are NRI-led, and that number grows every year.
                                </p>
                                <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                                    What keeps me going is not the transactions closed, but the calls I receive years later — <em className="text-primary not-italic font-medium">&ldquo;Rohit ji, that investment changed our family&apos;s life.&rdquo;</em> That is why Unisel exists.
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-dark/10 dark:border-white/10">
                                <p className="text-2xl italic text-primary font-medium">Rohit Sharma</p>
                                <p className="text-xs tracking-[0.2em] uppercase text-dark/60 dark:text-white/60 mt-2">
                                    Founder &amp; Managing Director, Unisel Realty
                                </p>
                                <p className="text-xs text-dark/60 dark:text-white/60 mt-1">
                                    Gurgaon · Dubai · Since 2005
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Track Record / Returns */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center justify-center mb-4">
                        <Icon icon="ph:trend-up-fill" className="text-2xl text-primary" />
                        Track Record · Average Returns
                    </p>
                    <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight">
                        Portfolios That Outperform.
                    </h2>
                    <p className="text-dark/50 dark:text-white/50 text-base mt-3">
                        Verified average capital appreciation across projects advised by Unisel Realty over holding periods of 3–7 years.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {returns.map((r) => (
                        <div
                            key={r.project}
                            className={`relative rounded-2xl p-7 border transition-all duration-300 hover:shadow-3xl ${
                                r.featured
                                    ? "bg-primary/10 border-primary/40"
                                    : "bg-white dark:bg-white/5 border-dark/10 dark:border-white/10 hover:border-primary/40"
                            }`}
                        >
                            {r.featured && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full">
                                    Best Performer
                                </span>
                            )}
                            <p className="text-xs tracking-[0.2em] uppercase text-primary font-semibold mb-4">
                                {r.project}
                            </p>
                            <p className="text-5xl font-medium dark:text-white leading-none flex items-baseline gap-1">
                                <Icon icon="ph:arrow-up-bold" className="text-2xl text-primary" />
                                {r.multiple}
                            </p>
                            <p className="text-xs text-dark/60 dark:text-white/60 mt-2 mb-5">{r.period}</p>
                            <p className="text-xs text-dark/60 dark:text-white/60 pt-4 border-t border-dark/10 dark:border-white/10">
                                {r.type}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="text-center text-xs text-dark/40 dark:text-white/40 mt-10 max-w-3xl mx-auto">
                    Past performance is indicative and based on market data and client transaction records. Returns vary by specific unit, floor, and timing. This is not an investment guarantee.
                </p>
            </section>

            {/* Markets */}
            <section className="bg-dark/[0.02] dark:bg-white/[0.02]">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
                        <div className="lg:col-span-1">
                            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center mb-4">
                                <Icon icon="ph:map-pin-fill" className="text-2xl text-primary" />
                                Our Markets
                            </p>
                            <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight mb-4">
                                Gurgaon&apos;s Prime Corridors.
                            </h2>
                            <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                                We operate exclusively in Gurgaon&apos;s most sought-after micro-markets — corridors with proven appreciation history, world-class infrastructure, and consistent NRI demand.
                            </p>
                        </div>

                        <div className="lg:col-span-2 flex flex-col gap-3">
                            {markets.map((m) => (
                                <div
                                    key={m.name}
                                    className="grid grid-cols-[auto_1fr_auto] gap-5 items-center px-6 py-5 border border-dark/10 dark:border-white/10 rounded-2xl bg-white dark:bg-white/5 hover:border-primary/40 hover:shadow-3xl transition-all duration-300"
                                >
                                    <span className="text-2xl font-medium text-primary/30 leading-none">{m.num}</span>
                                    <div>
                                        <p className="text-lg font-semibold dark:text-white">{m.name}</p>
                                        <p className="text-xs text-dark/60 dark:text-white/60 mt-1">{m.desc}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-medium text-primary leading-none">{m.psf}</p>
                                        <p className="text-[10px] tracking-[0.15em] uppercase text-dark/60 dark:text-white/60 mt-1">
                                            Per Sq. Ft.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Unisel */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center justify-center mb-4">
                        <Icon icon="ph:star-four-fill" className="text-2xl text-primary" />
                        The Unisel Difference
                    </p>
                    <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight">
                        Why 3,800+ Families Chose Us.
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {whyChoose.map((w, i) => (
                        <div
                            key={w.title}
                            className="relative border border-dark/10 dark:border-white/10 rounded-2xl p-8 group hover:border-primary/40 hover:shadow-3xl transition-all duration-300 overflow-hidden"
                        >
                            <span className="absolute top-4 right-6 text-7xl font-bold text-dark/[0.04] dark:text-white/[0.04] select-none">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-5 transition-colors duration-300">
                                <Icon icon={w.icon} className="text-2xl text-primary group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-lg font-semibold dark:text-white mb-3">{w.title}</h3>
                            <p className="text-sm text-dark/60 dark:text-white/60 leading-6">{w.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-dark/[0.02] dark:bg-white/[0.02]">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                        <div>
                            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center mb-4">
                                <Icon icon="ph:chat-circle-text-fill" className="text-2xl text-primary" />
                                Client Stories
                            </p>
                            <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight">
                                Heard from Those Who Invested with Us.
                            </h2>
                        </div>
                        <div className="md:text-right">
                            <p className="text-5xl font-medium text-primary leading-none">4.9</p>
                            <p className="text-lg text-primary tracking-[2px] mt-1">★★★★★</p>
                            <p className="text-xs tracking-[0.2em] uppercase text-dark/60 dark:text-white/60 mt-1">
                                Avg. Client Rating · 400+ Reviews
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {testimonials.map((t) => (
                            <div
                                key={t.name}
                                className={`relative rounded-2xl p-7 border transition-all duration-300 hover:shadow-3xl ${
                                    t.featured
                                        ? "bg-primary/10 border-primary/40"
                                        : "bg-white dark:bg-white/5 border-dark/10 dark:border-white/10 hover:border-primary/40"
                                }`}
                            >
                                <Icon
                                    icon="ph:quotes-fill"
                                    className="text-3xl text-primary/30 mb-3"
                                />
                                <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/30 text-primary text-[11px] font-semibold tracking-[0.08em] px-3 py-1.5 rounded-full mb-4">
                                    <Icon icon="ph:arrow-up-bold" className="text-xs" />
                                    {t.badge}
                                </span>
                                <p className="text-sm italic text-dark/75 dark:text-white/75 leading-7 mb-5">
                                    &ldquo;{t.text}&rdquo;
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-dark/10 dark:border-white/10">
                                    <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold shrink-0">
                                        {t.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold dark:text-white">{t.name}</p>
                                        <p className="text-xs text-dark/60 dark:text-white/60">{t.tag}</p>
                                        <span className="inline-block mt-1 text-[10px] font-bold tracking-[0.1em] uppercase bg-primary/15 text-primary px-2 py-0.5 rounded">
                                            {t.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NRI Investor Desk */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Visual */}
                    <div className="relative h-[420px]">
                        <div className="absolute top-0 left-0 w-[75%] rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur p-7">
                            <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-semibold mb-3">
                                🇦🇪 Dubai Office
                            </p>
                            <p className="text-3xl font-medium dark:text-white mb-2">Dubai</p>
                            <p className="text-sm text-dark/60 dark:text-white/60 leading-6">
                                Dedicated NRI investor desk serving the Indian diaspora with seamless India real estate investments.
                            </p>
                            <p className="text-xl mt-4">🇦🇪 🇬🇧 🇺🇸 🇸🇬 🇨🇦</p>
                        </div>
                        <div className="absolute bottom-0 right-0 w-[65%] rounded-2xl border border-dark/10 dark:border-white/10 bg-white dark:bg-white/5 p-6">
                            <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-semibold mb-3">
                                Headquarters
                            </p>
                            <p className="text-3xl font-medium dark:text-white mb-2">Gurgaon</p>
                            <p className="text-sm text-dark/60 dark:text-white/60 leading-6">
                                Golf Course Road · Sector 42<br />Haryana, India 122002
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center mb-4">
                            <Icon icon="ph:airplane-tilt-fill" className="text-2xl text-primary" />
                            NRI Investor Desk
                        </p>
                        <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight mb-6">
                            Invest in India from Anywhere in the World.
                        </h2>
                        <p className="text-base text-dark/60 dark:text-white/60 leading-7 mb-6">
                            Our NRI desk was purpose-built for the Indian professional abroad who wants the wealth-building power of Gurgaon real estate without the complexity of managing it remotely. We&apos;ve executed over ₹600 Cr in NRI-led transactions.
                        </p>
                        <ul className="flex flex-col gap-3">
                            {nriCapabilities.map((c) => (
                                <li key={c} className="flex items-center gap-3 text-sm text-dark/75 dark:text-white/75">
                                    <Icon icon="ph:check-circle-fill" className="text-primary text-lg shrink-0" />
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Developer Partners */}
            <section className="bg-dark/[0.02] dark:bg-white/[0.02] py-14 md:py-28">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0 mb-10">
                    <div className="text-center">
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center justify-center mb-4">
                            <Icon icon="ph:handshake-fill" className="text-2xl text-primary" />
                            Developer Partnerships
                        </p>
                        <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight">
                            India&apos;s Most Prestigious Developers.
                        </h2>
                        <p className="text-dark/50 dark:text-white/50 text-base mt-3 max-w-2xl mx-auto">
                            We work directly with the most reputed developers to secure pre-launch access and exclusive allotments for our clients.
                        </p>
                    </div>
                </div>

                {track.length > 0 && (
                    <div className="relative overflow-hidden">
                        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#f9f9f9] dark:from-[#0f0f0f] to-transparent z-10" />
                        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#f9f9f9] dark:from-[#0f0f0f] to-transparent z-10" />

                        <div
                            className="flex gap-6 w-max"
                            style={{ animation: "marquee 28s linear infinite" }}
                        >
                            {track.map((partner, index) => (
                                <div
                                    key={`${partner._id}-${index}`}
                                    className="flex items-center justify-center px-0 py-0 border border-black/10 dark:border-white/10 rounded-2xl bg-white dark:bg-white/5 min-w-[180px] h-[80px] flex-shrink-0 hover:border-primary/50 duration-300"
                                >
                                    <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                        <Image
                                            src={urlFor(partner.logo).width(300).url()}
                                            alt={partner.name}
                                            fill
                                            className="object-cover"
                                            sizes="180px"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                <div className="bg-primary rounded-3xl p-10 md:p-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">
                        The Right Address Changes Everything.
                    </h2>
                    <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8">
                        Whether you&apos;re a first-time investor or expanding a multi-crore portfolio, our advisory team is ready to identify the right opportunity for your specific goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors duration-300"
                        >
                            Book a Consultation
                            <Icon icon="ph:arrow-right" className="text-lg" />
                        </Link>
                        <Link
                            href="/all-properties"
                            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors duration-300"
                        >
                            Browse Properties
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutPage;
