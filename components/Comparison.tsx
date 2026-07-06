const rows = [
  {
    label: "Сколько страховых компаний видите",
    diy: "Обычно одну — ту, куда пришли",
    broker: "Сравниваем несколько сразу",
  },
  {
    label: "Кто ищет невыгодные условия в договоре",
    diy: "Приходится разбираться самому",
    broker: "Мы, до того как вы подписали",
  },
  {
    label: "Сколько стоит подбор",
    diy: "—",
    broker: "Бесплатно, комиссию платит страховая",
  },
  {
    label: "Что при страховом случае",
    diy: "Разбираетесь с документами сами",
    broker: "Сопровождаем до получения выплаты",
  },
];

export function Comparison() {
  return (
    <section className="bg-orange-50/60">
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Самому или через брокера?
        </h2>
        <p className="mt-4 text-lg text-stone-600">Разница не в цене полиса, а в том, что происходит вокруг неё.</p>

        {/* Mobile: stacked cards (a 3-column table doesn't fit narrow screens) */}
        <div className="mt-10 flex flex-col gap-4 sm:hidden">
          {rows.map((row) => (
            <div key={row.label} className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="font-semibold text-stone-900">{row.label}</p>
              <p className="mt-2 text-sm text-stone-500">Самостоятельно: {row.diy}</p>
              <p className="mt-1 text-sm font-medium text-orange-700">Через нас: {row.broker}</p>
            </div>
          ))}
        </div>

        {/* sm and up: full comparison table */}
        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-stone-200 bg-white sm:block">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-stone-50 text-sm font-semibold text-stone-700">
            <div className="px-5 py-4"></div>
            <div className="px-5 py-4">Самостоятельно</div>
            <div className="px-5 py-4 text-orange-700">Через нас</div>
          </div>
          {rows.map((row, index) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1.2fr_1fr_1fr] text-sm sm:text-base ${
                index > 0 ? "border-t border-stone-200" : ""
              }`}
            >
              <div className="min-w-0 px-5 py-4 font-medium text-stone-900">{row.label}</div>
              <div className="min-w-0 px-5 py-4 text-stone-500">{row.diy}</div>
              <div className="min-w-0 bg-orange-50/50 px-5 py-4 font-medium text-stone-800">{row.broker}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
