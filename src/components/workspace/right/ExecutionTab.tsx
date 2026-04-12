import { Check, Loader2, Circle, AlertCircle, Clock, Slash } from "lucide-react";
import type { WsExecution, WsExecutionStepStatus, WorkspaceSkill } from "../../../workspaceTypes";

interface Props {
  execution: WsExecution;
  skills: WorkspaceSkill[];
}

const stateLabels: Record<string, string> = {
  idle: "Запустите задачу в чате",
  planning: "Агент формирует план...",
  "plan-verification": "Ожидает подтверждения",
  executing: "Выполняется",
  "result-verification": "Завершено — проверьте результат",
  stopped: "Остановлено",
};

function StepIcon({ status }: { status: WsExecutionStepStatus }) {
  switch (status) {
    case "completed":
      return <Check className="w-3.5 h-3.5 text-green-500" />;
    case "running":
      return <Loader2 className="w-3.5 h-3.5 text-gray-600 animate-spin" />;
    case "pending":
      return <Circle className="w-3.5 h-3.5 text-gray-300" />;
    case "error":
      return <AlertCircle className="w-3.5 h-3.5 text-red-500" />;
  }
}

export default function ExecutionTab({ execution, skills }: Props) {
  if (execution.state === "idle") {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-xs text-gray-400 text-center">{stateLabels.idle}</p>
      </div>
    );
  }

  const usedSkills = skills.filter((s) => execution.usedSkillIds.includes(s.id));

  return (
    <div className="p-4 space-y-4">
      {/* Status */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-700">{stateLabels[execution.state]}</span>
        {execution.state === "executing" && (
          <span className="flex items-center gap-1 text-[10px] text-gray-400">
            <Clock className="w-3 h-3" /> {execution.elapsed}
          </span>
        )}
      </div>

      {/* Steps */}
      <div className="space-y-1">
        {execution.steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-start gap-2.5 px-3 py-2 rounded-lg ${
              step.status === "running" ? "bg-gray-50" : ""
            }`}
          >
            <div className="mt-0.5 shrink-0">
              <StepIcon status={step.status} />
            </div>
            <div className="min-w-0">
              <p className={`text-xs ${step.status === "completed" ? "text-gray-500" : "text-gray-700"}`}>
                {step.title}
              </p>
              {step.detail && (
                <p className="text-[10px] text-gray-400 mt-0.5">{step.detail}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Integrations */}
      {execution.integrations.length > 0 && (
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Инструменты</p>
          <div className="space-y-1">
            {execution.integrations.map((int) => (
              <div key={int.id} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gray-50">
                <span className="text-sm">{int.icon}</span>
                <span className="text-xs text-gray-700 flex-1">{int.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200 text-gray-600 font-medium">{int.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Used Skills */}
      {usedSkills.length > 0 && (
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Навыки</p>
          <div className="space-y-0.5">
            {usedSkills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-2 px-3 py-2 rounded-lg">
                <Slash className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-700">{skill.command}</p>
                  <p className="text-[10px] text-gray-400 truncate">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {execution.state === "result-verification" && (
        <button className="w-full px-3 py-2 rounded-lg bg-gray-900 text-white text-xs font-medium cursor-pointer hover:bg-gray-800 transition-colors">
          Принять результат
        </button>
      )}
      {execution.state === "stopped" && (
        <button className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium cursor-pointer hover:bg-gray-50 transition-colors">
          Продолжить
        </button>
      )}
    </div>
  );
}
