import HeroSub from "@/components/shared/HeroSub";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Property Management Services in Gurgaon",
    description: "Professional property management services in Gurgaon. Tenant sourcing, rent collection, maintenance, and legal compliance — we manage your property so you don't have to.",
    keywords: ["property management gurgaon", "rental property management", "tenant management gurgaon", "property managers gurgaon", "unisel realty"],
    openGraph: {
        title: "Property Management Services in Gurgaon | Unisel Realty",
        description: "Professional property management in Gurgaon — tenant sourcing, rent collection, maintenance, and legal compliance.",
        url: "https://www.uniselrealty.com/services/property-management-gurgaon",
        siteName: "Unisel Realty",
        images: [{ url: "/services/opengraph-image", width: 1200, height: 630, alt: "Property Management Gurgaon" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Property Management Services in Gurgaon | Unisel Realty",
        description: "Professional property management in Gurgaon.",
        images: ["/services/opengraph-image"],
    },
};

const services = [
    {
        icon: "ph:users-three",
        title: "Tenant Sourcing & Screening",
        description: "We find verified, reliable tenants through thorough background checks, employment verification, and reference calls.",
    },
    {
        icon: "ph:coins",
        title: "Rent Collection",
        description: "On-time rent collection with digital payment tracking, receipts, and monthly statements sent directly to you.",
    },
    {
        icon: "ph:wrench",
        title: "Maintenance & Repairs",
        description: "A dedicated maintenance team handles all repairs promptly — from plumbing to painting — keeping your property in top condition.",
    },
    {
        icon: "ph:shield-check",
        title: "Legal Compliance",
        description: "We handle rent agreements, police verification, society NOC, and ensure full compliance with local tenancy laws.",
    },
    {
        icon: "ph:magnifying-glass",
        title: "Regular Inspections",
        description: "Periodic property inspections with detailed photo reports so you always know the condition of your asset.",
    },
    {
        icon: "ph:chart-line-up",
        title: "Rental Yield Optimisation",
        description: "We benchmark your rent against the market and advise on the right time to revise — maximising your returns.",
    },
];

const steps = [
    { number: "01", title: "Property Onboarding", description: "We assess your property, document its condition, and list it across our network." },
    { number: "02", title: "Tenant Screening", description: "Background and income verification ensures only quality tenants occupy your property." },
    { number: "03", title: "Agreement & Handover", description: "Legally drafted rent agreement, police verification, and smooth handover to tenant." },
    { number: "04", title: "Ongoing Management", description: "Monthly rent collection, maintenance coordination, and regular inspection reports." },
];

const stats = [
    { value: "80+", label: "Units Under Management" },
    { value: "4.2%", label: "Avg. Annual Rental Yield" },
    { value: "20+", label: "Years of Expertise" },
    { value: "90%", label: "Client Retention" },
];

export default function PropertyManagementPage() {
    return (
        <>
            <HeroSub
                title="Property Management in Gurgaon."
                description="We manage your property end-to-end — so you earn without the effort."
                badge="Property Management"
            />

            {/* Overview */}
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 mb-4">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                            Why Choose Us
                        </p>
                        <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-dark dark:text-white mb-6">
                            Your property, our responsibility.
                        </h2>
                        <p className="text-dark/50 dark:text-white/50 text-lg leading-7 mb-4">
                            Owning a rental property in Gurgaon should be rewarding, not stressful. Unisel Realty&apos;s property management service handles everything from finding the right tenant to monthly rent collection and maintenance — giving you complete peace of mind.
                        </p>
                        <p className="text-dark/50 dark:text-white/50 text-lg leading-7 mb-8">
                            Whether you are an NRI, a working professional, or simply prefer a hands-off approach, our experienced team ensures your asset performs at its peak.
                        </p>
                        <Link
                            href="/contact"
                            className="py-4 px-8 bg-primary text-base text-white rounded-full font-semibold hover:bg-dark duration-300 w-fit block"
                        >
                            Get a Free Consultation
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
                            Everything your property needs.
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
                        Simple. Transparent. Reliable.
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {steps.map((step) => (
                        <div key={step.number} className="border border-black/10 dark:border-white/10 rounded-2xl p-8">
                            <p className="text-5xl font-bold text-primary/20 dark:text-primary/30 mb-4">{step.number}</p>
                            <h3 className="text-xl font-medium text-dark dark:text-white mb-3">{step.title}</h3>
                            <p className="text-dark/50 dark:text-white/50 text-base leading-6">{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-primary py-14 md:py-20">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0 text-center">
                    <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-white mb-4">
                        Ready to hand it over?
                    </h2>
                    <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                        Let Unisel Realty manage your property while you focus on what matters. Contact us today for a free property assessment.
                    </p>
                    <Link
                        href="/contact"
                        className="py-4 px-8 bg-white text-dark text-base rounded-full font-semibold hover:bg-dark hover:text-white duration-300 inline-block"
                    >
                        Talk to Our Team
                    </Link>
                </div>
            </section>
        </>
    );
}
