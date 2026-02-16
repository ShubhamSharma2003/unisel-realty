import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import React from "react";
import { Metadata } from "next";
import { getPropertiesCount } from "@/lib/sanity.services";

export async function generateMetadata(): Promise<Metadata> {
    const totalProperties = await getPropertiesCount();
    const siteUrl = 'https://uniselrealty.com';
    const siteName = 'Unisel Realty';

    const title = `Property List | ${siteName}`;
    const description = `Discover ${totalProperties} inspiring designed homes. Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living.`;

    return {
        title,
        description,
        keywords: ["properties", "homes", "luxury villas", "real estate", "property listings"],
        openGraph: {
            title: `Discover ${totalProperties} Luxury Properties | ${siteName}`,
            description,
            url: `${siteUrl}/properties`,
            siteName,
            images: [
                {
                    url: "/images/properties/og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Homely luxury properties",
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Discover ${totalProperties} Luxury Properties | ${siteName}`,
            description,
            images: ["/images/properties/og-image.jpg"],
        },
    };
}

const page = () => {
    return (
        <>
            <HeroSub
                title="Discover inspiring designed homes."
                description="Experience elegance and comfort with our exclusive luxury  villas, designed for sophisticated living."
                badge="Properties"
            />
            <PropertiesListing />
        </>
    );
};

export default page;
