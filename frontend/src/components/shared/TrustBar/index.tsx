"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useRef, useState } from "react";

type TrustItem = {
    prefix?: string;
    value: number;
    suffix: string;
    label: string;
};

const trustItems: TrustItem[] = [
    { value: 20, suffix: "+", label: "Years in Gurgaon" },
    { prefix: "$", value: 2, suffix: "B+", label: "Transacted" },
    { value: 10000, suffix: "+", label: "Families Served" },
    { value: 90, suffix: "%", label: "Client Retention" },
];

function StatBlock({ item, active, index }: { item: TrustItem; active: boolean; index: number }) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (!active) {
            setIsAnimating(false);
            return;
        }

        const timer = setTimeout(() => {
            setIsAnimating(true);
        }, index * 150);

        return () => clearTimeout(timer);
    }, [active, index]);

    return (
        <div
            className={`group flex flex-col items-center justify-center px-8 py-8 flex-1 min-w-[160px] gap-1 transition-all duration-700 ${
                isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
            style={{
                transitionDelay: isAnimating ? "0ms" : "0ms",
            }}
        >
            <div className="relative">
                {isAnimating && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-lg rounded-lg animate-pulse" />
                )}
                <span className="relative text-3xl sm:text-4xl font-bold text-white tracking-tight tabular-nums leading-none">
                    <NumberFlow
                        value={isAnimating ? item.value : 0}
                        prefix={item.prefix}
                        suffix={item.suffix}
                        transformTiming={{ duration: 600, easing: "ease-out" }}
                        spinTiming={{ duration: 600, easing: "ease-out" }}
                        opacityTiming={{ duration: 250, easing: "ease-out" }}
                    />
                </span>
            </div>
            <span className="text-white/50 text-xs sm:text-sm font-medium tracking-widest uppercase text-center group-hover:text-white/70 transition-colors">
                {item.label}
            </span>
        </div>
    );
}

const TrustBar = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setActive(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="bg-primary border-y border-white/10">
            <div className="max-w-6xl mx-auto flex flex-wrap justify-center">
                {trustItems.map((item, i) => (
                    <div key={i} className="flex items-stretch">
                        <StatBlock item={item} active={active} index={i} />
                        {i < trustItems.length - 1 && (
                            <div className="self-center h-8 w-px bg-white/15 flex-shrink-0" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrustBar;
