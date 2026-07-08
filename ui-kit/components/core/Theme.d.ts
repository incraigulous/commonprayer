import * as React from 'react';

export type ThemeMode = 'system' | 'light' | 'dark';
export type SeasonId = 'advent' | 'christmas' | 'epiphany' | 'lent' | 'easter' | 'pentecost' | 'ordinary';
export type DisplaySize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Theme — sets the `data-theme` / `data-season` attributes (and
 * `--reading-scale`) that every other component reads its colours and
 * reading size from. Every token in `tokens/colors.css` and
 * `tokens/seasons.css` is keyed off these two attributes on some ancestor
 * element — Theme is just a nestable place to put them, instead of hand-
 * setting `document.documentElement` the way the app does at its root.
 *
 * Presentational — `season` takes a single resolved season id. Resolving
 * the "Seasonal" / "Time of Day" auto modes from `DisplayMenu` (via
 * `timeOfDaySeason` or your own liturgical calendar) is the consumer's job,
 * same as `DisplayMenu` and `Masthead`.
 */
export interface ThemeProps extends React.HTMLAttributes<HTMLElement> {
  /** @default 'system' — resolved via the `[data-theme="auto"]` OS media query. */
  theme?: ThemeMode;
  /** Omit for the base rubric accent (no liturgical season pinned). */
  season?: SeasonId;
  /** Reading-text scale, mirrors `TypeScale` / `DisplayMenu`. @default 'md' */
  size?: DisplaySize;
  /** Element type for the wrapper. @default 'div' */
  as?: keyof JSX.IntrinsicElements;
}

export declare function Theme(props: ThemeProps): JSX.Element;
