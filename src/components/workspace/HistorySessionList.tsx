import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import type { HistorySession, HistoryFilters, SessionStatus } from "../../workspaceTypes";

interface Props {
  sessions: HistorySession[];
  filters: HistoryFilters;
  onFiltersChange: (filters: HistoryFilters) => void;
  selectedSessionId: string | null;
  onSelectSession: (id: string) => void;
  onTakeSession: (id: string) => void;
}

const statusLabels: Record<SessionStatus, string> = {
  waiting: "Ожидание",
  active: "Активна",
  completed: "Завершена",
  archived: "Архив",
};

const statusColors: Record<SessionStatus, string> = {
  waiting: "bg-amber-100 text-amber-700",
  active: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-600",
  archived: "bg-gray-50 text-gray-400",
};

export default function HistorySessionList({ sessions, filters, onFiltersChange, selectedSessionId, onSelectSession, onTakeSession }: Props) {
  const [showFilters, setShowFilters] = useState(true);

  const waitingSessions = sessions.filter((s) => s.status === "waiting");
  const otherSessions = sessions.filter((s) => s.status !== "waiting");

  function toggleStatus(status: SessionStatus) {
    const current = filters.statuses;
    const next = current.includes(status)
      ? current.filter((s) => s !== status)
      : [...current, status];
    onFiltersChange({ ...filters, statuses: next });
  }

  function resetFilters() {
    onFiltersChange({ search: "", statuses: [], agentId: null, participantId: null, dateFrom: null, dateTo: null });
  }

  const hasActiveFilters = filters.search || filters.statuses.length > 0 || filters.agentId || filters.participantId || filters.dateFrom || filters.dateTo;

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white">
      {/* Search */}
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            placeholder="Поиск..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-300 text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-gray-100">
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-2 text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <span className="font-medium">Фильтры</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? "" : "-rotate-90"}`} />
        </button>
        {showFilters && (
          <div className="px-4 pb-3 space-y-2">
            <div className="space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Статус</p>
              {(["waiting", "active", "completed", "archived"] as SessionStatus[]).map((status) => {
                const count = sessions.filter((s) => s.status === status).length;
                return (
                  <label key={status} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.statuses.includes(status)}
                      onChange={() => toggleStatus(status)}
                      className="w-3.5 h-3.5 rounded border-gray-300 accent-gray-900"
                    />
                    <span className="flex-1">{statusLabels[status]}</span>
                    {count > 0 && status === "waiting" && (
                      <span className="text-[10px] font-medium text-amber-600">{count}</span>
                    )}
                  </label>
                );
              })}
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        )}
      </div>

      {/* Session list */}
      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 && (
          <div className="p-6 text-center text-sm text-gray-400">
            {hasActiveFilters ? "Ничего не найдено" : "Сессий пока нет"}
          </div>
        )}

        {waitingSessions.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 px-4 pt-3 pb-1">Ожидание</p>
            {waitingSessions.map((session) => (
              <SessionRow
                key={session.id}
                session={session}
                isSelected={selectedSessionId === session.id}
                onSelect={() => onSelectSession(session.id)}
                onTake={() => onTakeSession(session.id)}
              />
            ))}
          </div>
        )}

        {otherSessions.length > 0 && (
          <div>
            {waitingSessions.length > 0 && (
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-4 pt-3 pb-1">Остальные</p>
            )}
            {otherSessions.map((session) => (
              <SessionRow
                key={session.id}
                session={session}
                isSelected={selectedSessionId === session.id}
                onSelect={() => onSelectSession(session.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SessionRow({ session, isSelected, onSelect, onTake }: {
  session: HistorySession;
  isSelected: boolean;
  onSelect: () => void;
  onTake?: () => void;
}) {
  const time = new Date(session.updatedAt);
  const timeStr = time.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });
  const isWaiting = session.status === "waiting";

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left px-4 py-3 border-b border-gray-50 transition-colors cursor-pointer ${
        isSelected ? "bg-gray-50" : "hover:bg-gray-50/50"
      }`}
    >
      <div className="flex items-start gap-2.5">
        <span className="text-base mt-0.5 shrink-0">{session.agentIcon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-gray-900 truncate">{session.name}</p>
            <span className="text-[10px] text-gray-400 shrink-0">{timeStr}</span>
          </div>
          <p className="text-[11px] text-gray-500 truncate mt-0.5">{session.preview}</p>
          <div className="flex items-center justify-between mt-1.5">
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusColors[session.status]}`}>
              {statusLabels[session.status]}
            </span>
            {isWaiting && onTake && (
              <button
                onClick={(e) => { e.stopPropagation(); onTake(); }}
                className="text-[11px] font-medium text-gray-900 hover:text-gray-700 px-2 py-0.5 rounded border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                Взять
              </button>
            )}
            {session.owner && !isWaiting && (
              <span className="text-[10px] text-gray-400">{session.owner}</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
