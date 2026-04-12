import { Pencil } from "lucide-react";
import EditorSection from "./EditorSection";

interface Props {
  instructionsBody: string;
  onEdit: () => void;
}

export default function InstructionsSection({ instructionsBody, onEdit }: Props) {
  return (
    <EditorSection
      title="Системная инструкция"
      isEmpty={!instructionsBody}
      placeholder="Опишите как агент должен себя вести, какую роль выполнять и какие ограничения соблюдать"
      actions={
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
        >
          <Pencil className="w-3 h-3" />
          Редактировать
        </button>
      }
    >
      <div className="text-sm text-gray-700 leading-relaxed line-clamp-4 whitespace-pre-line font-mono bg-gray-50 rounded-lg p-3">
        {instructionsBody}
      </div>
    </EditorSection>
  );
}
