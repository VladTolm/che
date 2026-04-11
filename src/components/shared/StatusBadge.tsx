interface Props {
  status: "active" | "waiting" | "completed" | "idle";
}

const config = {
  active: { dot: "bg-green-500", bg: "bg-green-50", text: "text-green-700", label: "Активен" },
  waiting: { dot: "bg-gray-400", bg: "bg-gray-100", text: "text-gray-600", label: "Ожидает" },
  completed: { dot: "bg-gray-500", bg: "bg-gray-100", text: "text-gray-700", label: "Завершён" },
  idle: { dot: "bg-gray-400", bg: "bg-gray-100", text: "text-gray-600", label: "Свободен" },
};

export default function StatusBadge({ status }: Props) {
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${status === "active" ? "animate-pulse-dot" : ""}`} />
      {c.label}
    </span>
  );
}
