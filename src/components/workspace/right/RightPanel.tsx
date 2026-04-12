import type { WorkspaceSkill, WsExecution } from "../../../workspaceTypes";
import ExecutionTab from "./ExecutionTab";

interface Props {
  execution: WsExecution;
  skills: WorkspaceSkill[];
  width?: number;
}

export default function RightPanel({ execution, skills, width = 288 }: Props) {
  return (
    <div className="bg-white flex flex-col shrink-0 animate-slide-right" style={{ width, minWidth: width, maxWidth: width }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100 shrink-0">
        <p className="text-xs font-semibold text-gray-800">Исполнение</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <ExecutionTab execution={execution} skills={skills} />
      </div>
    </div>
  );
}
