# Yoload Website

Next.js 14 website with Tailwind CSS.

## Requirements
- Node.js 18+ (recommend 20 LTS)
- npm 9+

## Setup
```bash
npm install

# Local env (copy from .env.example)
cp .env.example .env.local
# Edit .env.local with your keys
```

## Development
- Start dev server: `npm run dev` (default: http://localhost:3000)
- Lint: `npm run lint`

## Build & Run (local production)
```bash
# Build
npm run build

# Start production server (after build)
npm start
```

## Environment Variables
- Canonical base URL is set to https://yoload.asia in code (metadata, robots, sitemap).
- Email delivery (Resend), set in `.env.local`:
  - `RESEND_API_KEY` (required) — API key from Resend dashboard. Do NOT hardcode in code.
  - `RESEND_FROM` (optional) — verified from address (e.g. `no-reply@yoload.asia`); defaults to `onboarding@resend.dev`
  - - Cloudflare Turnstile anti-spam:
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (required for client widget)
  - `TURNSTILE_SECRET_KEY` (server verification)
- Rate limit (optional):
  - `CONTACT_RATE_LIMIT_PER_MIN` (default: 2)

Notes
- `.env*` files are git-ignored (see `.gitignore`).
- Do not prefix `RESEND_API_KEY` with `NEXT_PUBLIC_` — it must remain server-only.

## SEO
- Global metadata is defined in `app/layout.tsx` (title, description, Open Graph, Twitter, icons).
- `robots.txt` is generated from `app/robots.ts`.
- `sitemap.xml` is generated from `app/sitemap.ts`.
- Favicon: `public/favicon.svg` (built from `public/logo.png`).
- OG image: `public/og.png` (1200x630). Regenerate after changing the logo:
  ```bash
  npm run generate:og
  ```

## Deploy (Vercel)

### Option A: Git integration (recommended)
1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, click "New Project" → import the repo.
3. Framework preset: Next.js (auto-detected).
4. Set Environment Variables:
   - `RESEND_API_KEY=...`
   - (optional) `RESEND_FROM=no-reply@yoload.asia`
   -    - `NEXT_PUBLIC_TURNSTILE_SITE_KEY=...`
   - `TURNSTILE_SECRET_KEY=...`
5. Deploy. Preview and Production deployments will be created automatically.

### Option B: Vercel CLI
```bash
npm i -g vercel

# First-time setup (select scope, project name, and link)
vercel

# Production deployment
vercel --prod
```

### Custom Domain
1. Add your domain in Vercel Project → Settings → Domains.
2. Point DNS to Vercel as instructed.
3. Ensure links and metadata reference your primary domain if different.

## Robots: Production vs Preview
- Production: robots.txt allows indexing and includes `host` and `sitemap` for https://yoload.asia.
- Preview/Dev: robots.txt returns `Disallow: /` when `VERCEL_ENV` is not `production`.

Headers
- Preview adds `X-Robots-Tag: noindex, nofollow` automatically via `next.config.mjs` headers() and `middleware.ts` (no Vercel config required).

## Vercel Domain Redirects
- In Vercel Project → Settings → Domains, add `yoload.asia` and set it as the primary domain.
- Enable “Redirect to primary domain” so all non‑primary hosts (including the `*.vercel.app` URL) 301 to the primary.
- Alternatively, enforce host in code with a redirect rule in `next.config.mjs` if desired.

## Notes
- Static assets live in `public/`.
- Tailwind config: `tailwind.config.ts`; global styles: `app/globals.css`.
- Pages and sections live under `app/` with the App Router.


### Spam protection
- Cloudflare Turnstile widget (client) with server verification
- Per-IP rate limit (`CONTACT_RATE_LIMIT_PER_MIN`, default: 2)
- Honeypot field (hidden) – bots that fill it are ignored server-side

## Contact Form Setup

Follow these steps to enable real email delivery and spam protection:

1) Resend (email sending)
- Create a Resend account and obtain an API key.
- Verify a sending domain and set a verified from address (recommended: `no-reply@yoload.asia`).
- Add to `.env.local` (and Vercel env):
  - `RESEND_API_KEY=...`
  - `RESEND_FROM=no-reply@yoload.asia` (optional; defaults to `onboarding@resend.dev`)
- Recipient is fixed in code to `info@yoload.asia`.

2) Cloudflare Turnstile (anti‑spam)
- Create a Turnstile site in Cloudflare dashboard and obtain:
  - Site key (client): set `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - Secret key (server): set `TURNSTILE_SECRET_KEY`
- For local experiments you may use Cloudflare test keys.
- CSP is configured to allow Turnstile (`challenges.cloudflare.com`).

3) Rate limit (anti‑spam)
- Default is 2 requests per minute per IP (in‑memory; per instance).
- Adjust with `CONTACT_RATE_LIMIT_PER_MIN` if needed.

4) Local test
- Copy env: `cp .env.example .env.local` and fill the keys above.
- Start dev server: `npm run dev`
- Open `/` → Contact form → complete Turnstile → submit.
- Check inbox for `info@yoload.asia` (or Resend logs if using onboarding sender).

5) Vercel deployment
- Add the same env vars to Vercel Project → Settings → Environment Variables for both Preview and Production.
- Preview deployments are set to noindex via headers/middleware; production remains indexable.




## Analytics
Switch analytics via env variables (default: Plausible).

- Provider: `ANALYTICS_PROVIDER=plausible|ga4|none`
  - `plausible` (default):
    - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yoload.asia`
    - `NEXT_PUBLIC_PLAUSIBLE_API_HOST=https://plausible.io` (or your self-hosted URL)
  - `ga4` (Google Analytics 4):
    - ``NEXT_PUBLIC_GA_ID=G-XXXXXXX` (or `GA_MEASUREMENT_ID`)
  - 
one: disables analytics

The script is injected via pp/components/Analytics.tsx and used in pp/layout.tsx.





## Analytics
Switch analytics via env variables (default: Plausible).

- Provider: `ANALYTICS_PROVIDER=plausible|ga4|none`
  - `plausible` (default):
    - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yoload.asia`
    - `NEXT_PUBLIC_PLAUSIBLE_API_HOST=https://plausible.io` (or your self-hosted URL)
  - `ga4` (Google Analytics 4):
    - `NEXT_PUBLIC_GA_ID=G-XXXXXXX` (or `GA_MEASUREMENT_ID`)
  - `none`: disables analytics

Behavior
- Scripts load only in production (`VERCEL_ENV=production` or `NODE_ENV=production`).
- `app/layout.tsx` reads the provider env and renders the appropriate script.

Quick setup
- Plausible: set `ANALYTICS_PROVIDER=plausible`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yoload.asia`.
- GA4: set `ANALYTICS_PROVIDER=ga4`, `NEXT_PUBLIC_GA_ID=G-XXXXXXX`.
- Disable: set `ANALYTICS_PROVIDER=none`.

