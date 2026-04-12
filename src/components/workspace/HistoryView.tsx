import { useState, useMemo, useCallback } from "react";
import type { Workspace, HistorySession, HistoryFilters, WorkspaceSubSection } from "../../workspaceTypes";
import { historySessions as allSessions } from "../../data/workspaceMock";
import WorkspaceTabBar from "./WorkspaceTabBar";
import HistorySessionList from "./HistorySessionList";
import HistorySessionDetail from "./HistorySessionDetail";
import AcceptSessionModal from "./AcceptSessionModal";
import Splitter from "../shared/Splitter";

interface Props {
  workspace: Workspace;
  activeSection: WorkspaceSubSection;
  waitingCount: number;
  onChangeSection: (sub: WorkspaceSubSection) => void;
  onOpenSession: (sessionId: string) => void;
}

export default function HistoryView({ workspace, activeSection, waitingCount, onChangeSection, onOpenSession }: Props) {
  const [filters, setFilters] = useState<HistoryFilters>({
    search: "",
    statuses: [],
    agentId: null,
    participantId: null,
    dateFrom: null,
    dateTo: null,
  });
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [acceptSession, setAcceptSession] = useState<HistorySession | null>(null);
  const [sessions, setSessions] = useState<HistorySession[]>(allSessions);
  const [detailWidth, setDetailWidth] = useState(384);

  const handleDetailResize = useCallback((delta: number) => {
    setDetailWidth((w) => Math.min(600, Math.max(250, w - delta)));
  }, []);

  const filteredSessions = useMemo(() => {
    let result = sessions;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((s) =>
        s.name.toLowerCase().includes(q) || s.preview.toLowerCase().includes(q) || s.agentName.toLowerCase().includes(q)
      );
    }

    if (filters.statuses.length > 0) {
      result = result.filter((s) => filters.statuses.includes(s.status));
    }

    if (filters.agentId) {
      result = result.filter((s) => s.agentId === filters.agentId);
    }

    return result;
  }, [sessions, filters]);

  const selectedSession = sessions.find((s) => s.id === selectedSessionId) ?? null;

  function handleTakeSession(sessionId: string) {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) setAcceptSession(session);
  }

  function handleAcceptSession() {
    if (!acceptSession) return;
    setSessions((prev) =>
      prev.map((s) => s.id === acceptSession.id ? { ...s, status: "active" as const, owner: "Влад Иванов" } : s)
    );
    setAcceptSession(null);
    onOpenSession(acceptSession.id);
  }

  function handleArchiveSession(sessionId: string) {
    setSessions((prev) =>
      prev.map((s) => s.id === sessionId ? { ...s, status: "archived" as const } : s)
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      <WorkspaceTabBar
        workspace={workspace}
        activeSection={activeSection}
        waitingCount={waitingCount}
        onChangeSection={onChangeSection}
      />

      {/* Content */}
      <div className="flex-1 flex overflow-hidden min-w-0 min-h-0">
        <HistorySessionList
          sessions={filteredSessions}
          filters={filters}
          onFiltersChange={setFilters}
          selectedSessionId={selectedSessionId}
          onSelectSession={setSelectedSessionId}
          onTakeSession={handleTakeSession}
        />
        <Splitter onResize={handleDetailResize} />
        <HistorySessionDetail
          session={selectedSession}
          currentUserId="user-1"
          onOpenSession={onOpenSession}
          onTakeSession={handleTakeSession}
          onArchiveSession={handleArchiveSession}
          width={detailWidth}
        />
      </div>

      {/* Accept session modal */}
      {acceptSession && (
        <AcceptSessionModal
          session={acceptSession}
          onAccept={handleAcceptSession}
          onCancel={() => setAcceptSession(null)}
        />
      )}
    </div>
  );
}
