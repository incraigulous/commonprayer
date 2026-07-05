# Architecture

Common Prayer is a TypeScript/React Progressive Web App built with Vite.

## Tech stack

| Concern | Choice |
|---|---|
| Build | Vite + TypeScript |
| UI | React 18 |
| Routing | React Router v7 |
| Styling | Tailwind CSS |
| State | Zustand |
| Storage | localStorage (settings) + IndexedDB via `idb` (prayer list, favorites) |
| PWA | `vite-plugin-pwa` + Workbox |
| Tests | Vitest |
| Lint | ESLint 10 (flat config) + Stylelint |

## Content strategy

All liturgical text is public domain (BCP 1979). Content is bundled as local JSON files following the Liturgical Document Format (LDF) schema:

- `src/content/morning-prayer-rite-ii.json`
- `src/content/morning-prayer-rite-i.json`
- `src/content/noonday-prayer.json`
- `src/content/evening-prayer-rite-ii.json`
- `src/content/evening-prayer-rite-i.json`
- `src/content/compline.json`
- `src/content/collects-seasonal.json`
- `src/content/collects-propers.json`
- `src/content/prayers-thanksgivings.json`
- `src/content/lectionary/year-one.json`
- `src/content/lectionary/year-two.json`

Psalms are fetched on demand from `bible-api.com` (KJV, public domain) rather than bundled.

## Liturgical Document Format

Every piece of prayer content is represented as a `LiturgicalDocument` node with a `type` field:

| Type | Description |
|---|---|
| `liturgy` | Container — holds an ordered array of child documents |
| `text` | Plain prayer text, optionally with a drop cap |
| `rubric` | Instruction rendered in red italic |
| `responsive` | Officiant/People call-and-response pair |
| `psalm` | Psalm with verse numbers and hanging indent |
| `bible-reading` | Scripture reading with citation |
| `heading` | Section heading |
| `option` | Version switcher — holds multiple child docs, one selected |

The `LiturgicalDocument` React component recursively renders this tree.

## Key source files

```
src/
  liturgy/
    calendar.ts       # Season, proper, feast, lectionary year detection
    calendar.test.ts  # 21 Vitest unit tests
    lectionary.ts     # Daily reading lookup
    office.ts         # Assembles the full office LDF tree for a date + version
  store/
    settings.ts       # Zustand store + localStorage persistence
    userdata.ts       # Prayer list + favorites via IndexedDB
  components/
    layout/
      AppShell.tsx    # Tab bar + drawer wrapper
      Drawer.tsx      # Slide-in navigation
      TabBar.tsx      # Morning / Noon / Evening / More tabs
    prayer/
      LiturgicalDocument.tsx  # Recursive LDF renderer
      MeditateTimer.tsx       # Inline countdown timer with bell
    ui/
      Sheet.tsx       # Bottom-sheet modal
      Toggle.tsx      # iOS-style toggle switch
  hooks/
    useOverlayBehavior.ts  # Shared scroll-lock + Escape for Sheet and Drawer
```

## Offline behavior

Workbox precaches all JS/CSS/HTML chunks at install time. The service worker uses a stale-while-revalidate strategy for bible-api.com requests, so psalms load instantly from cache after the first fetch.

## Testing

```bash
npm run test          # Run all tests
npm run test:watch    # Watch mode
```

Tests cover the liturgical calendar logic (`src/liturgy/calendar.test.ts`). The test suite verifies season boundaries, feast day classification, Lent Sunday numbering, Proper assignment, and lectionary year selection.
