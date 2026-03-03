# B2C Media Cloud Product Recommender — Prototype

High-fidelity, clickable prototype for the Media Cloud B2C Product Recommender flow. Built with **React**, **TypeScript**, **Vite**, **Salesforce Lightning Design System (SLDS)**, and **Framer Motion**.

## Design

- **Design language:** Salesforce SLDS 2.0 (Neutral + Brand palettes, SLDS icons, spacing/typography tokens). Colors use CSS variables with fallbacks (e.g. `var(--slds-g-neutral-95, #f3f3f3)`). See [SLDS 2 Design Tokens](https://www.lightningdesignsystem.com/design-tokens/) for reference.
- **UX alignment:** This prototype follows the Media B2C Product Recommender UX spec (discovery → bundle → validation → checkout → activation, with CTAs, modals, and copy as specified).
- **Font:** Salesforce Sans (fallback: Helvetica Neue, Arial, sans-serif) via CSS variable.
- **Layout:** Mobile-first; desktop uses centered content. On mobile, a bottom-fixed primary CTA appears for each step (Discover, Bundle, Validation, Checkout, Activate).

## User flow (5 steps)

1. **Discovery** — Central search (“Tell us what you love to watch…”), “Find My Best Plan”, “Browse Popular Plans” modal, and inspiration chips.
2. **Your bundle** — Best-fit card with “Why this plan?”, alternates, “Continue” and “Change Preferences”.
3. **Validate** — “Validating your setup” (device, network, location), then “Continue” to checkout.
4. **Checkout** — Summary, Apple Pay / Google Pay, “Confirm & Subscribe” with processing state; “Use Another Payment Method” for card/UPI modal (with failure retry).
5. **Activation** — “Your subscription is active.” Watch Now, Explore My Picks, Manage My Plan (read-only modal); Top Picks rail with “Popular with viewers like you” and loading skeleton.

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

- **SLDS:** Loaded from the jsDelivr CDN in `index.html`. Buttons and surfaces use SLDS tokens (`var(--slds-g-*)`) with hex fallbacks in `App.css`.
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
