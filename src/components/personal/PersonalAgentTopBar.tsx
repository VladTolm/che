import { MessageSquare, BarChart3, Package, ClipboardList, X, Bot } from "lucide-react";
import type { PersonalTab } from "../../personalTypes";

interface Props {
  activeTab: PersonalTab;
  onTabChange: (tab: PersonalTab) => void;
  contextOpen: boolean;
  onToggleContext: () => void;
}

const tabs: { id: PersonalTab; icon: React.ReactNode; label: string }[] = [
  { id: "chat", icon: <MessageSquare className="w-3.5 h-3.5" />, label: "Чат" },
  { id: "overview", icon: <BarChart3 className="w-3.5 h-3.5" />, label: "Обзор" },
  { id: "workspaces", icon: <Package className="w-3.5 h-3.5" />, label: "Пространства" },
];

export default function PersonalAgentTopBar({ activeTab, onTabChange, contextOpen, onToggleContext }: Props) {
  return (
    <div className="h-12 bg-white border-b border-gray-100 px-6 flex items-center justify-between shrink-0">
      {/* Left: agent info */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs">
          <Bot className="w-4 h-4" />
        </div>
        <span className="text-sm font-semibold text-gray-800">Персональный агент</span>
        <span className="text-xs text-green-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Онлайн
        </span>
      </div>

      {/* Center: tabs */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === t.id
                ? "bg-white text-gray-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Right: context toggle */}
      <button
        onClick={onToggleContext}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer flex items-center gap-1.5 ${
          contextOpen
            ? "bg-gray-100 text-gray-800"
            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
        }`}
      >
        {contextOpen ? (
          <><X className="w-3.5 h-3.5" /> Панель</>
        ) : (
          <><ClipboardList className="w-3.5 h-3.5" /> Контекст</>
        )}
      </button>
    </div>
  );
}
