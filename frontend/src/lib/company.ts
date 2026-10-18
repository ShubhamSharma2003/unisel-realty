/**
 * Single source of truth for company facts.
 *
 * These numbers appear in page copy, metadata, JSON-LD, llms.txt and the footer.
 * They used to be retyped in each place and had drifted apart (three founding
 * years, four transacted-value figures, three postal codes). Import from here
 * instead of hardcoding, so the site can never contradict itself again.
 */

export const SITE_URL = "https://www.uniselrealty.com";

const FOUNDING_YEAR = 2005;

export const COMPANY = {
  name: "Unisel Realty",
  legalName: "Unisel Realty Pvt Ltd",
  cin: "U70200DL2011PTC222901",

  foundingYear: FOUNDING_YEAR,
  /** Schema.org foundingDate (ISO year). */
  foundingDate: String(FOUNDING_YEAR),
  /** "Est. 2005" — use wherever the founding year is shown in copy. */
  established: `Est. ${FOUNDING_YEAR}`,
  /** "Since 2005" — sentence-leading variant. */
  since: `Since ${FOUNDING_YEAR}`,

  /** Transacted value. Keep as one string so the unit never drifts. */
  transactedValue: "$2B+",
  /** Clients served. */
  clientsServed: "10,000+ families",
  clientsServedShort: "10,000+",
  /** Properties under active management. */
  propertiesManaged: "500+",

  founder: {
    name: "Rohit Sharma",
    jobTitle: "Founder & Managing Director",
  },

  telephone: "+91-8010-303-303",
  /** tel: href form — digits only, no separators. */
  telephoneHref: "+918010303303",
  email: "info@uniselrealty.com",

  address: {
    streetAddress: "408, 4th Floor, Adani Miracle Mile, Sector 60",
    addressLocality: "Gurgaon",
    addressRegion: "Haryana",
    postalCode: "122011",
    addressCountry: "IN",
  },

  geo: { latitude: 28.41490, longitude: 77.09270 },

  /** Google Business Profile. Keep in step with the live listing. */
  googlePlaceId: "ChIJLcgsOVg9DTkRLhTjjMWWuzk",
  googleMapsUrl: "https://maps.google.com/?cid=4160836245716997678",

  sameAs: [
    "https://www.facebook.com/uniselrealty",
    "https://www.instagram.com/uniselrealty",
    "https://www.linkedin.com/company/uniselrealty",
    "https://x.com/UniselR40194",
    "https://www.youtube.com/@uniselrealty9759",
  ],

  openingHours: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "09:00",
    closes: "18:00",
  },
} as const;

/** Years in business, so copy never goes stale. */
export const yearsInBusiness = () =>
  new Date().getFullYear() - COMPANY.foundingYear;

/** "408, 4th Floor, … , Gurgaon, Haryana 122011" — one-line NAP for display. */
export const formattedAddress = () =>
  `${COMPANY.address.streetAddress}, ${COMPANY.address.addressLocality}, ` +
  `${COMPANY.address.addressRegion} ${COMPANY.address.postalCode}`;
