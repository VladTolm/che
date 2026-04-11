import { useState } from "react";
import type { Workspace, Team } from "./types";
import { agents, workspaces, teams, currentTask, chatMessages, executionLog, taskDocTree, notifications as initialNotifications, activityFeed, userName } from "./data/mock";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import HomeView from "./components/views/HomeView";
import TaskView from "./components/views/TaskView";
import WorkspaceView from "./components/views/WorkspaceView";
import TeamView from "./components/views/TeamView";
import NewTaskModal from "./components/modals/NewTaskModal";
import CreateAITeamModal from "./components/modals/CreateAITeamModal";
import PersonalAgentView from "./components/personal/PersonalAgentView";

const workspaceColorMap: Record<string, string> = {};
workspaces.forEach((ws) => { workspaceColorMap[ws.name] = ws.color; });

export default function App() {
  const [activeNav, setActiveNav] = useState("company");
  const [view, setView] = useState<"home" | "task">("home");
  const [selectedWS, setSelectedWS] = useState<Workspace | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showNewTask, setShowNewTask] = useState(false);
  const [showAITeam, setShowAITeam] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  function handleNav(id: string) {
    setSelectedWS(null);
    setSelectedTeam(null);
    setActiveNav(id);
    if (id === "company") setView("home");
    else if (id === "tasks") setView("task");
    else setView("home");
  }

  function handleSelectWS(ws: Workspace) {
    setSelectedWS(ws);
    setSelectedTeam(null);
    setActiveNav(ws.id);
  }

  function handleSelectTeam(team: Team) {
    setSelectedTeam(team);
    setSelectedWS(null);
    setActiveNav(team.id);
  }

  function handleNavigate(v: "home" | "task") {
    setSelectedWS(null);
    setSelectedTeam(null);
    setView(v);
    setActiveNav(v === "home" ? "company" : "tasks");
  }

  function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function renderContent() {
    if (activeNav === "gigabrain") {
      return <PersonalAgentView />;
    }
    if (selectedWS) {
      return <WorkspaceView ws={selectedWS} allAgents={agents} onNewTask={() => setShowNewTask(true)} />;
    }
    if (selectedTeam) {
      return <TeamView team={selectedTeam} allAgents={agents} workspaceColors={workspaceColorMap} />;
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
        workspaces={workspaces}
        teams={teams}
        onNav={handleNav}
        onSelectWS={handleSelectWS}
        onSelectTeam={handleSelectTeam}
      />
      <div className="flex-1 flex flex-col min-w-0 bg-content-bg">
        {activeNav !== "gigabrain" && (
          <TopBar
            view={view}
            selectedWS={selectedWS}
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
