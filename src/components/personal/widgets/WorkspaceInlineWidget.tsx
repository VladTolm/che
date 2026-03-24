import type { PersonalWorkspace } from "../../../personalTypes";
import { personalAgents } from "../../../data/personalMock";

interface Props {
  workspace: PersonalWorkspace;
  onOpen: () => void;
}

export default function WorkspaceInlineWidget({ workspace: ws, onOpen }: Props) {
  const agents = personalAgents.filter((a) =>
    ["research", "doc", "analyst"].includes(a.id)
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden max-w-lg animate-fade-in">
      <div className="px-4 py-2.5 bg-orange-50 border-b border-orange-100 flex items-center gap-2">
        <span
          className={`w-6 h-6 rounded-lg ${ws.color} flex items-center justify-center text-white text-xs font-bold`}
        >
          {ws.name[0]}
        </span>
        <span className="text-sm font-semibold text-gray-800">Пространство: {ws.name}</span>
      </div>
      <div className="grid grid-cols-3 gap-3 p-3">
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{ws.count}</div>
          <div className="text-xs text-gray-400">активных</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{ws.agents}</div>
          <div className="text-xs text-gray-400">агентов</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">{ws.done}</div>
          <div className="text-xs text-gray-400">завершено</div>
        </div>
      </div>
      <div className="border-t border-gray-100">
        {ws.tasks.map((t, i) => (
          <div key={i} className="px-4 py-2 flex items-center gap-3 border-b border-gray-50 last:border-0">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                t.status === "active"
                  ? "bg-green-500"
                  : t.status === "waiting"
                    ? "bg-amber-400"
                    : "bg-blue-400"
              }`}
            />
            <span className="text-sm text-gray-700 flex-1">{t.name}</span>
            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  t.status === "active"
                    ? "bg-green-400"
                    : t.status === "waiting"
                      ? "bg-amber-400"
                      : "bg-blue-400"
                }`}
                style={{ width: `${t.progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-8 text-right">{t.progress}%</span>
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {agents.map((a) => (
              <div
                key={a.id}
                className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs border border-white"
              >
                {a.icon}
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-400">{agents.length} агентов</span>
        </div>
        <button
          onClick={onOpen}
          className="text-xs text-indigo-600 hover:text-indigo-700 cursor-pointer font-medium"
        >
          Подробнее →
        </button>
      </div>
    </div>
  );
}
