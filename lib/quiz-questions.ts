type QuizQuestion =
  | { type: "choices"; question: string; options: string[] }
  | { type: "text"; question: string; placeholder: string };

export const quizQuestions: Record<string, QuizQuestion[]> = {
  КАСКО: [
    {
      type: "choices",
      question: "Год выпуска автомобиля?",
      options: ["До 3 лет", "3–7 лет", "Старше 7 лет"],
    },
    {
      type: "choices",
      question: "Что нужно?",
      options: ["Оформить впервые", "Продлить действующий КАСКО"],
    },
  ],
  "Жизнь и здоровье": [
    {
      type: "choices",
      question: "Кого страхуем?",
      options: ["Себя", "Ребёнка", "Всю семью"],
    },
    {
      type: "choices",
      question: "Что важнее всего?",
      options: ["Жизнь", "Здоровье и лечение", "Критические заболевания"],
    },
  ],
  Имущество: [
    {
      type: "choices",
      question: "Что страхуем?",
      options: ["Квартира", "Дом", "Ремонт/отделка", "Другое"],
    },
    {
      type: "choices",
      question: "Причина оформления?",
      options: ["Требование ипотеки", "Хочу защитить сам(а)"],
    },
  ],
  Путешествия: [
    {
      type: "text",
      question: "Куда едете?",
      placeholder: "Например, Турция",
    },
    {
      type: "choices",
      question: "На сколько человек?",
      options: ["1", "2", "3+"],
    },
  ],
  "Другие виды": [
    {
      type: "text",
      question: "Что хотите застраховать?",
      placeholder: "Опишите в двух словах",
    },
    {
      type: "text",
      question: "Что-то ещё важное для расчёта?",
      placeholder: "Необязательно",
    },
  ],
};
