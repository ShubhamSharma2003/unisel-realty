import HeroSub from "@/components/shared/HeroSub";
import PropertiesListingByMicromarket from "@/components/Properties/PropertyListByMicromarket";
import { Metadata } from "next";
import { breadcrumbSchema, locationPageSchema } from "@/lib/jsonld";
import { notFound } from "next/navigation";

const MICROMARKETS: Record<string, { title: string; displayName: string; description: string }> = {
    "golf-course-road": {
        title: "Properties on Golf Course Road, Gurgaon",
        displayName: "Golf Course Road",
        description: "Explore premium residential and commercial properties on Golf Course Road, Gurgaon.",
    },
    "golf-course-extension-road": {
        title: "Properties on Golf Course Extension Road, Gurgaon",
        displayName: "Golf Course Extension Road",
        description: "Explore residential and commercial properties on Golf Course Extension Road, Gurgaon.",
    },
    "dwarka-expressway": {
        title: "Properties on Dwarka Expressway, Gurgaon",
        displayName: "Dwarka Expressway",
        description: "Explore residential and commercial properties on Dwarka Expressway, Gurgaon.",
    },
    "gwal-pahari": {
        title: "Properties in Gwal Pahari, Gurgaon",
        displayName: "Gwal Pahari",
        description: "Explore premium residential and commercial properties in Gwal Pahari, Gurgaon.",
    },
    "sohna-road": {
        title: "Properties on Sohna Road, Gurgaon",
        displayName: "Sohna Road",
        description: "Explore residential and commercial properties on Sohna Road, Gurgaon.",
    },
    "new-gurgaon": {
        title: "Properties in New Gurgaon",
        displayName: "New Gurgaon",
        description: "Explore residential and commercial properties in New Gurgaon (Sectors 73-95).",
    },
};

export async function generateStaticParams() {
    return Object.keys(MICROMARKETS).map((micromarket) => ({ micromarket }));
}

type PageProps = { params: Promise<{ micromarket: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { micromarket } = await params;
    const info = MICROMARKETS[micromarket];
    if (!info) return {};
    return {
        title: `${info.title} | Unisel Realty`,
        description: info.description,
        alternates: { canonical: `https://uniselrealty.com/location/${micromarket}` },
        openGraph: {
            title: `${info.title} | Unisel Realty`,
            description: info.description,
            url: `https://uniselrealty.com/location/${micromarket}`,
            siteName: "Unisel Realty",
            images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: info.title }],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${info.title} | Unisel Realty`,
            description: info.description,
            images: ["/images/properties/og-image.jpg"],
        },
    };
}

const LocationPage = async ({ params }: PageProps) => {
    const { micromarket } = await params;
    const info = MICROMARKETS[micromarket];
    if (!info) notFound();

    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://uniselrealty.com" },
        { name: info.displayName, url: `https://uniselrealty.com/location/${micromarket}` },
    ]);

    const locationSchema = locationPageSchema({
        name: info.title,
        description: info.description,
        micromarket,
    });

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <HeroSub
                title={`${info.title}.`}
                description={info.description}
                badge={info.displayName}
            />
            <PropertiesListingByMicromarket micromarket={micromarket} />
        </>
    );
};

export default LocationPage;
