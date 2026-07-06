import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Статьи о страховании",
  description: "Практические статьи о страховании: ОСАГО, КАСКО, действия при ДТП и выбор между брокером и агентом.",
};

export default function ArticlesPage() {
  return (
    <>
      <Header />
      <main className="pb-20 md:pb-0">
        <section className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Статьи о страховании
          </h1>
          <p className="mt-3 text-lg text-stone-600">
            Разбираем практические вопросы простым языком — без воды и выдуманной статистики.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="rounded-2xl border border-stone-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/10"
              >
                <h2 className="text-xl font-semibold text-stone-900">{article.title}</h2>
                <p className="mt-2 text-stone-600">{article.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
