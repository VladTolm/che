export type ChatDemoState =
  | "morning_brief"
  | "flight_plan"
  | "flight_running"
  | "flight_done"
  | "workspace_view"
  | "expense_plan"
  | "expense_running"
  | "expense_done"
  | "blocked"
  | "auto_create"
  | "auto_done";

export type PersonalTab = "chat" | "overview" | "workspaces";

export interface Thread {
  id: string;
  label: string;
  icon: string;
  time: string;
  unread: number;
}

export interface ContextConfig {
  type: "workspace" | "execution" | "agent-settings" | "task-detail" | "team";
  title: string;
  data?: any;
}

export interface CalendarEvent {
  time: string;
  title: string;
  duration: string;
  urgent: boolean;
  agentPrep: string | null;
}

export interface MailItem {
  from: string;
  subject: string;
  urgent: boolean;
  hasDraft: boolean;
}

export interface TodoItem {
  id: number;
  title: string;
  priority: "P0" | "P1" | "P2" | "P3";
  deadline?: string;
}

export interface Automation {
  id: number;
  icon: string;
  name: string;
  schedule: string;
  status: "success" | "monitoring";
}

export interface ExecutionStep {
  title: string;
  status: "completed" | "running" | "pending";
  detail?: string;
}

export interface ExecutionData {
  title: string;
  steps: ExecutionStep[];
  elapsed: string;
  resultSummary?: string | null;
  table?: {
    cols: string[];
    rows: string[][];
  };
}

export interface PersonalWorkspace {
  id: string;
  name: string;
  color: string;
  desc: string;
  count: number;
  agents: number;
  done: string;
  tasks: { name: string; status: "active" | "waiting" | "completed"; progress: number }[];
}

export interface PersonalAgent {
  id: string;
  name: string;
  status: string;
  task: string;
  icon: string;
  skills: string[];
}

export const PRIORITY_COLORS: Record<string, string> = {
  P0: "bg-gray-900",
  P1: "bg-gray-700",
  P2: "bg-gray-400",
  P3: "bg-gray-300",
};

/** All demo states that include a given scenario (for cumulative message rendering) */
export const DEMO_ORDER: ChatDemoState[] = [
  "morning_brief",
  "flight_plan",
  "flight_running",
  "flight_done",
  "workspace_view",
  "expense_plan",
  "expense_running",
  "expense_done",
  "blocked",
  "auto_create",
  "auto_done",
];
