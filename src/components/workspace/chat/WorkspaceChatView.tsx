import { FileText } from "lucide-react";
import type { WorkspaceChatMessage, WorkspaceSkill, SourceDocument, WorkspaceAgent, WsWaitingReason, WsArtifact } from "../../../workspaceTypes";
import WorkspaceChatInput from "./WorkspaceChatInput";
import WaitingCard from "./WaitingCard";

interface Props {
  messages: WorkspaceChatMessage[];
  input: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
  activeAgent: WorkspaceAgent | null;
  skills: WorkspaceSkill[];
  selectedDocs: SourceDocument[];
  workspaceName: string;
  artifacts?: WsArtifact[];
  onOpenArtifact: (artifactId: string) => void;
  waitingReason?: WsWaitingReason | null;
  onContinue?: () => void;
  onEndSession?: () => void;
}

export default function WorkspaceChatView({ messages, input, onInputChange, onSend, activeAgent, skills, selectedDocs, workspaceName, artifacts, onOpenArtifact, waitingReason, onContinue, onEndSession }: Props) {
  const hasContext = selectedDocs.length > 0;

  function getArtifactName(artifactId: string): string {
    const found = artifacts?.find((a) => a.id === artifactId);
    return found?.name ?? "Артефакт";
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      {/* Agent header */}
      {activeAgent && (
        <div className="px-6 py-4 border-b border-gray-100 bg-white shrink-0">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <span className="text-2xl">{activeAgent.icon}</span>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{activeAgent.name}</h2>
              <p className="text-xs text-gray-500">{activeAgent.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Message feed */}
      <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm text-gray-400">Опишите задачу, чтобы начать работу</p>
            </div>
          )}
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "system" && (
                <div className="text-center">
                  <span className="inline-block text-xs text-gray-400 bg-gray-50 rounded-full px-3 py-1">
                    {msg.text}
                  </span>
                </div>
              )}
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
                    <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {renderMarkdownSimple(msg.text)}
                    </div>
                    {msg.artifactId && (
                      <button
                        onClick={() => onOpenArtifact(msg.artifactId!)}
                        className="mt-2 w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-800 truncate">{getArtifactName(msg.artifactId)}</p>
                          <p className="text-[10px] text-gray-400">Открыть артефакт</p>
                        </div>
                      </button>
                    )}
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                      <button className="text-[10px] text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">Скопировать</button>
                      <button className="text-[10px] text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">Сохранить как артефакт</button>
                      <span className="text-[10px] text-gray-300 ml-auto">{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Waiting card */}
          {waitingReason && onContinue && onEndSession && (
            <WaitingCard reason={waitingReason} onContinue={onContinue} onEndSession={onEndSession} />
          )}
        </div>
      </div>

      {/* Context bar — selected documents */}
      {hasContext && (
        <div className="px-6 py-2 border-t border-gray-100 bg-gray-50/50 shrink-0">
          <div className="max-w-2xl mx-auto flex items-center gap-1.5 overflow-x-auto">
            {selectedDocs.map((doc) => (
              <span key={doc.id} className="inline-flex items-center text-[10px] text-gray-500 bg-white border border-gray-200 rounded px-2 py-0.5 shrink-0">
                {doc.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <WorkspaceChatInput
        input={input}
        onInputChange={onInputChange}
        onSend={onSend}
        activeAgent={activeAgent}
        skills={skills}
        workspaceName={workspaceName}
        placeholderOverride={waitingReason ? "Ответьте агенту или нажмите Продолжить" : undefined}
      />
    </div>
  );
}

function renderMarkdownSimple(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
