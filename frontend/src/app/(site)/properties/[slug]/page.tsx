import PropertyDetailContent from "@/components/Properties/PropertyDetailContent";
import { sanityClient } from "@/lib/sanity.client";
import { propertySlugsQuery } from "@/lib/sanity.queries";
import { getPropertyBySlug } from "@/lib/sanity.services";
import { urlFor } from "@/lib/sanity.image";
import { propertyDetailSchema, breadcrumbSchema } from "@/lib/jsonld";
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
  const description = `${property.name} — ${property.beds} BHK, ${property.baths} bath at ${property.location}, Gurgaon. Area: ${property.area} sq.ft. Contact Unisel Realty for best deals.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/properties/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/properties/${slug}`,
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

  const categoryLabel = property.category === "commercial" ? "Commercial" : "Residential";
  const categoryPath = property.category === "commercial" ? "commercial" : "residential";

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

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://uniselrealty.com" },
    { name: categoryLabel, url: `https://uniselrealty.com/${categoryPath}` },
    { name: property.name, url: `https://uniselrealty.com/properties/${slug}` },
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
