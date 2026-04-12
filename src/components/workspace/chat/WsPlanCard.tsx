import { Play, X } from "lucide-react";
import type { WsExecutionStep } from "../../../workspaceTypes";

interface Props {
  steps: WsExecutionStep[];
  onConfirm: () => void;
  onCancel: () => void;
}

export default function WsPlanCard({ steps, onConfirm, onCancel }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 animate-fade-in">
      <p className="text-xs font-semibold text-gray-700">План выполнения</p>
      <ol className="space-y-1.5">
        {steps.map((step, i) => (
          <li key={step.id} className="flex items-start gap-2 text-xs text-gray-600">
            <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-medium text-gray-500 shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span>{step.title}</span>
          </li>
        ))}
      </ol>
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onConfirm}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-medium cursor-pointer hover:bg-gray-800 transition-colors"
        >
          <Play className="w-3.5 h-3.5" /> Запустить
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <X className="w-3.5 h-3.5" /> Отменить
        </button>
      </div>
    </div>
  );
}
