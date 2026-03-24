interface Props {
  status: "active" | "waiting" | "completed" | "idle";
  dashboardVariant?: boolean;
}

const config = {
  active: { dot: "bg-orange-500", bg: "bg-orange-100", text: "text-orange-700", label: "Активен" },
  waiting: { dot: "bg-amber-500", bg: "bg-amber-100", text: "text-amber-700", label: "Ожидает" },
  completed: { dot: "bg-blue-500", bg: "bg-blue-100", text: "text-blue-700", label: "Завершён" },
  idle: { dot: "bg-gray-400", bg: "bg-gray-100", text: "text-gray-600", label: "Свободен" },
};

export default function StatusBadge({ status, dashboardVariant }: Props) {
  const c = config[status];
  const dotColor = dashboardVariant && status === "active" ? "bg-green-500" : c.dot;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ${status === "active" ? "animate-pulse-dot" : ""}`} />
      {c.label}
    </span>
  );
}
