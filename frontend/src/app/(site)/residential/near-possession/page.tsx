import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
    title: "Near Possession Residential Properties in Gurgaon",
    description: "Discover near-possession residential properties in Gurgaon. Projects nearing completion — move in soon with minimal wait time.",
    keywords: ["near possession properties gurgaon", "nearing completion flats gurgaon", "almost ready apartments gurgaon", "unisel realty"],
    alternates: { canonical: "https://uniselrealty.com/residential/near-possession" },
    openGraph: {
        title: "Near Possession Residential Properties in Gurgaon | Unisel Realty",
        description: "Discover near-possession residential properties in Gurgaon. Move in soon with minimal wait.",
        url: "https://uniselrealty.com/residential/near-possession",
        siteName: "Unisel Realty",
        images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: "Near possession properties Gurgaon" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Near Possession Residential Properties in Gurgaon | Unisel Realty",
        description: "Discover near-possession residential properties in Gurgaon.",
        images: ["/images/properties/og-image.jpg"],
    },
};

const NearPossessionPage = () => {
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://uniselrealty.com" },
        { name: "Residential", url: "https://uniselrealty.com/residential" },
        { name: "Near Possession", url: "https://uniselrealty.com/residential/near-possession" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <HeroSub
                title="Near Possession Properties in Gurgaon."
                description="Projects nearing completion — move in soon with minimal wait time."
                badge="Near Possession"
            />
            <PropertiesListing category="residential" status="near-possession" />
        </>
    );
};

export default NearPossessionPage;
