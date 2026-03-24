# Wukong AI Operations Platform — UI Specification

## 1. Product Overview

**Wukong** — enterprise AI operations platform, built as a workspace for launching, monitoring, and controlling AI agent work inside a company. Not a chatbot — an AI operations center.

**Core metaphor:** The user doesn't "talk to AI" — they dispatch work to AI agents, monitor execution, approve results, and manage teams of both humans and AI.

**Design language:** Dark sidebar (gray-900) + light content area (#f7f8fa) + orange-500 as primary accent. Clean, dense, enterprise UI. Font: Inter / system sans-serif.

---

## 2. Information Architecture

```
App Shell
├── Left Sidebar (w-64, bg-gray-900) — persistent navigation
│   ├── Logo + brand
│   ├── Main navigation (7 items)
│   ├── Workspaces section (expandable)
│   ├── Teams section (expandable)
│   └── User profile
├── Top Bar (h-12) — context tabs + actions + search
└── Content Area — dynamic, switches between views:
    ├── Home (Dashboard)
    ├── Task View (chat + execution + context sidebar)
    ├── Workspace Detail
    ├── Team Detail
    └── [Future: Agents, Templates, Skills, History, Settings]
```

---

## 3. Navigation

### 3.1 Left Sidebar

Fixed width: 256px (w-64). Background: gray-900. Always visible.

**Main nav items** (top section):

| Icon | Label | View ID | Badge |
|------|-------|---------|-------|
| 🏠 | Главная | `home` | — |
| 🤖 | Агенты | `agents` | — |
| 📋 | Задачи | `tasks` | count (orange-500 pill) |
| 📦 | Шаблоны | `templates` | — |
| 🔧 | Skills | `skills` | — |
| 📜 | История | `history` | — |
| ⚙️ | Настройки | `settings` | — |

Active state: bg-gray-800, text-white. Inactive: text-gray-400, hover → text-gray-200 + bg-gray-800/50.

**Workspaces section** (below nav, separated by border-t border-gray-800):
- Header: "ПРОСТРАНСТВА" + `?` tooltip icon
- Tooltip on hover: "Изолированные рабочие среды. У каждого пространства свои задачи, агенты, документы и подключённые системы."
- Each workspace: colored dot (w-2 h-2) + name + task count
- "+" Добавить button at bottom
- Click → opens Workspace Detail view

**Teams section** (below workspaces):
- Header: "КОМАНДЫ" + `?` tooltip icon
- Tooltip: "Группы сотрудников с общими правами доступа. Управляйте кто может запускать задачи, согласовывать и администрировать."
- Each team: 👤 icon + name + member count
- Click → opens Team Detail view

**User profile** (bottom, border-t):
- Avatar (gradient circle) + name + department
- Settings gear icon

### 3.2 Top Bar

Height: 48px (h-12). Background: white. Border-bottom.

Left side:
- "Дашборд" tab — activates home view
- "Текущая задача" tab — activates task view
- Breadcrumb: when in workspace/team detail, shows "› {name}" in orange

Right side:
- "🤖 AI-команда" button (gray-100, opens Create AI Team modal)
- "+ Задача" button (orange-500, opens New Task modal)
- Search input (bg-gray-50, w-28, placeholder "Поиск..."). On focus: expand to w-64, show dropdown with results grouped by type (tasks, agents, workspaces). Searches across task names, agent names, workspace names. Debounced, 300ms.
- Notification bell with red badge (unread count). Click → dropdown panel (max-h-96, overflow-y-auto) with Notification items. Each item: icon by type, title, body (truncate), timestamp. Click item → navigate to related task/workspace. "Отметить все как прочитанные" link at top.

---

## 4. Views

### 4.1 Home (Dashboard)

**Route:** Default view when `view === "home"`

**Layout:** Single scrollable column, max-w-5xl centered, p-8

**Sections (top to bottom):**

#### 4.1.1 Greeting
- H1: "Доброе утро, {userName}" (text-2xl font-bold)
- Subtitle: summary of active agents + tasks needing attention (text-gray-500)

#### 4.1.2 Quick Start (grid cols-4 gap-3)
Four action cards, each is a white rounded-xl button with:
- Large emoji icon (text-2xl) with hover scale-110
- Label (font-semibold text-sm)
- Subtitle (text-xs text-gray-400)

| Card | Action |
|------|--------|
| 🤖 Создать AI-команду | Opens `CreateAITeamModal` |
| 📦 Выбрать шаблон | [Future: template picker] |
| 🚀 Запустить задачу | Opens `NewTaskModal` |
| 🔗 Подключить систему | [Future: integrations] |

#### 4.1.3 Industry Solutions (grid cols-3 gap-3)
Six gradient cards representing "one-person" use cases:

| Title | Gradient | Icon |
|-------|----------|------|
| E-commerce | orange → amber | 🛒 |
| Финансы | emerald → teal | 💰 |
| Рекрутинг | blue → cyan | 👥 |
| Юриспруденция | purple → violet | ⚖️ |
| Производство | rose → pink | 🏭 |
| Аналитика | indigo → blue | 📊 |

Each card: relative overflow-hidden, text-white, hover:scale-[1.02].

#### 4.1.4 Active Agents + Activity Feed (grid cols-2 gap-6)

**Left: Active Agents** — white card with divide-y. Each agent row:
- Name + StatusBadge + step counter (e.g., "3/5")
- Task description
- Progress bar (h-1.5, colored by status)

**Right: Activity Feed** — white card with divide-y. Each entry:
- Activity icon (by type)
- "{agent} {action}" text
- Timestamp (font-mono)

---

### 4.2 Task View

**Route:** `view === "task"`

**Layout:** Flex row, full height. Two panels.

#### 4.2.1 Center Panel (flex-1, min-w-0)

**Task Header** (bg-white, border-b, px-6 py-4, shrink-0):
- Title (text-lg font-bold truncate) + status badge ("В процессе", orange-100)
- Metadata row: initiator, deadline, agent count (text-xs text-gray-400)
- Action buttons: ⏸ Пауза (gray-100), ✓ Согласовать (orange-500), 📄 Результаты (gray-100)
- Step indicators: horizontal flow with StepStatus circles + labels, overflow-x-auto

**Step statuses:**
- Completed: green-500 circle with ✓
- Active: orange-500 circle with animate-pulse white dot
- Pending: gray-200 circle with gray-300 border

**Chat/Execution Feed** (flex-1, overflow-y-auto, p-6):

Message types:

| Role | Rendering |
|------|-----------|
| `user` | Right-aligned, bg-orange-500, text-white, rounded-2xl rounded-tr-md |
| `system` | Centered, bg-blue-50, text-blue-700, border-blue-100, ⚡ prefix |
| `tool` | Left indented (ml-10), bg-gray-800, text-green-400, font-mono, `>` prefix |
| `agent` | Left-aligned with avatar (gradient orange square, first letter), agent name label, white card. Subtypes by `message.type`: `progress` → bg-amber-50 with ⏳ animate-pulse; `plan` → bg-blue-50 with 📋 prefix, structured step list; `result` → bg-green-50 with ✅ prefix, final output card; `tool` → bg-gray-50 with 🔧 prefix, tool invocation details |

**Input Bar** (bg-white, border-t, px-6 py-4, shrink-0):
- Input field: bg-gray-50, rounded-xl, orange focus ring
- Attachment 📎 and microphone 🎤 buttons
- "Отправить" button (orange-500, rounded-xl)

#### 4.2.2 Right Sidebar (width: 280px, border-l, shrink-0)

Scrollable. Sections:
- **Документы**: file cards with type badge (xlsx/pdf/csv colored), name (truncate), size
- **Агенты**: compact cards with name + StatusBadge + current task
- **Согласования**: amber warning card with "Ожидает подтверждения" + action button
- **Инструменты**: flex-wrap pills (gray-100)
- **Ресурсы**: stats grid (tokens, API calls, cost in $, time)

---

### 4.3 Workspace Detail View

**Route:** When `selectedWS` is set (click workspace in sidebar)

**Layout:** Scrollable, max-w-5xl centered, p-8

#### 4.3.1 Header
- Large colored square icon (w-12 h-12, workspace color) with first letter
- Title: "Пространство: {name}"
- Description
- Actions: ⚙️ Настройки, + Новая задача

#### 4.3.2 Stats Bar (grid cols-4 gap-3)
Four metric cards:
- Активных задач (green)
- Агентов подключено (blue)
- Задач завершено (purple, format: done/total)
- Расход токенов (orange, formatted with locale)

#### 4.3.3 Main Content (grid cols-3 gap-6)

**Left 2/3 (col-span-2):**

**Tasks list** — white card, divide-y:
- Task name + StatusBadge
- Agent count + progress percentage
- Progress bar

**Agents grid** (grid cols-3 gap-3):
Each agent card:
- Icon (emoji) + name + StatusBadge
- Description
- Skills as small pills (bg-gray-100)

**Right 1/3:**

**Knowledge base** — white card:
- File list with type badge, name, size
- "+ Загрузить документ" at bottom

**Connected systems** — flex-wrap:
- System name pills (white, border)
- "+ Добавить" dashed button

**Members** — avatar stack (-space-x-2):
- Gradient circles with initials
- "+" button to add

**Activity feed** — white card:
- Compact entries with ActivityIcon, text, timestamp

---

### 4.4 Team Detail View

**Route:** When `selectedTeam` is set (click team in sidebar)

**Layout:** Scrollable, max-w-4xl centered, p-8

#### 4.4.1 Header
- Blue gradient icon (👥)
- Team name
- Subtitle: "{count} {участник/участника/участников} · Доступ к: {workspaces}" (pluralize by count)
- Actions: ⚙️ Настройки, + Пригласить (blue-500)

#### 4.4.2 Members & Permissions Table
Grid layout (12 columns):

| Column | Span | Content |
|--------|------|---------|
| Участник | 4 | Avatar + name + email |
| Роль | 2 | Role badge (gray-100) |
| Запуск задач | 2 | ✓ green / ✗ gray |
| Согласование | 2 | ✓ green / ✗ gray |
| Администрирование | 2 | ✓ green / ✗ gray |

Header row: bg-gray-50, uppercase labels.

#### 4.4.3 Two-column section (grid cols-2 gap-6)

**Left: Shared AI Agents** — list with icon + name + desc + StatusBadge

**Right: Team Activity** — chronological feed with text + timestamp

#### 4.4.4 Workspace Access
Horizontal cards showing which workspaces the team can access:
- Colored square icon + name + active task count
- "+ Добавить пространство" dashed card

---

## 5. Modals

### 5.1 New Task Modal

**Trigger:** "+ Задача" button or "Запустить задачу" card on dashboard

**Size:** max-w-xl, max-h-[80vh]

**Content:**
- Header: "Новая задача" + close button
- Template selector: grid cols-3, six types:
  - 📋 Свободная задача
  - 🔍 Ресёрч
  - 📄 Документ
  - 📊 Анализ
  - ⚖️ Согласование
  - 📧 Коммуникация
- Task name input
- Description textarea
- Footer: "🚀 Запустить" button

**Selected state:** border-orange-400 bg-orange-50

### 5.2 Create AI Team Modal

**Trigger:** "🤖 AI-команда" button or "Создать AI-команду" card

**Size:** max-w-2xl, max-h-[85vh]

**4-step wizard with progress indicator:**

#### Step 0: Mission
- Team name input
- Mission/goal textarea
- Template cards (grid cols-2):
  - 🛒 Закупочная бригада (Ресёрч + Аналитик + Документ + Юрист)
  - 📊 Аналитический отдел (Ресёрч + Аналитик + Коммуникатор)
  - 👥 HR-бюро (HR + Ресёрч + Коммуникатор)
  - ⚖️ Юридический штаб (Юрист + Ресёрч + Документ)
- Clicking template pre-fills name and agents

#### Step 1: Composition
- All available agents list, each with:
  - Icon + name + description
  - Skills pills
  - Checkbox (circle, orange when selected)
- Selection summary at bottom (orange-50 card)

#### Step 2: Hierarchy
- Select leader from chosen agents
- Leader gets 👑 badge
- Visual hierarchy diagram:
  ```
        [👑 Leader Agent]
              |
    ┌─────────┴─────────┐
  [Agent B]        [Agent C]
  ```
- Rendered as flex column with connecting lines

#### Step 3: Interaction Model
**Collaboration mode** (3 options):
| Mode | Icon | Description |
|------|------|-------------|
| Sequential | → | Chain: each passes result to next. Predictable, slower. |
| Parallel | ⇉ | Simultaneous work, leader aggregates. Fast, needs coordination. |
| Debate | 🔄 | Agents critique each other's results. Deep, good for research. |

**Autonomy level** (3 options, flex row):
| Level | Description |
|-------|-------------|
| Полная | Agents work independently, notify on completion |
| Контрольные точки | Ask for approval at key steps |
| Ручная | Every step requires approval |

**Summary card** (gray-50): team name, agent count, leader, collaboration mode.

**Footer:** "← Назад" / "Далее →" / "🤖 Создать AI-команду" on last step.

---

## 6. Data Models

### 6.1 Agent

```typescript
interface Agent {
  id: string;          // "research", "doc", "analyst", "hr", "legal", "comms"
  name: string;        // Display name in Russian
  status: "active" | "waiting" | "completed" | "idle";
  task: string;        // Current task description
  step: string;        // Progress indicator, e.g., "3/5"
  progress: number;    // 0-100
  desc: string;        // Short description of capabilities
  icon: string;        // Emoji
  skills: string[];    // Capability tags, e.g., ["Web Search", "DB Query"]
}
```

### 6.2 Workspace

```typescript
interface Workspace {
  id: string;
  name: string;
  color: string;           // Tailwind class, e.g., "bg-orange-500"
  count: number;           // Active tasks count
  desc: string;            // Description
  tasks: WorkspaceTask[];
  agents: string[];        // Agent IDs assigned to this workspace
  systems: string[];       // Connected system names
  docs: WorkspaceDoc[];
  activity: ActivityEntry[];
  members: string[];       // User names
  budget: {
    tokens: number;
    cost: number;          // In $
    tasks_total: number;
    tasks_done: number;
  };
}
```

### 6.3 Team

```typescript
interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  workspaces: string[];      // Workspace names this team can access
  sharedAgents: string[];    // Agent IDs shared across team
  activity: ActivityEntry[];
}

interface TeamMember {
  name: string;
  role: string;              // "Руководитель", "Менеджер", "Аналитик", "Стажёр"
  email: string;
  avatar: string;            // Single character
  color: string;             // Tailwind gradient, e.g., "from-blue-500 to-indigo-600"
  canLaunch: boolean;        // Can start AI tasks
  canApprove: boolean;       // Can approve AI results
  canAdmin: boolean;         // Can manage workspace settings
}
```

### 6.4 Task

```typescript
interface Task {
  id: string;
  name: string;
  status: "created" | "active" | "waiting" | "completed";
  agents: number;          // Agent count
  progress: number;        // 0-100
  steps: TaskStep[];
  initiator: string;
  deadline: string;
  workspaceId?: string;    // Workspace this task belongs to
}

interface TaskStep {
  id: number;
  title: string;
  status: "completed" | "active" | "pending";
}

interface WorkspaceTask {
  id: string;
  name: string;
  status: "active" | "waiting" | "completed";
  agents: number;
  progress: number;
}

interface WorkspaceDoc {
  name: string;
  type: "xlsx" | "pdf" | "csv" | "docx";
  size: string;            // Formatted size, e.g., "2.4 MB"
}

interface ActivityEntry {
  id: string;
  type: "doc" | "approval" | "table" | "complete" | "data" | "error";
  agent: string;           // Agent name
  action: string;          // Description of action
  timestamp: string;       // ISO 8601
}

interface Notification {
  id: string;
  type: "approval_needed" | "task_completed" | "error" | "mention";
  title: string;
  body: string;
  read: boolean;
  timestamp: string;       // ISO 8601
  taskId?: string;         // Related task
}
```

### 6.5 Chat Message

```typescript
interface ChatMessage {
  role: "user" | "system" | "agent" | "tool";
  text: string;
  name?: string;           // Agent name (for role=agent)
  type?: "plan" | "result" | "tool" | "progress";
}
```

### 6.6 AI Team (created via modal)

```typescript
interface AITeam {
  name: string;
  goal: string;
  agents: string[];          // Selected agent IDs
  leader: string | null;     // Leader agent ID
  collaboration: "sequential" | "parallel" | "debate";
  autonomy: "auto" | "confirm" | "manual";
}
```

---

## 7. Component Inventory

### Shared Components

| Component | Props | Description |
|-----------|-------|-------------|
| `StatusBadge` | `status` | Colored pill with dot + label. Statuses: active (orange), waiting (amber), completed (blue), idle (gray). Note: on dashboard agent cards, active renders as green to indicate healthy execution. |
| `StepStatus` | `status` | Circle indicator for task steps. Completed: green ✓, Active: orange pulse, Pending: gray outline |
| `ActivityIcon` | `type` | Emoji icon mapped from activity type (doc, approval, table, complete, data, error) |
| `FileIcon` | `type` | Colored type badge (xlsx: green, pdf: red, csv: blue) |
| `SidebarTooltip` | `text, visible` | Tooltip popup with arrow, positioned left of sidebar |
| `SectionTitle` | `children` | Uppercase gray label for content sections |

### View Components

| Component | Props | Description |
|-----------|-------|-------------|
| `HomeView` | `onNewTask, onNewAITeam` | Dashboard with quick start, solutions, agents, activity |
| `TaskView` | `task: Task, messages: ChatMessage[], agents: Agent[]` | Chat + execution hybrid with right sidebar |
| `WorkspaceView` | `ws: Workspace` | Workspace detail with stats, tasks, agents, knowledge base |
| `TeamView` | `team: Team` | Team detail with RBAC table, shared agents, workspace access |

### Modal Components

| Component | Props | Description |
|-----------|-------|-------------|
| `NewTaskModal` | `onClose` | Task creation with template selection |
| `CreateAITeamModal` | `onClose` | 4-step wizard for assembling AI agent team |

---

## 8. State Management

### App-level State (WukongUI root)

```typescript
{
  activeNav: string;          // Currently active sidebar item ID
  view: "home" | "task";     // Current main view
  selectedWS: Workspace | null;   // If set, shows WorkspaceView
  selectedTeam: Team | null;      // If set, shows TeamView
  showNewTask: boolean;       // New Task modal visibility
  showAITeam: boolean;        // Create AI Team modal visibility
  wsTooltip: boolean;         // Workspace tooltip visibility
  teamTooltip: boolean;       // Team tooltip visibility
  notifications: Notification[];  // Notification list
  searchQuery: string;        // Current search input
}
```

### View Priority

Content rendering follows this priority:
1. `selectedWS` → WorkspaceView
2. `selectedTeam` → TeamView
3. `view === "home"` → HomeView
4. `view === "task"` → TaskView
5. Fallback → "Раздел в разработке"

### Navigation Logic

- Clicking sidebar nav item: sets `activeNav`, clears `selectedWS`/`selectedTeam`, sets `view`
- Clicking workspace: sets `selectedWS`, clears `selectedTeam`, sets `activeNav` to workspace ID
- Clicking team: sets `selectedTeam`, clears `selectedWS`, sets `activeNav` to team ID
- Top bar tabs: call `navigate()` which clears both `selectedWS` and `selectedTeam`

---

## 9. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| Primary | orange-500 (#f97316) | CTAs, active states, accents |
| Primary hover | orange-600 | Button hover |
| Primary light | orange-50/100 | Selected states, highlights |
| Sidebar bg | gray-900 | Left nav background |
| Sidebar active | gray-800 | Active nav item |
| Content bg | #f7f8fa | Main content area |
| Card bg | white | All cards and panels |
| Border | gray-100/200 | Card borders, dividers |
| Text primary | gray-900 | Headings |
| Text secondary | gray-500 | Descriptions |
| Text muted | gray-400 | Labels, timestamps |
| Status green | green-500/100/700 | Success/healthy |
| Status amber | amber-500/100/700 | Waiting/pending |
| Status blue | blue-500/100/700 | Completed |

### Typography

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Page title | text-2xl (24px) | font-bold | gray-900 |
| Section title | text-sm (14px) uppercase | font-semibold | gray-400 |
| Card title | text-lg (18px) | font-bold | gray-900 |
| Item title | text-sm (14px) | font-semibold | gray-800 |
| Body text | text-sm (14px) | normal | gray-600 |
| Small text | text-xs (12px) | normal | gray-400/500 |
| Monospace | text-xs font-mono | normal | varies |

### Spacing

| Context | Value |
|---------|-------|
| Page padding | p-8 (32px) |
| Section gap | space-y-6/8 |
| Card padding | p-4 (16px) |
| Card gap | gap-3 (12px) |
| Sidebar item | px-3 py-2.5 |

### Border Radius

| Element | Value |
|---------|-------|
| Cards | rounded-xl (12px) |
| Buttons | rounded-lg (8px) |
| Badges/pills | rounded-full |
| Modal | rounded-2xl (16px) |
| Avatars | rounded-full |
| Inputs | rounded-xl (12px) |

---

## 10. Animations

| Animation | CSS | Usage |
|-----------|-----|-------|
| Pulse | `opacity: 1 → 0.5 → 1, 2s` | Active status dots |
| Modal enter | `scale: 0.95 → 1, opacity: 0 → 1, 0.2s` | All modals |
| Tooltip enter | `translateY: 8px → 0, opacity: 0 → 1, 0.15s` | Sidebar tooltips |
| Hover scale | `scale: 1 → 1.02` | Solution cards |
| Icon scale | `scale: 1 → 1.1` | Quick start card icons |

---

## 11. Responsive Considerations

Current design is desktop-only (min ~1280px width). Future breakpoints:

- **< 1024px:** Collapse right sidebar in TaskView into toggleable panel
- **< 768px:** Collapse left sidebar into hamburger menu
- **< 640px:** Single-column layouts for all grids

---

## 12. Future Views (Not Yet Implemented)

| View | Purpose |
|------|---------|
| **Agents** | Full agent catalog with configurations, available skills, usage stats |
| **Templates** | Industry solution templates, custom workflow templates |
| **Skills** | Available tools/integrations, marketplace for new skills |
| **History** | Full audit trail, searchable, filterable by agent/workspace/time |
| **Settings** | User profile, workspace settings, API keys, billing, RBAC |

---

## 13. Key Concepts

### Workspace vs Team vs AI Team

| Concept | What it is | Contains |
|---------|------------|----------|
| **Workspace** | Isolated environment for a domain | Tasks, agents, docs, systems, knowledge base |
| **Team** | Group of human users | Members, RBAC permissions, workspace access |
| **AI Team** | Configured group of AI agents | Agents, leader, collaboration model, autonomy level |

### Agent Lifecycle

```
idle → assigned to task → active (executing steps) → waiting (needs approval) → active → completed → idle
```

### Task Lifecycle

```
created → agents assigned → active (steps progress) → waiting (needs approval) → active → completed
```

Maps to `Task.status`: `"created"` → `"active"` → `"waiting"` → `"active"` → `"completed"`

### Autonomy Levels

| Level | Behavior |
|-------|----------|
| Full | Agents complete entire task, notify only on completion |
| Checkpoints | Agents pause at critical steps for human approval |
| Manual | Every step requires explicit human approval |

### Collaboration Models

| Model | How agents interact |
|-------|-------------------|
| Sequential | Chain: A → B → C. Each passes output to next. |
| Parallel | All work simultaneously, leader aggregates results. |
| Debate | Agents review and critique each other's work iteratively. |