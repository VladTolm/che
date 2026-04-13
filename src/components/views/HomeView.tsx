import { useState } from "react";
import type { ActivityEntry } from "../../types";
import { activeTasks } from "../../data/mock";
import StatusBadge from "../shared/StatusBadge";
import ActivityIcon from "../shared/ActivityIcon";
import { relativeTime } from "../../utils/helpers";
import {
  Bot, Package, Link, Sparkles,
  ShoppingCart, Banknote, UserSearch, Scale, Factory, BarChart3,
  ChevronRight, ArrowUp, X, FolderPlus, Pencil, SlidersHorizontal, CalendarDays,
} from "lucide-react";

interface Props {
  userName: string;
  agents: { id: string; name: string; status: "active" | "waiting" | "completed" | "idle"; task: string; step: string; progress: number }[];
  activity: ActivityEntry[];
  onNewTask: () => void;
  onNewAITeam: () => void;
  onNavigateToTask: () => void;
}

const solutions = [
  { title: "E-commerce", icon: ShoppingCart, bg: "bg-gray-900" },
  { title: "Финансы", icon: Banknote, bg: "bg-gray-800" },
  { title: "Рекрутинг", icon: UserSearch, bg: "bg-gray-700" },
  { title: "Юриспруденция", icon: Scale, bg: "bg-gray-900" },
  { title: "Производство", icon: Factory, bg: "bg-gray-800" },
  { title: "Аналитика", icon: BarChart3, bg: "bg-gray-700" },
];

const quickStart = [
  { icon: Bot, label: "Создать AI-команду", subtitle: "Собрать группу агентов", action: "aiTeam" as const },
  { icon: Package, label: "Выбрать шаблон", subtitle: "Готовые решения", action: "template" as const },
  { icon: Link, label: "Подключить систему", subtitle: "Интеграции и API", action: "integration" as const },
  { icon: Sparkles, label: "Придумай свою", subtitle: "Своя автоматизация", action: "custom" as const },
];

export default function HomeView({ userName, agents: _agents, activity, onNewTask, onNewAITeam, onNavigateToTask }: Props) {
  const [chatInput, setChatInput] = useState("");
  const [contexts, setContexts] = useState([{ id: "giga", label: "giga" }]);

  const runningTasks = activeTasks.filter((t) => t.status === "active").length;
  const waitingTasks = activeTasks.filter((t) => t.status === "waiting").length;

  function handleQuickStart(action: string) {
    if (action === "aiTeam") onNewAITeam();
  }

  function handleChatSubmit() {
    if (chatInput.trim()) {
      onNewTask();
      setChatInput("");
    }
  }

  function removeContext(id: string) {
    setContexts((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Доброе утро, {userName}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {runningTasks} {runningTasks === 1 ? "задача исполняется" : "задачи исполняются"} · {waitingTasks} {waitingTasks === 1 ? "требует внимания" : "требуют внимания"}
          </p>
        </div>

        {/* Chat Form */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-4 pb-0">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
              placeholder="Как я могу вам помочь сегодня?"
              className="w-full text-base text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
            />
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {contexts.map((ctx) => (
                <span
                  key={ctx.id}
                  className="bg-gray-100 rounded-lg px-3 py-1 flex items-center gap-1.5 text-sm text-gray-700"
                >
                  <FolderPlus className="w-3.5 h-3.5 text-gray-400" />
                  {ctx.label}
                  <button onClick={() => removeContext(ctx.id)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <SlidersHorizontal className="w-4.5 h-4.5" />
              </button>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <CalendarDays className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={handleChatSubmit}
                className="w-9 h-9 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ArrowUp className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Tasks + Activity Feed */}
        <div className="grid grid-cols-2 gap-6">
          {/* Active Tasks */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-sm text-gray-800">Активные задачи</h3>
              <span className="text-xs text-gray-400">{activeTasks.length}</span>
            </div>
            <div className="divide-y divide-gray-50">
              {activeTasks.map((task) => {
                const isNavigable = task.navigable;
                const Wrapper = isNavigable ? "button" : "div";
                return (
                  <Wrapper
                    key={task.id}
                    {...(isNavigable ? { onClick: onNavigateToTask } : {})}
                    className={`w-full px-4 py-3 text-left ${isNavigable ? "hover:bg-gray-50 transition-colors cursor-pointer group" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-semibold text-gray-800 truncate pr-2">{task.name}</h4>
                      {isNavigable && (
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <Bot className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">{task.agents.join(", ")}</span>
                      </div>
                      <StatusBadge status={task.status} />
                      <span className="text-xs text-gray-400 ml-auto">{task.deadline}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          task.status === "active" ? "bg-green-500" : "bg-gray-400"
                        }`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-bold text-sm text-gray-800">Лента активности</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {activity.map((entry) => (
                <div key={entry.id} className="px-4 py-3 flex items-start gap-2.5">
                  <ActivityIcon type={entry.type} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{entry.agent}</span> {entry.action}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono shrink-0">{relativeTime(entry.timestamp)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Start Cards */}
        <div className="grid grid-cols-4 gap-3">
          {quickStart.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => handleQuickStart(item.action)}
                className="bg-white rounded-xl p-4 text-left hover:bg-gray-50 transition-colors border border-gray-200 group"
              >
                <Icon className="w-6 h-6 text-gray-500 mb-2 group-hover:text-gray-700 transition-colors" />
                <p className="font-semibold text-sm text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Industry Solutions */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Отраслевые решения</h2>
          <div className="grid grid-cols-3 gap-3">
            {solutions.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.title}
                  className={`${s.bg} rounded-xl p-5 text-white text-left hover:opacity-90 transition-opacity`}
                >
                  <Icon className="w-8 h-8 mb-2 opacity-80" />
                  <p className="font-bold text-sm">{s.title}</p>
                  <p className="text-white/60 text-xs mt-1">Автоматизация с AI-агентами</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
