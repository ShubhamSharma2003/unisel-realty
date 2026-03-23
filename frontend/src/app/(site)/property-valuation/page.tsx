import { Icon } from "@iconify/react/dist/iconify.js";
import { Metadata } from "next";
import { valuationPageSchema, breadcrumbSchema } from "@/lib/jsonld";
import ValuationTool from "@/components/valuation/ValuationTool";

export const metadata: Metadata = {
    title: "Property Valuation Gurgaon — Check Current Market Value | Unisel Realty",
    description:
        "Find out what your property is worth in Gurgaon. Free instant valuation tool covering all sectors and localities — by Unisel Realty, experts since 2006.",
    keywords: [
        "property valuation gurgaon",
        "property market value gurgaon",
        "check property price gurgaon",
        "property worth gurgaon",
        "house valuation gurgaon",
        "unisel realty valuation",
    ],
    alternates: { canonical: "https://uniselrealty.com/property-valuation" },
    openGraph: {
        title: "Property Valuation Gurgaon — Check Current Market Value | Unisel Realty",
        description:
            "Find out what your property is worth in Gurgaon. Free instant valuation tool by Unisel Realty.",
        url: "https://uniselrealty.com/property-valuation",
        siteName: "Unisel Realty",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Property Valuation Gurgaon | Unisel Realty",
        description: "Free instant property valuation for all Gurgaon localities.",
    },
};

const TRUST_POINTS = [
    { icon: "ph:buildings", label: "100+ localities covered" },
    { icon: "ph:calendar-check", label: "Updated market rates 2026" },
    { icon: "ph:shield-check", label: "No login required" },
    { icon: "ph:user-circle", label: "Free expert follow-up" },
];

export default function PropertyValuationPage() {
    const schema = valuationPageSchema();
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://uniselrealty.com" },
        { name: "Property Valuation", url: "https://uniselrealty.com/property-valuation" },
    ]);

    return (
        <div className="container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-44 pb-14 md:pb-28">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />

            {/* Page header */}
            <div className="mb-12 text-center">
                <div className="flex gap-2.5 items-center justify-center mb-3">
                    <Icon icon="ph:house-simple-fill" width={20} height={20} className="text-primary" />
                    <p className="text-base font-semibold text-badge dark:text-white/90">Free Tool</p>
                </div>
                <h1 className="text-4xl sm:text-52 font-medium tracking-tighter text-black dark:text-white mb-4 leading-10 sm:leading-14">
                    What Is Your Property Worth<br className="hidden sm:block" /> in Gurgaon Right Now?
                </h1>
                <p className="text-xm font-normal tracking-tight text-black/50 dark:text-white/50 leading-6 max-w-2xl mx-auto">
                    Get an instant market value estimate for any property across all Gurgaon sectors and localities — powered by current rate data, not generic indices.
                </p>

                {/* Trust bar */}
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8">
                    {TRUST_POINTS.map((t) => (
                        <div key={t.label} className="flex items-center gap-2 text-dark/60 dark:text-white/60">
                            <Icon icon={t.icon} width={16} height={16} className="text-primary" />
                            <span className="text-sm">{t.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tool */}
            <div className="max-w-3xl mx-auto">
                <ValuationTool />
            </div>

            {/* How it works */}
            <div className="mt-20 max-w-3xl mx-auto">
                <h2 className="text-2xl font-medium tracking-tight text-dark dark:text-white mb-8 text-center">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                        {
                            step: "01",
                            icon: "ph:list-checks",
                            title: "Enter Property Details",
                            desc: "Select your locality, property type, area, age and floor.",
                        },
                        {
                            step: "02",
                            icon: "ph:lock-simple-open",
                            title: "Unlock Your Estimate",
                            desc: "Share your name and number to reveal the valuation instantly.",
                        },
                        {
                            step: "03",
                            icon: "ph:phone-call",
                            title: "Get Expert Advice",
                            desc: "Our Gurgaon advisor follows up with a precise market analysis — free.",
                        },
                    ].map((item) => (
                        <div
                            key={item.step}
                            className="border border-black/10 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-3"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-primary">{item.step}</span>
                                <Icon icon={item.icon} width={20} height={20} className="text-primary" />
                            </div>
                            <p className="font-semibold text-dark dark:text-white">{item.title}</p>
                            <p className="text-sm text-dark/50 dark:text-white/50 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div className="mt-20 max-w-3xl mx-auto">
                <h2 className="text-2xl font-medium tracking-tight text-dark dark:text-white mb-8 text-center">
                    Common Questions
                </h2>
                <div className="flex flex-col gap-4">
                    {[
                        {
                            q: "How accurate is this valuation?",
                            a: "The estimate is based on current market rate ranges per sq. ft. for each Gurgaon locality, adjusted for property type, age and floor. It gives you a reliable indicative range — for a precise figure, our advisors use actual registered transaction data.",
                        },
                        {
                            q: "Is this service free?",
                            a: "Yes, completely free. There is no charge for the online estimate or the follow-up expert call.",
                        },
                        {
                            q: "Why do you need my phone number?",
                            a: "Your assigned Unisel advisor uses it to share a detailed market analysis with recent comparable transactions in your locality — far more granular than what any algorithm can provide.",
                        },
                        {
                            q: "Which areas does this cover?",
                            a: "All major Gurgaon sectors and named localities — from DLF Phases and Golf Course Road belt to New Gurgaon (Sectors 73–114) and Dwarka Expressway.",
                        },
                    ].map((item) => (
                        <div
                            key={item.q}
                            className="border border-black/10 dark:border-white/10 rounded-2xl p-6"
                        >
                            <p className="font-semibold text-dark dark:text-white mb-2">{item.q}</p>
                            <p className="text-sm text-dark/60 dark:text-white/60 leading-relaxed">{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
