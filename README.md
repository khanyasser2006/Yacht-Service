

# 🛥️ Aura Nautica

A cinematic site for a luxury yacht charter and watersports concierge — a scroll-scrubbed hero, an interactive itinerary builder with live pricing, a curated roster of dive instructors and rides, and a sprawling admin CMS covering the entire fleet, crew, and booking catalog.

![React](https://img.shields.io/badge/-React%2019-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/-GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)
![Lenis](https://img.shields.io/badge/-Lenis-000000?style=flat-square)

---

## 🧰 Technologies

- React 19
- Vite 6
- JavaScript
- Tailwind CSS
- GSAP (ScrollTrigger) + Lenis
- Web Audio API (procedural ocean ambience)

---

## ✨ Features

- **Scroll-Scrubbed Hero**: A frame-sequence hero synced to scroll via GSAP ScrollTrigger and Lenis smooth scrolling.
- **Interactive Itinerary Builder**: A live charter configurator — pick a duration tier, guest count, water-sport activities, and premium add-ons like a private chef or a drone film crew — with a running, itemized price total that updates as you choose.
- **Rides, Divers & Experiences Catalog**: Dedicated pages for water-sport rides (e-foil, seabob, jet ski, parasailing), diving programs and instructors, and curated onboard experiences.
- **Procedural Ocean Ambience**: A generative ambient soundscape synthesized with the Web Audio API, in the same spirit as the sound design elsewhere in this series.
- **Booking & Experience Modals**: A reservation modal that can be pre-filled from any "Book Now" entry point across the site, plus a detail modal for individual experiences.
- **Drag-and-Drop Image Uploads**: An `ImageDropzone` component for adding images from the admin dashboard.
- **Sprawling Admin CMS**: A single dashboard covering hero content, live telemetry readouts, experiences, packages, rides, crew members, dive programs, reviews, routes, and fleet decks.
- **VIP & Officer Account Tiers**: Two account levels — VIP client and admin — with different post-login experiences.
- **Hash-Based Routing**: URL-synced navigation with back/forward support, without a routing library.
- **SEO Basics Included**: A dedicated `SEOHead` component alongside the standard sitemap, robots, and manifest files.
- **Automated Page Verification Script**: A Playwright script that checks the site's pages render correctly.

---

## 🪜 The Process

I built the hero using the same frame-sequence technique as the rest of this series, then spent most of the actual design time on the Interactive Itinerary Builder, since a yacht charter is really a bundle of decisions — how long, how many guests, which water sports, which add-ons — and a static price list undersells that. Watching the total update live as you toggle a jet ski or a private chef on and off does more to sell the experience than a brochure page would.

The content model grew to match: hero stages and telemetry, experiences, packages, rides, crew, dive programs, reviews, routes, and fleet decks all live in one shared site-data object, edited through a single, very large admin dashboard rather than a page per content type.

For sound, I reused the generative-ambience approach from an earlier project in this series and re-themed it for the ocean instead of wind or a general hum, since a yacht site felt incomplete without some sense of atmosphere beyond visuals.

I'll be candid about the account system: it's currently set up with intentionally loose demo credentials — multiple accepted admin logins, and an error message that hands you the correct one if you get it wrong — which was useful while building and demoing the CMS quickly, but is exactly the kind of thing that needs to be locked down, not just reduced, before this is ever public.

---

## 📚 What I Learned

- **Building a Live Configurator, Not Just a Form**: Modeled the itinerary builder's pricing as a sum of independent, toggleable line items — base tier, per-guest activities, flat-fee add-ons — so the total recalculates from state instead of being computed on submit.
- **One Shared Data Object for a Large CMS**: Kept ten different content categories (experiences, rides, crew, dive programs, routes, and more) in a single context rather than a context per entity, so admin edits and site rendering stay in sync automatically.
- **Reusing a Sound Technique in a New Register**: Adapted the same generative audio approach used elsewhere in this series for an ocean-ambience mood, rather than starting the sound design over from nothing.
- **Hash Routing at Scale**: Extended the same lightweight hash-based navigation pattern to a larger page count without needing a routing library.
- **Drag-and-Drop as a First-Class Admin Input**: Built a dedicated dropzone component for image uploads in the admin, rather than a plain file input.
- **Demo Credentials Are Still Credentials**: Learned that "these are just placeholder passwords for testing" doesn't hold up once the code ships — anything checked against a hardcoded value in the bundle is real to anyone reading it, demo intent or not.

---

## 🔧 How Can It Be Improved?

- Remove the multiple hardcoded admin credential pairs, the demo passwords for the VIP tier, and — especially — the error message that reveals the correct admin password when a login attempt fails. None of this should ship in a public build, regardless of how convenient it was during development.
- Hash and salt user passwords before storing them; the current registration/login flow compares plaintext values directly, with no hashing utility involved at all.
- Move authentication and CMS content to a real backend — the admin check is still a `localStorage` read with no server verification, so it stays bypassable from the browser console even after the credentials above are fixed.
- Remove the unused `@tailwindcss/postcss` devDependency, since `postcss.config.js` is actually configured for Tailwind v3, not v4.
- Consolidate the 2,000-plus-line `AdminPage.jsx` into smaller per-entity components — one for rides, one for crew, one for routes — now that it covers ten content types in a single file.
- Add rate limiting to the login form, since there's currently no cooldown or lockout on repeated attempts.

---

## 🚀 Running the Project

### Step 1 — Clone the Repository

```bash
git clone https://github.com/<your-username>/aura-nautica.git
cd aura-nautica
```

---

### Step 2 — Install Dependencies

**Prerequisites:** Node.js 18+

```bash
npm install
```

---

### Step 3 — Run the Development Server

```bash
npm run dev
```

---

### Step 4 — Open the Application

```
http://localhost:3000
```

*(This project pins Vite to port 3000 in `vite.config.js`, rather than the usual 5173 default.)*

---

## 🎥 Video



https://github.com/user-attachments/assets/f9e3192c-3433-4c24-a492-b065436389e8



---
