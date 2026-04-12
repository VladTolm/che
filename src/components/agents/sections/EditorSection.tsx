import type { ReactNode } from "react";

interface Props {
  title: string;
  actions?: ReactNode;
  placeholder?: string;
  isEmpty: boolean;
  children: ReactNode;
}

export default function EditorSection({ title, actions, placeholder, isEmpty, children }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{title}</h3>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {isEmpty ? (
        <p className="text-sm text-gray-400 py-4">{placeholder}</p>
      ) : (
        children
      )}
    </div>
  );
}
