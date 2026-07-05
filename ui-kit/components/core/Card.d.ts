import * as React from 'react';

export type CardVariant = 'default' | 'sunk' | 'flat' | 'illuminated';

/**
 * A ruled card on the night ground. `illuminated` draws a gilt double-frame
 * for sacred or featured content; `sunk`/`flat` recede.
 *
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default 'default' */
  variant?: CardVariant;
  /** Small-caps rubric-red kicker above the title. */
  eyebrow?: React.ReactNode;
  /** Display-serif title. */
  title?: React.ReactNode;
  /** Adds hover affordance for clickable cards. @default false */
  interactive?: boolean;
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): JSX.Element;
