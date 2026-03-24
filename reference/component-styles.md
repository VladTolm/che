# Component Styles - Reference (ГигаЧат Бизнес)

## 1. Навигационный элемент сайдбара

```
Обычное состояние:
┌─ ○ icon ─ Label ──────────────────┐  bg: transparent
└───────────────────────────────────┘  text: #374151 (gray-700)
                                       icon: #6B7280 (gray-500)

Hover:
┌─ ○ icon ─ Label ──────────────────┐  bg: #F9FAFB (gray-50)
└───────────────────────────────────┘  text: #111827 (gray-900)

Active:
┌─ ● icon ─ Label ──────────────────┐  bg: #F3F4F6 (gray-100)
└───────────────────────────────────┘  text: #111827 (gray-900)
                                       font-weight: 500
```

**Tailwind-классы (целевые)**:
```
base:    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 transition-colors
hover:   hover:bg-gray-50 hover:text-gray-900
active:  bg-gray-100 text-gray-900 font-medium
```

## 2. Кнопка "Новый чат"

```
┌─ 💬+ ─ Новый чат ────────────────┐  bg: transparent / очень лёгкий
└───────────────────────────────────┘  border: 1px solid #E5E7EB
                                       text: #374151
                                       rounded: lg
                                       hover: bg-gray-50
```

## 3. Пилюля навыка (Skill Badge)

```
Активный:
┌─ ● Label ─┐  bg: white
└────────────┘  border: 1px solid #E5E7EB
                dot: #22C55E (green-500)
                text: #374151 (gray-700)
                rounded: full
                px: 12px, py: 6px

Неактивный:
┌─ ○ Label ─┐  bg: white
└────────────┘  border: 1px solid #E5E7EB
                dot: #D1D5DB (gray-300)
                text: #9CA3AF (gray-400)
```

## 4. Шаг рассуждения (Reasoning Step)

```
Свёрнутый:
┌─ Рассуждение ─┐  bg: #F3F4F6 (gray-100)
└────────────────┘  text: #6B7280 (gray-500)
                    rounded: full
                    text-size: 12-13px

Результат шага:
● Подключен навык: AI Excel     dot: #22C55E
● Создать Excel файл...         text: #374151
```

## 5. Таблица

```
┌──────────────┬─────────────────────────────┐
│ ЛИСТ         │ СОДЕРЖАНИЕ                  │  header-bg: #F9FAFB
├──────────────┼─────────────────────────────┤  header-text: #6B7280 uppercase
│ Факт-Сделки │ Закрытые сделки...          │  border: #E5E7EB
├──────────────┼─────────────────────────────┤  cell-text: #374151
│ ...          │ ...                         │  cell-padding: 12px 16px
└──────────────┴─────────────────────────────┘  rounded: xl (outer)
```

## 6. Поле ввода сообщения

```
┌─────────────────────────────────────────────────────┐
│ Сообщение...                                     ⬆  │
│ ┌──────────┐ ✏️                                     │
│ │ⓧ giga    │                                        │
│ └──────────┘                                        │
└─────────────────────────────────────────────────────┘

bg: #F5F5F5 или white
border: 1px solid #E5E7EB
rounded: xl (16px)
padding: 12-16px
placeholder-color: #9CA3AF

Тег workspace внутри:
  bg: #F3F4F6
  border: 1px solid #E5E7EB
  rounded: lg
  text: 13px
  icon: стрелка выхода
  "x" для удаления

Кнопка отправки:
  bg: #111827 или gradient
  color: white
  rounded: full
  size: 32-36px
```

## 7. Файловое дерево (Documents)

```
▾ 📁 giga
    📄 voronka-prodazh.docx
    📄 voronka-prodazh.md
    📄 voronka-prodazh.xlsx

folder-icon: серая папка
file-icons: по типу файла (разные иконки для docx, md, xlsx)
text: 13-14px, #374151
indent: 20-24px на уровень
hover: bg-gray-50 на строку
```

## 8. Секция с заголовком (сворачиваемая)

```
┌───────────────────────────────────┐
│ Прогресс                      ∨  │  title: 14px, font-medium, #374151
├───────────────────────────────────┤  chevron: #9CA3AF
│ Содержимое секции                │  border-bottom: #E5E7EB
│                                  │  padding: 12-16px
└───────────────────────────────────┘
```

## 9. Поле поиска (в панели документов)

```
┌─ 🔍 giga ─────────── 3 ✕ ─┐  bg: white
└────────────────────────────┘  border: 1px solid #D1D5DB
                                 rounded: lg (8px)
                                 text: 14px
                                 icon-color: #9CA3AF
                                 badge "3": bg-gray-100, rounded
```

## 10. Профиль пользователя (низ сайдбара)

```
┌─ (v) vtolm ───────────────────┐  avatar: 28-32px, rounded-full
└───────────────────────────────┘  bg: gradient или solid color
                                    name: 14px, medium, #111827
                                    border-top: #E5E7EB
                                    padding: 12px 16px
```
