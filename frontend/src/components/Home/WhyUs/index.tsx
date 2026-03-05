import { Icon } from "@iconify/react";

const usps = [
    {
        icon: "ph:tag",
        title: "Lowest Price Assurance",
        description: "We match or beat any verified price. You always get the best deal — guaranteed, with no hidden charges.",
    },
    {
        icon: "ph:car",
        title: "Free Site Visit",
        description: "Our team arranges a complimentary site visit at a time that suits you, with full project briefing on-site.",
    },
    {
        icon: "ph:handshake",
        title: "After-Sale Services",
        description: "Our relationship doesn't end at registration. We assist with possession, interiors, and property management.",
    },
    {
        icon: "ph:scales",
        title: "Free Legal & Tax Advice",
        description: "Get expert guidance on legal due diligence, stamp duty, capital gains, and NRI tax implications — at no cost.",
    },
];

const WhyUs = () => {
    return (
        <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-20">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 mb-4">
                        <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                        Why Unisel Realty
                    </p>
                    <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-dark dark:text-white">
                        The Unisel Realty difference.
                    </h2>
                </div>
                <p className="text-dark/50 dark:text-white/50 text-lg leading-7 md:max-w-sm">
                    We go beyond transactions — delivering a complete, transparent, and client-first real estate experience.
                </p>
            </div>

            {/* USP Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {usps.map((usp, index) => (
                    <div
                        key={usp.title}
                        className="relative border border-black/10 dark:border-white/10 rounded-2xl p-8 group hover:border-primary/40 hover:shadow-3xl dark:hover:shadow-white/10 duration-300 overflow-hidden"
                    >
                        {/* Large background number */}
                        <span className="absolute top-4 right-5 text-7xl font-bold text-black/[0.04] dark:text-white/[0.04] select-none leading-none">
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary duration-300">
                            <Icon icon={usp.icon} width={26} height={26} className="text-primary group-hover:text-white duration-300" />
                        </div>

                        <h3 className="text-xl font-semibold text-dark dark:text-white mb-3 leading-snug">
                            {usp.title}
                        </h3>
                        <p className="text-dark/50 dark:text-white/50 text-base leading-6">
                            {usp.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyUs;
