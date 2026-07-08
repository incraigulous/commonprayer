import * as React from 'react';

/**
 * StartScreen — the office entry screen: a full-bleed image behind a frosted
 * chapel-arch card with the date, the day's theme, the office name, and a
 * Begin button. Fills its container. Presentational.
 */
export interface StartScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Background image URL (full-bleed behind the card). */
  image?: string;
  /** Small caps date above the title. */
  date?: string;
  /** The day's theme — the large display heading in the arch. */
  title: string;
  /** Italic sub-line under the title (e.g. office · series). */
  subtitle?: string;
  /** Begin-button label. @default 'Begin' */
  buttonLabel?: string;
  /** Begin-button handler. */
  onBegin?: () => void;
  /** Button background colour. @default 'var(--accent)' */
  accent?: string;
  /** Button text colour. @default '#fff' */
  textColor?: string;
  /** Draw frosted stained-glass leading lines inside the arch. @default true */
  glassLines?: boolean;
  /** Content floated over the image above the card (e.g. a period switcher). */
  top?: React.ReactNode;
  /** Extra content rendered inside the arch, under the button. */
  children?: React.ReactNode;
}

export declare function StartScreen(props: StartScreenProps): JSX.Element;
