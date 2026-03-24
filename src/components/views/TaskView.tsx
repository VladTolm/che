import { useState } from "react";
import type { Task, ChatMessage, Agent, WorkspaceDoc } from "../../types";
import StatusBadge from "../shared/StatusBadge";
import StepStatus from "../shared/StepStatus";
import FileIcon from "../shared/FileIcon";

interface Props {
  task: Task;
  messages: ChatMessage[];
  agents: Agent[];
}

const taskDocs: WorkspaceDoc[] = [
  { name: "Реестр поставщиков.xlsx", type: "xlsx", size: "2.4 MB" },
  { name: "Анализ рынка.pdf", type: "pdf", size: "890 KB" },
  { name: "Выгрузка цен.csv", type: "csv", size: "1.1 MB" },
];

const taskTools = ["Web Search", "Data Analysis", "DB Query", "Document Gen", "Email", "API Call"];

export default function TaskView({ task, messages, agents }: Props) {
  const [input, setInput] = useState("");
  const activeAgents = agents.filter((a) => ["active", "waiting"].includes(a.status));

  function renderMessage(msg: ChatMessage, i: number) {
    if (msg.role === "user") {
      return (
        <div key={i} className="flex justify-end">
          <div className="max-w-md bg-orange-500 text-white px-4 py-3 rounded-2xl rounded-tr-md text-sm">
            {msg.text}
          </div>
        </div>
      );
    }

    if (msg.role === "system") {
      return (
        <div key={i} className="flex justify-center">
          <div className="bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-xl text-xs">
            ⚡ {msg.text}
          </div>
        </div>
      );
    }

    if (msg.role === "tool") {
      return (
        <div key={i} className="ml-10">
          <div className="bg-gray-800 text-green-400 px-4 py-2.5 rounded-xl text-xs font-mono whitespace-pre-wrap">
            {msg.text}
          </div>
        </div>
      );
    }

    // agent
    const subtypeStyles: Record<string, string> = {
      progress: "bg-amber-50 border-amber-100",
      plan: "bg-blue-50 border-blue-100",
      result: "bg-green-50 border-green-100",
      tool: "bg-gray-50 border-gray-200",
    };
    const subtypeIcons: Record<string, string> = {
      progress: "⏳",
      plan: "📋",
      result: "✅",
      tool: "🔧",
    };
    const style = subtypeStyles[msg.type || "progress"] || "bg-white border-gray-100";
    const icon = subtypeIcons[msg.type || "progress"] || "💬";
    const initial = msg.name?.charAt(0) || "A";

    return (
      <div key={i} className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-600 mb-1">{msg.name}</p>
          <div className={`border rounded-xl px-4 py-3 text-sm text-gray-700 ${style}`}>
            {msg.type === "progress" && <span className="animate-pulse-dot inline-block mr-1">{icon}</span>}
            {msg.type !== "progress" && <span className="mr-1">{icon}</span>}
            <span className="whitespace-pre-wrap">{msg.text}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex min-h-0">
      {/* Center Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Task Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 min-w-0">
              <h2 className="text-lg font-bold text-gray-900 truncate">{task.name}</h2>
              <StatusBadge status={task.status === "active" ? "active" : task.status === "waiting" ? "waiting" : task.status === "completed" ? "completed" : "idle"} />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors">
                ⏸ Пауза
              </button>
              <button className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm text-white transition-colors">
                ✓ Согласовать
              </button>
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors">
                📄 Результаты
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
            <span>Инициатор: {task.initiator}</span>
            <span>Дедлайн: {task.deadline}</span>
            <span>Агентов: {task.agents}</span>
          </div>
          {/* Step indicators */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {task.steps.map((step, i) => (
              <div key={step.id} className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5">
                  <StepStatus status={step.status} />
                  <span className={`text-xs whitespace-nowrap ${
                    step.status === "active" ? "text-orange-600 font-semibold" :
                    step.status === "completed" ? "text-green-600" : "text-gray-400"
                  }`}>
                    {step.title}
                  </span>
                </div>
                {i < task.steps.length - 1 && (
                  <div className={`w-8 h-0.5 ${step.status === "completed" ? "bg-green-300" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => renderMessage(msg, i))}
        </div>

        {/* Input Bar */}
        <div className="bg-white border-t border-gray-200 px-6 py-4 shrink-0">
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-gray-600 p-1">📎</button>
            <button className="text-gray-400 hover:text-gray-600 p-1">🎤</button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Введите сообщение..."
              className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 text-sm outline-none border border-gray-200 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-300 transition-all"
            />
            <button className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl text-sm font-medium text-white transition-colors">
              Отправить
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-70 border-l border-gray-200 bg-white overflow-y-auto shrink-0">
        <div className="p-4 space-y-5">
          {/* Documents */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Документы</h4>
            <div className="space-y-2">
              {taskDocs.map((doc) => (
                <div key={doc.name} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <FileIcon type={doc.type} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 truncate">{doc.name}</p>
                    <p className="text-[10px] text-gray-400">{doc.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agents */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Агенты</h4>
            <div className="space-y-2">
              {activeAgents.map((agent) => (
                <div key={agent.id} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                  <span className="text-sm">{agent.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-gray-700">{agent.name}</span>
                      <StatusBadge status={agent.status} />
                    </div>
                    <p className="text-[10px] text-gray-400 truncate">{agent.task}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approvals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Согласования</h4>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">⚠️</span>
                <span className="text-xs font-semibold text-amber-800">Ожидает подтверждения</span>
              </div>
              <p className="text-xs text-amber-700 mb-2">Сравнительная таблица готова к ревью</p>
              <button className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded-lg transition-colors">
                Просмотреть
              </button>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Инструменты</h4>
            <div className="flex flex-wrap gap-1.5">
              {taskTools.map((tool) => (
                <span key={tool} className="px-2 py-1 bg-gray-100 rounded-full text-[10px] text-gray-600 font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Ресурсы</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <p className="text-xs font-bold text-gray-800">248K</p>
                <p className="text-[10px] text-gray-400">токенов</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <p className="text-xs font-bold text-gray-800">34</p>
                <p className="text-[10px] text-gray-400">API вызовов</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <p className="text-xs font-bold text-gray-800">$3.72</p>
                <p className="text-[10px] text-gray-400">стоимость</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <p className="text-xs font-bold text-gray-800">12 мин</p>
                <p className="text-[10px] text-gray-400">время</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
