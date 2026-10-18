import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from "next";
import { contactPageSchema, breadcrumbSchema } from "@/lib/jsonld";
import ContactForm from "@/components/shared/ContactForm";
import { COMPANY, formattedAddress } from "@/lib/company";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with Unisel Realty for all your real estate needs. Contact our team for property inquiries, consultations, and expert advice.",
    keywords: ["contact", "real estate", "unisel realty", "property inquiry", "consultation"],
    alternates: { canonical: "https://www.uniselrealty.com/contact" },
    openGraph: {
        title: "Contact Unisel Realty | Real Estate Experts",
        description: "Get in touch with Unisel Realty for all your real estate needs.",
        url: "https://www.uniselrealty.com/contact",
        siteName: "Unisel Realty",
        images: [{ url: "/contact/opengraph-image", width: 1200, height: 630, alt: "Contact Unisel Realty" }],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Unisel Realty | Real Estate Experts",
        description: "Get in touch with Unisel Realty for all your real estate needs.",
        images: ["/contact/opengraph-image"],
    },
};

// Derived from the COMPANY fact sheet -- never hardcode these.
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    formattedAddress()
)}&destination_place_id=${COMPANY.googlePlaceId}`;
const mapEmbedSrc = `https://maps.google.com/maps?q=${COMPANY.geo.latitude},${COMPANY.geo.longitude}&z=16&output=embed`;

export default function ContactPage() {
    const schema = contactPageSchema();
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://www.uniselrealty.com" },
        { name: "Contact Us", url: "https://www.uniselrealty.com/contact" },
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
                        No generic listings. No cold calls. One focused conversation with a Gurgaon real estate advisor who has been in this market since 2005.
                    </p>
                </div>
            </div>
            <div className='border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-xl dark:shadow-white/10'>
                <div className='flex flex-col lg:flex-row lg:items-center gap-12'>
                    <div className='relative w-fit'>
                        <Image src={'/images/contactUs/contactUs.jpg'} alt='Contact Unisel Realty office in Gurgaon' width={497} height={535} className='rounded-2xl brightness-50 h-full' />
                        <div className='absolute top-6 left-6 lg:top-12 lg:left-12 flex flex-col gap-2'>
                            <h2 className='text-xl xs:text-2xl mobile:text-3xl font-medium tracking-tight text-white'>Contact information</h2>
                            <p className='text-sm xs:text-base mobile:text-xm font-normal text-white/80'>
                                Ready to find your dream home or sell your property? We&apos;re here to help!
                            </p>
                        </div>
                        <div className='absolute bottom-6 left-6 lg:bottom-12 lg:left-12 flex flex-col gap-4 text-white'>
                            <Link href={`tel:${COMPANY.telephoneHref}`} className='w-fit'>
                                <div className='flex items-center gap-4 group w-fit min-h-11'>
                                    <Icon icon={'ph:phone'} width={32} height={32} />
                                    <p className='text-sm xs:text-base mobile:text-xm font-normal group-hover:text-primary'>{COMPANY.telephone}</p>
                                </div>
                            </Link>
                            <Link href={`mailto:${COMPANY.email}`} className='w-fit'>
                                <div className='flex items-center gap-4 group w-fit min-h-11'>
                                    <Icon icon={'ph:envelope-simple'} width={32} height={32} />
                                    <p className='text-sm xs:text-base mobile:text-xm font-normal group-hover:text-primary'>{COMPANY.email}</p>
                                </div>
                            </Link>
                            <div className='flex items-center gap-4'>
                                <Icon icon={'ph:map-pin'} width={32} height={32} />
                                <p className='text-sm xs:text-base mobile:text-xm font-normal'>
                                    {COMPANY.address.streetAddress}<br />
                                    {COMPANY.address.addressLocality}, {COMPANY.address.addressRegion} {COMPANY.address.postalCode}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1/2'>
                        <ContactForm variant="page" />
                    </div>
                </div>
            </div>

            {/* Office location map */}
            <div className='mt-14'>
                <div className='flex items-center justify-between flex-wrap gap-4 mb-6'>
                    <h2 className='text-2xl sm:text-3xl font-medium tracking-tight text-black dark:text-white'>
                        Visit Our Office
                    </h2>
                    <a
                        href={directionsUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 min-h-11 px-5 rounded-full border border-black/10 dark:border-white/10 text-sm font-medium text-black dark:text-white hover:border-primary hover:text-primary duration-200'
                    >
                        <Icon icon={'ph:map-pin'} width={18} height={18} />
                        Get Directions
                    </a>
                </div>
                <div className='rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 w-full aspect-[16/9] sm:aspect-[21/9]'>
                    <iframe
                        src={mapEmbedSrc}
                        title='Unisel Realty office location on Google Maps'
                        loading='lazy'
                        referrerPolicy='no-referrer-when-downgrade'
                        className='w-full h-full border-0'
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}
