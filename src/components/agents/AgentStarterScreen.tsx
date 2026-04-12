import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Search, Send, Sparkles } from "lucide-react";
import type { AgentTemplate } from "../../agentEditorTypes";
import { agentTemplates } from "../../data/agentEditorMock";

interface Props {
  workspaceName: string;
  workspaceIcon: string;
  onGenerateFromText: (description: string) => void;
  onSelectTemplate: (template: AgentTemplate) => void;
  onBack: () => void;
}

interface BuilderMessage {
  id: string;
  role: "user" | "builder";
  text: string;
}

const BUILDER_GREETING = `Привет! Я — Конструктор агентов. Опишите, какого агента вы хотите создать: чем он должен заниматься, какие задачи решать, с какими данными работать.

Я подготовлю черновик конфигурации с инструкциями, инструментами и навыками.`;

const BUILDER_REPLY = `Отлично! Я подготовил черновик конфигурации на основе вашего описания. Сейчас откроется редактор, где вы сможете уточнить настройки.`;

export default function AgentStarterScreen({
  workspaceName,
  workspaceIcon,
  onGenerateFromText,
  onSelectTemplate,
  onBack,
}: Props) {
  const [messages, setMessages] = useState<BuilderMessage[]>([
    { id: "greeting", role: "builder", text: BUILDER_GREETING },
  ]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const filteredTemplates = agentTemplates.filter(
    (t) =>
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSend() {
    const text = input.trim();
    if (!text || isGenerating) return;

    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, role: "user", text }]);
    setInput("");
    setIsGenerating(true);

    // Simulate builder agent processing
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `builder-${Date.now()}`, role: "builder", text: BUILDER_REPLY },
      ]);
      setTimeout(() => {
        onGenerateFromText(text);
      }, 800);
    }, 1200);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      {/* Header */}
      <div className="h-12 border-b border-gray-100 flex items-center px-4 gap-3 shrink-0">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-sm text-gray-500">{workspaceIcon} {workspaceName}</span>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-gray-800">Новый агент</span>
      </div>

      {/* Main content: chat left + templates right */}
      <div className="flex-1 flex overflow-hidden min-w-0 min-h-0">
        {/* Left: Builder agent chat */}
        <div className="flex-[6] flex flex-col min-w-0 min-h-0 border-r border-gray-100">
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
            <div className="max-w-xl mx-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.role === "builder" && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-100 border border-violet-200 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-violet-600" />
                      </div>
                      <div>
                        {msg.id === "greeting" && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-gray-800">Конструктор агентов</span>
                            <span className="text-[10px] font-medium text-violet-600 bg-violet-50 border border-violet-200 px-1.5 py-0.5 rounded">
                              AI
                            </span>
                          </div>
                        )}
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-lg">
                          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{msg.text}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {msg.role === "user" && (
                    <div className="flex justify-end">
                      <div className="bg-gray-900 text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-md">
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isGenerating && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 border border-violet-200 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-violet-600" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Chat input */}
          <div className="px-6 pb-4 pt-2 shrink-0">
            <div className="max-w-xl mx-auto relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isGenerating}
                placeholder="Опишите, какого агента вы хотите создать..."
                rows={1}
                className="w-full px-4 py-3 pr-12 text-sm border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isGenerating}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-violet-600 disabled:opacity-30 cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Templates */}
        <div className="flex-[4] flex flex-col min-w-0 min-h-0 bg-gray-50/50">
          <div className="px-5 pt-5 pb-3 shrink-0">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Или выберите шаблон
            </h3>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск..."
                className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-5">
            <div className="space-y-2">
              {filteredTemplates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => onSelectTemplate(tpl)}
                  className="w-full text-left p-3.5 bg-white border border-gray-100 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-lg">{tpl.icon}</span>
                    <span className="text-sm font-medium text-gray-900">{tpl.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{tpl.description}</p>
                  <div className="flex gap-1">
                    {tpl.toolIcons.map((icon, i) => (
                      <span key={i} className="text-xs bg-gray-50 rounded px-1 py-0.5">{icon}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
