The app-open lockup — a gilt cross, thin rule, the wordmark and a small-caps byline on a deep ground.

```jsx
const { SplashScreen } = CommonPrayerDesignSystem;

// Show on load, fade out once the app has mounted:
<SplashScreen word="Prayer Book" subtitle="by Via Media" />
```

- **Fills its container** — overlay it full-screen (`position:fixed; inset:0`) above the app, then fade+remove after mount.
- The cross gently **glows on a loop**; `enter` plays a one-shot rise-in for the lockup. Both respect `prefers-reduced-motion`.
- **glyph / background / gilt / wordColor** are all overridable; defaults are the Latin cross on the brand ink ground.
- Presentational — the host owns the show/hide + timing.
