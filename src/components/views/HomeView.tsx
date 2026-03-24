import type { Agent, ActivityEntry } from "../../types";
import StatusBadge from "../shared/StatusBadge";
import ActivityIcon from "../shared/ActivityIcon";
import { relativeTime } from "../../utils/helpers";

interface Props {
  userName: string;
  agents: Agent[];
  activity: ActivityEntry[];
  onNewTask: () => void;
  onNewAITeam: () => void;
}

const solutions = [
  { title: "E-commerce", gradient: "from-orange-500 to-amber-500", icon: "🛒" },
  { title: "Финансы", gradient: "from-emerald-500 to-teal-500", icon: "💰" },
  { title: "Рекрутинг", gradient: "from-blue-500 to-cyan-500", icon: "👥" },
  { title: "Юриспруденция", gradient: "from-purple-500 to-violet-500", icon: "⚖️" },
  { title: "Производство", gradient: "from-rose-500 to-pink-500", icon: "🏭" },
  { title: "Аналитика", gradient: "from-indigo-500 to-blue-500", icon: "📊" },
];

const quickStart = [
  { icon: "🤖", label: "Создать AI-команду", subtitle: "Собрать группу агентов", action: "aiTeam" as const },
  { icon: "📦", label: "Выбрать шаблон", subtitle: "Готовые решения", action: "template" as const },
  { icon: "🚀", label: "Запустить задачу", subtitle: "Новое задание для AI", action: "task" as const },
  { icon: "🔗", label: "Подключить систему", subtitle: "Интеграции и API", action: "integration" as const },
];

export default function HomeView({ userName, agents, activity, onNewTask, onNewAITeam }: Props) {
  const activeAgents = agents.filter((a) => a.status !== "idle");

  function handleQuickStart(action: string) {
    if (action === "task") onNewTask();
    if (action === "aiTeam") onNewAITeam();
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Доброе утро, {userName}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {activeAgents.length} {activeAgents.length === 1 ? "агент работает" : "агента работают"} · 2 задачи требуют внимания
          </p>
        </div>

        {/* Quick Start */}
        <div className="grid grid-cols-4 gap-3">
          {quickStart.map((item) => (
            <button
              key={item.label}
              onClick={() => handleQuickStart(item.action)}
              className="bg-white rounded-xl p-4 text-left hover:shadow-md transition-shadow border border-gray-100 group"
            >
              <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform inline-block">{item.icon}</span>
              <p className="font-semibold text-sm text-gray-800">{item.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
            </button>
          ))}
        </div>

        {/* Industry Solutions */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Отраслевые решения</h2>
          <div className="grid grid-cols-3 gap-3">
            {solutions.map((s) => (
              <button
                key={s.title}
                className={`relative overflow-hidden bg-gradient-to-br ${s.gradient} rounded-xl p-5 text-white text-left hover:scale-[1.02] transition-transform`}
              >
                <span className="text-3xl block mb-2">{s.icon}</span>
                <p className="font-bold text-sm">{s.title}</p>
                <p className="text-white/70 text-xs mt-1">Автоматизация с AI-агентами</p>
                <div className="absolute -right-4 -bottom-4 text-6xl opacity-10">{s.icon}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Agents + Activity Feed */}
        <div className="grid grid-cols-2 gap-6">
          {/* Active Agents */}
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-bold text-sm text-gray-800">Активные агенты</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {activeAgents.map((agent) => (
                <div key={agent.id} className="px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{agent.icon}</span>
                      <span className="text-sm font-semibold text-gray-800">{agent.name}</span>
                      <StatusBadge status={agent.status} dashboardVariant />
                    </div>
                    <span className="text-xs text-gray-400 font-mono">{agent.step}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{agent.task}</p>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        agent.status === "active" ? "bg-green-500" :
                        agent.status === "waiting" ? "bg-amber-500" :
                        agent.status === "completed" ? "bg-blue-500" : "bg-gray-300"
                      }`}
                      style={{ width: `${agent.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-xl border border-gray-100">
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
      </div>
    </div>
  );
}
