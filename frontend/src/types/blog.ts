import type { SanityImageSource } from "@sanity/image-url/lib/types";

export type Blog = {
  _id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  coverImage?: SanityImageSource;
  date?: string;
  tag?: string;
  detail?: string;
  author?: string;
  authorImage?: SanityImageSource;
  content?: any[];
};