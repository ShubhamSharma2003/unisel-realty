import type { SanityImageSource } from "@sanity/image-url/lib/types";

export type PropertyImage = { src: string } | SanityImageSource;

export type PropertyFeature = {
  icon?: SanityImageSource;
  title?: string;
  description?: string;
};

export type PropertyAmenity = {
  icon?: SanityImageSource;
  label?: string;
};

export type PropertyHomes = {
  name: string;
  slug: string;
  location: string;
  rate: string | number;
  beds: number;
  baths: number;
  area: number;
  images: PropertyImage[];
  category?: string;
  description?: any[];
  features?: PropertyFeature[];
  amenities?: PropertyAmenity[];
  mapUrl?: string;
};

export type PropertiesSection = {
  badge?: string;
  title?: string;
  subtitle?: string;
  mode?: "all" | "selected";
  limit?: number;
  selectedProperties?: PropertyHomes[];
};
