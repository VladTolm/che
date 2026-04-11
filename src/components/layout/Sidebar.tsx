import { useState } from "react";
import type { Workspace, Team } from "../../types";
import SidebarTooltip from "../shared/SidebarTooltip";
import {
  Building2,
  Brain,
  ClipboardList,
  ScrollText,
  Bot,
  Package,
  Wrench,
  Users,
  Settings,
} from "lucide-react";

interface Props {
  activeNav: string;
  workspaces: Workspace[];
  teams: Team[];
  onNav: (id: string) => void;
  onSelectWS: (ws: Workspace) => void;
  onSelectTeam: (team: Team) => void;
}

/* Group 1: Main modes */
const mainModes = [
  { id: "company", icon: Building2, label: "Компания" },
  { id: "gigabrain", icon: Brain, label: "ГигаМозг", badge: 3, isGigabrain: true },
];

/* Group 2: Daily */
const dailyItems = [
  { id: "tasks", icon: ClipboardList, label: "Задачи", badge: 5 },
  { id: "history", icon: ScrollText, label: "История" },
];

/* Group 3: Configuration */
const configItems = [
  { id: "agents", icon: Bot, label: "Агенты" },
  { id: "templates", icon: Package, label: "Шаблоны" },
  { id: "skills", icon: Wrench, label: "Skills" },
];

export default function Sidebar({ activeNav, workspaces, teams, onNav, onSelectWS, onSelectTeam }: Props) {
  const [wsTooltip, setWsTooltip] = useState(false);
  const [teamTooltip, setTeamTooltip] = useState(false);

  function renderNavItem(item: { id: string; icon: React.ComponentType<{ className?: string }>; label: string; badge?: number; isGigabrain?: boolean }, style: "main" | "daily" | "config") {
    const isActive = activeNav === item.id;
    const isGigabrain = item.isGigabrain;
    const Icon = item.icon;

    const cls = isActive
      ? "bg-gray-100 text-gray-900 font-medium"
      : style === "config"
        ? "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50";

    const padding = style === "config" ? "px-3 py-2" : "px-3 py-2.5";

    return (
      <button
        key={item.id}
        onClick={() => onNav(item.id)}
        className={`w-full flex items-center gap-3 ${padding} rounded-lg text-xs transition-colors cursor-pointer ${cls}`}
      >
        <span className="relative">
          <Icon className="w-5 h-5" />
          {isGigabrain && (
            <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse-dot" />
          )}
        </span>
        <span className="flex-1 text-left">{item.label}</span>
        {item.badge != null && (
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${isGigabrain ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600"}`}>
            {item.badge}
          </span>
        )}
      </button>
    );
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 h-full">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-gray-200">
        <span className="text-gray-900 font-extrabold text-sm uppercase tracking-tight">
          ГИГАЧАТ БИЗНЕС
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {/* Group 1: Main modes */}
        <div className="space-y-0.5">
          {mainModes.map((item) => renderNavItem(item, "main"))}
        </div>

        {/* Group 2: Daily */}
        <div className="border-t border-gray-200 mt-3 pt-3 space-y-0.5">
          {dailyItems.map((item) => renderNavItem(item, "daily"))}
        </div>

        {/* Group 3: Configuration */}
        <div className="border-t border-gray-200 mt-3 pt-3 space-y-0.5">
          {configItems.map((item) => renderNavItem(item, "config"))}
        </div>

        {/* Group 4: Workspaces */}
        <div className="relative border-t border-gray-200 mt-3 pt-3">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Пространства</span>
            <button
              className="text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
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
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                activeNav === ws.id
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${ws.color}`} />
              <span className="flex-1 text-left truncate">{ws.name}</span>
              <span className="text-xs text-gray-400">{ws.count}</span>
            </button>
          ))}
          <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <span>+</span>
            <span>Добавить</span>
          </button>
        </div>

        {/* Group 5: Teams */}
        <div className="relative border-t border-gray-200 mt-3 pt-3">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Команды</span>
            <button
              className="text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
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
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                activeNav === team.id
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="flex-1 text-left truncate">{team.name}</span>
              <span className="text-xs text-gray-400">{team.members.length}</span>
            </button>
          ))}
        </div>

        {/* Group 6: Settings */}
        <div className="border-t border-gray-200 mt-3 pt-3">
          <button
            onClick={() => onNav("settings")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer ${
              activeNav === "settings"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="flex-1 text-left">Настройки</span>
          </button>
        </div>
      </nav>

      {/* User profile */}
      <div className="border-t border-gray-200 px-3 py-3 flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
          В
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-900 font-medium truncate">Влад</p>
          <p className="text-xs text-gray-500 truncate">CEO</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
