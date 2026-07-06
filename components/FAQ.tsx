import { faq } from "@/lib/site-data";

export function FAQ() {
  return (
    <section id="faq" className="bg-orange-50/60">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">Частые вопросы</h2>
        <div className="mt-10 divide-y divide-stone-200">
          {faq.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-stone-900 marker:content-none">
                {item.question}
                <span className="shrink-0 text-xl text-orange-500 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-stone-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
