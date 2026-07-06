"use client";

import { useEffect, useState } from "react";
import { company } from "@/lib/site-data";
import { TelegramIcon } from "./icons";

export function TelegramFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 500);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={company.telegram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в Telegram"
      // Mobile: sits above the fixed MobileCallBar (which Jivo's mobile layout also respects).
      // Desktop: pixel offset measured directly against Jivo's collapsed bubble (~65px circle,
      // ~10px from the right edge, ~120px from the bottom) so the two stack with a small gap
      // instead of overlapping. Re-measure if Jivo's own theme/position changes.
      className="fixed right-5 bottom-24 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-105 md:right-5 md:bottom-11.75"
    >
      <TelegramIcon className="h-7 w-7" />
    </a>
  );
}
