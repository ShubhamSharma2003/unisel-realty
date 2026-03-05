import PropertyDetailContent from "@/components/Properties/PropertyDetailContent";
import { sanityClient } from "@/lib/sanity.client";
import { propertySlugsQuery } from "@/lib/sanity.queries";
import { getPropertyBySlug } from "@/lib/sanity.services";
import { urlFor } from "@/lib/sanity.image";
import { propertyDetailSchema } from "@/lib/jsonld";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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
  const siteUrl = "https://uniselrealty.com";
  const siteName = "Unisel Realty";

  if (!property) {
    return {
      title: "Not Found",
      robots: { index: false, follow: false },
    };
  }

  const imageUrl = property.images?.[0]
    ? urlFor(property.images[0]).width(1200).height(630).url()
    : `${siteUrl}/images/header/unisel-logo.png`;

  const title = `${property.name} | ${siteName}`;
  const description = `${property.beds} bed, ${property.baths} bath property at ${property.location}, Gurgaon. Area: ${property.area} sq.ft.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/residential/${slug}`,
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

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  const mainImageUrl = property.images?.[0]
    ? urlFor(property.images[0]).width(1600).height(1080).fit("crop").url()
    : null;

  const schema = propertyDetailSchema({
    name: property.name,
    slug: property.slug,
    location: property.location,
    rate: property.rate,
    beds: property.beds,
    baths: property.baths,
    area: property.area,
    category: property.category ?? "residential",
    mainImageUrl,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PropertyDetailContent slug={slug} property={property} />
    </>
  );
}
