"use client";

import { useRef, useCallback } from "react";
import { Icon } from "@iconify/react";
import PropertyCard from "./Card/Card";
import type { PropertyHomes } from "@/types/properyHomes";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const PropertySlider = ({ properties }: { properties: PropertyHomes[] }) => {
  // Mobile: auto-scroll single card
  const mobileAutoplay = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [mobileRef] = useEmblaCarousel({ loop: true }, [mobileAutoplay.current]);

  // Desktop: 3 cards visible, manual nav
  const [desktopRef, desktopApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 3,
    align: "start",
  });

  const scrollPrev = useCallback(() => desktopApi?.scrollPrev(), [desktopApi]);
  const scrollNext = useCallback(() => desktopApi?.scrollNext(), [desktopApi]);

  return (
    <>
      {/* Mobile carousel */}
      <div className="md:hidden">
        <div ref={mobileRef} className="overflow-hidden -mx-5 px-5">
          <div className="flex ml-[-0.75rem]">
            {properties.map((item, index) => (
              <div key={item.slug || index} className="min-w-0 flex-[0_0_85%] pl-3">
                <PropertyCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop carousel */}
      <div className="hidden md:block">
        <div ref={desktopRef} className="overflow-hidden">
          <div className="flex ml-[-2.5rem]">
            {properties.map((item, index) => (
              <div key={item.slug || index} className="min-w-0 flex-[0_0_33.333%] pl-10">
                <PropertyCard item={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={scrollPrev}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors duration-200"
            aria-label="Previous"
          >
            <Icon icon="ph:arrow-left-bold" width={22} />
          </button>
          <button
            onClick={scrollNext}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white hover:bg-primary/85 transition-colors duration-200"
            aria-label="Next"
          >
            <Icon icon="ph:arrow-right-bold" width={22} />
          </button>
        </div>
      </div>
    </>
  );
};

export default PropertySlider;
