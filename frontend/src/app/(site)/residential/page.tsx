import React from "react";
import { Metadata } from "next";
import { getPropertiesCount } from "@/lib/sanity.services";
import {
  propertyCollectionSchema,
  breadcrumbSchema,
} from "@/lib/jsonld";
import { RESIDENTIAL_FAQS } from "@/components/Residential/residentialData";

import ResidentialHero from "@/components/Residential/ResidentialHero";
import ResidentialContent from "@/components/Residential/ResidentialContent";
import PropertiesListing from "@/components/Properties/PropertyList";

export async function generateMetadata(): Promise<Metadata> {
    const totalProperties = await getPropertiesCount();
    const siteUrl = 'https://www.uniselrealty.com';
    const siteName = 'Unisel Realty';

    const title = `Luxury Residential Properties in Gurgaon`;
    const description = `Explore ${totalProperties}+ curated luxury apartments & premium flats across Golf Course Road, Golf Course Extension Road & Dwarka Expressway. RERA-verified, direct developer pricing, zero brokerage. 18 years of expertise in Gurgaon real estate.`;

    return {
        title,
        description,
        keywords: [
            "luxury residential properties gurgaon",
            "premium apartments gurgaon",
            "golf course road apartments",
            "golf course extension road properties",
            "dwarka expressway flats",
            "DLF apartments gurgaon",
            "godrej properties gurgaon",
            "NRI property gurgaon",
            "RERA registered properties gurgaon",
            "real estate gurgaon",
        ],
        alternates: { canonical: `${siteUrl}/residential` },
        openGraph: {
            title: `Luxury Residential Properties in Gurgaon | ${siteName}`,
            description,
            url: `${siteUrl}/residential`,
            siteName,
            images: [{ url: "/residential/opengraph-image", width: 1200, height: 630, alt: "Unisel Realty luxury residential properties Gurgaon" }],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Luxury Residential Properties in Gurgaon | ${siteName}`,
            description,
            images: ["/residential/opengraph-image"],
        },
    };
}

const ResidentialPage = async () => {
    const totalProperties = await getPropertiesCount();
    const schema = propertyCollectionSchema({
        name: "Luxury Residential Properties in Gurgaon | Unisel Realty",
        description: `Explore ${totalProperties}+ curated luxury residential properties across Golf Course Road, Golf Course Extension Road & Dwarka Expressway.`,
        url: "https://www.uniselrealty.com/residential",
        dateModified: "2026-04-12",
    });
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://www.uniselrealty.com" },
        { name: "Residential", url: "https://www.uniselrealty.com/residential" },
    ]);
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://www.uniselrealty.com/residential#faqpage",
        mainEntity: RESIDENTIAL_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <ResidentialHero />
            <PropertiesListing category="residential" />
            <ResidentialContent />
        </>
    );
};

export default ResidentialPage;
