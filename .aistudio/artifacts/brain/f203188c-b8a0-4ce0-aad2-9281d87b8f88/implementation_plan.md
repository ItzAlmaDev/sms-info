# Safety Management Solutions (SMS) – Official Website Architecture (Revised)

Production-ready, multi-page web platform for **Safety Management Solutions (SMS)**, an Indian workplace and community safety firm based in Ranchi, Jharkhand. The website establishes immediate institutional trust and converts visitors into inquiries via phone, WhatsApp (`+91 9334701135`), email (`Info@safetymanagementsolutions.in`), and validated quote requests.

### User Review & Critical Decisions

> [!IMPORTANT]
> The architectural plan has been updated with your specific revisions:

- **Confirmed Decision 1 (Real Separate URL Routes)**: Physical multi-page HTML architecture with distinct directory routes:
  - `/` (Home)
  - `/services/` (Services Overview & Detailed Blocks)
  - `/evacuation-planning/` (Escape Route Planning & Sample Evacuation Diagrams)
  - `/safety-equipment/` (Safety Equipment Catalogue & Inquiries)
  - `/awareness-events/` (Posters & Training Programs)
  - `/about/` (Company Story, Mission, Values & Director's Message)
  - `/contact/` (Inquiry Form, Ranchi Location Map, Direct Actions)
  - `/privacy/` (Privacy Policy Draft)
  - `/terms/` (Terms of Service Draft)
  Each route is a real static file with unique HTML `<title>`, `<meta name="description">`, `<link rel="canonical">`, OpenGraph tags, and dedicated entries in `sitemap.xml` for free static hosting (Netlify, Vercel, Cloudflare Pages).
- **Confirmed Decision 2 (Authentic Logo Asset)**: No redrawing or recreating the logo. Uses the authentic logo file provided as an optimized transparent WebP/PNG asset in the header, hero, footer, and favicon without distortion or recoloring.
- **Confirmed Decision 3 (Practical, Zero-Compliance Claims)**: Strict elimination of words like *"certified"*, *"compliant"*, *"fire NOC"*, or regulatory claims. All services are described strictly in practical, realistic terms: *"practical risk walkthroughs"*, *"tailored evacuation planning"*, *"ongoing equipment management"*, and *"aligned with good safety practice"*.
- **Confirmed Decision 4 (Form Integrity & Error Handling)**: Real API submission to a centralized config endpoint (`config/siteConfig.ts`). If the request fails or key is unconfigured, displays an honest, helpful error message with direct WhatsApp/phone fallback—never a simulated success state.
- **Confirmed Decision 5 (Single Content Dictionary for i18n)**: All website copy, service descriptions, FAQs, and navigation labels reside in a centralized content module (`src/content/siteContent.ts`), structured cleanly so Hindi (`hi`) translations can be plugged in seamlessly without modifying component markup.
- **Confirmed Decision 6 (Unified Typography & Tabular Figures)**: Uses **Plus Jakarta Sans** consistently across headings, body copy, and numerical data with `tabular-nums`. Monospace fonts are completely avoided.

---

### 1. Overview & Core Concept

- **What It Does**: Presents Safety Management Solutions' complete offering across safety awareness & creative posters, emergency escape route planning, safety equipment supply and upkeep, and practical safety walkthroughs.
- **Target Audience / Persona**: Business owners, factory and site managers, school and college administrators, hospital and facility managers, residential society committees, and government offices across Jharkhand and neighboring regions.
- **Key Value**: Delivers practical premises-tailored safety planning, creative awareness programs, and ongoing equipment maintenance through an approachable, trusted local partner.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Multi-Page Browsing**: Visitors explore distinct pages via the sticky top bar or deep links. Seamless transitions retain scroll positioning and update browser history cleanly.
2. **Dedicated Evacuation Route Showcase (`/evacuation-planning/`)**: Shows realistic floor-plan evacuation map layouts, exit and assembly point indicators, signage audits, and drill guidance steps.
3. **Equipment Inquiry Flow (`/safety-equipment/`)**: Visitors filter equipment categories (Fire Safety, First Aid, PPE, Signage, Emergency Lighting) and click "Enquire" to populate the contact form with the specific category pre-selected.
4. **Awareness Poster Lightbox (`/awareness-events/`)**: Filterable poster gallery (Fire, Electrical, Workplace, Road, Health, Community) with instant image lightbox previews.
5. **Direct Inquiries (`/contact/`)**: Validated contact form that dispatches to the configured endpoint (Web3Forms / Formspree) with clear error handling, plus one-tap WhatsApp and phone call triggers.

#### Visual Identity & Theme
- **Color Palette (Exact Brand Tokens)**:
  - Deep Navy Canvas: `--navy-900: #0F2C47`
  - Primary Brand Blue: `--navy-700: #1A456F`
  - Secondary Brand Blue: `--blue-600: #275079`
  - Borders & Subtle Accents: `--blue-500: #336E95`
  - Dark Surface Highlights: `--sky-400: #62B5DA`
  - Action Button Accent: `--orange-500: #F4974C` (Buttons paired with `--navy-900` text for strict WCAG AA contrast)
  - Action Hover: `--orange-600: #F0853F`
  - Deep Accent: `--orange-700: #E57737`
  - Body Text on Light: `--ink: #0B1B2B`
  - Light Surface: `--mist: #F3F7FA`
  - Pure White: `--white: #FFFFFF`
- **Typography**:
  - Headings & Body: `Plus Jakarta Sans` (`400` for regular, `600` for semibold, `700` for bold).
  - Numbers & Metrics: `Plus Jakarta Sans` with `tabular-nums` (no monospace).
  - High legibility with 1.6 line-height and `text-wrap: balance` on headlines.
- **Motion & Accessibility**:
  - Smooth 60fps transitions, gentle card hover lifts, sticky blurred header.
  - Full respect for `prefers-reduced-motion` media queries.
  - Full keyboard accessibility and visible focus rings.

---

### 3. Key Technical Decisions & Trade-Offs

- **Decision 1: Vite Multi-Page App (MPA) Architecture**
  - *Chosen Approach*: Multi-page Vite structure where every page (`/services/`, `/contact/`, etc.) has its own `index.html` file pre-rendered with distinct SEO metadata, linking to the shared React component shell.
  - *Why*: Delivers authentic URLs on static hosts without routing hacks, ensures 100% crawlability for Google and social crawlers, and guarantees sub-second page loads.
- **Decision 2: Single Content Matrix (`src/content/siteContent.ts`)**
  - *Chosen Approach*: A typed content object containing all headlines, paragraphs, bullets, FAQs, and metadata keys.
  - *Why*: Allows adding full Hindi language support in the future by simply creating a parallel translation file without editing UI component logic.
- **Decision 3: Zero-Fallback Form Validation with Transparent Status**
  - *Chosen Approach*: Form validation checks mandatory fields client-side. The submission invokes the configured endpoint. On failure or unconfigured key, a high-visibility error banner explains the status and offers instant WhatsApp / Call buttons.
  - *Why*: Respects user intent and eliminates confusing "simulated success" banners.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Static Multi-Page Routes                        │
├────────────────────────────────────────────────────────────────────────┤
│  /index.html                    -->  Home (Hero, Why SMS, Process, etc.)│
│  /services/index.html           -->  Services Breakdown & Deliverables  │
│  /evacuation-planning/index.html-->  Floor Plans, Signs, Assembly Map  │
│  /safety-equipment/index.html   -->  Equipment Catalogue & Inquiries   │
│  /awareness-events/index.html   -->  Poster Gallery & Training Details │
│  /about/index.html              -->  Story, Mission, Director's Message │
│  /contact/index.html            -->  Validated Form, Map, Office Info   │
│  /privacy/index.html            -->  Privacy Policy (Legal Draft)       │
│  /terms/index.html              -->  Terms of Service (Legal Draft)     │
├────────────────────────────────────────────────────────────────────────┤
│                       Single Source of Content                         │
│                    `src/content/siteContent.ts`                        │
│           (Navigation, Hero, Services, Equipment, About, SEO)          │
├────────────────────────────────────────────────────────────────────────┤
│                       Shared Global Components                         │
│  ┌───────────────────────┬──────────────────────┬───────────────────┐  │
│  │ Top Navigation Bar    │ Floating WhatsApp    │ Site Footer       │  │
│  │ (Logo, Links, CTA)    │ & Mobile Bottom Bar  │ (Address, Hours)  │  │
│  └───────────────────────┴──────────────────────┴───────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

#### SEO & Structured Data
- Schema.org `LocalBusiness` JSON-LD embedded on every page with Ranchi office coordinates, phone `+91 9334701135`, and email `Info@safetymanagementsolutions.in`.
- Static `sitemap.xml` and `robots.txt` generated in the public root.
- Pre-filled OpenGraph and Twitter cards with distinct titles and descriptions for each route.
