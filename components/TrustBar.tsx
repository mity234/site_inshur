const facts = [
  "Официальный брокер · ОГРН с 2023 года",
  "Работаем по всей России",
  "Сравниваем несколько страховых компаний",
  "Подбор и расчёт — бесплатно",
];

export function TrustBar() {
  return (
    <div className="border-y border-stone-200 bg-white/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-4 text-sm font-medium text-stone-600 sm:justify-between">
        {facts.map((fact) => (
          <span key={fact}>{fact}</span>
        ))}
      </div>
    </div>
  );
}
