const config: Record<string, { bg: string; text: string }> = {
  xlsx: { bg: "bg-green-100", text: "text-green-700" },
  pdf: { bg: "bg-red-100", text: "text-red-700" },
  csv: { bg: "bg-blue-100", text: "text-blue-700" },
  docx: { bg: "bg-indigo-100", text: "text-indigo-700" },
};

export default function FileIcon({ type }: { type: string }) {
  const c = config[type] || { bg: "bg-gray-100", text: "text-gray-600" };
  return (
    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${c.bg} ${c.text}`}>
      {type}
    </span>
  );
}
