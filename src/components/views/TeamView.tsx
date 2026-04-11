import type { Team, Agent } from "../../types";
import StatusBadge from "../shared/StatusBadge";
import ActivityIcon from "../shared/ActivityIcon";
import { pluralize, relativeTime } from "../../utils/helpers";
import { Users, Settings, UserPlus, Bot } from "lucide-react";

interface Props {
  team: Team;
  allAgents: Agent[];
  workspaceColors: Record<string, string>;
}

export default function TeamView({ team, allAgents, workspaceColors }: Props) {
  const memberCount = team.members.length;
  const memberWord = pluralize(memberCount, "участник", "участника", "участников");
  const sharedAgents = allAgents.filter((a) => team.sharedAgents.includes(a.id));

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-white">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{team.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {memberCount} {memberWord} · Доступ к: {team.workspaces.join(", ")}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors">
              <Settings className="w-3.5 h-3.5" />
              Настройки
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 rounded-lg text-sm text-white transition-colors">
              <UserPlus className="w-3.5 h-3.5" />
              Пригласить
            </button>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-12 gap-0 bg-gray-50 px-4 py-2.5 border-b border-gray-100">
            <span className="col-span-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Участник</span>
            <span className="col-span-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Роль</span>
            <span className="col-span-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Запуск задач</span>
            <span className="col-span-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Согласование</span>
            <span className="col-span-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Администрирование</span>
          </div>
          <div className="divide-y divide-gray-50">
            {team.members.map((m) => (
              <div key={m.email} className="grid grid-cols-12 gap-0 px-4 py-3 items-center">
                <div className="col-span-4 flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {m.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{m.name}</p>
                    <p className="text-[10px] text-gray-400">{m.email}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{m.role}</span>
                </div>
                <div className="col-span-2">
                  {m.canLaunch ? (
                    <span className="text-green-500 font-bold">✓</span>
                  ) : (
                    <span className="text-gray-300">✗</span>
                  )}
                </div>
                <div className="col-span-2">
                  {m.canApprove ? (
                    <span className="text-green-500 font-bold">✓</span>
                  ) : (
                    <span className="text-gray-300">✗</span>
                  )}
                </div>
                <div className="col-span-2">
                  {m.canAdmin ? (
                    <span className="text-green-500 font-bold">✓</span>
                  ) : (
                    <span className="text-gray-300">✗</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two columns: Shared Agents + Activity */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-bold text-sm text-gray-800">Общие AI-агенты</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {sharedAgents.map((agent) => (
                <div key={agent.id} className="px-4 py-3 flex items-center gap-3">
                  <Bot className="w-5 h-5 text-gray-500" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">{agent.name}</span>
                      <StatusBadge status={agent.status} />
                    </div>
                    <p className="text-xs text-gray-500">{agent.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-bold text-sm text-gray-800">Активность команды</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {team.activity.map((entry) => (
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

        {/* Workspace access */}
        <div>
          <h3 className="font-bold text-sm text-gray-800 mb-3">Доступ к пространствам</h3>
          <div className="flex gap-3">
            {team.workspaces.map((wsName) => (
              <div key={wsName} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${workspaceColors[wsName] || "bg-gray-400"} flex items-center justify-center text-white text-xs font-bold`}>
                  {wsName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{wsName}</p>
                  <p className="text-xs text-gray-400">Активных задач: 2</p>
                </div>
              </div>
            ))}
            <button className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center gap-2 text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">
              <span>+</span>
              <span className="text-sm">Добавить пространство</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
