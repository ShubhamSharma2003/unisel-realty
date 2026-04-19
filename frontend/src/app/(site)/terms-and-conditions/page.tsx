import { Metadata } from "next";
import HeroSub from "@/components/shared/HeroSub";

export const metadata: Metadata = {
    title: "Terms & Conditions - Gurgaon Real Estate",
    description: "Terms and conditions for using uniselrealty.com and our property advisory services. RERA-registered channel partner in Gurgaon, Haryana.",
    keywords: ["terms and conditions", "unisel realty terms", "real estate terms", "RERA channel partner"],
    alternates: { canonical: "https://www.uniselrealty.com/terms-and-conditions" },
    openGraph: {
        title: "Terms & Conditions | Unisel Realty",
        description: "Terms governing use of uniselrealty.com and our property advisory services in Gurgaon.",
        url: "https://www.uniselrealty.com/terms-and-conditions",
        siteName: "Unisel Realty",
        images: [{ url: "/images/hero/og-image.jpg", width: 1200, height: 630, alt: "Unisel Realty Terms & Conditions" }],
        locale: "en_US",
        type: "website",
    },
};

const TermsAndConditionsPage = () => {
    return (
        <>
            <HeroSub
                title="Terms & Conditions."
                description="What you're agreeing to when you use our website and property advisory services."
                badge="Legal"
            />
            <section className="container max-w-4xl mx-auto px-5 2xl:px-0 py-14 md:py-20">
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">

                    {/* Header */}
                    <div className="mb-10 pb-8 border-b border-black/10 dark:border-white/10">
                        <p className="text-sm text-black/50 dark:text-white/50">
                            Unisel Realty · www.uniselrealty.com
                        </p>
                        <p className="text-sm text-black/50 dark:text-white/50 mt-1">
                            Last Updated: March 2026 · RERA: RC/HARERA/GGM/1940/1535/2022/308
                        </p>
                    </div>

                    {/* Section 1 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">1. Acceptance of Terms</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7">
                            Using www.uniselrealty.com means you&apos;ve read and agreed to these Terms & Conditions. They cover how you use our website and the services we provide as a RERA-registered property consultant in Gurgaon. If you don&apos;t agree, don&apos;t use it.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">2. About Unisel Realty - Channel Partner Disclosure</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7 mb-5">
                            We&apos;re a licensed, RERA-registered real estate channel partner working across Gurgaon and Delhi NCR. We connect buyers with developers — we are not a developer, builder, or direct owner of any listed property.
                        </p>
                        <div className="bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 rounded-2xl p-6 text-base text-black/70 dark:text-white/70 leading-7 space-y-1">
                            <p>RERA Reg. No.: RC/HARERA/GGM/1940/1535/2022/308</p>
                            <p>408, 4th Floor, Adani Miracle Mile, Sector 60, Gurgaon, Haryana — 122003</p>
                            <p>
                                Phone:{" "}
                                <a href="tel:+918010303303" className="text-primary underline underline-offset-2">+91 8010-303-303</a>
                                {"  "}|{"  "}
                                Email:{" "}
                                <a href="mailto:info@uniselrealty.com" className="text-primary underline underline-offset-2">info@uniselrealty.com</a>
                            </p>
                        </div>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7 mt-5">
                            All property transactions are subject to separate developer agreements. Verify all project details and RERA status independently at{" "}
                            <a href="https://hrera.org.in" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">hrera.org.in</a>
                            {" "}before booking or making any payment.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">3. Property Information & Accuracy Disclaimer</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7 mb-4">
                            Everything on this site — listings, prices, floor plans, images — is for reference only. As a channel partner:
                        </p>
                        <ul className="space-y-2 text-base text-black/70 dark:text-white/70 list-none pl-0">
                            {[
                                "Prices can change at the developer's discretion without notice.",
                                "Floor plans and specs are indicative and may differ from the finished property.",
                                "Images may be computer-generated renders, not actual photographs.",
                                "We don't guarantee the accuracy, completeness, or currency of any listing.",
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 leading-7">
                                    <span className="text-primary mt-1 shrink-0">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7 mt-4">
                            Check directly with the developer and HARERA before you book or pay anything.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">4. No Developer Representation</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7">
                            Unisel Realty is an independent agent and consultant. We don&apos;t represent developers or make commitments on their behalf unless we&apos;re expressly authorised in writing for a specific project. Confirm any developer commitments directly before you book.
                        </p>
                    </div>

                    {/* Section 5 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">5. Intellectual Property Rights</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7">
                            Everything on this site belongs to Unisel Realty or its licensors and is covered by Indian and international IP law. Don&apos;t reproduce or use it commercially without our written permission. Developer names and logos belong to those developers — we use them only to identify projects we&apos;re authorised to market.
                        </p>
                    </div>

                    {/* Section 6 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">6. Advisory Services — Limitations of Liability</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7 mb-4">
                            We advise in good faith as a licensed property consultant. That said:
                        </p>
                        <ul className="space-y-2 text-base text-black/70 dark:text-white/70 list-none pl-0">
                            {[
                                "We don't guarantee investment returns or assured appreciation on any property.",
                                "Real estate carries market risk. Past performance doesn't predict future returns.",
                                "Legal and tax guidance on this site is general — get advice from a qualified CA or lawyer before transacting.",
                                "To the extent permitted by law, we're not liable for indirect, consequential, or punitive damages from relying on information on this site.",
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 leading-7">
                                    <span className="text-primary mt-1 shrink-0">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 7 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">7. Home Loan Referral Disclaimer</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7">
                            We work with 20+ banks and NBFCs to help buyers find home loans. Approvals are entirely at the lender&apos;s discretion based on your creditworthiness, RBI guidelines, and current rates. We don&apos;t guarantee approval or any specific loan terms.
                        </p>
                    </div>

                    {/* Section 8 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">8. NRI Property Services</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7">
                            NRI services are subject to FEMA, RBI regulations, and Indian income tax law. If you&apos;re an NRI buyer, get independent legal and tax advice before completing any purchase in India. All NRI transactions go through our Gurgaon office, under RERA.
                        </p>
                    </div>

                    {/* Section 9 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">9. RERA Compliance</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7">
                            We comply with the Real Estate (Regulation and Development) Act, 2016 as administered by HARERA. Every project we market is RERA-registered — check project listings and our status at{" "}
                            <a href="https://hrera.org.in" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">hrera.org.in</a>
                            . Under RERA, misleading representation by a channel partner carries a 5% penalty on total project cost. We take that seriously. If you have a complaint, email{" "}
                            <a href="mailto:info@uniselrealty.com" className="text-primary underline underline-offset-2">info@uniselrealty.com</a>
                            {" "}or go directly to HARERA.
                        </p>
                    </div>

                    {/* Section 10 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">10. Governing Law & Dispute Resolution</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7">
                            These Terms are governed by Indian law. If something goes wrong, raise it with us in good faith first. Anything unresolved falls under the exclusive jurisdiction of courts in Gurgaon (Gurugram), Haryana.
                        </p>
                    </div>

                    {/* Section 11 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">11. Modifications to Terms</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7">
                            We can update these Terms at any time. Changes go live when published on this site. Carrying on using the site after an update means you&apos;re fine with the revised Terms.
                        </p>
                    </div>

                    {/* Section 12 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">12. Contact for Legal Matters</h2>
                        <div className="bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 rounded-2xl p-6 text-base text-black/70 dark:text-white/70 leading-7 space-y-1">
                            <p className="font-medium text-black dark:text-white">Unisel Realty</p>
                            <p>408, 4th Floor, Adani Miracle Mile, Sector 60, Gurgaon, Haryana — 122003</p>
                            <p>
                                Phone:{" "}
                                <a href="tel:+918010303303" className="text-primary underline underline-offset-2">+91 8010-303-303</a>
                                {"  "}|{"  "}
                                Email:{" "}
                                <a href="mailto:info@uniselrealty.com" className="text-primary underline underline-offset-2">info@uniselrealty.com</a>
                            </p>
                            <p>RERA No.: RC/HARERA/GGM/1940/1535/2022/308</p>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default TermsAndConditionsPage;
