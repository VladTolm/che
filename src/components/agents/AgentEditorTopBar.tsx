import { useState } from "react";
import { ArrowLeft, ChevronDown, MessageSquare, X } from "lucide-react";
import type { AgentEditorConfig } from "../../agentEditorTypes";
import { agentVersionHistory } from "../../data/agentEditorMock";

interface Props {
  config: AgentEditorConfig;
  currentVersion: number;
  hasUnsavedChanges: boolean;
  showChat: boolean;
  onBack: () => void;
  onSave: () => void;
  onToggleChat: () => void;
}

export default function AgentEditorTopBar({
  config,
  currentVersion,
  hasUnsavedChanges,
  showChat,
  onBack,
  onSave,
  onToggleChat,
}: Props) {
  const [showVersions, setShowVersions] = useState(false);

  return (
    <div className="h-12 bg-white border-b border-gray-100 px-4 flex items-center justify-between shrink-0 relative">
      {/* Left: back + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-base">{config.workspaceIcon}</span>
        <span className="text-sm text-gray-400">{config.workspaceName}</span>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-semibold text-gray-800">{config.name}</span>
      </div>

      {/* Center: version selector */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <button
          onClick={() => setShowVersions(!showVersions)}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-600 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
        >
          v{currentVersion}
          <ChevronDown className="w-3 h-3" />
        </button>

        {/* Version dropdown */}
        {showVersions && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setShowVersions(false)} />
            <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-40">
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-700">История версий</span>
                <button onClick={() => setShowVersions(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="py-1">
                {agentVersionHistory.map((v) => (
                  <div
                    key={v.version}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${v.version === currentVersion ? "bg-gray-900" : "bg-transparent"}`} />
                    <span className="text-xs font-medium text-gray-800">v{v.version}</span>
                    <span className="text-[11px] text-gray-400 flex-1">{v.timestamp}</span>
                    {v.label && (
                      <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        {v.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right: save + test */}
      <div className="flex items-center gap-2">
        <button
          onClick={onSave}
          className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            hasUnsavedChanges
              ? "text-white bg-gray-900 hover:bg-gray-800"
              : "text-gray-400 bg-gray-100"
          }`}
        >
          Сохранить
          {hasUnsavedChanges && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-400 rounded-full" />
          )}
        </button>
        <button
          onClick={onToggleChat}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            showChat
              ? "text-gray-900 bg-gray-100"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Тест
        </button>
      </div>
    </div>
  );
}
