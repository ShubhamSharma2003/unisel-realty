import { Icon } from "@iconify/react";
import Link from "next/link";

const services = [
    {
        icon: "ph:buildings",
        badge: "Luxury Residential Advisory",
        title: "Luxury Residential Advisory — Golf Course Road & Dwarka Expressway",
        description: "Exclusive access to pre-launch inventory across DLF, Godrej, M3M and Sobha. We advise on micro-market positioning, configuration selection, and floor-level appreciation dynamics — so your first decision is your best decision.",
        href: "/residential",
        cta: "Explore Residential Properties",
    },
    {
        icon: "ph:storefront",
        badge: "Commercial & SCO",
        title: "Commercial Real Estate & SCO Plot Investment — Gurgaon",
        description: "Gurgaon's SCO plot corridor and commercial office market are among India's highest-yielding asset classes. We identify projects by developer track record, catchment quality, and rental demand — not just price.",
        href: "/commercial",
        cta: "Explore Commercial Properties",
    },
    {
        icon: "ph:globe",
        badge: "NRI Advisory",
        title: "NRI Real Estate Advisory — FEMA Compliant · End to End",
        description: "We are specialists in NRI property transactions — not an afterthought desk. POA structuring, FEMA compliance, TDS filing, repatriation planning, post-purchase rental management. We handle the complexity so you do not have to manage it from abroad.",
        href: "/services/nri-property-investment-gurgaon",
        cta: "Visit NRI Desk",
    },
    {
        icon: "ph:house-simple",
        badge: "Post-Purchase Management",
        title: "Post-Purchase Property Management — For Residents & NRI Investors",
        description: "80+ units under active management across Gurgaon. We handle possession walkthroughs, developer punch lists, tenant screening, lease agreements, and annual yield reporting. Your property performs whether you are in Gurgaon or Geneva.",
        href: "/services/property-management-gurgaon",
        cta: "Learn About Property Management",
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
                            Our Services
                        </p>
                        <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-dark dark:text-white">
                            End-to-End Real Estate Advisory —<br className="hidden md:block" /> Not Just Property Listings
                        </h2>
                    </div>
                    <p className="text-dark/50 dark:text-white/50 text-lg leading-7 md:max-w-sm">
                        We do not run a listing portal. Every service we offer is backed by 18 years of Gurgaon market knowledge and active developer relationships.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                <p className="text-dark/50 dark:text-white/50 text-base leading-6 mb-8">
                                    {service.description}
                                </p>

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
