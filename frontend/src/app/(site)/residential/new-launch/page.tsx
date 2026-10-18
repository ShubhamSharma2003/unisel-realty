import HeroSub from "@/components/shared/HeroSub";
import Link from "next/link";
import PropertiesListing from "@/components/Properties/PropertyList";
import { Metadata } from "next";
import { withEmptyListingRobots } from "@/lib/listingMetadata";
import { breadcrumbSchema } from "@/lib/jsonld";

const baseMetadata: Metadata = {
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
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "New Launch Projects in Gurgaon 2026 | Unisel Realty",
        description: "Explore the latest new launch residential projects in Gurgaon.",
        images: ["/images/properties/og-image.jpg"],
    },
};

// Deindex while this status has no inventory (see listingMetadata).
export const generateMetadata = (): Promise<Metadata> =>
    withEmptyListingRobots(baseMetadata, "residential", "new-launch");

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
            <section className="container mx-auto max-w-8xl px-5 2xl:px-0 pb-16">
                <p className="text-base text-dark/70 dark:text-white/70 max-w-3xl">
                    Pre-launch allocations often close before a project is
                    publicly advertised. Our{" "}
                    <Link
                        href="/insights-report"
                        className="text-primary underline underline-offset-4"
                    >
                        Gurgaon pre-launch investor report
                    </Link>{" "}
                    covers the projects we are currently tracking, with RERA
                    status and expected possession.
                </p>
            </section>
        </>
    );
};

export default NewLaunchPage;
