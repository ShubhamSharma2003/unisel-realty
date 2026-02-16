import { sanityClient } from "./sanity.client";
import {
  propertiesByCategoryQuery,
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
  blogListQuery,
} from "./sanity.queries";
import type { Service, ServicesSection } from "@/types/service";
import type { PropertyHomes } from "@/types/properyHomes";
import type { Testimonial, TestimonialSection } from "@/types/testimonial";
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

export const getProperties = async () =>
  sanityClient.fetch<PropertyHomes[]>(propertiesQuery, {}, { next: { tags: ['properties'] } });

export const getPropertyBySlug = async (slug: string) =>
  sanityClient.fetch<PropertyHomes | null>(propertyBySlugQuery, { slug }, { next: { tags: ['properties'] } });

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
