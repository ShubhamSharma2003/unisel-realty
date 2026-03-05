import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import { Metadata } from "next";
import { propertyCollectionSchema, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
    title: "Commercial Properties in Gurgaon | Unisel Realty",
    description: "Explore premium commercial properties in Gurgaon — office spaces, retail shops, and pre-leased investments. Expert guidance for business real estate.",
    keywords: ["commercial properties gurgaon", "office spaces gurgaon", "retail shops gurgaon", "commercial real estate", "unisel realty"],
    alternates: { canonical: "https://uniselrealty.com/commercial" },
    openGraph: {
        title: "Commercial Properties in Gurgaon | Unisel Realty",
        description: "Explore premium commercial properties in Gurgaon — office spaces, retail shops, and pre-leased investments.",
        url: "https://uniselrealty.com/commercial",
        siteName: "Unisel Realty",
        images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: "Commercial properties Gurgaon" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Commercial Properties in Gurgaon | Unisel Realty",
        description: "Explore premium commercial properties in Gurgaon.",
        images: ["/images/properties/og-image.jpg"],
    },
};

const CommercialPage = () => {
    const schema = propertyCollectionSchema({
        name: "Commercial Properties in Gurgaon | Unisel Realty",
        description: "Explore premium commercial properties in Gurgaon — office spaces, retail shops, and pre-leased investments.",
        url: "https://uniselrealty.com/commercial",
    });
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://uniselrealty.com" },
        { name: "Commercial", url: "https://uniselrealty.com/commercial" },
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
                title="Commercial Properties in Gurgaon."
                description="Office spaces, retail shops, and pre-leased investments for your business."
                badge="Commercial"
            />
            <PropertiesListing category="commercial" />
        </>
    );
};

export default CommercialPage;
