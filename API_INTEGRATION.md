# GearUp API Integration

## Overview

GearUp is a sports and outdoor gear rental platform built with Next.js and TypeScript on the frontend and Node.js, Express, Prisma, and PostgreSQL on the backend.

The frontend consumes the GearUp REST API through the `/api` path.

The application supports three roles:

- `CUSTOMER`
- `PROVIDER`
- `ADMIN`

Authentication is handled using JWT-based authentication with HTTP cookies. Protected API requests send credentials using `credentials: "include"`.

---

## API Base URL

The frontend uses:

```text
/api
```
