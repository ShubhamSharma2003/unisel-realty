import { sanityClient } from "./sanity.client";
import {
  propertiesByCategoryQuery,
  serviceBySlugQuery,
  servicesQuery,
  servicesSectionQuery,
  testimonialSectionQuery,
  testimonialsQuery,
  heroSectionQuery,
  heroBannersQuery,
  navLinksQuery,
} from "./sanity.queries";
import type { Service, ServicesSection } from "@/types/service";
import type { PropertyHomes } from "@/types/properyHomes";
import type { Testimonial, TestimonialSection } from "@/types/testimonial";
import type { HeroBanner, HeroSection } from "@/types/hero";
import type { NavLinks } from "@/types/navlink";

import type { FooterMenu } from "@/types/footerMenu";
import { footerMenusQuery } from "./sanity.queries";

export const getServicesSection = async () =>
  sanityClient.fetch<ServicesSection | null>(servicesSectionQuery);

export const getServices = async () =>
  sanityClient.fetch<Service[]>(servicesQuery);

export const getServiceBySlug = async (slug: string) =>
  sanityClient.fetch<Service | null>(serviceBySlugQuery, { slug });

export const getPropertiesByCategory = async (category: string) =>
  sanityClient.fetch<PropertyHomes[]>(propertiesByCategoryQuery, { category });

export const getTestimonialSection = async () =>
  sanityClient.fetch<TestimonialSection | null>(testimonialSectionQuery);

export const getTestimonials = async () =>
  sanityClient.fetch<Testimonial[]>(testimonialsQuery);

export const getHeroSection = async () =>
  sanityClient.fetch<HeroSection | null>(heroSectionQuery);

export const getHeroBanners = async () =>
  sanityClient.fetch<HeroBanner[]>(heroBannersQuery);

export const getNavLinks = async () =>
  sanityClient.fetch<NavLinks[]>(navLinksQuery);

export const getFooterMenus = async () =>
  sanityClient.fetch<FooterMenu[]>(footerMenusQuery);
