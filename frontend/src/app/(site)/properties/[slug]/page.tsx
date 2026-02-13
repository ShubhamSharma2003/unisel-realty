import PropertyDetailContent from "@/components/Properties/PropertyDetailContent";
import { sanityClient } from "@/lib/sanity.client";
import { propertySlugsQuery } from "@/lib/sanity.queries";

export async function generateStaticParams() {
  const properties = await sanityClient.fetch<{ slug: string }[]>(
    propertySlugsQuery
  );

  return properties.map((property) => ({ slug: property.slug }));
}

export default function PropertyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <PropertyDetailContent slug={params.slug} />;
}
