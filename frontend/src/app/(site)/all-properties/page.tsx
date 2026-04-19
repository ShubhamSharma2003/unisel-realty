import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import React from "react";
import { Metadata } from "next";
import { getPropertiesCount } from "@/lib/sanity.services";
import { propertyCollectionSchema, breadcrumbSchema } from "@/lib/jsonld";

export async function generateMetadata(): Promise<Metadata> {
    const totalProperties = await getPropertiesCount();
    const siteUrl = 'https://www.uniselrealty.com';
    const siteName = 'Unisel Realty';

    const title = `All Properties in Gurgaon | ${siteName}`;
    const description = `Browse all ${totalProperties} properties in Gurgaon — residential, commercial, pre-leased, and more. Find your perfect property with ${siteName}.`;

    return {
        title,
        description,
        keywords: ["all properties gurgaon", "residential properties", "commercial properties", "real estate gurgaon", "unisel realty"],
        alternates: { canonical: `${siteUrl}/all-properties` },
        openGraph: {
            title: `All Properties in Gurgaon | ${siteName}`,
            description,
            url: `${siteUrl}/all-properties`,
            siteName,
            images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: "Unisel Realty all properties Gurgaon" }],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `All Properties in Gurgaon | ${siteName}`,
            description,
            images: ["/images/properties/og-image.jpg"],
        },
    };
}

const AllPropertiesPage = async () => {
    const totalProperties = await getPropertiesCount();
    const schema = propertyCollectionSchema({
        name: "All Properties in Gurgaon | Unisel Realty",
        description: `Browse all ${totalProperties} properties in Gurgaon — residential, commercial, pre-leased, and more.`,
        url: "https://www.uniselrealty.com/all-properties",
    });
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://www.uniselrealty.com" },
        { name: "All Properties", url: "https://www.uniselrealty.com/all-properties" },
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
                title="All Properties in Gurgaon."
                description="Browse our complete collection of residential and commercial properties."
                badge="All Properties"
            />
            <PropertiesListing />
        </>
    );
};

export default AllPropertiesPage;
