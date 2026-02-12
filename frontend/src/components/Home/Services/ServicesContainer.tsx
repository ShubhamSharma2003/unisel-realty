import ServicesContent from "./ServicesContent";
import { getServices, getServicesSection } from "@/lib/sanity.services";

const ServicesContainer = async () => {
  const [section, services] = await Promise.all([
    getServicesSection(),
    getServices(),
  ]);

  return <ServicesContent section={section} services={services} />;
};

export default ServicesContainer;
