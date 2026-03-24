import type { ContextConfig } from "../../personalTypes";
import { personalWorkspaces, personalAgents } from "../../data/personalMock";

interface Props {
  config: ContextConfig;
  onClose: () => void;
}

export default function ContextPanel({ config, onClose }: Props) {
  const ws = config.data?.ws || personalWorkspaces[0];

  return (
    <div className="w-80 border-l border-gray-200 bg-white flex flex-col shrink-0 animate-slide-right overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between shrink-0">
        <span className="text-sm font-semibold text-gray-800">{config.title}</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {config.type === "workspace" && (
          <>
            {/* Tasks */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Задачи</div>
              {ws.tasks.map((t: any, i: number) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-800">{t.name}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        t.status === "active"
                          ? "bg-green-500"
                          : t.status === "waiting"
                            ? "bg-amber-400"
                            : "bg-blue-400"
                      }`}
                    />
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        t.status === "active"
                          ? "bg-green-400"
                          : t.status === "waiting"
                            ? "bg-amber-400"
                            : "bg-blue-400"
                      }`}
                      style={{ width: `${t.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Agents */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Агенты</div>
              {personalAgents
                .filter((a) => ["research", "doc", "analyst"].includes(a.id))
                .map((a) => (
                  <div key={a.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                    <span className="text-lg">{a.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700">{a.name}</div>
                      <div className="text-xs text-gray-400">{a.task}</div>
                    </div>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        a.status === "active"
                          ? "bg-green-500 animate-pulse-dot"
                          : a.status === "waiting"
                            ? "bg-amber-400"
                            : "bg-gray-300"
                      }`}
                    />
                  </div>
                ))}
            </div>

            {/* Documents */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Документы</div>
              {[
                { n: "supplier_database_2026.xlsx", s: "12 MB", t: "xlsx" },
                { n: "procurement_policy_v3.pdf", s: "2.1 MB", t: "pdf" },
                { n: "approved_vendors.csv", s: "340 KB", t: "csv" },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span
                    className={`px-1.5 py-0.5 rounded text-xs font-mono font-bold ${
                      d.t === "xlsx"
                        ? "bg-green-100 text-green-600"
                        : d.t === "pdf"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {d.t}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-700 truncate">{d.n}</div>
                    <div className="text-xs text-gray-400">{d.s}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Systems */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Системы</div>
              <div className="flex flex-wrap gap-1.5">
                {["1688.com", "Alibaba Supplier DB", "CRM", "ERP SAP"].map((s) => (
                  <span key={s} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {config.type === "execution" && (
          <div className="space-y-3">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Детали выполнения</div>
            <div className="p-3 bg-gray-50 rounded-xl space-y-2">
              {[
                ["Статус", "Завершено ✅"],
                ["Время", "2m 15s"],
                ["Найдено", "12 рейсов"],
                ["Подходят", "5 рейсов"],
                ["Лучший", "SU208, 24,500₽"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-gray-500">{k}</span>
                  <span className="text-gray-800 font-medium">{v}</span>
                </div>
              ))}
            </div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Источники</div>
            {["Aviasales API", "Google Flights", "Skyscanner"].map((s) => (
              <div key={s} className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-600">
                {s}
              </div>
            ))}
          </div>
        )}

        {config.type === "agent-settings" && (
          <>
            {/* Personality sliders */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Личность</div>
              {[
                { l: "Формальность", v: 30 },
                { l: "Детализация", v: 70 },
                { l: "Проактивность", v: 80 },
              ].map((s) => (
                <div key={s.l}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{s.l}</span>
                    <span className="text-gray-400">{s.v}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${s.v}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Read access */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Доступ (только чтение)
              </div>
              {["📅 Календарь", "📧 Почта", "📊 Пространства", "💬 Мессенджеры"].map((s) => (
                <div key={s} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{s}</span>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">чтение</span>
                </div>
              ))}
            </div>

            {/* Write access */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Запись</div>
              {["📋 Мои задачи", "📝 Заметки", "📄 Черновики"].map((s) => (
                <div key={s} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{s}</span>
                  <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">запись</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
