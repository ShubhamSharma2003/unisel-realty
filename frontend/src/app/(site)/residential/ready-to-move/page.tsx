import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ready to Move Properties in Gurgaon | Unisel Realty",
    description: "Find ready-to-move residential properties in Gurgaon. Move in immediately — verified listings of apartments and villas available right now.",
    keywords: ["ready to move properties gurgaon", "ready possession flats gurgaon", "immediate possession apartments", "unisel realty"],
    openGraph: {
        title: "Ready to Move Properties in Gurgaon | Unisel Realty",
        description: "Find ready-to-move residential properties in Gurgaon. Move in immediately — no waiting.",
        url: "https://uniselrealty.com/residential/ready-to-move",
        siteName: "Unisel Realty",
        images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: "Ready to move properties Gurgaon" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ready to Move Properties in Gurgaon | Unisel Realty",
        description: "Find ready-to-move residential properties in Gurgaon.",
        images: ["/images/properties/og-image.jpg"],
    },
};

const ReadyToMovePage = () => {
    return (
        <>
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
