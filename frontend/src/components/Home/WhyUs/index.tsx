import { Icon } from "@iconify/react";
import WhyUsCarousel from "./WhyUsCarousel";

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
        description: "We are not paid to push inventory. We are paid to protect your capital. If a project has delayed possession history, a weak developer track record, or sits in an oversupplied micro-market — we will tell you, even if it costs us the deal. Our 90% client retention is built on exactly this.",
        proof: "₹2,400 Cr+ transacted · 90% client retention · 18 years zero developer disputes",
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
        <section className="container max-w-8xl mx-auto px-5 2xl:px-0">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 md:mb-12">
                <div>
                    <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 mb-4">
                        <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                        Why Choose Unisel Realty
                    </p>
                    <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-dark dark:text-white">
                        Most Brokers Show You Properties.<br className="hidden md:block" /> We Consult You Which Ones to Buy.
                    </h2>
                </div>
                <p className="text-dark/50 dark:text-white/50 text-lg leading-7 md:max-w-sm">
                    There are 400+ real estate agencies operating in Gurgaon today. Here is the specific difference 18 years of focused Gurgaon advisory delivers.
                </p>
            </div>

            {/* Pillars */}
            <WhyUsCarousel pillars={pillars} />

        </section>
    );
};

export default WhyUs;
