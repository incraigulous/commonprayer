import * as React from 'react';

/**
 * Mosaic — a vector stained-glass panel: a deterministic jittered quad mesh
 * tinted from `colors`, leaded with a dark join, whose panes optionally shimmer
 * on slow, staggered cycles. Fills its container (`width:100%; height:100%`);
 * the caller sizes, clips or masks it. Presentational.
 */
export interface MosaicProps extends React.SVGAttributes<SVGSVGElement> {
  /** Tile palette (light → deep). Falls back to `currentColor`. */
  colors: string[];
  /** Seed for the deterministic pattern + shimmer timing. @default 9 */
  seed?: number;
  /** Grid columns. @default 10 */
  cols?: number;
  /** Grid rows. @default 8 */
  rows?: number;
  /** viewBox width. @default 420 */
  width?: number;
  /** viewBox height. @default 300 */
  height?: number;
  /** Shimmer the panes (honours prefers-reduced-motion). @default true */
  animate?: boolean;
  /** Leading (stroke) colour between panes. @default 'rgba(26,18,10,.45)' */
  lead?: string;
  /** Leading (stroke) width in px. @default 1.2 */
  strokeWidth?: number;
}

export declare function Mosaic(props: MosaicProps): JSX.Element;
