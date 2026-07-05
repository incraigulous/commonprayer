import * as React from 'react';

/**
 * A labelled text field for the rare moments the office asks for input —
 * a prayer intention, a journal note, an email at sign-in. Single-line by
 * default; set `multiline` for a textarea.
 *
 */
export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Small-caps field label. */
  label?: React.ReactNode;
  /** Helper text below the control. */
  help?: React.ReactNode;
  /** Error message — turns the field rubric-red and overrides `help`. */
  error?: React.ReactNode;
  /** Show a rubric-red required asterisk. @default false */
  required?: boolean;
  /** Render a textarea. @default false */
  multiline?: boolean;
  /** Rows when `multiline`. @default 3 */
  rows?: number;
}

export declare function Field(props: FieldProps): JSX.Element;
