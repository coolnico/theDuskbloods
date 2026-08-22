# Google AdSense Audit Report

**Site**: https://duskbloods.net
**Audit Date**: 2026-08-21
**Auditor**: Automated codebase analysis
**Site Type**: Next.js 15 fan information site for "The Duskbloods" (FromSoftware × Nintendo Switch 2)
**Primary Language**: English (9 locales: en, ja, zh, es, fr, de, ko, it, pt)
**Hosting**: Cloudflare Workers via OpenNext

---

## Decision

**Not ready** — multiple blockers and high-risk items must be addressed before applying.

---

## Blockers

### ADS-CONTENT-02: Original content vs. external media embedding

- **Issue**: The site embeds YouTube videos and hotlinks images from `media.fromsoftware.jp` (official press assets). While the textual content is original, the gallery and video sections rely heavily on third-party hosted media without original commentary, curation, or analysis attached to each asset.
- **Evidence**: `src/messages/en.json` — `home.screenshots` references external screenshots; `home.videos` embeds YouTube trailers; `gameplay.sections[*].image` and `characters.roster.items[*].image` all point to `media.fromsoftware.jp`.
- **Fix**: Add original commentary, analysis, or descriptive context to each embedded video and image gallery item. Ensure every embedded asset has substantial publisher-created text around it (not just a caption). Consider hosting key images locally with proper attribution.

### ADS-OWN-01 / ADS-OWN-02: Site ownership verification path unclear

- **Issue**: No AdSense ad code, meta verification tag, or ads.txt exists yet. The site is deployed to Cloudflare Workers via OpenNext — the publisher must confirm they can inject AdSense code into `<head>` (currently done via `src/app/layout.tsx`).
- **Evidence**: No `ads.txt` in `public/`. No AdSense meta tag or ad code in any layout file.
- **Fix**: This is not a permanent blocker — the publisher can add AdSense code to `layout.tsx` `<head>`. Confirm the Cloudflare deployment pipeline works for this before applying. Add `ads.txt` with the correct Google seller line once the AdSense publisher ID is known.

### ADS-PRIV-01: Privacy policy does not disclose Google ad/analytics data collection

- **Issue**: The current privacy policy (`src/messages/en.json` → `privacy.paragraphs`) mentions "privacy-friendly analytics" and "cookies for language preference and advertising or analytics partners" but does NOT specifically mention Google, Google AdSense, Google Analytics, cookies, web beacons, IP addresses, or other identifiers used by Google products.
- **Evidence**: Privacy policy text: "We may use privacy-friendly analytics to understand aggregate traffic" and "cookies are used to remember your language preference and to support advertising or analytics partners."
- **Fix**: Rewrite the privacy policy to explicitly disclose: (1) use of Google Analytics and its data collection practices, (2) that third-party ad vendors (including Google) may use cookies, web beacons, and IP addresses to serve ads, (3) Google's use of the DART cookie, (4) how users can opt out via Google Ad Settings and the DAA opt-out page. Link to Google's privacy policy.

### ADS-PRIV-04: No EU user consent mechanism

- **Issue**: There is no cookie consent banner, CMP (Consent Management Platform), or any consent mechanism for EEA/UK visitors. Google Analytics loads unconditionally for all production visitors without consent.
- **Evidence**: `src/components/GoogleAnalytics.tsx` — GA loads on all production hostnames with no consent check. No CMP library in `package.json`. No consent banner component exists.
- **Fix**: Implement a CMP (e.g., Google Certified CMP, or a self-built consent banner) that: (1) blocks Google Analytics and ad scripts until user consent is given, (2) provides granular consent options, (3) stores consent state, (4) respects "Do Not Sell" for CCPA. This is required for EEA/UK traffic under Google's EU User Consent Policy.

---

## High Risks

### ADS-CRAWL-01: Site live status — verify all key URLs return 200

- **Issue**: Cannot fully verify from codebase alone. The site deploys to Cloudflare Workers and has ISR revalidation (`revalidate = 172800` for locale routes). All routes are statically generated at build time. The 404 page exists (`[locale]/not-found.tsx`).
- **Evidence**: Build configuration in `next.config.js`, route structure confirmed, sitemap includes all 10 pages × 9 locales = 90 URLs.
- **Fix**: Before applying, manually verify that all sitemap URLs return HTTP 200 via `curl` or browser. Check that the Cloudflare Workers deployment is stable and not returning intermittent 5xx errors.

### ADS-CRAWL-02: AdSense crawler access — robots.txt and Cloudflare

- **Issue**: `robots.txt` allows all crawlers (`User-agent: *, Allow: /`), which is good. However, Cloudflare's default security settings may block the AdSense crawler (user-agent: `Mediapartners-Google`). The site runs on Cloudflare Workers — if bot management or WAF rules are enabled, they could block the crawler.
- **Evidence**: `src/app/robots.ts` — `rules: { userAgent: '*', allow: '/' }`. No specific `Mediapartners-Google` rule. Cloudflare configuration is not in the codebase.
- **Fix**: In the Cloudflare dashboard, verify that the AdSense crawler (`Mediapartners-Google`) is not blocked by bot management, WAF rules, or IP restrictions. Consider adding a specific `User-agent: Mediapartners-Google` rule to `robots.ts` with explicit `Allow`.

### ADS-CRAWL-06: DNS and hosting reliability

- **Issue**: The site uses Cloudflare Workers, which provides excellent uptime and global distribution. However, the `images.unoptimized: true` setting in `next.config.js` and the OpenNext adapter are relatively new and may have edge cases.
- **Evidence**: `next.config.js` — `images: { unoptimized: true }`. OpenNext Cloudflare adapter v1.20.2.
- **Fix**: Monitor the site for 1-2 weeks before applying. Check Cloudflare Workers analytics for error rates. Ensure the custom domain (`duskbloods.net`) resolves correctly and SSL is properly configured.

### ADS-CONTENT-03: Content depth on detail pages

- **Issue**: The site has substantial content on the gameplay, characters, and FAQ pages. However, the Gallery page (`src/components/views/GalleryView.tsx`) appears to be a screenshot gallery without substantial text content — this is a thin page risk.
- **Evidence**: Gallery page exists with `priority: 0.8` in sitemap. The `gallery` namespace in messages is minimal.
- **Fix**: Add descriptive text to the Gallery page — context for each screenshot, what it shows, why it matters. Ensure the page has enough text content to be valuable to both users and crawlers.

### ADS-PROG-04: Traffic sources

- **Issue**: Google Analytics (`G-0QELYVWG7M`) is active. The site appears to rely on organic search traffic. No evidence of paid traffic, click exchanges, or spam sources. However, this cannot be fully verified from the codebase alone.
- **Evidence**: `src/components/GoogleAnalytics.tsx` — standard GA4 implementation. No paid advertising scripts detected.
- **Fix**: Confirm with the site owner that traffic sources are organic/legitimate. If using any paid promotion, ensure landing pages are high-quality and not misleading.

### ADS-UX-05: Trust pages — About and Contact pages

- **Issue**: About and Contact pages exist but their content quality cannot be fully verified from the codebase. The About page should have substantial, real content about the site and its author(s). The Contact page should have a working contact method.
- **Evidence**: Pages exist at `/about` and `/contact`. Content comes from i18n messages. Footer includes disclaimer about being an unofficial fan site.
- **Fix**: Verify that the About page has real author/publisher information (not just game description). Ensure the Contact page has a working contact form or email address. Add a physical address or registered business entity if applicable for AdSense.

### ADS-TXT-01: ads.txt not configured

- **Issue**: No `ads.txt` file exists. This is required once the AdSense publisher ID is known.
- **Evidence**: No `ads.txt` in `public/` directory. No dynamic `ads.txt` route in `src/app/`.
- **Fix**: Create `public/ads.txt` with the correct Google seller line: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0` (replace with actual publisher ID). Alternatively, create a dynamic route at `src/app/ads.txt/route.ts` if preferred.

---

## Medium Risks

### ADS-CONTENT-06: Mixed-language content

- **Issue**: The site supports 9 languages with full i18n. All page content is properly translated. However, some game-specific terms (character names, ability names like "Blood Blade", "Light of Hayern") are in English across all locales. This is acceptable for proper nouns but should be verified.
- **Evidence**: `src/messages/` contains 9 complete JSON files. Character names and ability names are consistent across locales.
- **Fix**: This is generally acceptable. Ensure that all 9 locale JSON files are complete and not partially translated. The game terms in English are standard for gaming sites.

### ADS-CONTENT-07: Comment sections and UGC

- **Issue**: There are no comment sections, forums, or user-generated content on the site. This eliminates UGC moderation risk but also means less engagement signals.
- **Evidence**: No comment components, no UGC submission forms, no forum pages detected in the codebase.
- **Fix**: No immediate action needed. If comments/UGC are added later, implement moderation before enabling AdSense on those pages.

### ADS-CONTENT-08: SEO keyword patterns

- **Issue**: The metadata and content appear naturally written. Title/H1 patterns are descriptive and not keyword-stuffed. However, some titles are quite long (e.g., "The Duskbloods — FromSoftware PvPvE Action Game for Nintendo Switch 2 (2026)").
- **Evidence**: `src/lib/seo.ts` — title template `%s | Duskbloods Guide`. Page titles from `Metadata.*` namespace are detailed but natural.
- **Fix**: No immediate action needed. The titles are descriptive and user-focused, which is appropriate. Monitor for any over-optimization signals.

### ADS-UX-01: Navigation clarity

- **Issue**: Header navigation is clear with labeled links (Gameplay, Characters, Gallery, Network Test, Release Date, FAQ). Footer has organized sections (Explore, Site, Legal). Mobile navigation uses a horizontally scrollable row.
- **Evidence**: `src/components/Header.tsx` — sticky header with desktop and mobile nav. `src/components/Footer.tsx` — three-column layout with all key pages.
- **Fix**: No immediate action needed. Navigation is well-structured and functional.

### ADS-UX-02: Site purpose clarity

- **Issue**: The site clearly presents itself as "Duskbloods Guide" — an unofficial fan information hub. The hero section, footer disclaimer, and About page all clarify this is not an official FromSoftware/Nintendo site.
- **Evidence**: `nav.disclaimer` in messages: "The Duskbloods is a trademark of FromSoftware and Nintendo. This is an unofficial fan information site."
- **Fix**: No immediate action needed. The site's purpose and affiliation status are clearly communicated.

### ADS-UX-03: Deceptive elements

- **Issue**: No deceptive navigation, fake download buttons, misleading redirects, or fake play buttons detected. The site's CTAs ("Explore Gameplay", "Network Test Info") are honest and lead to real content.
- **Evidence**: CTA text in `home.hero.ctaPrimary` and `home.hero.ctaSecondary` are descriptive and accurate.
- **Fix**: No immediate action needed.

### ADS-UX-04: Site behavior

- **Issue**: No popups, popunders, auto-downloads, or unexpected redirects detected. The site uses standard Next.js navigation. No malicious scripts or behavior-changing code found.
- **Evidence**: No popup components, no redirect scripts, no download triggers in the codebase.
- **Fix**: No immediate action needed.

### ADS-UX-06: Ad-like layout

- **Issue**: No ads are currently displayed on the site. The layout is content-focused with a dark fantasy aesthetic. No confusing ad/content separation issues.
- **Evidence**: No ad components, no ad slot placeholders, no ad-related CSS in the codebase.
- **Fix**: When adding AdSense ads later, ensure clear visual separation between ads and content. Use standard AdSense ad labels ("Advertisement" or "Sponsored").

### ADS-CRAWL-03: POST-dependent pages

- **Issue**: All pages are accessible via GET requests. No forms or POST-dependent content gates detected.
- **Evidence**: All routes are standard Next.js page routes with no POST requirements.
- **Fix**: No immediate action needed.

### ADS-CRAWL-04: Redirect chains

- **Issue**: The only redirects are `/en` → `/` and `/en/:path*` → `/:path*` (configured in `next.config.js`). These are simple, single-hop redirects and are acceptable.
- **Evidence**: `next.config.js` — `redirects` array with `/en` routes.
- **Fix**: No immediate action needed. These redirects are clean and necessary for the locale routing strategy.

### ADS-CRAWL-05: URL stability

- **Issue**: URLs are clean and stable. No session IDs, user-specific parameters, or dynamic path segments in content URLs. Canonical URLs are properly set via `alternates.canonical` in metadata.
- **Evidence**: URL structure: `/`, `/gameplay`, `/characters`, etc. Locale-prefixed: `/ja`, `/zh/gameplay`, etc. All static paths.
- **Fix**: No immediate action needed.

### ADS-CRAWL-07: Sitemap and indexing

- **Issue**: A comprehensive sitemap exists covering all 10 pages × 9 locales = 90 URLs. The sitemap is dynamically generated via `src/app/sitemap.ts`. Proper `hreflang` alternates are set for all pages.
- **Evidence**: `src/app/sitemap.ts` — generates URLs for all pages and locales with priorities and change frequencies.
- **Fix**: No immediate action needed. The sitemap is well-structured.

### ADS-PROG-01: Self-clicking and impression inflation

- **Issue**: No evidence of self-clicking or impression inflation tools. The site has no ads currently. This will need to be confirmed by the owner after ads are placed.
- **Evidence**: No automation scripts, click tools, or impression manipulation code detected.
- **Fix**: After placing ads, the owner must commit to never clicking their own ads and not using any tools to inflate impressions or clicks.

### ADS-PROG-02: User solicitation for ad clicks

- **Issue**: No "support us by clicking ads" language or similar solicitation detected. The site's CTAs are content-focused.
- **Evidence**: No ad-click solicitation text in any message files.
- **Fix**: No immediate action needed. Never add text asking users to click ads.

### ADS-PROG-03: Ad labeling

- **Issue**: No ads are currently displayed. When ads are added, they must be clearly distinguishable from content.
- **Evidence**: No ad components exist yet.
- **Fix**: When implementing ads, use neutral labels ("Advertisement", "Sponsored") and ensure ads are visually distinct from content. Do not use labels like "Recommended" or "Featured Content" for ads.

### ADS-PROG-05: Ad code modifications

- **Issue**: No ad code exists yet. When AdSense code is added, it must not be modified to inflate performance.
- **Evidence**: No AdSense code in the codebase.
- **Fix**: Use AdSense code as provided. Do not wrap in iframes, modify click handlers, or add artificial spacing to increase click rates.

### ADS-PROG-06: Ad placement restrictions

- **Issue**: No ads are currently placed. When ads are added, they must not be placed in emails, software, popups, or non-content pages.
- **Evidence**: No ad placement code exists yet.
- **Fix**: Plan ad placements carefully. Only place ads on content pages (not privacy, terms, 404, or empty pages). Do not place ads in popups, emails, or software.

### ADS-PROG-07: WebView monetization

- **Issue**: The site is a standard website, not a WebView app. This requirement is N/A for this site.
- **Evidence**: The site runs in browsers, not in an app WebView. Cloudflare Workers serve standard HTTP responses.
- **Fix**: N/A.

### ADS-PUB-01 through ADS-PUB-16: Content policy compliance

- **Issue**: The site contains game guide/information content about "The Duskbloods." No illegal content, copyright infringement (the site uses official press assets with attribution), hate speech, violence promotion, adult content, deceptive practices, or political misinformation detected. The site properly disclaims its unofficial status.
- **Evidence**: Content analysis of all message files and page structures. Footer disclaimer: "The Duskbloods is a trademark of FromSoftware and Nintendo. This is an unofficial fan information site and is not affiliated with or endorsed by FromSoftware or Nintendo."
- **Fix**: No immediate action needed for content policy. Continue to monitor UGC if comments are added later.

### ADS-PUB-05: Publisher identity

- **Issue**: The site clearly identifies itself as an unofficial fan site. The About page should contain real publisher/author information. The Terms of Service page acknowledges trademark ownership.
- **Evidence**: Footer disclaimer, Terms of Service content, About page exists.
- **Fix**: Ensure the About page has real author/publisher contact information, not just game description.

### ADS-REST-01 through ADS-REST-08: Restricted inventory

- **Issue**: No restricted content categories apply to this site. The site is about a video game (which is not restricted). No gambling, tobacco, alcohol, weapons, prescription drugs, or adult content.
- **Evidence**: Content analysis confirms gaming-focused content only.
- **Fix**: N/A.

### ADS-PRIV-02: Third-party cookie disclosure

- **Issue**: The privacy policy mentions "advertising or analytics partners" but does not specifically disclose that third parties (Google) may place/read cookies or use web beacons/IP addresses.
- **Evidence**: Current privacy text: "cookies are used to remember your language preference and to support advertising or analytics partners."
- **Fix**: Update privacy policy to explicitly state: "Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites." Include links to Google's privacy policy and ad personalization settings.

### ADS-PRIV-03: PII in ad requests

- **Issue**: No personally identifiable information is passed to Google in ad requests currently. The GA implementation is standard with no custom dimensions sending PII.
- **Evidence**: `src/components/GoogleAnalytics.tsx` — standard gtag.js config with no custom user data.
- **Fix**: No immediate action needed. When adding AdSense, do not pass any PII in ad request parameters.

### ADS-PRIV-05: Location data

- **Issue**: No precise location data collection detected. The site does not request geolocation permissions.
- **Evidence**: No Geolocation API usage, no location-based features in the codebase.
- **Fix**: N/A.

### ADS-PRIV-06: Child-directed content

- **Issue**: The site is about a video game rated for teens/mature audiences (FromSoftware games are typically rated T or M). The content is not specifically directed at children under 13. However, the game's audience may include minors.
- **Evidence**: Game content is action/violence-focused. No COPPA-specific measures in place.
- **Fix**: If the site is not child-directed (which it appears not to be), no COPPA marking is needed. However, do not use interest-based targeting for any content that may be primarily viewed by children.

### ADS-PRIV-07: Google domain cookies

- **Issue**: No custom code that sets, modifies, or deletes cookies on Google domains detected.
- **Evidence**: No cookie manipulation code targeting Google domains in the codebase.
- **Fix**: N/A.

### ADS-PRIV-08: Sensitive targeting restrictions

- **Issue**: No evidence of ad personalization targeting sensitive categories. The site does not build audience lists or remarketing segments currently.
- **Evidence**: GA4 implementation is basic with no audience creation or remarketing setup.
- **Fix**: When adding AdSense, do not create audience segments based on health, financial hardship, ethnicity, religion, crime, political affiliation, union membership, sexual behavior, or sexual orientation.

### ADS-PRIV-09: Housing/employment/credit targeting

- **Issue**: N/A. The site does not advertise housing, employment, or credit-related services.
- **Evidence**: No such content or advertising in the codebase.
- **Fix**: N/A.

### ADS-PRIV-10: Interest-based advertising disclosures

- **Issue**: No personalized ads are currently served. When AdSense is added, interest-based advertising disclosures and controls will be needed.
- **Evidence**: No ad personalization setup exists yet.
- **Fix**: When implementing AdSense, include interest-based advertising disclosures in the privacy policy and provide links to Google Ad Settings and the DAA opt-out page.

### ADS-ELIG-01: Age eligibility

- **Issue**: Cannot verify from codebase. The publisher must be at least 18 years old or use a parent/guardian account.
- **Evidence**: No age-related information in the codebase.
- **Fix**: Confirm with the site owner.

### ADS-ELIG-02: Duplicate accounts

- **Issue**: Cannot verify from codebase. The publisher should not create duplicate AdSense accounts.
- **Evidence**: No AdSense account information in the codebase.
- **Fix**: Confirm with the site owner.

### ADS-ELIG-03: Policy compliance

- **Issue**: This is the sum of all other checks. See individual items for details.
- **Evidence**: N/A — meta-requirement.
- **Fix**: Address all blockers and high-risk items identified in this report.

### ADS-ELIG-04: Hosted product

- **Issue**: N/A. The site is self-hosted on Cloudflare Workers, not on Blogger, YouTube, or a hosted partner platform.
- **Evidence**: Deployment via `@opennextjs/cloudflare` adapter.
- **Fix**: N/A.

### ADS-SITE-01: AdSense site management

- **Issue**: The site has not been added to an AdSense account yet. This is a process step, not a code issue.
- **Evidence**: No AdSense configuration in the codebase.
- **Fix**: After fixing blockers, add the site to the AdSense account, verify ownership, and submit for review.

### ADS-SITE-02: Ownership verification methods

- **Issue**: The site can be verified via: (1) AdSense ad code in `<head>`, (2) ads.txt, or (3) meta tag. All three are technically feasible with the current architecture.
- **Evidence**: `src/app/layout.tsx` has a `<head>` section where a meta tag or ad code can be placed. `public/` directory can host `ads.txt`.
- **Fix**: Choose one verification method and implement it. The ad code method is simplest — add the AdSense snippet to `layout.tsx`.

### ADS-TXT-02: ads.txt recommendation

- **Issue**: Publishing ads.txt is recommended to prevent unauthorized selling of inventory.
- **Evidence**: No `ads.txt` exists.
- **Fix**: Create `public/ads.txt` once the AdSense publisher ID is known.

### ADS-CONTENT-01: Useful, original content

- **Issue**: The site has substantial original content — detailed gameplay guides, character descriptions, FAQ, network test information, and game mechanics explanations. Content is well-organized and informative. The risk is that some content relies on external media (images from FromSoftware's CDN, YouTube embeds).
- **Evidence**: `en.json` is 900+ lines of original textual content. Gameplay guide has 10+ detailed sections. Character roster has 6 detailed character profiles with abilities. FAQ has 15+ Q&A items.
- **Fix**: Content quality is generally good. Ensure each page has enough original text (not just images/videos) to stand on its own. The gallery page may need more text content.

### ADS-CONTENT-04: Under construction

- **Issue**: The site is live and functional. All pages have real content. The characters page has a note about "Full roster coming soon" which is acceptable for a pre-release game site.
- **Evidence**: All 10 pages are implemented with real content. The `characters.note` section says "The complete Bloodsworn roster will be revealed as launch approaches."
- **Fix**: No immediate action needed. The "coming soon" note is appropriate for a game that hasn't launched yet.

### ADS-CONTENT-05: Ad-to-content ratio

- **Issue**: No ads are currently displayed. When ads are added, they must not dominate the content.
- **Evidence**: No ad components exist.
- **Fix**: When implementing ads, keep the ad-to-content ratio reasonable. Google recommends no more than 3 ad units per page. Ensure ads do not push content below the fold.

---

## Exhaustive Checklist

| ID | Status | Evidence | Next action |
| --- | --- | --- | --- |
| ADS-ELIG-01 | Unknown | Cannot verify age from codebase | Confirm with site owner |
| ADS-ELIG-02 | Unknown | Cannot verify account status from codebase | Confirm with site owner |
| ADS-ELIG-03 | Fail | Multiple policy items not yet addressed | Fix all blockers and high-risk items |
| ADS-ELIG-04 | N/A | Site is self-hosted on Cloudflare Workers, not a hosted platform | No action needed |
| ADS-OWN-01 | Pass | Publisher controls the repository; `<head>` injection possible via `layout.tsx` | Verify Cloudflare deployment works for code injection |
| ADS-OWN-02 | Pass | Publisher owns the domain `duskbloods.net` and controls the codebase | No action needed |
| ADS-OWN-03 | Pass | Site uses standard JS rendering; Next.js SSR/SSG produces full HTML | No action needed |
| ADS-SITE-01 | Unknown | Site not yet added to AdSense account | Add site to AdSense after fixing blockers |
| ADS-SITE-02 | Pass | Multiple verification methods available (ad code, ads.txt, meta tag) | Choose and implement one method |
| ADS-TXT-01 | Fail | No `ads.txt` file exists; no AdSense publisher ID configured | Create `ads.txt` with correct Google seller line once publisher ID is known |
| ADS-TXT-02 | Fail | `ads.txt` not published | Create `ads.txt` once AdSense publisher ID is known |
| ADS-CONTENT-01 | Pass | 900+ lines of original gameplay guide content, character data, FAQ, network test info | No action needed |
| ADS-CONTENT-02 | Fail | Gallery and video sections embed external media (FromSoftware CDN, YouTube) without substantial original commentary per asset | Add original commentary to each embedded media item |
| ADS-CONTENT-03 | Pass | All pages have substantial text content; gameplay page has 10+ detailed sections | Gallery page could use more text; add descriptive content |
| ADS-CONTENT-04 | Pass | Site is live with real content; "roster coming soon" is appropriate for pre-release game | No action needed |
| ADS-CONTENT-05 | N/A | No ads currently displayed | Monitor ad-to-content ratio when ads are added |
| ADS-CONTENT-06 | Pass | All 9 locales have complete translations; game terms in English are acceptable proper nouns | No action needed |
| ADS-CONTENT-07 | N/A | No comment sections or UGC on the site | If UGC added later, implement moderation |
| ADS-CONTENT-08 | Pass | Titles and content are naturally written; no keyword stuffing detected | No action needed |
| ADS-UX-01 | Pass | Header has 6 nav links; footer has 3 organized sections; mobile nav works | No action needed |
| ADS-UX-02 | Pass | Site clearly identifies as "Duskbloods Guide" — unofficial fan hub; navigation flow is logical | No action needed |
| ADS-UX-03 | Pass | No deceptive buttons, fake downloads, misleading redirects, or ad-in-navigation spots | No action needed |
| ADS-UX-04 | Pass | No popups, popunders, auto-downloads, or unexpected redirects | No action needed |
| ADS-UX-05 | Pass | About, Contact, Privacy, and Terms pages all exist and are accessible from footer | Verify About page has real author info; ensure Contact has working method |
| ADS-UX-06 | N/A | No ads currently displayed | Plan clear ad/content separation when adding ads |
| ADS-CRAWL-01 | Unknown | Cannot verify HTTP status of live URLs from codebase | Manually verify all sitemap URLs return 200 |
| ADS-CRAWL-02 | Fail | `robots.txt` allows all crawlers but no specific `Mediapartners-Google` rule; Cloudflare bot management status unknown | Verify Cloudflare does not block AdSense crawler; add specific rule |
| ADS-CRAWL-03 | Pass | All pages accessible via GET; no POST-dependent content | No action needed |
| ADS-CRAWL-04 | Pass | Only redirects are `/en` → `/` (single-hop, clean) | No action needed |
| ADS-CRAWL-05 | Pass | URLs are clean, stable, static paths; canonical URLs properly set | No action needed |
| ADS-CRAWL-06 | Unknown | Cloudflare Workers hosting should be reliable; cannot verify actual uptime | Monitor site stability for 1-2 weeks before applying |
| ADS-CRAWL-07 | Pass | Comprehensive sitemap with 90 URLs; `hreflang` alternates for all pages | No action needed |
| ADS-PROG-01 | Unknown | No ads displayed yet; cannot verify click behavior | Owner must commit to never clicking own ads |
| ADS-PROG-02 | Pass | No "click ads" or "support us" solicitation language | No action needed |
| ADS-PROG-03 | N/A | No ads displayed yet | Use neutral labels when adding ads |
| ADS-PROG-04 | Unknown | Cannot verify traffic sources from codebase | Confirm organic traffic with owner |
| ADS-PROG-05 | N/A | No ad code exists yet | Use AdSense code as provided; do not modify |
| ADS-PROG-06 | N/A | No ad placement exists yet | Only place ads on content pages |
| ADS-PROG-07 | N/A | Standard website, not a WebView app | No action needed |
| ADS-PUB-01 | Pass | No illegal content or activity promotion | No action needed |
| ADS-PUB-02 | Pass | Uses official press assets with attribution; properly disclaims unofficial status | No action needed |
| ADS-PUB-03 | Pass | No hate speech, discrimination, harassment, or violence promotion | No action needed |
| ADS-PUB-04 | Pass | No animal cruelty or endangered species content | No action needed |
| ADS-PUB-05 | Pass | Site clearly identifies as unofficial fan resource; Terms acknowledge trademark owners | Ensure About page has real publisher info |
| ADS-PUB-06 | Pass | No phishing, fake claims, or deceptive content | No action needed |
| ADS-PUB-07 | Pass | No content enabling dishonest behavior | No action needed |
| ADS-PUB-08 | Pass | No adult themes, sexual content, or child exploitation content | No action needed |
| ADS-PUB-09 | Pass | Site identity is clear; metadata is accurate | Add ads.txt once publisher ID is known |
| ADS-PUB-10 | N/A | No ads displayed yet | Plan non-intrusive ad placements |
| ADS-PUB-11 | N/A | No ads displayed yet | Only show ads on pages with substantial content |
| ADS-PUB-12 | N/A | No ads displayed yet | Do not place ads off-screen or in backgrounds |
| ADS-PUB-13 | Pass | No false election claims, harmful health claims, or climate denial | No action needed |
| ADS-PUB-14 | Pass | No manipulated media for political deception | No action needed |
| ADS-PUB-15 | Pass | No child endangerment content; site is about a teen-rated video game | No action needed |
| ADS-PUB-16 | Pass | No crisis exploitation or insensitive content | No action needed |
| ADS-REST-01 | Pass | No sexual content, sexual entertainment, or sexual products | No action needed |
| ADS-REST-02 | Pass | No shocking, graphic, or violent content beyond normal game discussion | No action needed |
| ADS-REST-03 | Pass | No explosives, firearms, or weapons sales/instructions | No action needed |
| ADS-REST-04 | Pass | No tobacco, drugs, or paraphernalia content | No action needed |
| ADS-REST-05 | Pass | No alcohol sales or irresponsible drinking promotion | No action needed |
| ADS-REST-06 | Pass | No gambling or paid games of chance | No action needed |
| ADS-REST-07 | Pass | No prescription drug sales or unapproved supplements | No action needed |
| ADS-REST-08 | N/A | No ads or video ads displayed | Monitor ad obstruction when ads are added |
| ADS-PRIV-01 | Fail | Privacy policy does not disclose Google-specific data collection (cookies, web beacons, IP addresses) | Rewrite privacy policy with Google-specific disclosures |
| ADS-PRIV-02 | Fail | Privacy policy does not specifically mention third-party ad vendors using cookies/web beacons | Update privacy policy language |
| ADS-PRIV-03 | Pass | No PII passed to Google in ad requests; standard GA4 implementation | No action needed |
| ADS-PRIV-04 | Fail | No EU consent mechanism; GA loads without consent for all visitors | Implement CMP/consent banner for EEA/UK traffic |
| ADS-PRIV-05 | Pass | No location data collection or geolocation API usage | No action needed |
| ADS-PRIV-06 | Pass | Site is not child-directed; content is about a teen-rated game | No action needed |
| ADS-PRIV-07 | Pass | No cookie manipulation on Google domains | No action needed |
| ADS-PRIV-08 | Pass | No sensitive category targeting; no audience lists or remarketing | No action needed |
| ADS-PRIV-09 | N/A | Site does not advertise housing, employment, or credit services | No action needed |
| ADS-PRIV-10 | N/A | No personalized ads currently served | Add interest-based ad disclosures when implementing AdSense |

---

## Completeness Check

- **Requirement IDs in reference**: 60
- **Requirement IDs in report**: 60
- **Missing IDs**: none

### Breakdown by section:
- A. Eligibility and Account Requirements: 4/4
- B. Site Ownership, Verification, and Readiness: 7/7
- C. Content Quality and Site Value: 8/8
- D. Navigation, UX, and Trust Signals: 6/6
- E. Crawlability, Access, and Technical Availability: 7/7
- F. AdSense Program Policy Requirements: 7/7
- G. Google Publisher Policies: 16/16
- H. Google Publisher Restrictions: 8/8
- I. Privacy and Data Requirements: 10/10

---

## Summary of Required Actions (Priority Order)

### Must Fix Before Applying (Blockers)
1. **Rewrite privacy policy** — Add Google-specific disclosures for Analytics, AdSense, cookies, web beacons, IP addresses, and DART cookie. (ADS-PRIV-01, ADS-PRIV-02)
2. **Implement consent mechanism** — Add CMP/cookie consent banner that blocks GA and ad scripts until consent is given for EEA/UK visitors. (ADS-PRIV-04)
3. **Add original commentary to embedded media** — Ensure gallery items, YouTube embeds, and external images have substantial original text around them. (ADS-CONTENT-02)
4. **Create ads.txt** — Once AdSense publisher ID is known, create `public/ads.txt` with correct Google seller line. (ADS-TXT-01, ADS-TXT-02)

### Should Fix Before Applying (High Risk)
5. **Verify AdSense crawler access** — Check Cloudflare dashboard for bot management rules that might block `Mediapartners-Google`. (ADS-CRAWL-02)
6. **Monitor site stability** — Verify all 90 sitemap URLs return 200; check Cloudflare Workers error rates. (ADS-CRAWL-01, ADS-CRAWL-06)
7. **Enhance Gallery page** — Add descriptive text content to the Gallery page. (ADS-CONTENT-03)
8. **Verify About/Contact pages** — Ensure About has real author info and Contact has a working method. (ADS-UX-05)
9. **Add AdSense verification code** — Once ready, add AdSense snippet to `layout.tsx` `<head>`. (ADS-OWN-01, ADS-SITE-02)

### Nice to Have (Medium Risk)
10. **Plan ad placement strategy** — Design non-intrusive ad slots that maintain clear ad/content separation. (ADS-UX-06, ADS-PROG-03, ADS-CONTENT-05)
11. **Confirm traffic sources** — Verify with owner that traffic is organic/legitimate. (ADS-PROG-04)
12. **Add `Mediapartners-Google` to robots.txt** — Explicitly allow the AdSense crawler. (ADS-CRAWL-02)
