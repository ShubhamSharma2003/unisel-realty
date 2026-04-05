'use client';

import Link from "next/link";
import { Icon } from "@iconify/react"

import type { FooterMenu } from "@/types/footerMenu";
import NewsletterForm from "./NewsletterForm";

type FooterProps = {
  footerMenus: FooterMenu[];
};

const Footer = ({ footerMenus }: FooterProps) => {
  return (
    <footer className="relative z-10 bg-dark">
      <div className="container mx-auto max-w-8xl pt-14 px-4 sm:px-6 lg:px-0">

        {/* Top Section: Newsletter & Socials */}
        <div className="flex lg:items-center justify-between items-end lg:gap-11 pb-14 border-b border-white/10 lg:flex-nowrap flex-wrap gap-6">
          <p className="text-white text-sm lg:max-w-1/5">
            Stay updated with the latest news,
            promotions, and exclusive offers.
          </p>
          <div className="flex lg:flex-row flex-col items-center lg:gap-10 gap-3 w-full lg:w-auto">
            <NewsletterForm />
            <p className="text-white/40 text-sm lg:max-w-[45%] order-1 lg:order-2">
              By subscribing, you agree to receive our promotional emails. You can unsubscribe at any time.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="https://www.x.com/uniselrealty" className="cursor-pointer">
              <Icon icon="ph:x-logo-bold" width={24} height={24} className="text-white hover:text-primary duration-300" />
            </Link>
            <Link href="https://www.facebook.com/uniselrealty" className="cursor-pointer">
              <Icon icon="ph:facebook-logo-bold" width={24} height={24} className="text-white hover:text-primary duration-300" />
            </Link>
            <Link href="https://www.instagram.com/uniselrealty" className="cursor-pointer">
              <Icon icon="ph:instagram-logo-bold" width={24} height={24} className="text-white hover:text-primary duration-300" />
            </Link>
          </div>
        </div>

        {/* Middle Section: Main Content */}
        <div className="py-12 lg:py-16 border-b border-white/10">
          <div className="grid grid-cols-12 gap-y-12 sm:gap-10">

            {/* Left Column: CTA & Contact Info */}
            <div className="lg:col-span-7 col-span-12">
              <h2 className="text-white leading-[1.3] text-2xl md:text-3xl font-medium mb-4 lg:max-w-3/4">
                Invest in Gurgaon&apos;s Most Exclusive Properties
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-3 lg:max-w-3/4">
                Unisel offers curated access to luxury homes, expert insights, and personalized advisory for high-value investments.
              </p>
              <p className="text-white/80 text-base font-medium mb-6 lg:max-w-3/4">
                Speak to our experts today and unlock the best opportunities in Gurgaon real estate.
              </p>

              {/* Contact Details Section */}
              <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h5 className="text-white text-lg font-semibold mb-4">Our Office</h5>
                  <p className="text-white/60 text-sm leading-6">
                    408, 4th floor, Adani Miracle Mile<br />
                    Sector 60, Gurgaon
                  </p>
                </div>
                <div>
                  <h5 className="text-white text-lg font-semibold mb-4">Contact Info</h5>
                  <div className="flex flex-col gap-2">
                    <Link href="tel:+918010303303" className="text-white/60 text-sm hover:text-white duration-300 flex items-center gap-2 cursor-pointer">
                      <Icon icon="ph:phone" width={18} /> +91 8010-303-303
                    </Link>
                    <Link href="mailto:info@uniselrealty.com" className="text-white/60 text-sm hover:text-white duration-300 flex items-center gap-2 cursor-pointer">
                      <Icon icon="ph:envelope" width={18} /> info@uniselrealty.com
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/contact" className="inline-block bg-primary text-base font-semibold py-4 px-8 rounded-full text-white hover:bg-white hover:text-dark duration-300 cursor-pointer">
                Get In Touch
              </Link>
            </div>


            {/* Right Columns: Dynamic Footer Menus */}
            {footerMenus.map((menu) => (
              <div
                key={menu._id}
                className="lg:col-span-2 col-span-6 flex flex-col gap-4 w-fit mt-0 md:mt-0"
              >
                <h5 className="text-white text-lg font-semibold mb-2">{menu.title}</h5>
                {menu.items?.map((item, idx) => (
                  <div key={idx}>
                    <Link
                      href={item.href}
                      className="text-white/40 text-sm hover:text-white duration-300 cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            ))}

          </div>
        </div>

        {/* RERA Disclaimer */}
        <div className="border-t border-white/10 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-white/40 text-xs">
            RERA Reg. No: RC/HARERA/GGM/1940/1535/2022/308
          </p>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex justify-between md:flex-nowrap flex-wrap items-center py-6 gap-6">
          <p className="text-white/40 text-sm text-center md:text-left">
            ©2026 Unisel Realty- All rights reserved
          </p>
          <div className="flex gap-8 items-center justify-center w-full md:w-auto">
            <Link href="/terms-and-conditions" className="text-white/40 hover:text-primary text-sm cursor-pointer">
              Terms of service
            </Link>
            <Link href="/privacy-policy" className="text-white/40 hover:text-primary text-sm cursor-pointer">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;