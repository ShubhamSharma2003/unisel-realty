import { Icon } from '@iconify/react';
import Image from 'next/image';
import Script from 'next/script';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const FAQ_ITEMS = [
    {
        question: "What does a property dealer in Gurgaon do?",
        answer: "A property dealer — or real estate channel partner — is a RERA-registered advisor who bridges the gap between buyers and developers. At Unisel Realty, we shortlist properties, arrange site visits, negotiate prices, verify RERA status, process home loans, and handle all legal paperwork. We're authorised for DLF, M3M, Emaar, and 15+ developers. You get developer pricing, plus unbiased expert advice — at zero advisory fee.",
    },
    {
        question: "How do I buy a flat in Gurgaon?",
        answer: "Here's how it works: (1) Set your budget — 2BHK flats start from ₹60 lakh on Dwarka Expressway; Golf Course Road luxury starts from ₹3 Cr+. (2) Pick a location — Dwarka Expressway, Golf Course Road, New Gurgaon, or Sohna Road. (3) Call us for a free site visit and honest consultation. (4) Verify RERA registration at hrera.org.in. (5) We handle booking, home loan, and legal documentation end to end.",
    },
    {
        question: "Which are the best areas to buy property in Gurgaon in 2025–26?",
        answer: "Golf Course Road for ultra-luxury (DLF & Emaar), Golf Course Extension Road for premium (M3M & Sobha), Dwarka Expressway for fastest-growing value (2BHK–4BHK), New Gurgaon Sectors 79–115 for affordable high-rises, Sohna Road for mid-segment with strong rentals, and MG Road/Cyber City for commercial property. We'll recommend the right one based on your budget and goals.",
    },
    {
        question: "What is the price of a luxury apartment in Gurgaon?",
        answer: "Prices vary by location: Golf Course Road — ₹3 Cr to ₹25 Cr+ (DLF, Emaar ultra-luxury); Golf Course Extension Road — ₹1.5 Cr to ₹8 Cr (M3M, Sobha, Birla Estate); Dwarka Expressway — ₹80 lakh to ₹3 Cr (2BHK–4BHK); New Gurgaon — ₹60 lakh to ₹2 Cr (first-time buyer segment). Contact us for real-time, developer-verified pricing on any specific project.",
    },
    {
        question: "Is Gurgaon a good city to invest in real estate?",
        answer: "Consistently, yes. Gurgaon ranks among India's top real estate destinations — driven by strong infrastructure (NH-48, Dwarka Expressway, Delhi Metro), proximity to IGI Airport, RERA compliance, and 250+ Fortune 500 companies in Cyber City. Golf Course Road and Dwarka Expressway have delivered 10–18% CAGR capital appreciation over five years. It's a sound choice for both end-use and investment.",
    },
    {
        question: "What is a real estate channel partner in Gurgaon?",
        answer: "A RERA-registered agent formally authorised by a developer to market and sell their projects. Unisel Realty is an authorised channel partner for DLF, M3M, Emaar, Adani Realty, Godrej, Birla Estate, and 15+ others. You pay the same price as the developer's direct office — but you get unbiased project comparisons, free legal advice, and full transaction support on your side.",
    },
    {
        question: "Can NRIs buy property in Gurgaon?",
        answer: "Yes. NRIs and OCIs can purchase residential and commercial property in India under FEMA (1999). Our dedicated NRI desk handles: FEMA & RBI-compliant guidance, virtual 3D property tours, Power of Attorney drafting and registration, home loans from NRI-friendly banks, and rental income repatriation. We manage the full transaction remotely — you invest from wherever you are.",
    },
    {
        question: "What are the charges when buying property in Gurgaon?",
        answer: "Budget for: (1) BSP — Basic Sale Price. (2) PLC — Preferential Location Charges (higher floors, park/road facing). (3) GST — 5% on under-construction; nil on ready-to-move. (4) Stamp Duty — ~5–7% of property value in Haryana. (5) Registration Charges — 1% or flat ₹50,000. (6) Home Loan Processing Fee — 0.5–1% of loan amount. We give you a full cost breakdown upfront. No hidden charges, ever.",
    },
    {
        question: "Which developers are best to buy property from in Gurgaon?",
        answer: "Gurgaon's most reputed RERA-registered developers: DLF (ultra-luxury, Golf Course Road), Emaar India (premium residential & commercial), M3M (mid-luxury, Golf Course Extension Road), Adani Realty (Golf Course Road & Dwarka Expressway), Godrej Properties, Birla Estate, Max Estate, Smart World, Signature Global, Sobha, Hero Homes, AIPL, and Elan Group. We're authorised for all of them — giving you verified access to the best projects and prices.",
    },
    {
        question: "How do I verify a property is RERA-registered in Gurgaon?",
        answer: "Go to hrera.org.in — the official Haryana RERA website — and search by project name, developer name, or RERA number. Every project we list is 100% RERA-verified. Our own registration number is RC/HARERA/GGM/1940/1535/2022/308. One firm rule: never buy from any developer or agent that isn't RERA-registered. The legal risk simply isn't worth it.",
    },
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(({ question, answer }) => ({
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": answer,
        },
    })),
};

const FAQ: React.FC = () => {
    return (
        <section id='faqs'>
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
                <div className="flex">
                    <div className='lg:px-12 '>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary " />
                            FAQs
                        </p>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <h2 className='text-40 lg:text-52 font-medium leading-[1.2] text-dark dark:text-white'>
                                Frequently Asked Questions — Buying Property in Gurgaon
                            </h2>
                            <p className='text-dark/50 dark:text-white/50 text-lg leading-7 md:max-w-sm'>
                                Real answers to the questions homebuyers, investors, and NRIs actually ask.
                            </p>
                        </div>
                        <div className="my-8 lg:overflow-y-auto lg:max-h-[644px] lg:pr-4 lg:self-start">
                            <Accordion type="single" defaultValue="item-0" collapsible className="w-full flex flex-col gap-6">
                                {FAQ_ITEMS.map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger>{`${index + 1}. ${item.question}`}</AccordionTrigger>
                                        <AccordionContent>
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
