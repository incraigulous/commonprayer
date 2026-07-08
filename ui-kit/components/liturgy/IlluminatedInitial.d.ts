import * as React from 'react';

export type InitialTone = 'gilt' | 'rubric' | 'ink';

/**
 * The illuminated initial — a large display-serif drop-cap opening a psalm,
 * canticle, or reading: the gilt letter alone, floated into the text. Pass the
 * opening letter as `letter` and the remainder of the first paragraph as
 * children (starting mid-word, e.g. "ome, let us sing…").
 *
 */
export interface IlluminatedInitialProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** The initial letter. */
  letter: string;
  /** Tone of the initial. @default 'gilt' */
  variant?: InitialTone;
  children?: React.ReactNode;
}

export declare function IlluminatedInitial(props: IlluminatedInitialProps): JSX.Element;
