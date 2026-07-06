// Приблизительные, публично известные диапазоны коэффициентов ОСАГО.
// Это ориентир для калькулятора на сайте, а не официальная тарифная сетка
// конкретной страховой компании — итоговая цена у каждой СК своя в рамках
// коридора, установленного ЦБ РФ.

export const BASE_RATE_RANGE = { min: 1646, max: 7535 };

export { territoryGroups, territoryOptionsFlat as territoryOptions } from "./osago-territory";

export const experienceOptions = [
  {
    value: "young",
    label: "Возраст до 22 лет или стаж до 3 лет",
    coefficient: 1.6,
  },
  {
    value: "experienced",
    label: "Возраст от 22 лет и стаж от 3 лет",
    coefficient: 1.0,
  },
] as const;

export const powerOptions = [
  { value: "up-to-50", label: "До 50 л.с.", coefficient: 0.6 },
  { value: "50-70", label: "50–70 л.с.", coefficient: 0.65 },
  { value: "70-100", label: "70–100 л.с.", coefficient: 1.0 },
  { value: "100-120", label: "100–120 л.с.", coefficient: 1.1 },
  { value: "120-150", label: "120–150 л.с.", coefficient: 1.2 },
  { value: "over-150", label: "Свыше 150 л.с.", coefficient: 1.4 },
] as const;

export const driversOptions = [
  { value: "limited", label: "Ограниченный список водителей", coefficient: 1.0 },
  { value: "unlimited", label: "Без ограничений (любой вписанный)", coefficient: 1.8 },
] as const;

export const kbmOptions = [
  { value: "0.46", label: "0.46 (максимальная скидка)" },
  { value: "0.6", label: "0.6" },
  { value: "0.8", label: "0.8" },
  { value: "1.0", label: "1.0 (нет истории / базовый)" },
  { value: "1.4", label: "1.4" },
  { value: "1.7", label: "1.7" },
  { value: "2.0", label: "2.0" },
  { value: "2.45", label: "2.45 (максимальная надбавка)" },
] as const;

export function calculateOsagoRange(input: {
  kbm: number;
  territoryCoefficient: number;
  experienceCoefficient: number;
  powerCoefficient: number;
  driversCoefficient: number;
}) {
  const multiplier =
    input.kbm *
    input.territoryCoefficient *
    input.experienceCoefficient *
    input.powerCoefficient *
    input.driversCoefficient;

  const round = (value: number) => Math.round(value / 100) * 100;

  return {
    min: round(BASE_RATE_RANGE.min * multiplier),
    max: round(BASE_RATE_RANGE.max * multiplier),
  };
}
