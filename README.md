<p align="center">
  <img alt="Common Prayer" src="public/icons/icon-512.png" height="100">
</p>

Common Prayer
-------------

A mobile-first Progressive Web App for the 1979 Episcopal Book of Common Prayer Daily Office. Opens directly to the right prayer for the time of day — no configuration required.

## Features

- **Daily Office** — Morning Prayer, Noonday Prayer, Evening Prayer, and Compline (Rite I & II)
- **Liturgical Calendar** — Automatic season, proper, and feast-day detection
- **Psalter** — All 150 Psalms via public-domain KJV, fetched on demand
- **Daily Readings** — Year One / Year Two lectionary for the Daily Office
- **Prayer List** — Personal intentions stored locally, appear during Prayers & Thanksgivings
- **Favorites** — Bookmark any section for quick access
- **Reminders** — Web Notifications for daily prayer times
- **Offline-first** — Service worker caches everything after first load; works without a connection
- **Installable** — Add to Home Screen on iOS/Android for a native-app feel

## Requirements

- Node.js 18 or higher
- A modern browser (Chrome, Safari, Firefox, Edge)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run typecheck` | TypeScript type check |
| `npm run lint` | ESLint |
| `npm run lint:css` | Stylelint |
| `npm run lint:all` | Typecheck + ESLint + Stylelint |
| `npm run test` | Run Vitest unit tests |
| `npm run test:watch` | Run tests in watch mode |

## Documentation

Full documentation is available at [https://incraigulous.github.io/commonprayer/](https://incraigulous.github.io/commonprayer/).

## License

[Elastic License 2.0](LICENSE) — source available; contributions welcome.
