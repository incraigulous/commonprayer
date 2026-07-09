import * as React from 'react';

export interface ActionMenuItem {
  /** Lucide icon name. */
  icon: string;
  label: string;
  onClick?: () => void;
}

/**
 * ActionMenu — a floating action button that expands into a short stack of
 * icon items. Self-managed open state; the main button rotates 45° when
 * open. Position it yourself (it's inline by default).
 */
export interface ActionMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ActionMenuItem[];
  /** Icon shown in the main button. @default 'plus' */
  mainIcon?: string;
  /** Accessible label for the main button. @default 'Actions' */
  mainLabel?: string;
}

export declare function ActionMenu(props: ActionMenuProps): JSX.Element;
