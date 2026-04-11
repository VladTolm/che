import type { Workspace, Agent } from "../../types";
import StatusBadge from "../shared/StatusBadge";
import FileIcon from "../shared/FileIcon";
import ActivityIcon from "../shared/ActivityIcon";
import { formatTokens, relativeTime } from "../../utils/helpers";
import { Settings, Plus, Bot } from "lucide-react";

interface Props {
  ws: Workspace;
  allAgents: Agent[];
  onNewTask: () => void;
}

export default function WorkspaceView({ ws, allAgents, onNewTask }: Props) {
  const wsAgents = allAgents.filter((a) => ws.agents.includes(a.id));

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl ${ws.color} flex items-center justify-center text-white text-xl font-bold`}>
            {ws.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Пространство: {ws.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{ws.desc}</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors">
              <Settings className="w-3.5 h-3.5" />
              Настройки
            </button>
            <button onClick={onNewTask} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 rounded-lg text-sm text-white transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Новая задача
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-gray-900">{ws.tasks.filter((t) => t.status === "active").length}</p>
            <p className="text-xs text-gray-500 mt-1">Активных задач</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-gray-900">{wsAgents.length}</p>
            <p className="text-xs text-gray-500 mt-1">Агентов подключено</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-gray-900">{ws.budget.tasks_done}/{ws.budget.tasks_total}</p>
            <p className="text-xs text-gray-500 mt-1">Задач завершено</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-gray-900">{formatTokens(ws.budget.tokens)}</p>
            <p className="text-xs text-gray-500 mt-1">Расход токенов</p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left 2/3 */}
          <div className="col-span-2 space-y-6">
            {/* Tasks */}
            <div className="bg-white rounded-xl border border-gray-100">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="font-bold text-sm text-gray-800">Задачи</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {ws.tasks.map((task) => (
                  <div key={task.id} className="px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800">{task.name}</span>
                        <StatusBadge status={task.status} />
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>{task.agents} агентов</span>
                        <span>{task.progress}%</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          task.status === "active" ? "bg-green-500" :
                          task.status === "waiting" ? "bg-gray-400" : "bg-gray-500"
                        }`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agents */}
            <div>
              <h3 className="font-bold text-sm text-gray-800 mb-3">Агенты</h3>
              <div className="grid grid-cols-3 gap-3">
                {wsAgents.map((agent) => (
                  <div key={agent.id} className="bg-white rounded-xl border border-gray-100 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-5 h-5 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-800">{agent.name}</span>
                      <StatusBadge status={agent.status} />
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{agent.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {agent.skills.map((skill) => (
                        <span key={skill} className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-600">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 1/3 */}
          <div className="space-y-6">
            {/* Knowledge base */}
            <div className="bg-white rounded-xl border border-gray-100">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="font-bold text-sm text-gray-800">База знаний</h3>
              </div>
              <div className="p-3 space-y-2">
                {ws.docs.map((doc) => (
                  <div key={doc.name} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <FileIcon type={doc.type} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700 truncate">{doc.name}</p>
                      <p className="text-[10px] text-gray-400">{doc.size}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  + Загрузить документ
                </button>
              </div>
            </div>

            {/* Connected systems */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="font-bold text-sm text-gray-800 mb-3">Подключённые системы</h3>
              <div className="flex flex-wrap gap-2">
                {ws.systems.map((sys) => (
                  <span key={sys} className="px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-xs text-gray-700">{sys}</span>
                ))}
                <button className="px-2.5 py-1 border border-dashed border-gray-300 rounded-lg text-xs text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors">
                  + Добавить
                </button>
              </div>
            </div>

            {/* Members */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="font-bold text-sm text-gray-800 mb-3">Участники</h3>
              <div className="flex items-center -space-x-2">
                {ws.members.map((name, i) => {
                  const colors = ["from-blue-500 to-indigo-600", "from-emerald-500 to-teal-600", "from-orange-500 to-red-600"];
                  return (
                    <div
                      key={name}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center text-white text-xs font-bold border-2 border-white`}
                      title={name}
                    >
                      {name.charAt(0)}
                    </div>
                  );
                })}
                <button className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm hover:border-gray-400 hover:text-gray-500 ml-1">
                  +
                </button>
              </div>
            </div>

            {/* Activity */}
            <div className="bg-white rounded-xl border border-gray-100">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="font-bold text-sm text-gray-800">Активность</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {ws.activity.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="px-4 py-2.5 flex items-start gap-2">
                    <ActivityIcon type={entry.type} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">{entry.agent}</span> {entry.action}
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono">{relativeTime(entry.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
