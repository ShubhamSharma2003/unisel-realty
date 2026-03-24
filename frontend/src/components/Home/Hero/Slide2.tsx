import Image from "next/image";
import Link from "next/link";

type Slide2Props = {
  isMobile: boolean;
};

const Slide2 = ({ isMobile }: Slide2Props) => {
  const bgImage = isMobile
    ? "/images/hero/hero-mob-2.jpeg"
    : "/images/hero/hero-desk-2.png";

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full flex flex-col">
        <Image
          src={bgImage}
          alt="Unisel Realty - Gurgaon's trusted real estate advisory since 2006"
          fill
          className="object-cover object-top"
          priority={true}
          unoptimized={true}
        />

        {/* Left: title + CTAs */}
        <div className="relative z-10 flex-1 flex items-center -mt-32 md:mt-0">
          <div className="container max-w-7xl mx-auto px-5 xl:px-8 w-full md:-mt-24">
            <div className="flex flex-col gap-4 md:gap-5 text-white text-left max-w-[85vw] sm:max-w-sm md:max-w-2xl mx-0 items-start">

              <span className="inline-flex items-center justify-start">
                <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-white/70 border border-white/30 rounded-full px-4 py-1.5 backdrop-blur-sm bg-white/10">
                  Est. 2006
                </span>
              </span>

              <h1 className="text-[clamp(1.6rem,6vw,3.25rem)] md:text-[clamp(2.5rem,4vw,3.25rem)] font-bold leading-tight tracking-tight text-white drop-shadow-sm">
                Not All Properties Are Investments.<br /> We Help You Pick the Right Ones.
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed">
                Gurgaon&apos;s most trusted advisors for luxury real estate &amp; high-return investments. Exclusive pre-launch access to DLF, Godrej and M3M. Dedicated NRI desk.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-start gap-3 pt-1">
                <Link
                  href="/contact"
                  className="px-7 py-3.5 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                >
                  Get in touch
                </Link>
                <Link
                  href="/all-properties"
                  className="px-7 py-3.5 border-2 border-white/70 text-white text-sm font-semibold rounded-full hover:bg-white/15 hover:border-white transition-all duration-200 backdrop-blur-sm text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Slide2;
