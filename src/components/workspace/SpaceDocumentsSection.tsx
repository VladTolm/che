import { Plus, Trash2 } from "lucide-react";
import type { SpaceDocument } from "../../workspaceTypes";
import FileIcon from "../shared/FileIcon";

interface Props {
  documents: SpaceDocument[];
  onAddDocument: () => void;
  onDeleteDocument: (id: string) => void;
}

export default function SpaceDocumentsSection({ documents, onAddDocument, onDeleteDocument }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Документы</h3>
        <button
          onClick={onAddDocument}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Добавить
        </button>
      </div>

      {documents.length === 0 ? (
        <div className="py-8 text-center text-sm text-gray-400 bg-gray-50 rounded-lg">
          Нет документов. Добавьте файлы, которые агент будет использовать в каждой сессии
        </div>
      ) : (
        <>
          <div className="space-y-1">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-lg group">
                <FileIcon type={doc.fileType} />
                <span className="text-xs text-gray-700 flex-1 truncate">{doc.name}</span>
                <span className="text-[10px] text-gray-400">{doc.uploadedAt}</span>
                <button
                  onClick={() => onDeleteDocument(doc.id)}
                  className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Эти документы автоматически попадают в контекст каждой новой сессии в пространстве
          </p>
        </>
      )}
    </div>
  );
}
