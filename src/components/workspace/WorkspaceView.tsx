import { useState, useRef, useMemo, useCallback } from "react";
import type { Workspace, SourceDocument, WorkspaceAgent, WorkspaceChatMessage, WsExecution, WsArtifact, WsWaitingReason, WorkspaceSubSection } from "../../workspaceTypes";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  sourceDocuments as initialDocs,
  wsChatMessages,
  wsExecution as defaultExecution,
  wsArtifact as defaultArtifact,
  wsSkills,
  demoSessions,
} from "../../data/workspaceMock";
import WorkspaceTabBar from "./WorkspaceTabBar";
import WorkspaceTopBar from "./WorkspaceTopBar";
import WorkspaceChatView from "./chat/WorkspaceChatView";
import RightPanel from "./right/RightPanel";
import ArtifactPopup from "./ArtifactPopup";
import Splitter from "../shared/Splitter";

interface Props {
  workspace: Workspace;
  sessionId?: string;
  activeSection: WorkspaceSubSection;
  waitingCount: number;
  onChangeSection: (sub: WorkspaceSubSection) => void;
  onBack?: () => void;
  onConfigureAgent?: (agentId: string) => void;
}

export default function WorkspaceView({ workspace, sessionId, activeSection, waitingCount, onChangeSection, onBack }: Props) {
  const [rightOpen, setRightOpen] = useLocalStorage(`ws-right-${workspace.id}`, true);
  const [rightWidth, setRightWidth] = useState(288);

  const handleRightResize = useCallback((delta: number) => {
    setRightWidth((w) => Math.min(500, Math.max(200, w - delta)));
  }, []);

  // Load session-specific data
  const sessionData = sessionId ? demoSessions[sessionId] : null;

  // Chat history per agent (key: agentId or "qa")
  const chatHistoryRef = useRef<Record<string, WorkspaceChatMessage[]>>({
    "ws-agent-1": [...(sessionData?.messages ?? wsChatMessages)],
  });

  const [activeAgent] = useState<WorkspaceAgent | null>(null);
  const currentKey = activeAgent?.id ?? "qa";
  const defaultMessages = sessionData?.messages ?? chatHistoryRef.current[currentKey] ?? [];
  const [messages, setMessages] = useState<WorkspaceChatMessage[]>(defaultMessages);
  const [input, setInput] = useState("");

  // Source docs (for context display)
  const [sourceDocs] = useState<SourceDocument[]>(initialDocs);

  // Execution — from session data or default
  const [execution] = useState<WsExecution>(sessionData?.execution ?? defaultExecution);

  // Artifacts — array, from session data or default single artifact
  const [artifacts] = useState<WsArtifact[]>(
    sessionData?.artifacts ?? (defaultArtifact ? [defaultArtifact] : [])
  );

  // Artifact popup — open by ID
  const [openArtifactId, setOpenArtifactId] = useState<string | null>(null);
  const openArtifact = useMemo(
    () => artifacts.find((a) => a.id === openArtifactId) ?? null,
    [artifacts, openArtifactId]
  );

  // Waiting reason — from session data
  const [waitingReason, setWaitingReason] = useState<WsWaitingReason | null>(
    sessionData?.waitingReason ?? null
  );

  function handleSend() {
    if (!input.trim()) return;
    const newMsg: WorkspaceChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      {/* Tab navigation */}
      <WorkspaceTabBar
        workspace={workspace}
        activeSection={activeSection}
        waitingCount={waitingCount}
        onChangeSection={onChangeSection}
      />

      {/* Session header */}
      <WorkspaceTopBar
        workspace={workspace}
        sessionName={sessionId ? "Сессия" : undefined}
        activeAgent={activeAgent}
        onBack={onBack}
        rightOpen={rightOpen}
        onToggleRight={() => setRightOpen((v) => !v)}
      />

      {/* Main content: chat + right panel */}
      <div className="flex-1 flex overflow-hidden min-w-0 min-h-0">
        <WorkspaceChatView
          messages={messages}
          input={input}
          onInputChange={setInput}
          onSend={handleSend}
          activeAgent={activeAgent}
          skills={wsSkills}
          selectedDocs={sourceDocs.filter((d) => d.selected)}
          workspaceName={workspace.name}
          artifacts={artifacts}
          onOpenArtifact={setOpenArtifactId}
          waitingReason={waitingReason}
          onContinue={() => setWaitingReason(null)}
          onEndSession={() => setWaitingReason(null)}
        />

        {rightOpen && (
          <>
            <Splitter onResize={handleRightResize} />
            <RightPanel
              execution={execution}
              skills={wsSkills}
              width={rightWidth}
            />
          </>
        )}
      </div>

      {/* Artifact popup */}
      {openArtifact && (
        <ArtifactPopup artifact={openArtifact} onClose={() => setOpenArtifactId(null)} />
      )}
    </div>
  );
}
