import { Plus, Trash2 } from "lucide-react";
import type { AgentEditorKnowledgeBase } from "../../../agentEditorTypes";
import BlockCard from "./BlockCard";

interface Props {
  knowledgeBases: AgentEditorKnowledgeBase[];
  onConnect: () => void;
  onRemove: (id: string) => void;
}

export default function KnowledgeBlock({ knowledgeBases, onConnect, onRemove }: Props) {
  return (
    <BlockCard
      title="KNOWLEDGE"
      dotSide="left"
      actions={
        <button
          onClick={onConnect}
          className="flex items-center gap-1 text-[10px] font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          Connect
        </button>
      }
    >
      {knowledgeBases.length === 0 ? (
        <p className="text-xs text-gray-400">Нет подключённых баз знаний</p>
      ) : (
        <div className="space-y-1.5">
          {knowledgeBases.map((kb) => (
            <div key={kb.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span>{kb.icon}</span>
                <span className="text-gray-700">{kb.name}</span>
              </div>
              <button onClick={() => onRemove(kb.id)} className="text-gray-300 hover:text-red-400 cursor-pointer">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </BlockCard>
  );
}
