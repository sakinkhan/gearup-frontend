# API Integration Documentation — GearUp

This document describes how the GearUp frontend (Next.js App Router) integrates with the GearUp backend API (Express + Prisma + PostgreSQL), per Assignment 5 requirements.

- **Frontend:** `tanvir-khan-gearup-frontend` (Vercel)
- **Backend:** `tanvir-khan-gearup-backend` (Vercel)
- **Base URL (backend):** `process.env.BACKEND_API_URL` (server-side only, not exposed to the client)
- **Frontend proxy:** all client-side requests go through the same-origin catch-all route `app/api/[...path]/route.ts`, which reads the `accessToken` cookie and forwards it to the backend as `Authorization: Bearer <token>`. This avoids cross-site cookie issues between the two separate Vercel projects.

---

## 1. Authentication

Auth is JWT-based. Tokens are issued on login and stored as httpOnly cookies set by a Next.js Server Action (`authAction.ts`). Route access is additionally enforced by Next.js Middleware, which reads the role out of the token to gate `/dashboard/*` routes by role.

| Method | Endpoint                  | Auth                         | Description                                         |
| ------ | ------------------------- | ---------------------------- | --------------------------------------------------- |
| POST   | `/api/auth/login`         | Public                       | Authenticates a user, returns access/refresh tokens |
| GET    | `/api/auth/me`            | ADMIN, CUSTOMER, PROVIDER    | Returns the currently authenticated user            |
| POST   | `/api/auth/refresh-token` | Public (uses refresh cookie) | Issues a new access token                           |

**Frontend usage pattern:** Server Components call `getCurrentUser()` (which hits `/auth/me` using `next/headers` cookies) once per request tree and pass `user` down as props, rather than each component fetching independently.

---

## 2. Users

| Method | Endpoint              | Auth                      | Description                                                                                                                             |
| ------ | --------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/api/users/register` | Public                    | Creates a new user. Role field is **restricted to CUSTOMER/PROVIDER on the public form** — ADMIN is not selectable for security reasons |
| GET    | `/api/users/me`       | ADMIN, CUSTOMER, PROVIDER | Returns the current user's profile                                                                                                      |
| PUT    | `/api/users/myUser`   | ADMIN, CUSTOMER, PROVIDER | Updates the current user's profile                                                                                                      |

---

## 3. Gears (public catalog)

| Method | Endpoint             | Auth                      | Description                                                                                                     |
| ------ | -------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/gears`         | Public                    | Lists all gear listings (supports query params for filtering/search — see gear.controller for supported params) |
| GET    | `/api/gears/:gearId` | ADMIN, CUSTOMER, PROVIDER | Returns a single gear listing by ID                                                                             |

**Gear status enum:** `AVAILABLE`, `UNAVAILABLE`, `INACTIVE`

---

## 4. Categories

| Method | Endpoint                | Auth   | Description               |
| ------ | ----------------------- | ------ | ------------------------- |
| GET    | `/api/categories`       | Public | Lists all categories      |
| GET    | `/api/categories/:name` | Public | Returns a single category |
| POST   | `/api/categories`       | ADMIN  | Creates a category        |
| PATCH  | `/api/categories/:name` | ADMIN  | Updates a category        |
| DELETE | `/api/categories/:name` | ADMIN  | Deletes a category        |

---

## 5. Rentals

| Method | Endpoint                                 | Auth                   | Description                                             |
| ------ | ---------------------------------------- | ---------------------- | ------------------------------------------------------- |
| POST   | `/api/rentals`                           | Any authenticated role | Creates a new rental order                              |
| GET    | `/api/rentals`                           | Any authenticated role | Lists the current user's rental orders                  |
| GET    | `/api/rentals/gear/:gearId/availability` | Any authenticated role | Returns availability/booked date ranges for a gear item |
| GET    | `/api/rentals/:id`                       | Any authenticated role | Returns a single rental order by ID                     |
| PATCH  | `/api/rentals/:id/return`                | CUSTOMER               | Marks a rental order as returned                        |
| PATCH  | `/api/rentals/:id/cancel`                | Any authenticated role | Cancels a rental order                                  |

**Frontend note:** used by `/dashboard/customer/rentals`. Review dialog is gated to orders with status `RETURNED` or `COMPLETED`.

---

## 6. Reviews

| Method | Endpoint                 | Auth     | Description                             |
| ------ | ------------------------ | -------- | --------------------------------------- |
| POST   | `/api/reviews`           | CUSTOMER | Creates a review for a completed rental |
| GET    | `/api/reviews/myReviews` | CUSTOMER | Lists the current customer's reviews    |

**Status:** `/dashboard/customer/reviews` page is currently stubbed on the frontend — no list-all-reviews-for-gear endpoint exists yet.

---

## 7. Provider

| Method | Endpoint                   | Auth            | Description                                          |
| ------ | -------------------------- | --------------- | ---------------------------------------------------- |
| POST   | `/api/provider/gear`       | PROVIDER        | Creates a new gear listing                           |
| GET    | `/api/provider/my-gears`   | ADMIN, PROVIDER | Lists gear listings owned by the current provider    |
| PATCH  | `/api/provider/gear/:id`   | PROVIDER        | Updates a gear listing owned by the provider         |
| DELETE | `/api/provider/gear/:id`   | PROVIDER        | Deletes a gear listing owned by the provider         |
| GET    | `/api/provider/orders`     | PROVIDER        | Lists incoming rental orders for the provider's gear |
| PATCH  | `/api/provider/orders/:id` | PROVIDER        | Updates the status of an incoming order              |

---

## 8. Payments (Stripe)

| Method | Endpoint                        | Auth                               | Description                                                                                                                                                           |
| ------ | ------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/api/payments/create-checkout` | Any authenticated role             | Creates a Stripe Checkout session for a rental order                                                                                                                  |
| POST   | `/api/payments/webhook`         | Public (Stripe signature verified) | Stripe webhook receiver. Mounted **before** `express.json()` with `express.raw({ type: "application/json" })` so the raw body is available for signature verification |
| POST   | `/api/payments/confirm`         | Any authenticated role             | Confirms/finalizes a payment client-side after Checkout redirect                                                                                                      |
| GET    | `/api/payments`                 | Any authenticated role             | Lists the current user's payment history                                                                                                                              |
| GET    | `/api/payments/:id`             | Any authenticated role             | Returns a single payment by ID                                                                                                                                        |

**Important implementation detail:** `app.use("/api/payments/webhook", express.raw(...))` is registered before the global `express.json()` middleware in `app.ts`, so Stripe's webhook signature check works correctly. Do not proxy this endpoint through the frontend — Stripe calls the backend directly.

---

## 9. Admin

| Method | Endpoint                      | Auth  | Description                                  |
| ------ | ----------------------------- | ----- | -------------------------------------------- |
| GET    | `/api/admin/users`            | ADMIN | Lists all users                              |
| PATCH  | `/api/admin/users/:id`        | ADMIN | Updates a user's status                      |
| GET    | `/api/admin/gears`            | ADMIN | Lists all gear listings across all providers |
| PATCH  | `/api/admin/gears/:id/status` | ADMIN | Updates a gear listing's status              |
| GET    | `/api/admin/rentals`          | ADMIN | Lists all rental orders platform-wide        |
| GET    | `/api/admin/dashboard/stats`  | ADMIN | Returns aggregate dashboard statistics       |

---

## 10. Response Envelope

All endpoints return a consistent JSON envelope:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Users retrieved successfully",
  "data": {}
}
```

Error responses (via `globalErrorHandler`) follow the same shape with `success: false`:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation error",
  "data": null
}
```

The 404 fallback handler in `app.ts` returns:

```json
{
  "success": false,
  "message": "API Not Found"
}
```

**Frontend unwrapping pattern:** TanStack Query hooks use `select: (res) => res.data` to unwrap the envelope. Mutations check `body.success` in addition to `res.ok`, since the backend can return a 2xx with `success: false` in some edge cases.

**Known inconsistency:** nested data keys are not always uniform across endpoints (e.g. `data.profile` vs `data.updatedProfile`). Where this happens, the frontend uses a defensive fallback chain: `payload?.profile ?? payload?.updatedProfile ?? payload`.

---

## 11. Data Type Conventions

| Field type                           | Convention                                                                                                             |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| IDs                                  | UUID strings                                                                                                           |
| `rentalPricePerDay`, `depositAmount` | Returned as **numeric strings** — always coerce with `Number()`/`parseFloat()` before doing arithmetic on the frontend |
| `role`                               | Uppercase enum: `ADMIN`, `CUSTOMER`, `PROVIDER`                                                                        |
| Gear `status`                        | Enum: `AVAILABLE`, `UNAVAILABLE`, `INACTIVE`                                                                           |
| User fields                          | `name`, `image`, `role`, `status`                                                                                      |

---

## 12. CORS & Cookies

`app.ts` configures CORS with `credentials: true` and an explicit allow-list built from `FRONTEND_URL`, `FRONTEND_PROD_URL`, and `http://localhost:3000`. Because the frontend and backend are deployed as **separate Vercel projects** (different origins), browsers will not attach the backend's auth cookie to direct client-side `fetch` calls in production.

**Fix:** all client-side API fetchers (`lib/api/*.ts`) call the frontend's own same-origin proxy (`API_BASE = "/api"`) instead of the backend directly. The proxy route (`app/api/[...path]/route.ts`) reads the `accessToken` cookie server-side (same origin as the cookie) and forwards the request to `BACKEND_API_URL` with an `Authorization: Bearer` header.

Required environment variable on the **frontend** Vercel project:

```
BACKEND_API_URL=https://<backend-project>.vercel.app/api
```

This must **not** be prefixed with `NEXT_PUBLIC_`, since it's only read server-side inside the proxy route.

---

## 13. Frontend Integration Layers

Request flow, strictly layered:

```
types/  →  lib/api/*.ts (fetchers)  →  TanStack Query hooks  →  components/pages
```

- Fetch logic always lives in `lib/api/`, never inline in hooks or components.
- Every TanStack Query hook uses a unique query key to avoid cache collisions across unrelated data.
- Errors surface to the user via Sonner toasts; auth failures in public layouts degrade gracefully (return `null` / `{ success: false }`) rather than throwing.

---

## 14. Middleware-Enforced Route Protection

Next.js Middleware inspects the JWT on each request to `/dashboard/*` and redirects unauthenticated or wrong-role users before the page renders, in addition to the backend's own `auth(...)` role checks on every protected route above.

---

## 15. Open Items

- Apply the `API_BASE = "/api"` proxy fix to `rentals.ts`, `payments.ts`, and `reviews.ts` fetchers (currently only `admin.ts` has been migrated).
- Backend endpoint for listing all reviews (for the reviews dashboard page) is not yet implemented.
- Password-change, payments-history, and support-contact-form frontend calls are implemented against assumed endpoint shapes and should be verified against the actual backend controllers.
