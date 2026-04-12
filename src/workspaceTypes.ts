// --- Workspace navigation ---

export interface Workspace {
  id: string;
  name: string;
  icon: string;
  taskCount: number;
}

export type WorkspaceSubSection = "new-task" | "history" | "space-settings";

// --- Left panel: Source documents ---

export interface SourceDocument {
  id: string;
  name: string;
  fileType: "pdf" | "docx" | "txt" | "md" | "csv";
  isArtifact: boolean;
  selected: boolean;
}

// --- Left panel: Company knowledge tree ---

export interface KnowledgeFile {
  id: string;
  name: string;
  selected: boolean;
  type: "file";
}

export interface KnowledgeFolder {
  id: string;
  name: string;
  children: (KnowledgeFolder | KnowledgeFile)[];
  expanded: boolean;
  selected: boolean;
  type: "folder";
}

export interface KnowledgeTopic {
  id: string;
  name: string;
  folders: (KnowledgeFolder | KnowledgeFile)[];
  expanded: boolean;
  selected: boolean;
}

// --- Chat ---

export type WorkspaceChatMode = "qa" | "agent";

export interface WorkspaceChatMessage {
  id: string;
  role: "user" | "model" | "system";
  text: string;
  timestamp: string;
  artifactId?: string;
}

// --- Right panel: Agents & Skills ---

export interface WorkspaceAgent {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: "available" | "active";
  contextDocs: string[];
}

export interface WorkspaceSkill {
  id: string;
  name: string;
  command: string;
  description: string;
  level: "company" | "space";
}

// --- Right panel: Execution ---

export type WsExecutionStepStatus = "completed" | "running" | "pending" | "error";

export interface WsExecutionStep {
  id: number;
  title: string;
  status: WsExecutionStepStatus;
  detail?: string;
}

export type WsExecutionState =
  | "idle"
  | "planning"
  | "plan-verification"
  | "executing"
  | "result-verification"
  | "stopped";

export interface WsIntegration {
  id: string;
  name: string;
  icon: string;
  type: string;
}

export interface WsExecution {
  state: WsExecutionState;
  steps: WsExecutionStep[];
  elapsed: string;
  integrations: WsIntegration[];
  usedSkillIds: string[];
}

// --- Right panel: Artifact ---

export interface WsArtifact {
  id: string;
  name: string;
  content: string;
  generatedAt: string;
}

// --- Right panel tab ---

export type WsRightTab = "execution";

// --- Session waiting state ---

export interface WsWaitingReason {
  type: "generic" | "missing-credentials";
  text: string;
  toolName?: string;
}

// --- Incoming trigger sessions ---

export interface WsIncomingSession {
  id: string;
  agentName: string;
  agentIcon: string;
  reason: string;
  timestamp: string;
}

// --- Knowledge bases ---

export interface KnowledgeBase {
  id: string;
  name: string;
  icon: string;
  hasWriteAccess: boolean;
}

// --- History: Sessions ---

export type SessionStatus = "active" | "waiting" | "completed" | "archived";

export interface SessionDocument {
  id: string;
  name: string;
  fileType: "pdf" | "docx" | "txt" | "md" | "csv";
  direction: "in" | "out";
}

export interface SessionReassignment {
  id: string;
  fromUser: string;
  toUser: string;
  timestamp: string;
}

export interface HistorySession {
  id: string;
  name: string;
  preview: string;
  status: SessionStatus;
  agentId: string;
  agentName: string;
  agentIcon: string;
  owner: string | null;
  initiator: string;
  triggerData?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  documents: SessionDocument[];
  reassignments: SessionReassignment[];
  chatPreview: WorkspaceChatMessage[];
}

// --- History: Filters ---

export interface HistoryFilters {
  search: string;
  statuses: SessionStatus[];
  agentId: string | null;
  participantId: string | null;
  dateFrom: string | null;
  dateTo: string | null;
}

// --- Space settings ---

export type SpaceAccessType = "personal" | "shared-context" | "shared-sessions";

export type SpaceMemberRole = "owner" | "admin" | "member";

export interface SpaceMember {
  id: string;
  name: string;
  avatarInitial: string;
  avatarColor: string;
  role: SpaceMemberRole;
}

export interface SpaceDocument {
  id: string;
  name: string;
  fileType: "pdf" | "docx" | "txt" | "md" | "csv";
  uploadedAt: string;
}
