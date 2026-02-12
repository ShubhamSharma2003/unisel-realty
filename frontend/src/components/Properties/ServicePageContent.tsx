import { notFound } from "next/navigation";
import HeroSub from "@/components/shared/HeroSub";
import PropertyCard from "@/components/Home/Properties/Card/Card";
import { sanityClient } from "@/lib/sanity.client";
import { propertiesByCategoryQuery, serviceBySlugQuery } from "@/lib/sanity.queries";
import type { Service } from "@/types/service";
import type { PropertyHomes } from "@/types/properyHomes";

type ServicePageContentProps = {
  slug: string;
};

const ServicePageContent = async ({ slug }: ServicePageContentProps) => {
  const service = await sanityClient.fetch<Service | null>(serviceBySlugQuery, {
    slug,
  });

  if (!service) {
    notFound();
  }

  const properties = await sanityClient.fetch<PropertyHomes[]>(
    propertiesByCategoryQuery,
    { category: service.category }
  );

  return (
    <>
      <HeroSub
        title={`${service.title}.`}
        description={
          service.description ||
          "Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living."
        }
        badge={service.badge || "Properties"}
      />
      <section className="pt-0!">
        <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {properties.map((item) => (
              <div key={item.slug}>
                <PropertyCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePageContent;
