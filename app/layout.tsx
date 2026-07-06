import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { company, legal } from "@/lib/site-data";

const YANDEX_METRIKA_ID = "110368347";
const JIVOSITE_WIDGET_ID = "cUpXct1bRy";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

const siteUrl = "https://topinshur.ru";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.shortName} — страховой брокер по всей России | ОСАГО, КАСКО, страхование жизни`,
    template: `%s | ${company.shortName}`,
  },
  description:
    "Страховой брокер, работаем по всей России. Подберём и оформим ОСАГО, КАСКО, страхование жизни, здоровья, имущества и путешествий. Бесплатный расчёт, честные условия, сопровождение при страховом случае.",
  keywords: [
    "страховой брокер",
    "страхование онлайн",
    "ОСАГО",
    "КАСКО",
    "страхование жизни",
    "страхование имущества",
    "страхование путешествий",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: company.shortName,
    title: `${company.shortName} — страховой брокер по всей России`,
    description:
      "Подберём и оформим страховку без переплат. Все виды страхования, бесплатный расчёт, сопровождение при страховом случае.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.shortName} — страховой брокер по всей России`,
    description: "Подберём и оформим страховку без переплат.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    yandex: "fe99a6807b69bf08",
    google: "z7KIOBcsCuuTnOqJPWrFMYWBmM6s-V63z7V7H6Gawrs",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: company.name,
  alternateName: company.shortName,
  areaServed: "RU",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "вн.тер.г. муниципальный округ Ланское, наб. Чёрной Речки, д. 47, стр. 1, помещ. 4-Н, ч. 145",
    addressLocality: company.city,
    postalCode: legal.postalCode,
    addressCountry: "RU",
  },
  telephone: company.phone,
  email: company.email,
  url: siteUrl,
  taxID: legal.inn,
  identifier: legal.ogrn,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFFAF3] font-sans text-stone-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');

            ym(${YANDEX_METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <Script
          src={`https://code.jivo.ru/widget/${JIVOSITE_WIDGET_ID}`}
          strategy="afterInteractive"
          async
        />
        {children}
      </body>
    </html>
  );
}
