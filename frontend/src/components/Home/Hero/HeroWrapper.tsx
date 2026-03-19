"use client";

import dynamic from "next/dynamic";
import type { HeroBanner } from "@/types/hero";

const HeroContent = dynamic(() => import("./HeroContent"), { ssr: false });

type HeroWrapperProps = {
  banners: HeroBanner[];
};

export default function HeroWrapper({ banners }: HeroWrapperProps) {
  return <HeroContent banners={banners} />;
}
