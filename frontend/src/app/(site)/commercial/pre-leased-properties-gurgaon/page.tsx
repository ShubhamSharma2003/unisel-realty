import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pre-Leased Properties in Gurgaon | Unisel Realty",
    description: "Invest in pre-leased commercial properties in Gurgaon. Assured rental income from day one. Office spaces, retail, and warehouses with existing tenants.",
    keywords: ["pre-leased properties gurgaon", "assured rental income gurgaon", "investment properties gurgaon", "unisel realty"],
    openGraph: {
        title: "Pre-Leased Properties in Gurgaon | Unisel Realty",
        description: "Invest in pre-leased commercial properties in Gurgaon. Assured rental income from day one.",
        url: "https://uniselrealty.com/commercial/pre-leased-properties-gurgaon",
        siteName: "Unisel Realty",
        images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: "Pre-leased properties Gurgaon" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pre-Leased Properties in Gurgaon | Unisel Realty",
        description: "Invest in pre-leased commercial properties in Gurgaon.",
        images: ["/images/properties/og-image.jpg"],
    },
};

const PreLeasedPage = () => {
    return (
        <>
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
