import { X } from "lucide-react";
import type { WsArtifact } from "../../workspaceTypes";
import ArtifactTab from "./right/ArtifactTab";

interface Props {
  artifact: WsArtifact;
  onClose: () => void;
}

export default function ArtifactPopup({ artifact, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl flex flex-col" style={{ width: "70vw", height: "70vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="text-sm font-semibold text-gray-900">Артефакт</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <ArtifactTab artifact={artifact} />
        </div>
      </div>
    </div>
  );
}
