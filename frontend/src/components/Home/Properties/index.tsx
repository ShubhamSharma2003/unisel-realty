import { Icon } from "@iconify/react";
import PropertyCard from "./Card/Card";
import { sanityClient } from "@/lib/sanity.client";
import {
  propertiesForHomeQuery,
  propertiesSectionQuery,
} from "@/lib/sanity.queries";
import type { PropertiesSection, PropertyHomes } from "@/types/properyHomes";

const Properties = async () => {
  const section = await sanityClient.fetch<PropertiesSection | null>(
    propertiesSectionQuery
  );

  const useSelected =
    section?.mode === "selected" &&
    !!section.selectedProperties?.length;

  const properties = useSelected
    ? section?.selectedProperties || []
    : await sanityClient.fetch<PropertyHomes[]>(propertiesForHomeQuery, {
        limit: section?.limit ?? 6,
      });

  const badge = section?.badge || "Properties";
  const title = section?.title || "Discover inspiring designed homes.";
  const subtitle =
    section?.subtitle || "Curated homes where elegance, style, and comfort unite.";

  return (
    <section>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="mb-16 flex flex-col gap-3 ">
          <div className="flex gap-2.5 items-center justify-center">
            <span>
              <Icon
                icon={"ph:house-simple-fill"}
                width={20}
                height={20}
                className="text-primary"
              />
            </span>
            <p className="text-base font-semibold text-dark/75 dark:text-white/75">
              {badge}
            </p>
          </div>
          <h2 className="text-40 lg:text-52 font-medium text-black dark:text-white text-center tracking-tight leading-11 mb-2">
            {title}
          </h2>
          <p className="text-xm font-normal text-black/50 dark:text-white/50 text-center">
            {subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {properties.map((item, index) => (
            <div key={item.slug || index} className="">
              <PropertyCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
