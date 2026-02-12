import React from 'react';
import BlogCard from '@/components/shared/Blog/blogCard';
import { Icon } from "@iconify/react";
import Link from 'next/link';
import type { Blog } from '@/types/blog';
import { sanityClient } from '@/lib/sanity.client';
import { blogCardsQuery, blogSectionQuery } from '@/lib/sanity.queries';

const BlogSmall = async () => {
    const section = await sanityClient.fetch(blogSectionQuery);
    const limit = typeof section?.postLimit === "number" ? section.postLimit : 3;
    const posts: Blog[] = await sanityClient.fetch(blogCardsQuery, { limit });

    const badge = section?.badge || "Blog";
    const title = section?.title || "Real estate insights";
    const subtitle =
        section?.subtitle ||
        "Stay ahead in the property market with expert advice and updates";
    const ctaText = section?.ctaText || "Read all articles";
    const ctaLink = section?.ctaLink || "/blogs";

    return (
        <section>
            <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                <div className='flex justify-between md:items-end items-start mb-10 md:flex-row flex-col'>
                    <div>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" aria-label="Home icon" />
                            {badge}
                        </p>
                        <h2 className="lg:text-52 text-40 font-medium dark:text-white">
                            {title}
                        </h2>
                        <p className='text-dark/50 dark:text-white/50 text-xm'>
                            {subtitle}
                        </p>
                    </div>
                    <Link href={ctaLink} className='bg-dark dark:bg-white text-white dark:text-dark py-4 px-8 rounded-full hover:bg-primary duration-300' aria-label="Read all blog articles">
                        {ctaText}
                    </Link>
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-12">
                    {posts.map((blog, i) => (
                        <div key={i} className="w-full">
                            <BlogCard blog={blog} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BlogSmall;
