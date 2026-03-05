import BlogList from "@/components/Blog";
import HeroSub from "@/components/shared/HeroSub";
import { Metadata } from "next";
import { getBlogCount } from "@/lib/sanity.services";
import { blogListingSchema, breadcrumbSchema } from "@/lib/jsonld";

export async function generateMetadata(): Promise<Metadata> {
    const blogCount = await getBlogCount();
    const siteUrl = 'https://uniselrealty.com';
    const siteName = 'Unisel Realty';
    const description = `Stay ahead in the property market with expert advice and updates. Read our ${blogCount} insightful blog posts.`;

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
    const blogCount = await getBlogCount();
    const schema = blogListingSchema(blogCount);
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
