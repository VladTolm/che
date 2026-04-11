import { Mail } from "lucide-react";
import type { MailItem } from "../../../personalTypes";

interface Props {
  mails: MailItem[];
}

export default function MailWidget({ mails }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden max-w-lg animate-fade-in">
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
          <Mail className="w-4 h-4 text-gray-500" /> Почта — 3 требуют ответа
        </span>
        <span className="text-xs text-gray-400">12 новых</span>
      </div>
      {mails.map((m, i) => (
        <div
          key={i}
          className="px-4 py-2.5 flex items-center gap-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex-1 min-w-0">
            <span className="text-sm font-semibold text-gray-800">{m.from}: </span>
            <span className="text-sm text-gray-600">{m.subject}</span>
          </div>
          {m.hasDraft && (
            <button className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium cursor-pointer hover:bg-gray-200 shrink-0">
              Черновик
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
