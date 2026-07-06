"use client";

import { useState } from "react";
import Link from "next/link";
import { company } from "@/lib/site-data";
import { TelegramIcon } from "./icons";

const navLinks = [
  { href: "/#services", label: "Услуги" },
  { href: "/#why-us", label: "Почему мы" },
  { href: "/#how-we-work", label: "Как работаем" },
  { href: "/#faq", label: "Вопросы" },
  { href: "/#contact", label: "Контакты" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#FFFAF3]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/#top"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-stone-900"
          onClick={() => setMenuOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" width={28} height={28} className="h-7 w-7" />
          {company.shortName}
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-stone-600 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-stone-900">
              {link.label}
            </a>
          ))}
          <Link href="/articles" className="transition-colors hover:text-stone-900">
            Статьи
          </Link>
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={company.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Наш Telegram-канал"
            className="hidden rounded-full border border-stone-200 p-2.5 text-stone-500 transition-colors hover:border-orange-300 hover:text-orange-600 md:block"
          >
            <TelegramIcon className="h-4.5 w-4.5" />
          </a>
          <a
            href={company.phoneHref}
            className="hidden rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 md:block"
          >
            {company.phone}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 md:hidden"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-stone-200 bg-[#FFFAF3] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-stone-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/articles"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-stone-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
            >
              Статьи
            </Link>
          </div>
          <div className="mt-3 flex items-center gap-3 border-t border-stone-200 pt-4">
            <a
              href={company.phoneHref}
              className="flex-1 rounded-full bg-orange-500 py-3 text-center text-sm font-semibold text-white"
            >
              {company.phone}
            </a>
            <a
              href={company.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Наш Telegram-канал"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-200 text-stone-600"
            >
              <TelegramIcon className="h-5 w-5" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
