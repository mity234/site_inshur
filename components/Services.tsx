"use client";

import { useState } from "react";
import { services } from "@/lib/site-data";
import { CarIcon, ShieldIcon, HeartIcon, HomeIcon, PlaneIcon, SparkleIcon } from "@/components/icons";
import { InsuranceQuiz } from "@/components/InsuranceQuiz";

const icons = [CarIcon, ShieldIcon, HeartIcon, HomeIcon, PlaneIcon, SparkleIcon];

export function Services() {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  function handleQuickCalc(serviceTitle: string) {
    if (serviceTitle === "ОСАГО") {
      document.getElementById("osago-calculator")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setActiveQuiz(serviceTitle);
  }

  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Все виды страхования в одном месте
        </h2>
        <p className="mt-4 text-lg text-stone-600">Не нужно искать отдельного агента под каждый вид полиса.</p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = icons[index];
          return (
            <div
              key={service.title}
              className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-stone-900">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{service.description}</p>
              <button
                type="button"
                onClick={() => handleQuickCalc(service.title)}
                className="mt-4 self-start text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
              >
                Быстрый расчёт →
              </button>
            </div>
          );
        })}
      </div>

      {activeQuiz && (
        <InsuranceQuiz serviceTitle={activeQuiz} onClose={() => setActiveQuiz(null)} />
      )}
    </section>
  );
}
