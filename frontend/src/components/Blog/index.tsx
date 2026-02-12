import React from 'react';
import BlogCard from '@/components/shared/Blog/blogCard';
import type { Blog } from '@/types/blog';
import { sanityClient } from '@/lib/sanity.client';
import { blogListQuery } from '@/lib/sanity.queries';

const BlogList = async () => {
    const posts: Blog[] = await sanityClient.fetch(blogListQuery);

    return (
        <section className='pt-0!'>
            <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
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

export default BlogList;
