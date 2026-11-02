"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles, X } from 'lucide-react';

const RUNNER_MESSAGES = [
  "🌸 ALL PRODUCTS ARE YET TO COME — SIT BACK, RELAX & ENJOY THE PREVIEW!",
  "✨ SOMETHING SO COMFY IS IN THE MAKING • 100% ORGANIC COTTON PADS",
  "💖 THE WAIT WILL BE WORTH IT • EXPLORE SIZES & BUILD YOUR CUSTOM PACK",
  "🚀 OFFICIAL LAUNCH DROPPING SOON • JOIN THE VIP WAITLIST TODAY",
  "🌿 ZERO CHEMICALS • ZERO IRRITATION • GYNECOLOGIST TESTED & APPROVED"
];

export default function CampaignRunner({ duration = null }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  // Hide in admin dashboard
  const isAdmin = pathname?.startsWith('/admin');

  // Optional auto-dismiss if a duration is explicitly provided
  useEffect(() => {
    if (isAdmin || !duration) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [isAdmin, duration]);

  // Cleanly unmount after slide-up transition ends
  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (isAdmin || !isMounted) {
    return null;
  }

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Launch Campaign Announcement"
      className={`relative w-full overflow-hidden bg-[#febac4] text-[#7e0022] border-b border-[#7e0022]/15 shadow-xs z-50 pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        isVisible ? "max-h-12 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-full py-0 border-b-0"
      }`}
    >
      <div className="relative w-full py-1.5 sm:py-2 flex items-center overflow-hidden">
        {/* Left subtle fade mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#febac4] to-transparent z-10" />

        {/* Marquee Runner Track (doubled for seamless infinite scroll) */}
        <div className="animate-marquee-runner flex items-center gap-6 cursor-default">
          {[...RUNNER_MESSAGES, ...RUNNER_MESSAGES].map((msg, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#7e0022] whitespace-nowrap"
            >
              <Sparkles size={11} className="text-[#7e0022] shrink-0 opacity-80" />
              <span>{msg}</span>
              <span className="text-[#7e0022]/40 text-xs mx-2">•</span>
            </span>
          ))}
        </div>

        {/* Right side fade mask & dismiss button */}
        <div className="absolute right-0 inset-y-0 flex items-center pr-2 sm:pr-4 pl-8 bg-gradient-to-l from-[#febac4] via-[#febac4]/95 to-transparent z-10">
          <button
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
            className="p-1 rounded-full text-[#7e0022]/70 hover:text-[#7e0022] hover:bg-white/50 active:scale-95 transition-all cursor-pointer"
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
