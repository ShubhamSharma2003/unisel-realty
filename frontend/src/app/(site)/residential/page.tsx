import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import React from "react";
import { Metadata } from "next";
import { getPropertiesCount } from "@/lib/sanity.services";
import { propertyCollectionSchema, breadcrumbSchema } from "@/lib/jsonld";

export async function generateMetadata(): Promise<Metadata> {
    const totalProperties = await getPropertiesCount();
    const siteUrl = 'https://uniselrealty.com';
    const siteName = 'Unisel Realty';

    const title = `Residential Properties in Gurgaon | ${siteName}`;
    const description = `Explore ${totalProperties} residential properties in Gurgaon. Premium apartments, villas, and homes by top developers.`;

    return {
        title,
        description,
        keywords: ["residential properties", "homes gurgaon", "apartments gurgaon", "luxury villas", "real estate gurgaon"],
        alternates: { canonical: `${siteUrl}/residential` },
        openGraph: {
            title: `Residential Properties in Gurgaon | ${siteName}`,
            description,
            url: `${siteUrl}/residential`,
            siteName,
            images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: "Unisel Realty residential properties Gurgaon" }],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Residential Properties in Gurgaon | ${siteName}`,
            description,
            images: ["/images/properties/og-image.jpg"],
        },
    };
}

const ResidentialPage = async () => {
    const totalProperties = await getPropertiesCount();
    const schema = propertyCollectionSchema({
        name: "Residential Properties in Gurgaon | Unisel Realty",
        description: `Explore ${totalProperties} residential properties in Gurgaon. Premium apartments, villas, and homes by top developers.`,
        url: "https://uniselrealty.com/residential",
    });
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://uniselrealty.com" },
        { name: "Residential", url: "https://uniselrealty.com/residential" },
    ]);

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
            <HeroSub
                title="Residential Properties in Gurgaon."
                description="Explore premium apartments, villas, and homes by top developers."
                badge="Residential"
            />
            <PropertiesListing category="residential" />
        </>
    );
};

export default ResidentialPage;
