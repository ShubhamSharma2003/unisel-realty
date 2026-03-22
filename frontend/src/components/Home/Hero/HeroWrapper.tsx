"use client";

import dynamic from "next/dynamic";

const HeroContent = dynamic(() => import("./HeroContent"), { ssr: false });

export default function HeroWrapper() {
  return <HeroContent />;
}
