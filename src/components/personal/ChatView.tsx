import { useEffect } from "react";
import { Plane, Receipt, Ban, RefreshCw, Send, CheckCircle, ArrowRight, AlertTriangle } from "lucide-react";
import type { ChatDemoState, ContextConfig } from "../../personalTypes";
import { DEMO_ORDER } from "../../personalTypes";
import {
  calendarEvents,
  mails,
  todos,
  automations,
  flightExec,
  flightExecRunning,
  expenseExecRunning,
  expenseExecDone,
} from "../../data/personalMock";

import AgentMsg from "./messages/AgentMsg";
import UserMsg from "./messages/UserMsg";
import SystemMsg from "./messages/SystemMsg";
import CalendarWidget from "./widgets/CalendarWidget";
import MailWidget from "./widgets/MailWidget";
import TodoWidget from "./widgets/TodoWidget";
import ActiveExecutionsWidget from "./widgets/ActiveExecutionsWidget";
import AutomationsWidget from "./widgets/AutomationsWidget";
import ExecutionCard from "./cards/ExecutionCard";
import ConfirmCard from "./cards/ConfirmCard";
import BlockedCard from "./cards/BlockedCard";
import AutoRunCard from "./cards/AutoRunCard";

interface Props {
  chatState: ChatDemoState;
  setChatState: (s: ChatDemoState) => void;
  input: string;
  setInput: (s: string) => void;
  onOpenContext: (config: ContextConfig) => void;
}

function stateReached(current: ChatDemoState, target: ChatDemoState): boolean {
  return DEMO_ORDER.indexOf(current) >= DEMO_ORDER.indexOf(target);
}

export default function ChatView({ chatState, setChatState, input, setInput, onOpenContext }: Props) {
  // Manual scroll only — no auto-scroll to bottom

  // Auto-advance running states
  useEffect(() => {
    if (chatState === "flight_running") {
      const t = setTimeout(() => setChatState("flight_done"), 2500);
      return () => clearTimeout(t);
    }
    if (chatState === "expense_running") {
      const t = setTimeout(() => setChatState("expense_done"), 2000);
      return () => clearTimeout(t);
    }
  }, [chatState, setChatState]);

  const handleSend = () => {
    if (!input.trim()) return;
    const txt = input.toLowerCase();
    if (txt.includes("рейс") || txt.includes("flight")) setChatState("flight_plan");
    else if (txt.includes("чек") || txt.includes("expense")) setChatState("expense_plan");
    else if (txt.includes("отправ")) setChatState("blocked");
    else if (txt.includes("автоматиз") || txt.includes("каждое утро")) setChatState("auto_create");
    setInput("");
  };

  const handleQuickAction = (action: string) => {
    const msgMap: Record<string, string> = {
      flights: "Найди рейсы Москва–Шанхай, 1-3 апреля, до 30000₽",
      expense: "Собери чеки из почты за март",
      blocked: "Отправь Foxconn наш прайс",
      auto: "Каждое утро в 7:30 — курс, погода, задачи",
    };
    const stateMap: Record<string, ChatDemoState> = {
      flights: "flight_plan",
      expense: "expense_plan",
      blocked: "blocked",
      auto: "auto_create",
    };
    setInput(msgMap[action] || "");
    setTimeout(() => {
      setChatState(stateMap[action] || "morning_brief");
      setInput("");
    }, 300);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      {/* Message feed */}
      <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0" style={{ backgroundColor: "#fafafa" }}>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Morning briefing — always shown */}
          <SystemMsg>Вт, 25 марта 2026 · 08:00</SystemMsg>

          <AgentMsg proactive time="08:00">
            <div className="text-sm text-gray-700 leading-relaxed">
              Доброе утро, Влад! Вот что важно сегодня:
            </div>
            <CalendarWidget events={calendarEvents} />
            <MailWidget mails={mails} />
            <TodoWidget todos={todos} />
            <ActiveExecutionsWidget />
            <AutomationsWidget automations={automations} />
            <div className="text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 max-w-lg">
              <AlertTriangle className="w-4 h-4 inline-block text-amber-500 mr-1 -mt-0.5" />
              <strong>Обрати внимание:</strong> Foxconn поднял цены на 3 позиции (8-12%). У тебя встреча
              с ними в 14:00 — я подготовил сравнительную таблицу.
            </div>
          </AgentMsg>

          {/* Flight demo */}
          {stateReached(chatState, "flight_plan") && (
            <>
              <UserMsg>Найди рейсы Москва–Шанхай, 1-3 апреля, до 30000₽</UserMsg>

              {chatState === "flight_plan" && (
                <AgentMsg time="14:30">
                  <div className="text-sm text-gray-700">Понял, составил план:</div>
                  <ConfirmCard
                    title="Рейсы Москва–Шанхай"
                    steps={[
                      "Поиск рейсов 1–3 апреля",
                      "Фильтрация ≤30,000₽, эконом",
                      "Сравнение и сортировка",
                      "Генерация таблицы",
                    ]}
                    onConfirm={() => setChatState("flight_running")}
                  />
                </AgentMsg>
              )}

              {chatState === "flight_running" && (
                <AgentMsg time="14:30">
                  <ExecutionCard exec={flightExecRunning} />
                </AgentMsg>
              )}

              {stateReached(chatState, "flight_done") && (
                <AgentMsg time="14:32">
                  <div className="text-sm text-gray-700">
                    Готово! Лучший вариант — <strong>Aeroflot SU208, 24,500₽</strong>.
                  </div>
                  <ExecutionCard exec={flightExec} showTable />
                  <button
                    onClick={() =>
                      onOpenContext({ type: "execution", title: "Детали поиска" })
                    }
                    className="text-xs text-gray-700 hover:text-gray-900 cursor-pointer flex items-center gap-1"
                  >
                    Подробнее <ArrowRight className="w-3 h-3" />
                  </button>
                </AgentMsg>
              )}
            </>
          )}

          {/* Expense demo */}
          {stateReached(chatState, "expense_plan") && (
            <>
              <UserMsg>Собери чеки из почты за март и сделай expense report</UserMsg>

              {chatState === "expense_plan" && (
                <AgentMsg time="14:40">
                  <ConfirmCard
                    title="Expense Report — март"
                    steps={[
                      "Поиск писем с чеками/receipts",
                      "Извлечение сумм и категорий",
                      "Генерация таблицы",
                      "Сохранение xlsx",
                    ]}
                    onConfirm={() => setChatState("expense_running")}
                  />
                </AgentMsg>
              )}

              {chatState === "expense_running" && (
                <AgentMsg time="14:40">
                  <ExecutionCard exec={expenseExecRunning} />
                </AgentMsg>
              )}

              {stateReached(chatState, "expense_done") && (
                <AgentMsg time="14:43">
                  <div className="text-sm text-gray-700">
                    Готово! 19 расходов на ¥12,450. 4 чека для ручной проверки.
                  </div>
                  <ExecutionCard exec={expenseExecDone} />
                </AgentMsg>
              )}
            </>
          )}

          {/* Blocked demo */}
          {stateReached(chatState, "blocked") && (
            <>
              <UserMsg>Отправь Foxconn наш новый прайс</UserMsg>
              <AgentMsg time="14:45">
                <BlockedCard />
              </AgentMsg>
            </>
          )}

          {/* Automation demo */}
          {stateReached(chatState, "auto_create") && (
            <>
              <UserMsg>Каждое утро в 7:30 присылай курс юаня, погоду в Шэньчжэне и мои задачи</UserMsg>

              {chatState === "auto_create" && (
                <AgentMsg time="14:48">
                  <div className="text-sm text-gray-700">Создаю автоматизацию:</div>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden max-w-lg animate-fade-in">
                    <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                      <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5" /> Новая автоматизация
                      </span>
                    </div>
                    <div className="px-4 py-3 space-y-2">
                      <div className="text-sm text-gray-700">
                        <strong>Название:</strong> Утренняя сводка
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Расписание:</strong> ежедневно, 07:30
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Шаги:</div>
                      {[
                        "Получить курс CNY/RUB",
                        "Получить погоду Шэньчжэнь",
                        "Собрать задачи из пространств",
                        "Скомпилировать сводку",
                        "Отправить в чат",
                      ].map((s, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
                          <span className="text-gray-300 font-mono text-xs w-4 text-right">{i + 1}.</span>
                          {s}
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
                      <button
                        onClick={() => setChatState("auto_done")}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-800"
                      >
                        <CheckCircle className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" /> Создать
                      </button>
                      <button className="px-4 py-2 text-gray-400 text-sm cursor-pointer">Изменить</button>
                    </div>
                  </div>
                </AgentMsg>
              )}

              {chatState === "auto_done" && (
                <AgentMsg time="14:49">
                  <div className="text-sm text-gray-700 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-green-500" /> Автоматизация создана! Первый запуск: завтра 07:30.
                  </div>
                  <AutoRunCard title="Утренняя сводка (тест)">
                    <div>CNY/RUB: 1 CNY = 12.45₽ (▲0.3%)</div>
                    <div>Шэньчжэнь: 26°C, облачно</div>
                    <div>Задачи (7): Закупки 3, Маркетинг 2, HR 2</div>
                    <div className="text-amber-700 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Тендер Q2 — дедлайн завтра, 25%
                    </div>
                  </AutoRunCard>
                </AgentMsg>
              )}
            </>
          )}

          <div />
        </div>
      </div>

      {/* Input bar */}
      <div className="bg-white border-t border-gray-100 px-6 py-4 shrink-0">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-[#F5F5F5] rounded-xl px-4 py-3 flex items-center border border-gray-200 focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-400/30 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Задайте задачу, задайте вопрос, попросите показать данные..."
                className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleSend}
              className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2 mt-2.5 flex-wrap">
            {[
              { id: "flights", icon: <Plane className="w-3.5 h-3.5" />, label: "Рейсы" },
              { id: "expense", icon: <Receipt className="w-3.5 h-3.5" />, label: "Чеки" },
              { id: "blocked", icon: <Ban className="w-3.5 h-3.5" />, label: "Блокировка" },
              { id: "auto", icon: <RefreshCw className="w-3.5 h-3.5" />, label: "Автоматизация" },
            ].map((a) => (
              <button
                key={a.id}
                onClick={() => handleQuickAction(a.id)}
                className="px-3 py-1.5 bg-gray-100 rounded-xl text-xs text-gray-500 cursor-pointer hover:bg-gray-200 hover:text-gray-700 transition-colors flex items-center gap-1.5"
              >
                {a.icon} {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
