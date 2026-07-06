import * as React from 'react';

export type TypeSize = 'sm' | 'md' | 'lg' | 'xl';

/** Recommended `--reading-scale` multiplier for each step. */
export declare const READING_SCALES: Record<TypeSize, number>;

/**
 * Reading-size control — a segmented row of four "A" glyphs (Small · Regular ·
 * Large · Extra large) for adjusting the size of the prayed/read text only.
 * It is presentational; map the chosen size to `--reading-scale` (see
 * `READING_SCALES`) and set that token on a root so the liturgy components
 * (Scripture, Versicle, IlluminatedInitial, Callout, Rubric) rescale — while
 * headings, badges and chrome keep their fixed sizes.
 */
export interface TypeScaleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Currently selected size. @default 'md' */
  value?: TypeSize;
  /** Called with the new size when a step is chosen. */
  onChange?: (size: TypeSize) => void;
}

export declare function TypeScale(props: TypeScaleProps): JSX.Element;
