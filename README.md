# Safety Management Solutions (SMS) – Official Website

A multi-page website built for **Safety Management Solutions (SMS)**, an Indian workplace and community safety firm based in Ranchi, Jharkhand.

---

## 1. Quick Start & Local Development

### Prerequisites
- Node.js 22.12 or newer
- npm

### Installation & Run
```bash
# Install the exact locked dependencies
npm ci

# Start a loopback-only local development server (port 3000)
npm run dev

# Only when remote preview access is required, opt in to network binding
VITE_HOST=0.0.0.0 npm run dev

# Build production bundle for static hosting
npm run build

# Preview production build locally
npm run preview
```

---

## 2. Deployment Guide (Free Static Hosting)

The project is structured as a pure static multi-page React application with separate HTML entry files for every route:
- `/` (Home)
- `/services/` (Services Overview)
- `/evacuation-planning/` (Escape Route Planning)
- `/safety-equipment/` (Equipment Catalogue)
- `/awareness-events/` (Posters & Workshops)
- `/about/` (Story, Values & Director's Message)
- `/contact/` (Inquiry Form & Location Directions)
- `/privacy/` (Privacy Policy Draft)
- `/terms/` (Terms of Service Draft)

### Deploying to Netlify, Vercel, or Cloudflare Pages
- **Build command**: `npm run build`
- **Publish directory / output folder**: `dist`
- Netlify and Cloudflare Pages use `public/_headers`; Vercel uses the root `vercel.json` response-header rules.
- GitHub Pages does not apply custom response headers. If security headers are required, use a supported static host or place a CDN/proxy in front of it.
- Static deployment needs no application server, but the contact form still requires a configured Web3Forms access key.

The contact-form key is included in browser code when configured, so treat it as a public form identifier, not a server secret. The wired honeypot is a basic spam deterrent, not a substitute for server-side validation, provider-side restrictions, or rate limiting. Use a serverless proxy if stronger abuse controls are needed.

---

## 3. Where to Edit Content, Colours, Images & Keys

| Element to Edit | Exact File Location | Details |
| :--- | :--- | :--- |
| **All Page Text & Copy** | `src/content/siteContent.ts` | Primary content file for page copy, services, posters, FAQs and contact details. |
| **Contact Details & Address** | `src/content/siteContent.ts` | Phone, WhatsApp, email, director name, and Walking Street address. |
| **Brand Colours & Tokens** | `src/index.css` | All CSS custom properties (`--navy-900`, `--sky-400`, `--orange-500`, etc.). |
| **Form Endpoint & Access Key** | `src/config/siteConfig.ts`, `.env` | Configure `VITE_WEB3FORMS_ACCESS_KEY` for the supported Web3Forms endpoint. |
| **Logo Files** | `public/logo.png` and `public/logo-white-badge.svg` | These are the canonical light-background and dark-background marks used by the logo component. |
| **Favicon** | `public/favicon.svg` | Browser tab icon. |
| **Sitemap & Search Indexing**| `public/sitemap.xml` & `public/robots.txt` | Pre-configured with all 9 canonical URLs. |

---

## 4. Checklist of Placeholders to Replace

Review and customize the following items for your official launch:

- [ ] **1. Logo Files (`public/logo.png`, `public/logo-white-badge.svg`)**: Replace both canonical marks with approved light- and dark-background variants if the brand artwork changes.
- [ ] **2. Contact Form Access Key (`VITE_WEB3FORMS_ACCESS_KEY`)**: Configure the value using the hosting provider's environment settings or a local `.env` file before building. The value is public in the browser bundle; use provider-side restrictions and verify a real submission before launch. Until configured, visitors see the direct WhatsApp/call fallback.
- [ ] **3. Director Photograph (`src/pages/AboutPage.tsx`)**: Replace `[Photo Placeholder: Director Sabir Hussain]` with a high-resolution professional portrait of Director Sabir Hussain.
- [ ] **4. Real Awareness Posters (`src/content/siteContent.ts`)**: Replace poster mockup descriptions and thumbnail cards with your finalized printed poster campaign graphics.
- [ ] **5. Client Case Studies**: Add verified, attributed reviews from local schools, factories, and societies once engagements are complete. Do not publish unverified testimonials.
- [ ] **6. Legal Review of Drafts (`src/pages/PrivacyPolicyPage.tsx` & `src/pages/TermsPage.tsx`)**: Review the standard draft privacy policy and terms with your legal advisor to ensure alignment with Jharkhand / Indian state regulations.

---

## 5. Five Highest-Impact Steps to Take After Launch

1. **Claim & Verify Google Business Profile**:
   Register **Safety Management Solutions** at *"Main Road, opposite Capitol Hill, Walking Street, 4th Floor, Ranchi, Jharkhand 834001"*. Add the phone number `+91 9334701135`, website `safetymanagementsolutions.in`, and photos of your office entrance and equipment displays. This immediately captures local searches for *"fire safety equipment Ranchi"* and *"workplace safety consulting Jharkhand"*.

2. **Publish Real On-Site Walkthrough & Drill Photos**:
   Take authentic photos during your first evacuation drills, school sessions, and extinguisher demonstrations in Ranchi. Replace the current illustrative photography with authentic local images as they become available. Authentic photos of local people and premises build instant credibility.

3. **Distribute Printed Samples to Nearby Business & School Administrators**:
   Print physical A3/A2 samples of your bilingual PASS method and emergency exit posters with your logo and phone number. Hand them to administrative heads at nearby Ranchi schools, coaching institutes, colleges, and commercial offices along Main Road.

4. **Connect WhatsApp Business with Catalog Messaging**:
   Configure the phone `+91 9334701135` as a verified WhatsApp Business account. Set up greeting messages, quick replies, and attach PDF brochures of your evacuation planning deliverables so incoming website visitors receive immediate automated responses.

5. **Gather First 3 Verified Client Case Studies**:
   After conducting your first workplace walkthrough or evacuation map installation, document a brief 3-sentence summary (e.g. *"Assisted an industrial facility in Tatisilwai/Kokar with clear evacuation routing and mounted ABC extinguishers"*). Add real, attributed client feedback to the site once permission is granted.

---

## 6. Project Documentation for Contributors

- [`AGENTS.md`](./AGENTS.md) — working rules, conventions and definition of done.
- [`project-state.md`](./project-state.md) — architecture map, verified audit findings and fix order.
