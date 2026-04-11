import { X, Calendar, Mail, BarChart3, MessageSquare, ClipboardList, Pencil, FileText } from "lucide-react";
import type { ContextConfig } from "../../personalTypes";

interface Props {
  config: ContextConfig;
  onClose: () => void;
}

export default function ContextPanel({ config, onClose }: Props) {
  return (
    <div className="w-80 border-l border-gray-200 bg-white flex flex-col shrink-0 animate-slide-right overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between shrink-0">
        <span className="text-sm font-semibold text-gray-800">{config.title}</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {config.type === "execution" && (
          <div className="space-y-3">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Детали выполнения</div>
            <div className="p-3 bg-gray-50 rounded-xl space-y-2">
              {[
                ["Статус", "Завершено"],
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
                    <div className="h-full bg-gray-400 rounded-full" style={{ width: `${s.v}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Read access */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Доступ (только чтение)
              </div>
              {[
                { icon: <Calendar className="w-3.5 h-3.5" />, label: "Календарь" },
                { icon: <Mail className="w-3.5 h-3.5" />, label: "Почта" },
                { icon: <MessageSquare className="w-3.5 h-3.5" />, label: "Мессенджеры" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700 flex items-center gap-1.5">{s.icon} {s.label}</span>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">чтение</span>
                </div>
              ))}
            </div>

            {/* Write access */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Запись</div>
              {[
                { icon: <ClipboardList className="w-3.5 h-3.5" />, label: "Мои задачи" },
                { icon: <Pencil className="w-3.5 h-3.5" />, label: "Заметки" },
                { icon: <FileText className="w-3.5 h-3.5" />, label: "Черновики" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700 flex items-center gap-1.5">{s.icon} {s.label}</span>
                  <span className="text-xs text-gray-700 bg-gray-100 px-2 py-0.5 rounded">запись</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
