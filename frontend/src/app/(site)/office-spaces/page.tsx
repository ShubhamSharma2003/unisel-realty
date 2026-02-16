import { Metadata } from "next";
import ServicePageContent from "@/components/Properties/ServicePageContent";

export const metadata: Metadata = {
    title: "Office Spaces | Homely",
    description: "Discover premium office spaces for lease. Find the perfect commercial workspace for your business needs.",
    keywords: ["office spaces", "commercial", "lease", "workspace", "business", "homely"],
    openGraph: {
        title: "Office Spaces for Lease | Homely",
        description: "Discover premium office spaces for lease. Find the perfect commercial workspace for your business needs.",
        url: "/office-spaces",
        siteName: "Homely",
        images: [
            {
                url: "/images/properties/office-og.jpg",
                width: 1200,
                height: 630,
                alt: "Homely office spaces",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Office Spaces for Lease | Homely",
        description: "Discover premium office spaces for lease. Find the perfect commercial workspace for your business needs.",
        images: ["/images/properties/office-og.jpg"],
    },
};

const page = () => {
    return <ServicePageContent slug="office-spaces" />;
};

export default page;