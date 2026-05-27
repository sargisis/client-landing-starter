# client-landing-starter

Лендинг на Vite + React. Исходники в папке `test/`.

## Локально

```bash
npm install --prefix test
npm run dev
```

## Production build

Из корня репозитория:

```bash
npm run build
```

Артефакты: `test/dist/` (статика для любого хостинга).

Проверка локально после сборки:

```bash
npm run preview
```

## Деплой

| Платформа | Настройки |
|-----------|-----------|
| **Vercel** | Подключить репо — используется `vercel.json` |
| **Netlify** | Подключить репо — используется `netlify.toml` |
| **Свой сервер / S3 / nginx** | Залить содержимое `test/dist/` |

На Vercel/Netlify build command: `npm run build` из корня (или настроить base directory `test` и команду `npm run build` там).