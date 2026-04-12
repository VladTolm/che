import { Plus, X } from "lucide-react";
import type { AgentEditorTrigger } from "../../../agentEditorTypes";
import EditorSection from "./EditorSection";

interface Props {
  triggers: AgentEditorTrigger[];
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export default function TriggersSection({ triggers, onAdd, onRemove }: Props) {
  return (
    <EditorSection
      title="Триггеры"
      isEmpty={triggers.length === 0}
      placeholder="Добавьте триггеры — условия автоматического запуска агента без участия пользователя"
      actions={
        <button
          onClick={onAdd}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
        >
          <Plus className="w-3 h-3" />
          Добавить
        </button>
      }
    >
      <div className="space-y-1.5">
        {triggers.map((trigger) => (
          <div key={trigger.id} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg group">
            <span className="text-base">{trigger.icon}</span>
            <span className="text-sm text-gray-800 flex-1">{trigger.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                trigger.category === "schedule"
                  ? "bg-amber-50 text-amber-600"
                  : "bg-purple-50 text-purple-600"
              }`}
            >
              {trigger.category === "schedule" ? "расписание" : "событие"}
            </span>
            <button
              onClick={() => onRemove(trigger.id)}
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
