import { useState, useMemo } from "react";
import type { Task, ExecutionLogGroup, DocTreeItem } from "../../types";
import StepStatus from "../shared/StepStatus";
import {
  Send,
  ChevronRight,
  ChevronDown,
  X,
  Folder,
  FolderOpen,
  Pencil,
  FileText,
  ArrowDown,
} from "lucide-react";

interface Props {
  task: Task;
  executionLog: ExecutionLogGroup[];
  docTree: DocTreeItem[];
}

function filterDocTree(items: DocTreeItem[], query: string): DocTreeItem[] {
  if (!query) return items;
  const q = query.toLowerCase();
  return items
    .map((item) => {
      if (item.type === "folder") {
        const filteredChildren = filterDocTree(item.children || [], q);
        if (filteredChildren.length > 0 || item.name.toLowerCase().includes(q)) {
          return { ...item, children: filteredChildren.length > 0 ? filteredChildren : item.children };
        }
        return null;
      }
      return item.name.toLowerCase().includes(q) ? item : null;
    })
    .filter(Boolean) as DocTreeItem[];
}

function countFiles(items: DocTreeItem[]): number {
  return items.reduce((acc, item) => {
    if (item.type === "file") return acc + 1;
    return acc + countFiles(item.children || []);
  }, 0);
}

export default function TaskView({ task, executionLog, docTree }: Props) {
  const [input, setInput] = useState("");
  const [progressOpen, setProgressOpen] = useState(true);
  const [docsOpen, setDocsOpen] = useState(true);
  const [docSearch, setDocSearch] = useState("giga");
  const [attachedWorkspace, setAttachedWorkspace] = useState<string | null>("giga");

  const filteredDocs = useMemo(() => filterDocTree(docTree, docSearch), [docTree, docSearch]);
  const filteredCount = useMemo(() => countFiles(filteredDocs), [filteredDocs]);

  function renderDocTree(items: DocTreeItem[], depth = 0) {
    return items.map((item) => {
      const pl = depth * 16;
      if (item.type === "folder") {
        return (
          <div key={item.name}>
            <div
              className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
              style={{ paddingLeft: `${pl + 8}px` }}
            >
              <FolderOpen className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="font-medium">{item.name}</span>
            </div>
            {item.children && renderDocTree(item.children, depth + 1)}
          </div>
        );
      }
      return (
        <div
          key={item.name}
          className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-50 cursor-pointer text-sm text-gray-600"
          style={{ paddingLeft: `${pl + 8}px` }}
        >
          <FileText className="w-4 h-4 text-gray-300 shrink-0" />
          <span className="truncate">{item.name}</span>
        </div>
      );
    });
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Task Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <h2 className="text-base font-semibold text-gray-900">{task.name}</h2>
        </div>
      </div>

      {/* Main Content: Execution Log + Details */}
      <div className="flex-1 flex min-h-0">
        {/* Execution Log */}
        <div className="flex-1 overflow-y-auto p-6 min-w-0 relative">
          <div className="space-y-4 max-w-2xl">
            {executionLog.map((group) => (
              <div key={group.id} className="space-y-1.5">
                {/* Reasoning pills */}
                <div className="flex flex-wrap gap-1.5">
                  {Array.from({ length: group.reasoningCount }).map((_, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full border border-green-100"
                    >
                      Рассуждение
                    </span>
                  ))}
                </div>
                {/* Action items */}
                {group.actions.map((action, i) => (
                  <div key={i} className="flex items-start gap-2.5 pl-1">
                    <span className="text-green-500 mt-1 text-[8px] leading-none">●</span>
                    <span className="text-sm text-gray-700">{action}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Scroll-down button */}
          <div className="flex justify-center mt-6">
            <button className="w-8 h-8 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ArrowDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Right Panel - Детали */}
        <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto shrink-0">
          <div className="p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-5">Детали</h3>

            {/* Progress Section */}
            <div className="mb-5">
              <button
                onClick={() => setProgressOpen(!progressOpen)}
                className="flex items-center justify-between w-full mb-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">Прогресс</span>
                  <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    {task.progress}%
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${progressOpen ? "" : "-rotate-90"}`}
                />
              </button>
              {progressOpen && (
                <div className="space-y-2.5 pl-0.5">
                  {task.steps.map((step) => (
                    <div key={step.id} className="flex items-start gap-2.5">
                      <div className="shrink-0 mt-0.5">
                        <StepStatus status={step.status} />
                      </div>
                      <span className="text-sm text-gray-700 leading-snug">{step.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Documents Section */}
            <div>
              <button
                onClick={() => setDocsOpen(!docsOpen)}
                className="flex items-center justify-between w-full mb-3"
              >
                <span className="text-sm font-medium text-gray-800">Документы</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${docsOpen ? "" : "-rotate-90"}`}
                />
              </button>
              {docsOpen && (
                <div>
                  {/* Search bar */}
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 mb-3">
                    <input
                      value={docSearch}
                      onChange={(e) => setDocSearch(e.target.value)}
                      className="flex-1 bg-transparent text-sm outline-none text-gray-700 min-w-0"
                      placeholder="Поиск..."
                    />
                    {docSearch && (
                      <>
                        <span className="text-xs text-gray-400 shrink-0">{filteredCount}</span>
                        <button onClick={() => setDocSearch("")} className="shrink-0">
                          <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                        </button>
                      </>
                    )}
                  </div>
                  {/* File tree */}
                  <div className="space-y-0.5">{renderDocTree(filteredDocs)}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 shrink-0">
        <div className="relative">
          <div className="flex items-center gap-2 bg-gray-50 rounded-2xl border border-gray-200 px-4 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Сообщение..."
              className="flex-1 bg-transparent text-sm outline-none text-gray-700 min-w-0"
            />
            <button className="w-9 h-9 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </div>
          {/* Attachment row below input */}
          <div className="flex items-center gap-2 mt-2 px-1">
            {attachedWorkspace && (
              <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg px-2.5 py-1.5 text-xs text-gray-600">
                <Folder className="w-3.5 h-3.5" />
                <span>{attachedWorkspace}</span>
                <button onClick={() => setAttachedWorkspace(null)}>
                  <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            )}
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
