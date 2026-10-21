# AGENTS.md — Working rules for the SMS website

> **Read [`project-state.md`](./project-state.md) first.** It contains the architecture map, the
> full verified audit, and the recommended fix order. This file only defines *how* to work here.

- **Project:** Safety Management Solutions (SMS) marketing site
- **Root:** `/home/alma/Projects/project-sms/sms-info`
- **Stack:** React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Vitest
- **Output:** static multi-page site, no backend

---

## 1. Golden rules

1. **Read before you write.** Open `project-state.md`, then the files you intend to touch.
2. **Do not delete unfamiliar work.** This repo has uncommitted changes and dead-but-written
   pages. Investigate before removing anything.
3. **One source of truth.** Copy belongs in `src/content/siteContent.ts`. If you add a string to a
   component that a content editor might change, put it in `siteContent` instead.
4. **No invented facts.** Do not add business hours, response times, certifications, standards,
   coordinates, prices, or "free" promises. Use `[confirm]` where data is pending.
5. **Accessibility is not optional.** Every change must keep keyboard operation, visible focus,
   and screen-reader semantics intact.
6. **Verify at mobile widths.** 320 px is the floor, not an afterthought.

---

## 2. Content rules (hard constraints)

`src/content/siteContent.ts` line 11 states the editorial boundary. Do **not** introduce:

- ISI / EN / ISO standard claims
- extinguisher **refilling** or hydrostatic testing
- **live fire** demonstrations
- the phrase **"safety engineers"**
- stretchers or eyewash stations
- invented service-level guarantees

Three violations found in the 2026-10-21 audit were fixed on `dev`:
- "refilling" in `FAQSection.tsx`
- "live fire" in `siteContent.ts`
- "safety engineers" in `EvacuationPlanningPage.tsx`

`src/content/siteContent.test.ts` now fails if any of these phrases return.

Service names must match `siteContent.consolidatedServices` and `contactPage.servicesList`.
A regression test enforces the list; the home cards may use shorter marketing labels, but every
value passed to the contact form must resolve to an option. When you touch a service name, update
every surface: home cards, services page, contact dropdown, footer, and metadata.

---

## 3. Commands

```bash
npm run dev        # http://127.0.0.1:3000
npm run typecheck
npm run lint
npm test
npm run build
```

Run **all four** checks before declaring work done. `build` is not a substitute for `typecheck`
and `lint`.

### GitHub access

The environment is authenticated with the GitHub CLI:

```bash
gh auth status          # account ItzAlmaDev, scopes include repo + workflow
git push -u origin dev  # publish the working branch
gh pr create --base main --head dev
```

- Work on `dev`; do not push directly to `main`.
- Never force-push a shared branch.
- Run the full verification suite before every push.

---

## 4. Architecture conventions

### Routing
- Routes are declared in **two** places: `src/utils/router.ts` (`routesMeta`) and
  `src/App.tsx` (the render switch). Change both together.
- Each route needs its own `<route>/index.html` **and** an entry in
  `vite.config.ts > build.rollupOptions.input`.
- `normalizePath()` is the only URL normaliser. Do not add ad-hoc path parsing in components.
- Unknown paths resolve to `/404/`. Preserve the soft-404 behaviour until a host-level 404 exists,
  and add `noindex` if you touch it.

### Page components
- `src/pages/*Page.tsx` exports a named component taking `{ onNavigate }` (plus optional props).
- Pages are lazy-loaded in `App.tsx`; keep the `React.lazy` + `Suspense` pattern.
- `ServicesPage` is currently shared by four routes. If you split it, update the switch and the
  metadata in the same commit.

### Styling
- Tailwind utility classes inline; no CSS modules.
- Brand tokens live in `src/index.css` (`--navy-900`, `--sky-400`, `--orange-500`, …). They are
  currently unused by TSX — prefer adding `var(--token)` usage over new hard-coded hex values.
- Never hard-code a colour that fails contrast. Minimums: **4.5:1** for body text, **3:1** for
  large text and UI boundaries.
- Do not add `text-[10px]` / `text-[11px]` / `text-[12px]`. The stylesheet declares a 13 px floor.

### Motion
- Respect `prefers-reduced-motion` (already handled globally in `index.css`).
- Any auto-playing motion lasting more than 5 s needs a pause control.
- Do not animate layout properties; use `transform` / `opacity`.

---

## 5. Accessibility checklist

Apply to every PR:

- [ ] One `<h1>` per page; heading levels never skip.
- [ ] Every image has a meaningful `alt` (or `alt=""` if decorative).
- [ ] Every control has an accessible name; icon-only buttons use `aria-label`.
- [ ] Keyboard: Tab reaches everything, focus is visible, no traps.
- [ ] Dialogs: focus moves in, is trapped, Escape closes, focus returns to the trigger.
- [ ] Dynamic status messages use `role="status"` / `aria-live="polite"` **and** live inside the
      live region for the whole lifetime of the message.
- [ ] Tab-like widgets implement the full ARIA tabs pattern, or use plain buttons with
      `aria-pressed`.
- [ ] Nav links expose `aria-current="page"` (including parent-section routes).
- [ ] Colour contrast checked in light theme and at 320 px width.
- [ ] Motion can be paused or is disabled under reduced motion.

Known open issues are listed in `project-state.md` → section 3. Do not reintroduce them.

---

## 6. SEO and metadata

- Titles/descriptions live in `src/utils/router.ts` **and** the route's `index.html`. Keep them
  identical.
- `App.tsx` syncs title, description, OG/Twitter title+description, `og:url`, `og:image`,
  `og:image:width`/`height`/`alt`, `twitter:image:alt`, canonical, and the 404 `robots` tag.
  If you add a tag, update both the HTML and the sync effect.
- `public/og-image.jpg` is **1200×630**; every route declares those dimensions. Regenerate at
  the same size if the artwork changes.
- Update `public/sitemap.xml` `lastmod` when routes or content change.
- Never let a route's metadata promise content that the rendered page does not contain.

---

## 7. Forms

- `ContactForm` posts to Web3Forms using `siteConfig.web3FormsAccessKey` /
  `siteConfig.formEndpoint`. There is no server.
- Never fake a success state. If the key is a placeholder, keep the `config_needed` branch.
- Validate on blur and on submit; keep `aria-invalid` and `aria-describedby` wired to the error.
- The success message must be announced (see the checklist).
- Clear any preselected service after it is consumed; do not let it leak across navigation.

---

## 8. Files you should know

| Path | Why it matters |
| --- | --- |
| `src/App.tsx` | Routing switch, preselection state, metadata sync, Lenis |
| `src/utils/router.ts` | Route table + `normalizePath` |
| `src/content/siteContent.ts` | All copy and content models |
| `src/config/siteConfig.ts` | Web3Forms key + endpoint (no duplicate contact object) |
| `src/index.css` | Tokens, reduced motion, marquee, focus styles |
| `src/components/Header.tsx` | Nav + mobile drawer; active state, focus trap, 320 px layout |
| `src/components/FAQSection.tsx` | Filters + accordion; open state keyed by question |
| `src/components/ContactForm.tsx` | Validation + live regions + one-shot preselection |
| `src/components/PosterModal.tsx` | Dialog focus management, Escape, Hindi title |
| `src/components/FloatingActions.tsx` | WhatsApp SVG path + contrast |
| `public/_headers`, `vercel.json` | Duplicated security headers — keep in sync |
| `project-state.md` | Full audit, resolution log, and remaining debt |

The three technical service pages and `EvacuationMapDiagram` are now **live** routes/components
(not dead code). Keep their metadata and content in sync with `siteContent`.

---

## 9. Definition of done

A change is done when:

1. `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` all pass.
2. The affected routes were opened at **320 px and 1280 px**.
3. Keyboard-only navigation works for any interactive element you touched.
4. No new hard-coded colour, font size below 13 px, or duplicated copy was introduced.
5. `project-state.md` is updated if you fixed a listed issue or discovered a new one.
6. Metadata still matches the rendered page.

---

## 10. Change log for agents

Append a short entry here when you complete a meaningful change, so the next agent knows the
baseline moved.

| Date | Change | Verified |
| --- | --- | --- |
| 2026-10-21 | Added `project-state.md` and `AGENTS.md`; no source changes | typecheck / lint / test / build all pass |
| 2026-10-21 | Fixed all P0 audit findings, most P1/P2; wired dedicated service pages; added CI + regression tests | typecheck / lint / 13 tests / build pass; runtime at 320 px and 1280 px |

---

**Related:** [`project-state.md`](./project-state.md) · [`README.md`](./README.md)
