import { sanityClient } from "./sanity.client";
import {
  propertiesByCategoryQuery,
  serviceBySlugQuery,
  servicesQuery,
  servicesSectionQuery,
  testimonialSectionQuery,
  testimonialsQuery,
} from "./sanity.queries";
import type { Service, ServicesSection } from "@/types/service";
import type { PropertyHomes } from "@/types/properyHomes";
import type { Testimonial, TestimonialSection } from "@/types/testimonial";

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
