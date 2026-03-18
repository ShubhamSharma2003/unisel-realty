import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

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

export type PropertyConfiguration = {
  type: string;
  size: string;
};

export type PropertyHomes = {
  _id: string;
  name: string;
  slug: string;
  location: string;
  micromarket?: string;
  rate?: string;
  priceLabel?: string;
  configuration?: string;
  structure?: string;
  area?: string;
  images?: PropertyImage[] | null;
  category?: string;
  status?: string;
  description?: any[];
  features?: PropertyFeature[];
  amenities?: PropertyAmenity[];
  configurations?: PropertyConfiguration[];
  mapUrl?: string;
  reraNumber?: string;
  reraApproved?: boolean;
};

export type PropertiesSection = {
  badge?: string;
  title?: string;
  subtitle?: string;
  mode?: "all" | "selected";
  limit?: number;
  selectedProperties?: PropertyHomes[];
};
