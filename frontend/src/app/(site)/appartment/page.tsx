import { Metadata } from "next";
import ServicePageContent from "@/components/Properties/ServicePageContent";

export const metadata: Metadata = {
    title: "Apartments | Homely",
    description: "Discover premium apartments for rent and sale. Find your perfect urban living space with Homely's curated apartment listings.",
    keywords: ["apartments", "rent", "sale", "urban living", "property", "homely"],
    openGraph: {
        title: "Premium Apartments | Homely",
        description: "Discover premium apartments for rent and sale. Find your perfect urban living space with Homely's curated apartment listings.",
        url: "/appartment",
        siteName: "Homely",
        images: [
            {
                url: "/images/properties/apartment-og.jpg",
                width: 1200,
                height: 630,
                alt: "Homely premium apartments",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Premium Apartments | Homely",
        description: "Discover premium apartments for rent and sale. Find your perfect urban living space with Homely's curated apartment listings.",
        images: ["/images/properties/apartment-og.jpg"],
    },
};

const page = () => {
    return <ServicePageContent slug="appartment" />;
};

export default page;