import { Pencil } from "lucide-react";
import type { AgentEditorConfig } from "../../agentEditorTypes";
import { agentEditorConfigs } from "../../data/agentEditorMock";

interface Props {
  onEditAgent: (config: AgentEditorConfig) => void;
}

export default function AgentListView({ onEditAgent }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-lg font-bold text-gray-900 mb-1">Агенты</h1>
        <p className="text-sm text-gray-500 mb-6">Управление и настройка ИИ-агентов</p>

        <div className="grid grid-cols-3 gap-4">
          {agentEditorConfigs.map((config) => (
            <div
              key={config.id}
              className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-3">{config.icon}</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{config.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">{config.description}</p>
              <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                {config.workspaceIcon} {config.workspaceName}
              </span>

              <button
                onClick={() => onEditAgent(config)}
                className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                Редактировать
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
