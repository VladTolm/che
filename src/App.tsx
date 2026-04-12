import { useState, useMemo } from "react";
import type { Team } from "./types";
import type { Workspace, WorkspaceSubSection } from "./workspaceTypes";
import type { AgentEditorConfig } from "./agentEditorTypes";
import { agents, teams, currentTask, chatMessages, executionLog, taskDocTree, notifications as initialNotifications, activityFeed, userName } from "./data/mock";
import { workspaces, wsAgents, wsSkills, universalAgent, historySessions } from "./data/workspaceMock";
import { agentEditorConfigs } from "./data/agentEditorMock";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import HomeView from "./components/views/HomeView";
import TaskView from "./components/views/TaskView";
import TeamView from "./components/views/TeamView";
import NewTaskModal from "./components/modals/NewTaskModal";
import CreateAITeamModal from "./components/modals/CreateAITeamModal";
import PersonalAgentView from "./components/personal/PersonalAgentView";
import WorkspaceView from "./components/workspace/WorkspaceView";
import StartScreen from "./components/workspace/StartScreen";
import HistoryView from "./components/workspace/HistoryView";
import SpaceSettingsView from "./components/workspace/SpaceSettingsView";
import AgentListView from "./components/agents/AgentListView";
import AgentEditorView from "./components/agents/AgentEditorView";
import AgentStarterScreen from "./components/agents/AgentStarterScreen";

export default function App() {
  const [activeNav, setActiveNav] = useState("company");
  const [view, setView] = useState<"home" | "task">("home");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [workspaceSubSection, setWorkspaceSubSection] = useState<WorkspaceSubSection>("new-task");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const [showAITeam, setShowAITeam] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [editingAgent, setEditingAgent] = useState<AgentEditorConfig | null>(null);
  const [preEditorNav, setPreEditorNav] = useState<string | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isCreatingAgent, setIsCreatingAgent] = useState(false);

  const waitingCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const ws of workspaces) {
      counts[ws.id] = historySessions.filter((s) => s.status === "waiting").length;
    }
    return counts;
  }, []);

  const allWsAgents = [universalAgent, ...wsAgents];

  function handleNav(id: string) {
    setSelectedTeam(null);
    setSelectedWorkspace(null);
    setActiveSessionId(null);
    setActiveNav(id);
    if (id === "company") setView("home");
    else setView("home");
  }

  function handleSelectTeam(team: Team) {
    setSelectedTeam(team);
    setSelectedWorkspace(null);
    setActiveSessionId(null);
    setActiveNav(team.id);
  }

  function handleSelectWorkspace(ws: Workspace) {
    setSelectedWorkspace(ws);
    setWorkspaceSubSection("new-task");
    setSelectedTeam(null);
    setActiveSessionId(null);
    setActiveNav(`ws-${ws.id}`);
    setSidebarCollapsed(true);
  }

  function handleChangeWorkspaceSection(sub: WorkspaceSubSection) {
    setWorkspaceSubSection(sub);
    setActiveSessionId(null);
    if (selectedWorkspace) {
      setActiveNav(`ws-${selectedWorkspace.id}`);
    }
  }

  function handleNavigate(v: "home" | "task") {
    setSelectedTeam(null);
    setView(v);
    setActiveNav(v === "home" ? "company" : "company");
  }

  function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function openAgentEditor(wsAgentId: string) {
    const index = parseInt(wsAgentId.replace("ws-agent-", ""), 10) - 1;
    const config = agentEditorConfigs[index];
    if (config) {
      setPreEditorNav(activeNav);
      setEditingAgent(config);
      setActiveNav("agent-editor");
    }
  }

  function renderContent() {
    if (activeNav === "agents") {
      return (
        <AgentListView
          onEditAgent={(config) => {
            setPreEditorNav(activeNav);
            setEditingAgent(config);
            setActiveNav("agent-editor");
          }}
        />
      );
    }
    if (activeNav === "agent-editor" && editingAgent) {
      return (
        <AgentEditorView
          config={editingAgent}
          onBack={() => {
            const returnTo = preEditorNav ?? "company";
            setEditingAgent(null);
            setPreEditorNav(null);
            setActiveNav(returnTo);
            // Restore workspace if we came from one
            if (returnTo.startsWith("ws-")) {
              const parts = returnTo.split("-");
              const wsId = parts[1];
              const sub = parts.slice(2).join("-") as WorkspaceSubSection;
              const ws = workspaces.find((w) => w.id === wsId);
              if (ws) {
                setSelectedWorkspace(ws);
                setWorkspaceSubSection(sub);
              }
            }
          }}
        />
      );
    }
    if (activeNav === "agent-creator" && isCreatingAgent) {
      return (
        <AgentStarterScreen
          workspaceName={selectedWorkspace?.name ?? ""}
          workspaceIcon={selectedWorkspace?.icon ?? ""}
          onGenerateFromText={(description) => {
            const newConfig: AgentEditorConfig = {
              id: `ae-new-${Date.now()}`,
              name: "Новый агент",
              icon: "🤖",
              description,
              workspaceId: selectedWorkspace?.id ?? "",
              workspaceName: selectedWorkspace?.name ?? "",
              workspaceIcon: selectedWorkspace?.icon ?? "",
              instructions: { title: "Системная инструкция", body: description },
              schedules: [],
              channels: [],
              identitySet: false,
              tools: [],
              subAgents: [],
              skills: [],
              knowledgeBases: [],
              triggers: [],
            };
            setEditingAgent(newConfig);
            setIsCreatingAgent(false);
            setActiveNav("agent-editor");
          }}
          onSelectTemplate={(template) => {
            const config = {
              ...template.config,
              workspaceId: selectedWorkspace?.id ?? "",
              workspaceName: selectedWorkspace?.name ?? "",
              workspaceIcon: selectedWorkspace?.icon ?? "",
            };
            setEditingAgent(config);
            setIsCreatingAgent(false);
            setActiveNav("agent-editor");
          }}
          onBack={() => {
            setIsCreatingAgent(false);
            const returnTo = preEditorNav ?? "company";
            setPreEditorNav(null);
            setActiveNav(returnTo);
            if (returnTo.startsWith("ws-")) {
              const wsId = returnTo.replace("ws-", "").split("-")[0];
              const ws = workspaces.find((w) => w.id === wsId);
              if (ws) {
                setSelectedWorkspace(ws);
                setWorkspaceSubSection("space-settings");
              }
            }
          }}
        />
      );
    }
    if (activeNav === "gigabrain") {
      return <PersonalAgentView />;
    }
    if (selectedWorkspace) {
      // Active session view
      if (activeSessionId) {
        return (
          <WorkspaceView
            workspace={selectedWorkspace}
            sessionId={activeSessionId}
            onBack={() => setActiveSessionId(null)}
            onConfigureAgent={openAgentEditor}
          />
        );
      }
      // Sub-section views
      const wsWaitingCount = waitingCounts[selectedWorkspace.id] ?? 0;
      switch (workspaceSubSection) {
        case "new-task":
          return (
            <StartScreen
              workspace={selectedWorkspace}
              agents={allWsAgents}
              skills={wsSkills}
              activeSection={workspaceSubSection}
              waitingCount={wsWaitingCount}
              onChangeSection={handleChangeWorkspaceSection}
              onSessionStarted={setActiveSessionId}
            />
          );
        case "history":
          return (
            <HistoryView
              workspace={selectedWorkspace}
              activeSection={workspaceSubSection}
              waitingCount={wsWaitingCount}
              onChangeSection={handleChangeWorkspaceSection}
              onOpenSession={setActiveSessionId}
            />
          );
        case "space-settings":
          return (
            <SpaceSettingsView
              workspace={selectedWorkspace}
              activeSection={workspaceSubSection}
              waitingCount={wsWaitingCount}
              onChangeSection={handleChangeWorkspaceSection}
              onConfigureAgent={openAgentEditor}
              onCreateAgent={() => {
                setPreEditorNav(activeNav);
                setIsCreatingAgent(true);
                setActiveNav("agent-creator");
              }}
            />
          );
      }
    }
    if (selectedTeam) {
      return <TeamView team={selectedTeam} allAgents={agents} />;
    }
    if (view === "home") {
      return (
        <HomeView
          userName={userName}
          agents={agents}
          activity={activityFeed}
          onNewTask={() => setShowNewTask(true)}
          onNewAITeam={() => setShowAITeam(true)}
          onNavigateToTask={() => handleNavigate("task")}
        />
      );
    }
    if (view === "task") {
      return <TaskView task={currentTask} executionLog={executionLog} docTree={taskDocTree} />;
    }
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        Раздел в разработке
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar
        activeNav={activeNav}
        teams={teams}
        workspaces={workspaces}
        collapsed={sidebarCollapsed}
        waitingCounts={waitingCounts}
        onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
        onNav={handleNav}
        onSelectTeam={handleSelectTeam}
        onSelectWorkspace={handleSelectWorkspace}
      />
      <div className="flex-1 flex flex-col min-w-0 bg-content-bg">
        {activeNav !== "gigabrain" && activeNav !== "agent-editor" && activeNav !== "agent-creator" && !selectedWorkspace && (
          <TopBar
            view={view}
            selectedTeam={selectedTeam}
            notifications={notifications}
            onNavigate={handleNavigate}
            onNewTask={() => setShowNewTask(true)}
            onNewAITeam={() => setShowAITeam(true)}
            onMarkAllRead={handleMarkAllRead}
          />
        )}
        {renderContent()}
      </div>

      {/* Modals */}
      {showNewTask && <NewTaskModal onClose={() => setShowNewTask(false)} />}
      {showAITeam && <CreateAITeamModal agents={agents} onClose={() => setShowAITeam(false)} />}
    </div>
  );
}
