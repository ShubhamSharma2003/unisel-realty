import { Icon } from "@iconify/react";
import Link from "next/link";

const services = [
    {
        icon: "ph:buildings",
        badge: "Property Management",
        title: "Stress-free property management.",
        description: "From tenant sourcing and rent collection to maintenance and legal compliance — we manage your property end-to-end so you earn without the effort.",
        highlights: [
            "Verified tenant screening",
            "On-time rent collection",
            "24hr maintenance support",
            "Monthly inspection reports",
        ],
        href: "/services/property-management-gurgaon",
        cta: "Explore Service",
    },
    {
        icon: "ph:bank",
        badge: "Home Loan",
        title: "Best rates. Fastest approvals.",
        description: "We partner with 20+ leading banks and NBFCs to get you the most competitive home loan rates in Gurgaon — with full documentation support at no cost.",
        highlights: [
            "20+ bank & NBFC partners",
            "Rates starting at 8.5%",
            "5-day avg. sanction time",
            "Zero advisory fee",
        ],
        href: "/services/home-loan-gurgaon",
        cta: "Check Eligibility",
    },
    {
        icon: "ph:globe",
        badge: "NRI Corner",
        title: "Invest in India from anywhere.",
        description: "Dedicated NRI desk with FEMA-compliant guidance, Power of Attorney assistance, repatriation support, and a relationship manager across time zones.",
        highlights: [
            "FEMA & RBI compliant",
            "Virtual property tours",
            "Power of Attorney support",
            "Rental income repatriation",
        ],
        href: "/services/nri-property-investment-gurgaon",
        cta: "Talk to NRI Desk",
    },
];

const ServicesOffered = () => {
    return (
        <section className="bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-20">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 mb-4">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                            Services We Offer
                        </p>
                        <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-dark dark:text-white">
                            Everything you need,<br className="hidden md:block" /> in one place.
                        </h2>
                    </div>
                    <p className="text-dark/50 dark:text-white/50 text-lg leading-7 md:max-w-sm">
                        Beyond buying and selling — we offer expert services to protect, finance, and grow your real estate portfolio.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.badge}
                            className="group border border-black/10 dark:border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-primary/40 dark:hover:border-primary/40 hover:shadow-3xl duration-300 dark:hover:shadow-white/10 bg-white dark:bg-transparent"
                        >
                            <div>
                                {/* Icon + Badge */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary duration-300 flex-shrink-0">
                                        <Icon icon={service.icon} width={24} height={24} className="text-primary group-hover:text-white duration-300" />
                                    </div>
                                    <span className="text-sm font-semibold text-primary">
                                        {service.badge}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-medium text-dark dark:text-white leading-[1.3] mb-4">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-dark/50 dark:text-white/50 text-base leading-6 mb-6">
                                    {service.description}
                                </p>

                                {/* Highlights */}
                                <ul className="flex flex-col gap-2.5 mb-8">
                                    {service.highlights.map((point) => (
                                        <li key={point} className="flex items-center gap-3 text-sm text-dark/70 dark:text-white/70">
                                            <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Icon icon="ph:check" width={12} height={12} className="text-primary" />
                                            </span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <Link
                                href={service.href}
                                className="flex items-center gap-2 text-base font-semibold text-primary group-hover:gap-4 duration-300"
                            >
                                {service.cta}
                                <Icon icon="ph:arrow-right" width={18} height={18} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesOffered;
