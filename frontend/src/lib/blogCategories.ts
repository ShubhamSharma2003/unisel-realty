/**
 * Blog categories, keyed by their URL slug (/blog/category/{slug}).
 *
 * `tag` is the exact value stored on Sanity posts. The auto-blog script
 * (scripts/auto-blog/openai.mjs, TAGS) writes the same values, so keep the two
 * lists in step when adding a category.
 */
export const BLOG_CATEGORIES: Record<
  string,
  { tag: string; label: string; title: string; description: string }
> = {
  launches: {
    tag: "Launches",
    label: "New Launches",
    title: "New Project Launches in Gurgaon: Latest News",
    description:
      "News on new launch and upcoming residential projects in Gurgaon (Gurugram): HARERA registrations, launch prices and what buyers should check.",
  },
  market: {
    tag: "Market",
    label: "Market",
    title: "Gurgaon Property Market News & Analysis",
    description:
      "Gurgaon property prices, sales data and demand trends, with analysis of what they mean for home buyers and investors.",
  },
  policy: {
    tag: "Policy",
    label: "Policy & RERA",
    title: "Gurgaon Real Estate Policy & RERA News",
    description:
      "HARERA orders, Haryana housing policy, stamp duty, circle rates and tax changes that affect property buyers in Gurgaon.",
  },
  infrastructure: {
    tag: "Infrastructure",
    label: "Infrastructure",
    title: "Gurgaon Infrastructure News: Metro, Roads & Expressways",
    description:
      "Metro, expressway and road projects in Gurgaon, and how they change connectivity and demand in each micromarket.",
  },
  legal: {
    tag: "Legal",
    label: "Legal",
    title: "Gurgaon Real Estate Legal & Court Updates",
    description:
      "Court rulings and legal disputes that affect property titles, project approvals and homebuyer rights in Gurgaon.",
  },
  nri: {
    tag: "NRI",
    label: "NRI",
    title: "NRI Property News for Gurgaon Investors",
    description:
      "Rules, tax changes and market news for NRIs buying, selling or renting out property in Gurgaon.",
  },
};

/** Category pages with fewer posts than this stay out of the index. */
export const MIN_POSTS_TO_INDEX = 3;

export const categorySlugForTag = (tag?: string) =>
  Object.keys(BLOG_CATEGORIES).find(
    (slug) => BLOG_CATEGORIES[slug].tag.toLowerCase() === tag?.toLowerCase()
  );
