import * as React from 'react';

export type HeadingLevel = 'display' | 'office' | 'section';

/**
 * A display-serif section heading with the short rubric-red rule beneath —
 * the recurring mark that opens each part of the office ("Confession of
 * Sin", "The Lessons"). `display` for the office title, `section` for parts.
 *
 */
export interface SectionHeadingProps extends React.HTMLAttributes<HTMLElement> {
  /** Small-caps rubric-red kicker above the title. */
  eyebrow?: React.ReactNode;
  /** Size. @default 'section' */
  level?: HeadingLevel;
  /** Show the rubric rule beneath. @default true */
  rule?: boolean;
  /** Center everything. @default false */
  center?: boolean;
  /** Heading tag. @default 'h2' */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
