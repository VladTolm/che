import type { AgentEditorConfig, EditorPopupMode } from "../../../agentEditorTypes";
import ConnectionLines from "./ConnectionLines";
import AgentInstructionsBlock from "./AgentInstructionsBlock";
import TriggersBlock from "./TriggersBlock";
import ToolboxBlock from "./ToolboxBlock";
import KnowledgeBlock from "./KnowledgeBlock";
import SubAgentsBlock from "./SubAgentsBlock";
import SkillsBlock from "./SkillsBlock";

interface Props {
  config: AgentEditorConfig;
  onOpenPopup: (mode: EditorPopupMode) => void;
  onRemoveTool: (id: string) => void;
  onRemoveSubAgent: (id: string) => void;
  onRemoveSkill: (id: string) => void;
  onRemoveKnowledge: (id: string) => void;
  onRemoveTrigger: (id: string) => void;
}

export default function AgentCanvas({ config, onOpenPopup, onRemoveTool, onRemoveSubAgent, onRemoveSkill, onRemoveKnowledge, onRemoveTrigger }: Props) {
  return (
    <div className="flex-1 overflow-auto bg-gray-50 relative" style={{ minHeight: 700 }}>
      <ConnectionLines />

      {/* Triggers — left (merged Schedule + Channels) */}
      <div className="absolute" style={{ top: 50, left: 40 }}>
        <TriggersBlock
          triggers={config.triggers}
          identitySet={config.identitySet}
          onAdd={() => onOpenPopup({ type: "catalog", target: "triggers" })}
          onRemove={onRemoveTrigger}
        />
      </div>

      {/* Agent + Instructions — center (single card) */}
      <div className="absolute" style={{ top: 50, left: 400 }}>
        <AgentInstructionsBlock
          name={config.name}
          description={config.description}
          instructionsTitle={config.instructions.title}
          instructionsBody={config.instructions.body}
          onEditInstructions={() =>
            onOpenPopup({
              type: "text-editor",
              target: "instructions",
              initialValue: config.instructions.body,
            })
          }
        />
      </div>

      {/* Toolbox — top-right */}
      <div className="absolute" style={{ top: 50, left: 760 }}>
        <ToolboxBlock
          tools={config.tools}
          onAdd={() => onOpenPopup({ type: "catalog", target: "toolbox" })}
          onRemove={onRemoveTool}
        />
      </div>

      {/* Knowledge — right, below Toolbox */}
      <div className="absolute" style={{ top: 200, left: 760 }}>
        <KnowledgeBlock
          knowledgeBases={config.knowledgeBases}
          onConnect={() => onOpenPopup({ type: "catalog", target: "knowledge" })}
          onRemove={onRemoveKnowledge}
        />
      </div>

      {/* Sub-agents — mid-right */}
      <div className="absolute" style={{ top: 350, left: 760 }}>
        <SubAgentsBlock
          subAgents={config.subAgents}
          onAdd={() => onOpenPopup({ type: "catalog", target: "sub-agents" })}
          onRemove={onRemoveSubAgent}
        />
      </div>

      {/* Skills — bottom-right */}
      <div className="absolute" style={{ top: 500, left: 760 }}>
        <SkillsBlock
          skills={config.skills}
          onAdd={() => onOpenPopup({ type: "catalog", target: "skills-add" })}
          onCreate={() => onOpenPopup({ type: "text-editor", target: "skill-create" })}
          onRemove={onRemoveSkill}
        />
      </div>
    </div>
  );
}
