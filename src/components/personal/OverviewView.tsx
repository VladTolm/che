import { calendarEvents, mails, todos, automations } from "../../data/personalMock";
import { PRIORITY_COLORS } from "../../personalTypes";

export default function OverviewView() {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: "#fafafa" }}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Active executions */}
        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            ⚡ Активные выполнения
          </h2>
          <div className="flex gap-3">
            <div className="bg-white rounded-xl border border-green-200 p-4 flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">🛫 Рейсы МСК–SHA</span>
                <span className="text-xs text-green-600">✅ Завершено</span>
              </div>
              <div className="flex gap-0.5 mb-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full h-1.5 bg-green-400 rounded-full" />
                ))}
              </div>
              <div className="text-xs text-gray-500">5 вариантов · 2m 15s · Aeroflot SU208 лучший</div>
            </div>
            <div className="bg-white rounded-xl border border-orange-200 p-4 flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">🧾 Expense март</span>
                <span className="text-xs text-orange-500 animate-pulse-dot">● В процессе</span>
              </div>
              <div className="flex gap-0.5 mb-1.5">
                {[1, 2].map((i) => (
                  <div key={i} className="w-full h-1.5 bg-green-400 rounded-full" />
                ))}
                <div className="w-full h-1.5 bg-orange-400 rounded-full animate-pulse-dot" />
                <div className="w-full h-1.5 bg-gray-200 rounded-full" />
              </div>
              <div className="text-xs text-gray-500">шаг 3/4 · 1m 32s · 19 чеков найдено</div>
            </div>
          </div>
        </div>

        {/* Main grid: 3+2 */}
        <div className="grid grid-cols-5 gap-6">
          {/* Left column */}
          <div className="col-span-3 space-y-6">
            {/* Calendar */}
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                📅 Сегодня
              </h2>
              <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                {calendarEvents.map((e, i) => (
                  <div
                    key={i}
                    className={`px-4 py-3 flex items-center gap-3 ${e.urgent ? "border-l-4 border-l-red-400" : ""}`}
                  >
                    <span className="text-xs font-mono text-gray-500 w-10">{e.time}</span>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-800">{e.title}</span>
                      {e.agentPrep && (
                        <div className="text-xs text-indigo-500 mt-0.5">✨ {e.agentPrep}</div>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{e.duration}</span>
                    {e.urgent && (
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-600 rounded text-xs">⚠️</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mail */}
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                📧 Почта — 3 требуют ответа
              </h2>
              <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                {mails.map((m, i) => (
                  <div key={i} className="px-4 py-3 flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-medium text-gray-800">{m.from}: </span>
                      <span className="text-gray-500">{m.subject}</span>
                    </div>
                    {m.hasDraft && (
                      <button className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs cursor-pointer font-medium">
                        Черновик
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-2 space-y-6">
            {/* Todos */}
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                📋 Мои задачи
              </h2>
              <div className="bg-white rounded-xl border border-gray-100 p-3 space-y-2">
                {todos.map((t) => (
                  <div key={t.id} className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${PRIORITY_COLORS[t.priority]}`} />
                    <span className="text-sm text-gray-800 flex-1">{t.title}</span>
                    {t.deadline && <span className="text-xs text-gray-400">{t.deadline}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Automations */}
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                🔄 Автоматизации
              </h2>
              <div className="bg-white rounded-xl border border-gray-100 p-3 space-y-2">
                {automations.map((a) => (
                  <div key={a.id} className="flex items-center gap-2 text-sm">
                    <span>{a.icon}</span>
                    <span className="text-gray-700 flex-1">{a.name}</span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        a.status === "monitoring" ? "bg-blue-400" : "bg-green-400"
                      }`}
                    />
                    <span className="text-xs text-gray-400">{a.schedule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
