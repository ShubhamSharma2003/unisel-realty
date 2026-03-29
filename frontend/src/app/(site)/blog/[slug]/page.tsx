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

export const dynamic = 'force-dynamic';

const siteUrl = "https://uniselrealty.com";

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
        ? urlFor(post.coverImage).width(1200).height(630).fit("crop").url()
        : null;

    return {
        title: post.title,
        description: post.excerpt || `Read ${post.title} on Unisel Realty Blog.`,
        keywords: post.tag ? [post.tag, "real estate", "gurgaon", "unisel realty"] : undefined,
        alternates: {
            canonical: `${siteUrl}/blog/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt || `Read ${post.title} on Unisel Realty Blog.`,
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
            description: post.excerpt || `Read ${post.title} on Unisel Realty Blog.`,
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

    const coverImageUrl = post?.coverImage
        ? urlFor(post.coverImage).width(1500).height(980).fit("crop").url()
        : null;
    const authorImageUrl = post?.authorImage
        ? urlFor(post.authorImage).width(96).height(96).fit("crop").url()
        : null;

    const schema = blogArticleSchema({
        title: post.title ?? "",
        slug: post.slug ?? slug,
        excerpt: post.excerpt,
        date: post.date,
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
                            <h1 className="text-dark dark:text-white md:text-52 text-40 leading-[1.2] font-semibold pt-7">{post?.title}</h1>
                            <h6 className="text-xm mt-5 text-dark dark:text-white">{post?.detail}</h6>
                        </div>
                        <div className="flex items-center justify-between gap-6 mt-12">
                            <div className="flex items-center gap-4">
                                {authorImageUrl ? (
                                    <Image src={authorImageUrl} alt={post?.author || "Author"} className="bg-no-repeat bg-contain inline-block rounded-full !w-12 !h-12" width={48} height={48} quality={100} />
                                ) : null}
                                <div>
                                    <span className="text-xm text-dark dark:text-white">{post?.author}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-7">
                                <div className="flex items-center gap-4">
                                    <Icon icon={'ph:clock'} width={20} height={20} />
                                    <span className="text-base text-dark font-medium dark:text-white">
                                        {post?.date ? format(new Date(post.date), "MMM dd, yyyy") : ""}
                                    </span>
                                </div>
                                <div className="py-2.5 px-5 bg-dark/5 rounded-full dark:bg-white/15">
                                    <p className="text-sm font-semibold text-dark dark:text-white">{post?.tag}</p>
                                </div>
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
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="blog-details markdown xl:pr-10">
                            <PortableText value={post?.content || []} components={portableTextComponents} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
