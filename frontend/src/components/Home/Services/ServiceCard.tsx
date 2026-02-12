import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { Service } from "@/types/service";
import { urlFor } from "@/lib/sanity.image";

type ServiceCardProps = {
  service: Service;
  size: "large" | "small";
};

const ServiceCard = ({ service, size }: ServiceCardProps) => {
  const imageUrl = service.image
    ? urlFor(service.image)
        .width(size === "large" ? 680 : 320)
        .height(386)
        .fit("crop")
        .url()
    : null;

  return (
    <div className="relative rounded-2xl overflow-hidden group">
      <Link href={`/${service.slug}`}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={service.title}
            width={size === "large" ? 680 : 320}
            height={386}
            className="w-full"
          />
        ) : null}
      </Link>
      <Link
        href={`/${service.slug}`}
        className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-10 pb-10 group-hover:top-0 duration-500"
      >
        <div className="flex justify-end mt-6 mr-6">
          <div className="bg-white text-dark rounded-full w-fit p-4">
            <Icon icon="ph:arrow-right" width={24} height={24} />
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <h3 className="text-white text-2xl">{service.title}</h3>
          <p className="text-white/80 text-base leading-6">
            {service.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
