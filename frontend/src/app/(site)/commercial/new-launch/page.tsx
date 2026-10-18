import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import { Metadata } from "next";
import { withEmptyListingRobots } from "@/lib/listingMetadata";
import { breadcrumbSchema } from "@/lib/jsonld";

const baseMetadata: Metadata = {
    title: "New Launch Commercial Projects in Gurgaon",
    description: "Explore the latest new launch commercial projects in Gurgaon. Office spaces, retail shops, and commercial plots by top developers.",
    keywords: ["new launch commercial projects gurgaon", "new commercial properties 2026", "office spaces gurgaon", "unisel realty"],
    alternates: { canonical: "https://www.uniselrealty.com/commercial/new-launch" },
    openGraph: {
        title: "New Launch Commercial Projects in Gurgaon | Unisel Realty",
        description: "Explore the latest new launch commercial projects in Gurgaon by top developers.",
        url: "https://www.uniselrealty.com/commercial/new-launch",
        siteName: "Unisel Realty",
        images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: "New launch commercial projects Gurgaon" }],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "New Launch Commercial Projects in Gurgaon | Unisel Realty",
        description: "Explore the latest new launch commercial projects in Gurgaon.",
        images: ["/images/properties/og-image.jpg"],
    },
};

// Deindex while this status has no inventory (see listingMetadata).
export const generateMetadata = (): Promise<Metadata> =>
    withEmptyListingRobots(baseMetadata, "commercial", "new-launch");

const CommercialNewLaunchPage = () => {
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://www.uniselrealty.com" },
        { name: "Commercial", url: "https://www.uniselrealty.com/commercial" },
        { name: "New Launch", url: "https://www.uniselrealty.com/commercial/new-launch" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <HeroSub
                title="New Launch Commercial Projects in Gurgaon."
                description="Office spaces, retail shops, and commercial plots by top developers."
                badge="New Launch"
            />
            <PropertiesListing category="commercial" status="new-launch" />
        </>
    );
};

export default CommercialNewLaunchPage;
