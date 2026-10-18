import HeroSub from "@/components/shared/HeroSub";
import Link from "next/link";
import { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/company";
import { MICROMARKETS } from "@/lib/micromarkets";

/**
 * Areas-we-serve hub. /location used to 308-redirect to /residential, which
 * sent micromarket intent to a different topic and left the six location
 * pages with no parent in the site hierarchy.
 */
export const metadata: Metadata = {
    title: "Areas We Serve: Gurgaon Property Micromarkets",
    description:
        "Property guides for the Gurgaon micromarkets we work in: Golf Course Road, Golf Course Extension Road, Dwarka Expressway, Sohna Road, New Gurgaon and Gwal Pahari.",
    keywords: [
        "gurgaon micromarkets",
        "golf course road property",
        "dwarka expressway property",
        "sohna road property gurgaon",
        "new gurgaon sectors",
        "areas we serve gurgaon",
    ],
    alternates: { canonical: `${SITE_URL}/location` },
    openGraph: {
        title: "Areas We Serve: Gurgaon Property Micromarkets | Unisel Realty",
        description:
            "Property guides for the Gurgaon micromarkets we work in, from Golf Course Road to Dwarka Expressway.",
        url: `${SITE_URL}/location`,
        siteName: "Unisel Realty",
        images: [
            {
                url: "/images/properties/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Gurgaon property micromarkets",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Areas We Serve: Gurgaon Property Micromarkets | Unisel Realty",
        description: "Property guides for the Gurgaon micromarkets we work in.",
        images: ["/images/properties/og-image.jpg"],
    },
};

const LocationHubPage = () => {
    const entries = Object.entries(MICROMARKETS);

    const breadcrumbs = breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Areas We Serve", url: `${SITE_URL}/location` },
    ]);

    const itemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Gurgaon property micromarkets served by Unisel Realty",
        numberOfItems: entries.length,
        itemListElement: entries.map(([slug, info], index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/location/${slug}`,
            name: info.displayName,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
            />
            <HeroSub
                title="Areas We Serve in Gurgaon"
                description="We advise across six Gurgaon micromarkets. Each has its own pricing, tenant profile and handover timeline."
                badge="Micromarkets"
            />
            <section className="container mx-auto max-w-8xl px-5 2xl:px-0 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {entries.map(([slug, info]) => (
                        <Link
                            key={slug}
                            href={`/location/${slug}`}
                            className="block rounded-2xl border border-dark/10 dark:border-white/15 p-7 hover:border-primary hover:shadow-lg transition-all duration-200"
                        >
                            <h2 className="text-2xl font-semibold text-dark dark:text-white mb-2">
                                {info.displayName}
                            </h2>
                            <p className="text-base text-dark/60 dark:text-white/60">
                                {info.description}
                            </p>
                            <span className="inline-block mt-4 text-sm font-semibold text-primary">
                                View properties
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
};

export default LocationHubPage;
