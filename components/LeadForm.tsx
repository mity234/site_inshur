"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import Script from "next/script";
import { services } from "@/lib/site-data";
import { formatRuPhone, isCompleteRuPhone } from "@/lib/phone";

type Status = "idle" | "sending" | "success" | "error" | "invalid_phone";

const TURNSTILE_SITE_KEY = "0x4AAAAAADvI-o0wTcm-rILn";

declare global {
  interface Window {
    turnstile?: { reset: (widget?: string | HTMLElement) => void };
  }
}

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [phone, setPhone] = useState("");
  const [insuranceType, setInsuranceType] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    function applyPrefill(data: { insuranceType?: string; comment?: string }) {
      if (typeof data.insuranceType === "string") setInsuranceType(data.insuranceType);
      if (typeof data.comment === "string") setComment(data.comment);
    }

    // Prefill set before this component mounted (e.g. page loaded fresh with data already in storage)
    try {
      const raw = sessionStorage.getItem("leadPrefill");
      if (raw) {
        applyPrefill(JSON.parse(raw));
        sessionStorage.removeItem("leadPrefill");
      }
    } catch {
      // not critical
    }

    // Prefill set while this component is already mounted (calculator/quiz used on the same page view)
    function handlePrefillEvent(event: Event) {
      applyPrefill((event as CustomEvent).detail ?? {});
    }
    window.addEventListener("lead-prefill", handlePrefillEvent);
    return () => window.removeEventListener("lead-prefill", handlePrefillEvent);
  }, []);

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    setPhone(formatRuPhone(event.target.value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!isCompleteRuPhone(phone)) {
      setStatus("invalid_phone");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/lead.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone,
          insuranceType: formData.get("insuranceType"),
          comment: formData.get("comment"),
          website: formData.get("website"),
          turnstileToken: formData.get("cf-turnstile-response"),
          consent: formData.get("consent") === "on",
        }),
      });
      const data = await response.json();
      if (data.ok) {
        setStatus("success");
        form.reset();
        setPhone("");
        setInsuranceType("");
        setComment("");
      } else {
        setStatus("error");
        window.turnstile?.reset();
      }
    } catch {
      setStatus("error");
      window.turnstile?.reset();
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-white px-8 py-10 text-center shadow-sm">
        <p className="text-lg font-semibold text-stone-900">Заявка отправлена!</p>
        <p className="mt-2 text-stone-500">Свяжемся с вами в течение рабочего дня.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10"
    >
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />

      <h3 className="text-xl font-semibold text-stone-900">
        Или оставьте заявку — перезвоним сами
      </h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          required
          maxLength={255}
          pattern="[^0-9]*"
          title="Введите имя буквами"
          placeholder="Ваше имя"
          className="rounded-xl border border-stone-200 px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-orange-400 focus:outline-none"
        />
        <input
          name="phone"
          type="tel"
          required
          value={phone}
          onChange={handlePhoneChange}
          maxLength={18}
          placeholder="+7 (___) ___-__-__"
          className="rounded-xl border border-stone-200 px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-orange-400 focus:outline-none"
        />
        <select
          name="insuranceType"
          value={insuranceType}
          onChange={(e) => setInsuranceType(e.target.value)}
          className="rounded-xl border border-stone-200 px-4 py-3 text-stone-900 focus:border-orange-400 focus:outline-none sm:col-span-2"
        >
          <option value="">Вид страхования (необязательно)</option>
          {services.map((service) => (
            <option key={service.title} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={2000}
          rows={3}
          placeholder="Расскажите, что хотите застраховать, — так мы быстрее подготовим для вас точный расчёт"
          className="rounded-xl border border-stone-200 px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-orange-400 focus:outline-none sm:col-span-2"
        />
      </div>

      {/* Honeypot field — hidden from real users, bots tend to fill every field */}
      <div className="sr-only" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-6 flex items-start gap-2.5 text-sm text-stone-500">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-300 text-orange-500 focus:ring-orange-400"
        />
        <span>
          Согласен(а) на{" "}
          <Link
            href="/privacy"
            target="_blank"
            className="text-stone-700 underline underline-offset-2 hover:text-orange-600"
          >
            обработку персональных данных
          </Link>
        </span>
      </label>

      <div className="cf-turnstile mt-4" data-sitekey={TURNSTILE_SITE_KEY} data-theme="light" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full bg-orange-500 py-4 text-base font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {status === "sending" ? "Отправляем…" : "Отправить заявку"}
      </button>

      {status === "invalid_phone" && (
        <p className="mt-4 text-sm text-red-500">
          Проверьте номер телефона — нужен полный российский номер, например +7 (911) 222-33-44.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-500">
          Не получилось отправить. Попробуйте позвонить или написать на почту.
        </p>
      )}
    </form>
  );
}
