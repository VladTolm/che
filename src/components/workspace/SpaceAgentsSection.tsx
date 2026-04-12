import { Plus, Settings } from "lucide-react";
import type { WorkspaceAgent } from "../../workspaceTypes";

interface Props {
  agents: WorkspaceAgent[];
  onConfigureAgent: (agentId: string) => void;
  onCreateAgent: () => void;
}

export default function SpaceAgentsSection({ agents, onConfigureAgent, onCreateAgent }: Props) {
  // Exclude universal agent
  const configuredAgents = agents.filter((a) => a.id !== "ws-agent-universal");

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Агенты</h3>
        <button
          onClick={onCreateAgent}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Создать
        </button>
      </div>

      {configuredAgents.length === 0 ? (
        <div className="py-8 text-center bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-400 mb-3">Нет агентов. Создайте первого агента для пространства</p>
          <button
            onClick={onCreateAgent}
            className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 px-3 py-1.5 border border-gray-200 rounded-lg cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Создать
          </button>
        </div>
      ) : (
        <div className="space-y-1">
          {configuredAgents.map((agent) => (
            <div key={agent.id} className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-lg">
              <span className="text-xl shrink-0">{agent.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900">{agent.name}</p>
                <p className="text-[11px] text-gray-500 truncate">{agent.description}</p>
              </div>
              <button
                onClick={() => onConfigureAgent(agent.id)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded cursor-pointer transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                Настроить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
