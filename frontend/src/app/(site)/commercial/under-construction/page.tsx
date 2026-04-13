import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
    title: "Under Construction Commercial Projects in Gurgaon",
    description: "Explore under-construction commercial projects in Gurgaon. Invest early in upcoming office spaces, retail, and mixed-use developments.",
    keywords: ["under construction commercial projects gurgaon", "upcoming commercial properties gurgaon", "office spaces under construction", "unisel realty"],
    alternates: { canonical: "https://uniselrealty.com/commercial/under-construction" },
    openGraph: {
        title: "Under Construction Commercial Projects in Gurgaon | Unisel Realty",
        description: "Explore under-construction commercial projects in Gurgaon. Invest early at pre-completion prices.",
        url: "https://uniselrealty.com/commercial/under-construction",
        siteName: "Unisel Realty",
        images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: "Under construction commercial projects Gurgaon" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Under Construction Commercial Projects in Gurgaon | Unisel Realty",
        description: "Explore under-construction commercial projects in Gurgaon.",
        images: ["/images/properties/og-image.jpg"],
    },
};

const CommercialUnderConstructionPage = () => {
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://uniselrealty.com" },
        { name: "Commercial", url: "https://uniselrealty.com/commercial" },
        { name: "Under Construction", url: "https://uniselrealty.com/commercial/under-construction" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <HeroSub
                title="Under Construction Commercial Projects in Gurgaon."
                description="Invest early in upcoming office spaces, retail, and mixed-use developments."
                badge="Under Construction"
            />
            <PropertiesListing category="commercial" status="under-construction" />
        </>
    );
};

export default CommercialUnderConstructionPage;
