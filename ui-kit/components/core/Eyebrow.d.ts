import * as React from 'react';

/**
 * A small-caps label above a heading or card title — the manuscript's
 * rubric tag (e.g. "Morning Prayer", "The Collect"). Always the live
 * accent color.
 */
export interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  /** Element/tag to render as. @default 'p' */
  as?: React.ElementType;
  children?: React.ReactNode;
}

export declare function Eyebrow(props: EyebrowProps): JSX.Element;
