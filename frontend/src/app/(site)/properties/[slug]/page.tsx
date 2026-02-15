import PropertyDetailContent from "@/components/Properties/PropertyDetailContent";
import { sanityClient } from "@/lib/sanity.client";
import { propertySlugsQuery } from "@/lib/sanity.queries";

export async function generateStaticParams() {
  const properties = await sanityClient.fetch<{ slug: string }[]>(
    propertySlugsQuery
  );

  return properties.map((property) => ({ slug: property.slug }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const awaitedParams = await params;
  return <PropertyDetailContent slug={awaitedParams?.slug} />;
}
