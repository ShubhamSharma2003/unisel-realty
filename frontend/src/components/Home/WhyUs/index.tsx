import { Icon } from "@iconify/react";

const pillars = [
    {
        icon: "ph:rocket-launch",
        title: "Pre-Launch Access That Others Simply Don't Have",
        description: "As authorised channel partners to DLF, Godrej, M3M and Sobha, we receive inventory allocation before public launch. Our clients get first pick at pre-launch pricing — before values move 10–18% at possession. This is not a claim. It is an 18-year track record.",
        proof: "40+ projects · Pre-launch allotment in every major Golf Course Road launch since 2010",
    },
    {
        icon: "ph:globe",
        title: "Complete NRI Property Buying Support — From First Call to Registration",
        description: "NRI transactions involve POA structuring, FEMA compliance, TDS deduction, and repatriation planning. Most brokers stop at the sale. We stay through registration, rental setup, and annual yield reporting — from Dubai, London, Toronto or wherever you are calling from. No confusion. No gaps.",
        proof: "200+ NRI clients · UAE · UK · USA · Singapore · Canada · Australia",
    },
    {
        icon: "ph:chart-line-up",
        title: "Investment Advisory That Puts Your Returns First — Not Our Commission",
        description: "We are not paid to push inventory. We are paid to protect your capital. If a project has delayed possession history, a weak developer track record, or sits in an oversupplied micro-market — we will tell you, even if it costs us the deal. Our 62% repeat client rate is built on exactly this.",
        proof: "₹2,400 Cr+ transacted · 62% repeat client rate · 18 years zero developer disputes",
    },
    {
        icon: "ph:house-simple",
        title: "Post-Purchase Property Management — So Your Asset Works While You Are Abroad",
        description: "For NRI investors, ownership does not end at registration. We coordinate possession walkthroughs, developer punch list resolution, rental listing, tenant screening, lease execution, and annual yield reporting. Your Gurgaon property performs — whether you are in Gurgaon or Geneva.",
        proof: "80+ units under active management · Avg. 4.2% annual rental yield delivered",
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
                        Why Choose Unisel Realty
                    </p>
                    <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-dark dark:text-white">
                        Most Brokers Show You Properties.<br className="hidden md:block" /> We Show You Which Ones to Buy.
                    </h2>
                </div>
                <p className="text-dark/50 dark:text-white/50 text-lg leading-7 md:max-w-sm">
                    There are 400+ real estate agencies operating in Gurgaon today. Here is the specific difference 18 years of focused Gurgaon advisory delivers.
                </p>
            </div>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                {pillars.map((pillar, index) => (
                    <div
                        key={pillar.title}
                        className="relative border border-black/10 dark:border-white/10 rounded-2xl p-8 group hover:border-primary/40 hover:shadow-3xl dark:hover:shadow-white/10 duration-300 overflow-hidden flex flex-col"
                    >
                        {/* Large background number */}
                        <span className="absolute top-4 right-5 text-7xl font-bold text-black/[0.04] dark:text-white/[0.04] select-none leading-none">
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary duration-300 flex-shrink-0">
                            <Icon icon={pillar.icon} width={26} height={26} className="text-primary group-hover:text-white duration-300" />
                        </div>

                        <h3 className="text-xl font-semibold text-dark dark:text-white mb-3 leading-snug">
                            {pillar.title}
                        </h3>
                        <p className="text-dark/50 dark:text-white/50 text-base leading-6 mb-6 flex-1">
                            {pillar.description}
                        </p>

                        {/* Proof point */}
                        <p className="text-xs font-semibold text-primary/80 border-t border-black/[0.06] dark:border-white/[0.06] pt-4 leading-relaxed">
                            {pillar.proof}
                        </p>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default WhyUs;
