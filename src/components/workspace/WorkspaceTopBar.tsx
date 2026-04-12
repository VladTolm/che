import { ArrowLeft, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from "lucide-react";
import type { Workspace, WorkspaceAgent } from "../../workspaceTypes";

interface Props {
  workspace: Workspace;
  sessionName?: string;
  activeAgent?: WorkspaceAgent | null;
  onBack?: () => void;
  leftOpen: boolean;
  rightOpen: boolean;
  onToggleLeft: () => void;
  onToggleRight: () => void;
}

export default function WorkspaceTopBar({ workspace, sessionName, activeAgent, onBack, leftOpen, rightOpen, onToggleLeft, onToggleRight }: Props) {
  return (
    <div className="h-12 bg-white border-b border-gray-100 px-4 flex items-center justify-between shrink-0">
      {/* Left: toggle + workspace info */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <button onClick={onToggleLeft} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">
          {leftOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
        </button>
        <span className="text-base">{workspace.icon}</span>
        <span className="text-sm font-semibold text-gray-800">{workspace.name}</span>
        {sessionName && (
          <>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-500">{sessionName}</span>
          </>
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
        <button onClick={onToggleRight} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">
          {rightOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
