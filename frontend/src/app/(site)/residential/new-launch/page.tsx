import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
    title: "New Launch Projects in Gurgaon 2026",
    description: "Explore the latest new launch residential projects in Gurgaon. Pre-launch offers, RERA-approved projects by top developers like DLF, Sobha, M3M, and more.",
    keywords: ["new launch projects gurgaon", "new residential projects 2026", "pre-launch properties gurgaon", "DLF new launch", "unisel realty"],
    alternates: { canonical: "https://www.uniselrealty.com/residential/new-launch" },
    openGraph: {
        title: "New Launch Projects in Gurgaon 2026 | Unisel Realty",
        description: "Explore the latest new launch residential projects in Gurgaon. Pre-launch offers, RERA-approved projects by top developers.",
        url: "https://www.uniselrealty.com/residential/new-launch",
        siteName: "Unisel Realty",
        images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: "New launch projects Gurgaon 2026" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "New Launch Projects in Gurgaon 2026 | Unisel Realty",
        description: "Explore the latest new launch residential projects in Gurgaon.",
        images: ["/images/properties/og-image.jpg"],
    },
};

const NewLaunchPage = () => {
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://www.uniselrealty.com" },
        { name: "Residential", url: "https://www.uniselrealty.com/residential" },
        { name: "New Launch", url: "https://www.uniselrealty.com/residential/new-launch" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <HeroSub
                title="New Launch Projects in Gurgaon."
                description="Pre-launch offers and RERA-approved projects by top developers."
                badge="New Launch"
            />
            <PropertiesListing category="residential" status="new-launch" />
        </>
    );
};

export default NewLaunchPage;
