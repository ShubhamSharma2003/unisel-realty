import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from "next";
import { contactPageSchema, breadcrumbSchema } from "@/lib/jsonld";
import ContactForm from "@/components/shared/ContactForm";

export const metadata: Metadata = {
    title: "Contact Us | Unisel Realty",
    description: "Get in touch with Unisel Realty for all your real estate needs. Contact our team for property inquiries, consultations, and expert advice.",
    keywords: ["contact", "real estate", "unisel realty", "property inquiry", "consultation"],
    alternates: { canonical: "https://uniselrealty.com/contact" },
    openGraph: {
        title: "Contact Unisel Realty | Real Estate Experts",
        description: "Get in touch with Unisel Realty for all your real estate needs.",
        url: "https://uniselrealty.com/contact",
        siteName: "Unisel Realty",
        images: [{ url: "/images/contactUs/og-image.jpg", width: 1200, height: 630, alt: "Contact Unisel Realty" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Unisel Realty | Real Estate Experts",
        description: "Get in touch with Unisel Realty for all your real estate needs.",
        images: ["/images/contactUs/og-image.jpg"],
    },
};

export default function ContactPage() {
    const schema = contactPageSchema();
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://uniselrealty.com" },
        { name: "Contact Us", url: "https://uniselrealty.com/contact" },
    ]);

    return (
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-44 pb-14 md:pb-28'>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <div className='mb-16'>
                <div className='flex gap-2.5 items-center justify-center mb-3'>
                    <span>
                        <Icon icon={'ph:house-simple-fill'} width={20} height={20} className='text-primary' />
                    </span>
                    <p className='text-base font-semibold text-badge dark:text-white/90'>Get Started</p>
                </div>
                <div className='text-center'>
                    <h1 className='text-4xl sm:text-52 font-medium tracking-tighter text-black dark:text-white mb-3 leading-10 sm:leading-14'>
                        Tell Us What You Are Looking For.<br className='hidden sm:block' /> We&apos;ll Tell You Exactly What to Buy.
                    </h1>
                    <p className='text-xm font-normal tracking-tight text-black/50 dark:text-white/50 leading-6'>
                        No generic listings. No cold calls. One focused conversation with a Gurgaon real estate advisor who has been in this market since 2006.
                    </p>
                </div>
            </div>
            <div className='border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-xl dark:shadow-white/10'>
                <div className='flex flex-col lg:flex-row lg:items-center gap-12'>
                    <div className='relative w-fit'>
                        <Image src={'/images/contactUs/contactUs.jpg'} alt='Contact Unisel Realty office in Gurgaon' width={497} height={535} className='rounded-2xl brightness-50 h-full' unoptimized={true} />
                        <div className='absolute top-6 left-6 lg:top-12 lg:left-12 flex flex-col gap-2'>
                            <h2 className='text-xl xs:text-2xl mobile:text-3xl font-medium tracking-tight text-white'>Contact information</h2>
                            <p className='text-sm xs:text-base mobile:text-xm font-normal text-white/80'>
                                Ready to find your dream home or sell your property? We&apos;re here to help!
                            </p>
                        </div>
                        <div className='absolute bottom-6 left-6 lg:bottom-12 lg:left-12 flex flex-col gap-4 text-white'>
                            <Link href={'tel:+918010303303'} className='w-fit'>
                                <div className='flex items-center gap-4 group w-fit'>
                                    <Icon icon={'ph:phone'} width={32} height={32} />
                                    <p className='text-sm xs:text-base mobile:text-xm font-normal group-hover:text-primary'>+91 8010 303 303</p>
                                </div>
                            </Link>
                            <Link href={'mailto:info@uniselrealty.com'} className='w-fit'>
                                <div className='flex items-center gap-4 group w-fit'>
                                    <Icon icon={'ph:envelope-simple'} width={32} height={32} />
                                    <p className='text-sm xs:text-base mobile:text-xm font-normal group-hover:text-primary'>info@uniselrealty.com</p>
                                </div>
                            </Link>
                            <div className='flex items-center gap-4'>
                                <Icon icon={'ph:map-pin'} width={32} height={32} />
                                <p className='text-sm xs:text-base mobile:text-xm font-normal'>408, 4th floor, Adani Miracle Mile<br />Sector 60, Gurgaon</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1/2'>
                        <ContactForm variant="page" />
                    </div>
                </div>
            </div>
        </div>
    );
}
