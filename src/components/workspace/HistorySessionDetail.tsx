import { useState } from "react";
import { ExternalLink, MoreHorizontal, Eye } from "lucide-react";
import type { HistorySession, SessionStatus } from "../../workspaceTypes";
import FileIcon from "../shared/FileIcon";

interface Props {
  session: HistorySession | null;
  currentUserId: string;
  onOpenSession: (id: string) => void;
  onTakeSession: (id: string) => void;
  onArchiveSession?: (id: string) => void;
  width?: number;
}

const statusLabels: Record<SessionStatus, string> = {
  waiting: "Ожидание",
  active: "Активна",
  completed: "Завершена",
  archived: "Архив",
};

const statusColors: Record<SessionStatus, string> = {
  waiting: "text-amber-600",
  active: "text-green-600",
  completed: "text-gray-600",
  archived: "text-gray-400",
};

export default function HistorySessionDetail({ session, currentUserId, onOpenSession, onTakeSession, onArchiveSession, width = 384 }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const [showFullChat, setShowFullChat] = useState(false);

  if (!session) {
    return (
      <div className="shrink-0 flex items-center justify-center text-sm text-gray-400" style={{ width }}>
        Выберите сессию для просмотра
      </div>
    );
  }

  const createdDate = new Date(session.createdAt);
  const dateFormat: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" };
  const createdStr = createdDate.toLocaleDateString("ru", dateFormat);
  const completedStr = session.completedAt ? new Date(session.completedAt).toLocaleDateString("ru", dateFormat) : null;

  const isOwner = session.owner === "Влад Иванов"; // simplified check
  const isWaiting = session.status === "waiting";
  const isCompleted = session.status === "completed";

  function handleOpen() {
    if (isWaiting && !session.owner) {
      onTakeSession(session.id);
    } else {
      onOpenSession(session.id);
    }
  }

  return (
    <div className="shrink-0 overflow-y-auto bg-white" style={{ width }}>
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <h2 className="text-base font-semibold text-gray-900">{session.name}</h2>
          <div className="flex items-center gap-2 shrink-0 ml-4">
            <button
              onClick={handleOpen}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Открыть
            </button>
            <div className="relative">
              <button
                onClick={() => setShowMenu((v) => !v)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                  {isCompleted && onArchiveSession && (
                    <button
                      onClick={() => { onArchiveSession(session.id); setShowMenu(false); }}
                      className="w-full text-left px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 cursor-pointer"
                    >
                      Перевести в архив
                    </button>
                  )}
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-full text-left px-3 py-2 text-xs text-gray-400 cursor-default"
                  >
                    Закрыть
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <span className="text-sm">{session.agentIcon}</span>
          <span>{session.agentName}</span>
          {session.owner && (
            <>
              <span className="text-gray-300">·</span>
              <span>{session.owner}</span>
            </>
          )}
          <span className="text-gray-300">·</span>
          <span>{createdDate.toLocaleDateString("ru", { day: "numeric", month: "short" })}, {createdDate.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" })}</span>
        </div>

        {/* Metadata */}
        <div className="border border-gray-100 rounded-lg divide-y divide-gray-100 mb-6">
          <MetaRow label="Статус">
            <span className={`font-medium ${statusColors[session.status]}`}>{statusLabels[session.status]}</span>
          </MetaRow>
          <MetaRow label="Агент">
            <span className="flex items-center gap-1.5">
              <span className="text-sm">{session.agentIcon}</span>
              {session.agentName}
            </span>
          </MetaRow>
          <MetaRow label="Владелец">
            <span>{session.owner ?? "Не назначен"}</span>
          </MetaRow>
          <MetaRow label="Создана">
            <span>{createdStr}</span>
          </MetaRow>
          {completedStr && (
            <MetaRow label="Завершена">
              <span>{completedStr}</span>
            </MetaRow>
          )}
        </div>

        {/* Documents */}
        {session.documents.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Документы сессии</h3>
            <div className="space-y-1">
              {session.documents.map((doc) => (
                <div key={doc.id} className="flex items-center gap-2.5 px-3 py-2 bg-gray-50 rounded-lg">
                  <FileIcon type={doc.fileType} />
                  <span className="text-xs text-gray-700 flex-1 truncate">{doc.name}</span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                    doc.direction === "in" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                  }`}>
                    {doc.direction === "in" ? "IN" : "OUT"}
                  </span>
                  {doc.direction === "out" && (
                    <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reassignment history */}
        {session.reassignments.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">История переназначений</h3>
            <div className="space-y-1">
              {session.reassignments.map((r) => {
                const date = new Date(r.timestamp);
                return (
                  <div key={r.id} className="text-xs text-gray-500 px-3 py-1.5">
                    {r.fromUser} → {r.toUser} · {date.toLocaleDateString("ru", { day: "numeric", month: "short" })}, {date.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Chat preview */}
        {session.chatPreview.length > 0 && (
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Предпросмотр</h3>
            <div className="space-y-2">
              {(showFullChat ? session.chatPreview : session.chatPreview.slice(0, 3)).map((msg) => (
                <div key={msg.id} className="text-xs text-gray-600 px-3 py-2 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">
                    {msg.role === "user" ? "Пользователь" : msg.role === "model" ? "Агент" : "Система"}:
                  </span>{" "}
                  {msg.text}
                </div>
              ))}
              {session.chatPreview.length > 3 && !showFullChat && (
                <button
                  onClick={() => setShowFullChat(true)}
                  className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer px-3"
                >
                  Показать полностью
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 px-4 py-2.5">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 w-24 shrink-0">{label}</span>
      <span className="text-xs text-gray-700">{children}</span>
    </div>
  );
}
