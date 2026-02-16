import Image from "next/image";
import { Metadata } from "next";
import { Icon } from "@iconify/react/dist/iconify.js"

export const metadata: Metadata = {
  title: "404 - Page Not Found | Homely",
  description: "The page you're looking for doesn't exist. Return to Homely's homepage to explore our real estate listings.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Page Not Found | Homely",
    description: "The page you're looking for doesn't exist. Return to Homely's homepage to explore our real estate listings.",
    url: "/404",
    siteName: "Homely",
    images: [
      {
        url: "/images/404-og.jpg",
        width: 1200,
        height: 630,
        alt: "404 page not found",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Not Found | Homely",
    description: "The page you're looking for doesn't exist. Return to Homely's homepage to explore our real estate listings.",
    images: ["/images/404-og.jpg"],
  },
};

const ErrorPage = () => {
  return (
    <>
      <section className="flex justify-center pb-0!">
        <Image
          src="/images/404.png"
          alt="404"
          width={490}
          height={450}
          unoptimized={true}
        />
      </section>
      <section className="text-center bg-cover relative overflow-x-hidden" >
        <div className='flex gap-2.5 items-center justify-center'>
          <span>
            <Icon
              icon={'ph:house-simple-fill'}
              width={20}
              height={20}
              className='text-primary'
            />
          </span>
          <p className='text-base font-semibold text-dark/75 dark:text-white/75'>
            Error 404
          </p>
        </div>
        <h2 className="text-dark text-52 relative font-bold dark:text-white " >
          Lost? Let’s Help You Find Home.
        </h2>
        <p className="text-lg text-dark/50 dark:text-white/50 font-normal w-full mx-auto">
          Looks like you’ve hit a dead end — but don’t worry, we’ll help you get back on track
        </p>
      </section>
    </>
  );
};

export default ErrorPage;