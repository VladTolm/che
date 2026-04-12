import { Plus, Play, X } from "lucide-react";
import type { AgentEditorTool } from "../../../agentEditorTypes";
import EditorSection from "./EditorSection";

interface Props {
  tools: AgentEditorTool[];
  onAdd: () => void;
  onRemove: (id: string) => void;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Активен", className: "bg-green-50 text-green-600" },
  "requires-auth": { label: "Требует настройки", className: "bg-amber-50 text-amber-600" },
  error: { label: "Ошибка", className: "bg-red-50 text-red-600" },
};

export default function ToolsSection({ tools, onAdd, onRemove }: Props) {
  return (
    <EditorSection
      title="Инструменты"
      isEmpty={tools.length === 0}
      placeholder="Добавьте инструменты — внешние системы, которые агент может вызывать"
      actions={
        <>
          <button
            onClick={onAdd}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
          >
            <Plus className="w-3 h-3" />
            Добавить
          </button>
          <button
            className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
          >
            MCP
          </button>
        </>
      }
    >
      <div className="space-y-1.5">
        {tools.map((tool) => {
          const status = statusConfig[tool.status] ?? statusConfig.active;
          return (
            <div key={tool.id} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg group">
              <span className="text-base">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <span className="text-sm text-gray-800">{tool.name}</span>
                <span className="text-[11px] text-gray-400 ml-2">{tool.source}</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${status.className}`}>
                {status.label}
              </span>
              <button className="text-gray-300 hover:text-gray-500 cursor-pointer">
                <Play className="w-3 h-3" />
              </button>
              <button
                onClick={() => onRemove(tool.id)}
                className="text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </EditorSection>
  );
}
