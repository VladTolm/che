import type {
  CalendarEvent,
  MailItem,
  TodoItem,
  Automation,
  ExecutionData,
  PersonalAgent,
  Thread,
} from "../personalTypes";

export const threads: Thread[] = [
  { id: "morning", label: "Утренний брифинг", icon: "☀️", time: "08:00", unread: 0 },
  { id: "foxconn", label: "Foxconn: анализ цен", icon: "📊", time: "08:15", unread: 1 },
  { id: "flights", label: "Рейсы МСК–SHA", icon: "🛫", time: "вчера", unread: 0 },
  { id: "expense", label: "Expense Report", icon: "🧾", time: "вчера", unread: 0 },
];

export const calendarEvents: CalendarEvent[] = [
  { time: "09:00", title: "Стендап закупок", duration: "30м", urgent: false, agentPrep: "Влад подготовил повестку" },
  { time: "11:00", title: "1-on-1 с Алексеем", duration: "45м", urgent: false, agentPrep: null },
  { time: "14:00", title: "Встреча с Foxconn", duration: "1ч", urgent: true, agentPrep: "Сравнение цен готово" },
  { time: "16:30", title: "Review AI-команды", duration: "30м", urgent: false, agentPrep: null },
];

export const mails: MailItem[] = [
  { from: "Foxconn", subject: "Обновлённый прайс — цены ↑ на 3 позиции (8-12%)", urgent: true, hasDraft: true },
  { from: "HR отдел", subject: "Согласование отпуска Дмитрия", urgent: true, hasDraft: true },
  { from: "Финансы", subject: "Бюджет Q2 — на ознакомление", urgent: false, hasDraft: false },
];

export const todos: TodoItem[] = [
  { id: 1, title: "Согласовать договор Foxconn", priority: "P0", deadline: "сегодня 18:00" },
  { id: 2, title: "Ответить на запрос HR", priority: "P0", deadline: "сегодня" },
  { id: 3, title: "Проверить результаты ресёрча", priority: "P1" },
  { id: 4, title: "Повестка для review", priority: "P1", deadline: "16:30" },
  { id: 5, title: "Обновить шаблон договора", priority: "P2" },
];

export const automations: Automation[] = [
  { id: 1, icon: "☀️", name: "Утренняя сводка", schedule: "07:30", status: "success" },
  { id: 2, icon: "📧", name: "Мониторинг Foxconn", schedule: "триггер", status: "success" },
  { id: 3, icon: "💰", name: "Еженедельные расходы", schedule: "пт 17:00", status: "success" },
  { id: 4, icon: "📦", name: "Трекер цены iPhone", schedule: "6ч", status: "monitoring" },
  { id: 5, icon: "📋", name: "Понедельничная сводка", schedule: "пн 08:00", status: "success" },
];

export const personalAgents: PersonalAgent[] = [
  { id: "research", name: "Ресёрч-агент", status: "active", task: "Анализ поставщиков", icon: "🔍", skills: ["Web Search", "DB Query", "Report Gen"] },
  { id: "doc", name: "Документ-агент", status: "active", task: "Подготовка договора", icon: "📄", skills: ["DOCX Gen", "PDF Gen", "Template Fill"] },
  { id: "analyst", name: "Аналитик", status: "waiting", task: "Финансовый отчёт Q1", icon: "📊", skills: ["Data Analysis", "Charts", "Excel"] },
  { id: "hr", name: "HR-агент", status: "completed", task: "Скрининг кандидатов", icon: "👤", skills: ["CV Parsing", "Interview", "Scoring"] },
  { id: "legal", name: "Юрист-агент", status: "idle", task: "—", icon: "⚖️", skills: ["Contract Review", "Compliance", "Risk"] },
  { id: "comms", name: "Коммуникатор", status: "idle", task: "—", icon: "📧", skills: ["Email", "Summary", "Translation"] },
];

export const flightExec: ExecutionData = {
  title: "Рейсы Москва–Шанхай",
  steps: [
    { title: "Поиск рейсов 1–3 апреля", status: "completed", detail: "12 найдено" },
    { title: "Фильтрация ≤30,000₽, эконом", status: "completed", detail: "5 подходят" },
    { title: "Сравнение и сортировка", status: "completed", detail: "по цене" },
    { title: "Генерация таблицы", status: "completed", detail: "готово" },
  ],
  elapsed: "2m 15s",
  resultSummary: "5 рейсов, лучший — Aeroflot SU208, 24,500₽",
  table: {
    cols: ["Рейс", "Дата", "Время", "Цена"],
    rows: [
      ["SU208", "1 апр", "10:25", "24,500₽"],
      ["CA934", "1 апр", "14:10", "26,200₽"],
      ["HU7985", "2 апр", "08:40", "27,800₽"],
      ["SU212", "3 апр", "11:55", "28,100₽"],
      ["CA938", "2 апр", "19:30", "29,500₽"],
    ],
  },
};

export const flightExecRunning: ExecutionData = {
  title: "Рейсы Москва–Шанхай",
  steps: [
    { title: "Поиск рейсов", status: "completed", detail: "12" },
    { title: "Фильтрация", status: "running" },
    { title: "Сравнение", status: "pending" },
    { title: "Таблица", status: "pending" },
  ],
  elapsed: "0m 45s",
};

export const expenseExecRunning: ExecutionData = {
  title: "Expense Report — март",
  steps: [
    { title: "Поиск писем с чеками", status: "completed", detail: "23 письма" },
    { title: "Извлечение сумм", status: "completed", detail: "19 из 23" },
    { title: "Генерация таблицы", status: "running" },
    { title: "Сохранение xlsx", status: "pending" },
  ],
  elapsed: "1m 32s",
};

export const expenseExecDone: ExecutionData = {
  title: "Expense Report — март",
  steps: [
    { title: "Поиск писем", status: "completed", detail: "23" },
    { title: "Извлечение", status: "completed", detail: "19" },
    { title: "Таблица", status: "completed", detail: "готово" },
    { title: "Файл", status: "completed", detail: "expense_march.xlsx" },
  ],
  elapsed: "2m 48s",
  resultSummary: "19 расходов · ¥12,450 · expense_march.xlsx",
};
