import { getHeroBanners } from "@/lib/sanity.services";
import HeroWrapper from "./HeroWrapper";

const Hero = async () => {
  const banners = await getHeroBanners();

  return <HeroWrapper banners={banners} />;
};

export default Hero;
