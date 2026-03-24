import type { CalendarEvent } from "../../../personalTypes";

interface Props {
  events: CalendarEvent[];
}

export default function CalendarWidget({ events }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden max-w-lg animate-fade-in">
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">📅 Расписание — Вт, 25 марта</span>
        <span className="text-xs text-gray-400">{events.length} встречи</span>
      </div>
      {events.map((e, i) => (
        <div
          key={i}
          className={`px-4 py-2.5 flex items-center gap-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer ${
            e.urgent ? "border-l-4 border-l-red-400" : ""
          }`}
        >
          <span className="text-xs font-mono text-gray-400 w-10 shrink-0">{e.time}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-800 font-medium">{e.title}</div>
            {e.agentPrep && (
              <div className="text-xs text-indigo-500 mt-0.5">✨ {e.agentPrep}</div>
            )}
          </div>
          <span className="text-xs text-gray-400 shrink-0">{e.duration}</span>
          {e.urgent && (
            <span className="px-1.5 py-0.5 bg-red-100 text-red-600 rounded text-xs shrink-0">⚠️</span>
          )}
        </div>
      ))}
    </div>
  );
}
