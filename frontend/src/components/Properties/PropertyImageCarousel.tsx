'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

interface PropertyImageCarouselProps {
  imageUrls: string[];
  propertyName: string;
}

export default function PropertyImageCarousel({
  imageUrls,
  propertyName,
}: PropertyImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  // Prevent hydration mismatch by only rendering interactive elements on client
  if (!isClient) {
    return (
      <div className="lg:col-span-8 col-span-12 row-span-2 relative group">
        <div className="relative rounded-2xl overflow-hidden bg-gray-200">
          <Image
            src={imageUrls[0]}
            alt={`${propertyName} - Image 1`}
            width={1600}
            height={1080}
            className="w-full h-540 object-cover"
            priority
          />
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setTouchStart(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setTouchEnd(clientX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (isAnimating) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const imageUrl = imageUrls[currentIndex];

  return (
    <div className="lg:col-span-8 col-span-12 row-span-2 relative group">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .image-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
      <div
        ref={imageContainerRef}
        className="relative rounded-2xl overflow-hidden bg-gray-200 select-none"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <Image
          src={imageUrl}
          alt={`${propertyName} - Image ${currentIndex + 1}`}
          width={1600}
          height={1080}
          className={`w-full h-540 object-cover transition-opacity duration-300 pointer-events-none select-none ${
            isAnimating ? 'image-fade-in' : ''
          }`}
          priority={currentIndex === 0}
          draggable={false}
        />

        {/* Image counter */}
        <div className="absolute top-4 right-4 bg-black/50 px-3 py-1.5 rounded-full text-white text-sm font-medium pointer-events-none">
          {currentIndex + 1} / {imageUrls.length}
        </div>

        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          disabled={isAnimating}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 rounded-full p-2.5 transition-all duration-200 disabled:opacity-50 shadow-lg"
          aria-label="Previous image"
        >
          <Icon icon="ph:caret-left" width={24} height={24} className="text-dark" />
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 rounded-full p-2.5 transition-all duration-200 disabled:opacity-50 shadow-lg"
          aria-label="Next image"
        >
          <Icon icon="ph:caret-right" width={24} height={24} className="text-dark" />
        </button>
      </div>

      {/* Thumbnail dots */}
      {imageUrls.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {imageUrls.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-dark/20 dark:bg-white/20 hover:bg-dark/40 dark:hover:bg-white/40'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
