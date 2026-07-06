import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Services } from "@/components/Services";
import { OsagoCalculator } from "@/components/OsagoCalculator";
import { WhyUs } from "@/components/WhyUs";
import { Comparison } from "@/components/Comparison";
import { HowWeWork } from "@/components/HowWeWork";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { TelegramFab } from "@/components/TelegramFab";
import { StickyCalculatorCta } from "@/components/StickyCalculatorCta";
import { faq } from "@/lib/site-data";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="pb-20 md:pb-0">
        <Hero />
        <TrustBar />
        <Services />
        <OsagoCalculator />
        <WhyUs />
        <Comparison />
        <HowWeWork />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileCallBar />
      <TelegramFab />
      <StickyCalculatorCta />
    </>
  );
}
