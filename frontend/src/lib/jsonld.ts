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
        postalCode: "122102",
        addressCountry: "IN",
      },
      telephone: "+91-9999999999",
      email: "info@uniselrealty.com",
      sameAs: [
        "https://www.facebook.com/uniselrealty",
        "https://www.instagram.com/uniselrealty",
        "https://www.linkedin.com/company/uniselrealty",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Unisel Realty",
      description: "Gurgaon's trusted real estate consultants",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/residential?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
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
        "Gurgaon's most trusted advisors for luxury real estate & high-return investments. Exclusive pre-launch access to DLF, Godrej and M3M. Dedicated NRI desk. $2B+ transacted value, 2000+ families placed in their dream homes. Est. 2006.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "408, 4th floor, Adani Miracle Mile, Sector 60",
        addressLocality: "Gurgaon",
        addressRegion: "Haryana",
        postalCode: "122102",
        addressCountry: "IN",
      },
      foundingDate: "2006",
      areaServed: {
        "@type": "City",
        name: "Gurgaon",
        sameAs: "https://en.wikipedia.org/wiki/Gurgaon",
      },
      image: LOGO_URL,
      sameAs: [
        "https://www.facebook.com/uniselrealty",
        "https://www.instagram.com/uniselrealty",
        "https://www.linkedin.com/company/uniselrealty",
      ],
      priceRange: "$$",
      openingHours: "Mo-Sa 09:00-18:00",
      slogan: "Not All Properties Are Investments. We Help You Pick the Right Ones.",
    },
    ...(faqs.length > 0
      ? [
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
        ]
      : []),
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
          width: 1200,
          height: 630,
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

// ─── Property listing: CollectionPage + ItemList ─────────────────────────────

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

type PropertyListItem = {
  name: string;
  slug: string;
  category?: string;
};

export const propertyItemListSchema = (
  items: PropertyListItem[],
  listName: string
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: listName,
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_URL}/${item.category ?? "residential"}/${item.slug}`,
    name: item.name,
  })),
});

// ─── Property detail: RealEstateListing ────────────────────────────────────────

type PropertyData = {
  name: string;
  slug: string;
  location: string;
  rate?: string | number;
  configuration?: string;
  structure?: string;
  area?: string;
  category?: string;
  mainImageUrl?: string | null;
};

export const propertyDetailSchema = (property: PropertyData) => {
  const category = property.category ?? "residential";
  const descParts = [property.name];
  if (property.configuration) descParts.push(property.configuration);
  if (property.structure) descParts.push(property.structure);
  descParts.push(`located at ${property.location}, Gurgaon`);
  if (property.area) descParts.push(`Area: ${property.area}`);
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${SITE_URL}/${category}/${property.slug}`,
    url: `${SITE_URL}/${category}/${property.slug}`,
    name: property.name,
    description: descParts.join(" — "),
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location,
      addressLocality: "Gurgaon",
      addressRegion: "Haryana",
      postalCode: "122102",
      addressCountry: "IN",
    },
    ...(property.area ? { floorSize: { "@type": "QuantitativeValue", value: property.area } } : {}),
    ...(property.rate !== undefined ? { price: String(property.rate) } : {}),
    priceCurrency: "INR",
    ...(property.mainImageUrl
      ? {
          image: {
            "@type": "ImageObject",
            url: property.mainImageUrl,
            width: 1200,
            height: 630,
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
  areaServed: {
    "@type": "City",
    name: "Gurgaon",
    sameAs: "https://en.wikipedia.org/wiki/Gurgaon",
  },
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

// ─── Valuation page ────────────────────────────────────────────────────────────

export const valuationPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/property-valuation`,
  url: `${SITE_URL}/property-valuation`,
  name: "Property Valuation Gurgaon — Check Current Market Value | Unisel Realty",
  description:
    "Get an instant estimate of your property's current market value in Gurgaon. Free online valuation tool covering all sectors and localities — by Unisel Realty.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
  about: {
    "@type": "Service",
    name: "Property Valuation",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Gurgaon" },
    serviceType: "Real Estate Valuation",
  },
});

// ─── Breadcrumb ────────────────────────────────────────────────────────────────

type BreadcrumbItem = { name: string; url: string };

export const breadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// ─── About page ────────────────────────────────────────────────────────────────

export const aboutPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about`,
  url: `${SITE_URL}/about`,
  name: "About Us | Unisel Realty - Gurgaon Real Estate Experts",
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
  mainEntity: {
    "@type": "ContactPoint",
    telephone: "+91-9999999999",
    contactType: "customer service",
    email: "info@uniselrealty.com",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  inLanguage: "en-US",
});
