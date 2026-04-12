import { FileText } from "lucide-react";

interface Props {
  docsCount: number;
}

export default function ContextCounter({ docsCount }: Props) {
  return (
    <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 shrink-0">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <FileText className="w-3.5 h-3.5" />
        {docsCount === 0 ? (
          <span>Контекст пуст</span>
        ) : (
          <span>В контексте: {docsCount} документов</span>
        )}
      </div>
    </div>
  );
}
