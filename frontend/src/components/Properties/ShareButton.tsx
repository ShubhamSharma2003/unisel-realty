"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

type ShareButtonProps = {
  title: string;
  url: string;
};

const ShareButton = ({ title, url }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled
      }
    } else {
      setOpen((prev) => !prev);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "WhatsApp",
      icon: "mdi:whatsapp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: "Facebook",
      icon: "mdi:facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "X",
      icon: "ri:twitter-x-fill",
      href: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: "LinkedIn",
      icon: "mdi:linkedin",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Email",
      icon: "mdi:email-outline",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 text-sm text-dark/60 dark:text-white/60 hover:text-primary dark:hover:text-primary duration-200 cursor-pointer"
        aria-label="Share this property"
      >
        <Icon icon="ph:share-network" width={20} height={20} />
        <span>Share</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-2 right-0 z-50 bg-white dark:bg-dark border border-dark/10 dark:border-white/20 rounded-xl shadow-lg p-4 min-w-[200px]">
            <div className="flex flex-col gap-3">
              {shareLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-dark/70 dark:text-white/70 hover:text-primary dark:hover:text-primary duration-200"
                  onClick={() => setOpen(false)}
                >
                  <Icon icon={link.icon} width={20} height={20} />
                  {link.label}
                </a>
              ))}
              <button
                onClick={copyLink}
                className="flex items-center gap-3 text-sm text-dark/70 dark:text-white/70 hover:text-primary dark:hover:text-primary duration-200 cursor-pointer"
              >
                <Icon icon={copied ? "ph:check" : "ph:link"} width={20} height={20} />
                {copied ? "Copied!" : "Copy link"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;
