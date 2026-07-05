# Contributing

Common Prayer is source-available under the [Elastic License 2.0](https://www.elastic.co/licensing/elastic-license). Contributions are welcome.

## Development workflow

### Setup

```bash
git clone https://github.com/incraigulous/commonprayer.git
cd commonprayer
npm install
npm run dev
```

### Before opening a PR

Run the full check suite and make sure everything passes:

```bash
npm run lint:all   # typecheck + ESLint + Stylelint
npm run test       # Vitest unit tests
npm run build      # production build must succeed
```

### Commit style

Use clear, imperative commit messages describing the *why* of the change, not the what. Examples:

- `fix calendar: Pentecost Day belongs to Easter season, not Pentecost`
- `add Gloria Patri toggle to onboarding step 2`

### Branch naming

Work on feature branches off `main`. Name them `feature/short-description` or `fix/short-description`.

## Liturgical content

If you're adding or correcting prayer text, please cite the relevant BCP 1979 page number in your PR description. All content must be from the 1979 Book of Common Prayer (public domain) or *Enriching Our Worship* (ECUSA, reproduced with permission).

## Adding a new office element

1. Add the LDF JSON to the appropriate content file in `src/content/`.
2. Ensure the `type` field matches an existing renderer in `LiturgicalDocument.tsx`, or add a new case.
3. Verify it renders correctly in both Rite I and Rite II contexts.

## Reporting issues

Open an issue on GitHub with:
- Today's date (so the calendar state can be reproduced)
- The liturgical season and proper shown in the app
- What you expected vs. what you saw
- Device and browser version
