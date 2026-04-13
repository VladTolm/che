import type { Workspace } from "../../workspaceTypes";
import {
  Building2,
  PlusCircle,
  Clock,
  Newspaper,
  CalendarDays,
  Video,
  Settings,
  Menu,
} from "lucide-react";

interface Props {
  activeNav: string;
  workspaces: Workspace[];
  collapsed: boolean;
  waitingCounts: Record<string, number>;
  onToggleCollapse: () => void;
  onNav: (id: string) => void;
  onSelectWorkspace: (ws: Workspace) => void;
}

/* Company sub-items */
const companyItems = [
  { id: "new-task", icon: PlusCircle, label: "Новая задача" },
  { id: "history", icon: Clock, label: "История" },
];

/* Agent items */
const agentItems = [
  { id: "digest", icon: Newspaper, label: "Дайджест" },
  { id: "calendar", icon: CalendarDays, label: "Календарь" },
  { id: "meetings", icon: Video, label: "Встречи" },
];

export default function Sidebar({ activeNav, workspaces, collapsed, waitingCounts, onToggleCollapse, onNav, onSelectWorkspace }: Props) {

  function renderNavItem(item: { id: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
    const isActive = activeNav === item.id;
    const Icon = item.icon;

    const cls = isActive
      ? "bg-gray-100 text-gray-900 font-medium"
      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50";

    return (
      <button
        key={item.id}
        onClick={() => onNav(item.id)}
        title={collapsed ? item.label : undefined}
        className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer ${cls}`}
      >
        <Icon className="w-5 h-5 shrink-0" />
        {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
      </button>
    );
  }

  return (
    <aside className={`${collapsed ? "w-14" : "w-64"} bg-white border-r border-gray-200 flex flex-col shrink-0 h-full transition-all duration-200`}>
      {/* Logo / Toggle */}
      <div className={`${collapsed ? "px-2" : "px-4"} py-4 border-b border-gray-200 flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
        {collapsed ? (
          <button onClick={onToggleCollapse} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors" title="Развернуть меню">
            <Menu className="w-5 h-5" />
          </button>
        ) : (
          <>
            <span className="text-gray-900 font-extrabold text-sm uppercase tracking-tight">
              ГИГАЧАТ БИЗНЕС
            </span>
            <button onClick={onToggleCollapse} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors" title="Свернуть меню">
              <Menu className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto ${collapsed ? "px-1.5" : "px-3"} py-3`}>
        {/* Компания */}
        {!collapsed && (
          <div className="flex items-center px-3 mb-2">
            <Building2 className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Компания</span>
          </div>
        )}
        <div className="space-y-0.5">
          {companyItems.map((item) => renderNavItem(item))}
        </div>

        {/* Агенты */}
        <div className="border-t border-gray-200 mt-3 pt-3">
          {!collapsed && (
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Агенты</span>
            </div>
          )}
          <div className="space-y-0.5">
            {agentItems.map((item) => renderNavItem(item))}
          </div>
        </div>

        {/* Пространства */}
        <div className="border-t border-gray-200 mt-3 pt-3">
          {!collapsed && (
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Пространства</span>
            </div>
          )}
          {workspaces.map((ws) => {
            const isActive = activeNav.startsWith(`ws-${ws.id}`);
            const waitingCount = waitingCounts[ws.id] ?? 0;

            return (
              <button
                key={ws.id}
                onClick={() => onSelectWorkspace(ws)}
                title={collapsed ? ws.name : undefined}
                className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-2.5"} px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                  isActive
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span className="text-sm shrink-0">{ws.icon}</span>
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left truncate">{ws.name}</span>
                    {waitingCount > 0 && (
                      <span className="flex items-center gap-1 text-[10px] font-medium text-amber-600">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        {waitingCount}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Settings */}
        <div className="border-t border-gray-200 mt-3 pt-3">
          <button
            onClick={() => onNav("settings")}
            title={collapsed ? "Настройки" : undefined}
            className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer ${
              activeNav === "settings"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Settings className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="flex-1 text-left">Настройки</span>}
          </button>
        </div>
      </nav>

      {/* User profile */}
      <div className={`border-t border-gray-200 ${collapsed ? "px-2" : "px-3"} py-3 flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
          В
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-900 font-medium truncate">Влад</p>
              <p className="text-xs text-gray-500 truncate">CEO</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <Settings className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
