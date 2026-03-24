import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function AutoRunCard({ title, children }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden max-w-lg animate-fade-in">
      <div className="px-4 py-2.5 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
        <span className="text-sm font-semibold text-amber-700">{title}</span>
        <span className="px-1.5 py-0.5 bg-amber-200 text-amber-700 rounded text-xs">авто</span>
      </div>
      <div className="px-4 py-3 space-y-1.5 text-sm text-gray-700">{children}</div>
    </div>
  );
}
