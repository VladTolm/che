import { Bot, Wrench, Zap, Users } from "lucide-react";
import type { AgentEditorConfig } from "../../agentEditorTypes";
import type { WorkspaceChatMessage } from "../../workspaceTypes";
import WorkspaceChatInput from "../workspace/chat/WorkspaceChatInput";

interface Props {
  config: AgentEditorConfig;
  messages: WorkspaceChatMessage[];
  input: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
}

export default function AgentTestChat({ config, messages, input, onInputChange, onSend }: Props) {
  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      {/* Message feed */}
      <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Welcome card — always shown at top */}
          {messages.length === 0 && (
            <div className="flex items-center justify-center py-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-lg w-full shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl">
                    {config.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{config.name}</h3>
                    <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                      Режим тестирования
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-4 leading-relaxed">{config.description}</p>

                <div className="space-y-2.5">
                  {config.tools.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Wrench className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Инструменты</p>
                        <p className="text-xs text-gray-600">
                          {config.tools.map((t) => t.name).join(", ")}
                        </p>
                      </div>
                    </div>
                  )}

                  {config.skills.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Zap className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Навыки</p>
                        <p className="text-xs text-gray-600">
                          {config.skills.map((s) => s.name).join(", ")}
                        </p>
                      </div>
                    </div>
                  )}

                  {config.subAgents.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Users className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Под-агенты</p>
                        <p className="text-xs text-gray-600">
                          {config.subAgents.map((s) => s.name).join(", ")}
                        </p>
                      </div>
                    </div>
                  )}

                  {config.tools.length === 0 && config.skills.length === 0 && config.subAgents.length === 0 && (
                    <div className="flex items-center gap-2">
                      <Bot className="w-3.5 h-3.5 text-gray-400" />
                      <p className="text-xs text-gray-400">Нет подключённых инструментов или навыков</p>
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100">
                  Отправьте сообщение, чтобы протестировать работу агента с текущей конфигурацией.
                </p>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "user" && (
                <div className="flex justify-end">
                  <div className="bg-gray-900 text-white rounded-2xl rounded-br-sm px-4 py-2.5 max-w-md">
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className="text-[10px] text-gray-400 mt-1 text-right">{msg.timestamp}</p>
                  </div>
                </div>
              )}
              {msg.role === "model" && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-lg">
                    <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                    <span className="text-[10px] text-gray-300 mt-1 block">{msg.timestamp}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <WorkspaceChatInput
        input={input}
        onInputChange={onInputChange}
        onSend={onSend}
        activeAgent={null}
        skills={[]}
        workspaceName={config.workspaceName}
      />
    </div>
  );
}
