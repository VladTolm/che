import { useState } from "react";
import type { Workspace, Team } from "../../types";
import SidebarTooltip from "../shared/SidebarTooltip";

interface Props {
  activeNav: string;
  workspaces: Workspace[];
  teams: Team[];
  onNav: (id: string) => void;
  onSelectWS: (ws: Workspace) => void;
  onSelectTeam: (team: Team) => void;
}

const navItems = [
  { id: "home", icon: "🏠", label: "Главная" },
  { id: "agents", icon: "🤖", label: "Агенты" },
  { id: "tasks", icon: "📋", label: "Задачи", badge: 3 },
  { id: "templates", icon: "📦", label: "Шаблоны" },
  { id: "skills", icon: "🔧", label: "Skills" },
  { id: "history", icon: "📜", label: "История" },
  { id: "settings", icon: "⚙️", label: "Настройки" },
];

export default function Sidebar({ activeNav, workspaces, teams, onNav, onSelectWS, onSelectTeam }: Props) {
  const [wsTooltip, setWsTooltip] = useState(false);
  const [teamTooltip, setTeamTooltip] = useState(false);

  return (
    <aside className="w-64 bg-gray-900 flex flex-col shrink-0 h-full">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐵</span>
          <span className="text-white font-bold text-lg">Wukong</span>
        </div>
        <p className="text-gray-500 text-xs mt-0.5">AI Operations Platform</p>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeNav === item.id
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}

        {/* Workspaces */}
        <div className="relative border-t border-gray-800 pt-4 mt-4">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Пространства</span>
            <button
              className="text-gray-500 hover:text-gray-300 text-xs"
              onMouseEnter={() => setWsTooltip(true)}
              onMouseLeave={() => setWsTooltip(false)}
            >
              ?
            </button>
          </div>
          <SidebarTooltip
            text="Изолированные рабочие среды. У каждого пространства свои задачи, агенты, документы и подключённые системы."
            visible={wsTooltip}
          />
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => onSelectWS(ws)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeNav === ws.id
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${ws.color}`} />
              <span className="flex-1 text-left truncate">{ws.name}</span>
              <span className="text-xs text-gray-500">{ws.count}</span>
            </button>
          ))}
          <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-gray-300 text-sm transition-colors">
            <span className="text-xs">+</span>
            <span>Добавить</span>
          </button>
        </div>

        {/* Teams */}
        <div className="relative border-t border-gray-800 pt-4 mt-4">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Команды</span>
            <button
              className="text-gray-500 hover:text-gray-300 text-xs"
              onMouseEnter={() => setTeamTooltip(true)}
              onMouseLeave={() => setTeamTooltip(false)}
            >
              ?
            </button>
          </div>
          <SidebarTooltip
            text="Группы сотрудников с общими правами доступа. Управляйте кто может запускать задачи, согласовывать и администрировать."
            visible={teamTooltip}
          />
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => onSelectTeam(team)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeNav === team.id
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              }`}
            >
              <span className="text-sm">👤</span>
              <span className="flex-1 text-left truncate">{team.name}</span>
              <span className="text-xs text-gray-500">{team.members.length}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* User profile */}
      <div className="border-t border-gray-800 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
          А
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white font-medium truncate">Алексей Морозов</p>
          <p className="text-xs text-gray-500 truncate">Операционный отдел</p>
        </div>
        <button className="text-gray-500 hover:text-gray-300">
          <span className="text-sm">⚙️</span>
        </button>
      </div>
    </aside>
  );
}
