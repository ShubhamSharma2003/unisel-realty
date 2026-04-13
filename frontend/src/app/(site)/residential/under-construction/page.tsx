import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
    title: "Under Construction Residential Projects in Gurgaon",
    description: "Explore under-construction residential projects in Gurgaon. Invest early in upcoming apartments and villas by top developers at pre-completion prices.",
    keywords: ["under construction projects gurgaon", "upcoming residential projects gurgaon", "new apartments gurgaon", "unisel realty"],
    alternates: { canonical: "https://uniselrealty.com/residential/under-construction" },
    openGraph: {
        title: "Under Construction Residential Projects in Gurgaon | Unisel Realty",
        description: "Explore under-construction residential projects in Gurgaon. Invest early at pre-completion prices.",
        url: "https://uniselrealty.com/residential/under-construction",
        siteName: "Unisel Realty",
        images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: "Under construction residential projects Gurgaon" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Under Construction Residential Projects in Gurgaon | Unisel Realty",
        description: "Explore under-construction residential projects in Gurgaon.",
        images: ["/images/properties/og-image.jpg"],
    },
};

const UnderConstructionPage = () => {
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://uniselrealty.com" },
        { name: "Residential", url: "https://uniselrealty.com/residential" },
        { name: "Under Construction", url: "https://uniselrealty.com/residential/under-construction" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <HeroSub
                title="Under Construction Projects in Gurgaon."
                description="Invest early in upcoming apartments and villas by top developers at pre-completion prices."
                badge="Under Construction"
            />
            <PropertiesListing category="residential" status="under-construction" />
        </>
    );
};

export default UnderConstructionPage;
