import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityConfig } from "./sanity.client";

const builder = imageUrlBuilder(sanityConfig);

/**
 * Returns true when the source carries enough information for
 * `@sanity/image-url` to resolve a URL.  Sanity images that were only
 * partially uploaded (or whose asset reference was removed) will have
 * `_type: "image"` but no `asset`, which makes `.url()` throw.
 */
function isResolvable(source: SanityImageSource): boolean {
  if (!source) return false;
  if (typeof source === "string") return true; // asset-id string
  if (typeof source === "object") {
    if ("asset" in source) return true;
    if ("url" in source) return true;
  }
  return false;
}

const PLACEHOLDER = builder.image("image-placeholder-1x1-png"); // never called — see below

/**
 * Safe wrapper around the Sanity image-url builder.
 * If the source is not resolvable, every builder method is still callable
 * but `.url()` returns an empty string instead of throwing.
 */
export const urlFor = (source: SanityImageSource) => {
  if (isResolvable(source)) return builder.image(source);

  // Return a proxy that mirrors the builder API but always yields ""
  const img = builder.image(
    // Use a minimal valid reference so the builder doesn't throw during chaining
    "image-00000000000000000000000000000000000000000-1x1-png"
  );
  const originalUrl = img.url.bind(img);
  img.url = () => "";
  return img;
};
