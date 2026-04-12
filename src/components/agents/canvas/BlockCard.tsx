import type { ReactNode } from "react";

interface Props {
  title?: string;
  actions?: ReactNode;
  dotSide?: "left" | "right" | "none";
  className?: string;
  children: ReactNode;
}

export default function BlockCard({ title, actions, dotSide = "none", className = "", children }: Props) {
  return (
    <div className={`relative bg-white rounded-xl border border-gray-200 shadow-sm w-[280px] ${className}`}>
      {/* Connection dot */}
      {dotSide === "left" && (
        <div className="absolute top-1/2 -left-[6px] -translate-y-1/2 w-3 h-3 rounded-full bg-gray-800 border-2 border-white" />
      )}
      {dotSide === "right" && (
        <div className="absolute top-1/2 -right-[6px] -translate-y-1/2 w-3 h-3 rounded-full bg-gray-800 border-2 border-white" />
      )}

      {/* Header */}
      {title && (
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{title}</span>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {/* Body */}
      <div className="px-4 pb-3">{children}</div>
    </div>
  );
}
