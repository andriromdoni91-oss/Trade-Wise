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

## Deploy to Cloudflare Pages (Git integration)

Cloudflare watches the `prod` branch and auto-deploys on every push — no API tokens,
no GitHub secrets, no build step.

### One-time setup

1. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize GitHub and select the **`Trade-Wise`** repo.
3. **Set production branch:** `prod`.
4. **Build settings:**
   - Framework preset: **None**
   - Build command: **(leave empty)**
   - Build output directory: **`/`**
5. Click **Save and Deploy**. Site goes live at `https://tradewise.pages.dev`.
   Every later push to `prod` redeploys automatically; PRs get preview URLs.

### Custom domain (tradewise.co)

Pages project → **Custom domains** → **Set up a domain** → enter `tradewise.co`.
If the domain is on Cloudflare, DNS is configured automatically; otherwise add the shown CNAME.

### Releasing

```bash
git checkout prod && git merge main --ff-only && git push   # deploys
git checkout main
```

---

**Disclaimer:** Educational content only — not financial advice. Legal pages are placeholders; have them reviewed before going live.
