"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

const PHONE = "+918010303303";
const WHATSAPP_NUMBER = "918010303303";
const WHATSAPP_MESSAGE = "Hi! I'm interested in a property. Could you please help me?";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith('/project');

  if (isProjectPage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Sub-menu buttons */}
      <div
        className={`flex flex-col items-center gap-3 transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group flex items-center gap-2"
        >
          <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
            <Icon icon="ic:baseline-whatsapp" width={24} className="text-white" />
          </div>
        </a>

        {/* Call */}
        <a
          href={`tel:${PHONE}`}
          aria-label="Call us"
          className="group flex items-center gap-2"
        >
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
            <Icon icon="ph:phone-call-fill" width={22} className="text-white" />
          </div>
        </a>
      </div>

      {/* Main toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-xl hover:bg-primary/90 transition-all duration-300"
      >
        <Icon
          icon={open ? "ph:x-bold" : "ph:chat-circle-dots-fill"}
          width={26}
          className={`text-white transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"}`}
        />
      </button>
    </div>
  );
}
