"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";

const HeroContent = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loadSecondarySlide, setLoadSecondarySlide] = useState(false);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 15000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplayPlugin.current,
  ]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoadSecondarySlide(true);
    }, 12000);

    return () => window.clearTimeout(timer);
  }, []);

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

  const scrollTo = useCallback(
    (index: number) => {
      if (index > 0) {
        setLoadSecondarySlide(true);
      }
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const slides = [
    <Slide2 key="slide2" priority />,
    loadSecondarySlide ? (
      <Slide1 key="slide1" />
    ) : (
      <div key="slide1-placeholder" className="h-full w-full bg-black" aria-hidden="true" />
    ),
  ];

  return (
    <div className="relative overflow-hidden" style={{ height: "100svh" }}>
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full" style={{ touchAction: "pan-y pinch-zoom" }}>
          {slides.map((slide, index) => (
            <div key={index} className="min-w-0 h-full" style={{ flex: "0 0 100%" }}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/25 backdrop-blur-sm rounded-full z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              selectedIndex === index ? "bg-white w-6" : "bg-white/50 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroContent;
