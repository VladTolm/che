import { useState } from "react";
import type { AgentEditorConfig, EditorPopupMode } from "../../agentEditorTypes";
import type { WorkspaceChatMessage } from "../../workspaceTypes";
import AgentEditorTopBar from "./AgentEditorTopBar";
import AgentConfigPanel from "./AgentConfigPanel";
import AgentTestChat from "./AgentTestChat";
import EditorPopup from "./canvas/popups/EditorPopup";

interface Props {
  config: AgentEditorConfig;
  onBack: () => void;
}

export default function AgentEditorView({ config: initialConfig, onBack }: Props) {
  const [config, setConfig] = useState<AgentEditorConfig>(initialConfig);
  const [popupMode, setPopupMode] = useState<EditorPopupMode>({ type: "closed" });
  const [showChat, setShowChat] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(4);

  // Chat state
  const [chatMessages, setChatMessages] = useState<WorkspaceChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");

  function handleChatSend() {
    if (!chatInput.trim()) return;
    const newMsg: WorkspaceChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput("");
  }

  function handleSave() {
    setCurrentVersion((v) => v + 1);
    setHasUnsavedChanges(false);
  }

  function handleSaveInstructions(body: string) {
    setConfig((prev) => ({ ...prev, instructions: { ...prev.instructions, body } }));
    setHasUnsavedChanges(true);
    setPopupMode({ type: "closed" });
  }

  function handleAddTool(item: { id: string; name: string; icon: string }) {
    setConfig((prev) => ({
      ...prev,
      tools: [...prev.tools, { id: item.id, name: item.name, icon: item.icon, source: "Catalog", status: "active", category: "" }],
    }));
    setHasUnsavedChanges(true);
    setPopupMode({ type: "closed" });
  }

  function handleRemoveTool(id: string) {
    setConfig((prev) => ({ ...prev, tools: prev.tools.filter((t) => t.id !== id) }));
    setHasUnsavedChanges(true);
  }

  function handleAddSubAgent(item: { id: string; name: string; icon: string }) {
    setConfig((prev) => ({
      ...prev,
      subAgents: [...prev.subAgents, { id: item.id, name: item.name, icon: item.icon, status: "available" }],
    }));
    setHasUnsavedChanges(true);
    setPopupMode({ type: "closed" });
  }

  function handleAddSkillFromCatalog(item: { id: string; name: string; category: string }) {
    setConfig((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: item.id, name: item.name, description: "", level: (item.category === "company" ? "company" : "space") as "company" | "space" }],
    }));
    setHasUnsavedChanges(true);
    setPopupMode({ type: "closed" });
  }

  function handleCreateSkill(name: string, body: string) {
    setConfig((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: `skill-${Date.now()}`, name, description: body, level: "space" as const }],
    }));
    setHasUnsavedChanges(true);
    setPopupMode({ type: "closed" });
  }

  function handleRemoveSkill(id: string) {
    setConfig((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
    setHasUnsavedChanges(true);
  }

  function handleAddTrigger(item: { id: string; name: string; icon: string; category: string }) {
    const typeMap: Record<string, string> = { cron: "cron", interval: "interval", "one-time": "one-time", webhook: "webhook", email: "email", "очередь": "queue" };
    const triggerType = (typeMap[item.name.toLowerCase()] ?? "webhook") as "cron" | "interval" | "one-time" | "webhook" | "email" | "queue";
    setConfig((prev) => ({
      ...prev,
      triggers: [...prev.triggers, {
        id: `trg-${Date.now()}`,
        type: triggerType,
        category: item.category as "schedule" | "event",
        label: item.name,
        value: "",
        icon: item.icon,
      }],
    }));
    setHasUnsavedChanges(true);
    setPopupMode({ type: "closed" });
  }

  function handleRemoveTrigger(id: string) {
    setConfig((prev) => ({ ...prev, triggers: prev.triggers.filter((t) => t.id !== id) }));
    setHasUnsavedChanges(true);
  }

  function handleAddKnowledge(item: { id: string; name: string; icon: string }) {
    setConfig((prev) => ({
      ...prev,
      knowledgeBases: [...prev.knowledgeBases, { id: item.id, name: item.name, icon: item.icon }],
    }));
    setHasUnsavedChanges(true);
    setPopupMode({ type: "closed" });
  }

  function handleRemoveKnowledge(id: string) {
    setConfig((prev) => ({ ...prev, knowledgeBases: prev.knowledgeBases.filter((kb) => kb.id !== id) }));
    setHasUnsavedChanges(true);
  }

  function handleCatalogSelect(item: { id: string; name: string; icon: string; category: string }) {
    if (popupMode.type !== "catalog") return;
    switch (popupMode.target) {
      case "toolbox": handleAddTool(item); break;
      case "sub-agents": handleAddSubAgent(item); break;
      case "triggers": handleAddTrigger(item); break;
      case "skills-add": handleAddSkillFromCatalog(item); break;
      case "knowledge": handleAddKnowledge(item); break;
    }
  }

  function handleTextSave(value: string, skillName?: string) {
    if (popupMode.type !== "text-editor") return;
    if (popupMode.target === "instructions") {
      handleSaveInstructions(value);
    } else if (popupMode.target === "skill-create" && skillName) {
      handleCreateSkill(skillName, value);
    }
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      <AgentEditorTopBar
        config={config}
        currentVersion={currentVersion}
        hasUnsavedChanges={hasUnsavedChanges}
        showChat={showChat}
        onBack={onBack}
        onSave={handleSave}
        onToggleChat={() => setShowChat((v) => !v)}
      />

      <div className="flex-1 flex overflow-hidden min-w-0 min-h-0">
        {/* Left column: config sections */}
        <AgentConfigPanel
          config={config}
          onOpenPopup={setPopupMode}
          onRemoveTool={handleRemoveTool}
          onRemoveSkill={handleRemoveSkill}
          onRemoveKnowledge={handleRemoveKnowledge}
          onRemoveTrigger={handleRemoveTrigger}
        />

        {/* Right column: chat preview */}
        {showChat && (
          <div className="flex-[4] border-l border-gray-100 flex flex-col min-w-0 min-h-0">
            <div className="h-10 border-b border-gray-50 flex items-center px-4 shrink-0">
              <span className="text-xs text-gray-400">Тест · v{currentVersion}</span>
            </div>
            <AgentTestChat
              config={config}
              messages={chatMessages}
              input={chatInput}
              onInputChange={setChatInput}
              onSend={handleChatSend}
            />
          </div>
        )}
      </div>

      {popupMode.type !== "closed" && (
        <EditorPopup
          mode={popupMode}
          onClose={() => setPopupMode({ type: "closed" })}
          onCatalogSelect={handleCatalogSelect}
          onTextSave={handleTextSave}
        />
      )}
    </div>
  );
}
