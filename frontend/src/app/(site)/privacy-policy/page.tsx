import { Metadata } from "next";
import HeroSub from "@/components/shared/HeroSub";

export const metadata: Metadata = {
    title: "Privacy Policy - Gurgaon Real Estate",
    description: "Unisel Realty's Privacy Policy — how we collect, use, and protect your personal data under India's DPDP Act, 2023.",
    keywords: ["privacy policy", "unisel realty privacy", "data protection", "DPDP Act"],
    alternates: { canonical: "https://www.uniselrealty.com/privacy-policy" },
    openGraph: {
        title: "Privacy Policy | Unisel Realty",
        description: "How Unisel Realty collects, uses, and protects your personal data under India's DPDP Act, 2023.",
        url: "https://www.uniselrealty.com/privacy-policy",
        siteName: "Unisel Realty",
        images: [{ url: "/images/hero/og-image.jpg", width: 1200, height: 630, alt: "Unisel Realty Privacy Policy" }],
        locale: "en_US",
        type: "website",
    },
};

const PrivacyPolicyPage = () => {
    return (
        <>
            <HeroSub
                title="Privacy Policy."
                description="How we collect, use, and protect your personal data — compliant with India's DPDP Act, 2023."
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
                            Last Updated: March 2026 · Compliant with India&apos;s DPDP Act, 2023
                        </p>
                        <p className="mt-6 text-base text-black/70 dark:text-white/70 leading-7">
                            This policy covers what personal data we collect when you visit uniselrealty.com or reach out about a property, how we use it, and who we share it with. Using our website or sending us an inquiry means you&apos;re comfortable with what&apos;s described here.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">1. Who We Are</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7">
                            Unisel Realty is a RERA-registered property consultancy in Gurgaon, Haryana (RERA Reg. No.: RC/HARERA/GGM/1940/1535/2022/308). We work with buyers looking at residential property — apartments, 2BHK, 3BHK, 4BHK, high-rises — and commercial spaces across Gurgaon and Delhi NCR. We also handle NRI property investments across India. Under the DPDP Act, Unisel Realty is the Data Fiduciary.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">2. Data We Collect</h2>

                        <h3 className="text-base font-semibold text-black dark:text-white mb-2 mt-5">2.1 Information You Give Us Directly</h3>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7">
                            When you fill in a form, book a site visit, or get in touch, we collect your name, mobile number, and email. We also ask for your city, NRI status if relevant, property preferences (type, budget, area), and home loan needs. Anything beyond that is up to you.
                        </p>

                        <h3 className="text-base font-semibold text-black dark:text-white mb-2 mt-5">2.2 Automatically Collected Data</h3>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7">
                            When you browse the site, we automatically log your IP address, browser type, device, and OS. We also track which pages you visit, how long you spend on them, and how you got here. Location data is approximate — city or region only — and we store standard cookie and session data.
                        </p>

                        <h3 className="text-base font-semibold text-black dark:text-white mb-2 mt-5">2.3 Third-Party Sources</h3>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7">
                            We may receive data from Google Ads, Meta Ads, property portals (99acres, MagicBricks, Housing.com), referral partners, and developers whose projects you expressed interest in elsewhere.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">3. How We Use Your Data</h2>
                        <ul className="space-y-2 text-base text-black/70 dark:text-white/70 list-none pl-0">
                            {[
                                "Reply to your inquiry and shortlist matching properties.",
                                "Arrange site visits across Gurgaon.",
                                "Connect you with home loan partners.",
                                "Help NRI clients navigate property investments under FEMA.",
                                "Send you relevant property updates, new launches, and market news over call, WhatsApp, SMS, or email.",
                                "Provide free legal and tax consultation.",
                                "Understand how people use our site and improve it.",
                                "Meet our obligations under RERA, HARERA, and Indian law.",
                                "Send newsletters and promotional communications — you can opt out any time.",
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 leading-7">
                                    <span className="text-primary mt-1 shrink-0">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 4 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">4. Sharing Your Information</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7 mb-4">
                            We don&apos;t sell your data. We share it only in these limited cases:
                        </p>
                        <ul className="space-y-3 text-base text-black/70 dark:text-white/70 list-none pl-0">
                            {[
                                { label: "Developer Partners:", text: "If you inquire about a specific project, your contact may be shared with that developer's sales team to facilitate follow-up." },
                                { label: "Banking & NBFC Partners:", text: "For home loan processing, upon your request." },
                                { label: "Legal & Compliance Advisors:", text: "For documentation and transaction support." },
                                { label: "Technology Providers:", text: "Website hosting, CRM, email marketing, and analytics vendors — under strict data processing agreements." },
                                { label: "Regulatory Authorities:", text: "When required by RERA, HARERA, courts, or government directives." },
                                { label: "Business Restructuring:", text: "If we merge with or are acquired by another company, you'll be notified beforehand." },
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 leading-7">
                                    <span className="text-primary mt-1 shrink-0">•</span>
                                    <span><strong className="text-black dark:text-white font-medium">{item.label}</strong> {item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 5 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">5. Legal Basis for Processing (DPDP Act, 2023)</h2>
                        <ul className="space-y-3 text-base text-black/70 dark:text-white/70 list-none pl-0">
                            {[
                                { label: "Consent —", text: "when you submit an inquiry or subscribe to communications." },
                                { label: "Contractual Necessity —", text: "to fulfil our property advisory obligations." },
                                { label: "Legitimate Interest —", text: "to improve services, prevent fraud, and maintain Website security." },
                                { label: "Legal Obligation —", text: "to comply with RERA, HARERA, and Indian tax regulations." },
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 leading-7">
                                    <span className="text-primary mt-1 shrink-0">•</span>
                                    <span><strong className="text-black dark:text-white font-medium">{item.label}</strong> {item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 6 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">6. Data Retention</h2>
                        <ul className="space-y-2 text-base text-black/70 dark:text-white/70 list-none pl-0">
                            {[
                                "Inquiry/lead data: Up to 3 years from last interaction.",
                                "Transaction and booking data: Up to 7 years (as required under Indian financial record-keeping law).",
                                "Marketing opt-outs: Retained indefinitely to honour your preferences.",
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 leading-7">
                                    <span className="text-primary mt-1 shrink-0">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7 mt-4">
                            After those periods, we delete or anonymise the data.
                        </p>
                    </div>

                    {/* Section 7 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">7. Your Rights (DPDP Act, 2023)</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7 mb-4">
                            As a Data Principal under India&apos;s DPDP Act, 2023, you can:
                        </p>
                        <ul className="space-y-3 text-base text-black/70 dark:text-white/70 list-none pl-0">
                            {[
                                { label: "Access —", text: "request a summary of the personal data we hold about you." },
                                { label: "Correction —", text: "request that inaccurate or incomplete data be fixed." },
                                { label: "Erasure —", text: "request deletion of your data (subject to legal retention requirements)." },
                                { label: "Withdraw Consent —", text: "opt out of marketing at any time." },
                                { label: "Grievance Redressal —", text: "raise a complaint with our Grievance Officer (see Section 11) or the Data Protection Board of India." },
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 leading-7">
                                    <span className="text-primary mt-1 shrink-0">•</span>
                                    <span><strong className="text-black dark:text-white font-medium">{item.label}</strong> {item.text}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7 mt-4">
                            Send requests to{" "}
                            <a href="mailto:info@uniselrealty.com" className="text-primary underline underline-offset-2">
                                info@uniselrealty.com
                            </a>
                            . We respond within 30 days.
                        </p>
                    </div>

                    {/* Section 8 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">8. Cookies &amp; Tracking</h2>
                        <ul className="space-y-3 text-base text-black/70 dark:text-white/70 list-none pl-0">
                            {[
                                { label: "Essential Cookies:", text: "Session management and core Website functionality." },
                                { label: "Analytics Cookies:", text: "Google Analytics — anonymised data on how users interact with our property content." },
                                { label: "Marketing Cookies:", text: "Google Ads and Meta Pixel — used to show relevant property ads based on browsing behaviour." },
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 leading-7">
                                    <span className="text-primary mt-1 shrink-0">•</span>
                                    <span><strong className="text-black dark:text-white font-medium">{item.label}</strong> {item.text}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7 mt-4">
                            You can manage cookies in your browser settings. Disabling non-essential cookies won&apos;t affect your core browsing experience.
                        </p>
                    </div>

                    {/* Section 9 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">9. WhatsApp &amp; SMS Communications (TRAI Compliant)</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7">
                            When you give us your number, you&apos;re agreeing to receive messages from us over WhatsApp, SMS, or phone call — things like project updates, property shortlists, and site visit confirmations. To opt out, reply &apos;STOP&apos; or email{" "}
                            <a href="mailto:info@uniselrealty.com" className="text-primary underline underline-offset-2">
                                info@uniselrealty.com
                            </a>
                            . We&apos;re registered under TRAI DLT regulations and the DPDP Act, 2023.
                        </p>
                    </div>

                    {/* Section 10 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">10. Data Security</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7">
                            We use SSL encryption, limit staff access to your data, run regular security audits, and use CRM access controls. No online system is completely risk-free, though. If you suspect your data has been compromised, email us straight away at{" "}
                            <a href="mailto:info@uniselrealty.com" className="text-primary underline underline-offset-2">
                                info@uniselrealty.com
                            </a>
                            .
                        </p>
                    </div>

                    {/* Section 11 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">11. Grievance Officer</h2>
                        <div className="bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 rounded-2xl p-6 text-base text-black/70 dark:text-white/70 leading-7 space-y-1">
                            <p className="font-medium text-black dark:text-white">Grievance Officer — Unisel Realty</p>
                            <p>Unisel Realty - Real Estate Agent &amp; Property Consultant, Gurgaon</p>
                            <p>408, 4th Floor, Adani Miracle Mile, Sector 60, Gurgaon, Haryana — 122003</p>
                            <p>
                                Email:{" "}
                                <a href="mailto:info@uniselrealty.com" className="text-primary underline underline-offset-2">
                                    info@uniselrealty.com
                                </a>
                                {"  "}|{"  "}
                                Phone:{" "}
                                <a href="tel:+918010303303" className="text-primary underline underline-offset-2">
                                    +91 8010-303-303
                                </a>
                            </p>
                            <p>Response Time: 30 days from receipt</p>
                            <p>RERA Reg.: RC/HARERA/GGM/1940/1535/2022/308</p>
                        </div>
                    </div>

                    {/* Section 12 */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-black dark:text-white mb-3">12. Changes to This Policy</h2>
                        <p className="text-base text-black/70 dark:text-white/70 leading-7">
                            We update this policy when our practices change or when regulations like RERA, HARERA, or the DPDP Act are amended. The date at the top tells you when it was last revised. Carrying on using the site after an update means you&apos;re fine with the new version.
                        </p>
                    </div>

                </div>
            </section>
        </>
    );
};

export default PrivacyPolicyPage;
