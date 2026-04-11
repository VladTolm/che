import { FileText, CheckCircle, BarChart3, PartyPopper, Database, XCircle, Pin } from "lucide-react";

const icons: Record<string, React.ReactNode> = {
  doc: <FileText className="w-4 h-4" />,
  approval: <CheckCircle className="w-4 h-4" />,
  table: <BarChart3 className="w-4 h-4" />,
  complete: <PartyPopper className="w-4 h-4" />,
  data: <Database className="w-4 h-4" />,
  error: <XCircle className="w-4 h-4" />,
};

const fallback = <Pin className="w-4 h-4" />;

export default function ActivityIcon({ type }: { type: string }) {
  return <span className="text-gray-500">{icons[type] || fallback}</span>;
}
