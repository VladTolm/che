interface Props {
  title: string;
  steps: string[];
  onConfirm: () => void;
}

export default function ConfirmCard({ title, steps, onConfirm }: Props) {
  return (
    <div className="bg-white border-2 border-indigo-200 rounded-xl overflow-hidden shadow-sm animate-fade-in max-w-lg">
      <div className="px-4 py-2.5 bg-indigo-50 border-b border-indigo-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-indigo-700">{title}</span>
        <span className="text-xs text-indigo-400 bg-indigo-100 px-2 py-0.5 rounded-full">план</span>
      </div>
      <div className="px-4 py-3 space-y-1.5">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
            <span className="text-gray-300 font-mono text-xs w-4 text-right">{i + 1}.</span>
            {s}
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-indigo-100 flex gap-2">
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-indigo-600"
        >
          ✓ Запустить
        </button>
        <button className="px-4 py-2 text-gray-400 text-sm cursor-pointer hover:text-gray-600">
          ✏️ Изменить
        </button>
      </div>
    </div>
  );
}
