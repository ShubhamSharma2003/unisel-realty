import { Icon } from "@iconify/react";
import { sanityClient } from "@/lib/sanity.client";
import { propertiesForMapQuery } from "@/lib/sanity.queries";
import type { PropertyHomes } from "@/types/properyHomes";
import MapWrapper from "./MapWrapper";

const MapSection = async () => {
  const properties = await sanityClient.fetch<PropertyHomes[]>(
    propertiesForMapQuery
  );

  if (!properties?.length) return null;

  return (
    <section>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="mb-6 md:mb-12 flex flex-col gap-2">
          <div className="flex gap-2.5 items-center justify-center">
            <span>
              <Icon
                icon={"ph:map-pin-fill"}
                width={20}
                height={20}
                className="text-primary"
              />
            </span>
            <p className="text-base font-semibold text-dark/75 dark:text-white/75">
              Explore on Map
            </p>
          </div>
          <h2 className="text-40 lg:text-52 font-medium text-black dark:text-white text-center tracking-tight leading-11 mb-2">
            Find properties near you.
          </h2>
          <p className="text-xm font-normal text-black/50 dark:text-white/50 text-center">
            Browse our listings on an interactive map and discover your ideal
            location in Gurgaon.
          </p>
        </div>
        <MapWrapper properties={properties} />
      </div>
    </section>
  );
};

export default MapSection;
