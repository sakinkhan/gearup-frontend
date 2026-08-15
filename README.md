# GearUp 🏋️

**Rent Sports & Outdoor Gear Instantly**

GearUp is a full-stack rental marketplace where customers can browse and rent sports/outdoor equipment, providers manage their gear inventory and fulfill orders, and admins moderate the platform. Built as Assignment 5 for Programming Hero Level 2.

---

## Live Links

|                 |                  |
| --------------- | ---------------- |
| **Frontend**    | _add Vercel URL_ |
| **Backend API** | _add Vercel URL_ |
| **Demo Video**  | _add link_       |

---

## Tech Stack

**Frontend**

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Query for server state
- React Hook Form + Zod for validation
- Framer Motion for animation
- Sonner for toast notifications
- Stripe Checkout for payments
- JWT auth enforced via Next.js Middleware

**Backend**

- Express + Prisma + PostgreSQL
- Deployed separately on Vercel

---

## Roles

| Role         | Can do                                                                                |
| ------------ | ------------------------------------------------------------------------------------- |
| **Customer** | Browse gear, rent with date selection, pay via Stripe, track orders, leave reviews    |
| **Provider** | List/manage gear, view and fulfill incoming rental orders                             |
| **Admin**    | Manage users (suspend/activate), moderate gear and rental orders, view platform stats |

The UI adapts per role, and protected routes are enforced with Next.js Middleware based on the JWT.

---

## Key Features

- Responsive gear browsing with search/filter and availability-aware date picking
- Full rental order lifecycle: place → confirm → pay → pick up → return → review
- Stripe Checkout integration with dedicated success/cancel pages
- Role-based dashboards (customer / provider / admin)
- Toasts, inline form validation, loading skeletons, and error boundaries throughout
- Same-origin API proxy (`/api/[...path]`) to safely forward auth cookies to a separately-deployed backend

See [`API_INTEGRATION.md`](./API_INTEGRATION.md) for the full endpoint reference.

---

## Getting Started

```bash
git clone <this-repo>
cd gearup-frontend
npm install
```

Create a `.env.local` file:

```env
BACKEND_API_URL=https://your-backend.vercel.app/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

Run the dev server:

```bash
npm run dev
```

App runs at `http://localhost:3000`.

---

## Admin Credentials (for grading)

```
Email:    admin@example.com
Password: ********
```

_(fill in real credentials before submission)_

---

## Project Structure

```
app/
  (public)/         # home, gear browsing, gear details
  auth/              # login, register
  dashboard/
    customer/        # rentals, payments, reviews
    provider/        # gear management, orders
    admin/           # users, gear moderation, stats
  api/[...path]/     # same-origin proxy to backend
components/
lib/
  api/               # fetchers, one file per resource
  hooks/             # TanStack Query hooks
```
