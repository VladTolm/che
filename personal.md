# Wukong v3 — Agent-Centered Architecture Specification

## 1. Концепция

Wukong v3 переходит от модели «дашборд + боковой чат-бот» к модели **«агент — это интерфейс»**. Диалог с персональным агентом занимает центральное место. Всё остальное — контекст, который агент подтягивает по ходу разговора или который пользователь открывает параллельно через вкладки.

**Ключевой сдвиг:** пользователь не «открывает приложение и смотрит дашборд» — он «приходит к агенту и начинает работать».

---

## 2. Layout — три колонки

```
┌──────────┬───────────────────────────────────────┬──────────┐
│          │  Tabs: 💬 Чат | 📊 Обзор | 📦 Пр-ва  │          │
│  Sidebar │─────────────────────────────────────── │ Context  │
│  (threads)│                                       │  Panel   │
│          │       Central Content Area             │ (optional│
│          │   (chat / overview / workspaces)        │  320px)  │
│          │                                        │          │
│  256px   │              flex-1                    │          │
└──────────┴───────────────────────────────────────┴──────────┘
```

### 2.1 Left Sidebar — единая с основной платформой

Сайдбар полностью повторяет структуру из основной спецификации (WUKONG-SPEC.md), с одним дополнением: первым пунктом навигации добавлен «Мой агент». Это обеспечивает единообразие при интеграции прототипа персонального агента в основную платформу.

**Ширина:** 256px (w-64). Background: gray-900. Always visible.

**Содержимое (сверху вниз):**

1. **Логотип** — `W` (orange gradient, w-8 h-8, rounded-xl) + «Wukong» + «AI Operations». Клик по `W` сворачивает сайдбар до 56px (только иконки).

2. **Main nav items** (top section):

| Icon | Label | View ID | Badge | Description |
|------|-------|---------|-------|-------------|
| 🧑‍💼 | **Мой агент** | `agent` | count (indigo-500 pill) | Персональный агент — вид по умолчанию в этом прототипе |
| 🏠 | Главная | `home` | — | Дашборд основной платформы |
| 🤖 | Агенты | `agents` | — | Каталог AI-агентов |
| 📋 | Задачи | `tasks` | count (orange-500 pill) | Все задачи |
| 📦 | Шаблоны | `templates` | — | Отраслевые решения |
| 🔧 | Skills | `skills` | — | Навыки агентов |
| 📜 | История | `history` | — | Лог выполнений |
| ⚙️ | Настройки | `settings` | — | Настройки платформы |

Active state: bg-gray-800, text-white. «Мой агент» выделяется дополнительно: bg-indigo-600/20, text-indigo-300, ring-1 ring-indigo-500/30 + пульсирующий индикатор, когда есть новые уведомления.

Inactive: text-gray-400, hover → text-gray-200 + bg-gray-800/50.

3. **Workspaces section** (separated by border-t border-gray-800):
   - Header: «ПРОСТРАНСТВА»
   - Each workspace: colored dot (w-2 h-2) + name + task count
   - Click → переключает вид на контент пространства / открывает контекстную панель

4. **Teams section** (below workspaces):
   - Header: «КОМАНДЫ»
   - Each team: 👤 icon + name + member count
   - Click → открывает вид команды

5. **User profile** (bottom, border-t border-gray-800):
   - Avatar (gradient circle) + name
   - Settings gear icon → открывает настройки агента в контекстной панели

**Интеграция с основной платформой:**
При клике на «Мой агент» — центральная область показывает интерфейс персонального агента (вкладки Чат/Обзор/Пространства). При клике на любой другой пункт навигации (Главная, Агенты, Задачи и т.д.) — центральная область переключается на соответствующий вид основной платформы. Сайдбар остаётся идентичным в обоих режимах.

### 2.2 Central Content Area — вкладки

Центральная область переключается через вкладки в верхней панели.

**Top bar** (h-12, bg-white, border-b border-gray-100):

Левая часть:
- Аватар агента (indigo gradient, 28px) + «Персональный агент» + зелёный индикатор «Онлайн»

Центр:
- Вкладки: **💬 Чат** | **📊 Обзор** | **📦 Пространства**
- Активная: text-indigo-600, border-b-2 border-indigo-500
- Неактивная: text-gray-400, hover → text-gray-600

Правая часть:
- Кнопка «📋 Контекст» — открывает/закрывает правую панель
- Поиск (опционально)

#### Вкладка «💬 Чат» (по умолчанию)

Основной режим работы. Полноценный диалог с агентом.

**Лента сообщений** (flex-1, overflow-y-auto, px-6 py-6, bg: #fafafa):
- Контент центрирован: max-w-2xl mx-auto
- Сообщения чередуются: агент (слева) и пользователь (справа)

**Типы сообщений агента:**
- Текстовое сообщение — bg-transparent, text-gray-700
- Встроенный виджет — rich-компонент прямо в ленте (см. секцию 3)
- Execution Card — прогресс выполнения задачи
- Confirm Card — план на подтверждение
- Blocked Card — действие за пределами полномочий
- Auto Run Card — результат автоматизации

**Сообщения пользователя:**
- Справа, bg-indigo-600, text-white, rounded-2xl rounded-tr-md, max-w-md

**Системные сообщения:**
- По центру, bg-gray-100, text-gray-500, rounded-full, text-xs
- Используются для временных меток (начало дня) и статусных уведомлений

**Input Bar** (bg-white, border-t, px-6 py-4):
- Контейнер: max-w-2xl mx-auto
- Поле ввода: bg-gray-50, rounded-2xl, px-4 py-3, border-gray-200
  Focus: border-indigo-400, ring-2 ring-indigo-100
- Кнопка отправки: w-10 h-10, bg-indigo-500, rounded-xl, иконка ↑
- **Quick Actions (demo buttons)** — ряд кнопок-подсказок под полем ввода:
  - 🛫 Рейсы
  - 📦 Пространство
  - 🧾 Чеки
  - 🚫 Блокировка
  - 🔄 Автоматизация

  Стиль: px-3 py-1.5, bg-gray-100, rounded-xl, text-xs, text-gray-500
  Hover: bg-indigo-50, text-indigo-600

  Каждая кнопка запускает демо-сценарий (см. секцию 5).

#### Вкладка «📊 Обзор»

Компактный дашборд — oversight mode без необходимости спрашивать агента.

**Layout:** Scrollable, max-w-4xl mx-auto, p-6, bg: #fafafa

**Секции (сверху вниз):**

1. **Активные выполнения** — горизонтальная полоса карточек (overflow-x-auto)
   - Каждая карточка: bg-white, rounded-xl, border (green если завершено, orange если в процессе)
   - Содержит: название, мини-прогресс-бар (4 сегмента), время/статус

2. **Календарь** — список встреч на сегодня
   - bg-white, rounded-xl, border
   - Каждая строка: время (font-mono) + название + длительность
   - Urgent: border-l-4 border-l-red-400
   - Подготовка агента: text-indigo-500 «✨ {описание}»

3. **Задачи** — список персональных задач с приоритетами
   - Цветные точки: P0 red, P1 orange, P2 amber
   - Дедлайн справа (text-gray-400)

4. **Почта** — дайджест (3 требуют ответа)
   - Отправитель + тема
   - Кнопка «Черновик» для срочных

5. **Автоматизации** — горизонтальные чипы
   - Иконка + название + расписание
   - Зелёный/синий бордер по статусу

#### Вкладка «📦 Пространства»

Обзор всех рабочих пространств.

**Layout:** Scrollable, max-w-4xl mx-auto, p-6

**Содержимое:**
- Сетка карточек пространств (grid cols-2 или cols-3)
- Каждая карточка:
  - Цветная иконка (первая буква, bg по цвету пространства)
  - Название
  - Описание (text-xs, truncate)
  - Метрики: активных задач, агентов, прогресс
  - Мини-список задач (top 3)
- Клик по карточке → открывает контекстную панель справа с деталями
- Кнопка «+ Создать пространство» (border-dashed)

### 2.3 Right Context Panel — по запросу

**Ширина:** 320px
**Появление:** slide-right анимация, border-l border-gray-200
**Закрытие:** кнопка ✕ в хедере панели

**Типы контекста:**

| Тип | Заголовок | Содержимое |
|-----|-----------|------------|
| `workspace` | 📦 {Название} | Задачи, агенты, документы, подключённые системы |
| `execution` | ✈️ Детали поиска | Параметры, источники, статистика |
| `agent-settings` | ⚙️ Настройки агента | Личность (слайдеры), доступ (read/write), память |
| `task-detail` | 📋 {Название задачи} | Шаги, агенты, документы, ресурсы |
| `team` | 👥 {Название команды} | Участники, права, активность |

---

## 3. Встроенные виджеты (Inline Widgets)

Агент может встраивать rich-компоненты прямо в ленту чата. Это ключевое отличие от обычного чат-бота.

### 3.1 CalendarWidget
- Заголовок: «📅 Расписание — {дата}» + счётчик встреч
- Список событий: время, название, длительность, urgent-маркер
- Подготовка агента: «✨ {описание}» — показывает, что агент уже что-то сделал

### 3.2 MailWidget
- Заголовок: «📧 Почта — N требуют ответа»
- Список писем: отправитель + тема
- Кнопка «Черновик» — агент уже подготовил ответ

### 3.3 TodoWidget
- Заголовок: «📋 Мои задачи»
- Список с цветными приоритетами (P0–P3)
- Дедлайны справа

### 3.4 ActiveExecutionsWidget
- Горизонтальные карточки текущих выполнений
- Мини-прогресс-бар (сегменты: зелёный/оранжевый/серый)
- Время и статус

### 3.5 AutomationsWidget
- Заголовок: «🔄 Автоматизации» + счётчик активных
- Чипы: иконка + название + расписание
- Цвет: green-50 (success) / blue-50 (monitoring)

### 3.6 WorkspaceInlineWidget
- Заголовок: «Пространство: {Название}» на цветном фоне
- Метрики (3 колонки): активных, агентов, завершено
- Мини-список задач с прогресс-барами
- Иконки агентов внизу
- Ссылка «Открыть полностью →» → открывает контекстную панель

### 3.7 ExecutionCard
- Заголовок + таймер
- Список шагов с статусами (✅ completed, ● running, ○ pending)
- Блок результата (bg-green-50): summary + кнопки «Открыть», «Скачать»
- Опциональная таблица результатов

### 3.8 ConfirmCard
- Border-2 border-indigo-200 (выделяется из потока)
- Заголовок + badge «план»
- Нумерованные шаги
- Кнопки: «✓ Запустить» (indigo-500) + «✏️ Изменить»

### 3.9 BlockedCard
- bg-red-50, border-red-200
- Заголовок: «🚫 За пределами полномочий»
- Объяснение + список альтернативных действий (кнопки)

### 3.10 AutoRunCard
- bg-amber-50, border-amber-100
- Badge «авто» (amber-200)
- Результат автоматизации в свободном формате

---

## 4. Утренний брифинг

При входе в систему (или при переключении на тред «Утренний брифинг») агент показывает первое сообщение с набором виджетов:

```
SystemMsg: "Вт, 25 марта 2026 · 08:00"

AgentMsg (proactive):
  Text: "Доброе утро, Влад! Вот что важно сегодня:"
  CalendarWidget
  MailWidget
  TodoWidget
  ActiveExecutionsWidget
  AutomationsWidget
  Alert: "⚠️ Foxconn поднял цены на 3 позиции..."
```

Это заменяет традиционный дашборд. Пользователь может:
- Кликнуть на элемент виджета → начать диалог об этом
- Переключиться на вкладку «Обзор» → видеть то же самое в формате дашборда
- Сразу написать задачу в поле ввода

---

## 5. Демо-сценарии (Quick Actions)

Quick Action кнопки под полем ввода запускают предзаписанные сценарии для демонстрации возможностей агента.

### 5.1 🛫 Рейсы
Демонстрирует: ad-hoc задачу с планом, подтверждением, execution, inline-таблицей.

```
User: "Найди рейсы Москва–Шанхай, 1-3 апреля, до 30000₽"
Agent: ConfirmCard (4 шага)
User: [клик "Запустить"]
Agent: ExecutionCard (running → done) + таблица 5 рейсов
```

### 5.2 📦 Пространство
Демонстрирует: запрос контекста рабочего пространства, inline-виджет, переход к детальному виду.

```
User: "Покажи пространство Закупки"
Agent: WorkspaceInlineWidget с метриками и задачами
       + ссылка "Открыть полностью →" (открывает правую панель)
```

### 5.3 🧾 Чеки
Демонстрирует: сложную задачу с чтением почты, extraction, генерацией файла.

```
User: "Собери чеки из почты за март и сделай expense report"
Agent: ConfirmCard (4 шага)
User: [клик "Запустить"]
Agent: ExecutionCard (running → done) + результат с summary
```

### 5.4 🚫 Блокировка
Демонстрирует: границы полномочий (read many, write few), graceful degradation.

```
User: "Отправь Foxconn наш новый прайс"
Agent: BlockedCard с объяснением + 3 альтернативы
```

### 5.5 🔄 Автоматизация
Демонстрирует: создание recurring automation из natural language.

```
User: "Каждое утро в 7:30 — курс юаня, погода, мои задачи"
Agent: Карточка новой автоматизации (название, расписание, шаги)
User: [клик "Создать"]
Agent: Подтверждение + тестовый запуск с результатом (AutoRunCard)
```

### Управление состоянием демо

Состояние прогрессирует линейно:
```
morning_brief → flight_plan → flight_running → flight_done
→ workspace_view → expense_plan → expense_running → expense_done
→ blocked → auto_create → auto_done
```

Quick Action кнопки позволяют перепрыгнуть к нужному сценарию.

---

## 6. Design Tokens

### Цвета

| Token | Value | Usage |
|-------|-------|-------|
| Primary (agent) | indigo-500/600 | Агент, кнопки, акценты чата |
| Primary (workspace) | orange-500 | Пространства, задачи |
| Sidebar bg | gray-900 | Левая навигация |
| Content bg | #fafafa | Фон центральной области |
| Card bg | white | Карточки, виджеты |
| User message | indigo-600 | Пузырь сообщения пользователя |
| Agent proactive | indigo-50/100 | Фон проактивных элементов |
| Execution success | green-50/400/600 | Завершённые шаги |
| Execution running | orange-400/500 | Текущий шаг |
| Blocked | red-50/200/600 | Действие за пределами полномочий |
| Automation | amber-50/200/500 | Автоматизации |
| Monitoring | blue-50/200/400 | Мониторинг-триггеры |

### Типографика

| Element | Style |
|---------|-------|
| Agent name | text-sm font-semibold text-gray-800 |
| Message text | text-sm text-gray-700 leading-relaxed |
| Widget header | text-sm font-semibold text-gray-700 |
| Widget content | text-sm text-gray-600/700 |
| System message | text-xs text-gray-500 |
| Timestamp | text-xs text-gray-400 |
| Tab active | text-sm font-medium text-indigo-600 |
| Tab inactive | text-sm font-medium text-gray-400 |

### Spacing

| Element | Value |
|---------|-------|
| Sidebar width | 200px (collapsed: 56px) |
| Context panel width | 320px |
| Top bar height | 48px (h-12) |
| Chat max-width | max-w-2xl (672px) |
| Overview max-width | max-w-4xl (896px) |
| Message gap | space-y-6 |
| Chat padding | px-6 py-6 |
| Input padding | px-6 py-4 |
| Widget max-width | max-w-lg (512px) |

### Анимации

| Name | Keyframes | Duration | Usage |
|------|-----------|----------|-------|
| fade-in | translateY(8px)→0, opacity 0→1 | 0.25s ease-out | Новые сообщения, виджеты |
| slide-right | translateX(20px)→0, opacity 0→1 | 0.2s ease-out | Контекстная панель |
| pulse | opacity 1→0.5→1 | 2s infinite | Running индикаторы |

---

## 7. Компоненты

### Inventory

| Component | Props | Description |
|-----------|-------|-------------|
| `App` | — | Root: layout, state, routing |
| `Sidebar` | threads, activeThread, collapsed, onSelect, onCollapse | Левая панель с тредами |
| `TopBar` | activeTab, agentOnline, contextOpen, onTabChange, onToggleContext | Верхняя панель с вкладками |
| `ChatView` | chatState, onSend, onQuickAction, onOpenContext | Лента диалога + input |
| `OverviewView` | — | Дашборд: календарь, задачи, выполнения |
| `WorkspacesView` | workspaces, onSelectWorkspace | Сетка пространств |
| `ContextPanel` | context, onClose | Правая контекстная панель |
| `AgentMsg` | proactive, time, children | Контейнер сообщения агента |
| `UserMsg` | children | Пузырь сообщения пользователя |
| `SystemMsg` | children | Центрированное системное сообщение |
| `CalendarWidget` | events | Встроенный календарь |
| `MailWidget` | mails | Встроенный дайджест почты |
| `TodoWidget` | todos | Встроенный список задач |
| `ActiveExecutionsWidget` | executions | Полоса активных выполнений |
| `AutomationsWidget` | automations | Чипы автоматизаций |
| `WorkspaceInlineWidget` | name, tasks, agents | Мини-дашборд пространства |
| `ExecutionCard` | exec, showTable | Прогресс выполнения |
| `ConfirmCard` | title, steps, onConfirm | План на подтверждение |
| `BlockedCard` | — | Действие заблокировано |
| `AutoRunCard` | title, content | Результат автоматизации |

---

## 8. State Management

```typescript
interface AppState {
  // Sidebar
  sidebarCollapsed: boolean;
  activeThread: string;       // ID текущего треда
  threads: Thread[];

  // Tabs
  activeTab: 'chat' | 'overview' | 'workspaces';

  // Chat
  chatState: ChatDemoState;   // Текущий шаг демо-сценария
  input: string;              // Текст в поле ввода

  // Context panel
  contextPanel: ContextConfig | null;  // null = закрыта
}

type ChatDemoState =
  | 'morning_brief'
  | 'flight_plan' | 'flight_running' | 'flight_done'
  | 'workspace_view'
  | 'expense_plan' | 'expense_running' | 'expense_done'
  | 'blocked'
  | 'auto_create' | 'auto_done';

interface Thread {
  id: string;
  label: string;
  icon: string;
  time: string;
  unread: number;
}

interface ContextConfig {
  type: 'workspace' | 'execution' | 'agent-settings' | 'task-detail' | 'team';
  title: string;
  data?: any;
}
```

---

## 9. Responsive Considerations

| Breakpoint | Adaptation |
|------------|------------|
| ≥ 1280px | Full layout: sidebar + tabs + context panel |
| 1024–1279px | Context panel overlays content (absolute) |
| 768–1023px | Sidebar collapsed by default, context panel hidden |
| < 768px | Sidebar = hamburger, tabs = scrollable, no context panel |

---

## 10. Security Model (unchanged)

Персональный агент наследует модель «Read Many, Write Few»:

**Чтение (read-only):**
- 📅 Календарь
- 📧 Почта
- 📊 Пространства и задачи
- 💬 Мессенджеры

**Запись (только персональная зона):**
- 📋 Мои задачи (создание, приоритизация)
- 📝 Заметки
- 📄 Черновики
- 🔄 Автоматизации (персональные)

**Запрещено:**
- Отправка сообщений от имени пользователя
- Модификация данных в пространствах
- Финансовые операции
- Доступ к чужим персональным данным