import type { Metadata } from "next";
import { getPropertiesByCategoryAndStatus } from "@/lib/sanity.services";

/**
 * A status listing page with no inventory renders a "No properties found"
 * shell. Those were indexable, which puts thin pages in front of searchers.
 *
 * Keep them crawlable (follow) but out of the index until they have stock.
 * The Sanity revalidate webhook re-runs this, so a page flips back to
 * indexable on its own once a property is published into it.
 */
export async function withEmptyListingRobots(
  base: Metadata,
  category: string,
  status: string
): Promise<Metadata> {
  try {
    const properties = await getPropertiesByCategoryAndStatus(category, status);

    // New launches must be RERA-approved before they can be advertised,
    // so the listing filters them the same way the page body does.
    const count =
      status === "new-launch"
        ? properties.filter((p) => p.reraApproved === true).length
        : properties.length;

    if (count === 0) {
      return { ...base, robots: { index: false, follow: true } };
    }
  } catch {
    // A CMS hiccup should not silently deindex a stocked page.
  }
  return base;
}
