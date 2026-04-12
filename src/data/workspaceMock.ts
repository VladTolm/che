import type {
  Workspace,
  SourceDocument,
  KnowledgeTopic,
  WorkspaceAgent,
  WorkspaceSkill,
  WorkspaceChatMessage,
  WsExecution,
  WsArtifact,
  WsIncomingSession,
  KnowledgeBase,
  HistorySession,
  SpaceDocument,
  SpaceMember,
  SpaceAccessType,
} from "../workspaceTypes";

export const workspaces: Workspace[] = [
  { id: "procurement", name: "Закупки", icon: "📦", taskCount: 3 },
  { id: "marketing", name: "Маркетинг", icon: "📢", taskCount: 1 },
  { id: "legal-ws", name: "Юридический", icon: "⚖️", taskCount: 0 },
];

export const sourceDocuments: SourceDocument[] = [
  { id: "doc-1", name: "Бриф_ФосАгро_Q2.pdf", fileType: "pdf", isArtifact: false, selected: true },
  { id: "doc-2", name: "Спецификация_поставки.docx", fileType: "docx", isArtifact: false, selected: true },
  { id: "doc-3", name: "Анализ_рынка.md", fileType: "md", isArtifact: true, selected: false },
  { id: "doc-4", name: "Данные_прайс.csv", fileType: "csv", isArtifact: false, selected: false },
];

export const knowledgeTopics: KnowledgeTopic[] = [
  {
    id: "topic-1",
    name: "Регламенты закупок",
    expanded: true,
    selected: false,
    folders: [
      {
        id: "folder-1",
        name: "Процедуры",
        type: "folder",
        expanded: true,
        selected: false,
        children: [
          { id: "kf-1", name: "Порядок согласования", selected: true, type: "file" },
          { id: "kf-2", name: "Шаблон договора", selected: false, type: "file" },
        ],
      },
      {
        id: "folder-2",
        name: "Нормативы",
        type: "folder",
        expanded: false,
        selected: false,
        children: [
          { id: "kf-3", name: "СНиП требования", selected: false, type: "file" },
        ],
      },
    ],
  },
  {
    id: "topic-2",
    name: "Поставщики",
    expanded: false,
    selected: false,
    folders: [
      {
        id: "folder-3",
        name: "Реестр",
        type: "folder",
        expanded: false,
        selected: false,
        children: [
          { id: "kf-4", name: "Реестр поставщиков", selected: false, type: "file" },
          { id: "kf-5", name: "Оценка надёжности", selected: false, type: "file" },
        ],
      },
    ],
  },
];

export const universalAgent: WorkspaceAgent = {
  id: "ws-agent-universal",
  name: "Универсальный",
  icon: "✦",
  description: "Универсальный агент для свободных задач",
  status: "available",
  contextDocs: [],
};

export const wsAgents: WorkspaceAgent[] = [
  { id: "ws-agent-1", name: "Ресёрчер", icon: "🔍", description: "Поиск и анализ информации из документов", status: "available", contextDocs: ["doc-1", "doc-2"] },
  { id: "ws-agent-2", name: "Документалист", icon: "📝", description: "Формирование отчётов и документов", status: "available", contextDocs: ["doc-1", "doc-3"] },
  { id: "ws-agent-3", name: "Аналитик", icon: "📊", description: "Анализ данных, построение выводов", status: "available", contextDocs: ["doc-4"] },
  { id: "ws-agent-4", name: "Юрист", icon: "⚖️", description: "Проверка юридических аспектов", status: "available", contextDocs: ["doc-2"] },
];

export const wsSkills: WorkspaceSkill[] = [
  { id: "sk-1", name: "Резюме", command: "/summarize", description: "Краткое изложение документа", level: "company" },
  { id: "sk-2", name: "Сравнение", command: "/compare", description: "Сравнение двух документов", level: "company" },
  { id: "sk-3", name: "Извлечение", command: "/extract", description: "Извлечение ключевых данных", level: "company" },
  { id: "sk-4", name: "Перевод", command: "./translate", description: "Перевод текста", level: "space" },
  { id: "sk-5", name: "Проверка", command: "./check", description: "Проверка на ошибки и несоответствия", level: "space" },
];

export const wsChatMessages: WorkspaceChatMessage[] = [
  {
    id: "msg-1",
    role: "system",
    text: "Пространство «Закупки» — свободный режим. Выберите документы в левой панели для формирования контекста.",
    timestamp: "10:00",
  },
  {
    id: "msg-2",
    role: "user",
    text: "Сделай краткое резюме брифа ФосАгро и выдели ключевые требования к поставке.",
    timestamp: "10:01",
  },
  {
    id: "msg-3",
    role: "model",
    text: "**Резюме брифа ФосАгро Q2:**\n\nКлиент запрашивает поставку 3 категорий оборудования:\n\n1. **Насосное оборудование** — 12 ед., срок до 15.07\n2. **Запорная арматура** — 48 ед., срок до 01.08\n3. **КИПиА** — 6 комплектов, срок до 01.09\n\n**Ключевые требования:**\n- Сертификация ГОСТ Р\n- Гарантия от 24 месяцев\n- Поставка на склад заказчика (г. Череповец)\n- Отсрочка платежа 45 дней",
    timestamp: "10:02",
  },
  {
    id: "msg-4",
    role: "model",
    text: "Готово! Я сформировал сводку требований по всем категориям оборудования.",
    timestamp: "10:05",
    artifactId: "art-1",
  },
];

export const wsExecution: WsExecution = {
  state: "executing",
  steps: [
    { id: 1, title: "Анализ входных документов", status: "completed" },
    { id: 2, title: "Поиск в базе знаний", status: "completed" },
    { id: 3, title: "Формирование сводной таблицы", status: "running", detail: "Обработка 3 из 5 категорий..." },
    { id: 4, title: "Генерация итогового отчёта", status: "pending" },
  ],
  elapsed: "1м 32с",
  integrations: [
    { id: "int-1", name: "Битрикс24", icon: "🔗", type: "CRM" },
    { id: "int-2", name: "1С:ERP", icon: "📊", type: "ERP" },
  ],
  usedSkillIds: ["sk-1", "sk-3"],
};

export const wsArtifact: WsArtifact = {
  id: "art-1",
  name: "Сводка_требований_ФосАгро_Q2",
  content: `# Сводка требований — ФосАгро Q2

## Оборудование

| Категория | Кол-во | Срок поставки | Статус |
|-----------|--------|---------------|--------|
| Насосное оборудование | 12 ед. | 15.07 | В работе |
| Запорная арматура | 48 ед. | 01.08 | Ожидает |
| КИПиА | 6 компл. | 01.09 | Ожидает |

## Требования
- Сертификация ГОСТ Р
- Гарантия ≥ 24 мес.
- Доставка: г. Череповец
- Оплата: отсрочка 45 дней`,
  generatedAt: "10:05",
};

// --- Incoming trigger sessions ---

export const incomingSessions: WsIncomingSession[] = [
  { id: "inc-1", agentName: "Ресёрчер", agentIcon: "🔍", reason: "Входящий запрос на анализ нового документа от контрагента", timestamp: "09:45" },
  { id: "inc-2", agentName: "Юрист", agentIcon: "⚖️", reason: "Новый договор поступил на проверку", timestamp: "10:12" },
];

// --- Knowledge bases ---

export const knowledgeBases: KnowledgeBase[] = [
  { id: "kb-1", name: "Регламенты закупок", icon: "📚", hasWriteAccess: true },
  { id: "kb-2", name: "Поставщики", icon: "🏢", hasWriteAccess: true },
  { id: "kb-3", name: "Юридическая база", icon: "⚖️", hasWriteAccess: false },
];

// --- History: Sessions ---

export const historySessions: HistorySession[] = [
  {
    id: "ses-1",
    name: "Входящий запрос анализ документа",
    preview: "Входящий запрос на анализ нового документа от контрагента",
    status: "waiting",
    agentId: "ws-agent-1",
    agentName: "Ресёрчер",
    agentIcon: "🔍",
    owner: null,
    initiator: "trigger",
    triggerData: "Входящее письмо от supplier@fosagro.ru",
    createdAt: "2025-01-14T09:45:00",
    updatedAt: "2025-01-14T09:45:00",
    documents: [],
    reassignments: [],
    chatPreview: [
      { id: "sp-1", role: "system", text: "Сессия запущена по триггеру: входящее письмо", timestamp: "09:45" },
    ],
  },
  {
    id: "ses-2",
    name: "Новый договор на проверку",
    preview: "Новый договор поступил на проверку от ООО «Стройкомплект»",
    status: "waiting",
    agentId: "ws-agent-4",
    agentName: "Юрист",
    agentIcon: "⚖️",
    owner: null,
    initiator: "trigger",
    triggerData: "Входящее письмо от client@stroykomplekt.ru",
    createdAt: "2025-01-14T10:12:00",
    updatedAt: "2025-01-14T10:12:00",
    documents: [
      { id: "sd-1", name: "Договор_поставки_СК.pdf", fileType: "pdf", direction: "in" },
    ],
    reassignments: [],
    chatPreview: [
      { id: "sp-2", role: "system", text: "Сессия запущена по триггеру: новый договор", timestamp: "10:12" },
      { id: "sp-3", role: "model", text: "Получен договор поставки от ООО «Стройкомплект». Ожидаю указаний для начала проверки.", timestamp: "10:12" },
    ],
  },
  {
    id: "ses-3",
    name: "Бриф ФосАгро Q2",
    preview: "Сделай краткое резюме брифа ФосАгро и выдели ключевые требования к поставке",
    status: "active",
    agentId: "ws-agent-2",
    agentName: "Документалист",
    agentIcon: "📝",
    owner: "Влад Иванов",
    initiator: "Влад Иванов",
    createdAt: "2025-01-14T14:32:00",
    updatedAt: "2025-01-14T16:05:00",
    documents: [
      { id: "sd-2", name: "Бриф_ФосАгро_Q2.pdf", fileType: "pdf", direction: "in" },
      { id: "sd-3", name: "Сводка_требований.md", fileType: "md", direction: "out" },
    ],
    reassignments: [
      { id: "ra-1", fromUser: "Анна Смирнова", toUser: "Влад Иванов", timestamp: "2025-01-14T13:15:00" },
    ],
    chatPreview: [
      { id: "sp-4", role: "user", text: "Проанализируй бриф ФосАгро и выдели ключевые требования", timestamp: "14:32" },
      { id: "sp-5", role: "model", text: "На основе документа выделены 3 категории оборудования с конкретными сроками поставки...", timestamp: "14:35" },
    ],
  },
  {
    id: "ses-4",
    name: "Анализ прайсов поставщиков",
    preview: "Сравни прайсы трёх поставщиков и выдели лучшие предложения",
    status: "active",
    agentId: "ws-agent-3",
    agentName: "Аналитик",
    agentIcon: "📊",
    owner: "Анна Смирнова",
    initiator: "Анна Смирнова",
    createdAt: "2025-01-14T11:20:00",
    updatedAt: "2025-01-14T12:45:00",
    documents: [
      { id: "sd-4", name: "Прайс_Поставщик_А.csv", fileType: "csv", direction: "in" },
      { id: "sd-5", name: "Прайс_Поставщик_Б.csv", fileType: "csv", direction: "in" },
    ],
    reassignments: [],
    chatPreview: [
      { id: "sp-6", role: "user", text: "Сравни прайсы трёх поставщиков и выдели лучшие предложения", timestamp: "11:20" },
      { id: "sp-7", role: "model", text: "Начинаю сравнительный анализ прайсов...", timestamp: "11:21" },
    ],
  },
  {
    id: "ses-5",
    name: "Анализ договора Q1",
    preview: "Проверь договор на соответствие стандартам компании",
    status: "completed",
    agentId: "ws-agent-4",
    agentName: "Юрист",
    agentIcon: "⚖️",
    owner: "Влад Иванов",
    initiator: "Влад Иванов",
    createdAt: "2025-01-13T09:00:00",
    updatedAt: "2025-01-13T11:30:00",
    completedAt: "2025-01-13T11:30:00",
    documents: [
      { id: "sd-6", name: "Договор_Q1.pdf", fileType: "pdf", direction: "in" },
      { id: "sd-7", name: "Заключение_юриста.docx", fileType: "docx", direction: "out" },
    ],
    reassignments: [],
    chatPreview: [
      { id: "sp-8", role: "user", text: "Проверь договор на соответствие стандартам компании", timestamp: "09:00" },
      { id: "sp-9", role: "model", text: "Договор проверен. Найдено 3 замечания, детали в приложенном заключении.", timestamp: "11:30" },
    ],
  },
  {
    id: "ses-6",
    name: "Отчёт по закупкам за декабрь",
    preview: "Сформируй итоговый отчёт по закупкам за декабрь 2024",
    status: "completed",
    agentId: "ws-agent-2",
    agentName: "Документалист",
    agentIcon: "📝",
    owner: "Анна Смирнова",
    initiator: "Анна Смирнова",
    createdAt: "2025-01-10T10:00:00",
    updatedAt: "2025-01-10T12:00:00",
    completedAt: "2025-01-10T12:00:00",
    documents: [
      { id: "sd-8", name: "Отчёт_декабрь_2024.docx", fileType: "docx", direction: "out" },
    ],
    reassignments: [],
    chatPreview: [
      { id: "sp-10", role: "user", text: "Сформируй итоговый отчёт по закупкам за декабрь 2024", timestamp: "10:00" },
      { id: "sp-11", role: "model", text: "Отчёт сформирован на основе данных из 1С:ERP. Итого 47 позиций на сумму 12.4 млн руб.", timestamp: "12:00" },
    ],
  },
  {
    id: "ses-7",
    name: "Реестр поставщиков — обновление",
    preview: "Обнови реестр поставщиков с учётом новых данных",
    status: "archived",
    agentId: "ws-agent-1",
    agentName: "Ресёрчер",
    agentIcon: "🔍",
    owner: "Игорь Петров",
    initiator: "Игорь Петров",
    createdAt: "2024-12-20T14:00:00",
    updatedAt: "2024-12-20T16:30:00",
    completedAt: "2024-12-20T16:30:00",
    documents: [
      { id: "sd-9", name: "Реестр_обновлённый.csv", fileType: "csv", direction: "out" },
    ],
    reassignments: [],
    chatPreview: [
      { id: "sp-12", role: "user", text: "Обнови реестр поставщиков с учётом новых данных", timestamp: "14:00" },
    ],
  },
];

// --- Space settings ---

export const spaceDocuments: SpaceDocument[] = [
  { id: "spdoc-1", name: "Политика_закупок.pdf", fileType: "pdf", uploadedAt: "2025-01-14" },
  { id: "spdoc-2", name: "Шаблон_договора.docx", fileType: "docx", uploadedAt: "2025-01-12" },
  { id: "spdoc-3", name: "Инструкция_по_работе.md", fileType: "md", uploadedAt: "2025-01-10" },
];

export const spaceMembers: SpaceMember[] = [
  { id: "user-1", name: "Влад Иванов", avatarInitial: "В", avatarColor: "bg-blue-500", role: "owner" },
  { id: "user-2", name: "Анна Смирнова", avatarInitial: "А", avatarColor: "bg-purple-500", role: "admin" },
  { id: "user-3", name: "Игорь Петров", avatarInitial: "И", avatarColor: "bg-green-500", role: "member" },
];

export const spaceAccessType: SpaceAccessType = "shared-sessions";

export const currentUserId = "user-1";
