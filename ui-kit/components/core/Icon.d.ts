import * as React from 'react';

/**
 * A line-art icon rendered from the Lucide set (thin, rounded strokes that
 * match the manuscript line-work). Lucide is a documented substitute for the
 * production icon set — see readme.md "Iconography". Common names for the
 * office: `sunrise`, `sun`, `moon`, `menu`, `book-open`, `bookmark`,
 * `calendar`, `cross`, `settings`, `chevron-left`, `play`, `pause`,
 * `more-horizontal`, `x`, `heart`, `feather`.
 *
 */
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide icon name (kebab-case), e.g. "book-open". */
  name: string;
  /** Box size (any CSS length). @default '1.25rem' */
  size?: string;
  /** Stroke width. @default 1.75 */
  strokeWidth?: number;
}

export declare function Icon(props: IconProps): JSX.Element;
