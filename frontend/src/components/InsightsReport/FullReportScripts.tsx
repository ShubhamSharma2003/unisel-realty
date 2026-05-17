"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function FullReportScripts({
    inlineScripts,
}: {
    inlineScripts: string[];
}) {
    useEffect(() => {
        // Wait until Chart.js is loaded, then execute inline scripts that
        // reference it (the original full.html relied on a synchronous load).
        const run = () => {
            inlineScripts.forEach((src) => {
                try {
                    const fn = new Function(src);
                    fn();
                } catch (err) {
                    console.error("Insights full-report inline script error:", err);
                }
            });
        };

        // Check repeatedly until Chart is available, capped.
        let tries = 0;
        const id = setInterval(() => {
            tries++;
            if (
                typeof window !== "undefined" &&
                (window as unknown as { Chart?: unknown }).Chart
            ) {
                clearInterval(id);
                run();
            } else if (tries > 80) {
                // ~8s timeout — run anyway (charts will fail but DOM logic runs)
                clearInterval(id);
                run();
            }
        }, 100);

        return () => clearInterval(id);
    }, [inlineScripts]);

    return (
        <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"
            strategy="afterInteractive"
        />
    );
}
