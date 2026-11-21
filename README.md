# Fertile-Beltrami Falcons Volleyball

Website for the Fertile-Beltrami High School volleyball program: a photo-driven home
page, schedule, roster, program history and record book, fundraising, and a donation
portal that is wired to a pledge endpoint and ready for a payment processor.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and shadcn/ui.

## Run it locally

```bash
npm install
npm run dev
```

The dev server listens on <http://localhost:4319>.

```bash
npm run build   # production build (also type-checks)
npm run lint    # eslint
```

## Pages

| Route          | What it holds                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------- |
| `/`            | Animated photo hero, scoreboard strip, counting stats, photo rail, fundraising banner, game-day info |
| `/schedule`    | Current-season calendar with a "next up" marker, previous-season results, `.ics` export            |
| `/roster`      | Varsity roster with position/class filters and search, coaching staff, tryout info                 |
| `/history`     | Program records, season-by-season results, career leaderboards, milestones, honors                 |
| `/fundraising` | Campaign goal meters, ways to give, sponsorship levels, event calendar, FAQ                        |
| `/donate`      | Donation portal: amount presets, frequency, designation, donor details, employer match             |
| `/portal`      | Coach content portal (password protected)                                                          |

## Coach portal

The coach can edit every piece of site content at [`/portal`](http://localhost:4319/portal)
without touching code:

- Team info (school, gym, contacts, tickets)
- Roster and coaches
- Schedule, last-season results, season snapshot
- History & stats (records, seasons, leaders, milestones, honors)
- Fundraising (campaigns, sponsor tiers, events, donate designations, FAQ)

**Local password:** `falcons2027`  
Set `PORTAL_PASSWORD` (and optionally `PORTAL_SECRET`) in the environment before going
live.

Saves go to [`data/site-content.json`](data/site-content.json). The public site reads
that file on every request. Seed / fallback content still lives in
[`src/data/team.ts`](src/data/team.ts).

### Hooking up Supabase later

The store is isolated in [`src/content/store.ts`](src/content/store.ts). Swap
`readContent` / `writeContent` for Supabase queries (one `site_content` JSONB row, or
one table per section) and keep the portal + public pages as they are. Auth in
[`src/content/auth.ts`](src/content/auth.ts) can move to Supabase Auth the same way.

## Photos

Game photography lives in [`public/photos/`](public/photos/). The home hero carousel,
the drifting photo rail, the photo-backed quick-link tiles and every page hero all
read from [`src/data/photos.ts`](src/data/photos.ts).

To add more photos later:

1. Drop the file in `public/photos/` (JPEG or WebP).
2. Add an entry to `heroPhotos` in `src/data/photos.ts` with a `src`, `alt`,
   `position` (CSS object-position that keeps players in frame), `kicker`,
   `headline`, `blurb` and `caption`.

The hero auto-advances every 7 seconds with a Ken Burns zoom, a progress bar under
each slide, pause/play and keyboard arrow support. Visitors who prefer reduced motion
get a still image with no autoplay.

## The logo

The official falcon mark lives at [`public/falcon-logo.png`](public/falcon-logo.png)
and is rendered by [`src/components/falcon-mark.tsx`](src/components/falcon-mark.tsx)
in the header and footer. The same artwork is the site favicon via `src/app/icon.png`.

## The donation portal

The donate page posts to `POST /api/donate`, which validates the gift and records a
pledge in memory, returning an id such as `FBV-2027-0001`. No card data is collected and
no money moves, and the page says so plainly.

Taking real payments means two changes:

1. Replace the in-memory array in `src/app/api/donate/route.ts` with a database write
   and a checkout session (Stripe Checkout or the district's processor). The route
   already validates amount, frequency, designation, donor name, email and employer
   match, so the handler body is the only part that changes.
2. Remove the "card processing is not live yet" notice on `src/app/donate/page.tsx` and
   send the form to the hosted checkout.

Processor keys belong in environment variables, never in `src/data/team.ts`.

## Theme

Team colors are defined once as Tailwind color scales in `src/app/globals.css`:
`navy-*` (#0d2140 family), `falcon-*` (red, #c8102e family) and white. Headings use
Barlow Condensed, body copy uses Inter.
