import type { Metadata } from "next";
import HeroSub from "@/components/shared/HeroSub";
import ServicesOffered from "@/components/Home/ServicesOffered";
import { breadcrumbSchema } from "@/lib/jsonld";

const SITE_URL = "https://uniselrealty.com";
const SITE_NAME = "Unisel Realty";

export const metadata: Metadata = {
  title: `Our Services | ${SITE_NAME}`,
  description:
    "Explore the full range of real estate services offered by Unisel Realty - from home loans and property management to NRI investment advisory in Gurgaon.",
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: `Our Services | ${SITE_NAME}`,
    description:
      "Explore the full range of real estate services offered by Unisel Realty in Gurgaon.",
    url: `${SITE_URL}/services`,
    siteName: SITE_NAME,
    images: [{ url: `${SITE_URL}/images/hero/og-image.jpg`, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Our Services | ${SITE_NAME}`,
    description:
      "Explore the full range of real estate services offered by Unisel Realty in Gurgaon.",
  },
};

const servicesPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/services`,
  url: `${SITE_URL}/services`,
  name: `Our Services | ${SITE_NAME}`,
  description:
    "Property management, home loans, and NRI investment advisory services by Unisel Realty in Gurgaon.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

export default function ServicesPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Services", url: `${SITE_URL}/services` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <HeroSub
        title="Our Services"
        description="Comprehensive real estate solutions tailored to your needs — from finding your dream home to managing your investment."
        badge="What We Offer"
      />
      <ServicesOffered />
    </>
  );
}
