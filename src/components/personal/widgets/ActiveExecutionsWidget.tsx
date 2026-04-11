import { Plane, Receipt, CheckCircle } from "lucide-react";

export default function ActiveExecutionsWidget() {
  return (
    <div className="max-w-lg animate-fade-in flex gap-3">
      <div className="bg-white rounded-xl border border-green-200 p-3 flex-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-gray-800 flex items-center gap-1">
            <Plane className="w-3.5 h-3.5 text-gray-500" /> Рейсы МСК–SHA
          </span>
          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
        </div>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full h-1 bg-green-400 rounded-full" />
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-1">5 вариантов · 2m 15s</div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-3 flex-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-gray-800 flex items-center gap-1">
            <Receipt className="w-3.5 h-3.5 text-gray-500" /> Expense март
          </span>
          <span className="text-xs text-gray-900 animate-pulse-dot">●</span>
        </div>
        <div className="flex gap-0.5">
          {[1, 2].map((i) => (
            <div key={i} className="w-full h-1 bg-green-400 rounded-full" />
          ))}
          <div className="w-full h-1 bg-gray-900 rounded-full animate-pulse-dot" />
          <div className="w-full h-1 bg-gray-200 rounded-full" />
        </div>
        <div className="text-xs text-gray-500 mt-1">шаг 3/4 · 1m 32s</div>
      </div>
    </div>
  );
}
