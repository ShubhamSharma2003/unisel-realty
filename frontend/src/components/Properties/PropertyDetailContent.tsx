import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "@/lib/sanity.client";
import { propertyBySlugQuery, similarPropertiesQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.image";
import type { PropertyHomes } from "@/types/properyHomes";
import EMICalculatorWrapper from "@/components/Properties/EMICalculator/EMICalculatorWrapper";
import ContactForm from "@/components/shared/ContactForm";
import PropertyImageCarousel from "@/components/Properties/PropertyImageCarousel";
import { breadcrumbSchema } from "@/lib/jsonld";
import ShareButton from "@/components/Properties/ShareButton";


type PropertyDetailContentProps = {
  slug: string;
  property?: PropertyHomes | null;
};

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string } }) => {
      if (!value?.asset?._ref) return null;
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

const PropertyDetailContent = async ({ slug, property: propertyProp }: PropertyDetailContentProps) => {
  const property = propertyProp ?? await sanityClient.fetch<PropertyHomes | null>(
    propertyBySlugQuery,
    { slug }
  );

  if (!property) {
    notFound();
  }

  const similarProperties = await sanityClient.fetch<PropertyHomes[]>(
    similarPropertiesQuery,
    { category: property.category ?? "residential", slug }
  );

  // Prepare image URLs for carousel
  const imageUrls = property?.images?.map((img) => {
    if (!img) return null;
    if (typeof img === 'object' && "src" in img) return img.src as string;
    // Skip images without an asset reference (e.g. incomplete Sanity uploads)
    if (typeof img === 'object' && !("asset" in img)) return null;
    return urlFor(img)
      .width(1600)
      .height(1080)
      .fit("crop")
      .url();
  }).filter((url): url is string => url !== null) || [];


  const rateLabel = property?.rate ?? "";

  // Format configurations for display
  const formattedConfigurations = property?.configurations
    ?.map((config) => config.type)
    .join(", ") || property?.configuration;

  const categorySlug = property?.category === "commercial" ? "commercial" : "residential";
  const categoryLabel = property?.category === "commercial" ? "Commercial" : "Residential";
  const SITE_URL = "https://uniselrealty.com";

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: categoryLabel, url: `${SITE_URL}/${categorySlug}` },
    { name: property.name, url: `${SITE_URL}/${categorySlug}/${property.slug}` },
  ];

  return (
    <section className="!pt-44 pb-20 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbItems)) }}
      />
      <div className="container mx-auto max-w-8xl px-5 2xl:px-0">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-dark/50 dark:text-white/50">
          <Link href="/" className="hover:text-primary duration-200">Home</Link>
          <Icon icon="ph:caret-right" width={14} height={14} />
          <Link href={`/${categorySlug}`} className="hover:text-primary duration-200">{categoryLabel}</Link>
          <Icon icon="ph:caret-right" width={14} height={14} />
          <span className="text-dark dark:text-white truncate max-w-xs">{property.name}</span>
        </nav>
        <div className="grid grid-cols-12 items-end gap-6">
          <div className="lg:col-span-8 col-span-12">
            <ShareButton
              title={property.name}
              url={`${SITE_URL}/${categorySlug}/${property.slug}`}
            />
            <div className="flex items-start justify-between gap-4">
              <h1 className="lg:text-52 text-40 font-semibold text-dark dark:text-white">
                {property?.name}
              </h1>
            </div>
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
            {property?.reraNumber && (
              <a
                href="https://hrera.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 w-fit mt-2 text-sm text-primary/80 hover:text-primary duration-300"
              >
                <Icon icon="ph:certificate" width={16} height={16} />
                RERA Reg. No: {property.reraNumber}
              </a>
            )}
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="flex">
              <div className="flex flex-col gap-2 border-e border-black/10 dark:border-white/20 pr-2 xs:pr-4 mobile:pr-8">
                <Icon icon={"solar:home-2-linear"} width={20} height={20} />
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {formattedConfigurations}
                </p>
              </div>
              {property?.structure && (
                <div className="flex flex-col gap-2 border-e border-black/10 dark:border-white/20 px-2 xs:px-4 mobile:px-8">
                  <Icon icon={"solar:buildings-2-linear"} width={20} height={20} />
                  <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                    {property?.structure}
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-2 pl-2 xs:pl-4 mobile:pl-8">
                <Icon
                  icon={"lineicons:arrow-all-direction"}
                  width={20}
                  height={20}
                />
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {property?.area}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-8 gap-8">
          <PropertyImageCarousel
            imageUrls={imageUrls}
            propertyName={property?.name || ""}
          />
          <div className={`lg:col-span-4 col-span-12 self-start sticky top-32 transition-all duration-300`}>
            <div className={`border border-dark/10 dark:border-white/20 rounded-2xl p-6 ${
              property?.configurations && property?.configurations.length > 0
                ? 'bg-white dark:bg-dark/50'
                : 'bg-transparent'
            }`}>
              {property?.configurations && property.configurations.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-dark dark:text-white">Configurations</h3>
                  <div className="space-y-0">
                    {property.configurations?.map((config, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-dark/70 dark:text-white/70 text-sm">{config.type}</span>
                          <span className="font-semibold text-dark dark:text-white text-sm">{config.size}</span>
                        </div>
                        {index !== (property.configurations?.length ?? 0) - 1 && (
                          <div className="border-b border-dark/10 dark:border-white/10"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-dark dark:text-white">Configuration</h3>
                  <div className="space-y-3">
                    {property?.configuration && (
                      <div className="flex justify-between items-center pb-3 border-b border-dark/10 dark:border-white/10">
                        <span className="text-dark/70 dark:text-white/70 text-sm">Configuration</span>
                        <span className="font-semibold text-dark dark:text-white text-sm">{property.configuration}</span>
                      </div>
                    )}
                    {property?.area && (
                      <div className="flex justify-between items-center">
                        <span className="text-dark/70 dark:text-white/70 text-sm">Area</span>
                        <span className="font-semibold text-dark dark:text-white text-sm">{property.area}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
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
          <div className="lg:col-span-4 col-span-12 self-start sticky top-32">
            <div className="bg-primary/10 p-8 rounded-2xl relative z-10 overflow-hidden">
              <h4 className="text-dark text-3xl font-medium dark:text-white">
                {rateLabel}
              </h4>
              <p className="text-sm text-dark/50 dark:text-white">
                {property?.priceLabel || "Connect to get the best deal"}
              </p>
              <Link
                href="/contact"
                className="py-4 px-8 bg-primary text-white rounded-full w-full block text-center hover:bg-dark duration-300 text-base mt-8 hover:cursor-pointer"
              >
                Get in touch
              </Link>
            </div>
            <div className="border p-8 rounded-2xl border-dark/10 dark:border-white/20 mt-10">
              <ContactForm variant="sidebar" source="property" propertySlug={property.slug} />
            </div>
          </div>
        </div>
        <EMICalculatorWrapper propertyRate={property?.rate} />

        {similarProperties && similarProperties.length > 0 && (
          <div className="mt-16 border-t border-dark/10 dark:border-white/10 pt-12">
            <h2 className="text-2xl font-semibold text-dark dark:text-white mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((p) => {
                const catSlug = p.category === "commercial" ? "commercial" : "residential";
                const thumb = p.images?.[0]
                  ? typeof p.images[0] === "object" && "src" in p.images[0]
                    ? (p.images[0] as { src: string }).src
                    : urlFor(p.images[0]).width(880).height(600).fit("crop").url()
                  : null;
                return (
                  <div key={p._id}>
                    <div className="relative rounded-2xl border border-dark/10 dark:border-white/10 group hover:shadow-3xl duration-300 dark:hover:shadow-white/20">
                      <div className="overflow-hidden rounded-t-2xl">
                        <Link href={`/${catSlug}/${p.slug}`}>
                          {thumb && (
                            <Image
                              src={thumb}
                              alt={p.name}
                              width={440}
                              height={300}
                              className="w-full rounded-t-2xl group-hover:brightness-50 group-hover:scale-125 transition duration-300 delay-75"
                            />
                          )}
                        </Link>
                        <div className="absolute top-6 right-6 p-4 bg-white rounded-full hidden group-hover:block">
                          <Icon
                            icon={'solar:arrow-right-linear'}
                            width={24}
                            height={24}
                            className="text-black"
                          />
                        </div>
                      </div>
                      <div className="px-3 py-6">
                        <div className="flex flex-col mobile:flex-row gap-5 mobile:gap-0 justify-between mb-6">
                          <div>
                            <Link href={`/${catSlug}/${p.slug}`}>
                              <h3 className="text-xl font-medium text-dark dark:text-white duration-300 group-hover:text-primary">
                                {p.name}
                              </h3>
                            </Link>
                            <p className="text-base font-normal text-dark/50 dark:text-white/50">
                              {p.location}
                            </p>
                          </div>
                          <div>
                            {p.rate && (
                              <button className="text-base font-normal text-primary px-5 py-2 rounded-full bg-primary/10">
                                {p.rate}
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs mobile:text-base">
                          <div className="flex flex-col items-center justify-center gap-2 text-center border-r border-dark/10 dark:border-white/20 pr-4">
                            <Icon icon={'solar:home-2-linear'} width={20} height={20} />
                            <span className="text-dark dark:text-white">{p.configuration}</span>
                          </div>

                          <div className="flex flex-col items-center justify-center gap-2 text-center border-r border-dark/10 dark:border-white/20 px-4">
                            <Icon icon={'solar:buildings-2-linear'} width={20} height={20} />
                            <span className="text-dark dark:text-white">{p.structure}</span>
                          </div>

                          <div className="flex flex-col items-center justify-center gap-2 text-center pl-4">
                            <Icon icon={'lineicons:arrow-all-direction'} width={20} height={20} />
                            <span className="text-dark dark:text-white">{p.area}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyDetailContent;
