import type { EditorPopupMode, CatalogItem } from "../../../../agentEditorTypes";
import {
  toolCategories, toolCatalog,
  subAgentCategories, subAgentCatalog,
  skillCategories, skillCatalog,
  knowledgeCategories, knowledgeCatalog,
  triggerCategories, triggerCatalog,
} from "../../../../data/agentEditorMock";
import TextEditorPopup from "./TextEditorPopup";
import CatalogPopup from "./CatalogPopup";

interface Props {
  mode: EditorPopupMode;
  onClose: () => void;
  onCatalogSelect: (item: CatalogItem) => void;
  onTextSave: (value: string, skillName?: string) => void;
}

const catalogConfig: Record<string, { title: string; categories: { id: string; label: string }[]; items: CatalogItem[] }> = {
  toolbox: { title: "Добавить инструмент", categories: toolCategories, items: toolCatalog },
  "sub-agents": { title: "Добавить под-агента", categories: subAgentCategories, items: subAgentCatalog },
  "skills-add": { title: "Добавить навык", categories: skillCategories, items: skillCatalog },
  knowledge: { title: "Подключить базу знаний", categories: knowledgeCategories, items: knowledgeCatalog },
  triggers: { title: "Добавить триггер", categories: triggerCategories, items: triggerCatalog },
};

export default function EditorPopup({ mode, onClose, onCatalogSelect, onTextSave }: Props) {
  if (mode.type === "text-editor") {
    const isSkill = mode.target === "skill-create";
    return (
      <TextEditorPopup
        title={isSkill ? "Создать навык" : "Инструкции"}
        initialValue={mode.initialValue}
        showNameField={isSkill}
        initialName={mode.skillName}
        onSave={onTextSave}
        onClose={onClose}
        subtitle={isSkill ? "Навык будет сохранён в навыки пространства и станет доступен другим агентам и пользователям" : undefined}
      />
    );
  }

  if (mode.type === "catalog") {
    const cfg = catalogConfig[mode.target];
    if (!cfg) return null;
    return (
      <CatalogPopup
        title={cfg.title}
        categories={cfg.categories}
        items={cfg.items}
        onSelect={onCatalogSelect}
        onClose={onClose}
      />
    );
  }

  return null;
}
