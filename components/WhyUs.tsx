import { values } from "@/lib/site-data";

export function WhyUs() {
  return (
    <section id="why-us" className="bg-orange-50/60">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Почему обращаются к нам
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {values.map((value, index) => (
            <div key={value.title} className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="text-sm font-semibold text-orange-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-stone-900">{value.title}</h3>
              <p className="mt-2 leading-relaxed text-stone-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
