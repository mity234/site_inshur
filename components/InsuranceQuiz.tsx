"use client";

import { useState } from "react";
import { quizQuestions } from "@/lib/quiz-questions";
import { prefillAndScrollToContact } from "@/lib/lead-prefill";

function finishQuiz(serviceTitle: string, answers: string[]) {
  prefillAndScrollToContact(serviceTitle, answers.filter(Boolean).join(". "));
}

export function InsuranceQuiz({
  serviceTitle,
  onClose,
}: {
  serviceTitle: string;
  onClose: () => void;
}) {
  const questions = quizQuestions[serviceTitle] ?? [];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [textValue, setTextValue] = useState("");

  const question = questions[step];
  const isLast = step === questions.length - 1;

  function submitAnswer(answer: string) {
    const nextAnswers = [...answers, answer];
    if (isLast) {
      finishQuiz(serviceTitle, nextAnswers);
      onClose();
      return;
    }
    setAnswers(nextAnswers);
    setTextValue("");
    setStep(step + 1);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 px-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-orange-600">{serviceTitle}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="text-stone-400 transition-colors hover:text-stone-700"
          >
            ✕
          </button>
        </div>

        {question ? (
          <>
            <h3 className="mt-3 text-xl font-semibold text-stone-900">{question.question}</h3>

            {question.type === "choices" ? (
              <div className="mt-6 flex flex-col gap-2.5">
                {question.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => submitAnswer(option)}
                    className="rounded-xl border border-stone-200 px-4 py-3 text-left text-stone-800 transition-colors hover:border-orange-300 hover:bg-orange-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <input
                  autoFocus
                  type="text"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder={question.placeholder}
                  className="w-full rounded-xl border border-stone-200 px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-orange-400 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitAnswer(textValue);
                  }}
                />
                <button
                  type="button"
                  onClick={() => submitAnswer(textValue)}
                  className="mt-4 w-full rounded-full bg-orange-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                >
                  {isLast ? "Оставить заявку" : "Далее"}
                </button>
              </div>
            )}

            <p className="mt-5 text-center text-xs text-stone-400">
              Шаг {step + 1} из {questions.length}
            </p>
          </>
        ) : (
          <p className="mt-4 text-stone-600">
            Расскажите нам, что хотите застраховать — оставьте заявку, и мы посчитаем.
          </p>
        )}
      </div>
    </div>
  );
}
