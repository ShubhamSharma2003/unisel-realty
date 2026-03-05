import { sanityClient } from "@/lib/sanity.client";
import { servicesSlugsQuery } from "@/lib/sanity.queries";
import ServicePageContent from "@/components/Properties/ServicePageContent";
import { getServiceBySlug } from '@/lib/sanity.services';
import { urlFor } from '@/lib/sanity.image';
import { servicePageSchema } from '@/lib/jsonld';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const services = await sanityClient.fetch<{ slug: string }[]>(servicesSlugsQuery);
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const siteUrl = 'https://uniselrealty.com';
  const siteName = 'Unisel Realty';

  if (!service) {
    return {
      title: 'Not Found',
      description: `Service not found on ${siteName}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${service.title} | ${siteName}`;
  const description = service.description ?? '';
  const imageUrl = service.image
    ? urlFor(service.image).width(1200).height(630).url()
    : `${siteUrl}/images/hero/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/services/${slug}`,
      siteName,
      images: [{ url: imageUrl, alt: service.title, width: 1200, height: 630 }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  const imageUrl = service.image
    ? urlFor(service.image).width(1200).height(630).url()
    : null;

  const schema = servicePageSchema({
    title: service.title,
    slug: service.slug,
    description: service.description,
    imageUrl,
    category: service.category,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServicePageContent slug={slug} />
    </>
  );
}
