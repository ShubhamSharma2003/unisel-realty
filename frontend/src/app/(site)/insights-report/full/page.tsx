import { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import { Icon } from "@iconify/react/dist/iconify.js";
import { scopeCss } from "@/lib/scope-css";
import FullReportScripts from "@/components/InsightsReport/FullReportScripts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Investment Research Report Q2 2025 — Gurgaon",
    description:
        "Personalised Gurgaon investment research: AIPL Lake City, Godrej Samaris, Smartworld The Edition. Five-year return models, due diligence, advisory.",
    robots: { index: false, follow: false },
    alternates: { canonical: "https://www.uniselrealty.com/insights-report/full" },
};

const SCOPE = ".insights-full-scope";

function extractBlock(src: string, tag: string): string {
    const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
    const m = src.match(re);
    return m ? m[1] : "";
}

function extractInlineScripts(bodyHtml: string): { body: string; scripts: string[] } {
    const scripts: string[] = [];
    const cleaned = bodyHtml.replace(
        /<script\b[^>]*>([\s\S]*?)<\/script>/gi,
        (_match, inner) => {
            if (inner && inner.trim()) scripts.push(inner);
            return "";
        }
    );
    return { body: cleaned, scripts };
}

/**
 * Strip a top-level <div class="..."> ... </div> block by balanced counting.
 * Returns the body with the first match removed (no-op if not found).
 */
function stripBalancedDiv(html: string, classMatcher: RegExp): string {
    const openMatch = classMatcher.exec(html);
    if (!openMatch) return html;
    const start = openMatch.index;
    let i = start + openMatch[0].length;
    let depth = 1;
    const openRe = /<div\b/gi;
    const closeRe = /<\/div\s*>/gi;
    while (depth > 0 && i < html.length) {
        openRe.lastIndex = i;
        closeRe.lastIndex = i;
        const o = openRe.exec(html);
        const c = closeRe.exec(html);
        if (!c) break;
        if (o && o.index < c.index) {
            depth++;
            i = o.index + o[0].length;
        } else {
            depth--;
            i = c.index + c[0].length;
        }
    }
    return html.slice(0, start) + html.slice(i);
}

export default async function FullReportPage() {
    const cookieStore = await cookies();
    const unlocked = cookieStore.get("insights_unlocked");
    if (!unlocked || unlocked.value !== "1") {
        redirect("/insights-report");
    }

    const filePath = path.join(
        process.cwd(),
        "public",
        "insights",
        "full.html"
    );
    const html = await readFile(filePath, "utf-8");

    const rawCss = extractBlock(html, "style");
    const rawBody = extractBlock(html, "body");

    // Strip duplicate chrome: topbar (site Header replaces), in-report cta-section
    // and report-footer (site Footer replaces), back button.
    let bodyOnly = rawBody
        .replace(/<header[\s\S]*?<\/header>/gi, "")
        .replace(/<button class="back-btn"[\s\S]*?<\/button>/gi, "");
    bodyOnly = stripBalancedDiv(bodyOnly, /<div\s+class="topbar"[^>]*>/i);
    bodyOnly = stripBalancedDiv(bodyOnly, /<div\s+class="cta-section[^"]*"[^>]*>/i);
    bodyOnly = stripBalancedDiv(bodyOnly, /<div\s+class="report-footer"[^>]*>/i);

    const { body, scripts } = extractInlineScripts(bodyOnly);
    bodyOnly = body;

    const scopedCss = scopeCss(rawCss, SCOPE);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: scopedCss }} />
            <div className="insights-full-scope">
                <div dangerouslySetInnerHTML={{ __html: bodyOnly }} />
            </div>

            {/* Site-styled closing CTA — replaces the in-report advisory block */}
            <section
                id="advisory"
                className="py-16 md:py-24 bg-[#F8FAFF] dark:bg-white/[0.02] border-t border-black/10 dark:border-white/10 scroll-mt-24"
            >
                <div className="container max-w-3xl mx-auto px-5 text-center">
                    <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                        Next Step
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-dark dark:text-white leading-tight mb-5">
                        Ready to move forward on{" "}
                        <span className="text-primary italic">one or more?</span>
                    </h2>
                    <p className="text-base text-dark/60 dark:text-white/60 leading-relaxed mb-8 max-w-xl mx-auto">
                        Our advisory team prepares a personalised allocation strategy —
                        mapping these projects to your budget, timeline, and tax situation.
                        Response within 2 hours. No obligation.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold uppercase tracking-wider text-sm px-7 py-3.5 rounded-full shadow-lg transition-all"
                        >
                            Book Advisory Call
                            <Icon icon="ph:arrow-right" width={16} height={16} />
                        </Link>
                        <a
                            href="https://wa.me/919873031665?text=Hi%20Unisel%2C%20I%27d%20like%20a%20WhatsApp%20brief%20on%20the%20investment%20report."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold uppercase tracking-wider text-sm px-7 py-3.5 rounded-full transition-all"
                        >
                            <Icon icon="ph:whatsapp-logo-fill" width={18} height={18} />
                            WhatsApp Inquiry
                        </a>
                    </div>
                    <p className="text-xs text-dark/40 dark:text-white/40 mt-6">
                        RERA: RC/HARERA/GGM/1940/1535/2022/308 · Est. 2005 · Delivering Trust ·
                        Creating Wealth
                    </p>
                </div>
            </section>

            <FullReportScripts inlineScripts={scripts} />
        </>
    );
}
