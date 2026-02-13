"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { urlFor } from "@/lib/sanity.image";
import type { HeroBanner, HeroSection } from "@/types/hero";

type HeroContentProps = {
  section: HeroSection | null;
  banners: HeroBanner[];
};

const HeroContent = ({ section, banners }: HeroContentProps) => {
  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <section className="!py-0">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {banners.map((banner, index) => {
            const bannerImageUrl = banner.bannerImage
              ? urlFor(banner.bannerImage)
                  .width(1082)
                  .height(1016)
                  .fit("crop")
                  .url()
              : null;

            const backgroundImageUrl = banner.backgroundImage
              ? urlFor(banner.backgroundImage)
                  .width(1920)
                  .height(1080)
                  .fit("crop")
                  .url()
              : null;

            const backgroundImageMobileUrl = banner.backgroundImageMobile
              ? urlFor(banner.backgroundImageMobile)
                  .width(1024)
                  .height(1365)
                  .fit("crop")
                  .url()
              : null;

            const selectedBackgroundImageUrl =
              isMobile && backgroundImageMobileUrl
                ? backgroundImageMobileUrl
                : backgroundImageUrl;

            const backgroundValue = (banner.background || "")
              .replace(/^background:\s*/i, "")
              .replace(/;$/, "")
              .trim();

            const fallbackBackground =
              "linear-gradient(180deg, #79ADE1 10.42%, #9CC2DD 61.57%, #FFF 108.02%)";
            const normalizedBackground =
              backgroundValue || fallbackBackground;
            const isGradient = /gradient\(/i.test(normalizedBackground);

            const containerClass = "overflow-hidden relative";
            const containerStyle = selectedBackgroundImageUrl
              ? {
                  backgroundImage: `url(${selectedBackgroundImageUrl})`,
                  backgroundColor:
                    !isGradient && backgroundValue ? normalizedBackground : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height:"100%",
                }
              : {
                  background: normalizedBackground,
                };

            return (
              <CarouselItem key={banner._id || index} className="!p-0">
                <div
                  className={containerClass}
                  style={containerStyle}
                >
                  <div className="container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-60 md:pb-68">
                    <div className="relative text-white dark:text-dark text-center md:text-start z-10">
                      <p className="text-inherit text-xm font-medium">
                        {banner.location}
                      </p>
                      <h1 className="text-inherit text-6xl sm:text-9xl font-semibold -tracking-wider md:max-w-45p mt-4 mb-6">
                        {banner.title}
                      </h1>
                      <div className="flex flex-col xs:flex-row justify-center md:justify-start gap-4">
                        <Link
                          href={banner.ctaLink || "/contactus"}
                          className="px-8 py-4 border border-white dark:border-dark bg-white dark:bg-dark text-dark dark:text-white duration-300 dark:hover:text-dark hover:bg-transparent hover:text-white text-base font-semibold rounded-full hover:cursor-pointer"
                        >
                          {banner.ctaText || "Get in touch"}
                        </Link>
                        {banner.viewDetailsUrl ? (
                          <Link
                            href={banner.viewDetailsUrl}
                            className="px-8 py-4 border border-white dark:border-dark bg-transparent text-white dark:text-dark hover:bg-white dark:hover:bg-dark dark:hover:text-white hover:text-dark duration-300 text-base font-semibold rounded-full hover:cursor-pointer"
                          >
                            View Details
                          </Link>
                        ) : (
                          <button className="px-8 py-4 border border-white dark:border-dark bg-transparent text-white dark:text-dark hover:bg-white dark:hover:bg-dark dark:hover:text-white hover:text-dark duration-300 text-base font-semibold rounded-full hover:cursor-pointer">
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                    {bannerImageUrl ? (
                      <div className="hidden md:block absolute -top-2 -right-68">
                        <Image
                          src={bannerImageUrl}
                          alt={banner.title}
                          width={1082}
                          height={1016}
                          priority={index === 0}
                          unoptimized={true}
                        />
                      </div>
                    ) : null}
                  </div>

                  {banner.price && <div className="md:absolute bottom-0 md:-right-68 xl:right-0 bg-white dark:bg-black py-12 px-8 mobile:px-16 md:pl-16 md:pr-[295px] rounded-2xl md:rounded-none md:rounded-tl-2xl mt-24">
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:flex gap-16 md:gap-24 sm:text-center dark:text-white text-black">
                      {banner.bedrooms ? (
                        <div className="flex flex-col sm:items-center gap-3">
                          <Image
                            src="/images/hero/sofa.svg"
                            alt="bedrooms"
                            width={32}
                            height={32}
                            className="block dark:hidden"
                            unoptimized={true}
                          />
                          <Image
                            src="/images/hero/dark-sofa.svg"
                            alt="bedrooms"
                            width={32}
                            height={32}
                            className="hidden dark:block"
                            unoptimized={true}
                          />
                          <p className="text-sm sm:text-base font-normal text-inherit">
                            {banner.bedrooms} Bedrooms
                          </p>
                        </div>
                      ) : null}

                      {banner.bathrooms ? (
                        <div className="flex flex-col sm:items-center gap-3">
                          <Image
                            src="/images/hero/tube.svg"
                            alt="bathrooms"
                            width={32}
                            height={32}
                            className="block dark:hidden"
                            unoptimized={true}
                          />
                          <Image
                            src="/images/hero/dark-tube.svg"
                            alt="bathrooms"
                            width={32}
                            height={32}
                            className="hidden dark:block"
                            unoptimized={true}
                          />
                          <p className="text-sm sm:text-base font-normal text-inherit">
                            {banner.bathrooms} Restroom
                          </p>
                        </div>
                      ) : null}

                      {banner.features && banner.features.length > 0
                        ? banner.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col sm:items-center gap-3"
                            >
                              <Image
                                src="/images/hero/parking.svg"
                                alt={feature}
                                width={32}
                                height={32}
                                className="block dark:hidden"
                                unoptimized={true}
                              />
                              <Image
                                src="/images/hero/dark-parking.svg"
                                alt={feature}
                                width={32}
                                height={32}
                                className="hidden dark:block"
                                unoptimized={true}
                              />
                              <p className="text-sm sm:text-base font-normal text-inherit">
                                {feature}
                              </p>
                            </div>
                          ))
                        : null}

                      {banner.price ? (
                        <div className="flex flex-col sm:items-center gap-3">
                          <p className="text-2xl sm:text-3xl font-medium text-inherit">
                            ${banner.price.toLocaleString()}
                          </p>
                          <p className="text-sm sm:text-base font-normal text-black/50 dark:text-white/50">
                            {banner.priceLabel || "For selling price"}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {count > 1 ? (
        <div className="absolute bottom-32 md:bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2.5 p-2.5 bg-white/20 rounded-full z-20">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                current === index ? "bg-white w-8" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default HeroContent;
