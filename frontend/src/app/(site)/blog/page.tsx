import BlogList from "@/components/Blog";
import HeroSub from "@/components/shared/HeroSub";
import { Metadata } from "next";
import { blogListingSchema, breadcrumbSchema } from "@/lib/jsonld";

export async function generateMetadata(): Promise<Metadata> {
    const siteUrl = 'https://uniselrealty.com';
    const siteName = 'Unisel Realty';
    const description = "Expert insights on Gurgaon luxury real estate, NRI property investment, and market trends from Unisel Realty's advisory team.";

    return {
        title: `Real Estate Blog | ${siteName}`,
        description,
        keywords: ["real estate blog", "property insights gurgaon", "market updates", "unisel realty blog"],
        alternates: { canonical: `${siteUrl}/blog` },
        openGraph: {
            title: `Real Estate Blog | ${siteName}`,
            description,
            url: `${siteUrl}/blog`,
            siteName,
            images: [{ url: "/images/blog/og-image.jpg", width: 1200, height: 630, alt: "Unisel Realty real estate blog" }],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Real Estate Blog | ${siteName}`,
            description,
            images: ["/images/blog/og-image.jpg"],
        },
    };
}

const BlogPage = async () => {
    const schema = blogListingSchema();
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://uniselrealty.com" },
        { name: "Blog", url: "https://uniselrealty.com/blog" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <HeroSub
                title="Real estate insights."
                description="Stay ahead in the property market with expert advice and updates."
                badge="Blog"
            />
            <BlogList />
        </>
    );
};

export default BlogPage;
