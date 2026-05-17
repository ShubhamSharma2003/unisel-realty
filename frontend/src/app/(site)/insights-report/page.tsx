import { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/jsonld";
import InsightsReportClient from "@/components/InsightsReport/InsightsReportClient";

export const metadata: Metadata = {
    title: "Gurgaon Investment Report — 3 Projects That Could Double Your Wealth",
    description:
        "Exclusive investor intelligence on three pre-launch Gurgaon projects with 2× return profiles. Curated by Unisel Realty — 19 years, ₹900Cr+ transacted.",
    keywords: [
        "gurgaon investment report",
        "gurgaon pre-launch projects",
        "luxury investment gurgaon",
        "unisel investment brief",
        "NRI gurgaon real estate",
        "dwarka expressway investment",
        "golf course road investment",
    ],
    alternates: { canonical: "https://www.uniselrealty.com/insights-report" },
    openGraph: {
        title: "Gurgaon Investment Report — 3 Projects That Could 2× Your Wealth",
        description:
            "Pre-launch advisory window. Three projects across Dwarka Expressway and Golf Course Road. Detailed return modelling by Unisel Realty.",
        url: "https://www.uniselrealty.com/insights-report",
        siteName: "Unisel Realty",
        locale: "en_US",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gurgaon Investment Report | Unisel Realty",
        description: "3 pre-launch projects · 2× return profile · Free advisory brief.",
    },
};

export default function InsightsReportPage() {
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://www.uniselrealty.com" },
        { name: "Insights Report", url: "https://www.uniselrealty.com/insights-report" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <InsightsReportClient />
        </>
    );
}
