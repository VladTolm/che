import { Plus, ScrollText, Layers } from "lucide-react";
import type { Workspace, WorkspaceSubSection } from "../../workspaceTypes";

interface Props {
  workspace: Workspace;
  activeSection: WorkspaceSubSection;
  waitingCount: number;
  onChangeSection: (sub: WorkspaceSubSection) => void;
}

const tabs: { sub: WorkspaceSubSection; icon: typeof Plus; label: string }[] = [
  { sub: "new-task", icon: Plus, label: "Новая задача" },
  { sub: "history", icon: ScrollText, label: "История" },
  { sub: "space-settings", icon: Layers, label: "Пространство" },
];

export default function WorkspaceTabBar({ workspace, activeSection, waitingCount, onChangeSection }: Props) {
  return (
    <div className="h-12 bg-white border-b border-gray-200 px-4 flex items-center shrink-0">
      {/* Workspace name */}
      <span className="text-base mr-2">{workspace.icon}</span>
      <span className="text-sm font-semibold text-gray-800 mr-6">{workspace.name}</span>

      {/* Tabs */}
      <div className="flex items-center gap-1 h-full">
        {tabs.map((tab) => {
          const isActive = activeSection === tab.sub;
          const Icon = tab.icon;
          return (
            <button
              key={tab.sub}
              onClick={() => onChangeSection(tab.sub)}
              className={`flex items-center gap-1.5 px-3 h-full text-xs transition-colors cursor-pointer border-b-2 ${
                isActive
                  ? "border-gray-900 text-gray-900 font-medium"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.sub === "history" && waitingCount > 0 && (
                <span className="flex items-center gap-1 text-[10px] font-medium text-amber-600 ml-0.5">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  {waitingCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
