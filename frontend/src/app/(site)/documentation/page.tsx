
import { Documentation } from "@/components/Documentation/Documentation";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Features | Unisel Realty",
    description: "Explore Unisel Realty's comprehensive features and documentation for real estate management, property listings, and user experience.",
    keywords: ["features", "documentation", "unisel realty", "real estate", "property management"],
    openGraph: {
        title: "Unisel Realty Features & Documentation",
        description: "Explore Unisel Realty's comprehensive features and documentation for real estate management, property listings, and user experience.",
        url: "/documentation",
        siteName: "Unisel Realty",
        images: [
            {
                url: "/images/documentation/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Unisel Realty features documentation",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Unisel Realty Features & Documentation",
        description: "Explore Unisel Realty's comprehensive features and documentation for real estate management, property listings, and user experience.",
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
