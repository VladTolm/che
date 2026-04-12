import type {
  AgentEditorConfig,
  AgentTemplate,
  AgentVersion,
  CatalogCategory,
  CatalogItem,
} from "../agentEditorTypes";

// --- Agent configs (4 agents, first one fully populated) ---

export const agentEditorConfigs: AgentEditorConfig[] = [
  {
    id: "ae-1",
    name: "Ресёрчер",
    icon: "🔍",
    description: "Поиск и анализ информации из документов",
    workspaceId: "procurement",
    workspaceName: "Закупки",
    workspaceIcon: "📦",
    instructions: {
      title: "Ресёрчер — системный промпт",
      body: `Роль
Вы — специализированный ассистент по поиску и анализу информации из корпоративных документов. Ваша задача — находить, сопоставлять и извлекать данные из загруженных файлов и базы знаний компании.

## Основные обязанности
- Отвечать на вопросы по содержимому загруженных документов
- Сравнивать данные из разных источников
- Формировать сводки и выжимки из документов
- Указывать источники при цитировании

## Правила ответа
- Всегда ссылаться на конкретный документ при цитировании
- Использовать ясный, деловой язык
- При неуверенности — указывать на ограничения и предлагать уточнить запрос`,
    },
    schedules: [],
    channels: [],
    identitySet: false,
    tools: [
      {
        id: "tool-1",
        name: "Tavily Web Search",
        icon: "🔎",
        source: "Fleet",
        status: "requires-auth",
        category: "Search",
      },
      {
        id: "tool-2",
        name: "Read URL Content",
        icon: "🔗",
        source: "Fleet",
        status: "active",
        category: "Data",
      },
    ],
    subAgents: [],
    skills: [
      {
        id: "skill-1",
        name: "Untitled Skill",
        description: "Custom skill",
        level: "space" as const,
      },
    ],
    knowledgeBases: [
      { id: "kb-1", name: "Регламенты закупок", icon: "📚" },
    ],
    triggers: [
      { id: "trg-1", type: "cron", category: "schedule", label: "Ежедневно в 9:00", value: "0 9 * * *", icon: "⏰" },
    ],
  },
  {
    id: "ae-2",
    name: "Документалист",
    icon: "📝",
    description: "Создание отчётов и документов на основе данных",
    workspaceId: "procurement",
    workspaceName: "Закупки",
    workspaceIcon: "📦",
    instructions: {
      title: "Документалист",
      body: "Вы — помощник по созданию документов. Генерируйте отчёты, сводки и аналитические записки на основе предоставленных данных.",
    },
    schedules: [],
    channels: [],
    identitySet: false,
    tools: [],
    subAgents: [],
    skills: [],
    knowledgeBases: [],
    triggers: [],
  },
  {
    id: "ae-3",
    name: "Аналитик",
    icon: "📊",
    description: "Анализ данных и построение выводов",
    workspaceId: "marketing",
    workspaceName: "Маркетинг",
    workspaceIcon: "📢",
    instructions: {
      title: "Аналитик данных",
      body: "Вы — аналитик данных. Анализируйте числовые данные, выявляйте тренды и формируйте рекомендации.",
    },
    schedules: [],
    channels: [],
    identitySet: true,
    tools: [
      {
        id: "tool-3",
        name: "Python Executor",
        icon: "🐍",
        source: "Built-in",
        status: "active",
        category: "Code",
      },
    ],
    subAgents: [],
    skills: [],
    knowledgeBases: [],
    triggers: [],
  },
  {
    id: "ae-4",
    name: "Юрист",
    icon: "⚖️",
    description: "Правовая экспертиза и проверка документов",
    workspaceId: "legal",
    workspaceName: "Юридический",
    workspaceIcon: "⚖️",
    instructions: {
      title: "Юридический консультант",
      body: "Вы — юридический консультант. Проверяйте документы на соответствие нормативным требованиям и выявляйте правовые риски.",
    },
    schedules: [],
    channels: [],
    identitySet: false,
    tools: [],
    subAgents: [],
    skills: [],
    knowledgeBases: [],
    triggers: [],
  },
];

// --- Agent templates ---

export const agentTemplates: AgentTemplate[] = [
  {
    id: "tpl-1",
    name: "Ресёрчер",
    description: "Поиск и анализ информации из документов и интернета",
    icon: "🔍",
    toolIcons: ["🔎", "🔗", "📋"],
    config: agentEditorConfigs[0],
  },
  {
    id: "tpl-2",
    name: "Документалист",
    description: "Создание отчётов, сводок и документов на основе данных",
    icon: "📝",
    toolIcons: ["📋", "📄"],
    config: agentEditorConfigs[1],
  },
  {
    id: "tpl-3",
    name: "Аналитик данных",
    description: "Анализ числовых данных, выявление трендов и рекомендации",
    icon: "📊",
    toolIcons: ["🐍", "🗄️", "📡"],
    config: agentEditorConfigs[2],
  },
  {
    id: "tpl-4",
    name: "Юридический помощник",
    description: "Правовая экспертиза и проверка документов на соответствие",
    icon: "⚖️",
    toolIcons: ["📚", "✅"],
    config: agentEditorConfigs[3],
  },
  {
    id: "tpl-5",
    name: "Служба поддержки",
    description: "Обработка обращений клиентов и ответы на типовые вопросы",
    icon: "🎧",
    toolIcons: ["💬", "📧", "📚"],
    config: {
      id: "ae-tpl-5",
      name: "Служба поддержки",
      icon: "🎧",
      description: "Обработка обращений клиентов и ответы на типовые вопросы",
      workspaceId: "",
      workspaceName: "",
      workspaceIcon: "",
      instructions: {
        title: "Служба поддержки",
        body: "Вы — оператор службы поддержки. Отвечайте на вопросы клиентов вежливо и по существу, используя базу знаний компании.",
      },
      schedules: [],
      channels: [],
      identitySet: false,
      tools: [],
      subAgents: [],
      skills: [],
      knowledgeBases: [],
      triggers: [],
    },
  },
];

// --- Version history (mock) ---

export const agentVersionHistory: AgentVersion[] = [
  { version: 4, timestamp: "Сегодня, 14:32", label: "Текущая" },
  { version: 3, timestamp: "Сегодня, 11:05" },
  { version: 2, timestamp: "Вчера, 18:44" },
  { version: 1, timestamp: "12 апр, 10:00", label: "Исходная" },
];

// --- Tool catalog ---

export const toolCategories: CatalogCategory[] = [
  { id: "search", label: "Search" },
  { id: "data", label: "Data" },
  { id: "communication", label: "Communication" },
  { id: "code", label: "Code" },
];

export const toolCatalog: CatalogItem[] = [
  { id: "tc-1", name: "Tavily Web Search", icon: "🔎", description: "Search the web using Tavily API", category: "search" },
  { id: "tc-2", name: "Google Search", icon: "🌐", description: "Search using Google Custom Search", category: "search" },
  { id: "tc-3", name: "Read URL Content", icon: "🔗", description: "Extract content from any URL", category: "data" },
  { id: "tc-4", name: "SQL Query", icon: "🗄️", description: "Execute SQL queries on connected databases", category: "data" },
  { id: "tc-5", name: "REST API Call", icon: "📡", description: "Make HTTP requests to external APIs", category: "data" },
  { id: "tc-6", name: "Send Email", icon: "📧", description: "Send emails via configured SMTP", category: "communication" },
  { id: "tc-7", name: "Slack Message", icon: "💬", description: "Send messages to Slack channels", category: "communication" },
  { id: "tc-8", name: "Python Executor", icon: "🐍", description: "Execute Python code in sandbox", category: "code" },
  { id: "tc-9", name: "JavaScript Runner", icon: "⚡", description: "Run JavaScript/TypeScript code", category: "code" },
];

// --- Channel catalog ---

export const channelCategories: CatalogCategory[] = [
  { id: "messaging", label: "Messaging" },
  { id: "web", label: "Web" },
  { id: "email", label: "Email" },
];

export const channelCatalog: CatalogItem[] = [
  { id: "ch-1", name: "Telegram", icon: "✈️", description: "Connect via Telegram bot", category: "messaging" },
  { id: "ch-2", name: "Slack", icon: "💬", description: "Connect to Slack workspace", category: "messaging" },
  { id: "ch-3", name: "WhatsApp", icon: "📱", description: "WhatsApp Business integration", category: "messaging" },
  { id: "ch-4", name: "Web Widget", icon: "🌐", description: "Embed chat widget on website", category: "web" },
  { id: "ch-5", name: "API Endpoint", icon: "🔌", description: "REST API for programmatic access", category: "web" },
  { id: "ch-6", name: "Email Inbox", icon: "📧", description: "Monitor and respond to emails", category: "email" },
];

// --- Schedule catalog ---

export const scheduleCategories: CatalogCategory[] = [
  { id: "all", label: "Все типы" },
];

export const scheduleCatalog: CatalogItem[] = [
  { id: "sc-1", name: "Cron", icon: "⏰", description: "Run on a cron schedule (e.g. every day at 9:00)", category: "all" },
  { id: "sc-2", name: "Interval", icon: "🔄", description: "Run at fixed intervals (e.g. every 30 minutes)", category: "all" },
  { id: "sc-3", name: "One-time", icon: "📌", description: "Run once at a specific date and time", category: "all" },
];

// --- Sub-agent catalog ---

export const subAgentCategories: CatalogCategory[] = [
  { id: "my", label: "Мои агенты" },
  { id: "team", label: "Командные" },
];

export const subAgentCatalog: CatalogItem[] = [
  { id: "sa-1", name: "Ресёрчер", icon: "🔍", description: "Поиск и анализ из документов", category: "my" },
  { id: "sa-2", name: "Документалист", icon: "📝", description: "Создание отчётов и документов", category: "my" },
  { id: "sa-3", name: "Аналитик", icon: "📊", description: "Анализ данных", category: "team" },
  { id: "sa-4", name: "Юрист", icon: "⚖️", description: "Правовая экспертиза", category: "team" },
];

// --- Skill catalog ---

export const skillCategories: CatalogCategory[] = [
  { id: "company", label: "Навыки компании" },
  { id: "space", label: "Навыки пространства" },
];

export const skillCatalog: CatalogItem[] = [
  { id: "skc-1", name: "Резюме", icon: "📋", description: "Суммаризация документов (/summarize)", category: "company" },
  { id: "skc-2", name: "Сравнение", icon: "⚖️", description: "Сравнительный анализ (/compare)", category: "company" },
  { id: "skc-3", name: "Извлечение", icon: "🔍", description: "Извлечение данных (/extract)", category: "company" },
  { id: "skc-4", name: "Перевод", icon: "🌐", description: "Перевод текста (./translate)", category: "space" },
  { id: "skc-5", name: "Проверка", icon: "✅", description: "Проверка на ошибки (./check)", category: "space" },
];

// --- Trigger catalog (merged Schedule + Channel) ---

export const triggerCategories: CatalogCategory[] = [
  { id: "schedule", label: "Расписание" },
  { id: "event", label: "Событие" },
];

export const triggerCatalog: CatalogItem[] = [
  { id: "trg-c-1", name: "Cron", icon: "⏰", description: "Запуск по расписанию cron (например, каждый день в 9:00)", category: "schedule" },
  { id: "trg-c-2", name: "Interval", icon: "🔄", description: "Запуск с фиксированным интервалом (например, каждые 30 минут)", category: "schedule" },
  { id: "trg-c-3", name: "One-time", icon: "📌", description: "Однократный запуск в указанное время", category: "schedule" },
  { id: "trg-c-4", name: "Webhook", icon: "🔌", description: "Запуск по входящему HTTP-запросу", category: "event" },
  { id: "trg-c-5", name: "Email", icon: "📧", description: "Запуск при получении письма на указанный адрес", category: "event" },
  { id: "trg-c-6", name: "Очередь", icon: "📬", description: "Запуск при поступлении сообщения в очередь", category: "event" },
];

// --- Knowledge catalog ---

export const knowledgeCategories: CatalogCategory[] = [
  { id: "all", label: "Базы знаний" },
];

export const knowledgeCatalog: CatalogItem[] = [
  { id: "kbc-1", name: "Регламенты закупок", icon: "📚", description: "Процедуры и нормативы закупочной деятельности", category: "all" },
  { id: "kbc-2", name: "Поставщики", icon: "🏢", description: "Реестр поставщиков и оценки надёжности", category: "all" },
  { id: "kbc-3", name: "Юридическая база", icon: "⚖️", description: "Нормативно-правовые акты и шаблоны договоров", category: "all" },
  { id: "kbc-4", name: "Финансовая документация", icon: "💰", description: "Бюджеты, отчёты и финансовые регламенты", category: "all" },
];
