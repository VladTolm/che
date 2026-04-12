import { Plus, Pencil, Trash2 } from "lucide-react";
import type { AgentEditorSkill } from "../../../agentEditorTypes";
import BlockCard from "./BlockCard";

interface Props {
  skills: AgentEditorSkill[];
  onAdd: () => void;
  onCreate: () => void;
  onRemove: (id: string) => void;
}

export default function SkillsBlock({ skills, onAdd, onCreate, onRemove }: Props) {
  return (
    <BlockCard
      title="SKILLS"
      dotSide="left"
      actions={
        <>
          <button
            onClick={onAdd}
            className="flex items-center gap-1 text-[10px] font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            Add
          </button>
          <button
            onClick={onCreate}
            className="flex items-center gap-1 text-[10px] font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <Pencil className="w-3 h-3" />
            Create
          </button>
        </>
      }
    >
      {skills.length === 0 ? (
        <p className="text-xs text-gray-400">No skills configured</p>
      ) : (
        <div className="space-y-1.5">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-700">{skill.name}</span>
                <span className={`text-[8px] font-medium px-1.5 py-0.5 rounded ${
                  skill.level === "company"
                    ? "text-blue-600 bg-blue-50 border border-blue-100"
                    : "text-green-600 bg-green-50 border border-green-100"
                }`}>
                  {skill.level === "company" ? "компания" : "пространство"}
                </span>
              </div>
              <button onClick={() => onRemove(skill.id)} className="text-gray-300 hover:text-red-400 cursor-pointer">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      <p className="text-[9px] text-gray-400 mt-2">Навык будет сохранён в навыки пространства</p>
    </BlockCard>
  );
}
