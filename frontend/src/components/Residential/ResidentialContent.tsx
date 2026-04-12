"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  TRUST_SIGNALS,
  EVALUATION_CRITERIA,
  CORRIDORS,
  BUYER_PERSONAS,
  DUE_DILIGENCE_DATA,
  BUYERS_GUIDE_SECTIONS,
  RESIDENTIAL_FAQS,
  DEVELOPER_PARTNERS,
  UNISEL_ADVANTAGES,
  TESTIMONIALS,
} from "./residentialData";
import { useScrollReveal, useStaggerReveal } from "@/lib/useScrollReveal";

/* ── Reusable fade-up wrapper ── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Mobile carousel with dot indicators ── */
function MobileCarousel({
  children,
  itemCount,
  autoplayDelay = 4000,
}: {
  children: React.ReactNode[];
  itemCount: number;
  autoplayDelay?: number;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayPlugin = useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplayPlugin.current]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const onDotClick = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <div>
      <div ref={emblaRef} className="overflow-hidden -mx-5 px-5">
        <div className="flex gap-4">
          {children.map((child, i) => (
            <div key={i} className="min-w-0 flex-[0_0_85%]">
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1.5 mt-4">
        {Array.from({ length: itemCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              selectedIndex === i
                ? "w-5 h-2 bg-primary"
                : "w-2 h-2 bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const ResidentialContent = () => {
  const [activeCorridor, setActiveCorridor] = useState(0);
  const [activePersona, setActivePersona] = useState(0);
  const corridor = CORRIDORS[activeCorridor];
  const persona = BUYER_PERSONAS[activePersona];

  // Stagger hooks for desktop grid sections
  const evalStagger = useStaggerReveal(EVALUATION_CRITERIA.length, { staggerDelay: 60 });
  const advantagesStagger = useStaggerReveal(UNISEL_ADVANTAGES.length, { staggerDelay: 80 });
  const testimonialsStagger = useStaggerReveal(TESTIMONIALS.length, { staggerDelay: 100 });

  return (
    <article className="container max-w-8xl mx-auto px-5 2xl:px-0">

        {/* ── Page meta: author + freshness ── */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-dark/40 dark:text-white/40 mb-8">
          <p>Curated by the Unisel Realty Residential Advisory Team &middot; <Link href="/about" className="underline hover:text-primary transition-colors">About our team</Link></p>
          <p>Last updated: April 2026</p>
        </div>

        {/* ── Trust signals ── */}
        <Reveal className="mb-12">
          <div className="bg-dark/5 dark:bg-white/5 rounded-2xl p-6 lg:p-8 border border-dark/10 dark:border-white/10">
            <ul className="space-y-3">
              {TRUST_SIGNALS.map((signal, i) => (
                <li key={i} className="flex items-start gap-3 text-dark/70 dark:text-white/70 text-base leading-relaxed">
                  <span className="text-primary mt-0.5 flex-shrink-0">&#10003;</span>
                  {signal}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ── Why this matters ── */}
        <Reveal className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white leading-tight mb-6">
            Gurgaon Has No Shortage of Properties. It Has a Shortage of Good Advice.
          </h2>
          <div className="space-y-5 text-dark/70 dark:text-white/70 text-base leading-[1.75]">
            <p>
              Every buyer we have worked with — whether a first-time upgrader, a seasoned HNI investor, or an NRI planning a return — has said the same thing after the transaction: &ldquo;I wish I had found you sooner.&rdquo;
            </p>
            <p>
              Gurgaon&apos;s premium apartment market is deep and sophisticated, but it is also noisy. Property portals list everything. Developer sales teams tell you only what sells. Brokers often push whichever project pays the highest commission. The result is that buyers — even experienced, financially sharp buyers — regularly make decisions they regret.
            </p>
            <p>
              At Unisel Realty, our model is different. We are authorised channel partners for eight of India&apos;s most respected developers, which means we have access to every major high-end apartment and villa project at direct developer pricing. But our business does not depend on pushing any single project. Our repeat-client rate and word-of-mouth referrals depend on one thing only: whether our clients look back at their purchase five years later and feel it was the right decision.
            </p>
            <p>
              That is why we maintain a curated portfolio, not an exhaustive one. Every project listed below has passed our internal evaluation across developer credibility, <Link href="https://haryanarera.gov.in/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">RERA compliance</Link>, carpet efficiency, construction quality, location growth thesis, and resale liquidity. Most projects we are approached about do not make the cut.
            </p>
          </div>
        </Reveal>

        {/* ── 7-Point Evaluation ── */}
        <Reveal className="mb-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white leading-tight">
            Our 7-Point Evaluation — What Every Project Must Pass
          </h2>
        </Reveal>
        <Reveal className="mb-8" delay={80}>
          <p className="text-dark/60 dark:text-white/60 text-base leading-relaxed">
            Before any project enters our residential portfolio, our advisory team evaluates it against seven non-negotiable criteria. This process typically takes 4–6 weeks and involves site visits, developer due diligence, and review of RERA filings.
          </p>
        </Reveal>

        {/* Mobile: carousel */}
        <div className="sm:hidden mb-12">
          <MobileCarousel itemCount={EVALUATION_CRITERIA.length} autoplayDelay={3500}>
            {EVALUATION_CRITERIA.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-dark/[0.03] dark:bg-white/[0.03] border border-dark/5 dark:border-white/5 h-full"
              >
                <span className="text-2xl text-primary leading-none flex-shrink-0">{item.number}</span>
                <div>
                  <h3 className="text-sm font-semibold text-dark dark:text-white mb-1">{item.title}</h3>
                  <p className="text-dark/60 dark:text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </MobileCarousel>
        </div>

        {/* Desktop: staggered grid */}
        <div ref={evalStagger.ref} className="hidden sm:grid sm:grid-cols-2 gap-4 mb-12">
          {EVALUATION_CRITERIA.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl bg-dark/[0.03] dark:bg-white/[0.03] border border-dark/5 dark:border-white/5"
              style={evalStagger.getStaggerStyle(i)}
            >
              <span className="text-2xl text-primary leading-none flex-shrink-0">{item.number}</span>
              <div>
                <h3 className="text-sm font-semibold text-dark dark:text-white mb-1">{item.title}</h3>
                <p className="text-dark/60 dark:text-white/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Location Intelligence ── */}
        <Reveal className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white leading-tight mb-3">
            Gurgaon&apos;s Three Luxury Residential Corridors — Compared
          </h2>
          <p className="text-dark/60 dark:text-white/60 text-base leading-relaxed">
            Each corridor serves a distinct buyer profile and investment objective. Understanding the differences — not just the headlines — is where most buyers save or lose significant capital.
          </p>
        </Reveal>

        <Reveal className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {CORRIDORS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActiveCorridor(i)}
                className={`text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                  activeCorridor === i
                    ? "bg-primary text-white border-primary"
                    : "bg-dark/5 dark:bg-white/5 border-dark/10 dark:border-white/10 hover:border-primary/40"
                }`}
              >
                <span className={`text-[10px] tracking-wider uppercase ${activeCorridor === i ? "text-white/70" : "text-dark/50 dark:text-white/50"}`}>
                  {c.sectors}
                </span>
                <span className={`block text-base font-semibold ${activeCorridor === i ? "text-white" : "text-dark dark:text-white"}`}>
                  {c.name}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Price Range", value: corridor.priceRange },
            { label: "Per Sq Ft (BSP)", value: corridor.perSqFt },
            { label: "Config", value: corridor.config },
            { label: "Annual Appreciation", value: corridor.appreciation },
          ].map((stat, i) => (
            <div key={i} className="bg-dark/[0.03] dark:bg-white/[0.03] rounded-lg p-3 border border-dark/5 dark:border-white/5">
              <span className="text-[10px] tracking-wider uppercase text-dark/50 dark:text-white/50">{stat.label}</span>
              <span className="block text-sm sm:text-base font-semibold text-dark dark:text-white">{stat.value}</span>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-dark dark:text-white mb-3">Featured Projects — {corridor.name}</h3>
        <ul className="space-y-2 mb-4">
          {corridor.projects.map((project, i) => (
            <li key={i} className="flex items-start gap-2 text-dark/70 dark:text-white/70 text-base">
              <span className="text-primary mt-0.5 flex-shrink-0">—</span>
              {project}
            </li>
          ))}
        </ul>
        <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg p-5 mb-12">
          <h4 className="text-sm font-semibold text-primary mb-2">Who Should Buy Here</h4>
          <p className="text-dark/70 dark:text-white/70 text-base leading-relaxed">{corridor.buyerProfile}</p>
        </div>

        {/* ── Buyer Personas ── */}
        <Reveal className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white leading-tight mb-3">
            The Right Property Depends on Who You Are
          </h2>
          <p className="text-dark/60 dark:text-white/60 text-base leading-relaxed">
            A good advisor asks different questions than a good salesperson. Before we talk projects, we talk about you — your timeline, your family&apos;s needs, your wealth goals, and your risk tolerance.
          </p>
        </Reveal>

        <Reveal className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {BUYER_PERSONAS.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePersona(i)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all duration-200 ${
                  activePersona === i
                    ? "bg-primary text-white border-primary"
                    : "bg-dark/5 dark:bg-white/5 border-dark/10 dark:border-white/10 hover:border-primary/40"
                }`}
              >
                <Icon icon={p.icon} width={24} height={24} className={activePersona === i ? "text-white" : "text-primary"} />
                <span className={`text-xs font-semibold text-center ${activePersona === i ? "text-white" : "text-dark dark:text-white"}`}>{p.title}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="mb-12">
          <div className="bg-dark/[0.03] dark:bg-white/[0.03] rounded-xl p-5 border border-dark/5 dark:border-white/5">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-1">{persona.title}: {persona.subtitle}</h3>
            <p className="text-dark/70 dark:text-white/70 text-base leading-relaxed mb-4">{persona.description}</p>
            <ul className="space-y-2">
              {persona.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-dark/70 dark:text-white/70 text-base">
                  <span className="text-primary mt-0.5 flex-shrink-0">—</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ── Due Diligence ── */}
        <Reveal className="mb-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white leading-tight">
            Due Diligence Checklist — What to Compare Before Booking
          </h2>
        </Reveal>
        <Reveal className="mb-6" delay={80}>
          <p className="text-dark/60 dark:text-white/60 text-base leading-relaxed">
            This is the checklist our advisory team runs through before recommending any project. Use it as a buyer — regardless of who advises you.
          </p>
        </Reveal>

        {/* Mobile: swipeable cards */}
        <div className="sm:hidden mb-12">
          <MobileCarousel itemCount={DUE_DILIGENCE_DATA.length} autoplayDelay={4500}>
            {DUE_DILIGENCE_DATA.map((row, i) => (
              <div key={i} className="rounded-xl border border-dark/10 dark:border-white/10 bg-dark/[0.02] dark:bg-white/[0.02] p-4 h-full space-y-3">
                <h3 className="text-base font-semibold text-dark dark:text-white">{row.parameter}</h3>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-dark/40 dark:text-white/40">What to Look For</span>
                  <p className="text-sm text-dark/70 dark:text-white/70 mt-0.5">{row.whatToLookFor}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-red-500/70">Red Flag</span>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-0.5">{row.redFlag}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-primary/70">Unisel Standard</span>
                  <p className="text-sm text-primary font-medium mt-0.5">&#10003; {row.uniselStandard}</p>
                </div>
              </div>
            ))}
          </MobileCarousel>
        </div>

        {/* Desktop: table */}
        <Reveal className="hidden sm:block mb-12">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-white text-left">
                  <th className="px-3 py-2.5 font-semibold rounded-tl-lg">Parameter</th>
                  <th className="px-3 py-2.5 font-semibold">What to Look For</th>
                  <th className="px-3 py-2.5 font-semibold">Red Flag</th>
                  <th className="px-3 py-2.5 font-semibold rounded-tr-lg">Unisel Standard</th>
                </tr>
              </thead>
              <tbody>
                {DUE_DILIGENCE_DATA.map((row, i) => (
                  <tr key={i} className={`border-b border-dark/10 dark:border-white/10 ${i % 2 === 0 ? "bg-dark/[0.02] dark:bg-white/[0.02]" : ""}`}>
                    <td className="px-3 py-2.5 font-semibold text-dark dark:text-white">{row.parameter}</td>
                    <td className="px-3 py-2.5 text-dark/70 dark:text-white/70">{row.whatToLookFor}</td>
                    <td className="px-3 py-2.5 text-red-600 dark:text-red-400">{row.redFlag}</td>
                    <td className="px-3 py-2.5 text-primary font-medium">&#10003; {row.uniselStandard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* ── Buyer's Knowledge Base ── */}
        <Reveal className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white leading-tight mb-3">
            The Complete Guide to Buying Premium Homes in Gurgaon
          </h2>
          <p className="text-dark/60 dark:text-white/60 text-base leading-relaxed mb-6">
            Everything you need to understand before making a high-end property purchase in Gurgaon — from pricing mechanics to appreciation patterns. For more insights, explore our <Link href="/blog" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">market analysis blog</Link>.
          </p>
          <Accordion type="single" defaultValue="item-0" collapsible className="w-full flex flex-col gap-3">
            {BUYERS_GUIDE_SECTIONS.map((section, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{section.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="whitespace-pre-line leading-relaxed">{section.content}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        {/* ── Developer Partners ── */}
        <Reveal className="mb-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white leading-tight">
            Our Developer Partnerships
          </h2>
        </Reveal>
        <Reveal className="mb-6" delay={80}>
          <p className="text-dark/60 dark:text-white/60 text-base leading-relaxed">
            As an authorised channel partner, our clients receive direct developer pricing, pre-launch inventory access, and verified RERA documentation — with none of the inflated pricing that third-party portals sometimes carry.
          </p>
        </Reveal>

        {/* Mobile: swipeable cards */}
        <div className="sm:hidden mb-12">
          <MobileCarousel itemCount={DEVELOPER_PARTNERS.length} autoplayDelay={3000}>
            {DEVELOPER_PARTNERS.map((partner, i) => (
              <div key={i} className="rounded-xl border border-dark/10 dark:border-white/10 bg-dark/[0.02] dark:bg-white/[0.02] p-4 h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-dark dark:text-white">{partner.name}</h3>
                  {partner.felicitated && <span className="text-yellow-500 text-lg">&#9733;</span>}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark/40 dark:text-white/40 uppercase tracking-wider">Segment</span>
                    <span className="text-sm text-dark/70 dark:text-white/70">{partner.segment}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark/40 dark:text-white/40 uppercase tracking-wider">Corridors</span>
                    <span className="text-sm text-dark/70 dark:text-white/70 text-right">{partner.corridors}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark/40 dark:text-white/40 uppercase tracking-wider">Status</span>
                    <span className={`text-sm font-medium ${partner.felicitated ? "text-primary" : "text-dark/60 dark:text-white/60"}`}>
                      {partner.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </MobileCarousel>
        </div>

        {/* Desktop: table */}
        <Reveal className="hidden sm:block mb-12">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px] border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-white text-left">
                  <th className="px-3 py-2.5 font-semibold rounded-tl-lg">Developer</th>
                  <th className="px-3 py-2.5 font-semibold">Segment</th>
                  <th className="px-3 py-2.5 font-semibold">Key Corridors</th>
                  <th className="px-3 py-2.5 font-semibold rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {DEVELOPER_PARTNERS.map((partner, i) => (
                  <tr key={i} className={`border-b border-dark/10 dark:border-white/10 ${i % 2 === 0 ? "bg-dark/[0.02] dark:bg-white/[0.02]" : ""}`}>
                    <td className="px-3 py-2.5 font-semibold text-dark dark:text-white">{partner.name}</td>
                    <td className="px-3 py-2.5 text-dark/70 dark:text-white/70">{partner.segment}</td>
                    <td className="px-3 py-2.5 text-dark/70 dark:text-white/70">{partner.corridors}</td>
                    <td className="px-3 py-2.5">
                      <span className={`text-sm font-medium ${partner.felicitated ? "text-primary" : "text-dark/60 dark:text-white/60"}`}>
                        {partner.felicitated && <span className="text-yellow-500 mr-1">&#9733;</span>}
                        {partner.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* ── The Unisel Advantage ── */}
        <Reveal className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white leading-tight">
            Why 1,500+ Clients Have Chosen Unisel Realty
          </h2>
        </Reveal>

        {/* Mobile: carousel */}
        <div className="sm:hidden mb-12">
          <MobileCarousel itemCount={UNISEL_ADVANTAGES.length} autoplayDelay={4000}>
            {UNISEL_ADVANTAGES.map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-dark/[0.03] dark:bg-white/[0.03] border border-dark/5 dark:border-white/5 h-full">
                <span className="text-3xl font-bold text-primary/20 leading-none">{item.number}</span>
                <h3 className="text-sm font-semibold text-dark dark:text-white mt-2 mb-1">{item.title}</h3>
                <p className="text-dark/60 dark:text-white/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </MobileCarousel>
        </div>

        {/* Desktop: staggered grid */}
        <div ref={advantagesStagger.ref} className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {UNISEL_ADVANTAGES.map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-dark/[0.03] dark:bg-white/[0.03] border border-dark/5 dark:border-white/5"
              style={advantagesStagger.getStaggerStyle(i)}
            >
              <span className="text-3xl font-bold text-primary/20 leading-none">{item.number}</span>
              <h3 className="text-sm font-semibold text-dark dark:text-white mt-2 mb-1">{item.title}</h3>
              <p className="text-dark/60 dark:text-white/60 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* ── Testimonials ── */}
        <Reveal className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white leading-tight">
            What Our Clients Say
          </h2>
        </Reveal>

        {/* Mobile: carousel */}
        <div className="sm:hidden mb-12">
          <MobileCarousel itemCount={TESTIMONIALS.length} autoplayDelay={5000}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-5 rounded-xl bg-dark/[0.03] dark:bg-white/[0.03] border border-dark/5 dark:border-white/5 h-full flex flex-col">
                <p className="text-dark/70 dark:text-white/70 text-base leading-relaxed mb-4 italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-xs font-semibold text-dark dark:text-white uppercase tracking-wide">{t.author}</p>
                  <p className="text-xs text-dark/50 dark:text-white/50 mt-0.5">{t.detail}</p>
                </div>
              </div>
            ))}
          </MobileCarousel>
        </div>

        {/* Desktop: staggered grid */}
        <div ref={testimonialsStagger.ref} className="hidden sm:grid md:grid-cols-2 gap-4 mb-12">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-dark/[0.03] dark:bg-white/[0.03] border border-dark/5 dark:border-white/5"
              style={testimonialsStagger.getStaggerStyle(i)}
            >
              <p className="text-dark/70 dark:text-white/70 text-base leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-xs font-semibold text-dark dark:text-white uppercase tracking-wide">{t.author}</p>
              <p className="text-xs text-dark/50 dark:text-white/50 mt-0.5">{t.detail}</p>
            </div>
          ))}
        </div>

        {/* ── FAQ ── */}
        <Reveal className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white leading-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-dark/60 dark:text-white/60 text-base leading-relaxed mb-6">
            Real answers to the questions homebuyers and investors actually ask about residential properties in Gurgaon.
          </p>
          <Accordion type="single" defaultValue="faq-0" collapsible className="w-full flex flex-col gap-3">
            {RESIDENTIAL_FAQS.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        {/* ── CTA ── */}
        <Reveal className="mb-4">
          <div className="bg-primary rounded-2xl p-8 lg:p-10 text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight mb-3">
              Book a Free Consultation
            </h2>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto mb-6">
              Tell us your budget, corridor preference, and timeline. We&apos;ll come back with three or four projects that genuinely fit — and tell you honestly why each one does and doesn&apos;t work for your situation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <Link href="tel:8010303303" className="bg-white text-dark py-2.5 px-6 rounded-full font-semibold hover:bg-dark hover:text-white transition-all duration-300 text-sm">
                Call 8010-303-303
              </Link>
              <Link href="/contact" className="border-2 border-white text-white py-2.5 px-6 rounded-full font-semibold hover:bg-white hover:text-dark transition-all duration-300 text-sm">
                Contact Us
              </Link>
            </div>
            <p className="text-white/50 text-xs">
              Zero brokerage &middot; No obligation &middot; Response within 2 hours
            </p>
            <p className="text-white/40 text-xs mt-2">
              408, 4th Floor, Adani Miracle Mile, Sector 60, Gurgaon 122102
            </p>
          </div>
        </Reveal>

    </article>
  );
};

export default ResidentialContent;
