"use client";

import Script from "next/script";
import { useEffect } from "react";

const GoogleReviews = () => {
  useEffect(() => {
    const hideAttribution = () => {
      const widget = document.getElementById(
        "featurable-944fcdc4-c7ef-4f77-ba81-68fe1773f165"
      );
      if (!widget) return;

      const shadowHost = widget.querySelector(".shadow-wrapper");
      const shadowRoot = shadowHost?.shadowRoot;
      if (!shadowRoot) return;

      const style = document.createElement("style");
      style.textContent = `
        a[href*="featurable.com?utm_source=widget"] {
          display: none !important;
        }
      `;
      shadowRoot.appendChild(style);
    };

    // Wait for widget to render
    const timer = setTimeout(hideAttribution, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-1 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-8xl px-4 sm:px-6 lg:px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-dark/70 dark:text-white/70 max-w-2xl mx-auto">
            Real reviews from our satisfied clients on Google
          </p>
        </div>

        {/* Featurable Google Reviews Widget */}
        <div id="featurable-944fcdc4-c7ef-4f77-ba81-68fe1773f165" data-featurable-async></div>

        <Script
          src="https://featurable.com/assets/v2/carousel_default.min.js"
          strategy="lazyOnload"
        />
      </div>
    </section>
  );
};

export default GoogleReviews;
