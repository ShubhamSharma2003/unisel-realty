import PropertyDetailContent from "@/components/Properties/PropertyDetailContent";
import { sanityClient } from "@/lib/sanity.client";
import { propertySlugsQuery } from "@/lib/sanity.queries";

export async function generateStaticParams() {
  const properties = await sanityClient.fetch<{ slug: string }[]>(
    propertySlugsQuery
  );
  return properties.map((property) => ({ slug: property.slug }));
}

export default async function CommercialPropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PropertyDetailContent slug={slug} />;
}
