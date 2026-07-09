import * as React from 'react';

export interface TabItem {
  /** Stable id returned by onChange. */
  id: string;
  /** Tab label. */
  label: React.ReactNode;
}

/**
 * The in-office step tabs (Opening · Psalm · Scripture …): a
 * horizontal-scrolling row of section tabs, each active one carrying its own
 * accent underline — the tabs used at the top of the office in the app.
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  /** Selected id (controlled). Falls back to the first item. */
  value?: string;
  /** Called with the selected id. */
  onChange?: (id: string) => void;
}

export declare function Tabs(props: TabsProps): JSX.Element;
