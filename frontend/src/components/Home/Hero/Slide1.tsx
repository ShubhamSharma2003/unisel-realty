import Image from "next/image";
import Link from "next/link";

type Slide1Props = {
  isMobile: boolean;
};

const Slide1 = ({ isMobile }: Slide1Props) => {
  const bgImage = isMobile
    ? "/images/hero/hero-mob-1new.png"
    : "/images/hero/hero-desk-1.png";

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full flex flex-col">
        <Image
          src={bgImage}
          alt="Luxury residential and commercial properties in Gurgaon"
          fill
          className="object-cover object-center"
          priority={false}
          unoptimized={true}
        />
        <div className="absolute inset-0 z-0 bg-black/40" />

        <div className="relative z-10 flex-1 flex items-center">
          <div className="container max-w-7xl mx-auto px-5 xl:px-8 w-full">
            <div className="flex flex-col gap-4 md:gap-5 text-white text-center max-w-2xl mx-auto">

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight tracking-tight text-white drop-shadow-sm">
                Your Next Property{" "}
                <span style={{ color: "#00AEEF" }}>Residential or Commercial</span>
                {" "}Starts Here.
              </h1>

              <div className="flex flex-row items-center justify-center gap-3 pt-1">
                <Link
                  href="/residential"
                  className="px-7 py-3.5 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl text-center cursor-pointer"
                >
                  Explore Residential
                </Link>
                <Link
                  href="/commercial"
                  className="px-7 py-3.5 border-2 border-white/70 text-white text-sm font-semibold rounded-full hover:bg-white/15 hover:border-white transition-all duration-200 backdrop-blur-sm text-center cursor-pointer"
                >
                  Explore Commercial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide1;
