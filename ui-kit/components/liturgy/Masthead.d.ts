import * as React from 'react';

/**
 * Masthead — the full-bleed opening of a daily office: a solid
 * colour-of-the-day block with the date, the office name (the centred page
 * heading) and the appointed readings, and a vector stained-glass mosaic
 * fading up from its foot. Fills its container's height so the office content
 * scrolls up from beneath it.
 *
 * Presentational. `fill` / `textColor` default to the live `--accent` /
 * `--text-on-accent` (so it follows the season); pass explicit values plus a
 * matching `colors` palette to pin a colour.
 */
export interface MastheadProps extends React.HTMLAttributes<HTMLElement> {
  /** The office name — the centred page heading (e.g. "Evening Prayer"). */
  office: string;
  /** Traditional name shown smaller under the title (e.g. "Vespers", "Compline"). */
  tradition?: string;
  /** Long-form date shown above the title. */
  date?: string;
  /** Appointed readings, rendered as "Readings · A · B". */
  readings?: string[];
  /** Opening sentence/couplet, shown above the fold under the title. */
  opening?: string | string[];
  /** Background colour. @default 'var(--accent)' */
  fill?: string;
  /** Text colour on the fill. @default 'var(--text-on-accent)' */
  textColor?: string;
  /** Stained-glass tile palette (light → deep). Omit for a plain colour block. */
  colors?: string[];
  /** Seed for the (deterministic) glass pattern. @default 9 */
  seed?: number;
  /** Shimmer the glass panes (honours prefers-reduced-motion). @default true */
  animateGlass?: boolean;
  /** Extra content rendered under the readings line, inside the colour block. */
  children?: React.ReactNode;
}

export declare function Masthead(props: MastheadProps): JSX.Element;
