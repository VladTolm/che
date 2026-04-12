import { useState } from "react";
import { X, Search } from "lucide-react";
import type { CatalogCategory, CatalogItem } from "../../../../agentEditorTypes";

interface Props {
  title: string;
  categories: CatalogCategory[];
  items: CatalogItem[];
  onSelect: (item: CatalogItem) => void;
  onClose: () => void;
}

export default function CatalogPopup({ title, categories, items, onSelect, onClose }: Props) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const [search, setSearch] = useState("");

  const isSearching = search.trim().length > 0;
  const filteredItems = isSearching
    ? items.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      )
    : items.filter((item) => item.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[70vh] flex flex-col animate-modal-enter">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск..."
                className="pl-9 pr-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors w-48"
              />
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Categories sidebar */}
          {!isSearching && categories.length > 1 && (
            <div className="w-44 border-r border-gray-100 py-3 px-3 space-y-0.5 shrink-0 overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {/* Tiles grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredItems.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">Ничего не найдено</p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelect(item)}
                    className="text-left p-4 rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <span className="text-xl block mb-2">{item.icon}</span>
                    <p className="text-sm font-medium text-gray-800 mb-0.5">{item.name}</p>
                    <p className="text-[11px] text-gray-500 line-clamp-2">{item.description}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
