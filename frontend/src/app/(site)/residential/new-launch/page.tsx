import HeroSub from "@/components/shared/HeroSub";
import Link from "next/link";
import { format } from "date-fns";
import PropertiesListing from "@/components/Properties/PropertyList";
import ProjectComparisonTable from "@/components/Properties/ProjectComparisonTable";
import BlogCard from "@/components/shared/Blog/blogCard";
import { Metadata } from "next";
import { withEmptyListingRobots } from "@/lib/listingMetadata";
import {
    breadcrumbSchema,
    faqPageSchema,
    parseInrPrice,
    propertyCollectionSchema,
    propertyItemListSchema,
} from "@/lib/jsonld";
import { MICROMARKETS } from "@/lib/micromarkets";
import { getAdvertisableNewLaunches, getBlogPosts, getBlogPostsByTag } from "@/lib/sanity.services";

const PAGE_URL = "https://www.uniselrealty.com/residential/new-launch";

// Searchers include the month ("new launch projects in gurgaon october
// 2026"), so re-render daily to keep it current even when no property changes.
export const revalidate = 86400;

const monthLabel = () => format(new Date(), "MMMM yyyy");

const inCrore = (inr: number) =>
    inr >= 1e7 ? `₹${+(inr / 1e7).toFixed(2)} Cr` : `₹${+(inr / 1e5).toFixed(1)} Lakh`;

const listJoin = (items: string[]) =>
    items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items.at(-1)}` : items.join("");

export async function generateMetadata(): Promise<Metadata> {
    const month = monthLabel();
    const title = `New Launch & Upcoming Projects in Gurgaon (${month})`;
    const description = `RERA-registered new launch and upcoming projects in Gurgaon for ${month}, with prices, BHK options, locations and HARERA numbers.`;

    // Deindex while this status has no inventory (see listingMetadata).
    return withEmptyListingRobots(
        {
            // Absolute: the "| Unisel Realty" suffix would push the month out of view in results.
            title: { absolute: title },
            description,
            keywords: [
                "new launch projects in gurgaon",
                "upcoming projects in gurgaon",
                "new residential projects in gurgaon",
                "rera registered projects gurgaon",
                `new launch projects gurgaon ${month.toLowerCase()}`,
            ],
            alternates: { canonical: PAGE_URL },
            openGraph: {
                title,
                description,
                url: PAGE_URL,
                siteName: "Unisel Realty",
                images: [{ url: "/images/properties/og-image.jpg", width: 1200, height: 630, alt: title }],
                locale: "en_IN",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: ["/images/properties/og-image.jpg"],
            },
        },
        "residential",
        "new-launch"
    );
}

const NewLaunchPage = async () => {
    const [projects, launchPosts, allPosts] = await Promise.all([
        getAdvertisableNewLaunches(),
        getBlogPostsByTag("Launches"),
        getBlogPosts(),
    ]);
    const news = (launchPosts.length ? launchPosts : allPosts).slice(0, 3);

    const updated = projects.map((p) => p._updatedAt).filter(Boolean).sort().at(-1);
    const updatedLabel = updated ? format(new Date(updated), "d MMMM yyyy") : undefined;
    const prices = projects.map((p) => parseInrPrice(p.rate)).filter((n): n is number => n !== undefined);
    const fromPrice = prices.length ? inCrore(Math.min(...prices)) : undefined;

    const byMarket = Object.entries(
        projects.reduce<Record<string, number>>((counts, p) => {
            if (p.micromarket && MICROMARKETS[p.micromarket]) {
                counts[p.micromarket] = (counts[p.micromarket] ?? 0) + 1;
            }
            return counts;
        }, {})
    ).sort((a, b) => b[1] - a[1]);
    const marketName = (slug: string) => MICROMARKETS[slug].displayName;

    const intro = projects.length
        ? `We track ${projects.length} RERA-registered new launch projects across ${byMarket.length} Gurgaon micromarkets${fromPrice ? `, with prices from ${fromPrice}` : ""}. Every project here is registered with HARERA Gurugram, so you can verify it before you pay a booking amount. We update this page when projects launch or their details change.`
        : "New launch projects appear here as soon as they are registered with HARERA Gurugram.";

    const faqs = [
        {
            question: "Which new launch projects are available in Gurgaon right now?",
            answer: projects.length
                ? `As of ${updatedLabel ?? monthLabel()}, we list ${projects.length} RERA-registered new launch projects in Gurgaon, including ${listJoin(projects.slice(0, 4).map((p) => p.name))}${fromPrice ? `, with prices starting from ${fromPrice}` : ""}. The comparison table on this page shows each project's location, configurations, starting price and HARERA registration number.`
                : "We add new launch projects to this page as soon as HARERA Gurugram registers them. Talk to our advisors for projects that are due to launch.",
        },
        {
            question: "Can I book an upcoming or pre-launch project in Gurgaon?",
            answer: "Only after it is registered. Section 3 of the RERA Act, 2016 bars a promoter from advertising, booking or selling units in a project before it is registered with the state RERA, so an expression of interest paid for an unregistered Gurgaon project has little protection. We add upcoming projects to this page once HARERA Gurugram registers them.",
        },
        {
            question: "How do I check whether a Gurgaon project is RERA registered?",
            answer: "Search the project name or registration number on the Haryana RERA Gurugram website (haryanarera.gov.in). The project page shows the promoter, approved plans, the committed completion date and quarterly progress reports. Registration numbers for the projects on this page are in the comparison table.",
        },
        ...(byMarket.length
            ? [
                  {
                      question: "Which areas of Gurgaon have the most new launches?",
                      answer: `Of the ${projects.length} projects we list, ${marketName(byMarket[0][0])} has the most new launches (${byMarket[0][1]})${byMarket.length > 1 ? `, followed by ${listJoin(byMarket.slice(1, 3).map(([slug, count]) => `${marketName(slug)} (${count})`))}` : ""}. Prices and possession timelines differ a lot between corridors, so compare projects within the same micromarket.`,
                  },
              ]
            : []),
    ];

    const schemas = [
        breadcrumbSchema([
            { name: "Home", url: "https://www.uniselrealty.com" },
            { name: "Residential", url: "https://www.uniselrealty.com/residential" },
            { name: "New Launch", url: PAGE_URL },
        ]),
        propertyCollectionSchema({
            name: "New Launch & Upcoming Projects in Gurgaon",
            description: intro,
            url: PAGE_URL,
            dateModified: updated,
        }),
        ...(projects.length ? [propertyItemListSchema(projects, "New launch projects in Gurgaon")] : []),
        faqPageSchema(faqs, PAGE_URL),
    ];

    return (
        <>
            {schemas.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}
            <HeroSub
                title="New Launch & Upcoming Projects in Gurgaon."
                description={`RERA-registered launches we are tracking in ${monthLabel()}.`}
                badge="New Launch"
            />
            <section className="container mx-auto max-w-8xl px-5 2xl:px-0 pt-0!">
                <p className="text-lg text-dark/70 dark:text-white/70 max-w-4xl">{intro}</p>
            </section>

            <PropertiesListing category="residential" status="new-launch" />

            {projects.length > 0 && (
                <section className="container mx-auto max-w-8xl px-5 2xl:px-0">
                    <h2 className="text-dark dark:text-white text-3xl md:text-40 font-semibold">
                        Compare new launch projects in Gurgaon
                    </h2>
                    {updatedLabel && (
                        <p className="mt-2 text-sm text-dark/50 dark:text-white/50">Last updated {updatedLabel}</p>
                    )}
                    <div className="mt-8">
                        <ProjectComparisonTable projects={projects} caption="New launch projects in Gurgaon with prices and HARERA numbers" />
                    </div>
                </section>
            )}

            <section className="container mx-auto max-w-8xl px-5 2xl:px-0">
                <h2 className="text-dark dark:text-white text-3xl md:text-40 font-semibold">
                    Upcoming projects in Gurgaon: what we list
                </h2>
                <div className="mt-4 space-y-4 max-w-4xl text-base text-dark/70 dark:text-white/70">
                    <p>
                        Many &ldquo;upcoming&rdquo; and &ldquo;pre-launch&rdquo; offers in Gurgaon are for projects that are not
                        yet registered with HARERA. The RERA Act does not allow a project to be advertised or sold before
                        registration, so we list a project only once it is registered. You get a registration number you can
                        check, not just a brochure.
                    </p>
                    <p>
                        Pre-launch allocations often close soon after registration. Our{" "}
                        <Link href="/insights-report" className="text-primary underline underline-offset-4">
                            Gurgaon pre-launch investor report
                        </Link>{" "}
                        covers the projects we are tracking, with RERA status and expected possession, or{" "}
                        <Link href="/contact" className="text-primary underline underline-offset-4">
                            talk to an advisor
                        </Link>{" "}
                        to hear about launches as they are registered.
                    </p>
                </div>
            </section>

            {byMarket.length > 0 && (
                <section className="container mx-auto max-w-8xl px-5 2xl:px-0">
                    <h2 className="text-dark dark:text-white text-3xl md:text-40 font-semibold">New launches by location</h2>
                    <ul className="mt-6 flex flex-wrap gap-3">
                        {byMarket.map(([slug, count]) => (
                            <li key={slug}>
                                <Link
                                    href={`/location/${slug}`}
                                    className="inline-block rounded-full border border-dark/10 dark:border-white/20 px-5 py-2.5 text-dark dark:text-white hover:border-primary hover:text-primary duration-300"
                                >
                                    {marketName(slug)} ({count})
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section className="container mx-auto max-w-8xl px-5 2xl:px-0">
                <h2 className="text-dark dark:text-white text-3xl md:text-40 font-semibold">
                    New launch projects in Gurgaon: FAQs
                </h2>
                <div className="mt-6 max-w-4xl divide-y divide-dark/10 dark:divide-white/10">
                    {faqs.map((faq) => (
                        <div key={faq.question} className="py-5">
                            <h3 className="text-lg font-medium text-dark dark:text-white">{faq.question}</h3>
                            <p className="mt-3 text-base text-dark/70 dark:text-white/70">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {news.length > 0 && (
                <section className="container mx-auto max-w-8xl px-5 2xl:px-0">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h2 className="text-dark dark:text-white text-3xl md:text-40 font-semibold">
                            {launchPosts.length ? "Latest launch news" : "Latest Gurgaon real estate news"}
                        </h2>
                        <Link
                            href={launchPosts.length ? "/blog/category/launches" : "/blog"}
                            className="text-primary underline underline-offset-4"
                        >
                            All news
                        </Link>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {news.map((post) => (
                            <BlogCard key={post._id} blog={post} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
};

export default NewLaunchPage;
