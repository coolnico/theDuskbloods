# Duskbloods Guide — Project Architecture

Multi-language SEO site for the game "The Duskbloods" (FromSoftware × Nintendo Switch 2, 2026). Deploys to Cloudflare Workers via OpenNext. Built with Next.js 15 App Router + next-intl + Tailwind.

## Tech Stack

- **Framework**: Next.js 15 (App Router, RSC)
- **i18n**: next-intl (no middleware — URL path is the source of truth)
- **Styling**: Tailwind CSS with CSS variables (`rgb(var(--x) / <alpha-value>)` format)
- **Deploy**: Cloudflare Workers via `@opennextjs/cloudflare`
- **Analytics**: Google Analytics 4 (`G-0QELYVWG7M`) — only loads on `duskbloods.net` / `www.duskbloods.net`
- **Domain**: `https://duskbloods.net` (configured in `src/lib/seo.ts`)

## Critical Architectural Decisions

### 1. No middleware

`src/middleware.ts` is **deleted**. URL path alone decides locale.

- `/` → English (no prefix, default locale)
- `/zh`, `/ja`, `/es`, `/fr`, `/de`, `/ko`, `/it`, `/pt` → prefixed
- `/en` or `/en/*` → 307 redirect to `/` or `/*` (configured in `next.config.js` `redirects()`)
- `localeDetection: false` in `src/i18n/routing.ts` — no Accept-Language jump, no cookie

**Why**: Cloudflare Workers free tier is 100k req/day. Middleware redirect costs 2x (initial + redirect). Without middleware, every page = 1 Worker invocation. Static assets (`.open-next/assets/`) bypass Workers entirely via `assets` binding in `wrangler.jsonc`.

### 2. Route group `(root)` + dynamic `[locale]` — dual LocaleShell

This is the **most important** architectural pattern. Without it, SSR HTML gives crawlers English content for `/zh/*` URLs (SEO disaster).

```
src/app/
├── layout.tsx              ← Root layout: HTML skeleton only (<html><body>), GA, JSON-LD. NO LocaleShell.
├── (root)/                 ← Route group (parens = NOT in URL)
│   ├── layout.tsx          ← Wraps <LocaleShell defaultMessages={enMessages} defaultLocale="en">
│   ├── page.tsx            → URL /
│   ├── about/page.tsx      → URL /about
│   └── ... (all English pages)
└── [locale]/
    ├── layout.tsx          ← Wraps <LocaleShell defaultMessages={await import(`@/messages/${locale}.json`)} defaultLocale={locale}>
    ├── page.tsx            → URL /zh, /ja, etc.
    ├── about/page.tsx      → URL /zh/about
    └── ... (all localized pages)
```

- `(root)` = Next.js route group, **not in URL**. `(root)/about/page.tsx` serves `/about`, not `/(root)/about`.
- Two `LocaleShell` instances are **mutually exclusive** — a URL matches either `(root)` (English) or `[locale]` (non-en), never both. No double-nesting of Header/Footer.
- `LocaleShell` (client component) provides `NextIntlClientProvider` with the correct messages. Client `useTranslations()` in views picks up the right locale from React Context.

### 3. Pages come in pairs

Every page has two `page.tsx` files — one in `(root)/` (English) and one in `[locale]/` (localized). They share the same View component but differ in how they get locale:

```tsx
// (root)/about/page.tsx
export function generateMetadata() { return getMetadata('en'); }   // hardcoded
export default function AboutPage() {
  setRequestLocale('en');
  return <><script/>{/* JSON-LD */}<AboutView /></>;
}

// [locale]/about/page.tsx
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getMetadata(locale);                                       // from URL
}
export default async function AboutPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <><script/>{/* JSON-LD */}<AboutView /></>;
}
```

**Trade-off**: File duplication (18 page.tsx for 9 pages × 2 languages paths) vs. zero middleware Worker cost. Chose the duplication.

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx              Root layout (HTML + GA + JSON-LD)
│   ├── globals.css            Tailwind + CSS variables (RGB format for alpha modifiers)
│   ├── robots.ts              robots.txt route
│   ├── sitemap.ts             Multi-locale sitemap (9 locales × N pages)
│   ├── (root)/                English route group
│   │   ├── layout.tsx         LocaleShell(en) wrapper
│   │   ├── page.tsx           Homepage (/)
│   │   └── {about,privacy,terms,gameplay,characters,faq,network-test,release-date}/page.tsx
│   └── [locale]/              Localized route group
│       ├── layout.tsx         LocaleShell(locale) wrapper
│       ├── page.tsx           Homepage (/zh, /ja, ...)
│       └── {about,privacy,terms,gameplay,characters,faq,network-test,release-date}/page.tsx
├── components/
│   ├── LocaleShell.tsx        Client: NextIntlClientProvider + Header + Footer. detectLocale() reads URL only (no cookie)
│   ├── Header.tsx             Top nav (5 links + LanguageSwitcher)
│   ├── Footer.tsx             Footer nav (3 columns: Explore/Site/Legal)
│   ├── LanguageSwitcher.tsx   Client-side locale dropdown
│   ├── SetLang.tsx            Sets <html lang> on mount
│   ├── GoogleAnalytics.tsx   GA4 — only loads on PROD_HOSTNAMES
│   └── views/                Page-content components (one per page)
│       ├── HomeView.tsx
│       ├── GameplayView.tsx
│       ├── CharactersView.tsx
│       ├── NetworkTestView.tsx
│       ├── ReleaseDateView.tsx
│       ├── FAQView.tsx
│       ├── AboutView.tsx
│       ├── PrivacyView.tsx
│       └── TermsView.tsx
├── lib/
│   ├── seo.ts                 DOMAIN, SITE_NAME, LOCALES, PROD_HOSTNAMES, alternates()
│   ├── page-helpers.tsx       makePageMetadata(), makeBreadcrumbLd(), makeWebAppLd()
│   └── server.ts              getRequestOrigin()
├── i18n/
│   ├── routing.ts             Locales, defaultLocale='en', localePrefix:'as-needed', localeDetection:false
│   ├── navigation.ts          next-intl Link/navigation wrappers
│   └── request.ts            next-intl getRequestConfig (loads messages/{locale}.json)
└── messages/                  9 JSON files (en/ja/zh/es/fr/de/ko/it/pt)
    └── {locale}.json         {Metadata, nav, home, gameplay, characters, networkTest, releaseDate, faq, about, privacy, terms}

public/                         Static assets (SVG: hero, bloodsworn, og, favicon)
next.config.js                  next-intl plugin + Cloudflare bindings + redirects (/en → /) + Cache-Control headers
wrangler.jsonc                  Cloudflare Workers config + assets binding
tailwind.config.js              Colors use rgb(var(--x) / <alpha-value>) for alpha modifier support
```

## i18n Configuration

**`src/i18n/routing.ts`**:
```ts
export const routing = defineRouting({
  locales: ['en', 'ja', 'zh', 'es', 'fr', 'de', 'ko', 'it', 'pt'],
  defaultLocale: 'en',
  localePrefix: { mode: 'as-needed' },  // default locale (en) has no prefix
  localeDetection: false,               // no Accept-Language jump, no cookie
});
```

**`src/i18n/request.ts`**: Loads `messages/${locale}.json` based on `requestLocale` (from URL `[locale]` segment).

**`src/app/[locale]/layout.tsx`** uses **explicit dynamic import** (not `getMessages()`):
```ts
const messages = (await import(`@/messages/${locale}.json`)).default;
```
Why: `getMessages()` returned English even with `setRequestLocale('zh')` set — requestLocale context doesn't propagate from `[locale]` layout up to root layout. Explicit import is the only reliable fix.

## SEO Stack

| Feature | Implementation |
|---|---|
| hreflang | `alternates()` in `src/lib/seo.ts`, applied via metadata in layouts |
| Canonical | Per-page via `makePageMetadata()` |
| Sitemap | `src/app/sitemap.ts` — 9 locales × N pages |
| robots.txt | `src/app/robots.ts` |
| JSON-LD | `WebSite` + `VideoGame` in root layout; `BreadcrumbList` per page; `Article` on `/release-date`; `FAQPage` on `/faq` |
| Title template | `%s | Duskbloods Guide` (uses `SITE_NAME` constant) |
| OG image | `/og.svg` (custom SVG, no external deps) |

## Caching Strategy

**`next.config.js` headers()**:
```
Cache-Control: public, s-maxage=86400, stale-while-revalidate=604800
```

- `s-maxage=86400`: Cloudflare edge caches HTML 24h
- `stale-while-revalidate=604800`: After expiry, edge serves stale + background revalidates for 7 days
- `public`: allows shared cache (Cloudflare)
- Browser does NOT cache (no `max-age`) — always hits CDN, gets fresh-after-24h

**Static assets** (`_next/static/*`, `*.svg`, `robots.txt`, etc.) bypass Workers entirely via `assets` binding in `wrangler.jsonc` — zero Worker cost.

**Trade-off**: Page content updates take up to 24h to propagate to edge. Acceptable for SEO content site.

## Deployment

```bash
npm run dev        # Local dev (localhost:3444)
npm run build      # Next.js production build
npm run preview    # Build + opennextjs-cloudflare build + local Worker preview
npm run deploy     # Deploy to Cloudflare Workers
```

**`wrangler.jsonc`** key fields:
- `main`: `.open-next/worker.js`
- `assets.directory`: `.open-next/assets` (served by Cloudflare Static Assets, no Worker cost)
- `compatibility_date`: keeps runtime fresh

**GoogleAnalytics.tsx** loads only on `PROD_HOSTNAMES = ['duskbloods.net', 'www.duskbloods.net']` (defined in `src/lib/seo.ts`). Localhost and `*.workers.dev` preview URLs don't load GA — no test pollution.

## Adding a New Page (e.g. `/system-requirements`)

1. **Add messages** in all 9 files under `src/messages/`:
   - Top-level `"systemRequirements": { intro: {...}, facts: {...}, ... }` (page content)
   - `"Metadata": { "systemRequirements": { title, description } }` (per-locale metadata, **translate all 9**)
   - `"nav": { "systemRequirements": "..." }` (nav label, **translate all 9**)

2. **Create View**: `src/components/views/SystemRequirementsView.tsx`
   - `'use client'`
   - `const t = useTranslations('systemRequirements');`
   - Use `t.raw('facts.items')` for arrays

3. **Create two `page.tsx`** (copy from `about/page.tsx`, change imports):
   - `src/app/(root)/system-requirements/page.tsx` — hardcoded `locale='en'`
   - `src/app/[locale]/system-requirements/page.tsx` — `locale` from `params`

4. **Wire up**:
   - `src/app/sitemap.ts` — add `{ path: '/system-requirements', priority: 0.x }` to `PAGES`
   - `src/components/Header.tsx` — add `<Link href="/system-requirements">{t('nav.systemRequirements')}</Link>` (desktop + mobile)
   - `src/components/Footer.tsx` — optional, add to Explore column

## Common Pitfalls

### DO NOT
- Add `setRequestLocale('en')` in root layout — it pollutes context for `[locale]` children
- Use `getMessages()` in `[locale]/layout.tsx` — returns English even after `setRequestLocale('zh')`. Use explicit `import('@/messages/${locale}.json')`
- Add middleware — defeats the Worker-cost optimization. Use `next.config.js` `redirects()` for `/en → /`
- Use `max-age` instead of `s-maxage` — browser would cache stale HTML, breaking language switching
- Hardcode `duskbloods.net` anywhere except `src/lib/seo.ts` — use `DOMAIN` or `PROD_HOSTNAMES` constants

### DO
- Use `SITE_NAME` constant for site name in metadata/JSON-LD (current value: `Duskbloods Guide`)
- Use `DOMAIN` constant (`https://duskbloods.net`) for any URL
- Keep `VideoGame` JSON-LD `name` as `'The Duskbloods'` (the game's actual name) — only `WebSite.name` uses `SITE_NAME`
- Translate `Metadata.{page}` (title/description) in all 9 message files — SEO-critical
- Page-content nodes (`{page}` top-level) can fall back to English if not yet translated; next-intl handles gracefully

## Translation Status (as of 2026-08-20)

- `Metadata.*` (title/description): all 9 locales fully translated ✓
- `nav.*`: all 9 locales fully translated ✓
- Page content (intro/facts/expect/cta etc.):
  - `en/ja/zh/es`: real translations ✓
  - `fr/de/ko/it/pt`: English fallback (acceptable, next-intl handles)

## Game Data Caveats

- **Character names**: Official roster NOT yet revealed. `/characters` is a list-page only — no `[id]` subpages, no `ItemList` JSON-LD. Add when Nintendo/FromSoftware publishes character names.
- **Network test schedule**: No concrete dates announced. No `Event` JSON-LD on `/network-test` (requires `startDate`). Add when dates are public.
- **Exact release date**: Only "2026" is known. `/release-date` page exists with `Article` JSON-LD (datePublished = page creation date, not game release date). Update when exact date announced.

## Reference Project

`/Users/manicholas/Documents/program/pokegen` — similar architecture (Next.js + next-intl + Cloudflare). Slightly older; uses middleware. Duskbloods is the evolved, middleware-less version.
