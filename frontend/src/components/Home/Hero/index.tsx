import HeroContent from "./HeroContent";
import { getHeroBanners } from "@/lib/sanity.services";

const Hero = async () => {
  const banners = await getHeroBanners();

  return <HeroContent section={null} banners={banners} />;
};

export default Hero;
