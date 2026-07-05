import * as React from 'react';

export type RubricVariant = 'default' | 'sm' | 'heading';

/**
 * A rubric — the red-letter direction that tells the worshipper what to do
 * ("The Officiant begins…", "All standing"). Italic rubric-red by default;
 * `heading` renders a small-caps section mark.
 *
 */
export interface RubricProps extends React.HTMLAttributes<HTMLElement> {
  /** @default 'default' */
  variant?: RubricVariant;
  /** Center the rubric. @default false */
  center?: boolean;
  /** Element/tag to render. @default 'p' */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

export declare function Rubric(props: RubricProps): JSX.Element;
