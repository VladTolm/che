import { useState } from "react";
import { Download, FolderInput, BookOpen } from "lucide-react";
import type { WsArtifact, KnowledgeBase } from "../../../workspaceTypes";
import { knowledgeBases } from "../../../data/workspaceMock";

interface Props {
  artifact: WsArtifact | null;
}

export default function ArtifactTab({ artifact }: Props) {
  const [showKbList, setShowKbList] = useState(false);
  const [savedToKb, setSavedToKb] = useState<string | null>(null);

  if (!artifact) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-xs text-gray-400 text-center">Артефакт появится после выполнения задачи</p>
      </div>
    );
  }

  function handleSaveToKb(kb: KnowledgeBase) {
    if (!kb.hasWriteAccess) return;
    setSavedToKb(kb.name);
    setShowKbList(false);
  }

  return (
    <div className="p-4 space-y-4">
      {/* Name */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Артефакт</p>
        <p className="text-xs font-medium text-gray-800">{artifact.name}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">Создан в {artifact.generatedAt}</p>
      </div>

      {/* Preview */}
      <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 max-h-64 overflow-y-auto">
        <pre className="text-[11px] text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
          {artifact.content}
        </pre>
      </div>

      {/* Actions */}
      <div className="space-y-1.5">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-700 font-medium cursor-pointer hover:bg-gray-50 transition-colors">
          <FolderInput className="w-3.5 h-3.5" /> Сохранить в документы пространства
        </button>

        <div className="relative">
          <button
            onClick={() => setShowKbList((v) => !v)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-700 font-medium cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" /> Сохранить в базу знаний
          </button>

          {showKbList && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              {knowledgeBases.map((kb) => (
                <button
                  key={kb.id}
                  onClick={() => handleSaveToKb(kb)}
                  disabled={!kb.hasWriteAccess}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors ${
                    kb.hasWriteAccess
                      ? "text-gray-700 hover:bg-gray-50 cursor-pointer"
                      : "text-gray-300 cursor-not-allowed"
                  }`}
                  title={!kb.hasWriteAccess ? "Нет прав на редактирование базы знаний" : undefined}
                >
                  <span>{kb.icon}</span>
                  <span>{kb.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {savedToKb && (
          <p className="text-[10px] text-green-600 px-1">Сохранено в {savedToKb}</p>
        )}

        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-700 font-medium cursor-pointer hover:bg-gray-50 transition-colors">
          <Download className="w-3.5 h-3.5" /> Скачать
        </button>
      </div>
    </div>
  );
}
