import * as React from 'react';

export interface VersicleLine {
  /** Speaker mark, rendered small-caps rubric-red (e.g. "Officiant", "People", "℣", "℟"). */
  by: React.ReactNode;
  /** The spoken text. */
  text: React.ReactNode;
  /** Bold the text as a congregational response. */
  response?: boolean;
}

/**
 * A versicle-and-response exchange — the antiphonal call and answer of the
 * office. Speaker marks sit in a rubric-red small-caps column; responses
 * are set bold.
 *
 */
export interface VersicleProps extends React.HTMLAttributes<HTMLDivElement> {
  lines: VersicleLine[];
}

export declare function Versicle(props: VersicleProps): JSX.Element;
