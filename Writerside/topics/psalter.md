# Psalter

The app provides all 150 Psalms in the King James Version (public domain), fetched from [bible-api.com](https://bible-api.com) on demand.

## Browsing the Psalter

Open the hamburger menu and tap **Psalter**. The index lists all 150 Psalms by number. Tap any Psalm to open its full text.

## How psalms are fetched

Psalms are not bundled locally. When you open a Psalm, the app fetches it from:

```
https://bible-api.com/psalm+{number}?translation=kjv
```

The response is parsed and rendered in the standard BCP format with verse numbers and hanging indentation. If the fetch fails (e.g., no network), an error message is shown.

After the first load, the service worker may cache the response so subsequent views work offline.

## Psalms in the Daily Office

The Daily Office assigns psalms from the BCP 30-day cycle (based on the calendar day of the month, 1–30). The cycle repeats monthly. Feast days and special occasions may override the cycle with proper psalms.

The assigned psalms are displayed as rendered psalm documents within the office — not linked out to the Psalter browser.

## Translation note

The app uses the King James Version because it is in the public domain and its cadence matches the BCP's liturgical register. The BCP 1979 psalter is a distinct translation; it will be added in a future update.
