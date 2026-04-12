import { X } from "lucide-react";
import type { SourceDocument } from "../../workspaceTypes";
import FileIcon from "../shared/FileIcon";

interface Props {
  document: SourceDocument;
  onClose: () => void;
}

export default function DocumentPreviewPopup({ document, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl flex flex-col" style={{ width: "70vw", height: "70vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <FileIcon type={document.fileType} />
            <h2 className="text-sm font-semibold text-gray-900">{document.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content — preview placeholder */}
        <div className="flex-1 overflow-y-auto flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto">
              <FileIcon type={document.fileType} />
            </div>
            <p className="text-sm font-medium text-gray-700">{document.name}</p>
            <p className="text-xs text-gray-400">Предпросмотр документа</p>
          </div>
        </div>
      </div>
    </div>
  );
}
