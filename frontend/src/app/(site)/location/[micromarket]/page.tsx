import HeroSub from "@/components/shared/HeroSub";
import { MICROMARKETS } from "@/lib/micromarkets";
import PropertiesListingByMicromarket from "@/components/Properties/PropertyListByMicromarket";
import { Metadata } from "next";
import { breadcrumbSchema, locationPageSchema } from "@/lib/jsonld";
import { notFound } from "next/navigation";


export async function generateStaticParams() {
    return Object.keys(MICROMARKETS).map((micromarket) => ({ micromarket }));
}

type PageProps = { params: Promise<{ micromarket: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { micromarket } = await params;
    const info = MICROMARKETS[micromarket];
    if (!info) return {};
    return {
        title: info.title,
        description: info.description,
        alternates: { canonical: `https://www.uniselrealty.com/location/${micromarket}` },
        openGraph: {
            title: `${info.title} | Unisel Realty`,
            description: info.description,
            url: `https://www.uniselrealty.com/location/${micromarket}`,
            siteName: "Unisel Realty",
            images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: info.title }],
            locale: "en_IN",
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
        { name: "Home", url: "https://www.uniselrealty.com" },
        { name: info.displayName, url: `https://www.uniselrealty.com/location/${micromarket}` },
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
