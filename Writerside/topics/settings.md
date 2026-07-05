# Settings

Settings are configured once during first-launch onboarding and stored in `localStorage`. All preferences can be changed at any time from the **Settings** screen (`/settings`).

## Available settings

### Version

The liturgical version used for all offices:

| Value | Description |
|---|---|
| `rite-ii` | Contemporary language (default) |
| `rite-i` | Traditional language |
| `eow` | Enriching Our Worship — expansive language |
| `daily-devotions` | Shorter form for each time of day |

### Gloria Patri

When enabled, the doxology "Glory to the Father, and to the Son, and to the Holy Spirit; as it was in the beginning, is now, and will be forever. Amen." is appended after each psalm and canticle.

### Collects for minor feasts

When enabled, the proper collect for lesser feasts and fasts is included in the office on those days.

## Storage

Settings are persisted to `localStorage` under the key `cp_settings`. If localStorage is unavailable or full, settings update in memory for the session and are silently dropped — the app never crashes on storage errors.

## Onboarding

The first time the app loads, an onboarding wizard collects Version and Gloria Patri preferences (two steps). After completing onboarding, `hasCompletedOnboarding: true` is stored and the wizard is never shown again. To reset onboarding, clear `cp_settings` from localStorage.
