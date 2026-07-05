# TradeWise — Landing Page

A premium, responsive fintech landing page for **TradeWise**. Static site — no build step, no dependencies.

## Structure

```
├── index.html            # Landing page (hero, plans, features, stats, testimonials, FAQ, contact)
├── privacy.html          # Privacy Policy      (placeholder)
├── terms.html            # Terms & Conditions  (placeholder)
├── disclaimer.html       # Risk Disclaimer
├── refund.html           # Refund Policy       (placeholder)
├── assets/
│   ├── styles.css        # All styles + design tokens (dark/light theme)
│   ├── common.js         # Shared: theme toggle, sticky nav, mobile menu, Telegram links
│   ├── main.js           # Homepage: plans, features, animated stats, FAQ, testimonials
│   └── tradewise-logo.jpg
├── _headers              # Cloudflare Pages caching + security headers
├── .assetsignore         # Files excluded from the Pages upload
└── .github/workflows/deploy.yml   # CI/CD → Cloudflare Pages
```

## Editing content

- **Prices / plans** → `assets/main.js`, the `plans` array near the top.
- **Stats counters** → `assets/main.js`, the `stats` array.
- **FAQ / features** → `assets/main.js`, the `faqs` / `features` arrays.
- **Telegram link** → change `TG` in **both** `assets/common.js` and `assets/main.js` (currently `https://telegram.me/TradesWise`).

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080   # then visit http://localhost:8080
```

## Branch model

| Branch | Purpose | CI/CD |
|--------|---------|-------|
| `dev`  | day-to-day work | none |
| `main` | default / integration branch | none |
| `prod` | production | **pushes here deploy to Cloudflare Pages** |

Flow: work on `dev` → merge into `main` → merge `main` into `prod` to release.

## Deploy to Cloudflare Pages (CI/CD)

Every push to `prod` deploys to production; every pull request targeting `prod` gets a preview URL.

### One-time setup

1. **Create the Pages project**
   - Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Create using direct upload** (or "Connect to Git").
   - Name it **`tradewise`** (must match `--project-name` in the workflow).
   - After the first deploy, set the project's **production branch to `prod`**
     (Pages → Settings → Builds & deployments) so Cloudflare treats `prod` deploys as production.

2. **Create an API token**
   - Cloudflare dashboard → **My Profile** → **API Tokens** → **Create Token**.
   - Use the **"Edit Cloudflare Workers"** template, or a custom token with:
     - Permissions: **Account → Cloudflare Pages → Edit**
   - Copy the token.

3. **Get your Account ID**
   - Workers & Pages → right sidebar → **Account ID** (or from any zone's Overview page).

4. **Add GitHub secrets**
   - GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:
     - `CLOUDFLARE_API_TOKEN` = the token from step 2
     - `CLOUDFLARE_ACCOUNT_ID` = the ID from step 3

5. **Push to `prod`** — the workflow (`.github/workflows/deploy.yml`) runs and deploys.
   Your site goes live at `https://tradewise.pages.dev` (plus per-commit preview URLs).

### Custom domain (tradewise.co)

Pages project → **Custom domains** → **Set up a domain** → enter `tradewise.co`.
If the domain is on Cloudflare, DNS is configured automatically; otherwise add the shown CNAME.

---

### Alternative: no GitHub Actions (Git integration)

If you'd rather not manage tokens, connect the repo directly:
Workers & Pages → **Create** → **Pages** → **Connect to Git** → pick this repo →
set **Build command:** *(empty)* and **Build output directory:** `/`. Cloudflare then
auto-deploys on every push. In that case you can delete `.github/workflows/deploy.yml`.

---

**Disclaimer:** Educational content only — not financial advice. Legal pages are placeholders; have them reviewed before going live.
