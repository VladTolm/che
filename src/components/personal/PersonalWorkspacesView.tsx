import { Plus } from "lucide-react";
import type { PersonalWorkspace, ContextConfig } from "../../personalTypes";

interface Props {
  workspaces: PersonalWorkspace[];
  onSelectWorkspace: (config: ContextConfig) => void;
}

export default function PersonalWorkspacesView({ workspaces, onSelectWorkspace }: Props) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: "#fafafa" }}>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {workspaces.map((ws) => (
            <div
              key={ws.id}
              onClick={() =>
                onSelectWorkspace({
                  type: "workspace",
                  title: ws.name,
                  data: { ws },
                })
              }
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-300 transition-colors cursor-pointer"
            >
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${ws.color} flex items-center justify-center text-white text-lg font-bold`}
                  >
                    {ws.name[0]}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-gray-900">{ws.name}</div>
                    <div className="text-xs text-gray-500">{ws.desc}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <div className="text-lg font-bold text-green-600">{ws.count}</div>
                    <div className="text-xs text-gray-400">активных</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">{ws.agents}</div>
                    <div className="text-xs text-gray-400">агентов</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">{ws.done}</div>
                    <div className="text-xs text-gray-400">завершено</div>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100">
                {ws.tasks.slice(0, 2).map((t, i) => (
                  <div
                    key={i}
                    className="px-5 py-2 flex items-center gap-3 border-b border-gray-50 last:border-0"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        t.status === "active"
                          ? "bg-green-500"
                          : t.status === "waiting"
                            ? "bg-amber-400"
                            : "bg-blue-400"
                      }`}
                    />
                    <span className="text-sm text-gray-700 flex-1">{t.name}</span>
                    <span className="text-xs text-gray-400">{t.progress}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* Add workspace */}
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center p-8 hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="text-center">
              <Plus className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <div className="text-sm text-gray-400">Создать пространство</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
