import * as React from 'react';

export interface TabItem {
  /** Stable id returned by onChange. */
  id: string;
  /** Tab label. */
  label: React.ReactNode;
  /** Icon node (used in the `bar` variant). */
  icon?: React.ReactNode;
}

/**
 * Tabs for the daily office. `bar` is the bottom navigation (icon over
 * label, rubric top-mark on the active office); `underline` switches
 * in-page sections with a rubric underline.
 *
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  /** Selected id (controlled). Falls back to the first item. */
  value?: string;
  /** Called with the selected id. */
  onChange?: (id: string) => void;
  /** @default 'underline' */
  variant?: 'underline' | 'bar';
}

export declare function Tabs(props: TabsProps): JSX.Element;
