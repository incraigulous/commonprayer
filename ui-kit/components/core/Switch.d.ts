import * as React from 'react';

/**
 * Switch — a labelled toggle field (a "light switch"): a pill track with a
 * sliding thumb, an inline label and optional help text. Controlled; the track
 * fills with the theme `--accent` when on. Optional glyphs ride in the thumb.
 */
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Inline label to the left of the track. */
  label?: React.ReactNode;
  /** Small help line under the label. */
  help?: React.ReactNode;
  /** On/off state (controlled). @default false */
  checked?: boolean;
  /** Fired with the next boolean state. */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Disable interaction. @default false */
  disabled?: boolean;
  /** Glyph shown in the thumb when on (e.g. a sun). */
  onGlyph?: React.ReactNode;
  /** Glyph shown in the thumb when off (e.g. a moon). */
  offGlyph?: React.ReactNode;
}

export declare function Switch(props: SwitchProps): JSX.Element;
