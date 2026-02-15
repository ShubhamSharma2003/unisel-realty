"use client";

import Script from "next/script";

interface GoogleReviewsProps {
  appId?: string;
}

const GoogleReviews = ({ appId = "81d9b80f-1860-4f42-b491-1f73506a22d0" }: GoogleReviewsProps) => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-8xl px-4 sm:px-6 lg:px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-dark/70 dark:text-white/70 max-w-2xl mx-auto">
            Real reviews from our satisfied clients on Google
          </p>
        </div>

        {/* Elfsight Google Reviews Widget */}
        <div className="flex justify-center">
          <div className={`elfsight-app-${appId}`} data-elfsight-app-lazy></div>
        </div>

        {/* Load Elfsight Script */}
        <Script
          src="https://elfsightcdn.com/platform.js"
          strategy="lazyOnload"
          onLoad={() => {
            // Reinitialize Elfsight apps after script loads
            if ((window as any).elfsight) {
              (window as any).elfsight.reload();
            }
          }}
        />
      </div>
    </section>
  );
};

export default GoogleReviews;
