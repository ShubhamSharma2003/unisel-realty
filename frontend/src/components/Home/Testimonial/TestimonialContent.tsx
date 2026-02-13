"use client";

import * as React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { urlFor } from "@/lib/sanity.image";
import type { Testimonial, TestimonialSection } from "@/types/testimonial";

type TestimonialContentProps = {
  section: TestimonialSection | null;
  testimonials: Testimonial[];
};

const TestimonialContent = ({
  section,
  testimonials,
}: TestimonialContentProps) => {
  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  const badge = section?.badge || "Testimonials";
  const title = section?.title || "What our clients say";
  const subtitle = section?.subtitle || "";

  return (
    <section className="bg-dark relative overflow-hidden" id="testimonial">
      <div className="absolute right-0">
        <Image
          src="/images/testimonial/Vector.png"
          alt="victor"
          width={700}
          height={1039}
          unoptimized={true}
        />
      </div>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div>
          <p className="text-white text-base font-semibold flex gap-2">
            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
            {badge}
          </p>
          <h2 className="lg:text-52 text-40 font-medium text-white">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-white/60 mt-3 max-w-2xl">{subtitle}</p>
          ) : null}
        </div>
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {testimonials.map((item, index) => {
              const imageUrl = item.image
                ? typeof item.image === "string"
                  ? item.image
                  : urlFor(item.image)
                      .width(800)
                      .height(800)
                      .fit("crop")
                      .url()
                : null;

              return (
                <CarouselItem key={item._id || index} className="mt-9">
                  <div className="lg:flex items-center gap-11">
                    <div className="flex items-start gap-11 lg:pr-20">
                      <div>
                        <Icon
                          icon="ph:house-simple"
                          width={32}
                          height={32}
                          className="text-primary"
                        />
                      </div>
                      <div>
                        <h4 className="text-white lg:text-3xl text-2xl">
                          {item.review}
                        </h4>
                        <div className="flex items-center mt-8 gap-6">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="rounded-full lg:hidden block"
                              unoptimized={true}
                            />
                          ) : null}
                          <div>
                            <h6 className="text-white text-xm font-medium">
                              {item.name}
                            </h6>
                            {item.position ? (
                              <p className="text-white/40">{item.position}</p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-full rounded-2xl overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.name}
                          width={440}
                          height={440}
                          className="lg:block hidden"
                          unoptimized={true}
                        />
                      ) : null}
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        {count > 1 ? (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2.5 p-2.5 bg-white/20 rounded-full">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  current === index + 1 ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default TestimonialContent;
