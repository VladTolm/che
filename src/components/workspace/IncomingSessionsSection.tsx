import { useState } from "react";
import { Inbox } from "lucide-react";
import type { WsIncomingSession } from "../../workspaceTypes";

interface Props {
  sessions: WsIncomingSession[];
  onTakeSession: (session: WsIncomingSession) => void;
}

export default function IncomingSessionsSection({ sessions, onTakeSession }: Props) {
  const [confirmSession, setConfirmSession] = useState<WsIncomingSession | null>(null);

  if (sessions.length === 0) return null;

  return (
    <>
      <div className="border-t border-gray-100 pt-3">
        <div className="flex items-center gap-2 px-3 mb-2">
          <Inbox className="w-3.5 h-3.5 text-gray-400" />
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Входящие</p>
          <span className="text-[9px] font-semibold text-white bg-amber-500 rounded-full w-4 h-4 flex items-center justify-center">
            {sessions.length}
          </span>
        </div>
        <div className="space-y-1">
          {sessions.map((session) => (
            <div key={session.id} className="px-3 py-2.5 rounded-lg bg-amber-50 border border-amber-100">
              <div className="flex items-center gap-2">
                <span className="text-sm">{session.agentIcon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-gray-800">{session.agentName}</span>
                    <span className="text-[9px] font-medium text-amber-600 bg-amber-100 rounded px-1.5 py-0.5">Ожидает</span>
                  </div>
                  <p className="text-[10px] text-gray-500 truncate mt-0.5">{session.reason}</p>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0">{session.timestamp}</span>
              </div>
              <button
                onClick={() => setConfirmSession(session)}
                className="mt-2 w-full text-center text-[10px] font-medium text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 rounded py-1 cursor-pointer transition-colors"
              >
                Взять
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation modal */}
      {confirmSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-xl w-96 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Взять сессию</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Агент:</span>
                <span className="text-sm">{confirmSession.agentIcon}</span>
                <span className="font-medium text-gray-800">{confirmSession.agentName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Запущена:</span>
                <span className="text-gray-800">{confirmSession.timestamp}</span>
              </div>
              <div>
                <span className="text-gray-400">Триггер: </span>
                <span className="text-gray-800">{confirmSession.reason}</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-3 mb-4">
              После принятия вы станете владельцем сессии. Другие участники смогут только читать её.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmSession(null)}
                className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={() => { onTakeSession(confirmSession); setConfirmSession(null); }}
                className="px-4 py-1.5 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
              >
                Взять сессию
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
