import * as React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gilt';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * The Common Prayer button. Serif-adjacent UI type on ruled forms.
 * `primary` for the main action, `secondary` for a ruled outline, `ghost`
 * for quiet inline actions, and `gilt` for singular sacred moments ("Amen").
 *
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment. @default 'primary' */
  variant?: ButtonVariant;
  /** Size. @default 'md' */
  size?: ButtonSize;
  /** Fill the container width. @default false */
  block?: boolean;
  /** Render as a different element/tag (e.g. 'a'). */
  as?: keyof JSX.IntrinsicElements;
  /** If set (and `as` is unset), renders an <a>. */
  href?: string;
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
