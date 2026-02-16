
import { Documentation } from "@/components/Documentation/Documentation";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Features | Homely",
    description: "Explore Homely's comprehensive features and documentation for real estate management, property listings, and user experience.",
    keywords: ["features", "documentation", "homely", "real estate", "property management"],
    openGraph: {
        title: "Homely Features & Documentation",
        description: "Explore Homely's comprehensive features and documentation for real estate management, property listings, and user experience.",
        url: "/documentation",
        siteName: "Homely",
        images: [
            {
                url: "/images/documentation/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Homely features documentation",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Homely Features & Documentation",
        description: "Explore Homely's comprehensive features and documentation for real estate management, property listings, and user experience.",
        images: ["/images/documentation/og-image.jpg"],
    },
};

export default function Page() {
    return (
        <>
        <Documentation/>
        </>
    );
};
