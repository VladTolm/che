import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { SourceDocument, WorkspaceAgent, WsIncomingSession } from "../../../workspaceTypes";
import AgentsSkillsTab from "../right/AgentsSkillsTab";
import SourceDocumentList from "./SourceDocumentList";
import ContextCounter from "./ContextCounter";
import IncomingSessionsSection from "../IncomingSessionsSection";

interface Props {
  sourceDocs: SourceDocument[];
  onToggleDoc: (id: string) => void;
  onDocClick: (doc: SourceDocument) => void;
  selectedDocsCount: number;
  readOnly: boolean;
  // Agents
  agents: WorkspaceAgent[];
  activeAgent: WorkspaceAgent | null;
  onSelectAgent: (agent: WorkspaceAgent | null) => void;
  onConfigureAgent?: (agent: WorkspaceAgent) => void;
  incomingSessions: WsIncomingSession[];
  onTakeSession: (session: WsIncomingSession) => void;
}

export default function SourceDataPanel({
  sourceDocs, onToggleDoc, onDocClick, selectedDocsCount, readOnly,
  agents, activeAgent, onSelectAgent, onConfigureAgent,
  incomingSessions, onTakeSession,
}: Props) {
  const [agentsOpen, setAgentsOpen] = useState(true);
  const [docsOpen, setDocsOpen] = useState(true);

  return (
    <div className="w-72 border-r border-gray-200 bg-white flex flex-col shrink-0 animate-slide-right">
      <div className="flex-1 flex flex-col min-h-0">
        {/* Агенты */}
        <div className="flex flex-col shrink-0">
          <button
            onClick={() => setAgentsOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-2.5 shrink-0 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            {agentsOpen ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex-1 text-left">Агенты</span>
          </button>
          {agentsOpen && (
            <div className="overflow-y-auto">
              <AgentsSkillsTab
                agents={agents}
                activeAgent={activeAgent}
                onSelectAgent={onSelectAgent}
                onConfigureAgent={onConfigureAgent}
              />
              <div className="px-4 pb-4">
                <IncomingSessionsSection sessions={incomingSessions} onTakeSession={onTakeSession} />
              </div>
            </div>
          )}
        </div>

        {/* Документы */}
        <div className="flex flex-col flex-1 min-h-0 border-t border-gray-100">
          <button
            onClick={() => setDocsOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-2.5 shrink-0 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            {docsOpen ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex-1 text-left">Документы</span>
            <span className="text-[10px] text-gray-400">{sourceDocs.length}</span>
          </button>
          {docsOpen && (
            <div className="flex-1 overflow-y-auto min-h-0">
              <SourceDocumentList docs={sourceDocs} onToggle={onToggleDoc} onDocClick={onDocClick} readOnly={readOnly} />
            </div>
          )}
        </div>
      </div>

      <ContextCounter docsCount={selectedDocsCount} />
    </div>
  );
}
