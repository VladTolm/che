import { useState } from "react";
import type { Agent } from "../../types";
import { ShoppingCart, BarChart3, Users, Scale, ArrowRight, ArrowLeftRight, RefreshCw, Crown, Bot, ArrowLeft, X, Check } from "lucide-react";

interface Props {
  agents: Agent[];
  onClose: () => void;
}

const teamTemplates = [
  { id: "procurement", icon: ShoppingCart, name: "Закупочная бригада", agents: ["research", "analyst", "doc", "legal"] },
  { id: "analytics", icon: BarChart3, name: "Аналитический отдел", agents: ["research", "analyst", "comms"] },
  { id: "hr", icon: Users, name: "HR-бюро", agents: ["hr", "research", "comms"] },
  { id: "legal", icon: Scale, name: "Юридический штаб", agents: ["legal", "research", "doc"] },
];

const collaborationModes = [
  { id: "sequential" as const, icon: ArrowRight, name: "Последовательно", desc: "Цепочка: каждый передаёт результат следующему. Предсказуемо, медленнее." },
  { id: "parallel" as const, name: "Параллельно", icon: ArrowLeftRight, desc: "Одновременная работа, лидер агрегирует. Быстро, требует координации." },
  { id: "debate" as const, icon: RefreshCw, name: "Дебаты", desc: "Агенты критикуют результаты друг друга. Глубоко, подходит для исследований." },
];

const autonomyLevels = [
  { id: "auto" as const, label: "Полная", desc: "Работают самостоятельно, уведомляют по завершении" },
  { id: "confirm" as const, label: "Контрольные точки", desc: "Запрашивают подтверждение на ключевых этапах" },
  { id: "manual" as const, label: "Ручная", desc: "Каждый шаг требует одобрения" },
];

export default function CreateAITeamModal({ agents, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [teamName, setTeamName] = useState("");
  const [goal, setGoal] = useState("");
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [leader, setLeader] = useState<string | null>(null);
  const [collaboration, setCollaboration] = useState<"sequential" | "parallel" | "debate">("sequential");
  const [autonomy, setAutonomy] = useState<"auto" | "confirm" | "manual">("confirm");

  const steps = ["Миссия", "Состав", "Иерархия", "Взаимодействие"];
  const selectedAgentObjects = agents.filter((a) => selectedAgents.includes(a.id));

  function toggleAgent(id: string) {
    setSelectedAgents((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  function applyTemplate(tpl: typeof teamTemplates[0]) {
    setTeamName(tpl.name);
    setSelectedAgents(tpl.agents);
  }

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <div className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">Название команды</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Например: Аналитическая группа"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-400/30 focus:border-gray-400"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">Цель / миссия</label>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Какую задачу решает эта команда?"
                rows={2}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-400/30 focus:border-gray-400 resize-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Шаблоны команд</label>
              <div className="grid grid-cols-2 gap-2">
                {teamTemplates.map((tpl) => {
                  const Icon = tpl.icon;
                  return (
                    <button
                      key={tpl.id}
                      onClick={() => applyTemplate(tpl)}
                      className="p-3 rounded-xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-left transition-all"
                    >
                      <Icon className="w-5 h-5 text-gray-500" />
                      <p className="text-xs font-semibold text-gray-700 mt-1">{tpl.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{tpl.agents.length} агентов</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-3">
            {agents.map((agent) => {
              const isSelected = selectedAgents.includes(agent.id);
              return (
                <button
                  key={agent.id}
                  onClick={() => toggleAgent(agent.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    isSelected ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? "border-gray-900 bg-gray-900" : "border-gray-300"
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <Bot className="w-5 h-5 text-gray-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{agent.name}</p>
                    <p className="text-xs text-gray-500">{agent.desc}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {agent.skills.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-500">{s}</span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
            {selectedAgents.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mt-3">
                <p className="text-xs text-gray-700 font-semibold">
                  Выбрано: {selectedAgents.length} агентов — {selectedAgentObjects.map((a) => a.name).join(", ")}
                </p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Выберите лидера команды:</p>
            <div className="space-y-2">
              {selectedAgentObjects.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setLeader(agent.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    leader === agent.id ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Bot className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-800">{agent.name}</span>
                  {leader === agent.id && <Crown className="w-4 h-4 ml-auto text-gray-900" />}
                </button>
              ))}
            </div>

            {/* Hierarchy diagram */}
            {leader && (
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex flex-col items-center">
                  <div className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    {agents.find((a) => a.id === leader)?.name}
                  </div>
                  <div className="w-0.5 h-6 bg-gray-300" />
                  <div className="flex items-start gap-4">
                    {selectedAgentObjects.filter((a) => a.id !== leader).map((agent) => (
                      <div key={agent.id} className="flex flex-col items-center">
                        <div className="w-0.5 h-4 bg-gray-300" />
                        <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5 text-gray-500" />
                          {agent.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            {/* Collaboration mode */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Режим взаимодействия</label>
              <div className="space-y-2">
                {collaborationModes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setCollaboration(mode.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                        collaboration === mode.id ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-gray-500 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{mode.name}</p>
                        <p className="text-xs text-gray-500">{mode.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Autonomy */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Уровень автономии</label>
              <div className="flex gap-2">
                {autonomyLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setAutonomy(level.id)}
                    className={`flex-1 p-3 rounded-xl border text-center transition-all ${
                      autonomy === level.id ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="text-sm font-semibold text-gray-800">{level.label}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{level.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Сводка</h4>
              <div className="space-y-1.5 text-sm text-gray-700">
                <p><span className="text-gray-400">Команда:</span> {teamName || "—"}</p>
                <p><span className="text-gray-400">Агентов:</span> {selectedAgents.length}</p>
                <p><span className="text-gray-400">Лидер:</span> {leader ? agents.find((a) => a.id === leader)?.name : "—"}</p>
                <p><span className="text-gray-400">Режим:</span> {collaborationModes.find((m) => m.id === collaboration)?.name}</p>
                <p><span className="text-gray-400">Автономия:</span> {autonomyLevels.find((l) => l.id === autonomy)?.label}</p>
              </div>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col animate-modal-enter">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-bold text-gray-900">Создать AI-команду</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 px-6 py-4 shrink-0">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 ${i <= step ? "text-gray-900" : "text-gray-400"}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i <= step ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {i < step ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <span className="text-xs font-medium">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 h-0.5 ${i < step ? "bg-gray-900" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              step === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            }`}
            disabled={step === 0}
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </button>
          {step < 3 ? (
            <button
              onClick={() => setStep((s) => Math.min(3, s + 1))}
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Далее
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors">
              <Bot className="w-4 h-4" />
              Создать AI-команду
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
