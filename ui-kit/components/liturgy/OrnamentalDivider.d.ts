import * as React from 'react';

export type DividerGlyph = 'cross' | 'latin' | 'fleuron' | 'diamond' | 'asterism' | 'none';

/**
 * An ornamental divider — a hairline rule centred on a small manuscript
 * glyph — for the quiet breaks between offices and readings.
 *
 */
export interface OrnamentalDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Centre glyph, or a custom string. @default 'cross' */
  glyph?: DividerGlyph | string;
  /** Glyph colour. @default 'gilt' */
  tone?: 'gilt' | 'rubric';
}

export declare function OrnamentalDivider(props: OrnamentalDividerProps): JSX.Element;
