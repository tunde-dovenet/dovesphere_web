# DoveSphere Technology Limited Website

A modern, professional marketing website and dynamic form-builder system for **DoveSphere Technology Limited**, a Lagos-based IT solutions provider.

**Live URL:** [www.dovesphere.com](https://www.dovesphere.com)

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Database:** SQLite via Prisma ORM v6
- **Authentication:** NextAuth v5 beta (Credentials provider)
- **Forms:** React Hook Form + Zod
- **Icons:** lucide-react
- **Package Manager:** npm

---

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd dovesphere-site
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` — SQLite file path (default: `file:./dev.db`)
- `NEXTAUTH_SECRET` — strong random string for session signing
- `NEXTAUTH_URL` — your app URL (e.g., `http://localhost:3000`)
- `ADMIN_EMAIL` — admin login email
- `ADMIN_PASSWORD` — admin login password (bcrypt-hashed on seed)

### 3. Database setup

```bash
npx prisma migrate dev
npx prisma db seed
```

This creates the SQLite database and seeds:
- One admin user (from `.env` credentials)
- A default "Contact Us" form (slug: `contact`)

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Project Structure

```
src/
  app/
    (site)/           — Marketing pages (Home, About, Services, Training, Contact)
    admin/            — Admin login, form builder, submissions dashboard
    api/
      auth/           — NextAuth API route
      forms/          — Form & submission REST API
    sitemap.ts        — SEO sitemap
    robots.ts         — SEO robots.txt
  components/
    sections/         — Navbar, Footer
    forms/            — DynamicForm, FormBuilder
  lib/
    auth.ts           — NextAuth configuration
    prisma.ts         — Prisma client singleton
    constants.ts      — Company info & nav links
    zod-schemas.ts    — Shared Zod validation schemas
  types/              — TypeScript type definitions
prisma/
  schema.prisma       — Database schema
  seed.ts             — Seed script (admin + default form)
public/
  logo.png            — DoveSphere logo
```

---

## Features

### Marketing Pages
- **Home** — Hero, services overview, differentiators, stats strip, CTA
- **About** — Company story, vision, mission, team
- **Services** — Detailed breakdown of 3 service pillars
- **Training** — Corporate training & certification details
- **Contact** — Contact info, link to dynamic contact form

### Form Builder & Submissions (Admin)
- Create, edit, delete, and reorder custom forms
- Field types: text, email, phone, textarea, select, checkbox, radio, date
- View submissions per form in a table
- Export submissions as CSV
- Simple credential-based admin authentication

### Public Dynamic Forms
- Any form created in admin is automatically available at `/forms/[slug]`
- Client-side and server-side validation (Zod)
- Spam protection: honeypot field + IP-based rate limiting (5 submissions / 60s)

---

## API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/forms` | Admin | Create form |
| GET | `/api/forms` | Admin | List all forms |
| GET | `/api/forms/[slug]` | Public | Get form definition |
| POST | `/api/forms/[slug]/submit` | Public | Submit form |
| GET | `/api/forms/manage/[id]` | Admin | Get form by ID |
| PATCH | `/api/forms/manage/[id]` | Admin | Update form |
| DELETE | `/api/forms/manage/[id]` | Admin | Delete form |
| GET | `/api/forms/manage/[id]/submissions` | Admin | List submissions |
| GET | `/api/forms/manage/[id]/submissions/export` | Admin | Export CSV |

---

## Deployment Notes

### SQLite Persistence
SQLite requires a persistent filesystem. For serverless platforms (Vercel), consider:
- **Fly.io / Railway / Render** — provide persistent volumes
- **VPS / dedicated server** — full filesystem access
- **@vercel/postgres** — if migrating to Postgres later

Do not commit the SQLite database file (`*.db`) or `.env` files to version control.

### Build
```bash
npm run build
```

---

## Brand Guidelines

- **Colors:** Obsidian Black `#0F172A`, Gunmetal Gray `#334155`, Chalk White `#F1F5F9`, Azure Blue `#0EA5E9`
- **Fonts:** Space Grotesk (headings), Inter (body)
- **Tone:** Professional, authoritative, reliable, empowering

---

## License

© DoveSphere Technology Limited. All rights reserved.
