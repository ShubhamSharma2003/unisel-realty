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
        question: "What makes Unisel Realty different from other real estate consultants in Gurgaon?",
        answer: "Unisel Realty has been operating exclusively in Gurgaon's luxury real estate market since 2006 — 20 years of on-ground market intelligence that newer, pan-India firms cannot replicate. We are authorised channel partners of DLF, Godrej and M3M with pre-launch inventory access, a dedicated NRI desk, and post-purchase property management — all under one roof. Our 90% client retention reflects the outcome, not just the promise.",
    },
    {
        question: "Can NRIs buy property in Gurgaon?",
        answer: "Yes. Non-Resident Indians (NRIs) and Persons of Indian Origin (PIOs) can purchase residential and commercial properties in India under FEMA regulations — without RBI permission in most cases. Our dedicated NRI desk manages the complete transaction including Power of Attorney, TDS compliance under Section 195, Form 15CA/CB filing, and repatriation of sale proceeds. We have advised 200+ NRI clients across UAE, UK, USA, Singapore, Canada and Australia.",
    },
    {
        question: "What is the best area to invest in Gurgaon in 2025?",
        answer: "Based on our current advisory, Golf Course Road (Sectors 42–54) offers the highest appreciation potential for luxury residential buyers due to constrained new supply and sustained demand from MNC employees and HNI buyers. For highest rental yield, Sector 60–65 generates the strongest NRI rental enquiry. For commercial investment, the Dwarka Expressway SCO corridor (Sectors 99–115) is where we are directing the most client capital right now.",
    },
    {
        question: "How does Unisel Realty help NRI buyers manage property from abroad?",
        answer: "We offer end-to-end post-purchase management — possession walkthrough, developer punch list resolution, interior coordination, rental listing on premium platforms, tenant screening, lease agreement execution, and annual yield reporting. 80+ units are currently under active management. NRI clients receive quarterly updates and have a single point of contact for all property matters.",
    },
    {
        question: "What is an SCO plot and is it a good investment in Gurgaon?",
        answer: "SCO (Shop-Cum-Office) is a commercial plot format unique to Haryana — ground floor retail, upper floors for office or residential lease. It combines rental income from multiple floors on a single owned plot, making it one of the highest-yielding real estate formats in NCR. On Dwarka Expressway, SCO plots near IGI Airport have delivered 18–24% appreciation since allotment. We currently advise on M3M and Emaar SCO inventory in Sectors 113 and 114.",
    },
    {
        question: "Is Unisel Realty RERA registered?",
        answer: "Yes. Unisel Realty Pvt. Ltd. is registered under the Real Estate (Regulation and Development) Act, 2016. All projects we advise on are RERA registered and we provide full RERA documentation to every client before any booking is initiated.",
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
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 md:mb-12">
                            <h2 className='text-40 lg:text-52 font-medium leading-[1.2] text-dark dark:text-white'>
                                Frequently Asked Questions
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
