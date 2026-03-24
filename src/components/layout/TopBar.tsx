import { useState, useRef, useEffect } from "react";
import type { Notification, Workspace, Team } from "../../types";
import { relativeTime } from "../../utils/helpers";

interface Props {
  view: "home" | "task";
  selectedWS: Workspace | null;
  selectedTeam: Team | null;
  notifications: Notification[];
  onNavigate: (view: "home" | "task") => void;
  onNewTask: () => void;
  onNewAITeam: () => void;
  onMarkAllRead: () => void;
}

const notifIcons: Record<string, string> = {
  approval_needed: "⚠️",
  task_completed: "✅",
  error: "❌",
  mention: "💬",
};

export default function TopBar({ view, selectedWS, selectedTeam, notifications, onNavigate, onNewTask, onNewAITeam, onMarkAllRead }: Props) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const breadcrumb = selectedWS?.name || selectedTeam?.name;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifs(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="h-12 bg-white border-b border-gray-200 flex items-center px-4 shrink-0">
      {/* Left: tabs + breadcrumb */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onNavigate("home")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            view === "home" && !selectedWS && !selectedTeam
              ? "bg-gray-100 text-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Дашборд
        </button>
        <button
          onClick={() => onNavigate("task")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            view === "task" && !selectedWS && !selectedTeam
              ? "bg-gray-100 text-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Текущая задача
        </button>
        {breadcrumb && (
          <span className="text-sm text-gray-400 ml-2">
            › <span className="text-orange-500 font-medium">{breadcrumb}</span>
          </span>
        )}
      </div>

      <div className="flex-1" />

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onNewAITeam}
          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
        >
          🤖 AI-команда
        </button>
        <button
          onClick={onNewTask}
          className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm font-medium text-white transition-colors"
        >
          + Задача
        </button>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => { setSearchFocused(false); setSearchQuery(""); }}
            className={`bg-gray-50 border border-gray-200 rounded-lg text-sm px-3 py-1.5 outline-none transition-all duration-200 ${
              searchFocused ? "w-64 ring-2 ring-orange-500/30 border-orange-300" : "w-28"
            }`}
          />
          {searchFocused && searchQuery.length > 0 && (
            <div className="absolute right-0 top-full mt-1 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-50 animate-tooltip-enter">
              <p className="text-xs text-gray-400 px-2 py-1">Результаты поиска</p>
              <div className="px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer">
                <p className="text-sm font-medium text-gray-800">Анализ поставщиков</p>
                <p className="text-xs text-gray-400">Задача · Закупки Q1</p>
              </div>
              <div className="px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer">
                <p className="text-sm font-medium text-gray-800">Ресёрчер</p>
                <p className="text-xs text-gray-400">Агент · Активен</p>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-1.5 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <span className="text-lg">🔔</span>
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifs && (
            <div className="absolute right-0 top-full mt-1 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 animate-tooltip-enter">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-800">Уведомления</span>
                <button onClick={onMarkAllRead} className="text-xs text-orange-500 hover:text-orange-600">
                  Отметить все как прочитанные
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !n.read ? "bg-orange-50/30" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-sm mt-0.5">{notifIcons[n.type]}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800">{n.title}</p>
                        <p className="text-xs text-gray-500 truncate">{n.body}</p>
                        <p className="text-[10px] text-gray-400 mt-1 font-mono">{relativeTime(n.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
