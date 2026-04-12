import { Plus, Trash2, AlertTriangle } from "lucide-react";
import type { AgentEditorTrigger } from "../../../agentEditorTypes";
import BlockCard from "./BlockCard";

interface Props {
  triggers: AgentEditorTrigger[];
  identitySet: boolean;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export default function TriggersBlock({ triggers, identitySet, onAdd, onRemove }: Props) {
  const hasEventTriggers = triggers.some((t) => t.category === "event");

  return (
    <BlockCard
      title="TRIGGERS"
      dotSide="right"
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
      {!identitySet && hasEventTriggers && (
        <div className="flex items-center gap-1.5 text-[10px] text-amber-600 mb-2">
          <AlertTriangle className="w-3 h-3" />
          <span className="font-medium">Set identity</span>
        </div>
      )}

      {triggers.length === 0 ? (
        <p className="text-xs text-gray-400">Нет настроенных триггеров</p>
      ) : (
        <div className="space-y-1.5">
          {triggers.map((trigger) => (
            <div key={trigger.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{trigger.icon}</span>
                <div className="min-w-0">
                  <span className="text-gray-700">{trigger.label}</span>
                  <span className={`ml-1.5 text-[8px] font-medium px-1 py-0.5 rounded ${
                    trigger.category === "schedule"
                      ? "text-amber-600 bg-amber-50"
                      : "text-indigo-600 bg-indigo-50"
                  }`}>
                    {trigger.category === "schedule" ? "расписание" : "событие"}
                  </span>
                </div>
              </div>
              <button onClick={() => onRemove(trigger.id)} className="text-gray-300 hover:text-red-400 cursor-pointer">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </BlockCard>
  );
}
