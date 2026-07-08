import React from 'react';
import { READING_SCALES } from './TypeScale.jsx';

// 'system' rides the [data-theme="auto"] media-query block in tokens/colors.css
// rather than resolving prefers-color-scheme in JS.
const THEME_ATTR = { system: 'auto', light: 'light', dark: 'dark' };

/**
 * Theme — sets the `data-theme` / `data-season` attributes (and
 * `--reading-scale`) that every other component reads its colours and
 * reading size from. A thin, nestable stand-in for what the app does by hand
 * on `<html>`: wrap a subtree to scope it to a theme/season/size, or wrap the
 * whole app at the root.
 */
export function Theme({
  theme = 'system',
  season,
  size = 'md',
  as = 'div',
  style,
  children,
  ...rest
}) {
  const Tag = as;
  return (
    <Tag
      data-theme={THEME_ATTR[theme] ?? 'dark'}
      data-season={season || undefined}
      style={{ ...style, '--reading-scale': READING_SCALES[size] ?? 1 }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
