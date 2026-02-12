import { sanityClient } from "./sanity.client";
import {
  propertiesByCategoryQuery,
  serviceBySlugQuery,
  servicesQuery,
  servicesSectionQuery,
} from "./sanity.queries";
import type { Service, ServicesSection } from "@/types/service";
import type { PropertyHomes } from "@/types/properyHomes";

export const getServicesSection = async () =>
  sanityClient.fetch<ServicesSection | null>(servicesSectionQuery);

export const getServices = async () =>
  sanityClient.fetch<Service[]>(servicesQuery);

export const getServiceBySlug = async (slug: string) =>
  sanityClient.fetch<Service | null>(serviceBySlugQuery, { slug });

export const getPropertiesByCategory = async (category: string) =>
  sanityClient.fetch<PropertyHomes[]>(propertiesByCategoryQuery, { category });
