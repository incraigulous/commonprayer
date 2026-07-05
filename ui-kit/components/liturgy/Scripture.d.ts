import * as React from 'react';

/**
 * A scripture reading block — verse text set apart by a rubric-red rule,
 * with a small-caps citation and an optional gilt cross mark.
 * `illuminated` adds the full gilt frame for the day's principal lesson.
 *
 */
export interface ScriptureProps extends React.HTMLAttributes<HTMLElement> {
  /** Reference, e.g. "John 4:6–32 (NLT)". */
  cite?: React.ReactNode;
  /** @default 'quiet' */
  variant?: 'quiet' | 'illuminated';
  /** Show the gilt cross mark. @default true */
  mark?: boolean;
  children?: React.ReactNode;
}

export declare function Scripture(props: ScriptureProps): JSX.Element;
