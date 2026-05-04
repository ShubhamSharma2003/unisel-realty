import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  async redirects() {
    return [
      { source: "/properties", destination: "/residential", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/blogs/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/contactus", destination: "/contact", permanent: true },
      { source: "/appartment", destination: "/residential", permanent: true },
      { source: "/luxury-villa", destination: "/residential", permanent: true },
      { source: "/residential-homes", destination: "/residential", permanent: true },
      { source: "/office-spaces", destination: "/commercial", permanent: true },
      { source: "/documentation", destination: "/", permanent: true },
      { source: "/commercial/pre-leased-properties-gurgaon", destination: "/commercial/pre-leased", permanent: true },
      // Fix 404s from old /property/ route (now /properties/)
      { source: "/property/:slug", destination: "/properties/:slug", permanent: true },
      // Fix 404s from old /city/ route (now /location/)
      { source: "/city/:slug", destination: "/location/:slug", permanent: true },
      // Fix /about-us -> /about
      { source: "/about-us", destination: "/about", permanent: true },
      // Old WordPress amenity filter pages
      { source: "/feature/:slug", destination: "/residential", permanent: true },
      // Old WordPress /location index (no index page exists)
      { source: "/location", destination: "/residential", permanent: true },
      // Old WordPress blog slugs
      { source: "/haryana-allows-registration-of-independent-floors-as-commercial-units-in-licensed-colonies", destination: "/blog", permanent: true },
      { source: "/kherki-daula-toll-plaza-to-be-shifted-in-2-3-months-says-cm-khattar", destination: "/blog", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
