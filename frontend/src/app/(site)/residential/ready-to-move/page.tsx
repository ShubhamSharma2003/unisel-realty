import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import { Metadata } from "next";
import { withEmptyListingRobots } from "@/lib/listingMetadata";
import { breadcrumbSchema } from "@/lib/jsonld";

const baseMetadata: Metadata = {
    title: "Ready to Move Properties in Gurgaon",
    description: "Find ready-to-move residential properties in Gurgaon. Move in immediately — verified listings of apartments and villas available right now.",
    keywords: ["ready to move properties gurgaon", "ready possession flats gurgaon", "immediate possession apartments", "unisel realty"],
    alternates: { canonical: "https://www.uniselrealty.com/residential/ready-to-move" },
    openGraph: {
        title: "Ready to Move Properties in Gurgaon | Unisel Realty",
        description: "Find ready-to-move residential properties in Gurgaon. Move in immediately — no waiting.",
        url: "https://www.uniselrealty.com/residential/ready-to-move",
        siteName: "Unisel Realty",
        images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: "Ready to move properties Gurgaon" }],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ready to Move Properties in Gurgaon | Unisel Realty",
        description: "Find ready-to-move residential properties in Gurgaon.",
        images: ["/images/properties/og-image.jpg"],
    },
};

// Deindex while this status has no inventory (see listingMetadata).
export const generateMetadata = (): Promise<Metadata> =>
    withEmptyListingRobots(baseMetadata, "residential", "ready-to-move");

const ReadyToMovePage = () => {
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://www.uniselrealty.com" },
        { name: "Residential", url: "https://www.uniselrealty.com/residential" },
        { name: "Ready to Move", url: "https://www.uniselrealty.com/residential/ready-to-move" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <HeroSub
                title="Ready to Move Properties."
                description="Move in immediately — verified listings of apartments and villas available right now."
                badge="Ready to Move"
            />
            <PropertiesListing category="residential" status="ready-to-move" />
        </>
    );
};

export default ReadyToMovePage;
