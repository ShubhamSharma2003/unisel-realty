import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { sanityClient } from "@/lib/sanity.client";
import { featuredPropertyQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.image";
import type { PropertyHomes } from "@/types/properyHomes";
import FeaturedPropertyCarousel from "./FeaturedPropertyCarousel";
import { toPlainText } from "@portabletext/react";

const FeaturedProperty = async () => {
  const property = await sanityClient.fetch<PropertyHomes | null>(
    featuredPropertyQuery,
    {},
    { next: { tags: ["sanity-data", "featuredProperty", "properties"] } }
  );

  if (!property) return null;

  const images = (property.images || []).map((img, i) => {
    const url =
      typeof img === "object" && "src" in img
        ? (img as { src: string }).src
        : urlFor(img).width(680).height(530).fit("crop").url();
    return { url, alt: `${property.name} - ${i + 1}` };
  });

  const description = property.description
    ? toPlainText(property.description)
    : "";

  return (
    <section>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="grid lg:grid-cols-2 gap-10">
          {images.length > 0 && <FeaturedPropertyCarousel images={images} />}
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
                <Icon
                  icon="ph:house-simple-fill"
                  className="text-2xl text-primary"
                />
                Featured property
              </p>
              <h2 className="lg:text-52 text-40 font-medium text-dark dark:text-white">
                {property.name}
              </h2>
              {property.location && (
                <div className="flex items-center gap-2.5">
                  <Icon
                    icon="ph:map-pin"
                    width={28}
                    height={26}
                    className="text-dark/50 dark:text-white/50"
                  />
                  <p className="text-dark/50 dark:text-white/50 text-base">
                    {property.location}
                  </p>
                </div>
              )}
            </div>
            {description && (
              <p className="text-base text-dark/50 dark:text-white/50 line-clamp-4">
                {description}
              </p>
            )}
            <div className="grid grid-cols-2 gap-10">
              {property.configuration && (
                <div className="flex items-center gap-4">
                  <div className="bg-dark/5 dark:bg-white/5 p-2.5 rounded-[6px]">
                    <Image
                      src="/images/hero/sofa.svg"
                      alt="configuration"
                      width={24}
                      height={24}
                      className="block dark:hidden"
                      unoptimized
                    />
                    <Image
                      src="/images/hero/dark-sofa.svg"
                      alt="configuration"
                      width={24}
                      height={24}
                      className="hidden dark:block"
                      unoptimized
                    />
                  </div>
                  <h6>{property.configuration}</h6>
                </div>
              )}
              {property.structure && (
                <div className="flex items-center gap-4">
                  <div className="bg-dark/5 dark:bg-white/5 p-2.5 rounded-[6px]">
                    <Image
                      src="/images/hero/tube.svg"
                      alt="structure"
                      width={24}
                      height={24}
                      className="block dark:hidden"
                      unoptimized
                    />
                    <Image
                      src="/images/hero/dark-tube.svg"
                      alt="structure"
                      width={24}
                      height={24}
                      className="hidden dark:block"
                      unoptimized
                    />
                  </div>
                  <h6>{property.structure}</h6>
                </div>
              )}
              {property.area != null && (
                <div className="flex items-center gap-4">
                  <div className="bg-dark/5 dark:bg-white/5 p-2.5 rounded-[6px]">
                    <Image
                      src="/images/hero/parking.svg"
                      alt="area"
                      width={24}
                      height={24}
                      className="block dark:hidden"
                      unoptimized
                    />
                    <Image
                      src="/images/hero/dark-parking.svg"
                      alt="area"
                      width={24}
                      height={24}
                      className="hidden dark:block"
                      unoptimized
                    />
                  </div>
                  <h6>
                    {property.area} m<sup>2</sup>
                  </h6>
                </div>
              )}
            </div>
            <div className="flex gap-10">
              <Link
                href={`/residential/${property.slug}`}
                className="py-4 px-8 bg-primary hover:bg-dark duration-300 rounded-full text-white"
              >
                View Details
              </Link>
              {property.rate && (
                <div>
                  <h4 className="text-3xl text-dark dark:text-white font-medium">
                    {property.rate}
                  </h4>
                  {property.priceLabel && (
                    <p className="text-base text-dark/50">
                      {property.priceLabel}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperty;
