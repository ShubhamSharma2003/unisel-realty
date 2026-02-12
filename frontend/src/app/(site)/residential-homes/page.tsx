import { Metadata } from "next";
import ServicePageContent from "@/components/Properties/ServicePageContent";

export const metadata: Metadata = {
    title: "Property List | Homely",
};

const page = () => {
    return <ServicePageContent slug="residential-homes" />;
};

export default page;