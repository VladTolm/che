import { ArrowLeft, PanelRightClose, PanelRightOpen } from "lucide-react";
import type { Workspace, WorkspaceAgent } from "../../workspaceTypes";

interface Props {
  workspace: Workspace;
  sessionName?: string;
  activeAgent?: WorkspaceAgent | null;
  onBack?: () => void;
  rightOpen: boolean;
  onToggleRight: () => void;
}

export default function WorkspaceTopBar({ workspace, sessionName, activeAgent, onBack, rightOpen, onToggleRight }: Props) {
  return (
    <div className="h-10 bg-white border-b border-gray-100 px-4 flex items-center justify-between shrink-0">
      {/* Left: back + session info */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        )}
        {sessionName && (
          <span className="text-xs text-gray-500">{sessionName}</span>
        )}
        {!sessionName && (
          <span className="text-xs text-gray-400">Новая задача</span>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {activeAgent && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-full text-xs text-gray-600">
            <span className="text-sm">{activeAgent.icon}</span>
            {activeAgent.name}
          </span>
        )}
        <button onClick={onToggleRight} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">
          {rightOpen ? <PanelRightClose className="w-3.5 h-3.5" /> : <PanelRightOpen className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
