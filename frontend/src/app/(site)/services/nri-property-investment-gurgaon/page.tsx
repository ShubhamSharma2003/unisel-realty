import HeroSub from "@/components/shared/HeroSub";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "NRI Property Investment in Gurgaon | Unisel Realty",
    description: "NRI property investment services in Gurgaon. FEMA-compliant guidance, Power of Attorney, repatriation of funds, and end-to-end property management for NRIs.",
    keywords: ["NRI property investment gurgaon", "NRI real estate gurgaon", "NRI property buying india", "FEMA compliance property", "nri corner unisel realty"],
    openGraph: {
        title: "NRI Property Investment in Gurgaon | Unisel Realty",
        description: "FEMA-compliant NRI property investment guidance in Gurgaon — from purchase to rental management.",
        url: "https://uniselrealty.com/services/nri-property-investment-gurgaon",
        siteName: "Unisel Realty",
        images: [{ url: "/images/hero/og-image.jpg", width: 1200, height: 630, alt: "NRI Property Investment Gurgaon" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "NRI Property Investment in Gurgaon | Unisel Realty",
        description: "End-to-end NRI property investment guidance in Gurgaon.",
        images: ["/images/hero/og-image.jpg"],
    },
};

const services = [
    {
        icon: "ph:scales",
        title: "FEMA & Legal Compliance",
        description: "We ensure your purchase is fully compliant with FEMA and RBI guidelines for NRI/OCI property investments in India.",
    },
    {
        icon: "ph:file-text",
        title: "Power of Attorney",
        description: "We assist in drafting a watertight PoA so a trusted representative can manage all documentation and registrations on your behalf.",
    },
    {
        icon: "ph:currency-inr",
        title: "Repatriation of Funds",
        description: "Guidance on repatriating sale proceeds and rental income abroad in accordance with RBI and FEMA regulations.",
    },
    {
        icon: "ph:receipt-x",
        title: "Tax Advisory",
        description: "Understand TDS implications, capital gains tax, and double taxation treaties to plan your investment tax-efficiently.",
    },
    {
        icon: "ph:buildings",
        title: "Property Selection",
        description: "Curated shortlists of RERA-approved projects from top developers in Gurgaon tailored to your budget and investment goals.",
    },
    {
        icon: "ph:headset",
        title: "Dedicated NRI Relationship Manager",
        description: "A single point of contact available across time zones — on call, WhatsApp, and video — so distance is never a barrier.",
    },
];

const steps = [
    { number: "01", title: "Virtual Consultation", description: "Connect with our NRI desk over video call. We understand your goals, budget, and timeline." },
    { number: "02", title: "Property Shortlist", description: "We curate RERA-approved options from Gurgaon's top micro-markets and share detailed virtual tours." },
    { number: "03", title: "Legal & Financial Setup", description: "PoA drafting, NRE/NRO account guidance, home loan (if needed), and FEMA-compliant fund transfer." },
    { number: "04", title: "Registration & Handover", description: "Your representative (via PoA) completes registration. We handle possession and ongoing management." },
];

const countries = ["USA", "UK", "Canada", "UAE", "Australia", "Singapore", "Germany", "Saudi Arabia"];

const stats = [
    { value: "300+", label: "NRI Clients Served" },
    { value: "15+", label: "Countries" },
    { value: "100%", label: "FEMA Compliant" },
    { value: "24/7", label: "NRI Desk Support" },
];

const faqs = [
    {
        q: "Can NRIs buy residential property in India?",
        a: "Yes. NRIs and OCIs can purchase residential and commercial properties in India without RBI approval, subject to FEMA regulations. Agricultural land and plantation property require special permission.",
    },
    {
        q: "What is the best way to transfer money for property purchase?",
        a: "Funds should be remitted from abroad through normal banking channels or from NRE/NRO accounts. We guide you on the most tax-efficient and FEMA-compliant route.",
    },
    {
        q: "Do I need to be present for registration?",
        a: "No. With a properly executed Power of Attorney, a trusted representative can handle the entire registration process on your behalf.",
    },
    {
        q: "Can NRIs repatriate sale proceeds?",
        a: "Yes, subject to limits. You can repatriate up to the amount originally remitted from abroad. Surplus proceeds can be repatriated subject to tax compliance and RBI guidelines.",
    },
];

export default function NRICornerPage() {
    return (
        <>
            <HeroSub
                title="NRI Property Investment in Gurgaon."
                description="Invest in India's fastest-growing real estate market — from anywhere in the world."
                badge="NRI Corner"
            />

            {/* Overview */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 mb-4">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                            NRI Corner
                        </p>
                        <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-dark dark:text-white mb-6">
                            Distance is no longer a barrier.
                        </h2>
                        <p className="text-dark/50 dark:text-white/50 text-lg leading-7 mb-4">
                            Gurgaon is one of India&apos;s most sought-after real estate destinations — and NRIs are among its most active investors. Unisel Realty&apos;s dedicated NRI desk makes investing simple, secure, and entirely remote.
                        </p>
                        <p className="text-dark/50 dark:text-white/50 text-lg leading-7 mb-8">
                            From FEMA-compliant purchase structuring and Power of Attorney to post-purchase property management and rental income repatriation — we handle every aspect of your India investment journey.
                        </p>
                        <Link
                            href="/contact"
                            className="py-4 px-8 bg-primary text-base text-white rounded-full font-semibold hover:bg-dark duration-300 w-fit block"
                        >
                            Book a Virtual Consultation
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat) => (
                            <div key={stat.label} className="border border-black/10 dark:border-white/10 rounded-2xl p-6 text-center">
                                <p className="text-4xl font-semibold text-primary mb-2">{stat.value}</p>
                                <p className="text-sm text-dark/60 dark:text-white/60">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="bg-black/[0.02] dark:bg-white/[0.02] py-14 md:py-20">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                    <div className="text-center mb-12">
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 justify-center mb-4">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                            Our Services
                        </p>
                        <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-dark dark:text-white">
                            Full-spectrum NRI support.
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div key={service.title} className="border border-black/10 dark:border-white/10 rounded-2xl p-8 hover:shadow-3xl duration-300 dark:hover:shadow-white/10 group">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary duration-300">
                                    <Icon icon={service.icon} width={28} height={28} className="text-primary group-hover:text-white duration-300" />
                                </div>
                                <h3 className="text-xl font-medium text-dark dark:text-white mb-3">{service.title}</h3>
                                <p className="text-dark/50 dark:text-white/50 text-base leading-6">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-20">
                <div className="text-center mb-12">
                    <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 justify-center mb-4">
                        <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                        How It Works
                    </p>
                    <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-dark dark:text-white">
                        Buy from anywhere in the world.
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
                    {steps.map((step) => (
                        <div key={step.number} className="border border-black/10 dark:border-white/10 rounded-2xl p-8">
                            <p className="text-5xl font-bold text-primary/20 dark:text-primary/30 mb-4">{step.number}</p>
                            <h3 className="text-xl font-medium text-dark dark:text-white mb-3">{step.title}</h3>
                            <p className="text-dark/50 dark:text-white/50 text-base leading-6">{step.description}</p>
                        </div>
                    ))}
                </div>

                {/* Countries strip */}
                <div className="border border-black/10 dark:border-white/10 rounded-2xl p-8">
                    <p className="text-center text-dark/50 dark:text-white/50 text-base mb-6">NRI clients across</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {countries.map((country) => (
                            <span key={country} className="px-5 py-2.5 border border-black/10 dark:border-white/10 rounded-full text-sm font-medium text-dark dark:text-white">
                                {country}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-black/[0.02] dark:bg-white/[0.02] py-14 md:py-20">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                    <div className="text-center mb-12">
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 justify-center mb-4">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                            FAQs
                        </p>
                        <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-dark dark:text-white">
                            Common NRI questions.
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {faqs.map((faq) => (
                            <div key={faq.q} className="border border-black/10 dark:border-white/10 rounded-2xl p-8">
                                <div className="flex gap-4 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Icon icon="ph:question" width={16} height={16} className="text-primary" />
                                    </div>
                                    <h3 className="text-lg font-medium text-dark dark:text-white">{faq.q}</h3>
                                </div>
                                <p className="text-dark/50 dark:text-white/50 text-base leading-6 pl-12">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-primary py-14 md:py-20">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0 text-center">
                    <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-white mb-4">
                        Your India investment starts here.
                    </h2>
                    <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                        Schedule a free virtual consultation with our NRI desk and explore the best investment opportunities in Gurgaon.
                    </p>
                    <Link
                        href="/contact"
                        className="py-4 px-8 bg-white text-dark text-base rounded-full font-semibold hover:bg-dark hover:text-white duration-300 inline-block"
                    >
                        Talk to Our NRI Desk
                    </Link>
                </div>
            </section>
        </>
    );
}
