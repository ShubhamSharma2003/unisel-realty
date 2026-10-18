import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import { Metadata } from "next";
import { withEmptyListingRobots } from "@/lib/listingMetadata";
import { breadcrumbSchema } from "@/lib/jsonld";

const baseMetadata: Metadata = {
    title: "Pre-Leased Properties in Gurgaon",
    description: "Invest in pre-leased commercial properties in Gurgaon. Assured rental income from day one. Office spaces, retail, and warehouses with existing tenants.",
    keywords: ["pre-leased properties gurgaon", "assured rental income gurgaon", "investment properties gurgaon", "unisel realty"],
    alternates: { canonical: "https://www.uniselrealty.com/commercial/pre-leased" },
    openGraph: {
        title: "Pre-Leased Properties in Gurgaon | Unisel Realty",
        description: "Invest in pre-leased commercial properties in Gurgaon. Assured rental income from day one.",
        url: "https://www.uniselrealty.com/commercial/pre-leased",
        siteName: "Unisel Realty",
        images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: "Pre-leased properties Gurgaon" }],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pre-Leased Properties in Gurgaon | Unisel Realty",
        description: "Invest in pre-leased commercial properties in Gurgaon.",
        images: ["/images/properties/og-image.jpg"],
    },
};

// Deindex while this status has no inventory (see listingMetadata).
export const generateMetadata = (): Promise<Metadata> =>
    withEmptyListingRobots(baseMetadata, "commercial", "pre-leased");

const PreLeasedPage = () => {
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://www.uniselrealty.com" },
        { name: "Commercial", url: "https://www.uniselrealty.com/commercial" },
        { name: "Pre-Leased", url: "https://www.uniselrealty.com/commercial/pre-leased" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <HeroSub
                title="Pre-Leased Properties in Gurgaon."
                description="Assured rental income from day one — office spaces, retail, and warehouses with existing tenants."
                badge="Pre-Leased"
            />
            <PropertiesListing category="commercial" status="pre-leased" />
        </>
    );
};

export default PreLeasedPage;
