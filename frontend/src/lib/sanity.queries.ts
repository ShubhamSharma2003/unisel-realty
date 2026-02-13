import { groq } from "next-sanity";

export const blogSectionQuery = groq`
  *[_type == "blogSection"][0] {
    badge,
    title,
    subtitle,
    ctaText,
    ctaLink,
    postLimit
  }
`;

export const blogCardsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...$limit] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    "date": publishedAt,
    tag,
    detail
  }
`;

export const blogListQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    "date": publishedAt,
    tag,
    detail
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    "date": publishedAt,
    tag,
    detail,
    author,
    authorImage,
    content
  }
`;

export const servicesSectionQuery = groq`
  *[_type == "servicesSection"][0] {
    badge,
    title,
    subtitle,
    ctaText,
    ctaLink,
    backgroundLight,
    backgroundDark
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc, title asc) {
    _id,
    title,
    description,
    "slug": slug.current,
    image,
    category,
    badge,
    order
  }
`;

export const servicesSlugsQuery = groq`
  *[_type == "service" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    description,
    "slug": slug.current,
    image,
    category,
    badge,
    order
  }
`;

export const propertiesByCategoryQuery = groq`
  *[_type == "property" && category == $category] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    location,
    rate,
    beds,
    baths,
    area,
    images,
    category
  }
`;

export const propertiesForHomeQuery = groq`
  *[_type == "property"] | order(_createdAt desc)[0...$limit] {
    _id,
    name,
    "slug": slug.current,
    location,
    rate,
    beds,
    baths,
    area,
    images,
    category
  }
`;

export const propertiesQuery = groq`
  *[_type == "property"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    location,
    rate,
    beds,
    baths,
    area,
    images,
    category
  }
`;

export const propertiesSectionQuery = groq`
  *[_type == "propertiesSection"][0] {
    badge,
    title,
    subtitle,
    mode,
    limit,
    "selectedProperties": selectedProperties[]-> {
      _id,
      name,
      "slug": slug.current,
      location,
      rate,
      beds,
      baths,
      area,
      images,
      category
    }
  }
`;

export const propertySlugsQuery = groq`
  *[_type == "property" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const propertyBySlugQuery = groq`
  *[_type == "property" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    location,
    rate,
    beds,
    baths,
    area,
    images,
    category,
    description,
    features[] {
      icon,
      title,
      description
    },
    amenities[] {
      icon,
      label
    },
    mapUrl
  }
`;

export const testimonialSectionQuery = groq`
  *[_type == "testimonialSection"][0] {
    badge,
    title,
    subtitle
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc, _createdAt desc) {
    _id,
    review,
    name,
    position,
    image,
    order
  }
`;
