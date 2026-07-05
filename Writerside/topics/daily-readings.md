# Daily Readings

The **Daily Readings** screen (`/daily-readings`) shows the scripture lectionary for today's Daily Office.

## Lectionary system

The BCP 1979 Daily Office Lectionary is a two-year cycle:

- **Year One** — used in odd civil years (2025, 2027, …)
- **Year Two** — used in even civil years (2026, 2028, …)

Each day provides two readings: one from the Old Testament (or Acts during Eastertide) and one from the New Testament.

## Data source

Lectionary data is adapted from the [reubenlillie/daily-office](https://github.com/reubenlillie/daily-office) project and bundled locally as JSON:

- `src/content/lectionary/year-one.json`
- `src/content/lectionary/year-two.json`

Readings are keyed by liturgical season and week, with overrides for major feasts.

## Scripture text

The Daily Readings screen shows the citation (e.g., "Isaiah 40:1–11") and links to the passage. Full reading text is not bundled — it is shown as a citation with the expectation that you have a Bible or use a linked Bible app.

## How the lookup works

`src/liturgy/lectionary.ts` takes a `LiturgicalDay` object (from `calendar.ts`) and returns the morning and evening readings for that day. It:

1. Determines the lectionary year (odd → Year One)
2. Maps the liturgical season and week to the correct JSON entry
3. Returns an array of `{ citation, testament }` objects

Sunday readings use a separate three-year cycle (Years A, B, C) tracked in the same file.
