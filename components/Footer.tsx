import Link from "next/link";
import { company, legal } from "@/lib/site-data";
import { TelegramIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-stone-200">
      <div className="mx-auto max-w-6xl px-6 pt-8 pb-24 text-sm text-stone-500 md:pb-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p>{company.name} · работаем по всей России</p>
          <p>&copy; {new Date().getFullYear()} {company.shortName}. Все права защищены.</p>
        </div>
        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <a
            href={company.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-medium text-stone-600 transition-colors hover:text-orange-600"
          >
            <TelegramIcon className="h-4 w-4" />
            Наш Telegram-канал
          </a>
          <Link href="/articles" className="font-medium text-stone-600 transition-colors hover:text-orange-600">
            Статьи
          </Link>
          <Link href="/privacy" className="text-stone-500 transition-colors hover:text-orange-600">
            Политика обработки персональных данных
          </Link>
        </div>
        <p className="mt-4 text-center text-xs leading-relaxed text-stone-400 sm:text-left">
          ОГРН {legal.ogrn} · ИНН {legal.inn} · КПП {legal.kpp} · ОКПО {legal.okpo}
          <br />
          Юр. адрес: {legal.legalAddress}
          <br />
          Фактический адрес: {legal.actualAddress}
        </p>
      </div>
    </footer>
  );
}
