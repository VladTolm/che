import type { AgentEditorConfig, EditorPopupMode } from "../../agentEditorTypes";
import InstructionsSection from "./sections/InstructionsSection";
import SkillsSection from "./sections/SkillsSection";
import KnowledgeSection from "./sections/KnowledgeSection";
import ToolsSection from "./sections/ToolsSection";
import TriggersSection from "./sections/TriggersSection";

interface Props {
  config: AgentEditorConfig;
  onOpenPopup: (mode: EditorPopupMode) => void;
  onRemoveTool: (id: string) => void;
  onRemoveSkill: (id: string) => void;
  onRemoveKnowledge: (id: string) => void;
  onRemoveTrigger: (id: string) => void;
}

export default function AgentConfigPanel({
  config,
  onOpenPopup,
  onRemoveTool,
  onRemoveSkill,
  onRemoveKnowledge,
  onRemoveTrigger,
}: Props) {
  return (
    <div className="flex-[6] overflow-y-auto px-8 py-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <InstructionsSection
          instructionsBody={config.instructions.body}
          onEdit={() =>
            onOpenPopup({
              type: "text-editor",
              target: "instructions",
              initialValue: config.instructions.body,
            })
          }
        />

        <SkillsSection
          skills={config.skills}
          onAdd={() => onOpenPopup({ type: "catalog", target: "skills-add" })}
          onCreate={() =>
            onOpenPopup({ type: "text-editor", target: "skill-create", initialValue: "" })
          }
          onRemove={onRemoveSkill}
        />

        <KnowledgeSection
          knowledgeBases={config.knowledgeBases}
          onConnect={() => onOpenPopup({ type: "catalog", target: "knowledge" })}
          onRemove={onRemoveKnowledge}
        />

        <ToolsSection
          tools={config.tools}
          onAdd={() => onOpenPopup({ type: "catalog", target: "toolbox" })}
          onRemove={onRemoveTool}
        />

        <TriggersSection
          triggers={config.triggers}
          onAdd={() => onOpenPopup({ type: "catalog", target: "triggers" })}
          onRemove={onRemoveTrigger}
        />
      </div>
    </div>
  );
}
