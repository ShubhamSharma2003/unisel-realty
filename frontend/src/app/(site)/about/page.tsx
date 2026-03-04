import { Metadata } from "next";
import HeroSub from "@/components/shared/HeroSub";
import { aboutPageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
    title: "About Us | Unisel Realty — Gurgaon Real Estate Experts",
    description: "Learn about Unisel Realty — Gurgaon's trusted real estate consultants. We help buyers, sellers, and investors find the best residential and commercial properties.",
    keywords: ["about unisel realty", "real estate consultants gurgaon", "property experts gurgaon"],
    openGraph: {
        title: "About Us | Unisel Realty",
        description: "Gurgaon's trusted real estate consultants helping buyers, sellers, and investors.",
        url: "https://uniselrealty.com/about",
        siteName: "Unisel Realty",
        images: [{ url: "/images/hero/og-image.jpg", width: 1200, height: 630, alt: "About Unisel Realty" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Us | Unisel Realty",
        description: "Gurgaon's trusted real estate consultants.",
        images: ["/images/hero/og-image.jpg"],
    },
};

const AboutPage = () => {
    const schema = aboutPageSchema();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <HeroSub
                title="About Unisel Realty."
                description="Gurgaon's trusted real estate consultants — helping buyers, sellers, and investors since day one."
                badge="About Us"
            />
            <section className="container max-w-8xl mx-auto px-5 2xl:px-0 py-14 md:py-28">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black dark:text-white mb-6 leading-snug">
                            Your Trusted Real Estate Partner in Gurgaon
                        </h2>
                        <p className="text-base text-black/60 dark:text-white/60 leading-7 mb-4">
                            Unisel Realty is a premier real estate consultancy based in Gurgaon, specialising in residential and commercial properties. We connect buyers, sellers, and investors with the right opportunities across Gurgaon&apos;s most sought-after micro-markets.
                        </p>
                        <p className="text-base text-black/60 dark:text-white/60 leading-7 mb-4">
                            Whether you are looking for a luxury apartment on Golf Course Road, a new launch project in Sector 76, or a pre-leased commercial asset — our team of experienced advisors guides you at every step.
                        </p>
                        <p className="text-base text-black/60 dark:text-white/60 leading-7">
                            We pride ourselves on transparency, market expertise, and a client-first approach that has earned us the trust of thousands of satisfied customers.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 text-center">
                            <p className="text-4xl font-semibold text-primary mb-2">500+</p>
                            <p className="text-sm text-black/60 dark:text-white/60">Properties Sold</p>
                        </div>
                        <div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 text-center">
                            <p className="text-4xl font-semibold text-primary mb-2">1000+</p>
                            <p className="text-sm text-black/60 dark:text-white/60">Happy Clients</p>
                        </div>
                        <div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 text-center">
                            <p className="text-4xl font-semibold text-primary mb-2">10+</p>
                            <p className="text-sm text-black/60 dark:text-white/60">Years Experience</p>
                        </div>
                        <div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 text-center">
                            <p className="text-4xl font-semibold text-primary mb-2">50+</p>
                            <p className="text-sm text-black/60 dark:text-white/60">Top Developers</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutPage;
