import { RefreshCw } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function AutoRunCard({ title, children }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden max-w-lg animate-fade-in">
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
        <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
        <span className="text-sm font-semibold text-gray-700">{title}</span>
        <span className="px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">авто</span>
      </div>
      <div className="px-4 py-3 space-y-1.5 text-sm text-gray-700">{children}</div>
    </div>
  );
}
