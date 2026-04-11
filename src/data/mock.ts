import type { Agent, Workspace, Team, Task, ChatMessage, Notification, ActivityEntry, ExecutionLogGroup, DocTreeItem } from "../types";

export const agents: Agent[] = [
  {
    id: "research",
    name: "Ресёрчер",
    status: "active",
    task: "Анализ рынка поставщиков",
    step: "3/5",
    progress: 60,
    desc: "Поиск и анализ информации из открытых источников",
    icon: "🔍",
    skills: ["Web Search", "Data Mining", "Report Generation"],
  },
  {
    id: "doc",
    name: "Документалист",
    status: "active",
    task: "Подготовка договора поставки",
    step: "2/4",
    progress: 45,
    desc: "Создание и оформление документов",
    icon: "📄",
    skills: ["Document Generation", "Template Processing", "PDF Export"],
  },
  {
    id: "analyst",
    name: "Аналитик",
    status: "waiting",
    task: "Ожидает данных от Ресёрчера",
    step: "1/3",
    progress: 20,
    desc: "Анализ данных и формирование выводов",
    icon: "📊",
    skills: ["Data Analysis", "Visualization", "DB Query"],
  },
  {
    id: "hr",
    name: "HR-ассистент",
    status: "completed",
    task: "Скрининг резюме завершён",
    step: "5/5",
    progress: 100,
    desc: "Подбор и оценка кандидатов",
    icon: "👥",
    skills: ["Resume Parsing", "Candidate Scoring", "Email Drafting"],
  },
  {
    id: "legal",
    name: "Юрист",
    status: "idle",
    task: "Нет активных задач",
    step: "0/0",
    progress: 0,
    desc: "Правовой анализ и проверка документов",
    icon: "⚖️",
    skills: ["Legal Analysis", "Compliance Check", "Contract Review"],
  },
  {
    id: "comms",
    name: "Коммуникатор",
    status: "active",
    task: "Рассылка обновлений клиентам",
    step: "4/6",
    progress: 65,
    desc: "Коммуникация и уведомления",
    icon: "📧",
    skills: ["Email", "Slack Integration", "Notification"],
  },
];

export const workspaces: Workspace[] = [
  {
    id: "ws-procurement",
    name: "Закупки Q1",
    color: "bg-orange-500",
    count: 3,
    desc: "Управление закупочными процессами первого квартала. Включает анализ поставщиков, согласование договоров и контроль бюджета.",
    tasks: [
      { id: "t1", name: "Анализ поставщиков", status: "active", agents: 2, progress: 60 },
      { id: "t2", name: "Согласование договора", status: "waiting", agents: 1, progress: 30 },
      { id: "t3", name: "Отчёт по бюджету", status: "completed", agents: 1, progress: 100 },
    ],
    agents: ["research", "analyst", "doc", "legal"],
    systems: ["1С", "SAP", "Google Sheets", "Битрикс24"],
    docs: [
      { name: "Реестр поставщиков.xlsx", type: "xlsx", size: "2.4 MB" },
      { name: "Договор №127.pdf", type: "pdf", size: "890 KB" },
      { name: "Выгрузка цен.csv", type: "csv", size: "1.1 MB" },
      { name: "ТЗ на поставку.docx", type: "docx", size: "340 KB" },
    ],
    activity: [
      { id: "a1", type: "doc", agent: "Документалист", action: "создал черновик договора", timestamp: "2026-03-24T14:30:00Z" },
      { id: "a2", type: "table", agent: "Аналитик", action: "обновил сравнительную таблицу", timestamp: "2026-03-24T14:15:00Z" },
      { id: "a3", type: "approval", agent: "Ресёрчер", action: "запросил согласование отчёта", timestamp: "2026-03-24T13:45:00Z" },
      { id: "a4", type: "complete", agent: "HR-ассистент", action: "завершил скрининг", timestamp: "2026-03-24T12:00:00Z" },
      { id: "a5", type: "data", agent: "Аналитик", action: "загрузил данные из SAP", timestamp: "2026-03-24T11:30:00Z" },
    ],
    members: ["Влад М.", "Ирина К.", "Дмитрий С."],
    budget: { tokens: 1_250_000, cost: 18.75, tasks_total: 12, tasks_done: 8 },
  },
  {
    id: "ws-hr",
    name: "Рекрутинг",
    color: "bg-blue-500",
    count: 2,
    desc: "Набор сотрудников на открытые позиции. Автоматический скрининг резюме и координация интервью.",
    tasks: [
      { id: "t4", name: "Скрининг Senior DevOps", status: "active", agents: 1, progress: 75 },
      { id: "t5", name: "Подготовка офферов", status: "waiting", agents: 1, progress: 40 },
    ],
    agents: ["hr", "comms"],
    systems: ["HeadHunter API", "Google Calendar", "Slack"],
    docs: [
      { name: "Вакансии Q1.xlsx", type: "xlsx", size: "560 KB" },
      { name: "Шаблон оффера.docx", type: "docx", size: "120 KB" },
    ],
    activity: [
      { id: "a6", type: "complete", agent: "HR-ассистент", action: "завершил первичный скрининг (47 резюме)", timestamp: "2026-03-24T13:00:00Z" },
      { id: "a7", type: "doc", agent: "Коммуникатор", action: "отправил приглашения на интервью", timestamp: "2026-03-24T12:30:00Z" },
    ],
    members: ["Ирина К.", "Ольга Н."],
    budget: { tokens: 480_000, cost: 7.20, tasks_total: 6, tasks_done: 4 },
  },
  {
    id: "ws-legal",
    name: "Юр. отдел",
    color: "bg-purple-500",
    count: 1,
    desc: "Правовое сопровождение и compliance. Проверка договоров, анализ рисков.",
    tasks: [
      { id: "t6", name: "Ревизия NDA", status: "active", agents: 1, progress: 55 },
    ],
    agents: ["legal", "doc"],
    systems: ["Консультант+", "Гарант"],
    docs: [
      { name: "Шаблон NDA v3.pdf", type: "pdf", size: "210 KB" },
    ],
    activity: [
      { id: "a8", type: "doc", agent: "Юрист", action: "начал ревизию шаблона NDA", timestamp: "2026-03-24T10:00:00Z" },
    ],
    members: ["Дмитрий С."],
    budget: { tokens: 320_000, cost: 4.80, tasks_total: 4, tasks_done: 3 },
  },
];

export const teams: Team[] = [
  {
    id: "team-ops",
    name: "Операционный отдел",
    members: [
      { name: "Влад Морозов", role: "Руководитель", email: "v.morozov@company.ru", avatar: "В", color: "from-blue-500 to-indigo-600", canLaunch: true, canApprove: true, canAdmin: true },
      { name: "Ирина Козлова", role: "Менеджер", email: "i.kozlova@company.ru", avatar: "И", color: "from-emerald-500 to-teal-600", canLaunch: true, canApprove: true, canAdmin: false },
      { name: "Дмитрий Сидоров", role: "Аналитик", email: "d.sidorov@company.ru", avatar: "Д", color: "from-orange-500 to-red-600", canLaunch: true, canApprove: false, canAdmin: false },
      { name: "Ольга Новикова", role: "Стажёр", email: "o.novikova@company.ru", avatar: "О", color: "from-pink-500 to-rose-600", canLaunch: false, canApprove: false, canAdmin: false },
    ],
    workspaces: ["Закупки Q1", "Рекрутинг"],
    sharedAgents: ["research", "analyst", "doc"],
    activity: [
      { id: "ta1", type: "complete", agent: "Влад", action: "согласовал результаты анализа", timestamp: "2026-03-24T14:00:00Z" },
      { id: "ta2", type: "data", agent: "Ирина", action: "запустила задачу по скринингу", timestamp: "2026-03-24T13:30:00Z" },
      { id: "ta3", type: "approval", agent: "Дмитрий", action: "отправил отчёт на согласование", timestamp: "2026-03-24T12:00:00Z" },
      { id: "ta4", type: "doc", agent: "Ольга", action: "загрузила документы в систему", timestamp: "2026-03-24T11:00:00Z" },
    ],
  },
  {
    id: "team-legal",
    name: "Юридическая группа",
    members: [
      { name: "Дмитрий Сидоров", role: "Руководитель", email: "d.sidorov@company.ru", avatar: "Д", color: "from-orange-500 to-red-600", canLaunch: true, canApprove: true, canAdmin: true },
      { name: "Елена Петрова", role: "Менеджер", email: "e.petrova@company.ru", avatar: "Е", color: "from-violet-500 to-purple-600", canLaunch: true, canApprove: true, canAdmin: false },
    ],
    workspaces: ["Юр. отдел"],
    sharedAgents: ["legal", "doc"],
    activity: [
      { id: "ta5", type: "doc", agent: "Дмитрий", action: "обновил шаблон NDA", timestamp: "2026-03-24T10:30:00Z" },
      { id: "ta6", type: "approval", agent: "Елена", action: "согласовала правки в договоре", timestamp: "2026-03-24T09:00:00Z" },
    ],
  },
];

export const currentTask: Task = {
  id: "task-main",
  name: "Подготовить бриф к встрече с клиентом  ФОсагро",
  status: "completed",
  agents: 3,
  progress: 100,
  steps: [
    { id: 1, title: "Найти клиента ФОсагро в CRM", status: "completed" },
    { id: 2, title: "Собрать описание клиента (отрасль, размер, специфика)", status: "completed" },
    { id: 3, title: "Получить историю активностей (встречи, звонки, письма)", status: "completed" },
    { id: 4, title: "Получить текущие сделки и стадии", status: "completed" },
    { id: 5, title: "Собрать контакты клиента (ФИО, должность, email, телефоны)", status: "completed" },
    { id: 6, title: "Проверить запланированные активности", status: "completed" },
    { id: 7, title: "Проверить договоры в ERP", status: "completed" },
    { id: 8, title: "Собрать информацию о конкурентах", status: "completed" },
    { id: 9, title: "Подготовить ключевые тезисы для встречи", status: "completed" },
    { id: 10, title: "Сформировать итоговый бриф", status: "completed" },
  ],
  initiator: "Влад М.",
  deadline: "28 марта 2026",
};

export const executionLog: ExecutionLogGroup[] = [
  {
    id: "g1",
    reasoningCount: 1,
    actions: ["Задано 3 вопроса"],
  },
  {
    id: "g2",
    reasoningCount: 2,
    actions: [
      "Подключен навык: Giga CRM",
      "Подключен навык: 1С ERP",
      "Подключен навык: AI Почта",
    ],
  },
  {
    id: "g3",
    reasoningCount: 1,
    actions: ["Поиск клиента ФОсагро в CRM"],
  },
  {
    id: "g4",
    reasoningCount: 1,
    actions: [
      "Получение подробной информации о клиенте",
      "Получение контактов клиента",
      "История активностей по клиенту",
      "Получение сделок по клиенту",
    ],
  },
  {
    id: "g5",
    reasoningCount: 1,
    actions: [
      "Проверка запланированных активностей",
      "Получение списка договоров из ERP",
    ],
  },
  {
    id: "g6",
    reasoningCount: 1,
    actions: ["Получение списка продуктов и цен"],
  },
  {
    id: "g7",
    reasoningCount: 3,
    actions: [],
  },
];

export const taskDocTree: DocTreeItem[] = [
  {
    name: "giga",
    type: "folder",
    children: [
      { name: "voronka-prodazh.docx", type: "file", fileType: "docx" },
      { name: "voronka-prodazh.md", type: "file", fileType: "md" },
      { name: "voronka-prodazh.xlsx", type: "file", fileType: "xlsx" },
    ],
  },
];

export const chatMessages: ChatMessage[] = [
  { role: "user", text: "Проанализируй рынок поставщиков серверного оборудования в России. Нужно сравнить минимум 5 поставщиков по цене, срокам, гарантии и отзывам." },
  { role: "system", text: "Задача создана. Назначены агенты: Ресёрчер, Аналитик, Документалист. Режим: параллельная работа с координацией." },
  { role: "agent", name: "Ресёрчер", type: "plan", text: "Формирую план исследования:\n1. Определить ключевые критерии отбора\n2. Собрать данные по 7 поставщикам\n3. Верифицировать информацию из нескольких источников\n4. Передать структурированные данные Аналитику" },
  { role: "tool", text: "> web_search(\"серверное оборудование поставщики Россия 2026 рейтинг\")\n> Найдено 127 результатов, обработка топ-20..." },
  { role: "agent", name: "Ресёрчер", type: "progress", text: "Собираю данные... Найдено 7 поставщиков: ЛАНИТ, Softline, КРОК, ICL, Тринити, Depo Computers, Аквариус. Анализирую условия каждого." },
  { role: "tool", text: "> api_call(\"1c_erp\", {action: \"get_purchase_history\", category: \"servers\"})\n> Получено 23 записи за последние 12 месяцев" },
  { role: "agent", name: "Аналитик", type: "progress", text: "Получил данные от Ресёрчера. Начинаю сравнительный анализ по 4 критериям: цена, сроки поставки, гарантия, оценки клиентов." },
  { role: "agent", name: "Аналитик", type: "tool", text: "🔧 Запускаю инструмент: data_analysis\nВходные данные: 7 поставщиков × 4 критерия\nМетод: взвешенный скоринг с нормализацией" },
  { role: "agent", name: "Документалист", type: "progress", text: "Готовлю шаблон сравнительной таблицы. Формат: Excel с автоматическим цветовым кодированием лучших показателей." },
  { role: "agent", name: "Ресёрчер", type: "result", text: "Сбор данных завершён. Передаю полный отчёт:\n\n• 7 поставщиков проанализировано\n• 23 исторические закупки учтены\n• 12 отзывов клиентов собрано\n• Средний разброс цен: 15-22% от среднерыночной\n\nДанные переданы Аналитику для финального скоринга." },
  { role: "system", text: "Этап «Сбор данных» завершён. Переход к этапу «Сравнительная таблица»." },
  { role: "agent", name: "Аналитик", type: "progress", text: "Формирую сравнительную таблицу. Промежуточный лидер: КРОК (совокупный балл 8.7/10). Близко: ЛАНИТ (8.4) и Depo Computers (8.1)." },
];

export const notifications: Notification[] = [
  { id: "n1", type: "approval_needed", title: "Требуется согласование", body: "Аналитик завершил сравнительную таблицу поставщиков и ожидает вашего подтверждения", read: false, timestamp: "2026-03-24T14:30:00Z", taskId: "task-main" },
  { id: "n2", type: "task_completed", title: "Задача завершена", body: "Скрининг резюме на позицию Senior DevOps завершён. 47 резюме обработано, 8 кандидатов отобрано.", read: false, timestamp: "2026-03-24T13:00:00Z", taskId: "t4" },
  { id: "n3", type: "error", title: "Ошибка доступа", body: "Не удалось подключиться к API HeadHunter. Проверьте токен авторизации.", read: true, timestamp: "2026-03-24T12:45:00Z" },
  { id: "n4", type: "mention", title: "Упоминание в задаче", body: "Ирина К. упомянула вас в комментарии к задаче «Согласование договора»", read: true, timestamp: "2026-03-24T11:00:00Z" },
  { id: "n5", type: "approval_needed", title: "Ожидает согласования", body: "Документалист подготовил черновик договора поставки №128", read: false, timestamp: "2026-03-24T10:30:00Z" },
];

export const activityFeed: ActivityEntry[] = [
  { id: "f1", type: "doc", agent: "Документалист", action: "создал черновик договора №128", timestamp: "2026-03-24T14:30:00Z" },
  { id: "f2", type: "table", agent: "Аналитик", action: "обновил сравнительную таблицу поставщиков", timestamp: "2026-03-24T14:15:00Z" },
  { id: "f3", type: "approval", agent: "Ресёрчер", action: "запросил согласование финального отчёта", timestamp: "2026-03-24T13:45:00Z" },
  { id: "f4", type: "complete", agent: "HR-ассистент", action: "завершил скрининг 47 резюме", timestamp: "2026-03-24T13:00:00Z" },
  { id: "f5", type: "data", agent: "Коммуникатор", action: "отправил 8 приглашений на интервью", timestamp: "2026-03-24T12:30:00Z" },
  { id: "f6", type: "error", agent: "Ресёрчер", action: "ошибка подключения к HeadHunter API", timestamp: "2026-03-24T12:45:00Z" },
  { id: "f7", type: "data", agent: "Аналитик", action: "загрузил данные из SAP (23 записи)", timestamp: "2026-03-24T11:30:00Z" },
];

export const activeTasks = [
  {
    id: "task-main",
    name: "Анализ и выбор поставщика серверного оборудования",
    status: "active" as const,
    progress: 55,
    agents: ["Ресёрчер", "Аналитик", "Документалист"],
    deadline: "28 марта",
    navigable: true,
  },
  {
    id: "task-devops",
    name: "Скрининг Senior DevOps",
    status: "active" as const,
    progress: 75,
    agents: ["HR-ассистент"],
    deadline: "30 марта",
    navigable: false,
  },
  {
    id: "task-nda",
    name: "Ревизия NDA",
    status: "active" as const,
    progress: 55,
    agents: ["Юрист"],
    deadline: "1 апреля",
    navigable: false,
  },
  {
    id: "task-contract",
    name: "Подготовка договора поставки",
    status: "waiting" as const,
    progress: 45,
    agents: ["Документалист"],
    deadline: "2 апреля",
    navigable: false,
  },
];

export const userName = "Влад";
