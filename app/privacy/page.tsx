import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { company, legal } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  robots: { index: false, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="pb-20 md:pb-0">
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Политика обработки персональных данных
          </h1>
          <p className="mt-2 text-sm text-stone-500">Действует с 3 июля 2026 года</p>

          <div className="mt-10 space-y-8 text-stone-700">
            <section>
              <h2 className="text-lg font-semibold text-stone-900">1. Общие положения</h2>
              <p className="mt-2 leading-relaxed">
                Настоящая политика определяет порядок обработки персональных данных
                посетителей сайта {company.shortName} (далее — «Сайт»). Оператором
                персональных данных является {company.name}, ОГРН {legal.ogrn}, ИНН{" "}
                {legal.inn}, адрес: {legal.legalAddress}. Обработка данных ведётся в
                соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных
                данных».
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-900">
                2. Какие данные собираются
              </h2>
              <p className="mt-2 leading-relaxed">
                При заполнении формы обратной связи на Сайте мы собираем: имя, номер
                телефона, а также необязательные поля — вид страхования и комментарий.
                Данные передаются через защищённое соединение (HTTPS).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-900">
                3. Цели обработки
              </h2>
              <p className="mt-2 leading-relaxed">
                Данные используются исключительно для связи с вами: расчёта стоимости
                страховки, консультации и оформления полиса. Мы не передаём ваши данные
                третьим лицам и не используем их для рекламных рассылок без отдельного
                согласия.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-900">
                4. Согласие на обработку
              </h2>
              <p className="mt-2 leading-relaxed">
                Отправляя форму на Сайте, вы подтверждаете, что ознакомлены с настоящей
                политикой и даёте согласие на обработку указанных персональных данных в
                целях, описанных в разделе 3.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-900">
                5. Срок хранения и ваши права
              </h2>
              <p className="mt-2 leading-relaxed">
                Данные хранятся не дольше, чем это необходимо для целей обработки. Вы
                вправе в любой момент отозвать согласие, запросить уточнение,
                блокировку или удаление своих данных — напишите нам на{" "}
                <a href={`mailto:${company.email}`} className="text-orange-600 underline">
                  {company.email}
                </a>{" "}
                или позвоните по номеру{" "}
                <a href={company.phoneHref} className="text-orange-600 underline">
                  {company.phone}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-900">
                6. Защита данных
              </h2>
              <p className="mt-2 leading-relaxed">
                Мы принимаем необходимые организационные и технические меры для защиты
                персональных данных от неправомерного доступа, изменения, раскрытия или
                уничтожения.
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
