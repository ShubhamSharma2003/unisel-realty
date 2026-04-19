import HeroSub from "@/components/shared/HeroSub";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home Loan Assistance in Gurgaon",
    description: "Get expert home loan guidance in Gurgaon. We connect you with 20+ leading banks and NBFCs, help with documentation, and get you the best interest rates.",
    keywords: ["home loan gurgaon", "housing loan gurgaon", "home loan assistance", "best home loan rates gurgaon", "unisel realty"],
    openGraph: {
        title: "Home Loan Assistance in Gurgaon | Unisel Realty",
        description: "Expert home loan guidance in Gurgaon — best rates, 20+ bank partners, end-to-end documentation support.",
        url: "https://www.uniselrealty.com/services/home-loan-gurgaon",
        siteName: "Unisel Realty",
        images: [{ url: "/services/opengraph-image", width: 1200, height: 630, alt: "Home Loan Gurgaon" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Home Loan Assistance in Gurgaon | Unisel Realty",
        description: "Expert home loan guidance in Gurgaon.",
        images: ["/services/opengraph-image"],
    },
};

const features = [
    {
        icon: "ph:bank",
        title: "20+ Bank & NBFC Partners",
        description: "We work with HDFC, SBI, ICICI, Axis, Kotak, LIC HFL and more — so you always get the most competitive rate.",
    },
    {
        icon: "ph:percent",
        title: "Best Interest Rates",
        description: "Our relationships with lenders allow us to negotiate preferential rates and waivers on processing fees for our clients.",
    },
    {
        icon: "ph:calculator",
        title: "EMI & Eligibility Advisory",
        description: "We help you calculate your loan eligibility, plan EMIs, and choose between fixed and floating rate options wisely.",
    },
    {
        icon: "ph:files",
        title: "Documentation Support",
        description: "Our team prepares and verifies your complete loan file — salary slips, ITR, bank statements, property papers — saving you time.",
    },
    {
        icon: "ph:clock-countdown",
        title: "Fast Approvals",
        description: "Pre-approved loan channels and strong lender relationships mean faster sanctions — often within 5–7 working days.",
    },
    {
        icon: "ph:handshake",
        title: "End-to-End Hand-Holding",
        description: "From application to disbursal, we coordinate directly with the bank on your behalf and keep you updated at every step.",
    },
];

const steps = [
    { number: "01", title: "Eligibility Check", description: "Share your income details — we assess your eligibility and the maximum loan amount you qualify for." },
    { number: "02", title: "Bank Comparison", description: "We compare rates and terms across our lender network and recommend the best fit for your profile." },
    { number: "03", title: "Document Preparation", description: "We guide you through exact documentation required and verify everything before submission." },
    { number: "04", title: "Disbursal", description: "Once sanctioned, we coordinate with the developer and bank for smooth fund disbursal and registration." },
];

const lenders = ["HDFC Bank", "SBI", "ICICI Bank", "Axis Bank", "Kotak Mahindra", "LIC HFL", "PNB Housing", "Bajaj Finance"];

const stats = [
    { value: "20+", label: "Lending Partners" },
    { value: "₹500Cr+", label: "Loans Facilitated" },
    { value: "8.5%", label: "Rates Starting From" },
    { value: "5 Days", label: "Avg. Sanction Time" },
];

export default function HomeLoanPage() {
    return (
        <>
            <HeroSub
                title="Home Loan Assistance in Gurgaon."
                description="Best rates, faster approvals, and zero paperwork stress — we handle it all."
                badge="Home Loan"
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
                            Getting a home loan shouldn&apos;t be hard.
                        </h2>
                        <p className="text-dark/50 dark:text-white/50 text-lg leading-7 mb-4">
                            Navigating the home loan process — comparing banks, understanding eligibility, preparing documents — can be overwhelming. Unisel Realty&apos;s dedicated home loan advisory team simplifies the entire journey for you.
                        </p>
                        <p className="text-dark/50 dark:text-white/50 text-lg leading-7 mb-8">
                            With 20+ banking partners and years of experience in Gurgaon&apos;s real estate market, we secure you the best rates and fastest approvals — completely free of charge.
                        </p>
                        <Link
                            href="/contact"
                            className="py-4 px-8 bg-primary text-base text-white rounded-full font-semibold hover:bg-dark duration-300 w-fit block"
                        >
                            Check Your Eligibility
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

            {/* Features Grid */}
            <section className="bg-black/[0.02] dark:bg-white/[0.02] py-14 md:py-20">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                    <div className="text-center mb-12">
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 justify-center mb-4">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                            What We Offer
                        </p>
                        <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-dark dark:text-white">
                            Every advantage in your corner.
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <div key={feature.title} className="border border-black/10 dark:border-white/10 rounded-2xl p-8 hover:shadow-3xl duration-300 dark:hover:shadow-white/10 group">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary duration-300">
                                    <Icon icon={feature.icon} width={28} height={28} className="text-primary group-hover:text-white duration-300" />
                                </div>
                                <h3 className="text-xl font-medium text-dark dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-dark/50 dark:text-white/50 text-base leading-6">{feature.description}</p>
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
                        The Process
                    </p>
                    <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-dark dark:text-white">
                        From eligibility to disbursal.
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

                {/* Lender logos strip */}
                <div className="border border-black/10 dark:border-white/10 rounded-2xl p-8">
                    <p className="text-center text-dark/50 dark:text-white/50 text-base mb-6">Our lending partners</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {lenders.map((lender) => (
                            <span key={lender} className="px-5 py-2.5 border border-black/10 dark:border-white/10 rounded-full text-sm font-medium text-dark dark:text-white">
                                {lender}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-primary py-14 md:py-20">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0 text-center">
                    <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-white mb-4">
                        Let&apos;s get your loan approved.
                    </h2>
                    <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                        Our home loan advisory is completely free. Reach out today and we&apos;ll match you with the best lender for your profile.
                    </p>
                    <Link
                        href="/contact"
                        className="py-4 px-8 bg-white text-dark text-base rounded-full font-semibold hover:bg-dark hover:text-white duration-300 inline-block"
                    >
                        Talk to a Loan Expert
                    </Link>
                </div>
            </section>
        </>
    );
}
