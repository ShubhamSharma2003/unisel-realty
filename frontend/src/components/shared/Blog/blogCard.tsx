import React, { FC } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.image";

const BlogCard: FC<{ blog: Blog }> = ({ blog }) => {
    const { title, coverImage, date, slug, tag } = blog;
    const coverImageUrl = coverImage
        ? urlFor(coverImage).width(800).height(600).fit("crop").url()
        : null;
    const href = slug ? `/blogs/${slug}` : "/blogs";
    return (
        <Link href={href} aria-label="blog cover 5xl:h-full 5xl:inline-block" className="gap-4 group">
            <div className="overflow-hidden rounded-2xl flex-shrink-0">
                {coverImageUrl ? (
                    <Image
                        src={coverImageUrl}
                        alt={title || "Blog cover"}
                        className="transition group-hover:scale-110"
                        width={190}
                        height={163}
                        style={{ width: "100%", height: "100%" }}
                    />
                ) : (
                    <div className="aspect-[4/3] w-full bg-dark/5 dark:bg-white/10" />
                )}
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="mt-2 text-xl font-medium text-dark dark:text-white group-hover:text-primary">
                        {title}
                    </h3>
                    <span className="text-base font-medium dark:text-white/50 text-dark/50 leading-loose">
                        {date ? format(new Date(date), "MMM dd, yyyy") : ""}
                    </span>
                </div>
                <div className="py-2.5 px-5 bg-dark/5 rounded-full dark:bg-white/15">
                    <p className="text-sm font-semibold text-dark dark:text-white">{tag}</p>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
