import { ShieldX, Mail, Paperclip, ClipboardList } from "lucide-react";

export default function BlockedCard() {
  const options = [
    { icon: <Mail className="w-3.5 h-3.5" />, label: "Подготовить черновик письма" },
    { icon: <Paperclip className="w-3.5 h-3.5" />, label: "Прикрепить актуальный прайс" },
    { icon: <ClipboardList className="w-3.5 h-3.5" />, label: "Добавить в задачи" },
  ];

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in max-w-lg">
      <div className="text-sm font-medium text-red-700 mb-1.5 flex items-center gap-1.5">
        <ShieldX className="w-4 h-4" /> За пределами полномочий
      </div>
      <div className="text-sm text-red-600 mb-3">
        Я не могу отправлять письма напрямую. Но я могу:
      </div>
      <div className="space-y-1.5">
        {options.map((option, i) => (
          <button
            key={i}
            className="w-full text-left px-3 py-2 bg-white border border-red-100 rounded-lg text-sm text-gray-700 hover:bg-red-50 cursor-pointer flex items-center gap-2"
          >
            {option.icon} {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
