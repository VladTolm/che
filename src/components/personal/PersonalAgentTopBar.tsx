import type { PersonalTab } from "../../personalTypes";

interface Props {
  activeTab: PersonalTab;
  onTabChange: (tab: PersonalTab) => void;
  contextOpen: boolean;
  onToggleContext: () => void;
}

const tabs: { id: PersonalTab; icon: string; label: string }[] = [
  { id: "chat", icon: "💬", label: "Чат" },
  { id: "overview", icon: "📊", label: "Обзор" },
  { id: "workspaces", icon: "📦", label: "Пространства" },
];

export default function PersonalAgentTopBar({ activeTab, onTabChange, contextOpen, onToggleContext }: Props) {
  return (
    <div className="h-12 bg-white border-b border-gray-100 px-6 flex items-center justify-between shrink-0">
      {/* Left: agent info */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs shadow-sm">
          🧑‍💼
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
            className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all ${
              activeTab === t.id
                ? "bg-white text-gray-800 shadow-sm"
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
        className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
          contextOpen
            ? "bg-indigo-100 text-indigo-600"
            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
        }`}
      >
        {contextOpen ? "✕ Панель" : "📋 Контекст"}
      </button>
    </div>
  );
}
