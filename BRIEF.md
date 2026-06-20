# CoachFlow — Project Brief

## Project context

CoachFlow is a football coaching CRM web app for grassroots/youth coaches and their athletes. First real user: Sasha, coaches a U18 squad (16-17 year olds + some 18+) in London.

Critical product decision: athletes 16+ are the PRIMARY users — not parents. Athletes get their own login and own parts of their profile. Tone is "young athlete development", never "kids" or "children".

## Tier model

- Tier A — Coach. Full access to all squad data, ratings, plans, match records.
- Tier B — Athlete (16+). Primary user. Sees own profile, own ratings (read-only), own goals, own match records. Can edit: goals, personal notes, preferred_position, photo_consent. Cannot edit: stage, skill ratings, strengths/weaknesses (coach-owned).
- Tier C — Parent. Optional for 16-17 athletes (CC on key updates). Absent for 18+.

## Sprint roadmap

- Sprint 0 — Foundation (CURRENT). Scaffold, design system, auth, navigation, deploy. No real product features yet.
- Sprint 1 — Match Review v1. Match records, YouTube embed, tagged moments at timestamps, voice notes per moment.
- Sprint 2 — Drawing canvas + Claude Vision frame analysis.
- Sprint 3 — TensorFlow.js MoveNet pose detection + side-by-side comparison.
- Sprint 4 — Auto highlight reels + parent share links.

## What's already set up — DO NOT RECREATE

- GitHub repo: github.com/coachflow993/coachflow (private, only README so far)
- Supabase project: csbobvgvzualthuzytcv (eu-west-2 / London) — schema is ALREADY APPLIED to the live database. 11 tables with RLS, triggers, indexes: audit_log, coaches, feedback, matches, moments, parents, players, sessions, skill_ratings, tasks, teams.
- Netlify team: "CoachFlow" (under coachflow993@gmail.com)
- Legacy HTML test deploy at: coachflow993.netlify.app (for reference only — don't touch)

## Tech stack — LOCKED

- Vite + React 18 + TypeScript
- Tailwind CSS with custom theme tokens (defined below)
- Supabase JS client v2 (auth + database + storage)
- Netlify (hosting + serverless functions)
- React Router v6
- Mobile-first throughout — primary user is on Samsung Android (360px baseline)

## Design tokens — extend Tailwind theme with EXACTLY these

Colors:
- bg: #0B1E1A (Night Match deep stadium teal — NOT pure black)
- surface: #142724
- surface-2: #1A2F2B
- border: rgba(63, 162, 100, 0.12) (green-tinted)
- text: #FAF6EE (Touchline Cream)
- text-muted: #8FA39D
- text-dim: #4F605C
- green: #3DDC97 (form-positive)
- orange: #F08A3E (Half-Time Orange — watch indicator)
- alert: #E55D5D (concern indicator)
- pitch: #102B23 (tactical pitch background)
- pitch-line: rgba(63, 162, 100, 0.28)

Fonts (load from Google Fonts):
- Display: Barlow Condensed (weights 500, 700, 800) — eyebrows, large numbers, headings
- Body: Inter (weights 400, 500, 600, 700) — paragraphs, UI text
- Mono: JetBrains Mono (weights 500, 700) — stats, time deltas, scores
- NEVER use Bebas Neue (overused).

Signature patterns:
- Eyebrow + label: Barlow Condensed 700, 11px, 0.22em letter-spacing, uppercase, text-dim color
- Default theme: dark. Light theme deferred.
- Bottom nav: 5 items — Today / Squad / Sessions / Matches / More. Always visible on mobile.
- Surface cards: surface bg, thin border, rounded-2xl, padding-6.

Reference signature elements (NOT built in Sprint 0 but design tokens must support them):
- Dashboard hero will be an SVG tactical pitch with squad as 11 dots in formation, colored by form (green / orange / alert)
- Player profile hero will be a vertical "Season Narrative" timeline of all ratings, matches, feedback, voice memos

## Sprint 0 acceptance criteria (every one must be green)

1. Vite + React + TypeScript + Tailwind scaffold initialised in the repo root
2. Tailwind config extended with the design tokens above — no inventing new colors or fonts
3. Supabase client wired at src/lib/supabase.ts using env vars
4. Generated TypeScript types saved to src/lib/database.types.ts via the supabase gen types command above
5. Auth flow: sign-in screen for athletes (16+), sign-up flow, password reset. Email + password. Athletes are the default sign-up audience. Coach role is by invitation only (no UI in Sprint 0).
6. Router with bottom nav — 5 items: Today / Squad / Sessions / Matches / More. Pages are placeholders.
7. Dashboard placeholder with the design system applied — dark mode, Night Match Teal bg, Barlow Condensed eyebrows, surface cards. Real content lands in Sprint 1.
8. Netlify deploy — connect the existing coachflow993/coachflow repo to the existing CoachFlow Netlify team, deploy main branch, confirm live URL works.
9. .env.example committed with placeholders for all required env vars. Real .env.local gitignored.
