// --- Agent Editor: Tool ---

export interface AgentEditorTool {
  id: string;
  name: string;
  icon: string;
  source: string;
  status: "active" | "requires-auth" | "error";
  category: string;
}

// --- Agent Editor: Channel ---

export interface AgentEditorChannel {
  id: string;
  name: string;
  icon: string;
  type: "messaging" | "web" | "email";
  status: "connected" | "disconnected";
}

// --- Agent Editor: Schedule ---

export interface AgentEditorSchedule {
  id: string;
  type: "cron" | "interval" | "one-time";
  label: string;
  value: string;
}

// --- Agent Editor: Sub-agent ---

export interface AgentEditorSubAgent {
  id: string;
  name: string;
  icon: string;
  status: "available" | "active";
}

// --- Agent Editor: Skill ---

export interface AgentEditorSkill {
  id: string;
  name: string;
  description: string;
  level: "company" | "space";
}

// --- Agent Editor: Knowledge Base ---

export interface AgentEditorKnowledgeBase {
  id: string;
  name: string;
  icon: string;
}

// --- Agent Editor: Trigger (merged Schedule + Channel) ---

export interface AgentEditorTrigger {
  id: string;
  type: "cron" | "interval" | "one-time" | "webhook" | "email" | "queue";
  category: "schedule" | "event";
  label: string;
  value: string;
  icon: string;
}

// --- Agent Editor: Full config ---

export interface AgentEditorConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  workspaceId: string;
  workspaceName: string;
  workspaceIcon: string;
  instructions: {
    title: string;
    body: string;
  };
  schedules: AgentEditorSchedule[];
  channels: AgentEditorChannel[];
  identitySet: boolean;
  tools: AgentEditorTool[];
  subAgents: AgentEditorSubAgent[];
  skills: AgentEditorSkill[];
  knowledgeBases: AgentEditorKnowledgeBase[];
  triggers: AgentEditorTrigger[];
}

// --- Popup modes ---

export type EditorPopupMode =
  | { type: "closed" }
  | { type: "text-editor"; target: "instructions" | "skill-create"; initialValue?: string; skillName?: string }
  | { type: "catalog"; target: "toolbox" | "sub-agents" | "skills-add" | "knowledge" | "triggers" };

// --- Template ---

export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  toolIcons: string[];
  config: AgentEditorConfig;
}

// --- Version ---

export interface AgentVersion {
  version: number;
  timestamp: string;
  label?: string;
}

// --- Catalog ---

export interface CatalogCategory {
  id: string;
  label: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
}
