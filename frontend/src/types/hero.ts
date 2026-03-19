import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type HeroBanner = {
  _id?: string;
  eyebrow?: string;
  location: string;
  title: string;
  subCopy?: string;
  bannerImage?: SanityImageSource;
  background?: string;
  backgroundImage?: SanityImageSource;
  backgroundImageMobile?: SanityImageSource;
  configuration?: string;
  structure?: string;
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

