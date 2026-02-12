import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import ServiceCard from "./ServiceCard";
import type { Service, ServicesSection } from "@/types/service";
import { urlFor } from "@/lib/sanity.image";

type ServicesContentProps = {
  section: ServicesSection | null;
  services: Service[];
};

const ServicesContent = ({ section, services }: ServicesContentProps) => {
  const lightBackground = section?.backgroundLight
    ? urlFor(section.backgroundLight).width(800).height(1050).url()
    : "/images/categories/Vector.svg";
  const darkBackground = section?.backgroundDark
    ? urlFor(section.backgroundDark).width(800).height(1050).url()
    : "/images/categories/Vector-dark.svg";

  const primaryService = services[0];
  const secondaryService = services[1];
  const tertiaryService = services[2];
  const quaternaryService = services[3];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute left-0 top-0">
        <Image
          src={lightBackground}
          alt="vector"
          width={800}
          height={1050}
          className="dark:hidden"
          unoptimized={true}
        />
        <Image
          src={darkBackground}
          alt="vector"
          width={800}
          height={1050}
          className="hidden dark:block"
          unoptimized={true}
        />
      </div>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0 relative z-10">
        <div className="grid grid-cols-12 items-center gap-10">
          <div className="lg:col-span-6 col-span-12">
            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5">
              <Icon
                icon="ph:house-simple-fill"
                className="text-2xl text-primary "
              />
              {section?.badge || "Categories"}
            </p>
            <h2 className="lg:text-52 text-40 mt-4 mb-2 lg:max-w-full font-medium leading-[1.2] text-dark dark:text-white">
              {section?.title || "Explore best properties with expert services."}
            </h2>
            <p className="text-dark/50 dark:text-white/50 text-lg lg:max-w-full leading-[1.3] md:max-w-3/4">
              {section?.subtitle ||
                "Discover a diverse range of premium properties, from luxurious apartments to spacious villas, tailored to your needs"}
            </p>
            <Link
              href={section?.ctaLink || "/properties"}
              className="py-4 px-8 bg-primary text-base leading-4 block w-fit text-white rounded-full font-semibold mt-8 hover:bg-dark duration-300"
            >
              {section?.ctaText || "View properties"}
            </Link>
          </div>
          {primaryService ? (
            <div className="lg:col-span-6 col-span-12">
              <ServiceCard service={primaryService} size="large" />
            </div>
          ) : null}
          {secondaryService ? (
            <div className="lg:col-span-6 col-span-12">
              <ServiceCard service={secondaryService} size="large" />
            </div>
          ) : null}
          {tertiaryService ? (
            <div className="lg:col-span-3 col-span-6">
              <ServiceCard service={tertiaryService} size="small" />
            </div>
          ) : null}
          {quaternaryService ? (
            <div className="lg:col-span-3 col-span-6">
              <ServiceCard service={quaternaryService} size="small" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ServicesContent;
