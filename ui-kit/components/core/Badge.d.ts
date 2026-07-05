import * as React from 'react';

export type BadgeVariant = 'default' | 'rubric' | 'gilt' | 'sage' | 'violet' | 'solid';

/**
 * A small-caps pill for liturgical metadata — the proper, the season, a
 * lesson marker. Seasonal colours: `sage` (ordinary/green), `violet`
 * (Advent/Lent), `gilt` (feasts), `rubric` (emphasis).
 *
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default 'default' */
  variant?: BadgeVariant;
  children?: React.ReactNode;
}

export declare function Badge(props: BadgeProps): JSX.Element;
