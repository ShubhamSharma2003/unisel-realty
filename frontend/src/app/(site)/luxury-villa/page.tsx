import { Metadata } from "next";
import ServicePageContent from "@/components/Properties/ServicePageContent";

export const metadata: Metadata = {
    title: "Luxury Villas | Homely",
    description: "Explore exclusive luxury villas for sale. Experience opulent living with premium amenities and stunning architecture.",
    keywords: ["luxury villas", "premium properties", "sale", "opulent living", "homely"],
    openGraph: {
        title: "Luxury Villas for Sale | Homely",
        description: "Explore exclusive luxury villas for sale. Experience opulent living with premium amenities and stunning architecture.",
        url: "/luxury-villa",
        siteName: "Homely",
        images: [
            {
                url: "/images/properties/luxury-villa-og.jpg",
                width: 1200,
                height: 630,
                alt: "Homely luxury villas",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Luxury Villas for Sale | Homely",
        description: "Explore exclusive luxury villas for sale. Experience opulent living with premium amenities and stunning architecture.",
        images: ["/images/properties/luxury-villa-og.jpg"],
    },
};

const page = () => {
    return <ServicePageContent slug="luxury-villa" />;
};

export default page;