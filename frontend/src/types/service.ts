import type { SanityImageSource } from "@sanity/image-url/lib/types";

export type ServicesSection = {
  badge?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundLight?: SanityImageSource;
  backgroundDark?: SanityImageSource;
};

export type Service = {
  _id?: string;
  title: string;
  description?: string;
  slug: string;
  image?: SanityImageSource;
  category: string;
  badge?: string;
  order?: number;
};
