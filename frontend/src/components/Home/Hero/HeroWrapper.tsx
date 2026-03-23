"use client";

import dynamic from "next/dynamic";

const HeroContent = dynamic(() => import("./HeroContent"), {
  ssr: false,
  loading: () => <div style={{ height: "100svh" }} />,
});

export default function HeroWrapper() {
  return <HeroContent />;
}
