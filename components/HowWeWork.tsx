import { steps } from "@/lib/site-data";

export function HowWeWork() {
  return (
    <section id="how-we-work" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">Как мы работаем</h2>
      </div>
      <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="relative pl-12">
            <span className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white">
              {index + 1}
            </span>
            <h3 className="text-lg font-semibold text-stone-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
