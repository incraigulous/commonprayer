import * as React from 'react';

/**
 * SessionBar — the office reading-view top bar: a back/close control on the
 * left, the "AA" text-size control on the right, and an optional centred title.
 * Presentational.
 */
export interface SessionBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Centred title. Omit for a bare bar (back + AA only). */
  title?: React.ReactNode;
  /** Lead-control icon name — a back chevron or a close ✕. @default 'chevron-left' */
  leadIcon?: string;
  /** Lead-control handler (back / close). */
  onBack?: () => void;
  /** Text-size (AA) handler. */
  onTextSize?: () => void;
  /** Show the AA text-size control. @default true */
  showTextSize?: boolean;
  /** Draw the bottom hairline. @default true */
  hairline?: boolean;
  /** Accessible label for the lead control. @default 'Back' */
  backLabel?: string;
}

export declare function SessionBar(props: SessionBarProps): JSX.Element;
