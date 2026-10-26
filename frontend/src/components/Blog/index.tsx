import React from 'react';
import BlogCard from '@/components/shared/Blog/blogCard';
import type { Blog } from '@/types/blog';
import { getBlogPosts } from '@/lib/sanity.services';

/** Renders `posts` when given (e.g. one category), otherwise every post. */
const BlogList = async ({ posts }: { posts?: Blog[] }) => {
    const list = posts ?? await getBlogPosts();

    return (
        <section className='pt-0!'>
            <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {list.map((blog, i) => (
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
