import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type Testimonial = {
    _id?: string;
    review: string;
    name: string;
    position?: string;
    image?: SanityImageSource | string;
};

export type TestimonialSection = {
    visible?: boolean;
    badge?: string;
    title?: string;
    subtitle?: string;
};

export type GetInTouchSection = {
    visible?: boolean;
};