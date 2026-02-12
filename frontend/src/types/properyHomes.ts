import type { SanityImageSource } from "@sanity/image-url/lib/types";

export type PropertyImage = { src: string } | SanityImageSource;

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
};
