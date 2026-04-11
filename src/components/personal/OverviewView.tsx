import { Zap, Calendar, Mail, ClipboardList, RefreshCw, CheckCircle, Plane, Receipt, AlertTriangle, Sparkles } from "lucide-react";
import { calendarEvents, mails, todos, automations } from "../../data/personalMock";
import { PRIORITY_COLORS } from "../../personalTypes";

export default function OverviewView() {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: "#fafafa" }}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Active executions */}
        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Активные выполнения
          </h2>
          <div className="flex gap-3">
            <div className="bg-white rounded-xl border border-green-200 p-4 flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                  <Plane className="w-4 h-4 text-gray-500" /> Рейсы МСК–SHA
                </span>
                <span className="text-xs text-green-600"><CheckCircle className="w-3.5 h-3.5 inline-block" /> Завершено</span>
              </div>
              <div className="flex gap-0.5 mb-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full h-1.5 bg-green-400 rounded-full" />
                ))}
              </div>
              <div className="text-xs text-gray-500">5 вариантов · 2m 15s · Aeroflot SU208 лучший</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                  <Receipt className="w-4 h-4 text-gray-500" /> Expense март
                </span>
                <span className="text-xs text-gray-900 animate-pulse-dot">● В процессе</span>
              </div>
              <div className="flex gap-0.5 mb-1.5">
                {[1, 2].map((i) => (
                  <div key={i} className="w-full h-1.5 bg-green-400 rounded-full" />
                ))}
                <div className="w-full h-1.5 bg-gray-900 rounded-full animate-pulse-dot" />
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
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Сегодня
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
                        <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> {e.agentPrep}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{e.duration}</span>
                    {e.urgent && (
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-600 rounded text-xs">
                        <AlertTriangle className="w-3 h-3 inline-block" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mail */}
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Почта — 3 требуют ответа
              </h2>
              <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                {mails.map((m, i) => (
                  <div key={i} className="px-4 py-3 flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-medium text-gray-800">{m.from}: </span>
                      <span className="text-gray-500">{m.subject}</span>
                    </div>
                    {m.hasDraft && (
                      <button className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs cursor-pointer font-medium">
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
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ClipboardList className="w-3.5 h-3.5" /> Мои задачи
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
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" /> Автоматизации
              </h2>
              <div className="bg-white rounded-xl border border-gray-100 p-3 space-y-2">
                {automations.map((a) => (
                  <div key={a.id} className="flex items-center gap-2 text-sm">
                    <Zap className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-700 flex-1">{a.name}</span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        a.status === "monitoring" ? "bg-gray-400" : "bg-green-400"
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
