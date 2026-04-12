import { Upload, X } from "lucide-react";
import type { SourceDocument } from "../../../workspaceTypes";
import FileIcon from "../../shared/FileIcon";

interface Props {
  docs: SourceDocument[];
  onToggle: (id: string) => void;
  onDocClick: (doc: SourceDocument) => void;
  readOnly: boolean;
}

export default function SourceDocumentList({ docs, onToggle, onDocClick, readOnly }: Props) {
  return (
    <div className="p-3 space-y-1">
      {docs.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-xs text-gray-400 mb-2">{readOnly ? "Нет документов" : "Загрузите документы для работы"}</p>
          {!readOnly && (
            <button className="text-xs text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 transition-colors">
              Загрузить
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="space-y-0.5">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg ${readOnly ? "" : "hover:bg-gray-50"} group transition-colors`}
              >
                <input
                  type="checkbox"
                  checked={doc.selected}
                  onChange={() => onToggle(doc.id)}
                  disabled={readOnly}
                  className={`w-3.5 h-3.5 rounded border-gray-300 text-gray-900 accent-gray-900 ${readOnly ? "opacity-60" : "cursor-pointer"}`}
                />
                <button
                  onClick={() => onDocClick(doc)}
                  className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer text-left"
                >
                  <FileIcon type={doc.fileType} />
                  <span className="flex-1 text-xs text-gray-700 truncate hover:text-gray-900 transition-colors">{doc.name}</span>
                </button>
                {doc.isArtifact && (
                  <span className="text-[9px] px-1 py-0.5 rounded bg-green-50 text-green-600 font-medium shrink-0">Артефакт</span>
                )}
                {!readOnly && (
                  <button className="opacity-0 group-hover:opacity-100 p-0.5 text-gray-300 hover:text-gray-500 transition-opacity cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {!readOnly && (
            <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 mt-2 rounded-lg border border-dashed border-gray-300 text-xs text-gray-500 hover:text-gray-700 hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" />
              Загрузить файл
            </button>
          )}
        </>
      )}
    </div>
  );
}
