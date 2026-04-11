import { Bot, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  proactive?: boolean;
  time?: string;
  children: ReactNode;
}

export default function AgentMsg({ proactive, time, children }: Props) {
  return (
    <div className="flex gap-3 items-start animate-fade-in">
      <div className="w-9 h-9 rounded-full bg-gray-900 shrink-0 flex items-center justify-center text-white text-sm">
        <Bot className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-800">Персональный агент</span>
          {proactive && (
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> проактивно
            </span>
          )}
          {time && <span className="text-xs text-gray-400">{time}</span>}
        </div>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}
