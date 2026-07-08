import * as React from 'react';

/**
 * SplashScreen — the app-open lockup: a gilt cross, thin rule, the wordmark and
 * a small-caps byline on a deep ground. Fills its container. Presentational —
 * the host fades it out once the app has mounted.
 */
export interface SplashScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Wordmark. @default 'Prayer Book' */
  word?: string;
  /** Small-caps byline. @default 'by Via Media' */
  subtitle?: string;
  /** Cross glyph. @default '✝' (Latin cross) */
  glyph?: string;
  /** Ground colour. @default '#ffffff' */
  background?: string;
  /** Cross / rule / byline colour. @default 'var(--gilt)' */
  gilt?: string;
  /** Wordmark colour. @default 'var(--text)' */
  wordColor?: string;
  /** Leading-line colour of the background mosaic. @default 'rgba(26,18,10,.34)' */
  lead?: string;
  /** Play the one-shot rise-in entrance. @default true */
  enter?: boolean;
}

export declare function SplashScreen(props: SplashScreenProps): JSX.Element;
