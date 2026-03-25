"use client";

import dynamic from "next/dynamic";
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
  return <MapClient properties={properties} />;
}
