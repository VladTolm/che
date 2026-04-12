import { useRef, useState, useEffect } from "react";
import type { WorkspaceAgent } from "../../workspaceTypes";

interface Props {
  agents: WorkspaceAgent[];
  selectedAgentId: string;
  onSelectAgent: (agent: WorkspaceAgent) => void;
}

export default function AgentSwitcher({ agents, selectedAgentId, onSelectAgent }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => setHasOverflow(el.scrollWidth > el.clientWidth + 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [agents]);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1"
      >
        {agents.map((agent) => {
          const isSelected = agent.id === selectedAgentId;
          return (
            <button
              key={agent.id}
              onClick={() => onSelectAgent(agent)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                isSelected
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span className="text-sm">{agent.icon}</span>
              <span>{agent.name}</span>
            </button>
          );
        })}
      </div>
      {hasOverflow && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none flex items-center justify-end pr-1">
          <span className="text-gray-400 text-xs pointer-events-none">›</span>
        </div>
      )}
    </div>
  );
}
