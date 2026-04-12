import { Plus, Play, Trash2 } from "lucide-react";
import type { AgentEditorTool } from "../../../agentEditorTypes";
import BlockCard from "./BlockCard";

interface Props {
  tools: AgentEditorTool[];
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export default function ToolboxBlock({ tools, onAdd, onRemove }: Props) {
  return (
    <BlockCard
      title="TOOLBOX"
      dotSide="left"
      actions={
        <button
          onClick={onAdd}
          className="flex items-center gap-1 text-[10px] font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          Add
        </button>
      }
    >
      {tools.length === 0 ? (
        <p className="text-xs text-gray-400">Инструменты не настроены — обратитесь к администратору</p>
      ) : (
        <div className="space-y-2">
          {tools.map((tool) => (
            <div key={tool.id} className="flex items-center gap-2">
              <span className="text-sm shrink-0">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-800 truncate">{tool.name}</p>
                <p className="text-[10px] text-gray-400">{tool.source}</p>
              </div>
              {tool.status === "requires-auth" && (
                <span className="text-[9px] font-semibold text-amber-600 border border-amber-200 bg-amber-50 px-1.5 py-0.5 rounded shrink-0 cursor-pointer hover:bg-amber-100 transition-colors">
                  Требует авторизации
                </span>
              )}
              <button className="text-gray-300 hover:text-gray-500 cursor-pointer shrink-0">
                <Play className="w-3 h-3" />
              </button>
              <button onClick={() => onRemove(tool.id)} className="text-gray-300 hover:text-red-400 cursor-pointer shrink-0">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </BlockCard>
  );
}
