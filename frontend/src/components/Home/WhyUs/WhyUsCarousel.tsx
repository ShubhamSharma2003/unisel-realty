"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Pillar {
  icon: string;
  title: string;
  description: string;
  proof: string;
}

const WhyUsCarousel = ({ pillars }: { pillars: Pillar[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplayPlugin.current,
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const onDotClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <>
      {/* Mobile: auto-scroll carousel with dots */}
      <div className="sm:hidden">
        <div ref={emblaRef} className="overflow-hidden -mx-5 px-5">
          <div className="flex gap-4">
            {pillars.map((pillar, index) => (
              <div key={pillar.title} className="min-w-0 flex-[0_0_100%]">
                <PillarCard pillar={pillar} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-3">
          {pillars.map((_, index) => (
            <button
              key={index}
              onClick={() => onDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                selectedIndex === index
                  ? "w-8 h-3 bg-primary"
                  : "w-3 h-3 bg-lightskyblue"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden sm:grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {pillars.map((pillar, index) => (
          <PillarCard key={pillar.title} pillar={pillar} index={index} />
        ))}
      </div>
    </>
  );
};

const PillarCard = ({ pillar, index }: { pillar: Pillar; index: number }) => (
  <div className="relative border border-black/10 dark:border-white/10 rounded-2xl p-8 group hover:border-primary/40 hover:shadow-3xl dark:hover:shadow-white/10 duration-300 overflow-hidden flex flex-col h-full">
    <span className="absolute top-4 right-5 text-7xl font-bold text-black/[0.04] dark:text-white/[0.04] select-none leading-none">
      {String(index + 1).padStart(2, "0")}
    </span>
    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary duration-300 flex-shrink-0">
      <Icon icon={pillar.icon} width={26} height={26} className="text-primary group-hover:text-white duration-300" />
    </div>
    <h3 className="text-xl font-semibold text-dark dark:text-white mb-3 leading-snug">
      {pillar.title}
    </h3>
    <p className="text-dark/50 dark:text-white/50 text-base leading-6 mb-6 flex-1">
      {pillar.description}
    </p>
    <p className="text-xs font-semibold text-primary/80 border-t border-black/[0.06] dark:border-white/[0.06] pt-4 leading-relaxed">
      {pillar.proof}
    </p>
  </div>
);

export default WhyUsCarousel;
