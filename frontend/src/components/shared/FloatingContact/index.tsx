"use client";

import { AppIcon as Icon } from "@/components/shared/AppIcon";
import { COMPANY } from "@/lib/company";

const WHATSAPP_NUMBER = "919873031665";
const WHATSAPP_MESSAGE = "Hi! I'm interested in a property. Could you please help me?";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <a
        href={`tel:${COMPANY.telephoneHref}`}
        aria-label={`Call Unisel Realty at ${COMPANY.telephone}`}
        className="cursor-pointer"
      >
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
          <Icon icon="ph:phone-bold" width={26} className="text-white" />
        </div>
      </a>
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
