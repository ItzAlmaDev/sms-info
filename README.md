# Safety Management Solutions (SMS) – Official Website

A production-ready, multi-page website built for **Safety Management Solutions (SMS)**, an Indian workplace and community safety firm based in Ranchi, Jharkhand.

---

## 1. Quick Start & Local Development

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation & Run
```bash
# Install dependencies
npm install

# Start local development server (runs on port 3000)
npm run dev

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
- `/contact/` (Inquiry Form & Office Map)
- `/privacy/` (Privacy Policy Draft)
- `/terms/` (Terms of Service Draft)

### Deploying to Netlify, Vercel, or Cloudflare Pages
- **Build command**: `npm run build`
- **Publish directory / output folder**: `dist`
- **Zero server requirements**: Works 100% on free tiers with sub-second page loads, pre-rendered SEO titles, OpenGraph tags, and sitemap.xml.

---

## 3. Where to Edit Content, Colours, Images & Keys

| Element to Edit | Exact File Location | Details |
| :--- | :--- | :--- |
| **All Page Text & Copy** | `src/content/siteContent.ts` | Single master content file for easy editing and future Hindi translation (`hi: { ... }`). |
| **Contact Details & Address** | `src/content/siteContent.ts` & `src/config/siteConfig.ts` | Phone, WhatsApp, email, director name, and Walking Street address. |
| **Brand Colours & Tokens** | `src/index.css` | All CSS custom properties (`--navy-900`, `--sky-400`, `--orange-500`, etc.). |
| **Form Endpoint & API Key** | `src/config/siteConfig.ts` | Replace `web3FormsAccessKey` with your key from [Web3Forms](https://web3forms.com) or Formspree URL. |
| **Logo File** | `public/logo.png` or `public/logo.webp` | Drop your transparent logo file directly into `public/logo.png`. Proportions are preserved automatically. |
| **Favicon** | `public/favicon.svg` | Browser tab icon. |
| **Sitemap & Search Indexing**| `public/sitemap.xml` & `public/robots.txt` | Pre-configured with all 9 canonical URLs. |
| **Analytics (Optional)** | `src/config/siteConfig.ts` | Add Google Analytics 4 Measurement ID (`googleAnalyticsId`). |

---

## 4. Checklist of Placeholders to Replace

Review and customize the following items for your official launch:

- [ ] **1. Logo File (`public/logo.png`)**: Place your finalized transparent-background logo file (`logo.png` or `logo.webp`) in `/public/` to replace the default vector fallback.
- [ ] **2. Contact Form Access Key (`src/config/siteConfig.ts`)**: Replace `'YOUR_WEB3FORMS_ACCESS_KEY_HERE'` with your free key from [web3forms.com](https://web3forms.com) or configure your Formspree endpoint. *(Until replaced, the form safely routes visitors to WhatsApp +91 9334701135 without pretending a fake success).*
- [ ] **3. Director Photograph (`src/pages/AboutPage.tsx`)**: Replace `[Photo Placeholder: Director Sabir Hussain]` with a high-resolution professional portrait of Director Sabir Hussain.
- [ ] **4. Real Awareness Posters (`src/content/siteContent.ts`)**: Replace poster mockup descriptions and thumbnail cards with your finalized printed poster campaign graphics.
- [ ] **5. Client Testimonials (`src/content/siteContent.ts`)**: Replace the marked `[Placeholder note]` in the testimonials section with verified reviews from local schools, factories, and societies after your initial engagements.
- [ ] **6. Legal Review of Drafts (`src/pages/PrivacyPolicyPage.tsx` & `src/pages/TermsPage.tsx`)**: Review the standard draft privacy policy and terms with your legal advisor to ensure alignment with Jharkhand / Indian state regulations.
- [ ] **7. Google Analytics 4 ID (`src/config/siteConfig.ts`)**: (Optional) Add your GA4 measurement ID (`G-XXXXXXXXXX`) if web traffic analytics are desired.

---

## 5. Five Highest-Impact Steps to Take After Launch

1. **Claim & Verify Google Business Profile**:
   Register **Safety Management Solutions** at *"Main Road, opposite Capitol Hill, Walking Street, 4th Floor, Ranchi, Jharkhand 834001"*. Add the phone number `+91 9334701135`, website `safetymanagementsolutions.in`, and photos of your office entrance and equipment displays. This immediately captures local searches for *"fire safety equipment Ranchi"* and *"workplace safety consulting Jharkhand"*.

2. **Publish Real On-Site Walkthrough & Drill Photos**:
   Take authentic photos during your first evacuation drills, school sessions, and extinguisher demonstrations in Ranchi. Replace the placeholder frames on the website. Authentic photos of local people and premises build instant credibility.

3. **Distribute Printed Samples to Nearby Business & School Administrators**:
   Print physical A3/A2 samples of your bilingual PASS method and emergency exit posters with your logo and phone number. Hand them to administrative heads at nearby Ranchi schools, coaching institutes, colleges, and commercial offices along Main Road.

4. **Connect WhatsApp Business with Catalog Messaging**:
   Configure the phone `+91 9334701135` as a verified WhatsApp Business account. Set up greeting messages, quick replies, and attach PDF brochures of your evacuation planning deliverables so incoming website visitors receive immediate automated responses.

5. **Gather First 3 Verified Client Case Studies**:
   After conducting your first workplace walkthrough or evacuation map installation, document a brief 3-sentence summary (e.g. *"Assisted an industrial facility in Tatisilwai/Kokar with clear evacuation routing and mounted ABC extinguishers"*). Replace the testimonial placeholder with real, attributed client feedback.
