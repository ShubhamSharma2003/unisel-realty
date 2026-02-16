import { Metadata } from "next";
import ServicePageContent from "@/components/Properties/ServicePageContent";

export const metadata: Metadata = {
    title: "Residential Homes | Homely",
    description: "Find your dream residential home for sale or rent. Browse through our collection of family homes and residential properties.",
    keywords: ["residential homes", "family homes", "sale", "rent", "property", "homely"],
    openGraph: {
        title: "Residential Homes | Homely",
        description: "Find your dream residential home for sale or rent. Browse through our collection of family homes and residential properties.",
        url: "/residential-homes",
        siteName: "Homely",
        images: [
            {
                url: "/images/properties/residential-og.jpg",
                width: 1200,
                height: 630,
                alt: "Homely residential homes",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Residential Homes | Homely",
        description: "Find your dream residential home for sale or rent. Browse through our collection of family homes and residential properties.",
        images: ["/images/properties/residential-og.jpg"],
    },
};

const page = () => {
    return <ServicePageContent slug="residential-homes" />;
};

export default page;