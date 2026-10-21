# Project State — SMS Info (Safety Management Solutions website)

> **Purpose of this file:** durable context for any human or AI agent picking up this repository.
> It records the architecture, the verified audit findings, and the recommended fix order.
> **Agent instructions live in [`AGENTS.md`](./AGENTS.md)** — read that before editing.

- **Repository:** `/home/alma/Projects/project-sms/sms-info`
- **Branch:** `dev`
- **HEAD at audit:** `8efb256` — *Merge pull request #2 from info-tech-sms1/fix/codebase-audit*
- **Last audited:** 2026-10-21
- **Status:** audit findings were fixed on `dev` on 2026-10-21 — see **section 9**.
- **Working tree at audit time:** `M package-lock.json` (pre-existing; not caused by the audit).

---

## 1. What this project is

A static, multi-page marketing site for **Safety Management Solutions (SMS)**, a premises-safety
consultancy in Ranchi, Jharkhand. It advertises four things:

1. Evacuation route planning / floor-plan maps
2. Safety equipment supply and upkeep
3. Safety awareness events, workshops and posters
4. General on-site safety walkthroughs

The site is a React 19 SPA with **nine HTML entry points** (one per route), built by Vite and
deployed as static files. There is **no backend**; the contact form posts directly to Web3Forms
from the browser.

### Stack

| Layer | Choice |
| --- | --- |
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`), mostly arbitrary hex values |
| Animation | Lenis smooth scroll, CSS keyframes, `animate-in` utilities |
| Icons | `lucide-react` |
| Tests | Vitest (unit tests only) |
| Lint | ESLint 10 + typescript-eslint |
| Hosting | Any static host (Netlify / Vercel / Cloudflare Pages / GitHub Pages) |

### Commands

```bash
npm run dev        # Vite on http://127.0.0.1:3000
npm run build      # emits dist/
npm run preview    # preview the build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint src eslint.config.js vite.config.ts
npm test           # vitest run
npm run clean      # rm -rf dist server.js
```

**Verified at audit time:** `typecheck` ✅, `lint` ✅, `test` ✅ (4/4), `build` ✅.
`npm ci --dry-run` reported the lockfile is up to date.

---

## 2. Architecture map

### Routing

`src/utils/router.ts`
- `routesMeta` holds `path`, `title`, `description`, `canonical` for each route.
- `normalizePath()` adds a trailing slash, resolves GitHub-Pages `?/…` redirects, and maps
  unknown paths to `/404/`.
- The browser URL is **not** rewritten to `/404/`; only the rendered page and canonical change.

`src/App.tsx`
- Holds `currentPath`, a `preselectedService` string, and the Lenis instance.
- A `switch` renders the page component.
- A `useEffect` copies `routesMeta` into `document.title`, description, OG/Twitter tags,
  `og:url`, `og:image`, and `link[rel=canonical]`.

### HTML entry points

Each route has its own `index.html` with hard-coded title/description/OG tags. Vite lists all
nine in `vite.config.ts > build.rollupOptions.input`:

```
/  /services/  /evacuation-planning/  /safety-equipment/  /awareness-events/
/about/  /contact/  /privacy/  /terms/
```

### Components

| File | Responsibility |
| --- | --- |
| `Header.tsx` | Sticky nav, desktop links, mobile drawer |
| `Footer.tsx` | Nav, contact details, legal line |
| `HeroFeaturePanel.tsx` | Hero image card with caption |
| `Logo.tsx` | Light/dark logo switch with fallback |
| `FAQSection.tsx` | Category tabs + search + accordion (reused on Services/Contact) |
| `ContactForm.tsx` | Validated inquiry form → Web3Forms |
| `PosterModal.tsx` | Accessible-ish poster preview dialog |
| `FloatingActions.tsx` | Desktop WhatsApp bubble + mobile call/WhatsApp bar |
| `EvacuationMapDiagram.tsx` | **Dead code** — not imported anywhere |

### Content and config

- `src/content/siteContent.ts` — intended single source of truth for copy.
- `src/config/siteConfig.ts` — Web3Forms key/endpoint plus a **duplicate, unused** `contact` object.
- `src/index.css` — Tailwind import, brand CSS variables, reduced-motion rules, marquee keyframes.

---

## 3. Verified audit findings

Severity: **P0** = broken user-facing behaviour, **P1** = accessibility/SEO correctness,
**P2** = maintainability/content hygiene. Evidence is tagged `[runtime]`, `[static]`, or `[build]`.

### P0 — Confirmed functional bugs

#### P0-1. `/awareness-events/` never scrolls to its section
`src/App.tsx:174` passes `initialCategory="safety-awareness"`, but the only matching content ID
in `src/content/siteContent.ts` is **`safety-events`** (line 171). No element with
`safety-awareness` exists.

`[runtime]` At 1280×900:
- `/evacuation-planning/` → scrolls to **Y = 234**
- `/safety-equipment/` → scrolls to **Y = 234**
- `/awareness-events/` → stays at **Y = 0**

**Fix:** use `initialCategory="safety-events"` (or `event-hosting` / `event-builder`, depending on
which section should be the landing target).

#### P0-2. Three "dedicated" routes render the same generic page
`src/App.tsx:155–176` renders `<ServicesPage>` for `/evacuation-planning/`,
`/safety-equipment/`, and `/awareness-events/`, differing only by the (broken) `initialCategory`.

`[runtime]` All three routes return:
- identical `<h1>`: *"Premises Safety Solutions & Experiential Awareness Events"*
- identical body text length: **14,953 characters**

Meanwhile `src/pages/EvacuationPlanningPage.tsx`, `SafetyEquipmentPage.tsx`, and
`AwarenessEventsPage.tsx` exist, are fully written, and are **never imported**. This is the single
largest inconsistency in the repo: the router and the page files disagree about what the site is.

**Fix (choose one):**
- Wire the three dedicated pages into `App.tsx` (preferred — the content already exists), or
- Delete the dead pages and make `ServicesPage` genuinely variant-aware.

#### P0-3. Mobile header overflows the viewport below ~400 px
`src/components/Header.tsx:96` uses `flex items-center justify-between gap-8` with three
non-shrinking children: logo block, a `hidden md:flex` nav, and the CTA + hamburger group
(`gap-3 shrink-0`). At narrow widths the CTA and hamburger are pushed past the right edge.

`[runtime]` At viewport widths **320 / 360 / 375 / 390**:
- `document.documentElement.scrollWidth` = **408 px**
- hamburger's right edge = **408 px** → partly or fully off-screen
- the "Request a Consultation" CTA is clipped at 320 px

**Fix:** hide the CTA below `sm`, reduce `gap-8`, and allow the logo block to shrink/truncate.

#### P0-4. FAQ open state is keyed to the filtered list index
`src/components/FAQSection.tsx:82` stores `openIndices` as positions, and line 204 tests
`openIndices.includes(idx)` against the **filtered** array. Switching category therefore opens
whatever happens to sit at the old index.

`[runtime]` Open FAQ index `1`, then filter to *Equipment* → the first two equipment FAQs open.

**Fix:** key by a stable FAQ id (or by the question string), not by array position.

#### P0-5. Stale service preselection leaks into the contact form
`src/App.tsx:25` keeps `preselectedService` in App state and never clears it. `ContactForm`
re-syncs only when `initialService` is truthy (`ContactForm.tsx:23–27`), so an old value persists.

`[runtime]` Select "Emergency Escape Route Planning" on Home → navigate Home → Contact via the
header → the form still shows *"Emergency Escape Route Planning"*.

**Fix:** clear the value after consumption, or pass it through navigation state / a query param.

#### P0-6. WhatsApp icon SVG path is corrupted
`src/components/FloatingActions.tsx:25` contains the segment:

```
... .36-419.456-.563.096-.144 ...
```

The correct lucide/WhatsApp path is `.36-.419.456-.563`. The malformed numbers make the icon
render as a broken shape in the desktop floating button.

`[static]` — visible in source and in the built bundle. **Fix:** restore the correct path data
(or import a proper WhatsApp icon).

#### P0-7. Unknown routes are soft 404s with the wrong canonical
`src/utils/router.ts:105–106` returns `/404/` for unknown paths, but `window.location` stays on
the bad URL while `App.tsx` rewrites the canonical to `https://…/404/`.

`[runtime]` `/does-not-exist/` → URL stays `/does-not-exist/`, canonical becomes `…/404/`, and no
`noindex` is emitted. Search engines can index an arbitrary number of soft-404 URLs.

**Fix:** add `<meta name="robots" content="noindex">` when the resolved route is `/404/`, and
serve a real 404 status at the host level (or at minimum a canonical to the bad URL).

---

### P1 — Accessibility

#### P1-1. No active state for service subroutes
`Header.tsx:118–146` compares `currentPath === item.href`. `/evacuation-planning/`,
`/safety-equipment/`, and `/awareness-events/` never equal `/services/`, so the Services link is
never highlighted. There is also **no `aria-current` anywhere in the codebase**.

`[runtime]` Confirmed: no active styling and no `aria-current` on all three subroutes.

**Fix:** treat the three subroutes as children of `/services/` and emit `aria-current="page"`.

#### P1-2. FAQ tabs are only half-implemented ARIA tabs
`FAQSection.tsx:125–165` declares `role="tablist"` / `role="tab"` with `aria-selected`, but:
- no `aria-controls` pointing at a `tabpanel`
- no `tabIndex` roving (all tabs stay in the tab order)
- no Arrow/Home/End key handling
- the filtered list is not a `role="tabpanel"`

This is worse than plain buttons: screen readers announce a tab interface that does not behave
like one.

**Fix:** either implement the full tabs pattern, or drop the tab roles and use toggle buttons
with `aria-pressed`.

#### P1-3. Contact success message is outside the live region
`ContactForm.tsx:160` wraps the `config_needed` and `error` states in
`aria-live="polite"`, but the success branch starts at line **239**, after that wrapper closes.
A screen-reader user who submits successfully gets no announcement (the form is replaced
silently).

**Fix:** move the success block inside the live region, or add a separate
`role="status"` announcement.

#### P1-4. Poster modal accessibility gaps
`src/components/PosterModal.tsx`
- Focus moves to the close button on open (line 28) but is **never restored** to the triggering
  card on close.
- The dialog has no `data-lenis-prevent`, so Lenis can keep scrolling the page behind it.
- The UI labels the poster "Bilingual Poster" (line 107) but renders only `poster.title`;
  `poster.titleHindi` exists in the content model and is unused here.
- The poster is a CSS mock, not an `<img>`, so there is no text alternative for the visual.

**Fix:** store `document.activeElement` on open and restore it on close; add
`data-lenis-prevent`; render the Hindi title; add a concise `aria-describedby` summary.

#### P1-5. Heading hierarchy skips levels
`[runtime]` heading order on key pages:
- Home: `h2 → h4` (step buttons in the 4-step section)
- Services: `h1 → h3`, then `h2 → h4`
- Contact: `h1 → h3`

No duplicate IDs, missing `alt` attributes, or unnamed form controls were found — this is the
main structural a11y issue.

**Fix:** promote/demote headings so levels never skip (e.g. step titles to `h3`, card titles to
`h2`/`h3` consistently).

#### P1-6. Colour contrast failures
Measured against white unless noted:

| Pair | Ratio | Verdict |
| --- | --- | --- |
| `#25D366` on white | **1.98:1** | fail |
| white on `#25D366` | **1.98:1** | fail |
| `#F4974C` on white | **2.24:1** | fail |
| `#62B5DA` on white | **2.30:1** | fail |
| `text-slate-500` on `#F3F7FA` | **4.42:1** | marginal fail (needs 4.5) |

The WhatsApp buttons are inconsistent: some use `text-white` on `#25D366` (fails) while the mobile
bar and poster modal use `text-slate-950` (passes). `FloatingActions.tsx:20` is the failing one.

**Fix:** standardise on dark text on green (`text-slate-950`), darken the orange/blue for text
use, and bump `slate-500` to `slate-600` on the mist background.

#### P1-7. Marquee has no pause control and duplicates content for AT
`HomePage.tsx:220` duplicates `sectorsServed` (`[...list, ...list]`) for a seamless loop, so every
sector is announced twice. Pausing only happens on `:hover` (`index.css:104`) — keyboard and
touch users cannot stop it. Moving content that lasts >5 s needs a pause mechanism (WCAG 2.2.2).

Also, the `-50%` translation plus `gap-10` does not perfectly align the loop, so the band can jump.

**Fix:** add a visible pause button, mark the duplicate copy `aria-hidden`, and offset the
keyframe by half the track width including the gap.

#### P1-8. Small text contradicts the stylesheet's own rule
`index.css:70–72` says *"Ensure minimum font size is 13px"* and forces `.text-xs` to 13 px, but
arbitrary utilities bypass it: **32 occurrences** of `text-[10px]`, `text-[11px]`, `text-[12px]`.
The `!important` also makes responsive `text-xs` overrides impossible.

**Fix:** remove the `!important` hack and replace arbitrary small sizes with a documented scale.

#### P1-9. `EvacuationMapDiagram.tsx` is dead and inaccessible
Not imported anywhere. If it is ever revived it needs:
- `<title>` / `<desc>` + `role="img"` / `aria-labelledby`
- `aria-pressed` on its toggle buttons
- reduced-motion handling for its SMIL `<animate>` (lines 200–201)
- readable label sizes (currently 8–9 px)

**Fix:** delete it, or fix it before wiring it in.

---

### P1 — SEO and metadata

#### P1-10. OG image dimensions are wrong everywhere
`public/og-image.jpg` is actually **1376×768**, but every entry point declares
`og:image:width=1200` / `og:image:height=630`. Social cards will be cropped or rejected.

#### P1-11. Three pages are missing OG image metadata
`[runtime]` `/awareness-events/`, `/privacy/`, and `/terms/` have **no**
`og:image:width`, `og:image:height`, or `og:image:alt`. The other six do.
`App.tsx:93–98` also never updates `og:image:alt` or the dimensions on route change.

#### P1-12. Titles/descriptions promise content that is not on the page
Because three routes share `ServicesPage`, the `<title>` and meta description for
`/evacuation-planning/` (evacuation maps), `/safety-equipment/` (equipment catalogue), and
`/awareness-events/` (poster gallery) describe features that are absent from the rendered page.
This is both an SEO and a trust problem.

#### P1-13. Static HTML and runtime metadata drift
The `index.html` files hard-code tags; `App.tsx` overwrites only a subset. Anything not in the
subset (image alt, dimensions, `og:type`, locale) stays at the home-page value on every route.

#### P1-14. Sitemap is fine, but `lastmod` is stale
`public/sitemap.xml` lists all nine routes with `lastmod=2026-10-19`; `robots.txt` points to it
correctly. No action needed beyond refreshing dates on release.

---

### P2 — Content and source-of-truth drift

#### P2-1. `siteContent.ts` is not actually the single source of truth
`README.md:61` claims it is. In practice:
- `FAQSection.tsx:48–49` hard-codes its own FAQ copy.
- `Header.tsx`, `Footer.tsx`, `ContactPage.tsx` pull some copy from `siteContent` and hard-code the rest.
- `siteConfig.contact` duplicates `siteContent.contact` and is **never read** (only
  `web3FormsAccessKey` and `formEndpoint` are used).

#### P2-2. Dead content fields
Zero TSX references:
- `trustStrip` (`siteContent.ts:114`)
- `whoWeServe` (`:461`)
- `testimonialsSection` (`:795`)

Only referenced by dead pages:
- `escapePlanningDetails` (`:568`) → `EvacuationPlanningPage.tsx`
- `equipmentCatalogue` (`:618`) → `SafetyEquipmentPage.tsx`
- `eventsSection` (`:518`) → `AwarenessEventsPage.tsx`

#### P2-3. Three overlapping industry lists
`industriesCompact` (`:380`), `sectorsServed` (`:441`), and `whoWeServe` (`:461`) describe the
same seven sectors with slightly different wording. Only two are used, and they disagree
(e.g. "Industrial Sites & Manufacturing Plants" vs "Industrial Sites & Factories").

#### P2-4. Service names disagree across surfaces
- `siteContent.ts:208`: *"Specialized Electrical & Industrial **Hazard Walkthroughs**"*
- `siteContent.ts:815` (`servicesList`): *"Specialized Electrical & Industrial **Safety Inspections**"*
- Home cards: *"Safety Equipment Supply & Upkeep"*, *"Safety Awareness & Training"*,
  *"General Safety Walkthrough & Consulting"* — none match the consolidated service titles.

This matters because the selected name is copied into the contact form and the Web3Forms payload.

#### P2-5. Content rules are violated in three places
`siteContent.ts:11` explicitly forbids: ISI/EN standards, **refilling**, hydrostatic tests,
**live fire**, **"safety engineers"**, stretchers, eyewash stations. Violations:
- `FAQSection.tsx:48–49` — "periodic extinguisher **refilling**" (question and answer)
- `siteContent.ts:303` — "Courtyard **live fire** extinguisher discharge practice"
- `EvacuationPlanningPage.tsx:151` — "Our **safety engineers** visit your office…"

These are exactly the claims the content owner asked to avoid; treat them as copy bugs, not style
nits.

#### P2-6. README is stale
- Claims "separate HTML entry files for every route" with dedicated pages for evacuation,
  equipment, and awareness (`README.md:38–40`) — but all three render the same component.
- Claims `siteContent.ts` is the single master content file (`:61`) — see P2-1.
- Tells the editor to replace "placeholder frames" / "testimonial placeholder" (`:79`, `:91`,
  `:100`) — no such placeholders exist in the rendered UI.
- Tells the editor to add a GA4 ID to `siteConfig.ts` (`:81`) — there is no GA4 field and no
  analytics code.
- Says `public/logo.png` and `public/logo-white-badge.svg` are the canonical marks — both exist,
  so this one is accurate.

---

### P2 — Config, tooling and maintainability

#### P2-7. TypeScript is not strict
`tsconfig.json` has no `"strict": true`, no `noUnusedLocals`, no `noUnusedParameters`,
no `noFallthroughCasesInSwitch`. `lint` catches unused imports, but not unused locals or
implicit `any` in every position.

#### P2-8. AI Studio scaffolding leftovers
- `package.json` name is **`react-example`**.
- `vite.config.ts` has an unused `@` alias and a hard-coded `allowedHosts` entry for a
  `*.manus.computer` preview host.
- `metadata.json` declares `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`, but there is no Gemini
  code, no server, and no API route anywhere.
- `npm run clean` deletes `server.js`, which does not exist.

#### P2-9. Security headers are defined twice
`public/_headers` (Netlify/Cloudflare) and `vercel.json` contain the same CSP and header set.
They must be kept in sync manually; they will drift. The CSP itself is reasonable
(`script-src 'self'`, `frame-ancestors 'self'`, etc.).

#### P2-10. No CI, thin tests
No `.github/` directory. The only tests are four `normalizePath` unit tests
(`src/utils/router.test.ts`). Nothing covers routing → page mapping, the FAQ filter, the contact
form validation, or the metadata sync — i.e. exactly the areas where the P0 bugs live.

#### P2-11. Brand tokens are unused
`index.css:30–40` defines `--navy-900`, `--sky-400`, `--orange-500`, etc. There are **0**
`var(--…)` references in TSX, versus **220** `bg-[#…]` and **331** `text-[#…]` hard-coded
colour utilities. Changing the brand palette means a global find-and-replace.

#### P2-12. Oversized assets
- `public/favicon.svg` — ~185 KB, 2024×2024
- `public/logo.png` — 2048×2048, ~337 KB
- `public/og-image.jpg` — ~808 KB
- Seven original `.jpg` files sit beside their `.webp` derivatives in `src/assets/images/`
- All four `facility_safety_audit_*` files are unused

**Fix:** compress/resize, delete originals and unused derivatives, and reference the `.webp`
variants only.

---

## 4. What is working well

- Clean, consistent visual language; responsive layout works at ≥400 px.
- `safeScrollTo` / `restoreScrollForRoute` respect `prefers-reduced-motion`.
- The contact form has real validation, `aria-invalid`, `aria-describedby`, and honest error
  states (no fake success).
- The mobile drawer traps focus, closes on Escape, and restores focus to the hamburger.
- The poster modal has a focus trap and Escape handling.
- Skip link is present and functional.
- No missing image `alt` attributes, no duplicate IDs, no unnamed controls (runtime-checked).
- Security headers and a CSP are present.
- Build, lint, typecheck, and tests all pass.

---

## 5. Recommended fix order

1. **P0-2 / P0-1** — decide the page architecture, wire the three dedicated pages (or delete
   them), and fix the `safety-awareness` → `safety-events` ID. This resolves the biggest content
   and SEO mismatch in one change.
2. **P0-3** — fix the mobile header overflow; verify at 320/360/375/390.
3. **P0-5 / P0-4** — clear stale preselection; key FAQ state by ID.
4. **P0-6 / P0-7** — repair the SVG path; add `noindex` for the 404 route.
5. **P1-1 → P1-4** — nav active state, FAQ tab semantics, success live region, modal focus
   restore + `data-lenis-prevent` + Hindi title.
6. **P1-5 / P1-6 / P1-7 / P1-8** — headings, contrast, marquee pause, font scale.
7. **P1-10 → P1-13** — regenerate `og-image.jpg` at the declared size (or fix the declarations),
   add the missing tags, and sync `og:image:alt` / dimensions at runtime.
8. **P2-5** — remove the three content-rule violations before any launch.
9. **P2-1 → P2-4** — collapse duplicate content/config, unify service names.
10. **P2-7 → P2-12** — enable `strict`, remove AI Studio scaffolding, add CI, compress assets.

---

## 6. Verification log

Commands run (all from the repo root):

```text
npm run typecheck   → pass
npm run lint        → pass
npm test            → 4 passed (src/utils/router.test.ts)
npm run build       → pass (dist/ generated; gitignored)
```

Runtime audit: Vite dev server on `http://127.0.0.1:3000/`, headless Chromium via CDP on port
`9223`, viewports 320/360/375/390/768/1280/1440. Checks performed per route:

- document title, meta description, canonical, OG/Twitter tags
- `h1` text and total body text length
- heading order, duplicate IDs, image `alt`, accessible names
- scroll position after navigation
- header/nav active state and `aria-current`
- horizontal overflow (`scrollWidth` vs `innerWidth`)
- FAQ filter/open-state behaviour
- service preselection across navigation

Screenshots captured during the audit (outside the repo):

```
/tmp/opencode/shots/home-desktop.png
/tmp/opencode/shots/home-375.png
/tmp/opencode/shots/home-mobile.png
/tmp/opencode/shots/services.png
```

> These are scratch artefacts. They are not part of the deliverable and can be deleted.

---

## 7. Session handoff

At the end of the audit session:

- No source files were modified.
- `dist/` exists from the verification build and is gitignored.
- The Vite dev server, headless Chromium, and all background shell jobs were stopped.
- The machine was scheduled for shutdown with an extended delay so this file could be written.

If you are resuming:

1. Read [`AGENTS.md`](./AGENTS.md).
2. Run `npm install` (or `npm ci`) if `node_modules` is missing.
3. Run the four verification commands above to confirm the baseline still passes.
4. Start with fix #1 in section 5.

---

## 8. Related documents

- [`AGENTS.md`](./AGENTS.md) — rules, conventions and definition of done for agents working here.
- [`README.md`](./README.md) — deployment guide (partially stale; see P2-6).

---

## 9. Resolution log — 2026-10-21 (`dev` branch)

All P0 findings and the majority of P1/P2 findings were fixed on `dev`. This section records
what changed and what remains, so the audit above stays useful as history.

### P0 — fixed

- **P0-1 / P0-2:** `App.tsx` now lazy-loads and renders `EvacuationPlanningPage`,
  `SafetyEquipmentPage`, and `AwarenessEventsPage` for their own routes. Each route has a
  distinct `<h1>`, body copy, and scroll target. The `initialCategory` prop and the
  `safety-awareness` typo were removed.
- **P0-3:** The header row now uses `gap-2 sm:gap-6`, hides the desktop CTA below `sm`, and lets
  the brand shrink. The bento grid uses `grid-cols-1 lg:grid-cols-12` with `col-span-1` defaults,
  and the evacuation layer controls wrap. All routes were verified at 320 px with
  `scrollWidth === innerWidth`.
- **P0-4:** FAQ open state is keyed by question text instead of filtered index.
- **P0-5:** `ContactForm` consumes the one-shot preselection through `onServiceConsumed`; App
  clears it. Verified: first visit keeps the selected service, a later visit defaults again.
- **P0-6:** The malformed WhatsApp SVG path was repaired and verified with
  `path.getTotalLength()`.
- **P0-7:** Unknown routes now set `robots = noindex, follow`; `public/404.html` also carries
  `noindex`. Canonical stays on `/404/`.

### P1 — fixed

- Active nav state + `aria-current="page"` for service subroutes.
- FAQ filters use `aria-pressed` toggle buttons (not half-implemented tabs).
- Contact form success, config-needed, and error states are live regions; validation focuses the
  first invalid field and wires `aria-invalid` / `aria-describedby`.
- Poster modal restores focus to the triggering card, supports Escape, traps Tab, uses
  `data-lenis-prevent`, and shows the Hindi title.
- Heading hierarchy is valid on every route (no skipped levels).
- Contrast: darkened orange text on white, red asterisks to `red-600`, WhatsApp text link to
  `emerald-700`, light-on-navy text to `slate-400`, decorative separators to `slate-500`.
- Marquee has a pause/play control, one copy is `aria-hidden`, and the track is two equal groups.
- Font floor: every `text-[10px]` / `[11px]` / `[12px]` class was replaced with `text-xs` (13 px).
- `EvacuationMapDiagram` has `role="img"`, `<title>`/`<desc>`, `aria-pressed` layer buttons, and
  the SMIL animation was replaced with a static marker.
- OG image was regenerated at 1200×630; all routes declare width, height, and alt; App syncs
  `og:image:alt` and `twitter:image:alt`.
- Sitemap `lastmod` updated to 2026-10-21.
- Mobile drawer has `data-lenis-prevent`; Escape closes and returns focus.

### P2 — fixed

- Removed dead content fields (`trustStrip`, `whoWeServe`, `testimonialsSection`).
- Moved the default FAQ copy into `siteContent.defaultFaqs`; added a regression test for the
  editorial boundary.
- Removed `siteConfig.contact` (unused duplicate).
- Aligned the contact service list with `consolidatedServices`; a test enforces it.
- Removed the three content-rule violations ("refilling", "live fire", "safety engineers") and
  replaced them with compliant wording.
- README corrected (content source, testimonials, analytics, photography, contributor docs).
- TypeScript `strict`, `noUnusedLocals`, `noUnusedParameters`,
  `noFallthroughCasesInSwitch`, and `forceConsistentCasingInFileNames` are enabled.
- Removed AI Studio leftovers (deleted `metadata.json`, removed `server.js` clean
  target, hard-coded preview hosts).
- Added `.github/workflows/ci.yml` (typecheck, lint, test, build).
- Compressed `logo.png` (512 px), `og-image.jpg` (1200×630, 140 KB), and minified both SVGs;
  deleted 10 unused JPG/WebP originals (6.6 MB → 1.4 MB).
- `package.json` renamed to `sms-info`; lockfile synced.

### Verification (2026-10-21)

- `npm run typecheck` — pass.
- `npm run lint` — pass.
- `npm test` — 13 tests pass (2 files).
- `npm run build` — pass, all 9 HTML entries emitted.
- Runtime checks (headless Chromium/CDP) at **320 px and 1280 px**:
  - every route: `scrollWidth === innerWidth`, one `<h1>`, valid heading order;
  - FAQ filter/open-state behaviour;
  - service preselection consumption;
  - form validation + config-needed live region;
  - mobile drawer open/Escape/focus restore;
  - poster modal open/Escape/focus restore + Hindi title;
  - marquee pause;
  - 404 `noindex`.
- Remaining known debt: the ~500 hard-coded colour values have **not** been migrated to the
  `--navy-900` / `--sky-400` / `--orange-500` tokens in `src/index.css`; `public/_headers` and
  `vercel.json` still duplicate the same header set (kept in sync manually).
