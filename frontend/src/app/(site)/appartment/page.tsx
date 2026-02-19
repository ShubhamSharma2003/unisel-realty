import { Metadata } from "next";
import ServicePageContent from "@/components/Properties/ServicePageContent";

export const metadata: Metadata = {
    title: "Apartments | Unisel Realty",
    description: "Discover premium apartments for rent and sale. Find your perfect urban living space with Unisel Realty's curated apartment listings.",
    keywords: ["apartments", "rent", "sale", "urban living", "property", "unisel realty"],
    openGraph: {
        title: "Premium Apartments | Unisel Realty",
        description: "Discover premium apartments for rent and sale. Find your perfect urban living space with Unisel Realty's curated apartment listings.",
        url: "/appartment",
        siteName: "Unisel Realty",
        images: [
            {
                url: "/images/properties/apartment-og.jpg",
                width: 1200,
                height: 630,
                alt: "Unisel Realty premium apartments",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Premium Apartments | Unisel Realty",
        description: "Discover premium apartments for rent and sale. Find your perfect urban living space with Unisel Realty's curated apartment listings.",
        images: ["/images/properties/apartment-og.jpg"],
    },
};

const page = () => {
    return <ServicePageContent slug="appartment" />;
};

export default page;