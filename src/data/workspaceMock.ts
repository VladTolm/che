import type {
  Workspace,
  SourceDocument,
  KnowledgeTopic,
  WorkspaceAgent,
  WorkspaceSkill,
  WorkspaceChatMessage,
  WsExecution,
  WsArtifact,
  WsWaitingReason,
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

// --- Demo sessions (per-session data for WorkspaceView) ---

export interface DemoSession {
  messages: WorkspaceChatMessage[];
  execution: WsExecution;
  artifacts: WsArtifact[];
  waitingReason: WsWaitingReason | null;
}

export const demoSessions: Record<string, DemoSession> = {
  // --- Сессия: Ожидание решения ---
  "ses-1": {
    messages: [
      { id: "w-1", role: "system", text: "Сессия запущена по триггеру: входящее письмо от supplier@fosagro.ru", timestamp: "09:45" },
      { id: "w-2", role: "model", text: "Получен запрос на анализ нового документа от контрагента ФосАгро. Начинаю обработку входящего письма и вложений.", timestamp: "09:45" },
      { id: "w-3", role: "model", text: "**Результаты первичного анализа:**\n\nВо вложении обнаружены 3 коммерческих предложения от разных поставщиков:\n\n1. **ООО «ТехноПром»** — 4.2 млн руб., срок 30 дней\n2. **ЗАО «ПромСнаб»** — 3.8 млн руб., срок 45 дней\n3. **ИП Козлов** — 3.1 млн руб., срок 60 дней\n\nЦены различаются на 26%, сроки — в 2 раза.", timestamp: "09:48", artifactId: "art-w-1" },
      { id: "w-4", role: "model", text: "Для формирования итоговой рекомендации мне нужно уточнение.", timestamp: "09:49" },
    ],
    execution: {
      state: "stopped",
      steps: [
        { id: 1, title: "Получение входящего письма", status: "completed" },
        { id: 2, title: "Извлечение вложений", status: "completed" },
        { id: 3, title: "Анализ коммерческих предложений", status: "completed" },
        { id: 4, title: "Формирование рекомендации", status: "pending", detail: "Ожидает ответа пользователя" },
      ],
      elapsed: "3м 12с",
      integrations: [
        { id: "int-1", name: "Битрикс24", icon: "🔗", type: "CRM" },
      ],
      usedSkillIds: ["sk-1", "sk-3"],
    },
    artifacts: [
      {
        id: "art-w-1",
        name: "Сравнение_КП_поставщиков",
        content: `# Сравнительный анализ коммерческих предложений

## Поставщики

| Поставщик | Сумма | Срок | Гарантия | Рейтинг |
|-----------|-------|------|----------|---------|
| ООО «ТехноПром» | 4.2 млн ₽ | 30 дней | 24 мес. | ★★★★☆ |
| ЗАО «ПромСнаб» | 3.8 млн ₽ | 45 дней | 18 мес. | ★★★☆☆ |
| ИП Козлов | 3.1 млн ₽ | 60 дней | 12 мес. | ★★☆☆☆ |

## Выводы
- Минимальная цена: ИП Козлов (3.1 млн ₽)
- Минимальный срок: ООО «ТехноПром» (30 дней)
- Лучшая гарантия: ООО «ТехноПром» (24 мес.)

**Требуется решение:** какой критерий приоритетнее?`,
        generatedAt: "09:48",
      },
    ],
    waitingReason: {
      type: "generic",
      text: "Найдено 3 варианта поставщиков с разбросом цен 26%. Какой критерий приоритетнее: цена или сроки поставки?",
    },
  },

  // --- Сессия: Идёт исполнение ---
  "ses-3": {
    messages: [
      { id: "e-1", role: "system", text: "Сессия создана пользователем Влад Иванов", timestamp: "14:32" },
      { id: "e-2", role: "user", text: "Проанализируй бриф ФосАгро Q2 и подготовь сводку требований по каждой категории оборудования. Добавь сроки и объёмы.", timestamp: "14:32" },
      { id: "e-3", role: "model", text: "Принял задачу. Начинаю анализ брифа ФосАгро Q2.\n\nПлан работы:\n1. Извлечение данных из документа\n2. Поиск дополнительных требований в базе знаний\n3. Формирование сводной таблицы\n4. Генерация итогового отчёта", timestamp: "14:33" },
    ],
    execution: {
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
    },
    artifacts: [],
    waitingReason: null,
  },

  // --- Сессия: Выполнена ---
  "ses-5": {
    messages: [
      { id: "c-1", role: "system", text: "Сессия создана пользователем Влад Иванов", timestamp: "09:00" },
      { id: "c-2", role: "user", text: "Проверь договор Q1 на соответствие стандартам компании. Обрати внимание на условия оплаты и гарантийные обязательства.", timestamp: "09:00" },
      { id: "c-3", role: "model", text: "Начинаю правовую экспертизу договора Q1. Буду проверять:\n- Соответствие шаблону компании\n- Условия оплаты\n- Гарантийные обязательства\n- Ответственность сторон\n- Форс-мажор", timestamp: "09:01" },
      { id: "c-4", role: "model", text: "**Промежуточные результаты:**\n\nОбнаружены отклонения от стандарта:\n\n1. **Условия оплаты** — предоплата 70% вместо стандартных 30%\n2. **Гарантия** — 12 мес. вместо требуемых 24 мес.\n3. **Неустойка** — 0.01% за день вместо стандартных 0.1%\n\nПродолжаю детальный анализ...", timestamp: "10:15" },
      { id: "c-5", role: "model", text: "Проверка завершена. Сформировано юридическое заключение с 3 критическими и 2 некритическими замечаниями.", timestamp: "11:30", artifactId: "art-c-1" },
      { id: "c-6", role: "user", text: "Спасибо! Отправь замечания контрагенту.", timestamp: "11:35" },
      { id: "c-7", role: "model", text: "Письмо с замечаниями подготовлено и отправлено на адрес legal@stroykomplekt.ru. Копия сохранена в документах сессии.", timestamp: "11:36", artifactId: "art-c-2" },
    ],
    execution: {
      state: "idle",
      steps: [
        { id: 1, title: "Загрузка договора", status: "completed" },
        { id: 2, title: "Проверка по шаблону компании", status: "completed" },
        { id: 3, title: "Анализ условий оплаты", status: "completed" },
        { id: 4, title: "Проверка гарантийных обязательств", status: "completed" },
        { id: 5, title: "Формирование заключения", status: "completed" },
        { id: 6, title: "Отправка замечаний контрагенту", status: "completed" },
      ],
      elapsed: "2ч 36м",
      integrations: [
        { id: "int-1", name: "Битрикс24", icon: "🔗", type: "CRM" },
      ],
      usedSkillIds: ["sk-1", "sk-2"],
    },
    artifacts: [
      {
        id: "art-c-1",
        name: "Заключение_юриста_Q1",
        content: `# Юридическое заключение по договору Q1

## Стороны договора
- **Заказчик:** ООО «НашаКомпания»
- **Исполнитель:** ООО «Стройкомплект»

## Критические замечания

### 1. Условия оплаты (п. 4.2)
**Текущее:** Предоплата 70%, остаток 30% по факту
**Стандарт:** Предоплата 30%, остаток 70% по факту
**Рекомендация:** Привести к стандартным условиям

### 2. Гарантийные обязательства (п. 7.1)
**Текущее:** 12 месяцев
**Стандарт:** Не менее 24 месяцев
**Рекомендация:** Увеличить до 24 месяцев

### 3. Неустойка (п. 8.3)
**Текущее:** 0.01% за каждый день просрочки
**Стандарт:** 0.1% за каждый день просрочки
**Рекомендация:** Увеличить до стандартного уровня

## Некритические замечания
- П. 3.5: не указан порядок приёмки скрытых работ
- П. 9.2: отсутствует процедура досудебного урегулирования

## Итого
Договор **не рекомендуется** к подписанию без устранения критических замечаний.`,
        generatedAt: "11:30",
      },
      {
        id: "art-c-2",
        name: "Письмо_замечания_СК",
        content: `Уважаемые коллеги,

По результатам правовой экспертизы договора поставки направляем перечень замечаний, требующих корректировки:

1. Пункт 4.2 — условия оплаты: просим изменить на предоплату 30%
2. Пункт 7.1 — гарантия: просим увеличить до 24 месяцев
3. Пункт 8.3 — неустойка: просим установить 0.1% за день

Просим рассмотреть и направить скорректированную версию.

С уважением,
Юридический отдел`,
        generatedAt: "11:36",
      },
    ],
    waitingReason: null,
  },

  // --- Сессия: Ожидание (Юрист — договор) ---
  "ses-2": {
    messages: [
      { id: "w2-1", role: "system", text: "Сессия запущена по триггеру: входящее письмо от client@stroykomplekt.ru", timestamp: "10:12" },
      { id: "w2-2", role: "model", text: "Получен договор поставки от ООО «Стройкомплект». Начинаю первичный анализ документа.", timestamp: "10:12" },
      { id: "w2-3", role: "model", text: "**Первичный анализ договора:**\n\nДоговор содержит 12 разделов. Обнаружены потенциальные проблемы:\n\n1. **Предоплата 100%** — не соответствует стандарту (макс. 30%)\n2. **Отсутствует раздел форс-мажор**\n3. **Гарантия 6 мес.** — ниже минимальных 24 мес.\n\nДля полной проверки по регламентам компании требуется доступ к юридической базе.", timestamp: "10:18", artifactId: "art-w2-1" },
    ],
    execution: {
      state: "stopped",
      steps: [
        { id: 1, title: "Получение договора", status: "completed" },
        { id: 2, title: "Первичный анализ структуры", status: "completed" },
        { id: 3, title: "Проверка по регламентам", status: "pending", detail: "Требуется авторизация в юридической базе" },
        { id: 4, title: "Формирование заключения", status: "pending" },
      ],
      elapsed: "6м 04с",
      integrations: [],
      usedSkillIds: ["sk-1"],
    },
    artifacts: [
      {
        id: "art-w2-1",
        name: "Первичный_анализ_договора_СК",
        content: `# Первичный анализ договора поставки

## Стороны
- **Заказчик:** ООО «НашаКомпания»
- **Поставщик:** ООО «Стройкомплект»

## Ключевые условия
| Параметр | Значение в договоре | Стандарт компании |
|----------|-------------------|-------------------|
| Предоплата | 100% | Макс. 30% |
| Гарантия | 6 мес. | Мин. 24 мес. |
| Неустойка | Не указана | 0.1%/день |
| Форс-мажор | Отсутствует | Обязательно |

## Заключение
Договор **не рекомендуется** к подписанию в текущей редакции. Обнаружено 3 критических отклонения от стандартов компании.`,
        generatedAt: "10:18",
      },
    ],
    waitingReason: {
      type: "missing-credentials",
      text: "Для проверки по регламентам требуется авторизация",
      toolName: "Юридическая база знаний",
    },
  },

  // --- Сессия: Исполнение (Аналитик — прайсы) ---
  "ses-4": {
    messages: [
      { id: "e4-1", role: "system", text: "Сессия создана пользователем Анна Смирнова", timestamp: "11:20" },
      { id: "e4-2", role: "user", text: "Сравни прайсы трёх поставщиков и выдели лучшие предложения по каждой категории. Учитывай не только цену, но и сроки поставки.", timestamp: "11:20" },
      { id: "e4-3", role: "model", text: "Начинаю сравнительный анализ прайсов.\n\nОбнаружены файлы:\n- Прайс_Поставщик_А.csv (142 позиции)\n- Прайс_Поставщик_Б.csv (98 позиций)\n\nИщу дополнительные данные о сроках в базе знаний...", timestamp: "11:21" },
    ],
    execution: {
      state: "executing",
      steps: [
        { id: 1, title: "Загрузка и парсинг CSV", status: "completed" },
        { id: 2, title: "Нормализация номенклатуры", status: "completed" },
        { id: 3, title: "Сопоставление позиций", status: "running", detail: "Обработано 87 из 142 позиций..." },
        { id: 4, title: "Расчёт рейтинга по критериям", status: "pending" },
        { id: 5, title: "Формирование сводной таблицы", status: "pending" },
      ],
      elapsed: "2м 15с",
      integrations: [
        { id: "int-2", name: "1С:ERP", icon: "📊", type: "ERP" },
      ],
      usedSkillIds: ["sk-2", "sk-3"],
    },
    artifacts: [],
    waitingReason: null,
  },

  // --- Сессия: Выполнена (Документалист — отчёт за декабрь) ---
  "ses-6": {
    messages: [
      { id: "c6-1", role: "system", text: "Сессия создана пользователем Анна Смирнова", timestamp: "10:00" },
      { id: "c6-2", role: "user", text: "Сформируй итоговый отчёт по закупкам за декабрь 2024. Включи объёмы, суммы и сравнение с ноябрём.", timestamp: "10:00" },
      { id: "c6-3", role: "model", text: "Начинаю формирование отчёта. Загружаю данные из 1С:ERP за период 01.12.2024 — 31.12.2024.", timestamp: "10:01" },
      { id: "c6-4", role: "model", text: "**Промежуточные данные:**\n\nЗа декабрь 2024 проведено 47 закупочных процедур на общую сумму 12.4 млн руб.\n\nСравнение с ноябрём:\n- Объём: +18% (было 10.5 млн)\n- Кол-во процедур: +12% (было 42)\n- Средний чек: +5%", timestamp: "11:15" },
      { id: "c6-5", role: "model", text: "Итоговый отчёт по закупкам за декабрь 2024 сформирован.", timestamp: "12:00", artifactId: "art-c6-1" },
    ],
    execution: {
      state: "idle",
      steps: [
        { id: 1, title: "Загрузка данных из 1С:ERP", status: "completed" },
        { id: 2, title: "Агрегация по категориям", status: "completed" },
        { id: 3, title: "Сравнение с предыдущим периодом", status: "completed" },
        { id: 4, title: "Формирование отчёта", status: "completed" },
      ],
      elapsed: "2ч 00м",
      integrations: [
        { id: "int-2", name: "1С:ERP", icon: "📊", type: "ERP" },
        { id: "int-1", name: "Битрикс24", icon: "🔗", type: "CRM" },
      ],
      usedSkillIds: ["sk-1", "sk-3"],
    },
    artifacts: [
      {
        id: "art-c6-1",
        name: "Отчёт_закупки_декабрь_2024",
        content: `# Итоговый отчёт по закупкам — Декабрь 2024

## Сводка
- **Период:** 01.12.2024 — 31.12.2024
- **Всего процедур:** 47
- **Общая сумма:** 12.4 млн ₽
- **Изменение к ноябрю:** +18%

## По категориям

| Категория | Кол-во | Сумма | Доля | Δ к ноябрю |
|-----------|--------|-------|------|------------|
| Оборудование | 12 | 5.8 млн ₽ | 47% | +22% |
| Материалы | 18 | 3.2 млн ₽ | 26% | +15% |
| Услуги | 10 | 2.1 млн ₽ | 17% | +8% |
| Прочее | 7 | 1.3 млн ₽ | 10% | +25% |

## Топ-5 поставщиков
1. ООО «ТехноПром» — 3.1 млн ₽ (8 процедур)
2. ЗАО «ПромСнаб» — 2.4 млн ₽ (6 процедур)
3. ООО «Стройкомплект» — 1.8 млн ₽ (5 процедур)
4. ИП Козлов — 1.2 млн ₽ (4 процедуры)
5. ООО «МеталлГрупп» — 0.9 млн ₽ (3 процедуры)

## Выводы
Объём закупок вырос на 18% к ноябрю, в основном за счёт категории «Оборудование». Рекомендуется пересмотреть условия с ТОП-3 поставщиками для оптимизации.`,
        generatedAt: "12:00",
      },
    ],
    waitingReason: null,
  },

  // --- Сессия: Архив (Ресёрчер — реестр поставщиков) ---
  "ses-7": {
    messages: [
      { id: "a7-1", role: "system", text: "Сессия создана пользователем Анна Смирнова", timestamp: "14:00" },
      { id: "a7-2", role: "user", text: "Обнови реестр поставщиков с учётом новых данных за январь.", timestamp: "14:00" },
      { id: "a7-3", role: "model", text: "Реестр обновлён. Добавлено 3 новых поставщика, обновлены рейтинги для 12 существующих.", timestamp: "15:30", artifactId: "art-a7-1" },
    ],
    execution: {
      state: "idle",
      steps: [
        { id: 1, title: "Загрузка текущего реестра", status: "completed" },
        { id: 2, title: "Обновление данных", status: "completed" },
        { id: 3, title: "Пересчёт рейтингов", status: "completed" },
      ],
      elapsed: "1ч 30м",
      integrations: [],
      usedSkillIds: ["sk-3"],
    },
    artifacts: [
      {
        id: "art-a7-1",
        name: "Реестр_поставщиков_обновлённый",
        content: `# Реестр поставщиков (обновлён)

## Новые поставщики
| Поставщик | ИНН | Категория | Рейтинг |
|-----------|-----|-----------|---------|
| ООО «ЭнергоМаш» | 7712345678 | Оборудование | ★★★☆☆ |
| ИП Сидоров | 5001234567 | Материалы | ★★☆☆☆ |
| ООО «ЛогистикПро» | 7801234567 | Услуги | ★★★★☆ |

## Обновлённые рейтинги (12 поставщиков)
Средний рейтинг по реестру: 3.4 из 5 (+0.2 к предыдущему периоду)`,
        generatedAt: "15:30",
      },
    ],
    waitingReason: null,
  },
};
