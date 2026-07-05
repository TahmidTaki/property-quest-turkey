# Property Quest Turkey — Website

The public website + client portal for Property Quest Turkey. A Next.js 15 app
that presents projects, captures leads, runs a buy/reserve flow, and gives
clients a private portal (dashboard, portfolio, citizenship tracker, purchases,
aftersales, documents).

Runs on **sample data** today; designed to connect to the PMS
(`C:\dev\pqt-mgmt`) Postgres database later as the single source of truth.

## Run it

```bash
npm install
npm run dev        # http://localhost:3003
```

Other scripts:

```bash
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm start          # serve the production build on :3003
```

## Try the portal (demo)

1. Go to `/login`.
2. Enter any email (no password — demo mode).
3. Pick **Client** or **Agent** view, then log in.
   - **Client** = what your customers see.
   - **Agent** = internal view; reveals confidential fields hidden from clients.
4. You land in `/portal`. Switch roles any time from the sidebar.

Submitted leads (contact / enquiry / reservation) are logged to the dev console
and appended to `.dev-leads.log` at the project root.

## Structure

```
src/
  app/
    page.tsx                 # Home
    projects/                # Listing + [slug] detail
    citizenship/ services/ about/ faq/ privacy/ terms/   # Public content
    contact/                 # Lead form
    buy/[slug]/              # Reserve flow
    login/                   # Demo login
    portal/                  # Gated client portal (dashboard + 6 sections)
    actions/                 # Server actions (leads, auth)
  components/                # site/, ui/, property/, portal/, forms/, buy/
  lib/
    content/                 # Sample data + the data seam (swap to PMS here)
    auth/                    # Demo session helpers (swap to PMS NextAuth here)
    format.ts site.ts leads.ts
  middleware.ts              # Gates /portal/*
```

## Going live — the two swaps

1. **Data:** replace the getter bodies in `src/lib/content/properties.ts` and
   `portfolio.ts` with Prisma reads against the PMS DB, projecting to the
   `Public*` shapes (public-tagged columns only). Set `DATABASE_URL`.
2. **Auth:** replace `src/lib/auth/demo-session.ts` + `src/app/actions/auth.ts`
   with the PMS NextAuth v5 session. Call sites use only `getSession()`/role.

See `DECISIONS.md` for the full rationale.
