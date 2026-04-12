import { useState } from "react";
import { Settings } from "lucide-react";
import type { WorkspaceAgent } from "../../../workspaceTypes";

interface Props {
  agents: WorkspaceAgent[];
  activeAgent: WorkspaceAgent | null;
  onSelectAgent: (agent: WorkspaceAgent | null) => void;
  onConfigureAgent?: (agent: WorkspaceAgent) => void;
}

export default function AgentsSkillsTab({ agents, activeAgent, onSelectAgent, onConfigureAgent }: Props) {
  const [agentsCollapsed, setAgentsCollapsed] = useState(false);

  function handleSelectAgent(agent: WorkspaceAgent | null) {
    onSelectAgent(agent);
    setAgentsCollapsed(agent !== null);
  }

  return (
    <div className="p-4 space-y-4">
      {/* New session entry points */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Новая сессия</p>

        {/* Universal agent (default) */}
        <button
          onClick={() => handleSelectAgent(null)}
          className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer ${
            !activeAgent
              ? "bg-gray-100 text-gray-900 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="flex-1">Универсальный агент</span>
            <span className="text-[9px] text-gray-400 bg-gray-200/60 rounded px-1.5 py-0.5">по умолчанию</span>
          </div>
          {!activeAgent && (
            <p className="text-[10px] text-gray-400 mt-0.5">Начните с задачи или /навыка</p>
          )}
        </button>
      </div>

      {/* Preconfigured agents */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Преднастроенные агенты</p>

        {activeAgent && agentsCollapsed ? (
          // Collapsed: show only active agent + "Сменить" button
          <div>
            <div className="px-3 py-2.5 rounded-lg bg-gray-900 text-white">
              <div className="flex items-center gap-2">
                <span className="text-sm">{activeAgent.icon}</span>
                <span className="text-xs font-medium flex-1">{activeAgent.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              </div>
              <p className="text-[10px] text-gray-300 mt-0.5 ml-6">{activeAgent.description}</p>
            </div>
            <button
              onClick={() => setAgentsCollapsed(false)}
              className="w-full text-center text-[10px] text-gray-400 hover:text-gray-600 mt-1.5 py-1 cursor-pointer transition-colors"
            >
              Сменить
            </button>
          </div>
        ) : (
          // Expanded: show all agents
          <div className="space-y-1">
            {agents.map((agent) => {
              const isActive = activeAgent?.id === agent.id;
              return (
                <div key={agent.id} className="relative group">
                  <button
                    onClick={() => handleSelectAgent(isActive ? null : agent)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{agent.icon}</span>
                      <span className="text-xs font-medium flex-1">{agent.name}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      )}
                    </div>
                    <p className={`text-[10px] mt-0.5 ml-6 ${isActive ? "text-gray-300" : "text-gray-400"}`}>
                      {agent.description}
                    </p>
                  </button>
                  <button
                    className={`absolute top-2 right-2 flex items-center gap-1 px-1.5 py-1 rounded text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${
                      isActive
                        ? "text-gray-300 hover:text-white hover:bg-white/10"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={(e) => { e.stopPropagation(); onConfigureAgent?.(agent); }}
                  >
                    <Settings className="w-3 h-3" />
                    Настроить
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
