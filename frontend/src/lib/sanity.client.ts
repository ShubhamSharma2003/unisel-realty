import { createClient } from "next-sanity";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uqxf8913";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  deployment: {
    appId: 'imfp610gzynr4gee1s5k2jfb',
  },
};

export const sanityClient = createClient(sanityConfig);
