import { COMPANY, SITE_URL, yearsInBusiness } from "@/lib/company";

export { SITE_URL };
const LOGO_URL = `${SITE_URL}/images/header/unisel-logo.png`;

// Proper OpeningHoursSpecification, built from the single source of truth in
// company.ts. Replaces the deprecated bare `openingHours: "Mo-Sa 09:00-18:00"`
// string format that used to live on the homepage-only RealEstateAgent node.
const openingHoursSpecification = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: [...COMPANY.openingHours.days],
  opens: COMPANY.openingHours.opens,
  closes: COMPANY.openingHours.closes,
};

// ─── Global: canonical business entity + WebSite ───────────────────────────────

// One canonical business entity for the whole site, rendered in layout.tsx's
// <head> on every page. Previously this was split into two unlinked nodes —
// a bare Organization here and a separate RealEstateAgent (#agent) declared
// only on the homepage with different properties (geo, hours, priceRange).
// Everything else in the graph (homepageSchema, aboutPageSchema,
// propertyCollectionSchema, etc.) now references this single node by @id
// instead of redeclaring the business.
export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["RealEstateAgent", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: COMPANY.legalName,
      alternateName: COMPANY.name,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: LOGO_URL,
        contentUrl: LOGO_URL,
        width: 500,
        height: 500,
        caption: COMPANY.name,
      },
      image: { "@id": `${SITE_URL}/#logo` },
      description:
        `${COMPANY.name} — Gurgaon's trusted advisors for luxury real estate & high-return investments, with over ${yearsInBusiness()} years of experience. Exclusive pre-launch access to DLF, Godrej and M3M. Dedicated NRI desk. ${COMPANY.transactedValue} transacted value, ${COMPANY.clientsServed} placed in their dream homes.`,
      address: { "@type": "PostalAddress", ...COMPANY.address },
      geo: {
        "@type": "GeoCoordinates",
        latitude: COMPANY.geo.latitude,
        longitude: COMPANY.geo.longitude,
      },
      telephone: COMPANY.telephone,
      email: COMPANY.email,
      foundingDate: COMPANY.foundingDate,
      // Luxury-tier indicator ($...$$$$), not a literal currency figure —
      // this is the schema.org LocalBusiness convention for priceRange.
      priceRange: "$$$$",
      areaServed: {
        "@type": "City",
        name: COMPANY.address.addressLocality,
        sameAs: "https://en.wikipedia.org/wiki/Gurgaon",
      },
      knowsAbout: [
        "Luxury Residential Properties",
        "Commercial Real Estate",
        "NRI Property Investment",
        "Pre-Launch Property Allotment",
        "Property Management",
      ],
      numberOfEmployees: { "@type": "QuantitativeValue", value: 20 },
      hasMap: COMPANY.googleMapsUrl,
      openingHoursSpecification: [openingHoursSpecification],
      sameAs: [...COMPANY.sameAs],
      // Corporate Identification Number: the registry identifier that ties
      // this site to the real legal entity.
      identifier: {
        "@type": "PropertyValue",
        propertyID: "CIN",
        value: COMPANY.cin,
      },
      founder: { "@id": `${SITE_URL}/#founder` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: COMPANY.founder.name,
      jobTitle: COMPANY.founder.jobTitle,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      url: `${SITE_URL}/about`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: COMPANY.name,
      description: "Gurgaon's trusted real estate consultants",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
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

// ─── Homepage: FAQPage ──────────────────────────────────────────────────────────

type FaqItem = { question: string; answer: string };

// The business entity previously redeclared here as a separate #agent node
// (RealEstateAgent, with its own geo/hours/priceRange that could drift from
// the #organization node) now lives once in organizationSchema, which
// layout.tsx already renders on every page including this one. This function
// keeps its name/signature (called from src/app/page.tsx) but only emits the
// page-specific FAQPage block.
export const homepageSchema = (faqs: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@graph": [
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

export const blogListingSchema = () => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/blog`,
  url: `${SITE_URL}/blog`,
  name: "Real Estate Blog | Unisel Realty",
  description: "Expert insights on Gurgaon luxury real estate, NRI property investment, and market trends from Unisel Realty's advisory team.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
});

// ─── Blog detail: Article ──────────────────────────────────────────────────────

type BlogData = {
  title: string;
  slug: string;
  excerpt?: string;
  date?: string;
  updatedAt?: string;
  author?: string;
  coverImageUrl?: string | null;
  tag?: string;
};

export const blogArticleSchema = (post: BlogData) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${SITE_URL}/blog/${post.slug}#article`,
  headline: post.title,
  description: post.excerpt ?? "",
  url: `${SITE_URL}/blog/${post.slug}`,
  datePublished: post.date ?? "",
  dateModified: post.updatedAt ?? post.date ?? "",
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
  inLanguage: "en-IN",
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

export const propertyCollectionSchema = (
  data: PropertyListingPageData & { dateModified?: string }
) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": data.url,
  url: data.url,
  name: data.name,
  description: data.description,
  ...(data.dateModified ? { dateModified: data.dateModified } : {}),
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  // Was `#agent` — the separate, now-removed RealEstateAgent node. Points at
  // the single canonical business entity instead.
  mainEntity: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "en-IN",
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
    url: `${SITE_URL}/properties/${item.slug}`,
    name: item.name,
  })),
});

// ─── Property detail: RealEstateListing ────────────────────────────────────────

/**
 * Parses Indian-format price strings such as "9.49 Cr Onwards",
 * "₹4 CR Onwards" or "85 Lakh" into a numeric INR value for Offer.price.
 * Google/schema.org reject a free-text price, so when nothing numeric can be
 * confidently extracted (e.g. "Price on Request") this returns undefined and
 * the caller omits the Offer entirely instead of shipping an invalid value.
 */
function parseInrPrice(rate: string | number | undefined): number | undefined {
  if (rate === undefined || rate === null) return undefined;
  if (typeof rate === "number") return Number.isFinite(rate) ? rate : undefined;
  const lower = rate.toLowerCase();
  const cr = lower.match(/([\d,]+(?:\.\d+)?)\s*cr/);
  if (cr) return parseFloat(cr[1].replace(/,/g, "")) * 1e7;
  const lakh = lower.match(/([\d,]+(?:\.\d+)?)\s*(lakh|lac)/);
  if (lakh) return parseFloat(lakh[1].replace(/,/g, "")) * 1e5;
  return undefined;
}

/**
 * Extracts numeric floor-size value(s) in sq ft from strings like
 * "2,711 - 4,500+ Sq.ft" (a range -> minValue/maxValue) or "1,200 Sq.ft" (a
 * single value). Returns undefined when nothing numeric is present so the
 * caller can omit floorSize instead of shipping the raw text as a value.
 */
function parseFloorSize(
  area: string | undefined
): { value: number } | { minValue: number; maxValue: number } | undefined {
  if (!area) return undefined;
  const numbers = area
    .replace(/,/g, "")
    .match(/[\d.]+/g)
    ?.map(Number)
    .filter((n) => Number.isFinite(n));
  if (!numbers || numbers.length === 0) return undefined;
  if (numbers.length === 1) return { value: numbers[0] };
  return { minValue: Math.min(...numbers), maxValue: Math.max(...numbers) };
}

/**
 * Maps the CMS `status` field (new-launch/ready-to-move/under-construction/
 * near-possession/pre-leased) to a schema.org Offer availability value.
 * Only recognised statuses get a value — everything else is omitted rather
 * than the previous hardcoded "InStock" applied to every listing regardless
 * of real inventory state.
 */
function availabilityFromStatus(status: string | undefined): string | undefined {
  switch (status) {
    case "ready-to-move":
    case "pre-leased":
      return "https://schema.org/InStock";
    case "near-possession":
      return "https://schema.org/LimitedAvailability";
    case "new-launch":
    case "under-construction":
      return "https://schema.org/PreOrder";
    default:
      return undefined;
  }
}

type PropertyData = {
  name: string;
  slug: string;
  location: string;
  rate?: string | number;
  configuration?: string;
  structure?: string;
  area?: string;
  category?: string;
  status?: string;
  mainImageUrl?: string | null;
  /** Only pass these when the dimensions are the real, known output size
   *  (e.g. the actual urlFor().width().height() crop requested) — never a
   *  guessed/default size. */
  mainImageWidth?: number;
  mainImageHeight?: number;
};

export const propertyDetailSchema = (property: PropertyData) => {
  const canonicalUrl = `${SITE_URL}/properties/${property.slug}`;
  const descParts = [property.name];
  if (property.configuration) descParts.push(property.configuration);
  if (property.structure) descParts.push(property.structure);
  descParts.push(`located at ${property.location}, Gurgaon`);
  if (property.area) descParts.push(`Area: ${property.area}`);

  const price = parseInrPrice(property.rate);
  const floorSize = parseFloorSize(property.area);
  const availability = availabilityFromStatus(property.status);

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${canonicalUrl}#listing`,
    url: canonicalUrl,
    name: property.name,
    description: descParts.join(" — "),
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location,
      addressLocality: COMPANY.address.addressLocality,
      addressRegion: COMPANY.address.addressRegion,
      addressCountry: COMPANY.address.addressCountry,
    },
    ...(floorSize
      ? {
          floorSize: {
            "@type": "QuantitativeValue",
            ...floorSize,
            unitCode: "FTK",
          },
        }
      : {}),
    ...(price !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "INR",
            ...(availability ? { availability } : {}),
            seller: { "@id": `${SITE_URL}/#organization` },
          },
        }
      : {}),
    ...(property.mainImageUrl
      ? {
          // Full ImageObject with real dimensions only when the caller knows
          // them (i.e. the actual crop requested); otherwise a bare URL
          // rather than a fabricated 1200x630.
          image:
            property.mainImageWidth && property.mainImageHeight
              ? {
                  "@type": "ImageObject",
                  url: property.mainImageUrl,
                  width: property.mainImageWidth,
                  height: property.mainImageHeight,
                }
              : property.mainImageUrl,
        }
      : {}),
    inLanguage: "en-IN",
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
    name: COMPANY.address.addressLocality,
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
  inLanguage: "en-IN",
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
  inLanguage: "en-IN",
  about: {
    "@type": "Service",
    name: "Property Valuation",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: COMPANY.address.addressLocality },
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

// ─── Location/micromarket page ─────────────────────────────────────────────────

type LocationPageData = {
  name: string;
  description: string;
  micromarket: string;
};

// Approximate public centroid coordinates for each known micromarket
// corridor. These are reference points for structured-data entity clarity —
// not a precise address pin — and should be verified/refined against Google
// Maps before anything relies on them for geofencing-level precision.
const MICROMARKET_GEO: Record<string, { latitude: number; longitude: number }> = {
  "golf-course-road": { latitude: 28.4596, longitude: 77.0829 },
  "golf-course-extension-road": { latitude: 28.4150, longitude: 77.0636 },
  "dwarka-expressway": { latitude: 28.4989, longitude: 76.9881 },
  "gwal-pahari": { latitude: 28.4318, longitude: 77.1278 },
  "sohna-road": { latitude: 28.3858, longitude: 77.0420 },
  "new-gurgaon": { latitude: 28.3881, longitude: 76.9654 },
};

// Derives a clean display name ("Golf Course Road") from the micromarket
// slug, used for the Place name instead of the page title (which is a full
// sentence like "Properties on Golf Course Road, Gurgaon" and was previously
// reused verbatim as the Place's name).
const placeNameFromSlug = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const locationPageSchema = (data: LocationPageData) => {
  const geo = MICROMARKET_GEO[data.micromarket];
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/location/${data.micromarket}`,
    url: `${SITE_URL}/location/${data.micromarket}`,
    name: data.name,
    description: data.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: {
      "@type": "Place",
      "@id": `${SITE_URL}/location/${data.micromarket}#place`,
      name: placeNameFromSlug(data.micromarket),
      ...(geo ? { geo: { "@type": "GeoCoordinates", ...geo } } : {}),
      containedInPlace: {
        "@type": "City",
        name: COMPANY.address.addressLocality,
        sameAs: "https://en.wikipedia.org/wiki/Gurgaon",
      },
    },
    inLanguage: "en-IN",
    // propertyItemListSchema (ItemList of listings in this micromarket) is
    // intentionally NOT wired in here: the property data for a micromarket
    // is fetched inside <PropertiesListingByMicromarket> (a child component
    // of location/[micromarket]/page.tsx), not available at this call site.
    // To add it, fetch properties server-side in that page (same pattern as
    // propertyCollectionSchema's callers on /residential, /commercial) and
    // pass them to an `items` param here, e.g.
    // `...(items ? { mainEntity: propertyItemListSchema(items, data.name) } : {})`.
  };
};

// ─── About page ────────────────────────────────────────────────────────────────

export const aboutPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about`,
  url: `${SITE_URL}/about`,
  name: "About Unisel Realty | Gurgaon's Trusted Luxury Real Estate Advisory Since 2005",
  description:
    `${COMPANY.legalName} — 20+ years advising on luxury residential and commercial properties in Gurgaon. ${COMPANY.transactedValue} transacted, ${COMPANY.clientsServed} served, 90% client retention.`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  // Was a full inline RealEstateAgent redeclaration under a separate #agent
  // id (duplicate entity, different properties than #organization). Now
  // just references the single canonical business entity; the extra detail
  // it used to carry (numberOfEmployees, knowsAbout) moved onto
  // organizationSchema so it isn't lost.
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
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
    telephone: COMPANY.telephone,
    contactType: "customer service",
    email: COMPANY.email,
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  inLanguage: "en-IN",
});
