"use client";
import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type Props = {
  images: { url: string; alt: string }[];
};

const FeaturedPropertyCarousel: React.FC<Props> = ({ images }) => {
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
    if (api) api.scrollTo(index);
  };

  return (
    <div className="relative h-full">
      <Carousel setApi={setApi} opts={{ loop: true }} className="h-full">
        <CarouselContent className="h-full">
          {images.map((img, index) => (
            <CarouselItem key={index} className="h-full">
              <Image
                src={img.url}
                alt={img.alt}
                width={680}
                height={530}
                className="rounded-2xl w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute left-2/5 bg-dark/50 rounded-full py-2.5 bottom-10 flex justify-center mt-4 gap-2.5 px-2.5">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2.5 h-2.5 rounded-full ${current === index + 1 ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPropertyCarousel;
