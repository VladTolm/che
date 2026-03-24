import type { ExecutionData } from "../../../personalTypes";

interface Props {
  exec: ExecutionData;
  showTable?: boolean;
}

export default function ExecutionCard({ exec, showTable }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-fade-in max-w-lg">
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">{exec.title}</span>
        <span className="text-xs text-gray-400 font-mono">⏱ {exec.elapsed}</span>
      </div>
      <div className="px-4 py-3 space-y-2">
        {exec.steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="w-5 text-center shrink-0">
              {s.status === "completed" ? (
                <span className="text-green-500 text-sm">✅</span>
              ) : s.status === "running" ? (
                <span className="text-orange-500 text-sm animate-pulse-dot">●</span>
              ) : (
                <span className="text-gray-300 text-sm">○</span>
              )}
            </span>
            <span className={`text-sm ${s.status === "pending" ? "text-gray-400" : "text-gray-700"}`}>
              {s.title}
            </span>
            {s.detail && <span className="text-xs text-gray-400 ml-auto">{s.detail}</span>}
          </div>
        ))}
      </div>
      {exec.resultSummary && (
        <div className="px-4 py-3 border-t border-gray-100 bg-green-50">
          <div className="text-sm text-green-700 font-medium">{exec.resultSummary}</div>
          <div className="flex gap-2 mt-2">
            <button className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg text-xs font-medium cursor-pointer hover:bg-indigo-600">
              📄 Открыть
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium cursor-pointer hover:bg-gray-200">
              💾 Скачать
            </button>
          </div>
        </div>
      )}
      {showTable && exec.table && (
        <div className="px-4 py-3 border-t border-gray-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {exec.table.cols.map((c, i) => (
                  <th key={i} className="text-left py-1.5 pr-4 text-gray-500 font-medium text-xs uppercase">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {exec.table.rows.map((r, i) => (
                <tr key={i} className="border-b border-gray-50">
                  {r.map((c, j) => (
                    <td
                      key={j}
                      className={`py-1.5 pr-4 text-sm ${
                        j === 3 ? "font-semibold text-gray-800" : "text-gray-600"
                      }`}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
