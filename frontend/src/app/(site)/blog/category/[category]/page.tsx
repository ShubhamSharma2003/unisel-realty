import BlogList from "@/components/Blog";
import CategoryNav from "@/components/Blog/CategoryNav";
import LatestLaunches from "@/components/Blog/LatestLaunches";
import HeroSub from "@/components/shared/HeroSub";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_CATEGORIES, MIN_POSTS_TO_INDEX } from "@/lib/blogCategories";
import { blogListingSchema, breadcrumbSchema } from "@/lib/jsonld";
import { getBlogPostsByTag } from "@/lib/sanity.services";

const siteUrl = "https://www.uniselrealty.com";

type PageProps = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
    return Object.keys(BLOG_CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params;
    const info = BLOG_CATEGORIES[category];
    if (!info) return {};

    const posts = await getBlogPostsByTag(info.tag);
    const url = `${siteUrl}/blog/category/${category}`;

    return {
        title: info.title,
        description: info.description,
        alternates: { canonical: url },
        // Thin until a few posts exist: crawlable, but kept out of the index.
        ...(posts.length < MIN_POSTS_TO_INDEX ? { robots: { index: false, follow: true } } : {}),
        openGraph: {
            title: `${info.title} | Unisel Realty`,
            description: info.description,
            url,
            siteName: "Unisel Realty",
            images: [{ url: "/blog/opengraph-image", width: 1200, height: 630, alt: info.title }],
            locale: "en_IN",
            type: "website",
        },
    };
}

const BlogCategoryPage = async ({ params }: PageProps) => {
    const { category } = await params;
    const info = BLOG_CATEGORIES[category];
    if (!info) notFound();

    const posts = await getBlogPostsByTag(info.tag);
    if (!posts.length) notFound();

    const url = `${siteUrl}/blog/category/${category}`;
    const schema = blogListingSchema({ url, name: info.title, description: info.description, posts });
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: siteUrl },
        { name: "Blog", url: `${siteUrl}/blog` },
        { name: info.label, url },
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
            <HeroSub title={`${info.title}.`} description={info.description} badge={info.label} />
            <CategoryNav active={category} />
            <BlogList posts={posts} />
            <LatestLaunches />
        </>
    );
};

export default BlogCategoryPage;
