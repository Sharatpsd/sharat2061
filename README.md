# Sharat Acharja Mugdho — Portfolio

Personal portfolio deployed at **https://mugdho-dev.netlify.app/**.

## Stack

- React 18 + TypeScript, built with Vite
- GSAP + ScrollTrigger for scroll-driven motion, Lenis for smooth scrolling
- Plain CSS with design tokens (`src/styles/global.css`), no UI framework
- Netlify hosting and Netlify Forms for the contact form (EmailJS as a fallback)

## Project layout

```
src/
  data/content.ts      every fact shown on the site (edit content here)
  data/github.json     public GitHub snapshot, regenerated on each build
  lib/motion.ts        GSAP/Lenis setup, reduced-motion helpers
  lib/reveals.ts       declarative scroll reveals (.reveal, .reveal-split, ...)
  lib/sendMessage.ts   contact form delivery
  components/          loader, nav, cursor, shared UI
  sections/            one file per page section
scripts/fetch-github.mjs  build-time GitHub snapshot (keeps the last one if GitHub is unreachable)
```

## Commands

```bash
npm install
npm run dev               # local dev server on :8080
npm run build             # refreshes GitHub data, type-checks, builds to dist/
npm run preview           # serve the production build
npm run github:snapshot   # refresh src/data/github.json only
npm run resume            # export resume/resume.html to public/Sharat_Acharja_Mugdho_Resume.pdf
```

## Deployment

Netlify builds `main` automatically (`netlify.toml`: `npm run build`, publish `dist`).
Pull requests get Netlify deploy previews.

## Contact form

Submissions go to Netlify Forms (form name `contact`), visible under **Forms** in the Netlify
dashboard, where email notifications can be enabled. Form detection must be turned on for the site.
If Netlify Forms rejects a submission, the site falls back to EmailJS, and if that also fails the
visitor is shown the email address directly.
