"use client";

import dynamic from "next/dynamic";

const EMICalculator = dynamic(() => import("./index"), { ssr: false });

export default function EMICalculatorWrapper({
  propertyRate,
}: {
  propertyRate?: string | number;
}) {
  return <EMICalculator propertyRate={propertyRate} />;
}
