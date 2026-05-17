"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

/* ── DATA ─────────────────────────────────────────────────────────────── */

const STATS = [
    { num: "₹900Cr+", label: "Transactions Facilitated" },
    { num: "19 Yrs", label: "Gurgaon Market Expertise" },
    { num: "2,400+", label: "HNI & NRI Clients" },
    { num: "3.8×", label: "Avg. Return on Past Picks" },
];

const THESIS_POINTS = [
    {
        icon: "ph:road-horizon",
        title: "Infrastructure Multiplier",
        desc: "Dwarka Expressway operationalisation, KMP connectivity, and metro expansion are compressing commute times and pushing valuations northward.",
    },
    {
        icon: "ph:buildings",
        title: "Supply Scarcity at Luxury End",
        desc: "Large-format luxury apartments in Sector 36A–66 are near-extinct. New approvals are rare; existing inventory is depleting fast at launch pricing.",
    },
    {
        icon: "ph:globe-hemisphere-east",
        title: "NRI Capital Surge",
        desc: "Post-COVID NRI repatriation of wealth into Indian real estate hit a 12-year high in 2024. Our Dubai desk is seeing unprecedented inbound inquiry.",
    },
];

type Project = {
    id: string;
    badge: string;
    exclusive?: boolean;
    location: string;
    name: string;
    developer: string;
    entry: string;
    multiplier: number;
    multiplierLabel: string;
    config: string;
    possession: string;
    usp: string;
    reasons: string[];
    accent: string;
    badgeBg: string;
    glowFrom: string;
    metricBg: string;
};

const PROJECTS: Project[] = [
    {
        id: "aipl",
        badge: "Pre-Launch Partner",
        exclusive: true,
        location: "Sector 103, Dwarka Expressway",
        name: "AIPL Lake City",
        developer: "Advance India Projects Ltd · Est. 30+ Yrs",
        entry: "₹3.5Cr+",
        multiplier: 2.3,
        multiplierLabel: "2.3×",
        config: "3–4 BHK",
        possession: "Dec 2030",
        usp: "50-acre township with man-made lake, designed by Morphogenesis. Pre-launch pricing at ₹16,500 PSF — 18–22% below comparable completed assets.",
        reasons: [
            "Morphogenesis-designed — brand premium at resale",
            "Sector 103: 15 min from IGI Airport, metro planned",
            "Pre-launch rate locked — max appreciation headroom",
        ],
        accent: "linear-gradient(145deg,#0A2855 0%,#1A4A8A 50%,#1E6FD9 100%)",
        badgeBg: "#1E6FD9",
        glowFrom: "rgba(30,111,217,0.18)",
        metricBg: "#EFF6FF",
    },
    {
        id: "godrej",
        badge: "Premium Address",
        location: "Sector 53, Golf Course Road",
        name: "Godrej Samaris",
        developer: "Godrej Properties · Euromoney #1 Developer",
        entry: "₹11.4Cr+",
        multiplier: 2.1,
        multiplierLabel: "2.1×",
        config: "3–4 BHK+Ph",
        possession: "2030",
        usp: "Last large land parcel on Golf Course Road. 7.5 acres, 5 towers, low density — 4 homes per floor core. Structurally impossible to replicate.",
        reasons: [
            "Last big GCR parcel — permanent scarcity premium",
            "Dual international clubhouses; Aravalli views",
            "Godrej brand = fastest resale in Gurgaon market",
        ],
        accent: "linear-gradient(145deg,#2D1B5C 0%,#5B2EA3 50%,#8B5CF6 100%)",
        badgeBg: "#7C3AED",
        glowFrom: "rgba(124,58,237,0.18)",
        metricBg: "#F5F3FF",
    },
    {
        id: "smartworld",
        badge: "Best Specs",
        location: "Sector 66, Golf Course Ext. Road",
        name: "Smartworld The Edition",
        developer: "Smartworld Developers · ₹40,000 Cr AUM",
        entry: "₹5.15Cr+",
        multiplier: 2.2,
        multiplierLabel: "2.2×",
        config: "3–4.5 BHK",
        possession: "Feb 2031",
        usp: "Private jacuzzi in every single unit. Rooftop infinity pool. 1.2 lakh sq.ft. clubhouse. Specs previously exclusive to Dubai — now on GCER.",
        reasons: [
            "Private jacuzzi every unit — unique resale moat",
            "Canara Bank approved; active construction underway",
            "GCER's fastest-appreciating belt 2022–2025",
        ],
        accent: "linear-gradient(145deg,#0E3B3E 0%,#0F7398 50%,#06B6D4 100%)",
        badgeBg: "#0891B2",
        glowFrom: "rgba(8,145,178,0.18)",
        metricBg: "#ECFEFF",
    },
];

const TESTIMONIALS = [
    {
        initial: "R",
        text: "Unisel got me into DLF Camellias at ₹11.2Cr in 2021. I've had offers at ₹19Cr this year. That's the kind of advisory that changes your balance sheet.",
        name: "Rajiv M.",
        detail: "Entrepreneur, Delhi NCR",
    },
    {
        initial: "S",
        text: "As an NRI managing ₹50Cr+ in Indian real estate, Unisel is the only advisory I trust for Gurgaon. They know projects before they're public.",
        name: "Sunita P.",
        detail: "NRI Investor, Dubai",
    },
    {
        initial: "A",
        text: "Bought into Sobha on Unisel's recommendation at ₹4.1Cr. Comparable units now at ₹6.8Cr. Three years, 65% return. My CA still can't believe it.",
        name: "Ankit S.",
        detail: "CXO, Gurgaon",
    },
];

const TRUST = [
    { icon: "ph:trophy-fill", label: "HARERA Registered Advisor" },
    { icon: "ph:calendar-check-fill", label: "Est. 2005 — 19 Years in Market" },
    { icon: "ph:globe-hemisphere-east-fill", label: "Dubai NRI Desk Active" },
    { icon: "ph:handshake-fill", label: "DLF · Godrej · M3M · AIPL · Smartworld" },
    { icon: "ph:lock-key-fill", label: "No-Pressure Advisory" },
];

const INCLUDED = [
    "Detailed floor plan & pricing sheet for all 3 projects",
    "5-year return model with scenario analysis",
    "RERA & developer due diligence summary",
    "Comparison with competing projects in each micro-market",
    "NRI buying process guide (if applicable)",
    "Priority site visit scheduling",
];

/* ── COMPONENT ─────────────────────────────────────────────────────────── */

export default function InsightsReportClient() {
    const [unlocked, setUnlocked] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const projectsRef = useRef<HTMLDivElement>(null);

    // Detect cookie on mount for return visitors
    useEffect(() => {
        const has = document.cookie
            .split(";")
            .some((c) => c.trim().startsWith("insights_unlocked="));
        if (has) setUnlocked(true);
    }, []);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="bg-white dark:bg-black">
            {/* HERO */}
            <Hero onCTA={openModal} />

            {/* STATS */}
            <section className="border-y border-black/10 dark:border-white/10 bg-white dark:bg-black">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-black/10 dark:divide-white/10">
                        {STATS.map((s) => (
                            <div key={s.label} className="text-center py-8 md:py-10 px-4">
                                <p className="text-3xl md:text-4xl font-semibold text-primary mb-2 tracking-tight">
                                    {s.num}
                                </p>
                                <p className="text-xs uppercase tracking-wider text-dark/60 dark:text-white/60">
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* THESIS */}
            <section className="py-16 md:py-24 bg-[#F8FAFF] dark:bg-white/[0.02]">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                    <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                                The Investment Thesis
                            </p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-dark dark:text-white leading-tight mb-6">
                                Gurgaon&rsquo;s luxury corridor is entering a{" "}
                                <span className="text-primary italic">generational window</span> not
                                seen since 2012.
                            </h2>
                            <p className="text-base text-dark/60 dark:text-white/60 leading-relaxed">
                                Demand from HNIs and NRIs is outpacing supply across the Golf Course
                                Extension Road and Dwarka Expressway belts. With infrastructure
                                spend accelerating and new brand-grade launches at pre-launch
                                prices, three projects stand out for their convergence of location,
                                developer quality, and entry timing.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            {THESIS_POINTS.map((t) => (
                                <div
                                    key={t.title}
                                    className="flex gap-4 p-5 md:p-6 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl hover:border-primary/40 transition-colors"
                                >
                                    <Icon
                                        icon={t.icon}
                                        width={28}
                                        height={28}
                                        className="text-primary flex-shrink-0 mt-0.5"
                                    />
                                    <div>
                                        <h3 className="text-sm font-semibold text-dark dark:text-white uppercase tracking-wide mb-2">
                                            {t.title}
                                        </h3>
                                        <p className="text-sm text-dark/60 dark:text-white/60 leading-relaxed">
                                            {t.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECTS */}
            <section className="py-16 md:py-24" ref={projectsRef}>
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                                Curated Investment Picks · 2025
                            </p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-dark dark:text-white">
                                The Three Projects
                            </h2>
                        </div>
                        <p className="text-sm text-dark/60 dark:text-white/60 max-w-sm leading-relaxed">
                            Each shortlisted through Unisel&rsquo;s 48-point due diligence framework —
                            developer track record, RERA status, and micro-market demand verified.
                        </p>
                    </div>

                    {/* Unlock teaser */}
                    <div className="flex flex-wrap items-center justify-center gap-4 py-6 mb-8 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl px-6">
                        {unlocked ? (
                            <div className="flex items-center gap-3 text-sm md:text-base font-semibold text-emerald-600 dark:text-emerald-400">
                                <Icon icon="ph:check-circle-fill" width={20} height={20} />
                                Already unlocked.
                                <Link
                                    href="/insights-report/full"
                                    className="text-primary hover:underline inline-flex items-center gap-1"
                                >
                                    View full investment report
                                    <Icon icon="ph:arrow-right" width={16} height={16} />
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-2 text-sm md:text-base text-dark/70 dark:text-white/70">
                                    <Icon
                                        icon="ph:lock-key-fill"
                                        width={18}
                                        height={18}
                                        className="text-primary"
                                    />
                                    <span>
                                        <strong className="text-dark dark:text-white">
                                            Project names & details are locked.
                                        </strong>{" "}
                                        Fill a quick form to unlock all three instantly.
                                    </span>
                                </div>
                                <button
                                    onClick={openModal}
                                    className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-primary/90 transition-all"
                                >
                                    <Icon icon="ph:lock-key-open-fill" width={16} height={16} />
                                    Unlock All 3 Projects
                                </button>
                            </>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PROJECTS.map((p) => (
                            <ProjectCard
                                key={p.id}
                                project={p}
                                locked={!unlocked}
                                onCTA={openModal}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ROI CALCULATOR */}
            <ROISection />

            {/* TESTIMONIALS */}
            <section className="py-16 md:py-24">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                    <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                        Client Outcomes
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-dark dark:text-white mb-10">
                        What Our Investors Say
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {TESTIMONIALS.map((t) => (
                            <div
                                key={t.name}
                                className="p-7 border border-black/10 dark:border-white/10 rounded-2xl bg-white dark:bg-white/5 hover:border-primary/40 transition-colors"
                            >
                                <div className="flex gap-1 text-amber-400 mb-4">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Icon
                                            key={i}
                                            icon="ph:star-fill"
                                            width={16}
                                            height={16}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm md:text-base italic text-dark/70 dark:text-white/70 leading-relaxed mb-6">
                                    &ldquo;{t.text}&rdquo;
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-semibold">
                                        {t.initial}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-dark dark:text-white">
                                            {t.name}
                                        </p>
                                        <p className="text-xs text-dark/50 dark:text-white/50 mt-0.5">
                                            {t.detail}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TRUST BAR */}
            <section className="py-10 bg-primary/5 dark:bg-primary/10 border-y border-primary/20">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                        {TRUST.map((t) => (
                            <div
                                key={t.label}
                                className="flex items-center gap-2 text-sm text-dark/70 dark:text-white/70"
                            >
                                <Icon
                                    icon={t.icon}
                                    width={18}
                                    height={18}
                                    className="text-primary"
                                />
                                <span>{t.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LEAD FORM */}
            <section
                id="lead-form"
                className="py-16 md:py-24 bg-[#F8FAFF] dark:bg-white/[0.02]"
            >
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                                Request Your Brief
                            </p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-dark dark:text-white leading-tight mb-5">
                                Get the{" "}
                                <span className="text-primary italic">Full Investor Dossier</span> —
                                Free
                            </h2>
                            <p className="text-base text-dark/60 dark:text-white/60 leading-relaxed mb-7">
                                Our advisory team will prepare a personalised investment analysis
                                across all three projects, benchmarked to your budget and risk
                                profile. No obligation. No spam.
                            </p>
                            <ul className="flex flex-col gap-3">
                                {INCLUDED.map((i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-3 text-sm text-dark/70 dark:text-white/70"
                                    >
                                        <Icon
                                            icon="ph:check-circle-fill"
                                            width={20}
                                            height={20}
                                            className="text-emerald-500 flex-shrink-0 mt-0.5"
                                        />
                                        <span>{i}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <LeadForm />
                    </div>
                </div>
            </section>

            {/* MODAL */}
            {modalOpen && <UnlockModal onClose={closeModal} />}
        </div>
    );
}

/* ── HERO ──────────────────────────────────────────────────────────────── */

function Hero({ onCTA }: { onCTA: () => void }) {
    return (
        <section
            className="relative overflow-hidden text-white  md:pt-44 pb-20 md:pb-28"
            style={{
                background:
                    "linear-gradient(145deg, #0A1F44 0%, #1A3666 50%, #2552A0 100%)",
                    paddingTop: "130px"
            }}
        >
            {/* Grid bg */}
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />

            <div className="container max-w-8xl mx-auto px-5 2xl:px-0 relative pt-44">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-xs tracking-widest uppercase text-white/80 mb-6">
                        <Icon icon="ph:sparkle-fill" width={14} height={14} />
                        Exclusive Investor Intelligence · Gurgaon 2025–2030
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight mb-6">
                        3 Gurgaon Projects
                        <br />
                        That Could{" "}
                        <span className="italic text-amber-300">Double Your Wealth</span>
                        <br />
                        in 5 Years
                    </h1>
                    <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
                        India&rsquo;s fastest-growing luxury corridor is at an inflection point.
                        We&rsquo;ve identified three projects — from pre-launch to early
                        construction — with exceptional 2× return profiles. This is the kind of
                        intelligence HNI and NRI investors rely on Unisel for.
                    </p>

                    <Countdown />

                    <button
                        onClick={onCTA}
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold uppercase tracking-wider text-sm px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(15,115,152,0.5)] hover:shadow-[0_12px_40px_rgba(15,115,152,0.6)] transition-all"
                    >
                        Get the Full Investment Brief
                        <Icon icon="ph:arrow-right" width={18} height={18} />
                    </button>
                    <p className="mt-4 text-xs text-white/50 tracking-wide">
                        No obligation · Free for qualified investors · Response within 2 hours
                    </p>
                </div>
            </div>
        </section>
    );
}

/* ── COUNTDOWN ─────────────────────────────────────────────────────────── */

function Countdown() {
    const endDate = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() + 4);
        d.setHours(d.getHours() + 17);
        d.setMinutes(d.getMinutes() + 42);
        return d;
    }, []);

    const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

    useEffect(() => {
        const tick = () => {
            const diff = endDate.getTime() - Date.now();
            if (diff <= 0) return;
            setTime({
                d: Math.floor(diff / 86400000),
                h: Math.floor((diff % 86400000) / 3600000),
                m: Math.floor((diff % 3600000) / 60000),
                s: Math.floor((diff % 60000) / 1000),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [endDate]);

    const pad = (n: number) => String(n).padStart(2, "0");
    const units = [
        { val: pad(time.d), label: "Days" },
        { val: pad(time.h), label: "Hours" },
        { val: pad(time.m), label: "Mins" },
        { val: pad(time.s), label: "Secs" },
    ];

    return (
        <div className="flex flex-col items-center gap-3 mb-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                Pre-launch advisory window closes in
            </p>
            <div className="flex items-center gap-2">
                {units.map((u, i) => (
                    <div key={u.label} className="flex items-center gap-2">
                        <div className="flex flex-col items-center">
                            <div className="font-mono text-2xl md:text-3xl bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 min-w-[60px] md:min-w-[72px] text-center">
                                {u.val}
                            </div>
                            <p className="text-[9px] uppercase tracking-widest text-white/45 mt-1.5">
                                {u.label}
                            </p>
                        </div>
                        {i < units.length - 1 && (
                            <span className="text-xl text-white/30 -mt-5">:</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── PROJECT CARD ──────────────────────────────────────────────────────── */

function ProjectCard({
    project,
    locked,
    onCTA,
}: {
    project: Project;
    locked: boolean;
    onCTA: () => void;
}) {
    const blurStyle: React.CSSProperties = locked
        ? { filter: "blur(8px)", userSelect: "none", pointerEvents: "none" }
        : {};

    return (
        <div
            className="group relative bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
            style={{ boxShadow: `0 12px 40px -16px ${project.glowFrom}` }}
        >
            {/* Visual header */}
            <div
                className="relative h-44 overflow-hidden"
                style={{ background: project.accent, ...blurStyle }}
            >
                <div
                    className="absolute inset-0 opacity-40 pointer-events-none"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(45deg,rgba(255,255,255,0.06) 0px,rgba(255,255,255,0.06) 1px,transparent 1px,transparent 40px)",
                    }}
                />
                <div
                    className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-30"
                    style={{
                        background: `radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)`,
                    }}
                />
                <span
                    className="absolute top-4 left-4 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-md"
                    style={{ background: project.badgeBg }}
                >
                    {project.badge}
                </span>
                {project.exclusive && (
                    <span className="absolute top-4 right-4 bg-red-500/90 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-md">
                        Exclusive
                    </span>
                )}
                <div className="absolute bottom-4 left-5 right-5">
                    <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-white/80 mb-1">
                        <Icon icon="ph:map-pin-fill" width={12} height={12} />
                        {project.location}
                    </p>
                    <p className="text-xl font-semibold text-white leading-tight">
                        {project.name}
                    </p>
                    <p className="text-xs text-white/65 mt-1">{project.developer}</p>
                </div>
            </div>

            {/* Body */}
            <div className="p-5" style={blurStyle}>
                <div
                    className="grid grid-cols-2 gap-px rounded-lg overflow-hidden mb-5"
                    style={{ background: project.badgeBg + "22" }}
                >
                    {[
                        { v: project.entry, l: "Entry Price" },
                        { v: project.multiplierLabel, l: "5-Yr Return Est." },
                        { v: project.config, l: "Config" },
                        { v: project.possession, l: "Possession" },
                    ].map((m) => (
                        <div
                            key={m.l}
                            className="p-3 dark:bg-black"
                            style={{ background: project.metricBg }}
                        >
                            <p
                                className="font-mono text-base font-semibold leading-none mb-1.5"
                                style={{ color: project.badgeBg }}
                            >
                                {m.v}
                            </p>
                            <p className="text-[9px] uppercase tracking-widest text-dark/55 dark:text-white/55">
                                {m.l}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="text-sm text-dark/70 dark:text-white/70 leading-relaxed mb-4 min-h-[64px]">
                    {project.usp}
                </p>

                <ul className="flex flex-col gap-2 mb-5">
                    {project.reasons.map((r) => (
                        <li
                            key={r}
                            className="flex items-start gap-2 text-xs text-dark/65 dark:text-white/65"
                        >
                            <Icon
                                icon="ph:arrow-right"
                                width={14}
                                height={14}
                                className="flex-shrink-0 mt-0.5"
                                style={{ color: project.badgeBg }}
                            />
                            {r}
                        </li>
                    ))}
                </ul>

                <button
                    onClick={onCTA}
                    className="w-full text-center text-xs font-semibold uppercase tracking-widest py-3 rounded-full transition-colors border-2 hover:text-white"
                    style={{
                        borderColor: project.badgeBg,
                        color: project.badgeBg,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = project.badgeBg;
                        e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = project.badgeBg;
                    }}
                >
                    Request {project.name.split(" ")[0]} Brief
                </button>
            </div>

            {/* Lock overlay */}
            {locked && (
                <button
                    onClick={onCTA}
                    aria-label="Unlock project"
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 hover:bg-dark/40 transition-colors cursor-pointer"
                    style={{ background: "rgba(10,31,68,0.28)" }}
                >
                    <div
                        className="w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center ring-4 ring-white/40"
                        style={{ boxShadow: `0 12px 40px ${project.glowFrom}` }}
                    >
                        <Icon
                            icon="ph:lock-key-fill"
                            width={28}
                            height={28}
                            style={{ color: project.badgeBg }}
                        />
                    </div>
                    <span
                        className="px-4 py-2 rounded-full text-white text-[10px] font-semibold uppercase tracking-widest shadow-lg"
                        style={{ background: project.badgeBg }}
                    >
                        Locked · Tap to unlock
                    </span>
                </button>
            )}
        </div>
    );
}

/* ── ROI SECTION ───────────────────────────────────────────────────────── */

function ROISection() {
    const [val, setVal] = useState(2);
    const aipl = val * 2.3;
    const godrej = val * 2.1;
    const smart = val * 2.2;
    const best = Math.max(aipl, godrej, smart);
    const gain = best - val;

    const rows = [
        { l: "Your Investment", v: `₹${val.toFixed(2)} Cr` },
        { l: "AIPL Lake City (2.3× est.)", v: `₹${aipl.toFixed(2)} Cr` },
        { l: "Godrej Samaris (2.1× est.)", v: `₹${godrej.toFixed(2)} Cr` },
        { l: "Smartworld The Edition (2.2× est.)", v: `₹${smart.toFixed(2)} Cr` },
    ];

    return (
        <section className="py-16 md:py-24 bg-[#F8FAFF] dark:bg-white/[0.02] border-y border-black/10 dark:border-white/10">
            <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                    Your Numbers
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-dark dark:text-white mb-3">
                    What Could Your Investment Become?
                </h2>
                <p className="text-base text-dark/60 dark:text-white/60 mb-10 max-w-md">
                    Drag the slider to model your scenario across all three projects.
                </p>

                <div className="max-w-xl">
                    <label className="block text-xs uppercase tracking-widest text-dark/60 dark:text-white/60 mb-2">
                        Investment Amount
                    </label>
                    <input
                        type="range"
                        min={1}
                        max={20}
                        step={0.5}
                        value={val}
                        onChange={(e) => setVal(parseFloat(e.target.value))}
                        className="w-full accent-primary h-2 cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-dark/60 dark:text-white/60 mt-2">
                        <span>₹1 Cr</span>
                        <span className="font-mono text-primary font-semibold">
                            ₹{val.toFixed(1)} Cr
                        </span>
                        <span>₹20 Cr</span>
                    </div>

                    <div className="mt-7 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6">
                        {rows.map((r) => (
                            <div
                                key={r.l}
                                className="flex justify-between items-center py-2.5 border-b border-black/5 dark:border-white/5 text-sm text-dark/70 dark:text-white/70"
                            >
                                <span>{r.l}</span>
                                <span className="font-mono text-primary">{r.v}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center pt-4 font-semibold text-dark dark:text-white">
                            <span>Best-case 5-Year Value</span>
                            <span className="font-mono text-emerald-600 dark:text-emerald-400 text-lg">
                                ₹{best.toFixed(2)} Cr
                            </span>
                        </div>
                        <div className="flex justify-between items-center pt-2 text-xs text-dark/50 dark:text-white/50">
                            <span>Projected Gain</span>
                            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                                +₹{gain.toFixed(2)} Cr
                            </span>
                        </div>
                    </div>
                </div>

                <p className="text-[11px] text-dark/40 dark:text-white/40 mt-6 max-w-xl leading-relaxed">
                    * Returns are estimates based on market analysis and historical data. Not
                    financial advice. Real estate investments carry risk.
                </p>
            </div>
        </section>
    );
}

/* ── LEAD FORM (bottom) ────────────────────────────────────────────────── */

type Status = "idle" | "loading" | "success" | "error";

function LeadForm() {
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setError("");
        const fd = new FormData(e.currentTarget);
        const payload = {
            fullName: `${fd.get("fname")} ${fd.get("lname") ?? ""}`.trim(),
            phone: fd.get("phone") as string,
            email: fd.get("email") as string,
            budget: fd.get("budget") as string,
            propertyType: fd.get("type") as string,
            propertySlug: (fd.get("project") as string) || null,
            source: "insights-report-bottom-form",
        };
        try {
            const res = await fetch("/api/insights-unlock", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const j = await res.json().catch(() => ({}));
                throw new Error(j.error ?? "Failed");
            }
            setStatus("success");
            setTimeout(() => {
                window.location.href = "/insights-report/full";
            }, 700);
        } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "Network error");
        }
    };

    const fieldCls =
        "w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-dark dark:text-white placeholder:text-dark/40 dark:placeholder:text-white/40 focus-visible:outline-none focus-visible:border-primary";
    const labelCls =
        "block text-[10px] uppercase tracking-widest text-dark/60 dark:text-white/60 mb-2 font-semibold";

    return (
        <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-7 md:p-9 shadow-xl">
            <h3 className="text-2xl font-semibold text-dark dark:text-white mb-2">
                Schedule Your Advisory Call
            </h3>
            <p className="text-sm text-dark/50 dark:text-white/50 mb-6">
                Response within 2 working hours · Mon–Sat, 9am–8pm
            </p>

            <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>First Name</label>
                        <input name="fname" required placeholder="Rahul" className={fieldCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Last Name</label>
                        <input name="lname" placeholder="Sharma" className={fieldCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Mobile Number</label>
                    <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className={fieldCls}
                    />
                </div>
                <div>
                    <label className={labelCls}>Email Address</label>
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        className={fieldCls}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>Investment Budget</label>
                        <select name="budget" className={fieldCls}>
                            <option value="">Select Range</option>
                            <option>₹2–5 Crore</option>
                            <option>₹5–10 Crore</option>
                            <option>₹10–20 Crore</option>
                            <option>₹20 Crore+</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelCls}>I am a</label>
                        <select name="type" className={fieldCls}>
                            <option value="">Select Type</option>
                            <option>Resident Indian (HNI)</option>
                            <option>NRI / OCI</option>
                            <option>Corporate / Family Office</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Project of Interest</label>
                    <select name="project" className={fieldCls}>
                        <option value="">All Three Projects</option>
                        <option>AIPL Lake City — Sector 103</option>
                        <option>Godrej Samaris — Sector 53</option>
                        <option>Smartworld The Edition — Sector 66</option>
                        <option>Help me decide</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold uppercase tracking-wider text-sm py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
                >
                    {status === "loading" && (
                        <Icon icon="ph:spinner-gap" width={18} className="animate-spin" />
                    )}
                    {status === "success" && <Icon icon="ph:check-circle-fill" width={18} />}
                    {status === "idle" && "Send My Investment Brief →"}
                    {status === "loading" && "Sending…"}
                    {status === "success" && "Sent — Opening report"}
                    {status === "error" && "Try Again →"}
                </button>
                {error && (
                    <p className="text-xs text-red-500 text-center">{error}</p>
                )}
                <p className="text-[10px] text-dark/45 dark:text-white/45 text-center leading-relaxed mt-1">
                    By submitting you agree to be contacted by Unisel Realty&rsquo;s advisory team.
                    <br />
                    RERA: RC/HARERA/GGM/1940/1535/2022/308 · No cold calls · No spam.
                </p>
            </form>
        </div>
    );
}

/* ── UNLOCK MODAL ──────────────────────────────────────────────────────── */

function UnlockModal({ onClose }: { onClose: () => void }) {
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");

    useEffect(() => {
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setError("");
        const fd = new FormData(e.currentTarget);
        const payload = {
            fullName: fd.get("fname") as string,
            phone: fd.get("phone") as string,
            email: fd.get("email") as string,
            budget: fd.get("budget") as string,
            propertyType: fd.get("type") as string,
            source: "insights-report",
        };
        try {
            const res = await fetch("/api/insights-unlock", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const j = await res.json().catch(() => ({}));
                throw new Error(j.error ?? "Failed");
            }
            setStatus("success");
            setTimeout(() => {
                window.location.href = "/insights-report/full";
            }, 600);
        } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "Network error");
        }
    };

    const fieldCls =
        "w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-dark dark:text-white placeholder:text-dark/40 dark:placeholder:text-white/40 focus-visible:outline-none focus-visible:border-primary";
    const labelCls =
        "block text-[10px] uppercase tracking-widest text-dark/60 dark:text-white/60 mb-1.5 font-semibold";

    return (
        <div
            onClick={(e) => e.target === e.currentTarget && onClose()}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{
                zIndex: 9999,
                background: "rgba(10,31,68,0.65)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
            }}
        >
            <div
                className="bg-white dark:bg-[#0d1830] rounded-3xl w-full p-8 md:p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto"
                style={{ maxWidth: "520px" }}
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-5 text-dark/40 hover:text-dark dark:text-white/50 dark:hover:text-white text-2xl leading-none"
                >
                    ×
                </button>

                <div className="text-center mb-6">
                    <div className="inline-flex w-14 h-14 rounded-full bg-primary/10 items-center justify-center mb-4">
                        <Icon
                            icon="ph:lock-key-open-fill"
                            width={28}
                            height={28}
                            className="text-primary"
                        />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-2">
                        Exclusive Investor Intelligence
                    </p>
                    <h3 className="text-2xl font-semibold text-dark dark:text-white leading-snug">
                        Unlock All <span className="text-primary italic">3 Project Briefs</span>
                    </h3>
                    <p className="text-sm text-dark/55 dark:text-white/55 mt-2 leading-relaxed">
                        Enter your details to reveal full project names, pricing, return analysis
                        and Unisel&rsquo;s conviction scores.
                    </p>
                </div>

                <ul className="bg-[#F8FAFF] dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-4 mb-6 flex flex-col gap-2">
                    {[
                        "Project names, addresses & developer details",
                        "Entry pricing, return models, possession dates",
                        "Unisel's conviction score & risk assessment",
                        "Direct callback within 2 working hours",
                    ].map((t) => (
                        <li
                            key={t}
                            className="flex items-start gap-2 text-xs text-dark/70 dark:text-white/70"
                        >
                            <Icon
                                icon="ph:check-circle-fill"
                                width={16}
                                className="text-emerald-500 flex-shrink-0 mt-0.5"
                            />
                            {t}
                        </li>
                    ))}
                </ul>

                <form onSubmit={onSubmit} className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-2.5">
                        <div>
                            <label className={labelCls}>First Name</label>
                            <input name="fname" required placeholder="Rahul" className={fieldCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Phone</label>
                            <input
                                name="phone"
                                type="tel"
                                required
                                placeholder="+91 98765 43210"
                                className={fieldCls}
                            />
                        </div>
                    </div>
                    <div>
                        <label className={labelCls}>Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="rahul@example.com"
                            className={fieldCls}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                        <div>
                            <label className={labelCls}>Budget</label>
                            <select name="budget" className={fieldCls}>
                                <option value="">Select</option>
                                <option>₹2–5 Crore</option>
                                <option>₹5–10 Crore</option>
                                <option>₹10–20 Crore</option>
                                <option>₹20 Crore+</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelCls}>I am a</label>
                            <select name="type" className={fieldCls}>
                                <option value="">Select</option>
                                <option>Resident Indian (HNI)</option>
                                <option>NRI / OCI</option>
                                <option>Corporate / Family Office</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading" || status === "success"}
                        className="mt-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold uppercase tracking-wider text-sm py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                        {status === "loading" && (
                            <Icon
                                icon="ph:spinner-gap"
                                width={18}
                                className="animate-spin"
                            />
                        )}
                        {status === "success" && <Icon icon="ph:check-circle-fill" width={18} />}
                        {status === "idle" && "Unlock All 3 Projects Now →"}
                        {status === "loading" && "Unlocking…"}
                        {status === "success" && "Opening report…"}
                        {status === "error" && "Try Again →"}
                    </button>
                    {error && (
                        <p className="text-xs text-red-500 text-center">{error}</p>
                    )}
                    <p className="text-[10px] text-dark/45 dark:text-white/45 text-center mt-1">
                        No spam · No cold calls · RERA: RC/HARERA/GGM/1940/1535/2022/308
                    </p>
                </form>
            </div>
        </div>
    );
}
