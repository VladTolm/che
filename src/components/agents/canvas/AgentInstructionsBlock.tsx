import { Pencil } from "lucide-react";

interface Props {
  name: string;
  description: string;
  instructionsTitle: string;
  instructionsBody: string;
  onEditInstructions: () => void;
}

export default function AgentInstructionsBlock({ name, description, instructionsTitle, instructionsBody, onEditInstructions }: Props) {
  const truncated = instructionsBody.length > 120 ? instructionsBody.slice(0, 120) + "…" : instructionsBody;

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 shadow-sm w-[280px]">
      {/* Connection dots */}
      <div className="absolute top-1/4 -left-[6px] w-3 h-3 rounded-full bg-gray-800 border-2 border-white" />
      <div className="absolute top-1/4 -right-[6px] w-3 h-3 rounded-full bg-gray-800 border-2 border-white" />

      {/* AGENT section */}
      <div className="px-4 pt-3 pb-2.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">AGENT</span>
        <p className="text-sm font-bold text-gray-900 mt-1 mb-0.5">{name}</p>
        <p className="text-xs text-gray-500 truncate">{description}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* INSTRUCTIONS section */}
      <div className="px-4 pt-2.5 pb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">INSTRUCTIONS</span>
          <button
            onClick={onEditInstructions}
            className="flex items-center gap-1 text-[10px] font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <Pencil className="w-3 h-3" />
            Edit
          </button>
        </div>
        <p className="text-xs font-semibold text-gray-900 mb-1">{instructionsTitle}</p>
        <p className="text-[11px] text-gray-500 leading-relaxed whitespace-pre-line">{truncated}</p>
      </div>
    </div>
  );
}
