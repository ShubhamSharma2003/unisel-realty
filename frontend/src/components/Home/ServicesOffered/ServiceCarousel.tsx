"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Service {
  icon: string;
  badge: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

const ServiceCarousel = ({ services }: { services: Service[] }) => {
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

  const onTabClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <>
      {/* Mobile: tabs + single-card auto-scroll carousel */}
      <div className="md:hidden">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 -mx-5 px-5">
          {services.map((service, index) => (
            <button
              key={service.badge}
              onClick={() => onTabClick(index)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium shrink-0 transition-colors duration-200 ${
                selectedIndex === index
                  ? "bg-primary text-white"
                  : "bg-primary/10 text-primary"
              }`}
            >
              <Icon icon={service.icon} width={16} height={16} />
              {service.badge}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden -mx-5 px-5">
          <div className="flex gap-4">
            {services.map((service) => (
              <div
                key={service.badge}
                className="min-w-0 flex-[0_0_100%]"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.badge} service={service} />
        ))}
      </div>
    </>
  );
};

const ServiceCard = ({ service }: { service: Service }) => (
  <div className="group border border-black/10 dark:border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-primary/40 dark:hover:border-primary/40 hover:shadow-3xl duration-300 dark:hover:shadow-white/10 bg-white dark:bg-transparent h-full">
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary duration-300 flex-shrink-0">
          <Icon icon={service.icon} width={24} height={24} className="text-primary group-hover:text-white duration-300" />
        </div>
        <span className="text-sm font-semibold text-primary">
          {service.badge}
        </span>
      </div>
      <h3 className="text-2xl font-medium text-dark dark:text-white leading-[1.3] mb-4">
        {service.title}
      </h3>
      <p className="text-dark/50 dark:text-white/50 text-base leading-6 mb-8">
        {service.description}
      </p>
    </div>
    <Link
      href={service.href}
      className="flex items-center gap-2 text-base font-semibold text-primary group-hover:gap-4 duration-300"
    >
      {service.cta}
      <Icon icon="ph:arrow-right" width={18} height={18} />
    </Link>
  </div>
);

export default ServiceCarousel;
