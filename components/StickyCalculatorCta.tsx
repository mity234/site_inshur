"use client";

import { useEffect, useState } from "react";

export function StickyCalculatorCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("osago-calculator");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show once the calculator is mostly scrolled past (above the viewport),
        // not before the user has reached it, and not while a sliver of it still shows.
        setVisible(entry.boundingClientRect.top < 0 && entry.intersectionRatio < 0.3);
      },
      { threshold: [0, 0.3] }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() =>
        document.getElementById("osago-calculator")?.scrollIntoView({ behavior: "smooth" })
      }
      className="fixed bottom-6 left-6 z-40 hidden items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-800 shadow-lg shadow-stone-900/10 ring-1 ring-stone-200 transition-transform hover:scale-105 md:flex"
    >
      <span className="text-orange-500">↑</span>
      Рассчитать ОСАГО
    </button>
  );
}
