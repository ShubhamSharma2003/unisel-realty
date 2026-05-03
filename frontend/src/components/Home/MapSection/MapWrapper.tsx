"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { PropertyHomes } from "@/types/properyHomes";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[500px] rounded-2xl bg-gray-100 dark:bg-white/5 animate-pulse flex items-center justify-center">
      <p className="text-gray-400">Loading map...</p>
    </div>
  ),
});

export default function MapWrapper({ properties }: { properties: PropertyHomes[] }) {
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldLoadMap) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadMap(true);
        observer.disconnect();
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldLoadMap]);

  return (
    <div ref={containerRef}>
      {shouldLoadMap ? (
        <MapClient properties={properties} />
      ) : (
        <div className="w-full min-h-[500px] rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
          <p className="text-gray-400">Interactive map</p>
        </div>
      )}
    </div>
  );
}
