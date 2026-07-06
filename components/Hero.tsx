"use client";

import { company } from "@/lib/site-data";
import { prefillAndScrollToContact } from "@/lib/lead-prefill";

const trustPoints = ["Бесплатный расчёт", "Работаем со всеми страховыми", "Сопровождаем до выплаты"];

const quickScenarios = [
  {
    label: "Нужно ОСАГО",
    action: () => document.getElementById("osago-calculator")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    label: "Ипотечное страхование",
    action: () => prefillAndScrollToContact("Имущество", "Ипотечное страхование — нужно оформить по требованию банка."),
  },
  {
    label: "Поездка за границу",
    action: () => prefillAndScrollToContact("Путешествия", "Нужна медицинская страховка для поездки."),
  },
  {
    label: "Страхование жизни",
    action: () => prefillAndScrollToContact("Жизнь и здоровье", ""),
  },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-140 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(249,115,22,0.16),transparent)]"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-24 sm:py-32">
        <p className="rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-700">
          Страховой брокер · по всей России
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-stone-900 sm:text-6xl">
          Страхование без разводов и лишних слов
        </h1>
        <p className="max-w-2xl text-lg text-stone-600 sm:text-xl">
          {company.name} — подберём и оформим ОСАГО, КАСКО, страхование жизни, здоровья, имущества
          и путешествий. Сравниваем несколько страховых, честно говорим о минусах и помогаем
          получить выплату без проблем.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href={company.phoneHref}
            className="rounded-full bg-orange-500 px-8 py-4 text-center text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-[1.02] hover:bg-orange-600"
          >
            Бесплатный расчёт страховки
          </a>
          <a
            href={`mailto:${company.email}`}
            className="rounded-full border border-stone-300 bg-white px-8 py-4 text-center text-base font-semibold text-stone-900 transition-colors hover:bg-stone-50"
          >
            Написать на почту
          </a>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {quickScenarios.map((scenario) => (
            <button
              key={scenario.label}
              type="button"
              onClick={scenario.action}
              className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-orange-300 hover:text-orange-600"
            >
              {scenario.label}
            </button>
          ))}
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-stone-600">
          {trustPoints.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4 shrink-0 text-orange-500"
              >
                <path
                  d="M4 10.5l3.5 3.5L16 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
