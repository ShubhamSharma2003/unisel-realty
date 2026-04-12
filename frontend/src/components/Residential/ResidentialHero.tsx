"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import NumberFlow from "@number-flow/react";
import { useEffect, useRef, useState } from "react";
import { HERO_STATS } from "./residentialData";
import { useScrollReveal } from "@/lib/useScrollReveal";

function StatBlock({
  item,
  active,
  index,
}: {
  item: (typeof HERO_STATS)[number];
  active: boolean;
  index: number;
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!active) {
      setIsAnimating(false);
      return;
    }
    const timer = setTimeout(() => setIsAnimating(true), index * 150);
    return () => clearTimeout(timer);
  }, [active, index]);

  return (
    <div
      className={`flex flex-col items-center justify-center px-4 sm:px-8 py-6 flex-1 min-w-[140px] gap-1 transition-all duration-700 ${
        isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-50"
      }`}
    >
      <span className="relative text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight tabular-nums leading-none">
        {item.isYear ? (
          <NumberFlow
            value={isAnimating ? item.value : 2000}
            transformTiming={{ duration: 600, easing: "ease-out" }}
            spinTiming={{ duration: 600, easing: "ease-out" }}
            opacityTiming={{ duration: 250, easing: "ease-out" }}
          />
        ) : (
          <NumberFlow
            value={isAnimating ? item.value : 0}
            suffix={item.suffix}
            transformTiming={{ duration: 600, easing: "ease-out" }}
            spinTiming={{ duration: 600, easing: "ease-out" }}
            opacityTiming={{ duration: 250, easing: "ease-out" }}
          />
        )}
      </span>
      <span className="text-white/50 text-[10px] sm:text-xs font-medium tracking-widest uppercase text-center">
        {item.label}
      </span>
    </div>
  );
}

const ResidentialHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="text-center !pt-40 pb-0 relative overflow-hidden">
      <div ref={heroRef} className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div
          className="flex gap-2.5 items-center justify-center"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 600ms ease-out, transform 600ms ease-out",
          }}
        >
          <Icon
            icon="ph:house-simple-fill"
            width={20}
            height={20}
            className="text-primary"
          />
          <p className="text-sm font-semibold text-dark/75 dark:text-white/75 uppercase tracking-widest">
            Residential Portfolio &middot; Gurgaon
          </p>
        </div>
        <h1
          className="text-dark text-3xl sm:text-40 lg:text-52 relative font-bold dark:text-white leading-tight mt-4"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 600ms ease-out 100ms, transform 600ms ease-out 100ms",
          }}
        >
          Luxury Residential Properties in Gurgaon
        </h1>
        <p
          className="text-lg text-dark/50 dark:text-white/50 font-normal max-w-3xl mx-auto mt-4"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 600ms ease-out 200ms, transform 600ms ease-out 200ms",
          }}
        >
          Chosen With Conviction — Curated for the Discerning Buyer
        </p>
        <p
          className="text-base text-dark/60 dark:text-white/60 max-w-3xl mx-auto mt-4 leading-relaxed"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 600ms ease-out 300ms, transform 600ms ease-out 300ms",
          }}
        >
          Over 30 premium apartments and luxury flats across Golf Course Road, Golf
          Course Extension Road, and Dwarka Expressway — hand-picked by Unisel
          Realty&apos;s team of 20+ advisors with 18 years of on-ground
          expertise in Gurgaon&apos;s high-end real estate market.
        </p>
      </div>

      <div ref={ref} className="bg-primary mt-10 border-y border-white/10">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center">
          {HERO_STATS.map((item, i) => (
            <div key={i} className="flex items-stretch">
              <StatBlock item={item} active={active} index={i} />
              {i < HERO_STATS.length - 1 && (
                <div className="self-center h-8 w-px bg-white/15 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResidentialHero;
