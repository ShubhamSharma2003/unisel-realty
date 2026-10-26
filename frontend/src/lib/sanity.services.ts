import { sanityClient } from "./sanity.client";
import {
  propertiesByCategoryQuery,
  propertiesByCategoryAndStatusQuery,
  propertiesQuery,
  propertyBySlugQuery,
  serviceBySlugQuery,
  servicesQuery,
  servicesSectionQuery,
  testimonialSectionQuery,
  testimonialsQuery,
  heroSectionQuery,
  heroBannersQuery,
  navLinksQuery,
  builderPartnersQuery,
  propertiesByMicromarketQuery,
  propertiesBySlugsQuery,
  getInTouchSectionQuery,
  blogListQuery,
  blogPostsByTagQuery,
  blogTagsQuery,
  moreBlogPostsQuery,
} from "./sanity.queries";
import type { Blog } from "@/types/blog";
import type { Service, ServicesSection } from "@/types/service";
import type { PropertyHomes } from "@/types/properyHomes";
import type { Testimonial, TestimonialSection, GetInTouchSection } from "@/types/testimonial";
import type { HeroBanner, HeroSection } from "@/types/hero";
import type { NavLinks } from "@/types/navlink";

import type { FooterMenu } from "@/types/footerMenu";
import { footerMenusQuery } from "./sanity.queries";

export const getServicesSection = async () =>
  sanityClient.fetch<ServicesSection | null>(servicesSectionQuery, {}, { next: { tags: ['service-pages'] } });

export const getServices = async () =>
  sanityClient.fetch<Service[]>(servicesQuery, {}, { next: { tags: ['service-pages'] } });

export const getServiceBySlug = async (slug: string) =>
  sanityClient.fetch<Service | null>(serviceBySlugQuery, { slug }, { next: { tags: ['service-pages'] } });

export const getPropertiesByCategory = async (category: string) =>
  sanityClient.fetch<PropertyHomes[]>(propertiesByCategoryQuery, { category }, { next: { tags: ['properties'] } });

export const getPropertiesByCategoryAndStatus = async (category: string, status: string) =>
  sanityClient.fetch<PropertyHomes[]>(propertiesByCategoryAndStatusQuery, { category, status }, { next: { tags: ['properties'] } });

export const getProperties = async () =>
  sanityClient.fetch<PropertyHomes[]>(propertiesQuery, {}, { next: { tags: ['properties'] } });

export const getPropertyBySlug = async (slug: string) =>
  sanityClient.fetch<PropertyHomes | null>(propertyBySlugQuery, { slug }, { next: { tags: ['properties'] } });

export const getPropertiesByMicromarket = async (micromarket: string) =>
  sanityClient.fetch<PropertyHomes[]>(propertiesByMicromarketQuery, { micromarket }, { next: { tags: ['properties'] } });

export const getPropertiesBySlugs = async (slugs: string[]) =>
  sanityClient.fetch<PropertyHomes[]>(propertiesBySlugsQuery, { slugs }, { next: { tags: ['properties'] } });

/** New launches that can be advertised: RERA-approved only (RERA Act 2016, s.3). */
export const getAdvertisableNewLaunches = async (category = "residential") =>
  (await getPropertiesByCategoryAndStatus(category, "new-launch")).filter((p) => p.reraApproved === true);

export const getBlogPosts = async () =>
  sanityClient.fetch<Blog[]>(blogListQuery, {}, { next: { tags: ['blogs'] } });

/** `tag` is matched case-insensitively. (The GROQ param can't be named `tag`: the client reserves it.) */
export const getBlogPostsByTag = async (tag: string) =>
  sanityClient.fetch<Blog[]>(blogPostsByTagQuery, { category: tag.toLowerCase() }, { next: { tags: ['blogs'] } });

export const getBlogTags = async () =>
  sanityClient.fetch<string[]>(blogTagsQuery, {}, { next: { tags: ['blogs'] } });

export const getMoreBlogPosts = async (excludeSlug: string, limit = 3) =>
  sanityClient.fetch<Blog[]>(moreBlogPostsQuery, { slug: excludeSlug, limit }, { next: { tags: ['blogs'] } });

export const getTestimonialSection = async () =>
  sanityClient.fetch<TestimonialSection | null>(testimonialSectionQuery, {}, { next: { tags: ['testimonials'] } });

export const getTestimonials = async () =>
  sanityClient.fetch<Testimonial[]>(testimonialsQuery, {}, { next: { tags: ['testimonials'] } });

export const getHeroSection = async () =>
  sanityClient.fetch<HeroSection | null>(heroSectionQuery, {}, { next: { tags: ['home'] } });

export const getHeroBanners = async () =>
  sanityClient.fetch<HeroBanner[]>(heroBannersQuery, {}, { next: { tags: ['home'] } });

export const getNavLinks = async () =>
  sanityClient.fetch<NavLinks[]>(navLinksQuery, {}, { next: { tags: ['navlinks'] } });

export const getFooterMenus = async () =>
  sanityClient.fetch<FooterMenu[]>(footerMenusQuery, {}, { next: { tags: ['footermenus'] } });

export const getBlogCount = async () =>
  sanityClient.fetch<number>(`count(*[_type == "post"])`, {}, { next: { tags: ['blogs'] } });

export const getPropertiesCount = async () =>
  sanityClient.fetch<number>(`count(*[_type == "property"])`, {}, { next: { tags: ['properties'] } });

export type BuilderPartner = {
  _id: string;
  name: string;
  logo: { asset: { _ref: string } };
  order?: number;
};

export const getBuilderPartners = async () =>
  sanityClient.fetch<BuilderPartner[]>(builderPartnersQuery, {}, { next: { tags: ['builder-partners'] } });

export const getGetInTouchSection = async () =>
  sanityClient.fetch<GetInTouchSection | null>(getInTouchSectionQuery, {}, { next: { tags: ['home'] } });
