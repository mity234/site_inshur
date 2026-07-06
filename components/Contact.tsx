import { company } from "@/lib/site-data";
import { LeadForm } from "./LeadForm";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="overflow-hidden rounded-3xl bg-linear-to-br from-orange-400 to-amber-500 px-8 py-14 text-center sm:px-16">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Посчитаем вашу страховку бесплатно
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-orange-50">
          Оставьте контакт любым удобным способом — ответим в течение рабочего дня.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={company.phoneHref}
            className="rounded-full bg-white px-8 py-4 text-base font-semibold text-orange-600 transition-transform hover:scale-[1.02]"
          >
            {company.phone}
          </a>
          <a
            href={`mailto:${company.email}`}
            className="rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            {company.email}
          </a>
        </div>
        <p className="mt-6 text-sm text-orange-50/90">Работаем по всей России</p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          { step: "1", text: "Перезвоним в течение рабочего дня" },
          { step: "2", text: "Бесплатно сравним варианты у нескольких страховых" },
          { step: "3", text: "Оформим полис так, как удобно вам" },
        ].map((item) => (
          <div key={item.step} className="flex items-center gap-3 rounded-xl bg-white/70 px-4 py-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white">
              {item.step}
            </span>
            <p className="text-sm text-stone-600">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <LeadForm />
      </div>
    </section>
  );
}
