import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "@/lib/sanity.client";
import { propertyBySlugQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.image";
import type { PropertyHomes } from "@/types/properyHomes";
import { testimonials } from "@/app/api/testimonial";

type PropertyDetailContentProps = {
  slug: string;
};

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string } }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      const imageUrl = urlFor(value).width(1200).height(800).fit("max").url();

      return (
        <Image
          src={imageUrl}
          alt={value?.alt || "Property image"}
          width={1200}
          height={800}
          className="my-8 w-full rounded-2xl"
          quality={100}
        />
      );
    },
  },
};

const PropertyDetailContent = async ({ slug }: PropertyDetailContentProps) => {
  const property = await sanityClient.fetch<PropertyHomes | null>(
    propertyBySlugQuery,
    { slug }
  );

  if (!property) {
    notFound();
  }

  const mainImageSource = property?.images?.[0];
  const mainImage = mainImageSource
    ? "src" in mainImageSource
      ? mainImageSource.src
      : urlFor(mainImageSource).width(1600).height(1080).fit("crop").url()
    : null;

  const getImageUrl = (img: any, index: number) => {
    if (!img) return null;
    return "src" in img
      ? img.src
      : urlFor(img)
          .width(index === 1 ? 640 : 320)
          .height(index === 1 ? 800 : 400)
          .fit("crop")
          .url();
  };

  const rateLabel = property?.rate !== undefined ? String(property?.rate) : "";

  return (
    <section className="!pt-44 pb-20 relative">
      <div className="container mx-auto max-w-8xl px-5 2xl:px-0">
        <div className="grid grid-cols-12 items-end gap-6">
          <div className="lg:col-span-8 col-span-12">
            <h1 className="lg:text-52 text-40 font-semibold text-dark dark:text-white">
              {property?.name}
            </h1>
            <div className="flex gap-2.5">
              <Icon
                icon="ph:map-pin"
                width={24}
                height={24}
                className="text-dark/50 dark:text-white/50"
              />
              <p className="text-dark/50 dark:text-white/50 text-xm">
                {property?.location}
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="flex">
              <div className="flex flex-col gap-2 border-e border-black/10 dark:border-white/20 pr-2 xs:pr-4 mobile:pr-8">
                <Icon icon={"solar:bed-linear"} width={20} height={20} />
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {property?.beds} Bedrooms
                </p>
              </div>
              <div className="flex flex-col gap-2 border-e border-black/10 dark:border-white/20 px-2 xs:px-4 mobile:px-8">
                <Icon icon={"solar:bath-linear"} width={20} height={20} />
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {property?.baths} Bathrooms
                </p>
              </div>
              <div className="flex flex-col gap-2 pl-2 xs:pl-4 mobile:pl-8">
                <Icon
                  icon={"lineicons:arrow-all-direction"}
                  width={20}
                  height={20}
                />
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {property?.area}m<sup>2</sup>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-8 gap-8">
          <div className="lg:col-span-8 col-span-12 row-span-2">
            {mainImage ? (
              <div className="">
                <Image
                  src={mainImage}
                  alt={property?.name}
                  width={1600}
                  height={1080}
                  className="rounded-2xl w-full h-540 object-cover"
                />
              </div>
            ) : null}
          </div>
          {property?.images[1] ? (
            <div className="lg:col-span-4 lg:block hidden">
              <Image
                src={getImageUrl(property?.images[1], 1) || ""}
                alt="Property Image 2"
                width={640}
                height={800}
                className="rounded-2xl w-full h-full object-cover"
              />
            </div>
          ) : null}
          {property?.images[2] ? (
            <div className="lg:col-span-2 col-span-6">
              <Image
                src={getImageUrl(property?.images[2], 2) || ""}
                alt="Property Image 3"
                width={320}
                height={400}
                className="rounded-2xl w-full h-full object-cover"
              />
            </div>
          ) : null}
          {property?.images[3] ? (
            <div className="lg:col-span-2 col-span-6">
              <Image
                src={getImageUrl(property?.images[3], 3) || ""}
                alt="Property Image 4"
                width={320}
                height={400}
                className="rounded-2xl w-full h-full object-cover"
              />
            </div>
          ) : null}
        </div>
        <div className="grid grid-cols-12 gap-8 mt-10">
          <div className="lg:col-span-8 col-span-12">
            <h3 className="text-xl font-medium">Property details</h3>
            {property?.features && property?.features.length > 0 ? (
              <div className="py-8 my-8 border-y border-dark/10 dark:border-white/20 flex flex-col gap-8">
                {property?.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-6">
                    {feature.icon ? (
                      <div className="flex-shrink-0">
                        <Image
                          src={urlFor(feature.icon).width(64).height(64).fit("max").url()}
                          alt={feature.title || "Feature icon"}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    ) : null}
                    <div>
                      {feature.title ? (
                        <h3 className="text-dark dark:text-white text-xm">
                          {feature.title}
                        </h3>
                      ) : null}
                      {feature.description ? (
                        <p className="text-base text-dark/50 dark:text-white/50">
                          {feature.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            {property?.description && property?.description.length > 0 ? (
              <div className="flex flex-col gap-5 property-description">
                <PortableText
                  value={property?.description}
                  components={portableTextComponents}
                />
              </div>
            ) : null}
            {property?.amenities && property?.amenities.length > 0 ? (
              <div className="py-8 mt-8 border-t border-dark/5 dark:border-white/15">
                <h3 className="text-xl font-medium">
                  What this property offers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-6">
                  {property?.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2.5">
                      {amenity.icon ? (
                        <Image
                          src={urlFor(amenity.icon).width(48).height(48).fit("max").url()}
                          alt={amenity.label || "Amenity icon"}
                          width={24}
                          height={24}
                          className="object-contain flex-shrink-0"
                        />
                      ) : null}
                      {amenity.label ? (
                        <p className="text-base dark:text-white text-dark">
                          {amenity.label}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {property?.mapUrl ? (
              <iframe
                src={property?.mapUrl}
                width="1114"
                height="400"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl w-full mt-8"
              ></iframe>
            ) : null}
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="bg-primary/10 p-8 rounded-2xl relative z-10 overflow-hidden">
              <h4 className="text-dark text-3xl font-medium dark:text-white">
                ${rateLabel}
              </h4>
              <p className="text-sm text-dark/50 dark:text-white">
                Discounted Price
              </p>
              <Link
                href="#"
                className="py-4 px-8 bg-primary text-white rounded-full w-full block text-center hover:bg-dark duration-300 text-base mt-8 hover:cursor-pointer"
              >
                Get in touch
              </Link>
              <div className="absolute right-0 top-4 -z-[1]">
                <Image
                  src="/images/properties/vector.svg"
                  width={400}
                  height={500}
                  alt="vector"
                  unoptimized={true}
                />
              </div>
            </div>
            {testimonials.slice(0, 1).map((item, index) => (
              <div
                key={index}
                className="border p-10 rounded-2xl border-dark/10 dark:border-white/20 mt-10 flex flex-col gap-6"
              >
                <Icon
                  icon="ph:house-simple"
                  width={44}
                  height={44}
                  className="text-primary"
                />
                <p className="text-xm text-dark dark:text-white">
                  {item.review}
                </p>
                <div className="flex items-center gap-6">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-2xl"
                    unoptimized={true}
                  />
                  <div className="">
                    <h3 className="text-xm text-dark dark:text-white">
                      {item.name}
                    </h3>
                    <h4 className="text-base text-dark/50 dark:text-white/50">
                      {item.position}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailContent;
