import { sanityClient } from "@/lib/sanity.client";
import {
  servicesSlugsQuery,
} from "@/lib/sanity.queries";
import ServicePageContent from "@/components/Properties/ServicePageContent";

export async function generateStaticParams() {
  const services = await sanityClient.fetch<{ slug: string }[]>(
    servicesSlugsQuery
  );

  return services.map((service) => ({ service: service.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: { service: string };
}) {
  const awaitedParams = await params;
  return <ServicePageContent slug={awaitedParams.service} />;
}
