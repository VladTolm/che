const icons: Record<string, string> = {
  doc: "📄",
  approval: "✅",
  table: "📊",
  complete: "🎉",
  data: "💾",
  error: "❌",
};

export default function ActivityIcon({ type }: { type: string }) {
  return <span className="text-sm">{icons[type] || "📌"}</span>;
}
