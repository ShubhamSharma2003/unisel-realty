const SITE_URL = "https://uniselrealty.com";
const LOGO_URL = `${SITE_URL}/images/header/unisel-logo.png`;

// ─── Global: Organization + WebSite ────────────────────────────────────────────

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Unisel Realty Pvt Ltd",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: LOGO_URL,
        contentUrl: LOGO_URL,
        width: 500,
        height: 500,
        caption: "Unisel Realty",
      },
      image: { "@id": `${SITE_URL}/#logo` },
      description:
        "Unisel Realty Pvt. Ltd. is based in Gurgaon at 408, 4th floor, Adani Miracle Mile, Sector 60, with over 15 years of rich experience in real estate. Specialised team of 20+ professionals in new booking, leasing, resale.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "408, 4th floor, Adani Miracle Mile, Sector 60",
        addressLocality: "Gurgaon",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
      sameAs: ["https://www.facebook.com/uniselrealty"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Unisel Realty",
      description: "Gurgaon's trusted real estate consultants",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
  ],
});

// ─── Homepage: RealEstateAgent + FAQPage ───────────────────────────────────────

type FaqItem = { question: string; answer: string };

export const homepageSchema = (faqs: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": `${SITE_URL}/#agent`,
      name: "Unisel Realty Pvt Ltd",
      url: SITE_URL,
      description:
        "Unisel Realty Pvt. Ltd. is based in Gurgaon at 408, 4th floor, Adani Miracle Mile, Sector 60, with over 15 years of rich experience in real estate.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "408, 4th floor, Adani Miracle Mile, Sector 60",
        addressLocality: "Gurgaon",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
      areaServed: "Gurgaon",
      image: LOGO_URL,
      sameAs: ["https://www.facebook.com/uniselrealty"],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faqpage`,
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ],
});

// ─── Blog listing: CollectionPage ──────────────────────────────────────────────

export const blogListingSchema = (blogCount: number) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/blog`,
  url: `${SITE_URL}/blog`,
  name: "Real Estate Blog | Unisel Realty",
  description: `Stay ahead in the property market with expert advice and updates. Read our ${blogCount} insightful blog posts.`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
});

// ─── Blog detail: Article ──────────────────────────────────────────────────────

type BlogData = {
  title: string;
  slug: string;
  excerpt?: string;
  date?: string;
  author?: string;
  coverImageUrl?: string | null;
  tag?: string;
};

export const blogArticleSchema = (post: BlogData) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${SITE_URL}/blog/${post.slug}`,
  headline: post.title,
  description: post.excerpt ?? "",
  url: `${SITE_URL}/blog/${post.slug}`,
  datePublished: post.date ?? "",
  dateModified: post.date ?? "",
  author: {
    "@type": "Person",
    name: post.author ?? "Unisel Realty",
  },
  publisher: { "@id": `${SITE_URL}/#organization` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
  ...(post.coverImageUrl
    ? {
        image: {
          "@type": "ImageObject",
          url: post.coverImageUrl,
          width: 1500,
          height: 980,
        },
      }
    : {}),
  keywords: post.tag ?? "",
  inLanguage: "en-US",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/${post.slug}`,
  },
});

// ─── Property listing: CollectionPage ──────────────────────────────────────────

type PropertyListingPageData = {
  name: string;
  description: string;
  url: string;
};

export const propertyCollectionSchema = (data: PropertyListingPageData) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": data.url,
  url: data.url,
  name: data.name,
  description: data.description,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
});

// ─── Property detail: RealEstateListing ────────────────────────────────────────

type PropertyData = {
  name: string;
  slug: string;
  location: string;
  rate: string | number;
  beds: number;
  baths: number;
  area: number;
  category?: string;
  mainImageUrl?: string | null;
};

export const propertyDetailSchema = (property: PropertyData) => {
  const category = property.category ?? "residential";
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${SITE_URL}/${category}/${property.slug}`,
    url: `${SITE_URL}/${category}/${property.slug}`,
    name: property.name,
    description: `${property.name} — ${property.beds} bed, ${property.baths} bath property located at ${property.location}, Gurgaon. Area: ${property.area} sq.ft.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location,
      addressLocality: "Gurgaon",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    numberOfRooms: property.beds,
    numberOfBathroomsTotal: property.baths,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.area,
      unitCode: "FTK",
    },
    price: String(property.rate),
    priceCurrency: "INR",
    ...(property.mainImageUrl
      ? {
          image: {
            "@type": "ImageObject",
            url: property.mainImageUrl,
            width: 1600,
            height: 1080,
          },
        }
      : {}),
    seller: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
};

// ─── Service detail: Service ───────────────────────────────────────────────────

type ServiceData = {
  title: string;
  slug: string;
  description?: string;
  imageUrl?: string | null;
  category?: string;
};

export const servicePageSchema = (service: ServiceData) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/services/${service.slug}`,
  name: service.title,
  description: service.description ?? "",
  url: `${SITE_URL}/services/${service.slug}`,
  provider: { "@id": `${SITE_URL}/#organization` },
  serviceType: service.category ?? "Real Estate Service",
  areaServed: "Gurgaon",
  ...(service.imageUrl
    ? {
        image: {
          "@type": "ImageObject",
          url: service.imageUrl,
          width: 1200,
          height: 630,
        },
      }
    : {}),
  inLanguage: "en-US",
});

// ─── About page ────────────────────────────────────────────────────────────────

export const aboutPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about`,
  url: `${SITE_URL}/about`,
  name: "About Us | Unisel Realty — Gurgaon Real Estate Experts",
  description:
    "Unisel Realty is a premier real estate consultancy based in Gurgaon, specialising in residential and commercial properties.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
});

// ─── Contact page ──────────────────────────────────────────────────────────────

export const contactPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact`,
  url: `${SITE_URL}/contact`,
  name: "Contact Us | Unisel Realty",
  description:
    "Get in touch with Unisel Realty for all your real estate needs in Gurgaon.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
});
