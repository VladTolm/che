import { Plus, X } from "lucide-react";
import type { AgentEditorKnowledgeBase } from "../../../agentEditorTypes";
import EditorSection from "./EditorSection";

interface Props {
  knowledgeBases: AgentEditorKnowledgeBase[];
  onConnect: () => void;
  onRemove: (id: string) => void;
}

export default function KnowledgeSection({ knowledgeBases, onConnect, onRemove }: Props) {
  return (
    <EditorSection
      title="Знания компании"
      isEmpty={knowledgeBases.length === 0}
      placeholder="Подключите базы знаний — агент будет использовать их при ответах"
      actions={
        <button
          onClick={onConnect}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
        >
          <Plus className="w-3 h-3" />
          Подключить
        </button>
      }
    >
      <div className="space-y-1.5">
        {knowledgeBases.map((kb) => (
          <div key={kb.id} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg group">
            <span className="text-base">{kb.icon}</span>
            <span className="text-sm text-gray-800 flex-1">{kb.name}</span>
            <button
              onClick={() => onRemove(kb.id)}
              className="text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </EditorSection>
  );
}
