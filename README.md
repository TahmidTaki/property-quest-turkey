# Property Quest Turkey — Website

The public website + client portal for Property Quest Turkey. A Next.js 15 app
that presents projects, captures leads, runs a buy/reserve flow, and gives
clients a private portal (dashboard, portfolio, citizenship tracker, purchases,
aftersales, documents).


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



See `DECISIONS.md` for the full rationale.
