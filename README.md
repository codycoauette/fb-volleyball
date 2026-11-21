# Fertile-Beltrami Falcons Volleyball

Website for the Fertile-Beltrami High School volleyball program: home page, schedule,
roster, program history and record book, fundraising, and a donation portal that is
wired to a pledge endpoint and ready for a payment processor.

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

| Route          | What it holds                                                                            |
| -------------- | ---------------------------------------------------------------------------------------- |
| `/`            | Hero, next-match card, season stat strip, quick links, fundraising banner, game-day info |
| `/schedule`    | Current-season calendar with a "next up" marker, previous-season results, `.ics` export  |
| `/roster`      | Varsity roster with position/class filters and search, coaching staff, tryout info       |
| `/history`     | Program records, season-by-season results, career leaderboards, milestones, honors       |
| `/fundraising` | Campaign goal meters, ways to give, sponsorship levels, event calendar, FAQ              |
| `/donate`      | Donation portal: amount presets, frequency, designation, donor details, employer match   |

## Editing content

Everything the coaches and booster club need to change lives in one file:
[`src/data/team.ts`](src/data/team.ts). It holds team info, coaching staff, roster,
schedule, previous-season results, the record book, career leaders, milestones, honors,
fundraising campaigns, sponsor tiers, events and the FAQ. Pages read from it, so posting
new scores or a new roster is a data edit, not a code change.

**The content in that file is sample content.** Names, records, dates, contact details
and dollar amounts are plausible placeholders, not real program data — replace them
before the site goes public.

## The logo

`src/components/falcon-mark.tsx` is a placeholder mark (a winged volleyball in the
team's red, navy and white) drawn as inline SVG. It is used in the header, footer, page
heroes and the favicon at `src/app/icon.svg`. To use the school's official falcon logo,
drop the artwork in `public/` and replace the `FalconMark` usages with a `next/image`
reference.

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
