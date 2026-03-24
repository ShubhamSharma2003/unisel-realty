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
    { value: 2000, suffix: "+", label: "Families Served" },
    { value: 75, suffix: "%", label: "Repeat Client Rate" },
];

function StatBlock({ item, active }: { item: TrustItem; active: boolean }) {
    return (
        <div className="group flex flex-col items-center justify-center px-8 py-8 flex-1 min-w-[160px] gap-1">
            <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight tabular-nums leading-none">
                <NumberFlow
                    value={active ? item.value : 0}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    transformTiming={{ duration: 600, easing: "ease-out" }}
                    spinTiming={{ duration: 600, easing: "ease-out" }}
                    opacityTiming={{ duration: 250, easing: "ease-out" }}
                />
            </span>
            <span className="text-white/50 text-xs sm:text-sm font-medium tracking-widest uppercase text-center">
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
                        <StatBlock item={item} active={active} />
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
