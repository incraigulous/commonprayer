---
name: common-prayer-design
description: Use this skill to generate well-branded interfaces and assets for Common Prayer (a daily-office prayer app by Via Media), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping — a modern illuminated-manuscript style: black-and-white line-art, deep night-office ground, warm vellum serif type, rubric red, and gilt illuminated initials.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Where things are
- `styles.css` — the single stylesheet to link; imports all tokens & fonts.
- `tokens/` — colors, typography, spacing, effects, base, fonts (CSS custom properties).
- `components/` — reusable React primitives (Button, Card, Field, Badge, Icon, Tabs, Callout, and liturgy pieces: IlluminatedInitial, Rubric, Versicle, SectionHeading, OrnamentalDivider, Scripture). Each has a `.d.ts` contract and a `.prompt.md` usage note.
- `ui_kits/common-prayer/` — a click-through recreation of the app.
- `guidelines/` — foundation specimen cards.

## The essentials
- **Dark-first**, deep-navy "night office" ground; warm vellum serif ink. Light "parchment" mode via `data-theme="light"` on `<html>`.
- **Two accents, one job each:** rubric red = directions/response/primary action; illuminated gold = gilt initials & sacred framing (sparingly).
- **Type:** Cormorant Garamond (display), EB Garamond (body/scripture), a UI sans for small-caps chrome only. *(Google-Fonts substitutes — see readme flags.)*
- **The rubric principle:** red is for instruction, never for the words you pray.
- **Line-art discipline:** hairline ruled borders, restrained radii, barely-there shadows, no gradients/photos/emoji. Icons are Lucide (substitute).
