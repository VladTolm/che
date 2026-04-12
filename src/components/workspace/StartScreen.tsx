import { useState } from "react";
import type { WorkspaceAgent, WorkspaceSkill, Workspace, WorkspaceSubSection } from "../../workspaceTypes";
import WorkspaceTabBar from "./WorkspaceTabBar";
import WorkspaceChatInput from "./chat/WorkspaceChatInput";
import AgentSwitcher from "./AgentSwitcher";

interface Props {
  workspace: Workspace;
  agents: WorkspaceAgent[];
  skills: WorkspaceSkill[];
  activeSection: WorkspaceSubSection;
  waitingCount: number;
  onChangeSection: (sub: WorkspaceSubSection) => void;
  onSessionStarted: (sessionId: string) => void;
}

export default function StartScreen({ workspace, agents, skills, activeSection, waitingCount, onChangeSection, onSessionStarted }: Props) {
  const [selectedAgent, setSelectedAgent] = useState<WorkspaceAgent>(agents[0]);
  const [input, setInput] = useState("");

  const isUniversal = selectedAgent.id === "ws-agent-universal";

  function handleSend() {
    if (!input.trim()) return;
    const sessionId = `ses-${Date.now()}`;
    onSessionStarted(sessionId);
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      <WorkspaceTabBar
        workspace={workspace}
        activeSection={activeSection}
        waitingCount={waitingCount}
        onChangeSection={onChangeSection}
      />
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-2xl flex flex-col items-center">
          {/* Agent display */}
          <div className="flex flex-col items-center mb-8 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl mb-3">
              {selectedAgent.icon}
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">{selectedAgent.name}</h2>
            <p className="text-sm text-gray-500 text-center max-w-md">{selectedAgent.description}</p>
          </div>

          {/* Chat input */}
          <div className="w-full">
            <WorkspaceChatInput
              input={input}
              onInputChange={setInput}
              onSend={handleSend}
              activeAgent={isUniversal ? null : selectedAgent}
              skills={skills}
              workspaceName={workspace.name}
              placeholderOverride={isUniversal ? "Чем я могу помочь сегодня?" : undefined}
            />
          </div>

          {/* Agent switcher */}
          <div className="w-full mt-2 px-6">
            <AgentSwitcher
              agents={agents}
              selectedAgentId={selectedAgent.id}
              onSelectAgent={setSelectedAgent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
