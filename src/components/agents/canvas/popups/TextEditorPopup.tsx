import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  title: string;
  initialValue?: string;
  showNameField?: boolean;
  initialName?: string;
  onSave: (value: string, name?: string) => void;
  onClose: () => void;
  subtitle?: string;
}

export default function TextEditorPopup({ title, initialValue = "", showNameField = false, initialName = "", onSave, onClose, subtitle }: Props) {
  const [value, setValue] = useState(initialValue);
  const [name, setName] = useState(initialName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-modal-enter">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {showNameField && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Название навыка..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-400/30 focus:border-gray-400"
            />
          )}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите текст..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:ring-2 focus:ring-gray-400/30 focus:border-gray-400 resize-none"
            style={{ minHeight: "40vh" }}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(value, showNameField ? name : undefined)}
            className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 cursor-pointer transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
