import { useState, useRef } from "react";
import type { Workspace, SourceDocument, WorkspaceAgent, WorkspaceChatMessage, WsExecution, WsArtifact, WsWaitingReason, WsIncomingSession } from "../../workspaceTypes";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  sourceDocuments as initialDocs,
  wsAgents,
  wsChatMessages,
  wsExecution as initialExecution,
  wsArtifact as initialArtifact,
  wsSkills,
  incomingSessions as initialIncomingSessions,
} from "../../data/workspaceMock";
import WorkspaceTopBar from "./WorkspaceTopBar";
import SourceDataPanel from "./left/SourceDataPanel";
import WorkspaceChatView from "./chat/WorkspaceChatView";
import RightPanel from "./right/RightPanel";
import ArtifactPopup from "./ArtifactPopup";
import DocumentPreviewPopup from "./DocumentPreviewPopup";

interface Props {
  workspace: Workspace;
  sessionId?: string;
  onBack?: () => void;
  onConfigureAgent?: (agentId: string) => void;
}

export default function WorkspaceView({ workspace, sessionId, onBack, onConfigureAgent }: Props) {
  // Panel collapse (persisted)
  const [leftOpen, setLeftOpen] = useLocalStorage(`ws-left-${workspace.id}`, true);
  const [rightOpen, setRightOpen] = useLocalStorage(`ws-right-${workspace.id}`, true);

  // Chat history per agent (key: agentId or "qa")
  const chatHistoryRef = useRef<Record<string, WorkspaceChatMessage[]>>({
    "ws-agent-1": [...wsChatMessages],
  });

  const [activeAgent, setActiveAgent] = useState<WorkspaceAgent | null>(null);
  const currentKey = activeAgent?.id ?? "qa";
  const [messages, setMessages] = useState<WorkspaceChatMessage[]>(chatHistoryRef.current[currentKey] ?? []);
  const [input, setInput] = useState("");

  // Left panel — user's free-mode selection
  const [sourceDocs, setSourceDocs] = useState<SourceDocument[]>(initialDocs);

  // Saved user selection for free mode
  const savedUserDocsRef = useRef<SourceDocument[]>(initialDocs);

  // Execution
  const [execution] = useState<WsExecution>(initialExecution);

  // Artifact popup
  const [artifact] = useState<WsArtifact | null>(initialArtifact);
  const [showArtifactPopup, setShowArtifactPopup] = useState(false);

  // Document preview popup
  const [previewDoc, setPreviewDoc] = useState<SourceDocument | null>(null);

  // Waiting & incoming sessions
  const [waitingReason, setWaitingReason] = useState<WsWaitingReason | null>(null);
  const [incomingSessions, setIncomingSessions] = useState<WsIncomingSession[]>(initialIncomingSessions);

  function handleSelectAgent(agent: WorkspaceAgent | null) {
    // Save current chat
    chatHistoryRef.current[currentKey] = messages;
    const newKey = agent?.id ?? "qa";
    const newMessages = chatHistoryRef.current[newKey] ?? [];

    if (activeAgent === null) {
      // Leaving free mode — save user selection
      savedUserDocsRef.current = sourceDocs;
    }

    if (agent) {
      // Entering agent mode — apply agent's static context
      setSourceDocs(applyAgentDocContext(initialDocs, agent.contextDocs));
    } else {
      // Returning to free mode — restore user selection
      setSourceDocs(savedUserDocsRef.current);
    }

    setActiveAgent(agent);
    setMessages(newMessages);
    setInput("");
  }

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

  function handleOpenArtifact(_artifactId: string) {
    setShowArtifactPopup(true);
  }

  const isAgentMode = activeAgent !== null;
  const selectedDocsCount = sourceDocs.filter((d) => d.selected).length;

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      <WorkspaceTopBar
        workspace={workspace}
        sessionName={sessionId ? "Сессия" : undefined}
        activeAgent={activeAgent}
        onBack={onBack}
        leftOpen={leftOpen}
        rightOpen={rightOpen}
        onToggleLeft={() => setLeftOpen((v) => !v)}
        onToggleRight={() => setRightOpen((v) => !v)}
      />
      <div className="flex-1 flex overflow-hidden min-w-0 min-h-0">
        {leftOpen && (
          <SourceDataPanel
            sourceDocs={sourceDocs}
            onToggleDoc={(id) => setSourceDocs((prev) => prev.map((d) => d.id === id ? { ...d, selected: !d.selected } : d))}
            onDocClick={(doc) => setPreviewDoc(doc)}
            selectedDocsCount={selectedDocsCount}
            readOnly={isAgentMode}
            agents={wsAgents}
            activeAgent={activeAgent}
            onSelectAgent={handleSelectAgent}
            onConfigureAgent={(agent) => onConfigureAgent?.(agent.id)}
            incomingSessions={incomingSessions}
            onTakeSession={(session) => setIncomingSessions((prev) => prev.filter((s) => s.id !== session.id))}
          />
        )}

        <WorkspaceChatView
          messages={messages}
          input={input}
          onInputChange={setInput}
          onSend={handleSend}
          activeAgent={activeAgent}
          skills={wsSkills}
          selectedDocs={sourceDocs.filter((d) => d.selected)}
          workspaceName={workspace.name}
          onOpenArtifact={handleOpenArtifact}
          waitingReason={waitingReason}
          onContinue={() => setWaitingReason(null)}
          onEndSession={() => setWaitingReason(null)}
        />

        {rightOpen && (
          <RightPanel
            execution={execution}
            skills={wsSkills}
          />
        )}
      </div>

      {/* Artifact popup */}
      {showArtifactPopup && artifact && (
        <ArtifactPopup artifact={artifact} onClose={() => setShowArtifactPopup(false)} />
      )}

      {/* Document preview popup */}
      {previewDoc && (
        <DocumentPreviewPopup document={previewDoc} onClose={() => setPreviewDoc(null)} />
      )}
    </div>
  );
}

function applyAgentDocContext(allDocs: SourceDocument[], contextDocIds: string[]): SourceDocument[] {
  return allDocs.filter((d) => contextDocIds.includes(d.id)).map((d) => ({ ...d, selected: true }));
}
