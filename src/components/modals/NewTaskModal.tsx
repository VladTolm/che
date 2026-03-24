import { useState } from "react";

interface Props {
  onClose: () => void;
}

const templates = [
  { id: "free", icon: "📋", label: "Свободная задача" },
  { id: "research", icon: "🔍", label: "Ресёрч" },
  { id: "doc", icon: "📄", label: "Документ" },
  { id: "analysis", icon: "📊", label: "Анализ" },
  { id: "approval", icon: "⚖️", label: "Согласование" },
  { id: "comms", icon: "📧", label: "Коммуникация" },
];

export default function NewTaskModal({ onClose }: Props) {
  const [selected, setSelected] = useState("free");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[80vh] overflow-y-auto animate-modal-enter">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Новая задача</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Template selector */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Тип задачи</label>
            <div className="grid grid-cols-3 gap-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selected === t.id
                      ? "border-orange-400 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-xl block mb-1">{t.icon}</span>
                  <span className="text-xs font-semibold text-gray-700">{t.label}</span>
                </button>
              ))}
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
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-300"
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
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-300 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <button className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-xl transition-colors">
            🚀 Запустить
          </button>
        </div>
      </div>
    </div>
  );
}
