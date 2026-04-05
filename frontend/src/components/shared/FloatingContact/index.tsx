"use client";

import { Icon } from "@iconify/react";

const WHATSAPP_NUMBER = "919873031665";
const WHATSAPP_MESSAGE = "Hi! I'm interested in a property. Could you please help me?";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="cursor-pointer"
      >
        <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
          <Icon icon="ic:baseline-whatsapp" width={28} className="text-white" />
        </div>
      </a>
    </div>
  );
}
