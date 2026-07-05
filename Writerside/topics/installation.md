# Installation

## Install as a PWA (recommended)

Common Prayer is a Progressive Web App — no app store required.

### iOS (Safari)
1. Open the app in Safari.
2. Tap the **Share** button (box with arrow).
3. Tap **Add to Home Screen**.
4. Tap **Add**.

The app launches in standalone mode with no browser chrome.

### Android (Chrome)
1. Open the app in Chrome.
2. Tap the **⋮** menu.
3. Tap **Add to Home Screen** (or **Install app** if prompted by the banner).

### Desktop (Chrome / Edge)
Click the install icon in the address bar, or open the browser menu and choose **Install Common Prayer**.

## Development setup

### Requirements

- Node.js 18 or higher
- npm 9 or higher

### Install dependencies

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production build

```bash
npm run build
npm run preview
```

The `preview` command serves the built PWA locally including the service worker, so you can test offline behavior before deploying.

## Environment

No environment variables are required. All content is either bundled as JSON assets or fetched from `bible-api.com` (KJV psalms) at runtime.
