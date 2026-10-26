// Minimal Sanity HTTP API client: GROQ reads, image upload, document create.

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = (process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01").replace(/^v/, "");
const token = process.env.SANITY_API_WRITE_TOKEN;

const base = () => {
  if (!projectId || !dataset) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET must be set");
  }
  return `https://${projectId}.api.sanity.io/v${apiVersion}`;
};

const authHeaders = () => (token ? { Authorization: `Bearer ${token}` } : {});

async function request(url, init = {}) {
  const res = await fetch(url, { ...init, headers: { ...authHeaders(), ...init.headers } });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Sanity ${res.status}: ${body.error?.description || body.message || res.statusText}`);
  }
  return body;
}

/**
 * Run a GROQ query. With a token, the raw perspective also returns drafts, so
 * a story that is waiting for review is not written up a second time.
 */
export async function query(groq, params = {}) {
  const url = new URL(`${base()}/data/query/${dataset}`);
  url.searchParams.set("query", groq);
  if (token) url.searchParams.set("perspective", "raw");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }
  return (await request(url)).result;
}

export async function uploadImage(buffer, filename) {
  const url = new URL(`${base()}/assets/images/${dataset}`);
  url.searchParams.set("filename", filename);
  const { document } = await request(url, {
    method: "POST",
    headers: { "Content-Type": "image/png" },
    body: buffer,
  });
  return document._id;
}

export async function createDocument(doc) {
  await request(`${base()}/data/mutate/${dataset}?returnIds=true`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ create: doc }] }),
  });
  return doc._id;
}

export const hasWriteToken = () => Boolean(token);

export const recentPostsQuery = `
  *[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc)[0...40] {
    title,
    "slug": slug.current,
    "date": coalesce(publishedAt, _createdAt),
    "draft": _id in path("drafts.**")
  }
`;

export const propertiesQuery = `
  *[_type == "property" && defined(slug.current) && !(_id in path("drafts.**"))] | order(name asc) {
    name,
    "slug": slug.current,
    micromarket,
    category
  }
`;

/** Listings the monthly roundup may advertise: registered residential launches only. */
export const newLaunchListingsQuery = `
  *[_type == "property" && category == "residential" && status == "new-launch" && reraApproved == true
    && defined(slug.current) && !(_id in path("drafts.**"))] | order(micromarket asc, name asc) {
    name,
    "slug": slug.current,
    micromarket,
    configuration,
    rate,
    priceLabel,
    area,
    structure,
    reraNumber
  }
`;

export const builderPartnersQuery = `
  *[_type == "builderPartner" && defined(name) && !(_id in path("drafts.**"))].name
`;

export const authorImageQuery = `
  *[_type == "post" && defined(authorImage) && !(_id in path("drafts.**"))] | order(_createdAt desc)[0].authorImage
`;

export const slugTakenQuery = `count(*[_type == "post" && slug.current == $slug]) > 0`;
