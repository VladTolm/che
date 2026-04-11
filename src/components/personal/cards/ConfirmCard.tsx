import { CheckCircle, Pencil } from "lucide-react";

interface Props {
  title: string;
  steps: string[];
  onConfirm: () => void;
}

export default function ConfirmCard({ title, steps, onConfirm }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-fade-in max-w-lg">
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">{title}</span>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">план</span>
      </div>
      <div className="px-4 py-3 space-y-1.5">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
            <span className="text-gray-300 font-mono text-xs w-4 text-right">{i + 1}.</span>
            {s}
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-800 flex items-center gap-1"
        >
          <CheckCircle className="w-3.5 h-3.5" /> Запустить
        </button>
        <button className="px-4 py-2 text-gray-400 text-sm cursor-pointer hover:text-gray-600 flex items-center gap-1">
          <Pencil className="w-3.5 h-3.5" /> Изменить
        </button>
      </div>
    </div>
  );
}
