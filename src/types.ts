export interface Agent {
  id: string;
  name: string;
  status: "active" | "waiting" | "completed" | "idle";
  task: string;
  step: string;
  progress: number;
  desc: string;
  icon: string;
  skills: string[];
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  sharedAgents: string[];
  activity: ActivityEntry[];
}

export interface TeamMember {
  name: string;
  role: string;
  email: string;
  avatar: string;
  color: string;
  canLaunch: boolean;
  canApprove: boolean;
  canAdmin: boolean;
}

export interface Task {
  id: string;
  name: string;
  status: "created" | "active" | "waiting" | "completed";
  agents: number;
  progress: number;
  steps: TaskStep[];
  initiator: string;
  deadline: string;
}

export interface TaskStep {
  id: number;
  title: string;
  status: "completed" | "active" | "pending";
}

export interface ActivityEntry {
  id: string;
  type: "doc" | "approval" | "table" | "complete" | "data" | "error";
  agent: string;
  action: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  type: "approval_needed" | "task_completed" | "error" | "mention";
  title: string;
  body: string;
  read: boolean;
  timestamp: string;
  taskId?: string;
}

export interface ChatMessage {
  role: "user" | "system" | "agent" | "tool";
  text: string;
  name?: string;
  type?: "plan" | "result" | "tool" | "progress";
}

export interface ExecutionLogGroup {
  id: string;
  reasoningCount: number;
  actions: string[];
}

export interface DocTreeItem {
  name: string;
  type: "folder" | "file";
  fileType?: string;
  children?: DocTreeItem[];
}

export interface AITeam {
  name: string;
  goal: string;
  agents: string[];
  leader: string | null;
  collaboration: "sequential" | "parallel" | "debate";
  autonomy: "auto" | "confirm" | "manual";
}
