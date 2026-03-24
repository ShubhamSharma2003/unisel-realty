"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useRef, useState } from "react";

type StatItem = {
    prefix?: string;
    value: number;
    suffix: string;
    label: string;
};

const stats: StatItem[] = [
    { prefix: "$", value: 2, suffix: "B+", label: "Transacted Value" },
    { value: 2000, suffix: "+", label: "Families Served" },
    { value: 20, suffix: "+", label: "Years of Expertise" },
    { value: 75, suffix: "%", label: "Repeat Client Rate" },
];

export default function AnimatedStats() {
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
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                    <p className="text-3xl sm:text-4xl font-semibold text-primary mb-1 tabular-nums">
                        <NumberFlow
                            value={active ? stat.value : 0}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                            transformTiming={{ duration: 600, easing: "ease-out" }}
                            spinTiming={{ duration: 600, easing: "ease-out" }}
                            opacityTiming={{ duration: 250, easing: "ease-out" }}
                        />
                    </p>
                    <p className="text-sm text-dark/60 dark:text-white/60">{stat.label}</p>
                </div>
            ))}
        </div>
    );
}
