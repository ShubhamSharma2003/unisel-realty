'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface PropertyImageCarouselProps {
  imageUrls: string[];
  propertyName: string;
}

export default function PropertyImageCarousel({
  imageUrls,
  propertyName,
}: PropertyImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true }, [
    autoplayPlugin.current,
  ]);
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    setSelectedIndex(mainApi.selectedScrollSnap());
    thumbApi.scrollTo(mainApi.selectedScrollSnap());
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    mainApi.on('select', onSelect);
    mainApi.on('reInit', onSelect);
    onSelect();
    return () => {
      mainApi.off('select', onSelect);
      mainApi.off('reInit', onSelect);
    };
  }, [mainApi, onSelect]);

  const scrollPrev = useCallback(() => mainApi?.scrollPrev(), [mainApi]);
  const scrollNext = useCallback(() => mainApi?.scrollNext(), [mainApi]);

  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  return (
    <div className="lg:col-span-8 col-span-12 row-span-2 relative group">
      {/* Main carousel */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-200">
        <div ref={mainRef} className="overflow-hidden">
          <div className="flex" style={{ touchAction: 'pan-y pinch-zoom' }}>
            {imageUrls.map((url, index) => (
              <div
                key={index}
                className="min-w-0"
                style={{ flex: '0 0 100%' }}
              >
                <Image
                  src={url}
                  alt={`${propertyName} - Image ${index + 1}`}
                  width={1600}
                  height={1080}
                  className="w-full object-cover select-none"
                  style={{ height: '540px' }}
                  priority={index === 0}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Image counter */}
        <div className="absolute top-4 right-4 bg-black/50 px-3 py-1.5 rounded-full text-white text-sm font-medium pointer-events-none">
          {selectedIndex + 1} / {imageUrls.length}
        </div>

        {/* Previous Button */}
        {imageUrls.length > 1 && (
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 rounded-full p-2.5 transition-all duration-200 shadow-lg"
            aria-label="Previous image"
          >
            <Icon icon="ph:caret-left" width={24} height={24} className="text-dark" />
          </button>
        )}

        {/* Next Button */}
        {imageUrls.length > 1 && (
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 rounded-full p-2.5 transition-all duration-200 shadow-lg"
            aria-label="Next image"
          >
            <Icon icon="ph:caret-right" width={24} height={24} className="text-dark" />
          </button>
        )}
      </div>

      {/* Thumbnail slider */}
      {imageUrls.length > 1 && (
        <div className="mt-3">
          <div ref={thumbRef} className="overflow-hidden">
            <div className="flex gap-2 p-3">
              {imageUrls.map((url, index) => (
                <button
                  key={index}
                  onClick={() => onThumbClick(index)}
                  className={`flex-[0_0_80px] min-w-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === selectedIndex
                      ? 'border-primary opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                >
                  <Image
                    src={url}
                    alt={`${propertyName} - Thumbnail ${index + 1}`}
                    width={80}
                    height={60}
                    className="w-full h-[60px] object-cover select-none"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
