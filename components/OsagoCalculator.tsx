"use client";

import { useMemo, useState } from "react";
import {
  calculateOsagoRange,
  driversOptions,
  experienceOptions,
  kbmOptions,
  powerOptions,
  territoryOptions,
  territoryGroups,
} from "@/lib/osago-coefficients";
import { prefillAndScrollToContact } from "@/lib/lead-prefill";
import { company } from "@/lib/site-data";

const DEFAULT_TERRITORY =
  territoryOptions.find((o) => o.coefficient === 1.0)?.value ?? territoryOptions[0].value;

export function OsagoCalculator() {
  const [territory, setTerritory] = useState<string>(DEFAULT_TERRITORY);
  const [experience, setExperience] = useState<string>(experienceOptions[1].value);
  const [power, setPower] = useState<string>(powerOptions[2].value);
  const [drivers, setDrivers] = useState<string>(driversOptions[0].value);
  const [kbm, setKbm] = useState("1.0");
  const [copied, setCopied] = useState(false);

  const range = useMemo(() => {
    const territoryOption = territoryOptions.find((o) => o.value === territory)!;
    const experienceOption = experienceOptions.find((o) => o.value === experience)!;
    const powerOption = powerOptions.find((o) => o.value === power)!;
    const driversOption = driversOptions.find((o) => o.value === drivers)!;

    return calculateOsagoRange({
      kbm: Number(kbm),
      territoryCoefficient: territoryOption.coefficient,
      experienceCoefficient: experienceOption.coefficient,
      powerCoefficient: powerOption.coefficient,
      driversCoefficient: driversOption.coefficient,
    });
  }, [territory, experience, power, drivers, kbm]);

  const selectClass =
    "w-full min-w-0 rounded-xl border border-stone-200 px-4 py-3 text-stone-900 focus:border-orange-400 focus:outline-none";

  return (
    <section id="osago-calculator" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="rounded-3xl bg-white px-6 py-10 shadow-sm sm:px-10">
        <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Посчитайте ОСАГО прямо сейчас
        </h2>
        <p className="mt-3 max-w-2xl text-stone-600">
          Реальный расчёт по открытым коэффициентам ЦБ РФ — без ожидания звонка.
        </p>

        <div className="mt-8 grid min-w-0 gap-4 sm:grid-cols-2">
          <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-stone-700">
            Город регистрации
            <select
              className={selectClass}
              value={territory}
              onChange={(e) => setTerritory(e.target.value)}
            >
              {territoryGroups.map((group) => (
                <optgroup key={group.group} label={group.group}>
                  {group.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-stone-700">
            Возраст и стаж водителя
            <select
              className={selectClass}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              {experienceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-stone-700">
            Мощность двигателя
            <select
              className={selectClass}
              value={power}
              onChange={(e) => setPower(e.target.value)}
            >
              {powerOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-stone-700">
            Список водителей
            <select
              className={selectClass}
              value={drivers}
              onChange={(e) => setDrivers(e.target.value)}
            >
              {driversOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-stone-700 sm:col-span-2">
            Ваш КБМ
            <select
              className={selectClass}
              value={kbm}
              onChange={(e) => setKbm(e.target.value)}
            >
              {kbmOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <a
              href="https://rsa.plus/proverka-kbm/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-normal text-orange-600 underline underline-offset-2 hover:text-orange-700"
            >
              Не знаете свой КБМ? Проверить онлайн
            </a>
          </label>
        </div>

        <div className="mt-8 rounded-2xl bg-orange-50 px-6 py-6 sm:px-8">
          <p className="text-sm font-medium text-orange-700">Ориентировочная стоимость</p>
          <p className="mt-1 text-3xl font-bold text-stone-900 sm:text-4xl">
            {range.min.toLocaleString("ru-RU")} – {range.max.toLocaleString("ru-RU")} ₽
          </p>
          <p className="mt-3 text-sm leading-relaxed text-stone-500">
            Это расчёт по открытым коэффициентам ЦБ РФ, а не тариф конкретной страховой —
            точную цену сравним у нескольких компаний бесплатно за 15 минут.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                prefillAndScrollToContact(
                  "ОСАГО",
                  `ОСАГО: расчёт по калькулятору — ${range.min.toLocaleString("ru-RU")}–${range.max.toLocaleString(
                    "ru-RU"
                  )} ₽. Хочу точную цену.`
                )
              }
              className="rounded-full bg-orange-500 px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] hover:bg-orange-600"
            >
              Узнать точную цену
            </button>
            <button
              type="button"
              onClick={async () => {
                const text = `ОСАГО: ${range.min.toLocaleString("ru-RU")}–${range.max.toLocaleString("ru-RU")} ₽ (ориентировочно, расчёт на ${company.shortName})`;
                try {
                  await navigator.clipboard.writeText(text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                } catch {
                  // clipboard unavailable — not critical
                }
              }}
              className="rounded-full border border-stone-200 px-6 py-3.5 text-sm font-semibold text-stone-700 transition-colors hover:border-orange-300 hover:text-orange-600"
            >
              {copied ? "Скопировано ✓" : "Скопировать результат"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
