import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Icon } from '@iconify/react'
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "@/lib/sanity.client";
import { blogPostBySlugQuery, blogSlugsQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.image";
import { blogArticleSchema, breadcrumbSchema } from "@/lib/jsonld";
import { categorySlugForTag } from "@/lib/blogCategories";
import { MICROMARKETS } from "@/lib/micromarkets";
import {
    getAdvertisableNewLaunches,
    getMoreBlogPosts,
    getPropertiesByMicromarket,
    getPropertiesBySlugs,
} from "@/lib/sanity.services";
import PropertyCard from "@/components/Home/Properties/Card/Card";
import BlogCard from "@/components/shared/Blog/blogCard";

export const dynamic = 'force-dynamic';

const siteUrl = "https://www.uniselrealty.com";

type PostText = {
    title?: string;
    excerpt?: string;
    content?: { _type?: string; style?: string; listItem?: string; children?: { text?: string }[] }[];
};

/**
 * Meta description: the excerpt, unless it is missing or too short to describe
 * anything (one post's excerpt is "Market "), in which case the opening paragraphs.
 */
function postDescription(post: PostText): string {
    if (post.excerpt && post.excerpt.trim().length >= 70) return post.excerpt.trim();
    const text = (post.content ?? [])
        .filter((block) => block._type === "block" && block.style === "normal" && !block.listItem)
        .map((block) => (block.children ?? []).map((child) => child.text ?? "").join(""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
    if (!text) return `Read ${post.title} on Unisel Realty Blog.`;
    return text.length <= 160 ? text : `${text.slice(0, text.lastIndexOf(" ", 157))}…`;
}

/**
 * Projects to show under a post: ones the post links to first, then others in
 * the micromarket it links to, then the newest launches. This is the main
 * path from news posts to the listings people search for.
 */
async function relatedProjects(content: { markDefs?: { href?: string }[] }[] | undefined, limit = 3) {
    const hrefs = (content ?? [])
        .flatMap((block) => block.markDefs ?? [])
        .map((def) => def.href)
        .filter((href): href is string => typeof href === "string");
    const linked = (prefix: string) =>
        [...new Set(hrefs.map((href) => href.match(new RegExp(`^${prefix}/([^/?#]+)`))?.[1]).filter((s): s is string => !!s))];
    const slugs = linked("/properties");
    const markets = linked("/location").filter((m) => MICROMARKETS[m]);

    const [mentioned, nearby, launches] = await Promise.all([
        slugs.length ? getPropertiesBySlugs(slugs) : [],
        markets.length ? getPropertiesByMicromarket(markets[0]) : [],
        getAdvertisableNewLaunches(),
    ]);

    const seen = new Set<string>();
    return [...mentioned, ...nearby, ...launches]
        // Unregistered launches can't be advertised (RERA Act 2016, s.3).
        .filter((p) => p.status !== "new-launch" || p.reraApproved)
        .filter((p) => !seen.has(p.slug) && !!seen.add(p.slug))
        .slice(0, limit);
}

const portableTextComponents = {
    types: {
        image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string } }) => {
            if (!value?.asset?._ref) return null;
            const imageUrl = urlFor(value).width(1200).height(800).fit("max").url();
            return (
                <Image
                    src={imageUrl}
                    alt={value?.alt || "Post image"}
                    width={1200}
                    height={800}
                    className="my-8 w-full rounded-2xl"
                    quality={100}
                />
            );
        },
    },
};

export async function generateStaticParams() {
    const slugs = await sanityClient.fetch<{ slug: string }[]>(blogSlugsQuery);
    return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await sanityClient.fetch(blogPostBySlugQuery, { slug });

    if (!post) {
        return {
            title: "Not Found",
            description: "No blog article has been found",
            robots: { index: false, follow: false },
        };
    }

    const coverImageUrl = post.coverImage
        ? urlFor(post.coverImage).width(1200).height(630).fit("crop").format("jpg").quality(80).url()
        : null;

    return {
        // Long headlines skip the "| Unisel Realty" suffix so results don't cut the headline off.
        title: post.title && post.title.length > 55 ? { absolute: post.title } : post.title,
        description: postDescription(post),
        keywords: post.tag ? [post.tag, "real estate", "gurgaon", "unisel realty"] : undefined,
        alternates: {
            canonical: `${siteUrl}/blog/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: postDescription(post),
            url: `${siteUrl}/blog/${slug}`,
            type: "article",
            publishedTime: post.date || undefined,
            authors: [post.author || "Unisel Realty"],
            images: coverImageUrl
                ? [{ url: coverImageUrl, width: 1200, height: 630, alt: post.title }]
                : undefined,
        },
        twitter: {
            card: "summary_large_image" as const,
            title: post.title,
            description: postDescription(post),
            images: coverImageUrl ? [coverImageUrl] : undefined,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large" as const,
                "max-snippet": -1,
            },
        },
    };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await sanityClient.fetch(blogPostBySlugQuery, { slug });
    if (!post) notFound();

    const [projects, morePosts] = await Promise.all([relatedProjects(post.content), getMoreBlogPosts(slug, 3)]);
    const categorySlug = categorySlugForTag(post.tag);
    // Sanity bumps _updatedAt on any save, so only show edits made a day or more after publishing.
    const showUpdated =
        post.date && post.updatedAt &&
        new Date(post.updatedAt).getTime() - new Date(post.date).getTime() > 24 * 60 * 60 * 1000;

    const coverImageUrl = post?.coverImage
        ? urlFor(post.coverImage).width(1500).height(980).fit("crop").url()
        : null;
    const authorImageUrl = post?.authorImage
        ? urlFor(post.authorImage).width(96).height(96).fit("crop").url()
        : null;

    const schema = blogArticleSchema({
        title: post.title ?? "",
        slug: post.slug ?? slug,
        excerpt: postDescription(post),
        date: post.date,
        updatedAt: post.updatedAt,
        author: post.author,
        coverImageUrl,
        tag: post.tag,
    });

    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: siteUrl },
        { name: "Blog", url: `${siteUrl}/blog` },
        { name: post.title ?? "Article", url: `${siteUrl}/blog/${slug}` },
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
            <section className="relative !pt-44 pb-0!">
                <div className="container max-w-8xl mx-auto md:px-0 px-4">
                    <div>
                        <div>
                            <Link href="/blog" className="flex items-center gap-3 text-white bg-primary py-3 px-4 rounded-full w-fit hover:bg-dark duration-300">
                                <Icon icon={'ph:arrow-left'} width={20} height={20} />
                                <span>Go Back</span>
                            </Link>
                            <h1 className="text-dark dark:text-white md:text-52 text-2xl leading-[1.2] font-semibold pt-7">{post?.title}</h1>
                            <h6 className="text-xm mt-5 text-dark dark:text-white">{post?.detail}</h6>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mt-5">
                            <div className="flex items-center gap-3">
                                {authorImageUrl ? (
                                    <Image src={authorImageUrl} alt={post?.author || "Author"} className="bg-no-repeat bg-contain inline-block rounded-full !w-10 !h-10" width={40} height={40} quality={100} />
                                ) : null}
                                <span className="text-sm text-dark dark:text-white font-medium">{post?.author}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <Icon icon={'ph:clock'} width={16} height={16} />
                                    <span className="text-sm text-dark font-medium dark:text-white">
                                        {post?.date ? format(new Date(post.date), "MMM dd, yyyy") : ""}
                                        {showUpdated ? ` · Updated ${format(new Date(post.updatedAt), "MMM dd, yyyy")}` : ""}
                                    </span>
                                </div>
                                <span className="text-dark/30 dark:text-white/30">|</span>
                                {categorySlug ? (
                                    <Link href={`/blog/category/${categorySlug}`} className="py-1.5 px-4 bg-dark/5 rounded-full dark:bg-white/15 hover:bg-primary/15 duration-300">
                                        <span className="text-xs font-semibold text-dark dark:text-white">{post?.tag}</span>
                                    </Link>
                                ) : (
                                    <div className="py-1.5 px-4 bg-dark/5 rounded-full dark:bg-white/15">
                                        <p className="text-xs font-semibold text-dark dark:text-white">{post?.tag}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="z-20 mt-12 overflow-hidden rounded">
                        {coverImageUrl ? (
                            <Image src={coverImageUrl} alt={post?.title || "Cover image"} width={1170} height={766} quality={100} className="h-full w-full object-cover object-center rounded-3xl" />
                        ) : null}
                    </div>
                </div>
            </section>
            <section className="pt-12!">
                <div className="container max-w-8xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center">
                        <div className="blog-details markdown xl:pr-10">
                            <PortableText value={post?.content || []} components={portableTextComponents} />
                        </div>
                    </div>
                </div>
            </section>
            {projects.length > 0 && (
                <section>
                    <div className="container max-w-8xl mx-auto px-4">
                        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                            <h2 className="text-dark dark:text-white text-3xl md:text-40 font-semibold">Explore related projects</h2>
                            <Link href="/residential/new-launch" className="text-primary underline underline-offset-4">
                                All new launch projects in Gurgaon
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {projects.map((item) => (
                                <PropertyCard key={item._id} item={item} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
            {morePosts.length > 0 && (
                <section>
                    <div className="container max-w-8xl mx-auto px-4">
                        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                            <h2 className="text-dark dark:text-white text-3xl md:text-40 font-semibold">More Gurgaon real estate news</h2>
                            <Link href="/blog" className="text-primary underline underline-offset-4">
                                All news
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {morePosts.map((item) => (
                                <BlogCard key={item._id} blog={item} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
