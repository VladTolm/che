import type { HistorySession } from "../../workspaceTypes";

interface Props {
  session: HistorySession;
  onAccept: () => void;
  onCancel: () => void;
}

export default function AcceptSessionModal({ session, onAccept, onCancel }: Props) {
  const createdDate = new Date(session.createdAt);
  const dateStr = createdDate.toLocaleDateString("ru", { day: "numeric", month: "short" });
  const timeStr = createdDate.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-modal-enter">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Взять сессию</h3>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-gray-400 w-20 shrink-0">Агент:</span>
            <span className="text-lg mr-1">{session.agentIcon}</span>
            <span className="font-medium text-gray-900">{session.agentName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-gray-400 w-20 shrink-0">Запущена:</span>
            <span>{dateStr}, {timeStr}</span>
          </div>
          {session.triggerData && (
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-gray-400 w-20 shrink-0">Триггер:</span>
              <span>{session.triggerData}</span>
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mb-6 text-xs text-gray-500">
          После принятия вы станете владельцем. Другие участники смогут только читать.
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            Отмена
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 text-sm text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
          >
            Взять сессию
          </button>
        </div>
      </div>
    </div>
  );
}
