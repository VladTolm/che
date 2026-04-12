import { Pause, AlertTriangle } from "lucide-react";
import type { WsWaitingReason } from "../../../workspaceTypes";

interface Props {
  reason: WsWaitingReason;
  onContinue: () => void;
  onEndSession: () => void;
}

export default function WaitingCard({ reason, onContinue, onEndSession }: Props) {
  if (reason.type === "missing-credentials") {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Требуется настройка инструмента</p>
              <p className="text-xs text-gray-600 mt-1">
                Для продолжения работы необходимо подключить:
              </p>
              <p className="text-xs font-medium text-gray-800 mt-1">
                {reason.toolName}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg cursor-pointer transition-colors">
                  Настроить инструмент
                </button>
                <button
                  onClick={onEndSession}
                  className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
        <div className="flex items-start gap-3">
          <Pause className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">Агент ожидает вашего действия</p>
            <p className="text-xs text-gray-600 mt-1">{reason.text}</p>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={onContinue}
                className="px-3 py-1.5 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
              >
                Продолжить
              </button>
              <button
                onClick={onEndSession}
                className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
              >
                Завершить сессию
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
