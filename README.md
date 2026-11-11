# Busy Little Pixels

Portfolio and CV site for [busylittlepixels.com](https://busylittlepixels.com), in English, Irish and Dutch.

- **Next.js 16** (App Router), **React 19**, **Tailwind CSS 4**
- **next-intl 4** for translations and locale routing
- **Resend** for the contact form
- Hosted on **Cloudflare Workers** via [OpenNext](https://opennext.js.org/cloudflare)

Live (staging): https://busylittlepixels.ronan-12a.workers.dev

---

## Quick start

```bash
npm install
cp .env.example .env   # or create .env by hand — see below
npm run dev            # http://localhost:3000
```

### Environment variables

| Variable             | Required | Purpose                                                                    |
| -------------------- | -------- | -------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | yes      | Sends contact form emails. Without it the form returns a "not configured" error. |
| `CONTACT_FROM_EMAIL` | no       | Sender, e.g. `Busy Little Pixels <hello@busylittlepixels.com>`. Defaults to Resend's onboarding address. |

The recipient address is the `CONTACT_TO_EMAIL` constant in `src/actions/contact.ts`.

`.dev.vars` holds Cloudflare-only vars for local Worker previews (`NEXTJS_ENV=development`). Both `.env` and `.dev.vars` are git-ignored.

---

## Commands

| Command              | What it does                                                                 |
| -------------------- | ---------------------------------------------------------------------------- |
| `npm run dev`        | Next dev server with hot reload (Node.js runtime).                            |
| `npm run build`      | Plain `next build`. Useful for type/build checks; not what gets deployed.     |
| `npm run lint`       | ESLint.                                                                       |
| `npx tsc --noEmit`   | Type check.                                                                   |
| `npm run preview`    | Builds for Cloudflare and runs it locally in `workerd` (the real Workers runtime) at http://localhost:8787. **Run this before deploying** — it catches things `next dev` doesn't. |
| `npm run deploy`     | Builds for Cloudflare and deploys straight to production.                    |
| `npm run upload`     | Builds and uploads a new *version* without sending traffic to it (gradual rollouts / preview URL). |
| `npm run cf-typegen` | Regenerates `cloudflare-env.d.ts` after changing bindings in `wrangler.jsonc`. |

### Deploying

```bash
npx wrangler login     # once per machine
npm run deploy
```

The build runs `next build`, then OpenNext bundles the output into `.open-next/` (the Worker in `worker.js`, static files in `assets/`). Wrangler then uploads both.

If the deploy fails at the very end with `fetch failed` / `other side closed`, that's Cloudflare's API dropping the script upload. The build is fine, so skip the rebuild and just retry:

```bash
npx opennextjs-cloudflare deploy
```

Rolling back: Cloudflare dashboard → Workers → `busylittlepixels` → Deployments, or `npx wrangler rollback`.

Logs: `npx wrangler tail`, or Observability in the dashboard (enabled in `wrangler.jsonc`).

### Secrets in production

At build time OpenNext copies the values in `.env` into the Worker's server code (`.open-next/cloudflare/next-env.mjs`). That code isn't public, but the cleaner setup is to keep secrets out of the build and store them in Cloudflare:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_FROM_EMAIL
```

Secrets set this way are available as `process.env.*` at runtime (`nodejs_compat` is enabled).

---

## Project structure

```
messages/{en,ga,nl}.json      All copy. Every key must exist in all three files.
public/                       Static files; _headers sets long-cache headers for /_next/static
src/
  actions/contact.ts          Contact form server action (Resend)
  app/
    [locale]/                 Every page lives under the locale segment
      layout.tsx              <html>, fonts, site-wide metadata, intl provider
      page.tsx                Home + JSON-LD (ProfessionalService)
      hire-me/                CV / services page
      privacy-policy/
      opengraph-image.tsx     Generated 1200×630 share image per locale
    apple-icon.tsx            Generated 180×180 icon
    icon.jpg                  Favicon
    sitemap.ts, robots.ts
    globals.css               Tailwind theme, .shimmer / .shiney-wrapper effect
  assets/fonts/outfit-bold.ts Outfit Bold as base64 (for the OG image — Workers have no filesystem)
  components/                 UI components
  i18n/
    routing.ts                Locales + prefix strategy
    navigation.ts             Locale-aware Link, useRouter, usePathname, getPathname
    request.ts                Loads messages per request
    metadata.ts               SITE_URL, hreflang alternates, pageMetadata() helper
  proxy.ts                    next-intl locale detection/redirects (Next 16's replacement for middleware)
next.config.ts                next-intl plugin + OpenNext dev bindings
open-next.config.ts           OpenNext config (static-assets incremental cache)
wrangler.jsonc                Worker name, bindings, compatibility flags
```

---

## Internationalisation

| Locale | URL prefix  |
| ------ | ----------- |
| `en`   | none (`/`)  |
| `ga`   | `/ga/...`   |
| `nl`   | `/nl/...`   |

`localePrefix: "as-needed"`, so English never has a prefix. `/en/hire-me` redirects to `/hire-me`. The language switcher sets a `NEXT_LOCALE` cookie that next-intl uses for redirects.

**Adding copy:** add the key to all three `messages/*.json` files, then use `getTranslations("ns")` in server components or `useTranslations("ns")` in client components. For inline markup (bold, links), use `t.rich("key", { b: (c) => <b>{c}</b> })` with `<b>…</b>` in the message.

**Links:** always import `Link`, `useRouter`, `usePathname` from `@/i18n/navigation`, not `next/link` / `next/navigation`. Otherwise you'll lose the locale.

**Adding a page:**

1. Create `src/app/[locale]/<page>/page.tsx` and call `setRequestLocale(locale)` at the top.
2. Export `generateMetadata` using `pageMetadata({ locale, href: "/<page>", page: "<key>" })` and add `metadata.<key>.title/description` to the message files.
3. Add the path to `src/app/sitemap.ts`.

**Adding a locale:** add it to `routing.ts`, create `messages/<locale>.json`, and add its OpenGraph locale in `i18n/metadata.ts`.

Long Irish and Dutch words are the usual layout breakers. Big headings use container-query sizes (`text-[clamp(...cqw...)]`) so they scale to fit.

---

## SEO and metadata

- Titles follow the template `%s | Busy Little Pixels`; the home page uses an absolute title.
- Every page gets a canonical URL, `hreflang` alternates (plus `x-default`), OpenGraph and Twitter cards from `pageMetadata()`.
- Next merges metadata shallowly, so a page's `openGraph` *replaces* the layout's. That's why `pageMetadata()` sets the image explicitly.
- `SITE_URL` in `src/i18n/metadata.ts` is the production origin for every absolute URL. In dev, OG image URLs point to localhost; that's expected.
- Check share cards after deploying: [opengraph.xyz](https://www.opengraph.xyz/), LinkedIn Post Inspector.

---

## Styling

- **Fonts:** Inter for body (`--font-inter`, `font-sans`), Outfit for headings (`--font-outfit`, `font-display`). Loaded with `next/font` in the locale layout.
- In plain CSS, reference `var(--font-outfit)` directly. Variables declared in Tailwind's `@theme inline` aren't emitted as CSS custom properties.
- **Image treatment:** wrap images like this:

  ```tsx
  <div className="shiney-wrapper">
    <div className="shimmer relative aspect-square overflow-hidden rounded-[0_15%]">
      <Image fill … />
    </div>
  </div>
  ```

  `rounded-[0_15%]` matches the card shape used across the site.

---

## Cloudflare notes and gotchas

- **`cacheComponents` is off.** With it enabled, pages hang on `workerd` (fixed upstream in OpenNext, not yet released). Re-test with `npm run preview` before turning it back on.
- **Caching:** all pages are statically generated. `open-next.config.ts` uses the static-assets incremental cache, so prerendered HTML is served without re-rendering. It's read-only: ISR / `revalidate` won't work. If you ever need it, switch to the R2 or KV incremental cache.
- **No filesystem at runtime.** Don't `readFile` in route handlers or image generators; import the data instead (see `outfit-bold.ts`).
- **Images:** `next/image` optimisation runs through the `IMAGES` binding (Cloudflare Images). Check your plan's free transformation allowance if traffic grows.
- **Bundle size:** the Worker is about 2.3 MB gzipped. The free plan's limit is 3 MB, the paid plan's 10 MB. Heavy server-side deps will push it over.
- **Stale CSS:** Turbopack's cache sometimes misses edits to `globals.css`, in both `next dev` and `next build`. The preview/deploy/upload scripts delete `.next/cache` first. If dev looks out of date, stop it, `rm -rf .next`, and restart.
- `next dev` runs on Node, not Workers. Anything runtime-sensitive (fonts, fs, Node APIs) must be checked with `npm run preview`.

---

## Custom domain (when ready)

1. Add `busylittlepixels.com` to Cloudflare (Websites → Add a site) and switch the nameservers at the registrar.
2. Recreate any existing DNS records, especially MX/TXT for email (Resend's DKIM/SPF too).
3. In `wrangler.jsonc` add:
   ```jsonc
   "routes": [
     { "pattern": "busylittlepixels.com", "custom_domain": true },
     { "pattern": "www.busylittlepixels.com", "custom_domain": true }
   ]
   ```
   then `npm run deploy`. Redirect `www` to the apex (Rules → Redirect Rules) to match `SITE_URL`.
4. Remove the domain from the old Vercel project.
5. Optionally set `"workers_dev": false` and `"preview_urls": false` so the `workers.dev` URL stops serving a duplicate site.
# blp_cf
