import { Plus, Trash2 } from "lucide-react";
import type { AgentEditorSubAgent } from "../../../agentEditorTypes";
import BlockCard from "./BlockCard";

interface Props {
  subAgents: AgentEditorSubAgent[];
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export default function SubAgentsBlock({ subAgents, onAdd, onRemove }: Props) {
  return (
    <BlockCard
      title="SUB-AGENTS"
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
      {subAgents.length === 0 ? (
        <p className="text-xs text-gray-400">No sub-agents configured</p>
      ) : (
        <div className="space-y-1.5">
          {subAgents.map((sa) => (
            <div key={sa.id} className="flex items-center gap-2 text-xs">
              <span>{sa.icon}</span>
              <span className="flex-1 text-gray-700">{sa.name}</span>
              <button onClick={() => onRemove(sa.id)} className="text-gray-300 hover:text-red-400 cursor-pointer">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </BlockCard>
  );
}
