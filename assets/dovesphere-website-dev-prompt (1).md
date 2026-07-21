# Developer Prompt: Build the DoveSphere Technology Limited Website

Copy everything below this line into your coding agent (Claude Code, Cursor, etc.).

---

## 1. Project Summary

Build a modern, professional marketing website for **DoveSphere Technology Limited**, a Lagos, Nigeria–based IT solutions provider specializing in cloud infrastructure, digital transformation consultancy, data insights, and technical training. The site should reflect a minimalist, tech-forward brand identity, present the company's services and value proposition, and include a **dynamic form-builder system** so non-technical staff can create custom forms (contact forms, consultation requests, training sign-ups, surveys, etc.) whose submissions are stored in a **SQLite database**.

**Tech stack (required):**
- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Database:** SQLite, accessed via **Prisma ORM** (preferred) or `better-sqlite3` if Prisma is not desired — pick one and be consistent
- **Forms/validation:** React Hook Form + Zod
- **Deployment target:** Vercel-compatible where possible, but SQLite requires either a persistent volume (e.g., Fly.io, Railway, a VPS) or `@vercel/postgres`-style workaround — **default to SQLite on a persistent filesystem** and note the deployment constraint in the README rather than silently switching databases
- **Icons:** lucide-react
- **Package manager:** npm

---

## 2. Brand Guidelines (from official Brand Book — follow exactly)

**Brand line/tagline:** "Bridging the gap between complex technology and business success."

**Brand values:** Reliability, Innovation, Empowerment, Simplicity, Client-centricity

**Aesthetic direction:** Minimalist Geometricism · Linear Connectivity · Structural Simplicity · Abstract Tech-Modernism · Balanced Negative Space

**Tone of voice:** Professional, Authoritative, Reliable, Empowering — write all copy in this register. Avoid slang, exclamation points, or overly casual phrasing.

### Color Palette (use as CSS variables / Tailwind theme extension)

| Name | Hex | Usage |
|---|---|---|
| Obsidian Black | `#0F172A` | Primary text, dark backgrounds/header/footer |
| Gunmetal Gray | `#334155` | Secondary text, borders, muted UI elements |
| Chalk White | `#F1F5F9` | Light backgrounds, section alternation |
| Azure Blue | `#0EA5E9` | Primary accent/CTA color, links, highlights |

Also define standard white (`#FFFFFF`) for card backgrounds on dark sections if needed. Maintain strong contrast (WCAG AA minimum) between text and background at all times.

### Typography

- **Primary typeface:** Space Grotesk (headings, display text, logo lockup text)
- **Secondary typeface:** Inter (body copy, UI labels, forms)
- Load both via `next/font/google` for performance; do not use external `<link>` tags.

### Logo

- A logo file (`dovesphere_logo_only.png`) is provided — a geometric line-art dove inside a circle, white on a dark navy background (matches Obsidian Black).
- **Clear space:** maintain 35px of clear space on all sides of the logo at standard size.
- **Minimum size:** never render the logo smaller than 0.96in / 92px width.
- Use the logo on dark (Obsidian Black) navbar and footer backgrounds. If a light-background version is needed and not supplied, generate a version with the linework recolored to Obsidian Black/Azure Blue rather than distorting the existing asset — flag this for design review.

### Imagery style

Favor abstract, geometric, tech-modern visuals (line art, network/connectivity motifs, subtle gradients using Azure Blue) over generic stock photography. Avoid cluttered or literal "people typing at laptops" stock imagery.

---

## 3. Company Content (from official Company Profile — use verbatim/paraphrased as needed, do not invent facts)

**Company name:** DoveSphere Technology Limited
**Location:** Lagos, Nigeria (Headquarters)
**Phone:** +234 812 998 9372 | +234 806 996 7532
**Email:** info@dovesphere.com
**Website:** www.dovesphere.com

**Who we are:** DoveSphere Technology Limited is a premier Information Technology solutions provider. We specialize in delivering end-to-end IT products, expert consultancy, and comprehensive training services designed to empower organizations and individuals alike. The name reflects the brand philosophy: "Dove" symbolizes reliable, peaceful, efficient solutions; "Sphere" represents a holistic, 360-degree approach to solving global technical challenges.

**Vision:** To be a leading force in the global technology landscape, recognized for delivering innovative IT solutions and world-class training that simplifies complexity and drives sustainable growth.

**Mission:**
- **To Innovate** — providing cutting-edge software and hardware solutions that solve real-world problems.
- **To Empower** — equipping individuals and businesses with digital skills and knowledge to thrive in the modern economy.
- **To Simplify** — offering consultancy that turns technical challenges into streamlined, efficient operational advantages.

**Core Services (three pillars):**

1. **IT Products & Solutions**
   - Cloud Infrastructure: secure, scalable cloud architectures for modern businesses
   - Hardware & Software: procurement, supply, and installation of high-performance servers, networking systems, and licensed software
   - Global Connectivity: design and deployment of secure, seamless LAN/WAN networks

2. **IT Consultancy & Data Insights**
   - Digital Transformation: helping traditional businesses migrate to digital-first operations
   - Data Analytics & Insights: actionable business intelligence to drive decision-making
   - IT Audit & Assurance: evaluating current systems for compliance, security, and efficiency

3. **Training & Capacity Building**
   - Corporate Training: tailored workshops on cybersecurity awareness, software tools, digital workflows
   - Professional Certification: preparation and capacity building for industry-standard tech certifications

**Why Choose DoveSphere:**
- Custom Solutions — tailored to specific business needs, not one-size-fits-all
- Proven Uptime — 99.9% uptime for critical infrastructure
- Future-Ready — staying ahead of technology trends
- Registered & Compliant — registered with the Corporate Affairs Commission (CAC), Nigeria

**Team:** Driven by a diverse team of innovators, technical experts, and industry veterans who believe the human element is the most critical part of technology.

---

## 4. Site Structure / Pages

1. **Home (`/`)**
   - Hero section: tagline, short value proposition, primary CTA ("Book a Consultation" or "Get Started") linking to a contact/consultation form
   - Services overview (3 pillars as cards, linking to `/services`)
   - "Why Choose DoveSphere" section (4 differentiators)
   - Stats/trust strip (e.g., 99.9% uptime, CAC-registered)
   - CTA banner before footer

2. **About (`/about`)**
   - Who We Are, Vision, Mission
   - Brand story (Dove + Sphere meaning)
   - Team section (generic team description; do not fabricate named staff bios unless placeholder content is explicitly marked as placeholder)

3. **Services (`/services`)**
   - Detailed breakdown of the three service pillars, each with its own sub-points as outlined above
   - Optional individual service detail sections/anchors

4. **Training (`/training`)** *(optional but recommended given the training focus)*
   - Corporate Training and Professional Certification details
   - CTA to a "Training Inquiry" dynamic form

5. **Contact (`/contact`)**
   - Company contact details (phone, email, Lagos HQ)
   - A dynamic form (see Section 5) — default to a "Contact Us" form template
   - Map placeholder (Lagos) — do not hardcode a fake embedded map API key; leave clearly marked placeholder

6. **Admin (`/admin`, auth-gated)**
   - Login (simple credential-based auth is acceptable for v1 — see Section 6)
   - Form Builder: create/edit/delete custom forms
   - Submissions dashboard: view/filter/export (CSV) submissions per form

7. **Dynamic public form pages (`/forms/[slug]`)**
   - Publicly renders any form created in the admin form builder, styled per brand guidelines

8. **Global:** Navbar (logo + nav links + CTA button), Footer (logo, contact info, quick links, socials placeholder, copyright)

---

## 5. Form Builder & Submission System (Core Feature)

This is the primary functional requirement beyond the marketing pages.

### 5.1 Requirements

- An authenticated admin can **create a new form** by giving it a name, slug, description, and a list of fields.
- Supported field types (minimum): `text`, `email`, `phone`, `textarea`, `select` (with options), `checkbox`, `radio` (with options), `date`.
- Each field has: label, field key/name, type, `required` boolean, placeholder (optional), and options (for select/radio).
- Admin can reorder fields, edit an existing form, and delete a form (soft delete recommended, or cascade-delete its submissions with a confirmation prompt).
- Each created form is automatically available at a public URL: `/forms/[slug]`.
- Public visitors fill out the form; on submit, the response is **validated client-side and server-side**, then persisted to SQLite as a row linked to that form definition.
- Admin can view a table of submissions per form, see each submission's field values, submission timestamp, and export the list as CSV.
- Basic spam protection: honeypot field + simple rate limiting per IP on the submission API route.

### 5.2 Suggested Database Schema (Prisma schema.prisma style — adapt as needed)

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model Form {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  fields      FormField[]
  submissions Submission[]
}

model FormField {
  id        String   @id @default(cuid())
  formId    String
  form      Form     @relation(fields: [formId], references: [id], onDelete: Cascade)
  label     String
  fieldKey  String
  type      String   // text | email | phone | textarea | select | checkbox | radio | date
  required  Boolean  @default(false)
  order     Int      @default(0)
  options   String?  // JSON-stringified array for select/radio
  placeholder String?
}

model Submission {
  id        String   @id @default(cuid())
  formId    String
  form      Form     @relation(fields: [formId], references: [id], onDelete: Cascade)
  data      String   // JSON-stringified object of fieldKey -> value
  createdAt DateTime @default(now())
  ipAddress String?
}

model AdminUser {
  id           String @id @default(cuid())
  email        String @unique
  passwordHash String
  createdAt    DateTime @default(now())
}
```

### 5.3 Suggested API Routes (Next.js App Router `route.ts` files)

- `POST /api/forms` — create form (admin only)
- `GET /api/forms` — list forms (admin only)
- `GET /api/forms/[slug]` — get public form definition (for rendering `/forms/[slug]`)
- `PATCH /api/forms/[id]` — update form (admin only)
- `DELETE /api/forms/[id]` — delete form (admin only)
- `POST /api/forms/[slug]/submit` — public submission endpoint (validate against field definitions, persist to `Submission`)
- `GET /api/forms/[id]/submissions` — list submissions for a form (admin only)
- `GET /api/forms/[id]/submissions/export` — CSV export (admin only)

---

## 6. Authentication (Admin Area)

Keep this simple but not insecure:
- Seed one admin user via a seed script (email + bcrypt-hashed password from environment variables, not hardcoded).
- Use a lightweight session approach — e.g., `next-auth` with Credentials provider, or a signed HTTP-only cookie with `jose`/`iron-session`. Pick one, document the choice, and implement it consistently.
- Protect all `/admin/*` pages and admin API routes with middleware that checks the session.

---

## 7. Non-Functional Requirements

- **Responsive:** mobile-first, fully usable at 360px width up through desktop.
- **Accessibility:** semantic HTML, proper form labels/`aria-*`, keyboard navigability, sufficient color contrast per the palette above.
- **Performance:** use `next/image` for the logo and any imagery, lazy-load below-the-fold sections, avoid layout shift.
- **SEO:** proper `<title>`/meta description per page, Open Graph tags, sitemap.xml, robots.txt.
- **Code quality:** TypeScript throughout, ESLint + Prettier configured, componentized (e.g., `components/ui`, `components/sections`, `components/forms`).
- **Environment config:** `.env.example` with `DATABASE_URL`, admin seed credentials, session secret — no secrets committed.
- **Seed data:** a `prisma/seed.ts` that creates the admin user and one default "Contact Us" form (Name, Email, Phone, Message fields) so the site is immediately functional after setup.

---

## 8. Version Control (Git)

- Initialize a Git repository at the project root (`git init`) as the first step, before scaffolding the app, so all subsequent work is committed incrementally rather than as one giant dump.
- Add a proper `.gitignore` for a Next.js + Prisma project, at minimum excluding:
  ```
  node_modules/
  .next/
  .env
  .env.local
  *.db
  *.db-journal
  prisma/dev.db
  npm-debug.log*
  .DS_Store
  ```
  - **Do not commit the SQLite database file itself** (`dev.db`) or any `.env*` file containing secrets. Provide `.env.example` instead (see Section 7).
- Commit in small, logical increments with clear, conventional messages, e.g.:
  - `chore: initialize Next.js project with TypeScript and Tailwind`
  - `feat: add brand theme (colors, fonts) to Tailwind config`
  - `feat: build Home, About, Services, Contact pages`
  - `feat: add Prisma schema and SQLite setup for forms/submissions`
  - `feat: implement form builder admin UI`
  - `feat: implement public dynamic form rendering and submission API`
  - `feat: add admin authentication and submissions dashboard with CSV export`
  - `docs: add README with setup and deployment notes`
- Use a `main` branch for stable work; if the agent supports it, create short-lived feature branches per major feature (e.g., `feature/form-builder`) and merge back to `main`, but a single well-organized `main` branch with clean commits is acceptable for v1.
- Tag the first fully working end-to-end build as `v0.1.0` once Section 8 (Deliverables) is verified.
- Do not force-push, rewrite history, or commit directly generated build artifacts (`.next/`, `node_modules/`).

---

## 9. Deliverables

1. Full Next.js project source code, organized and documented, tracked in Git per Section 8.
2. `README.md` with setup instructions: `git clone`, install, environment variables, `prisma migrate`, `prisma db seed`, `npm run dev`, and notes on SQLite persistence for the chosen deployment target.
3. The form builder and public form rendering fully working end-to-end against the SQLite database (verify by creating a form in `/admin`, submitting it via `/forms/[slug]`, and viewing the submission in the admin dashboard).
4. Brand colors/typography implemented as a themeable Tailwind config (`tailwind.config.ts`) rather than hardcoded hex values scattered through components.
5. A clean Git history with incremental, conventionally-named commits and a `v0.1.0` tag on the first working build.

---

## 10. Open Questions to Flag Back to the Requester (do not guess silently)

- Confirm final company name — brand assets say **"DoveSphere Technology Limited"**; the original request said "Dovenet Technology Limited." Confirm which is correct before finalizing copy/branding.
- Confirm deployment target (affects how SQLite persistence is handled).
- Confirm whether a light-mode logo variant exists or needs to be created separately by a designer.
- Confirm whether real team member bios/photos exist, or whether the About page's team section should remain generic.

