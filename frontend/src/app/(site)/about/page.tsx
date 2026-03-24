import { Metadata } from "next";
import HeroSub from "@/components/shared/HeroSub";
import AnimatedStats from "@/components/About/AnimatedStats";
import { aboutPageSchema, breadcrumbSchema } from "@/lib/jsonld";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Unisel Realty | Gurgaon's Trusted Luxury Real Estate Advisory Since 2006",
    description:
        "Unisel Realty Pvt Ltd — 20+ years advising on luxury residential and commercial properties in Gurgaon. 2B+ transacted, 2000+ families served, 75% repeat client rate. Exclusive pre-launch access to DLF, Godrej, M3M.",
    keywords: [
        "about unisel realty",
        "gurgaon real estate consultants",
        "luxury property advisory gurgaon",
        "real estate experts gurgaon",
        "NRI property services gurgaon",
        "golf course road real estate",
        "dwarka expressway properties",
    ],
    alternates: { canonical: "https://uniselrealty.com/about" },
    openGraph: {
        title: "About Unisel Realty | Gurgaon's Trusted Luxury Real Estate Advisory",
        description:
            "20+ years of expertise in Gurgaon luxury real estate. 2B+ transacted value, 2000+ families placed, 62% repeat client rate.",
        url: "https://uniselrealty.com/about",
        siteName: "Unisel Realty",
        images: [{ url: "/images/hero/og-image.jpg", width: 1200, height: 630, alt: "About Unisel Realty" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Unisel Realty | Luxury Real Estate Advisory Since 2006",
        description:
            "Gurgaon's most trusted advisors for luxury real estate & high-return investments.",
        images: ["/images/hero/og-image.jpg"],
    },
};

const services = [
    {
        icon: "ph:buildings-fill",
        title: "Luxury Residential Advisory",
        description:
            "Pre-launch access to premium projects from DLF, Godrej, M3M, and Sobha across Golf Course Road, Dwarka Expressway, and New Gurgaon.",
    },
    {
        icon: "ph:storefront-fill",
        title: "Commercial & SCO Investment",
        description:
            "Strategic guidance on Shop-Cum-Office plots and commercial real estate with a focus on yield optimisation and long-term appreciation.",
    },
    {
        icon: "ph:globe-fill",
        title: "NRI Property Services",
        description:
            "End-to-end transaction support for 200+ NRI clients across UAE, UK, USA, Singapore, Canada, and Australia — including POA structuring, FEMA compliance, and repatriation planning.",
    },
    {
        icon: "ph:key-fill",
        title: "Post-Purchase Management",
        description:
            "Property management for 80+ units including possession coordination, tenant screening, rent collection, and yield reporting averaging 4.2% annual rental yield.",
    },
];

const milestones = [
    { year: "2006", text: "Founded with a vision to bring transparency to Gurgaon's real estate market" },
    { year: "2010", text: "Pre-launch allotments in every major Golf Course Road project since this year" },
    { year: "2015", text: "Expanded into NRI advisory services, now serving clients across 6 countries" },
    { year: "2018", text: "Crossed 1,000 Cr+ in cumulative transacted value" },
    { year: "2022", text: "Launched dedicated post-purchase property management vertical" },
    { year: "2024", text: "Surpassed $2B+ in transacted value with zero developer disputes" },
];

const values = [
    {
        icon: "ph:shield-check-fill",
        title: "Transparency First",
        description: "Every recommendation is backed by data. No hidden commissions, no push-selling. We present the full picture so you decide with confidence.",
    },
    {
        icon: "ph:chart-line-up-fill",
        title: "Investment-Led Thinking",
        description: "We don't just sell properties — we advise on investments. Every option we present is evaluated for capital appreciation, rental yield, and exit potential.",
    },
    {
        icon: "ph:handshake-fill",
        title: "Client-First Approach",
        description: "Our 75% repeat client rate speaks for itself. We build relationships, not transactions — guiding families from first enquiry through possession and beyond.",
    },
    {
        icon: "ph:users-three-fill",
        title: "Deep Market Expertise",
        description: "A specialised team of 20+ professionals covering new bookings, leasing, and resale across every Gurgaon micro-market — from Sector 54 to Sector 113.",
    },
];

const developers = [
    "DLF", "Godrej Properties", "M3M", "Sobha", "Tata Housing",
    "Adani Realty", "Emaar", "Ireo", "Vatika", "Puri Constructions",
];

const AboutPage = () => {
    const schema = aboutPageSchema();
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://uniselrealty.com" },
        { name: "About Us", url: "https://uniselrealty.com/about" },
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
                title="About Unisel Realty."
                description="Gurgaon's most trusted advisors for luxury real estate and high-return investments — since 2006."
                badge="About Us"
            />

            {/* Stats Bar */}
            <section className="bg-primary/5 dark:bg-primary/10">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0 py-10 md:py-14">
                    <AnimatedStats />
                </div>
            </section>

            {/* Our Story */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    <div>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center mb-4">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                            Our Story
                        </p>
                        <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight mb-6">
                            Built on Trust,<br /> Driven by Results.
                        </h2>
                        <div className="space-y-4">
                            <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                                Unisel Realty was founded in 2006 with a single mission: to bring honesty and expertise to Gurgaon&apos;s luxury real estate market. At a time when the industry was opaque and fragmented, we set out to become the advisor clients could trust completely.
                            </p>
                            <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                                Over 20 years, we have helped 2,000+ families find their dream homes, guided NRI investors across six countries, and built a track record of zero developer disputes. From our first pre-launch allotment on Golf Course Road to managing a portfolio of 80+ rental units today, every milestone reflects our commitment to doing right by our clients.
                            </p>
                            <p className="text-base text-dark/60 dark:text-white/60 leading-7">
                                Today, Unisel Realty is a team of 20+ professionals specialising in new bookings, leasing, and resale — operating from our office at Adani Miracle Mile, Sector 60, Gurgaon. We remain focused exclusively on Gurgaon because depth of knowledge in one market beats shallow coverage across many.
                            </p>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center mb-8">
                            <Icon icon="ph:clock-clockwise-fill" className="text-2xl text-primary" />
                            Key Milestones
                        </p>
                        <div className="relative pl-8 border-l-2 border-primary/20 space-y-8">
                            {milestones.map((item) => (
                                <div key={item.year} className="relative">
                                    <div className="absolute -left-[2.55rem] top-0.5 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                    </div>
                                    <p className="text-sm font-semibold text-primary mb-1">{item.year}</p>
                                    <p className="text-base text-dark/60 dark:text-white/60 leading-7">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section className="bg-dark/[0.02] dark:bg-white/[0.02]">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                    <div className="mb-12">
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center mb-4">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                            What We Do
                        </p>
                        <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight">
                            End-to-End Real Estate Advisory.
                        </h2>
                        <p className="text-dark/50 dark:text-white/50 text-xm mt-3 max-w-2xl">
                            From your first property search to post-purchase management, we cover every stage of the real estate journey.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <div
                                key={service.title}
                                className="relative border border-dark/10 dark:border-white/10 rounded-2xl p-8 group hover:border-primary/40 hover:shadow-3xl transition-all duration-300 overflow-hidden"
                            >
                                <span className="absolute top-4 right-6 text-7xl font-bold text-dark/[0.04] dark:text-white/[0.04] select-none">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-6 transition-colors duration-300">
                                    <Icon icon={service.icon} className="text-2xl text-primary group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-lg font-semibold dark:text-white mb-3">{service.title}</h3>
                                <p className="text-sm text-dark/60 dark:text-white/60 leading-6">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                <div className="mb-12">
                    <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center mb-4">
                        <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                        Why Clients Trust Us
                    </p>
                    <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight">
                        Principles That Guide Every Decision.
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {values.map((value) => (
                        <div
                            key={value.title}
                            className="border border-dark/10 dark:border-white/10 rounded-2xl p-8 group hover:border-primary/40 hover:shadow-3xl transition-all duration-300"
                        >
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-300">
                                    <Icon icon={value.icon} className="text-xl text-primary group-hover:text-white transition-colors duration-300" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold dark:text-white mb-2">{value.title}</h3>
                                    <p className="text-sm text-dark/60 dark:text-white/60 leading-6">{value.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Developer Partners */}
            <section className="bg-dark/[0.02] dark:bg-white/[0.02]">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                    <div className="text-center mb-12">
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 items-center justify-center mb-4">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                            Our Partners
                        </p>
                        <h2 className="lg:text-52 text-40 font-medium dark:text-white leading-tight">
                            Trusted by India&apos;s Top Developers.
                        </h2>
                        <p className="text-dark/50 dark:text-white/50 text-xm mt-3 max-w-2xl mx-auto">
                            We work directly with the most reputed developers to secure pre-launch access and exclusive allotments for our clients.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {developers.map((dev) => (
                            <span
                                key={dev}
                                className="px-6 py-3 rounded-full border border-dark/10 dark:border-white/10 text-sm font-medium text-dark/70 dark:text-white/70 hover:border-primary/40 hover:text-primary transition-colors duration-300"
                            >
                                {dev}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                <div className="bg-primary rounded-3xl p-10 md:p-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">
                        Ready to Find Your Next Property?
                    </h2>
                    <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8">
                        Whether you are buying your first home, diversifying your portfolio, or investing from abroad — our team is here to guide you every step of the way.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors duration-300"
                        >
                            Get in Touch
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
