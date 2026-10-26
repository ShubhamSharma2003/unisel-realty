import BlogList from "@/components/Blog";
import CategoryNav from "@/components/Blog/CategoryNav";
import LatestLaunches from "@/components/Blog/LatestLaunches";
import HeroSub from "@/components/shared/HeroSub";
import { Metadata } from "next";
import { blogListingSchema, breadcrumbSchema } from "@/lib/jsonld";
import { getBlogPosts } from "@/lib/sanity.services";

const siteUrl = 'https://www.uniselrealty.com';
const title = "Gurgaon Real Estate News: New Launches & Market Updates";
const description = "Latest Gurgaon (Gurugram) real estate news: new and upcoming project launches, RERA orders, infrastructure and prices, with analysis for buyers.";

export async function generateMetadata(): Promise<Metadata> {
    const siteName = 'Unisel Realty';

    return {
        title: { absolute: title },
        description,
        keywords: ["gurgaon real estate news", "gurugram property news", "new launch projects gurgaon", "upcoming projects gurgaon", "unisel realty blog"],
        alternates: {
            canonical: `${siteUrl}/blog`,
            types: { "application/rss+xml": `${siteUrl}/blog/feed.xml` },
        },
        openGraph: {
            title,
            description,
            url: `${siteUrl}/blog`,
            siteName,
            images: [{ url: "/blog/opengraph-image", width: 1200, height: 630, alt: "Unisel Realty Gurgaon real estate news" }],
            locale: "en_IN",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/blog/opengraph-image"],
        },
    };
}

const BlogPage = async () => {
    const posts = await getBlogPosts();
    const schema = blogListingSchema({ url: `${siteUrl}/blog`, name: title, description, posts });
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: "https://www.uniselrealty.com" },
        { name: "Blog", url: "https://www.uniselrealty.com/blog" },
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
                title="Gurgaon real estate news."
                description="New launches, RERA updates, infrastructure and market analysis for Gurugram buyers and investors."
                badge="News & Insights"
            />
            <CategoryNav />
            <BlogList posts={posts} />
            <LatestLaunches />
        </>
    );
};

export default BlogPage;
