import { useState, useRef } from "react";
import { ArrowUp, Slash, FolderOpen, Pencil, Paperclip, SlidersHorizontal, CalendarDays } from "lucide-react";
import type { WorkspaceSkill, WorkspaceAgent } from "../../../workspaceTypes";

interface Props {
  input: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
  activeAgent: WorkspaceAgent | null;
  skills: WorkspaceSkill[];
  workspaceName: string;
  placeholderOverride?: string;
}

export default function WorkspaceChatInput({ input, onInputChange, onSend, activeAgent, skills, workspaceName, placeholderOverride }: Props) {
  const [showSkills, setShowSkills] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSend();
    }
  }

  // Detect / or ./ prefix for skill filtering
  function handleChange(val: string) {
    onInputChange(val);
    const hasDotSlash = val.includes("./");
    const hasSlash = val.includes("/") && !hasDotSlash;
    if (hasDotSlash || hasSlash || val.endsWith("/")) {
      setShowSkills(true);
    } else if (!val.includes("/")) {
      setShowSkills(false);
    }
  }

  function handleSelectSkill(skill: WorkspaceSkill) {
    onInputChange(skill.command + " ");
    setShowSkills(false);
    inputRef.current?.focus();
  }

  // Determine filter mode: "./" shows only space skills, "/" shows all
  const isDotSlashMode = input.includes("./");
  const filterPrefix = isDotSlashMode ? input.slice(input.lastIndexOf("./") + 2) : input.slice(input.lastIndexOf("/") + 1);
  const filterText = showSkills ? filterPrefix.toLowerCase() : "";

  const allFiltered = skills.filter((s) =>
    s.name.toLowerCase().includes(filterText) || s.command.toLowerCase().includes(filterText)
  );

  // In "./" mode, only show space skills
  const visibleSkills = isDotSlashMode
    ? allFiltered.filter((s) => s.level === "space")
    : allFiltered;

  const companySkills = visibleSkills.filter((s) => s.level === "company");
  const spaceSkills = visibleSkills.filter((s) => s.level === "space");

  const placeholder = placeholderOverride
    ?? (activeAgent ? `Опишите задачу для ${activeAgent.name}...` : "Как я могу вам помочь сегодня?");

  return (
    <div className="px-6 py-4 shrink-0">
      <div className="relative">
        {/* Slash command dropdown — grouped by level */}
        {showSkills && visibleSkills.length > 0 && (
          <div className="absolute bottom-full left-0 mb-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-tooltip-enter z-10 max-h-64 overflow-y-auto">
            {companySkills.length > 0 && (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3 pt-2 pb-1">Навыки компании</p>
                {companySkills.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => handleSelectSkill(skill)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-2"
                  >
                    <Slash className="w-3.5 h-3.5 text-gray-400" />
                    <div>
                      <p className="text-xs font-medium text-gray-700">{skill.command}</p>
                      <p className="text-[10px] text-gray-400">{skill.description}</p>
                    </div>
                  </button>
                ))}
              </>
            )}
            {spaceSkills.length > 0 && (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3 pt-2 pb-1">Навыки пространства</p>
                {spaceSkills.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => handleSelectSkill(skill)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-2"
                  >
                    <Slash className="w-3.5 h-3.5 text-gray-400" />
                    <div>
                      <p className="text-xs font-medium text-gray-700">{skill.command}</p>
                      <p className="text-[10px] text-gray-400">{skill.description}</p>
                    </div>
                  </button>
                ))}
              </>
            )}
          </div>
        )}

        {/* Input card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-4 pb-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => setTimeout(() => setShowSkills(false), 150)}
              placeholder={placeholder}
              className="w-full text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
            />
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="bg-gray-100 rounded-lg px-2.5 py-1 flex items-center gap-1.5 text-[11px] text-gray-700 shrink-0">
                <FolderOpen className="w-3 h-3 text-gray-400" />
                {workspaceName}
              </span>
              <button className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer shrink-0">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <button className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                <Paperclip className="w-4.5 h-4.5" />
              </button>
              <button className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                <SlidersHorizontal className="w-4.5 h-4.5" />
              </button>
              <button className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                <CalendarDays className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={onSend}
                disabled={!input.trim()}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  input.trim()
                    ? "bg-gray-900 hover:bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-300"
                }`}
              >
                <ArrowUp className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
