import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type HeroBanner = {
  _id?: string;
  location: string;
  title: string;
  bannerImage?: SanityImageSource;
  background?: string;
  backgroundImage?: SanityImageSource;
  backgroundImageMobile?: SanityImageSource;
  bedrooms?: number;
  bathrooms?: number;
  features?: string[];
  price?: number;
  priceLabel?: string;
  ctaText?: string;
  ctaLink?: string;
  viewDetailsUrl?: string;
  order?: number;
};

export type HeroSection = {
  gradientStart?: string;
  gradientMiddle?: string;
  gradientMiddleDark?: string;
  gradientEnd?: string;
  gradientEndDark?: string;
};

