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
