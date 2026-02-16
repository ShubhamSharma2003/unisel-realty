import BlogList from "@/components/Blog";
import HeroSub from "@/components/shared/HeroSub";
import { Metadata } from "next";
import { getBlogCount } from "@/lib/sanity.services";

export async function generateMetadata(): Promise<Metadata> {
    const blogCount = await getBlogCount();
    const siteUrl = 'https://uniselrealty.com';
    const siteName = 'Unisel Realty';

    const title = `Blog Grids | ${siteName}`;
    const description = `Stay ahead in the property market with expert advice and updates. Read our ${blogCount} insightful blog posts.`;

    return {
        title,
        description,
        keywords: ["real estate", "blog", "property insights", "market updates", "homely"],
        openGraph: {
            title: `Real Estate Insights | ${siteName} Blog`,
            description,
            url: `${siteUrl}/blogs`,
            siteName,
            images: [
                {
                    url: "/images/blog/og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Homely real estate blog",
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Real Estate Insights | ${siteName} Blog`,
            description,
            images: ["/images/blog/og-image.jpg"],
        },
    };
}

const Blog = () => {
    return (
        <>
            <HeroSub
                title="Real estate insights."
                description="Stay ahead in the property market with expert advice and updates."
                badge="Blog"
            />
            <BlogList />
        </>
    );
};

export default Blog;
