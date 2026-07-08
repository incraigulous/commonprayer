# Common Prayer — Design System

> **Via Media** · *a modern book of hours* **Keywords: Modern · Ancient · Illuminated**

Common Prayer is a daily-office prayer app by **Via Media**. It leads people through **Morning, Noonday, and Evening Prayer** — the historic rhythm of fixed-hour prayer — rendered for a phone. The visual world is a **modern illuminated manuscript**: fine black-and-white line-work, a deep "night office" ground, warm vellum type, traditional **rubric red** for instructions, and **gilt illuminated initials** opening the psalms.

This design system holds the brand'sù tokens, fonts, reusable components, and a click-through recreation of the app.

## Sources given

- `assets/inspiration/sanctuary-tulsa-logo.webp` — the **Sanctuary Tulsa** church mark, supplied as *look-and-feel inspiration only*. Its fine, ruled, single-weight ecclesiastical line-work sets the tone. **It is not the Common Prayer logo** and must not be used as one.
- `uploads/localhost_5173_morning.png` — screenshot of the Common Prayer prototype (the source of truth for colour, type, and the rubric system).
- `uploads/lectio365.com_midday-prayer_.png` — Lectio 365 (24-7 Prayer), a *reference we admire but do not copy*: its calm serif reading experience, set-apart scripture blocks, and gentle sectioning informed our structure — not its palette (theirs is amber-on-white; ours is ink-on-night).

No Common Prayer / Via Media logo was provided, so the brand is set as a **type wordmark** (see `guidelines/brand-wordmark.card.html`). Do not invent a mark.

---

## Content fundamentals — how Common Prayer writes

**Two registers, kept distinct — this is the heart of the brand:**

1. **The words we pray** — the liturgy and scripture itself. Set in warm vellum ink, serif, unhurried. Traditional, reverent, timeless English ("Almighty and most merciful Father, we have erred and strayed from your ways like lost sheep."). Second person addressed **to God** ("*you* have brought us in safety to this new day").

2. **The rubrics** — the *directions to the worshipper*. Always **rubric red**, italic, quiet, in the third person ("*The Officiant begins the service…*", "*All kneeling*", "*A pause is kept*"). Rubrics tell you what to **do**; they are never the content you say. This red-letter distinction is inviolable — see `guidelines/brand-rubric.card.html`.

**Voice & tone**

- **Reverent, plain, unhurried.** No marketing gloss, no exclamation.
- **Casing:** Title Case for office and section titles ("Morning Prayer", "The Invitatory", "A Collect for Grace"). Small-caps for UI/metadata labels.
- **Pronouns:** worshipper is "we/us/I"; God is "you/your" (lower-case reverential "you", contemporary style). Speaker marks are "Officiant" / "People".
- **Numbers & refs:** scripture citations in small-caps ("John 4:6–32 (NLT)"); liturgical propers as "Proper 9"; dates long-form ("July 5, 2026").
- **Emoji:** never. (The prototype's temporary sun/moon emoji are replaced by line-art `Icon`s.) Ornament comes from manuscript glyphs — ✠ † ❦ ❖ — not emoji.
- **The vibe:** a well-made prayer book you'd keep by the bed — ancient bones, modern comfort.

---

## Visual foundations

**Palette.** Dark-first. The ground is a near-black navy **"night office"** (`--ink-950 #04070f`); surfaces step up through deep navies. Type is **warm vellum** (`--vellum-text #ece7db`). Two accents, each with one job:

- **Rubric red** (`--rubric-500 #d65846`) — directions, response marks, the one clear action, active nav.
- **Illuminated gold** (`--gold-500 #c9a24b`) — gilt initials, ornamental glyphs, framed sacred content. Used sparingly, like real gold leaf. Seasonal marks: **sage** (Ordinary Time), **violet** (Advent/Lent), **gilt** (feasts). A full **light "parchment" mode** (ink on warm vellum) mirrors every semantic token — set `data-theme="light"` (or `"dark"`, default) on `<html>`; `"auto"` follows the OS.

**Type.** Four voices: **Cormorant Garamond** (display — titles, dates; high-contrast old-style serif), **EB Garamond** (the reading voice — liturgy & scripture, 17px / 1.68 line-height), **Goudy Initialen** (the illuminated drop-cap letters — a refined foliate-capitals face, **supplied by the client** and bundled locally at `assets/fonts/GoudyIni.ttf`), and a **UI sans** (system stack) used *only* for small-caps chrome labels and metadata. The two book serifs are Google Fonts substitutes for the prototype's body serif — **flagged below**; the initial-cap face is the real thing.

**Spacing & layout.** 4px base scale; calm vertical rhythm. Reading column held near **36rem (\~66 characters)**. Single centered column; content scrolls between a fixed top bar and a fixed bottom office nav.

**Backgrounds.** Flat colour — no gradients, no photographic imagery, no textures. The manuscript feeling comes from *line-work and type*, not fills. The only "gradient" token is a hairline rule-fade for ornaments.

**Borders & shape.** **Hairline ruled borders (1px)** do the structural work — this is line-art. Radii are restrained (2–12px); cards and inputs read as ruled leaves, not soft cards. Illuminated frames use a **2px gilt border** with an inset gilt line.

**Shadows.** Barely-there. Elevation over the night ground is mostly signalled by border and surface-step, not shadow. Shadows exist (`--shadow-sm/md/lg`) for the app frame and overlays only.

**Cards** are ruled surfaces (`--surface-raised`, 1px `--border`, 8px radius). The **illuminated** variant swaps to a gilt double-frame for featured/sacred content.

**Motion.** Unhurried and contemplative — short fades and colour transitions (120–360ms, standard/soft easing). No bounces, no infinite loops. Respect `prefers-reduced-motion` (handled in `tokens/base.css`).

**Interaction states.** *Hover:* rubric fills lighten (`--accent-hover`); outline/ghost gain border/surface tint. *Press:* a 1px downward nudge on buttons; rubric fills deepen (`--accent-press`). *Focus:* a soft rubric focus ring (`--focus-ring`). *Active nav:* rubric underline (tabs) or rubric top-mark (bottom bar), with the icon turning rubric red.

**Transparency & blur.** Used sparingly via `color-mix` for quiet tints (`--accent-quiet`, `--gilt-quiet`, `--hairline`). No glassmorphism.

**Imagery vibe.** Monochrome line-art only; if photography is ever introduced it should be duotone/ink-toned to sit in the night ground — but the system ships none.

---

## Iconography

- **Icon set:** **Lucide** — thin, rounded, single-weight strokes that match the manuscript line-work. Rendered by the `Icon` component (loads Lucide from CDN; stroke-width 1.75 for a fine line). **Lucide is a documented substitute** — no production icon set was supplied. If Common Prayer has its own icons, drop the SVGs into `assets/icons/` and repoint `Icon`. *(Flagged below.)*
- **Common office icons:** `sunrise` (Morning), `sun` (Noon), `moon` (Evening), `more-horizontal` (More), `book-open`, `bookmark`, `calendar`, `feather`, `settings`, `menu`, `chevron-right`.
- **Ornamental glyphs** (not icons) come from Unicode manuscript marks used by `OrnamentalDivider` and callouts: ✠ (maltese cross), † (latin cross), ❦ (fleuron), ❖ (diamond), ⁂ (asterism), ✟, ❧.
- **Emoji:** never used.
- **The brand mark:** rendered as a type wordmark (no supplied logo). A small ✠ / rule / "VIA MEDIA" lockup stands in where a mark would go.

---

## Components

Public API is `window.CommonPrayerDesignSystem_91d70c.<Name>`. Styling is bound to the design tokens; every component works in both dark and light mode.

**Core** (`components/core/`)

- **Button** — actions in four voices: primary (rubric), secondary (ruled outline), ghost (quiet), gilt (sacred, e.g. "Amen").
- **Card** — ruled container; `illuminated` gilt-frame variant.
- **Field** — labelled input / textarea with help & error states.
- **Switch** — labelled toggle field (a "light switch"); track fills with the theme accent, optional sun/moon thumb glyphs.
- **Badge** — small-caps pill for propers & seasons (rubric/gilt/sage/violet).
- **Icon** — Lucide line-art icon wrapper.
- **TypeScale** — reading-size control (Small · Regular · Large · Extra large); drives `--reading-scale` to resize the reading text only.
- **DisplayMenu** — reading-display settings panel: Theme (System · Light · Dark), Color (Seasonal & Time-of-Day auto modes plus every liturgical season) and Text size. Self-colouring — paints in the current `--accent`.
- **ActionMenu** — a floating action button that expands into a short stack of icon items (Share / Note / Remind).

**Navigation** (`components/navigation/`)

- **Tabs** — the in-office step tabs (Opening · Psalm · Scripture …): a horizontal-scrolling row with a rubric-accent underline on the active tab.
- **SessionBar** — office reading-view top bar: back / close + AA text-size control.
- **FloatingNav** — the app's floating pill tabs (Home / Office / Psalter / More), `glass` and `solid` variants.

**Feedback** (`components/feedback/`)

- **Callout** — note / prayer / blessing / refrain asides.

**Liturgy** (`components/liturgy/`)

- **Masthead** — the colour-of-the-day office opening: date, office name (the centred page heading) and readings, with a shimmering stained-glass mosaic fading up from its foot.
- **Mosaic** — a vector stained-glass panel whose panes shimmer on slow, staggered cycles; sized/clipped/masked by its container.
- **StartScreen** — the office entry screen: arch card with the day's theme and a Begin button over a full-bleed photo.
- **SplashScreen** — the app-open lockup: gilt cross, wordmark and byline on a deep ground, with a one-shot rise-in and a gently glowing cross.
- **IlluminatedInitial** — gilt drop-cap opening a psalm or reading.
- **Rubric** — the red-letter direction to the worshipper.
- **Versicle** — Officiant/People call-and-response.
- **SectionHeading** — display-serif heading with the rubric rule.
- **OrnamentalDivider** — hairline rule centred on a manuscript glyph.
- **Scripture** — set-apart verse with citation and gilt cross mark.

Each component directory carries a `@dsCard` showcase (`*.card.html`), a `.d.ts` props contract, and a `.prompt.md` usage note.

### Intentional additions

Because no source component library was supplied, the inventory was authored to the brand. Beyond the user-requested **Button, Card, Field, Callout, Scripture, Rubric, Tabs**: `Badge`, `Icon`, `IlluminatedInitial`, `Versicle`, `SectionHeading`, and `OrnamentalDivider` were added — each earns its place in a daily-office reading view (metadata pills, line-art icons, the illuminated cap, antiphonal responses, section marks, and quiet dividers).

`FloatingNav` and `ActionMenu` were promoted from the `ui_kits/common-prayer` click-through recreation, where they'd been inlined page-specific patterns (the app's Home/Office/Psalter/More bottom nav and the Share/Note/Remind FAB) with no formal `components/` counterpart. Given their reuse across screens and season-accent-aware styling, they earn a place as first-class components alongside `Tabs` and `SessionBar`.

---

## ⚠️ Flags for the user (please confirm)

1. **Body serifs are substitutes.** The prototype's exact reading serif wasn't supplied; we use **Cormorant Garamond** (display) + **EB Garamond** (body) from Google Fonts. If you have the licensed originals, send them and we'll swap in local `@font-face` rules (`tokens/fonts.css`). *(The illuminated initial-cap font, **Goudy Initialen**, is the client-supplied original and is bundled locally — not a substitute.)*
2. **Icons are Lucide (substitute).** If Common Prayer has a bespoke icon set, share the SVGs and we'll repoint `Icon`.
3. **No logo supplied** — brand is set as a type wordmark. If Via Media has a mark, send it.
4. Liturgical text in the UI kit is representative daily-office language, not a specific authorized edition — confirm the source text you want to ship.

---

## Index / manifest (root)

- `styles.css` — **the single entry point** consumers link (imports only).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `base.css`.
- `components/` — `core/`, `navigation/`, `feedback/`, `liturgy/` (see above).
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `ui_kits/common-prayer/` — click-through app recreation (`index.html`, `App.jsx`, `screens.jsx`, `data.js`).
- `templates/` — starting-point layouts consuming projects can copy.
- `assets/inspiration/` — the Sanctuary reference mark.
- `SKILL.md` — Agent-Skills-compatible entry point.
- `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` — generated; do not edit.
