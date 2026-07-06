import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { articles, getArticleBySlug } from "@/lib/articles";
import { company } from "@/lib/site-data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedDate,
    author: { "@type": "Organization", name: company.name },
    publisher: { "@type": "Organization", name: company.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="pb-20 md:pb-0">
        <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <Link href="/articles" className="text-sm font-medium text-orange-600 hover:text-orange-700">
            ← Все статьи
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-3 text-sm text-stone-500">
            {new Date(article.publishedDate).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <div className="mt-8 space-y-8">
            {article.sections.map((section, index) => (
              <section key={index}>
                {section.heading && (
                  <h2 className="text-xl font-semibold text-stone-900">{section.heading}</h2>
                )}
                <div className={section.heading ? "mt-3 space-y-4" : "space-y-4"}>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="leading-relaxed text-stone-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl bg-linear-to-br from-orange-400 to-amber-500 px-8 py-10 text-center">
            <h3 className="text-2xl font-bold text-white">Нужна помощь с вашей ситуацией?</h3>
            <p className="mx-auto mt-2 max-w-md text-orange-50">
              Оставьте заявку — бесплатно посчитаем и сравним варианты у нескольких страховых.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-orange-600 transition-transform hover:scale-[1.02]"
            >
              Оставить заявку
            </Link>
          </div>
        </article>
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
