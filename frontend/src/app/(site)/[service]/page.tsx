import { sanityClient } from "@/lib/sanity.client";
import {
  servicesSlugsQuery,
} from "@/lib/sanity.queries";
import ServicePageContent from "@/components/Properties/ServicePageContent";
import { getServiceBySlug } from '@/lib/sanity.services';
import { urlFor } from '@/lib/sanity.image';

export async function generateStaticParams() {
  const services = await sanityClient.fetch<{ slug: string }[]>(
    servicesSlugsQuery
  );

  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({ params }: { params: { service: string } }) {
  const slug = params.service;
  const service = await getServiceBySlug(slug);

  const siteUrl = 'https://uniselrealty.com';
  const siteName = 'Unisel Realty';

  if (!service) {
    return {
      title: 'Not Found',
      description: `Service ${slug} not found on ${siteName}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${service.title} | ${siteName}`;
  const description = service.description ?? '';
  const imageUrl = service.image ? urlFor(service.image).width(1200).height(630).url() : `${siteUrl}/images/hero/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/services/${slug}`,
      siteName,
      images: [
        {
          url: imageUrl,
          alt: service.title,
          width: 1200,
          height: 630,
        },
      ],
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
  params: { service: string };
}) {
  const awaitedParams = await params;
  return <ServicePageContent slug={awaitedParams.service} />;
}
