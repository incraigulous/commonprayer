import * as React from 'react';

export type ThemeMode = 'system' | 'light' | 'dark';
export type ColorAuto = 'seasonal' | 'time';
export type SeasonId = 'advent' | 'christmas' | 'epiphany' | 'lent' | 'easter' | 'pentecost' | 'ordinary';
export type ColorMode = ColorAuto | SeasonId;
export type DisplaySize = 'sm' | 'md' | 'lg' | 'xl';

export interface Option<T extends string> { id: T; label: string; }

/** Theme modes: System · Light · Dark. */
export declare const THEME_MODES: Option<ThemeMode>[];
/** Automatic colour modes — resolved to a season by the host at render time. */
export declare const COLOR_AUTO: Option<ColorAuto>[];
/** The seven liturgical seasons, in calendar order. */
export declare const COLOR_SEASONS: Option<SeasonId>[];
/** Reading-size steps (mirrors TypeScale). */
export declare const SIZE_STEPS: Option<DisplaySize>[];
/** Recommended `--reading-scale` per size step. */
export declare const DISPLAY_READING_SCALES: Record<DisplaySize, number>;

/** One of the four daily offices with its proper name + Time-of-Day season. */
export interface OfficePeriod {
  id: 'morning' | 'noonday' | 'evening' | 'compline';
  label: string;
  office: string;
  season: SeasonId;
  /** First hour (24h) this office is appointed. */
  from: number;
}

/**
 * The four daily offices, dawn → night, each mapped to the season colour the
 * "Time of Day" mode paints it in: Morning→Easter, Noonday→Ordinary,
 * Evening→Pentecost, Compline→Lent.
 */
export declare const OFFICE_PERIODS: OfficePeriod[];
/** The office appointed for a clock time (wraps past midnight to Compline). */
export declare function timeOfDayOffice(date?: Date): OfficePeriod;
/** The season colour for the "Time of Day" mode at a clock time. */
export declare function timeOfDaySeason(date?: Date): SeasonId;

/**
 * DisplayMenu — the reading-display settings panel: **Theme** (System · Light ·
 * Dark), **Color** (the Seasonal & Time-of-Day auto modes plus every
 * liturgical season) and **Text size**. Presentational and fully controlled;
 * the panel paints in the current `--accent`, so it previews the chosen
 * colour. Drop it inside a popover or sheet of your own — resolve the auto
 * modes with {@link timeOfDaySeason} and set `data-season` / `--reading-scale`
 * on a root.
 */
export interface DisplayMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Selected theme mode. @default 'system' */
  theme?: ThemeMode;
  onThemeChange?: (mode: ThemeMode) => void;
  /** Selected colour mode — an auto mode or a specific season. @default 'seasonal' */
  color?: ColorMode;
  onColorChange?: (mode: ColorMode) => void;
  /** Selected reading size. @default 'md' */
  size?: DisplaySize;
  onSizeChange?: (size: DisplaySize) => void;
  /** Optional italic hint under the colour pills (e.g. the resolved season). */
  colorHint?: React.ReactNode;
}

export declare function DisplayMenu(props: DisplayMenuProps): JSX.Element;
