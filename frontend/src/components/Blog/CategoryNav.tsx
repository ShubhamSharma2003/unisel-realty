import Link from "next/link";
import { BLOG_CATEGORIES, categorySlugForTag } from "@/lib/blogCategories";
import { getBlogTags } from "@/lib/sanity.services";

/** Crawlable category links; a category appears once it has a post. */
const CategoryNav = async ({ active }: { active?: string }) => {
    const tags = await getBlogTags();
    const present = new Set(tags.map(categorySlugForTag).filter(Boolean));
    const categories = Object.keys(BLOG_CATEGORIES).filter((slug) => present.has(slug));
    if (!categories.length) return null;

    const pill = (current: boolean) =>
        `inline-block rounded-full px-5 py-2.5 text-sm font-semibold duration-300 ${
            current
                ? "bg-dark text-white dark:bg-white dark:text-dark"
                : "bg-dark/5 text-dark hover:bg-primary hover:text-white dark:bg-white/10 dark:text-white"
        }`;

    return (
        <nav aria-label="News categories" className="container max-w-8xl mx-auto px-5 2xl:px-0 pb-10">
            <ul className="flex flex-wrap gap-3">
                <li>
                    <Link href="/blog" className={pill(!active)} aria-current={!active ? "page" : undefined}>
                        All news
                    </Link>
                </li>
                {categories.map((slug) => (
                    <li key={slug}>
                        <Link
                            href={`/blog/category/${slug}`}
                            className={pill(active === slug)}
                            aria-current={active === slug ? "page" : undefined}
                        >
                            {BLOG_CATEGORIES[slug].label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default CategoryNav;
