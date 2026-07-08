import * as React from 'react';

export interface FloatingNavItem {
  id: string;
  label: string;
  /** Lucide icon name. */
  icon: string;
}

/**
 * FloatingNav — the app's floating pill tabs (Home · Office · Psalter · More):
 * icon-over-label buttons in a rounded bar. `glass` sits over full-bleed
 * imagery with light text; `solid` sits on a raised surface with the active
 * tab in the season accent. Controlled via `active` / `onChange`.
 */
export interface FloatingNavProps extends React.HTMLAttributes<HTMLElement> {
  items: FloatingNavItem[];
  /** The active item's id. */
  active?: string;
  onChange?: (id: string) => void;
  /** @default 'glass' */
  variant?: 'glass' | 'solid';
}

export declare function FloatingNav(props: FloatingNavProps): JSX.Element;
