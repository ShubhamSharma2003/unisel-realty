import TestimonialContent from "./TestimonialContent";
import { getTestimonialSection, getTestimonials } from "@/lib/sanity.services";

const Testimonial = async () => {
  const [section, testimonials] = await Promise.all([
    getTestimonialSection(),
    getTestimonials(),
  ]);

  return <TestimonialContent section={section} testimonials={testimonials} />;
};

export default Testimonial;
