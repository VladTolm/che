import type { Automation } from "../../../personalTypes";

interface Props {
  automations: Automation[];
}

export default function AutomationsWidget({ automations }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden max-w-lg animate-fade-in">
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">🔄 Автоматизации</span>
        <span className="text-xs text-green-600">{automations.length} активных</span>
      </div>
      <div className="p-3 flex flex-wrap gap-2">
        {automations.map((a) => (
          <div
            key={a.id}
            className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 cursor-pointer hover:shadow-sm ${
              a.status === "monitoring"
                ? "border-blue-200 bg-blue-50"
                : "border-green-200 bg-green-50"
            }`}
          >
            <span>{a.icon}</span>
            <span className="font-medium text-gray-700">{a.name}</span>
            <span className="text-gray-400">{a.schedule}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
