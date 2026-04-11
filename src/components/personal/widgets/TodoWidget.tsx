import { ClipboardList } from "lucide-react";
import type { TodoItem } from "../../../personalTypes";
import { PRIORITY_COLORS } from "../../../personalTypes";

interface Props {
  todos: TodoItem[];
}

export default function TodoWidget({ todos }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden max-w-lg animate-fade-in">
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
          <ClipboardList className="w-4 h-4 text-gray-500" /> Мои задачи
        </span>
        <span className="text-xs text-gray-400">{todos.length} задач</span>
      </div>
      <div className="py-1">
        {todos.map((t) => (
          <div key={t.id} className="px-4 py-2 flex items-center gap-2.5 hover:bg-gray-50 cursor-pointer">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${PRIORITY_COLORS[t.priority]}`} />
            <span className="text-sm text-gray-800 flex-1">{t.title}</span>
            {t.deadline && <span className="text-xs text-gray-400 shrink-0">{t.deadline}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
