import * as React from 'react';

export type CalloutVariant = 'note' | 'prayer' | 'blessing' | 'refrain';

/**
 * A callout aside set apart from the flowing office text. `note` is a quiet
 * ruled aside; `prayer` a gilt-framed collect; `blessing` the centred
 * closing grace; `refrain` a rubric-ruled antiphon.
 *
 */
export interface CalloutProps extends React.HTMLAttributes<HTMLElement> {
  /** @default 'note' */
  variant?: CalloutVariant;
  /** Small-caps heading with a leading glyph. */
  title?: React.ReactNode;
  /** Override the leading glyph. */
  glyph?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function Callout(props: CalloutProps): JSX.Element;
