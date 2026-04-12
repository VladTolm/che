import { Plus, X } from "lucide-react";
import type { AgentEditorSkill } from "../../../agentEditorTypes";
import EditorSection from "./EditorSection";

interface Props {
  skills: AgentEditorSkill[];
  onAdd: () => void;
  onCreate: () => void;
  onRemove: (id: string) => void;
}

export default function SkillsSection({ skills, onAdd, onCreate, onRemove }: Props) {
  return (
    <EditorSection
      title="Навыки"
      isEmpty={skills.length === 0}
      placeholder="Добавьте навыки — готовые сценарии поведения агента в конкретных ситуациях"
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
            onClick={onCreate}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
          >
            <Plus className="w-3 h-3" />
            Создать
          </button>
        </>
      }
    >
      <div className="space-y-1.5">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg group">
            <span className="text-sm text-gray-800 flex-1">{skill.name}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                skill.level === "company"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {skill.level === "company" ? "компания" : "пространство"}
            </span>
            <button
              onClick={() => onRemove(skill.id)}
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
