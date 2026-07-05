# DECISIONS log — PQT Website

Any notable choice or deviation is recorded here: what, why, tradeoff.

---

## 2026-06-02/03 — Initial build

### 1. Separate Next.js app (`C:\dev\pqt-website`), not built into the PMS
**What:** The website is its own Next.js 15 app, distinct from the PMS (`C:\dev\pqt-mgmt`).
**Why:** User chose to keep the public website separate from the internal management system. Isolates public internet traffic and the marketing/portal code from the sensitive internal app.
**Tradeoff:** Some portal concepts (portfolio, citizenship, documents) exist in both apps. The website's versions run on **sample data** today and will integrate with the PMS database later. Two apps to deploy.

### 2. Sample/fake listings now; live PMS data later
**What:** All property + portal data comes from typed sample files in `src/lib/content/`. A single function (`getProperties()`, `getHoldings()`, etc.) is the only data seam.
**Why:** User explicitly asked for fake listings now, PMS integration later. Lets the whole site be clicked through today with no database.
**Tradeoff:** Numbers are illustrative. Going live = replacing the body of those getter functions with Prisma reads against the PMS Postgres DB (selecting only public-tagged columns).

### 3. Field-level public/confidential split baked into the types
**What:** `PublicProperty` (in `src/lib/content/types.ts`) contains ONLY fields tagged `public` in the PMS access rules. Confidential fields (cost price, commission %, developer margin, agent notes, lead source, pipeline stage) are **absent from the type**, so pages cannot render them even by mistake. The agent/internal demo role shows *illustrative* confidential values on the detail and portfolio pages to demonstrate the boundary.
**Why:** Enforces the PQT access rule ("clients + website see public fields only") at the type level, not just visually.
**Tradeoff:** None. This is the safe default.

### 4. Lightweight demo auth (signed cookie), not full NextAuth
**What:** `src/lib/auth/demo-session.ts` + `src/app/actions/auth.ts` implement a base64 cookie session with a client/agent role toggle. `middleware.ts` gates `/portal/*`.
**Why:** Real auth + database aren't wired yet (PMS integration is later). This makes the full portal browsable today without standing up a DB.
**Tradeoff:** NOT secure for production — no password, cookie is not cryptographically signed. At go-live, swap these helpers for the PMS NextAuth v5 session. Call sites only use `getSession()`/role, so the swap is localized.

### 5. Server Actions for forms (lead capture + login + buy)
**What:** Forms post to `"use server"` actions, validated with Zod. Leads are recorded to console + `.dev-leads.log` (mirrors the PMS email stub pattern).
**Why:** No API routes needed; progressive enhancement; consistent with the PMS.
**Tradeoff:** Email delivery is stubbed. Set `RESEND_API_KEY` + wire `sendLeadEmail()` in `src/lib/leads.ts` to activate notifications.

### 6. Dev port 3003
**What:** `next dev -p 3003`.
**Why:** PMS uses 3002; this avoids a clash so both can run together in dev.
**Tradeoff:** None.

### 7. Gradient placeholders instead of photos
**What:** Property cards/heroes use brand gradients keyed by `gradient` field (same trick as the demo HTML).
**Why:** No real images yet; keeps the UI complete and on-brand.
**Tradeoff:** Replace with Cloudinary images at go-live (`next.config.ts` already allowlists `res.cloudinary.com`).

## 2026-06-05 — Post-review hardening (23 confirmed findings fixed)

### 8. Honest lead delivery (CRITICAL fix)
**What:** `recordLead` now emails leads via Resend's REST API (no SDK) and returns `delivered:true/false`. In production without `RESEND_API_KEY`+`LEADS_TO_EMAIL`, forms show an honest "email us directly" fallback instead of a false success. Buy flow now submits a real reservation request (name/email/phone required) — the fake "Pay deposit" step was removed.
**Why:** On Vercel the old file-append stub silently lost every real enquiry while telling the visitor it worked.
**Tradeoff:** Until Rafiq adds RESEND_API_KEY + LEADS_TO_EMAIL env vars, live visitors are pointed to direct email (honest, not silent loss).

### 9. Signed sessions + gated agent view
**What:** Demo cookie is now HMAC-SHA256 signed (`SESSION_SECRET`). The public "Agent (internal)" login button was removed; the agent view is granted only when the login email matches `DEMO_AGENT_EMAIL` (no env var = nobody). Confidential panels carry a "SAMPLE DATA — demonstration only" watermark. Portal layout re-validates the signature (middleware still only checks presence).
**Why:** Anyone could previously open panels labelled "Confidential" with plausible-looking financials.
**HARD RULE:** Real PMS data must NOT ship behind this demo cookie. Replacing it with the PMS NextAuth session is a blocking precondition of PMS data integration.

### 10. Search engines blocked during preview
**What:** `src/app/robots.ts` disallows all crawling + `robots: noindex` metadata in layout. `sitemap.ts`, `icon.svg`, and `opengraph-image.tsx` added, ready for launch.
**Why:** Fake listings/prices and a placeholder phone were indexable under the live brand.
**Flip at launch:** remove the noindex metadata and open robots.ts per the comment inside it.

### 11. Placeholder contacts hidden until real ones exist
**What:** `company.phone`/`company.whatsapp` are empty strings; footer/contact/WhatsApp UI renders only when set. Filling them in `src/lib/site.ts` re-enables everything.

### 12. Market Pulse de-risked
**What:** Fabricated headlines are no longer attributed to real outlets (Reuters/Bloomberg/FT → "PQT … (sample)" desks). Badges read "LIVE · DEMO"; the page carries a visible demonstration notice.

### 13. Legal pages rewritten
**What:** Privacy (KVKK/GDPR-aware) and Terms (indicative content, preview-period sample-data clause, citizenship-outcome qualifier) replaced the "demo placeholder" text. Still recommend counsel review before full launch.

### 14. Accessibility & platform hygiene
**What:** prefers-reduced-motion respected everywhere; pause buttons on the live band, feed, and spotlight; aria-pressed/expanded states; duplicated ticker copy aria-hidden; nested <main> fixed; contrast bumped on dark surfaces; security headers (X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy); honeypot on forms; login honors ?next=; header reflects login state via a non-httpOnly hint cookie; Services restored to nav; portal sidebar compact on mobile; FAQ marker cross-browser; dead `portalUrl` export removed.
