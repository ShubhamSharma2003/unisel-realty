import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types";
import { sanityConfig } from "./sanity.client";

const builder = imageUrlBuilder(sanityConfig);

export const urlFor = (source: SanityImageSource) => builder.image(source);
