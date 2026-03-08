import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
    title: "Near Possession Commercial Properties in Gurgaon | Unisel Realty",
    description: "Discover near-possession commercial properties in Gurgaon. Projects nearing completion — start earning rental income soon.",
    keywords: ["near possession commercial gurgaon", "nearing completion office spaces gurgaon", "almost ready commercial properties", "unisel realty"],
    alternates: { canonical: "https://uniselrealty.com/commercial/near-possession" },
    openGraph: {
        title: "Near Possession Commercial Properties in Gurgaon | Unisel Realty",
        description: "Discover near-possession commercial properties in Gurgaon. Start earning rental income soon.",
        url: "https://uniselrealty.com/commercial/near-possession",
        siteName: "Unisel Realty",
        images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: "Near possession commercial properties Gurgaon" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Near Possession Commercial Properties in Gurgaon | Unisel Realty",
        description: "Discover near-possession commercial properties in Gurgaon.",
        images: ["/images/properties/og-image.jpg"],
    },
};

const CommercialNearPossessionPage = () => {
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://uniselrealty.com" },
        { name: "Commercial", url: "https://uniselrealty.com/commercial" },
        { name: "Near Possession", url: "https://uniselrealty.com/commercial/near-possession" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <HeroSub
                title="Near Possession Commercial Properties in Gurgaon."
                description="Projects nearing completion — start earning rental income soon."
                badge="Near Possession"
            />
            <PropertiesListing category="commercial" status="near-possession" />
        </>
    );
};

export default CommercialNearPossessionPage;
