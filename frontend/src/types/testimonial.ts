import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type Testimonial = {
    _id?: string;
    review: string;
    name: string;
    position?: string;
    image?: SanityImageSource | string;
};

export type TestimonialSection = {
    badge?: string;
    title?: string;
    subtitle?: string;
};