# B2C Media Cloud Product Recommender — Prototype

High-fidelity, clickable prototype for the Media Cloud B2C Product Recommender flow. Built with **React**, **TypeScript**, **Vite**, **Salesforce Lightning Design System (SLDS)**, and **Framer Motion**.

## Design

- **Design language:** Salesforce SLDS 2.0 (Neutral + Brand palettes, SLDS icons, spacing/typography tokens).
- **Font:** Salesforce Sans (fallback: Helvetica Neue, Arial, sans-serif) via CSS variable.
- **Layout:** Mobile-first; desktop uses a sidebar and centered content.

## User flow (4 screens)

1. **Discovery** — Google-style landing with central search (“Tell me what you love to watch…”) and clickable inspiration chips (e.g. “Live F1 & Documentaries”, “HBO Hits & 4K Movies”).
2. **Your bundle** — AI “processing” (spinner), then a single “Recommended for You” card: bundle name, add-on badges, automated discount, “Get Started” brand button, and “View price breakdown” opening a modal.
3. **Checkout** — Summary detail (line items + total), “Pay with Apple Pay” / “Google Pay” (AI wallet-sensing), and optional “Use card or other payment method”.
4. **Activation** — Success state (Welcome Mat style), “Watch Now” button, and a “Watch Now — Picked for you” content rail.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Tech notes

- **SLDS:** Loaded from the jsDelivr CDN in `index.html`. Buttons use `slds-button_brand`; global font is set in `App.css`.
- **Icons:** Inline SVGs in `src/components/Icons.tsx` so the app runs without copying SLDS icon assets.
- **Interactions:** All primary actions advance the flow; Framer Motion used for screen and hover/tap transitions.
- **Progress:** Top-of-screen progress indicator; desktop sidebar reflects the same steps.

If SLDS styles don’t load, check the CDN link in `index.html` or install `@salesforce-ux/design-system` and import the CSS from `node_modules`.

## Deploy to Heroku

App: **media-b2c-product-recommender** · Space: **industries-ux**

The repo is set up for Heroku: `Procfile` runs `serve` on the `dist` folder; `heroku-postbuild` runs `npm run build`.

1. **Log in to Heroku** (one time):  
   `heroku login`

2. **Add the Heroku remote** (if not already added):  
   `git remote add heroku https://git.heroku.com/media-b2c-product-recommender.git`

3. **Deploy**:  
   `git push heroku main`

4. **Open the app**:  
   `heroku open`  
   Or: **https://media-b2c-product-recommender.herokuapp.com** (or your space’s URL if using a Private Space).

If the app is in a **Private Space** with Trusted IP Ranges, only allowed IPs can reach it; use the URL Heroku shows after deploy.

**If you see a blank page after deploy:** The repo includes an `.npmrc` with `production=false` so Heroku installs devDependencies and the build (Vite + TypeScript) can run. If it still fails, set the config explicitly and redeploy:
```bash
heroku config:set NPM_CONFIG_PRODUCTION=false -a media-b2c-product-recommender
git commit --allow-empty -m "Trigger rebuild" && git push heroku main
```
