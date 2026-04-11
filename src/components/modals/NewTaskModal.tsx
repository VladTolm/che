import { useState } from "react";
import { ClipboardList, Search, FileText, BarChart3, Scale, Mail, Rocket, X } from "lucide-react";

interface Props {
  onClose: () => void;
}

const templates = [
  { id: "free", icon: ClipboardList, label: "Свободная задача" },
  { id: "research", icon: Search, label: "Ресёрч" },
  { id: "doc", icon: FileText, label: "Документ" },
  { id: "analysis", icon: BarChart3, label: "Анализ" },
  { id: "approval", icon: Scale, label: "Согласование" },
  { id: "comms", icon: Mail, label: "Коммуникация" },
];

export default function NewTaskModal({ onClose }: Props) {
  const [selected, setSelected] = useState("free");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-xl max-h-[80vh] overflow-y-auto animate-modal-enter">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Новая задача</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Template selector */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Тип задачи</label>
            <div className="grid grid-cols-3 gap-2">
              {templates.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelected(t.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selected === t.id
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-5 h-5 text-gray-500 mb-1" />
                    <span className="text-xs font-semibold text-gray-700">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Название</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название задачи..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-400/30 focus:border-gray-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Описание</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Опишите задачу подробнее..."
              rows={3}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-400/30 focus:border-gray-400 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm rounded-xl transition-colors">
            <Rocket className="w-4 h-4" />
            Запустить
          </button>
        </div>
      </div>
    </div>
  );
}
