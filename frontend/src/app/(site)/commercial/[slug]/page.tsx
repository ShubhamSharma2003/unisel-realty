import PropertyDetailContent from "@/components/Properties/PropertyDetailContent";
import { sanityClient } from "@/lib/sanity.client";
import { propertySlugsQuery } from "@/lib/sanity.queries";
import { getPropertyBySlug } from "@/lib/sanity.services";
import { urlFor } from "@/lib/sanity.image";
import { propertyDetailSchema, breadcrumbSchema } from "@/lib/jsonld";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const siteUrl = "https://uniselrealty.com";

export async function generateStaticParams() {
  const properties = await sanityClient.fetch<{ slug: string }[]>(
    propertySlugsQuery
  );
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  const siteName = "Unisel Realty";

  if (!property) {
    return {
      title: "Not Found",
      robots: { index: false, follow: false },
    };
  }

  const firstImage = property.images?.find(
    (img) => img && typeof img === "object" && "asset" in img
  );
  const imageUrl = firstImage
    ? urlFor(firstImage).width(1200).height(630).url()
    : `${siteUrl}/images/header/unisel-logo.png`;

  const title = `${property.name} | ${siteName}`;
  const description = `${property.name} — commercial property at ${property.location}, Gurgaon. Area: ${property.area} sq.ft. Contact Unisel Realty for best deals.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/commercial/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/commercial/${slug}`,
      siteName,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: property.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function CommercialPropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  const firstImage = property.images?.find(
    (img) => img && typeof img === "object" && "asset" in img
  );
  const mainImageUrl = firstImage
    ? urlFor(firstImage).width(1600).height(1080).fit("crop").url()
    : null;

  const schema = propertyDetailSchema({
    name: property.name,
    slug: property.slug,
    location: property.location,
    rate: property.rate,
    configuration: property.configuration,
    structure: property.structure,
    area: property.area,
    category: property.category ?? "commercial",
    mainImageUrl,
  });

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Commercial", url: `${siteUrl}/commercial` },
    { name: property.name, url: `${siteUrl}/commercial/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <PropertyDetailContent slug={slug} property={property} />
    </>
  );
}
