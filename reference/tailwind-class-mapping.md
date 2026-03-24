# Tailwind Class Mapping: Current → Target

Карта замен Tailwind-классов для перехода к стилю референса.

## Sidebar

### Контейнер
```diff
- bg-gray-900
+ bg-white border-r border-gray-200
```

### Навигационный элемент (обычный)
```diff
- text-gray-400 hover:text-gray-200 hover:bg-gray-800/50
+ text-gray-700 hover:text-gray-900 hover:bg-gray-50
```

### Навигационный элемент (активный)
```diff
- bg-gray-800 text-white
+ bg-gray-100 text-gray-900 font-medium
```

### Gigabrain (активный)
```diff
- bg-indigo-600/20 text-indigo-300 ring-1 ring-indigo-500/30
+ bg-gray-100 text-gray-900 font-medium
```

### Разделители
```diff
- border-gray-800
+ border-gray-200
```

### Заголовки секций
```diff
- text-gray-600
+ text-gray-500
```

### Бейджи (числовые)
```diff
- bg-orange-500 text-white
+ bg-gray-100 text-gray-600
```
или удалить.

### Gigabrain badge
```diff
- bg-indigo-500 text-white
+ bg-green-500 text-white
```
или убрать.

### Workspace цветная точка
```diff
- (оставить как есть или убрать цветные точки)
```

### Вспомогательный текст
```diff
- text-gray-500 hover:text-gray-300
+ text-gray-400 hover:text-gray-600
```

### Логотип
```diff
- bg-gradient-to-br from-orange-500 to-amber-400
+ (текстовый логотип, без градиента)
- text-white font-bold text-sm
+ text-gray-900 font-extrabold text-sm uppercase tracking-tight
- text-gray-500 text-xs (подпись)
+ (убрать подпись)
```

### Профиль пользователя
```diff
- border-gray-800
+ border-gray-200
- text-white
+ text-gray-900
- text-gray-500 (role)
+ text-gray-500 (оставить)
```

## Buttons (общие)

### Primary button
```diff
- bg-orange-500 hover:bg-orange-600
+ bg-gray-900 hover:bg-gray-800 (или оставить, если не менять)
```

### Focus rings
```diff
- focus:ring-orange-500/30 focus:border-orange-300
+ focus:ring-gray-400/30 focus:border-gray-400
```

## Cards / Panels

### Карточки
```diff
Оставить: bg-white border border-gray-200 rounded-xl
Убрать: shadow-sm (по возможности, flat-дизайн)
```

## Иконки

### Замена emoji на SVG
Потребуется установка icon-библиотеки (lucide-react рекомендуется).
```diff
- <span className="text-base">🏢</span>
+ <Building2 className="w-5 h-5" />

- <span className="text-base">📋</span>
+ <ClipboardList className="w-5 h-5" />

- <span className="text-base">🤖</span>
+ <Bot className="w-5 h-5" />
```

## CSS Variables (index.css)

```diff
@theme {
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
- --color-content-bg: #f7f8fa;
+ --color-content-bg: #ffffff;  /* или оставить #f7f8fa */
+ --color-accent: #22c55e;     /* зелёный акцент */
}
```
