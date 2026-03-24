export default function BlockedCard() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in max-w-lg">
      <div className="text-sm font-medium text-red-700 mb-1.5">🚫 За пределами полномочий</div>
      <div className="text-sm text-red-600 mb-3">
        Я не могу отправлять письма напрямую. Но я могу:
      </div>
      <div className="space-y-1.5">
        {["📧 Подготовить черновик письма", "📎 Прикрепить актуальный прайс", "📋 Добавить в задачи"].map(
          (option, i) => (
            <button
              key={i}
              className="w-full text-left px-3 py-2 bg-white border border-red-100 rounded-lg text-sm text-gray-700 hover:bg-red-50 cursor-pointer"
            >
              {option}
            </button>
          )
        )}
      </div>
    </div>
  );
}
