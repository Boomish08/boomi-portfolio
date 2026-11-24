<div align="center">

# BOOMI.

**LESS TALK. MORE WORK.**
*Observe. Learn. Adapt. Build.*

Personal developer portfolio of **Boomish V** — built with **React + Vite**, Royal Black & Gold theme.

</div>

---

## About the project

A single-page portfolio built as part of my Full-Stack MERN learning journey (and my Letter of Recommendation project with Maiyyam Inc.).
Version 1 was plain HTML, CSS and JavaScript. **Version 2 (this version) rebuilds it with React components**, hooks and data modules.
Next: a Node.js + Express + MongoDB backend for the contact form and projects.

## Features

- Royal black & gold theme with premium typography
- Hero with typing animation, floating portrait and gold dust particles
- Sticky navigation, smooth scrolling, active-section highlight, scroll-progress bar, mobile menu
- Skills with honest student-level indicators and a separate "Currently Exploring" section
- Learning-journey timeline
- Project showcase driven by a data file (easy to add projects)
- Certificate gallery with a details pop-up (`<dialog>`)
- Contact form with validation and a copy-email button
- Floating music player — **no autoplay**
- Subtle custom gold cursor (desktop only)
- Responsive and `prefers-reduced-motion` friendly

## Technologies

React 19 · Vite · CSS3 (variables, grid, flexbox, animations) · JavaScript (ES modules)

**Planned:** Node.js · Express.js · MongoDB

## React concepts used

| Concept | Where |
| --- | --- |
| Components & props | every file in `src/components/` |
| `useState` | Navbar, Contact, MusicPlayer, Certificates |
| `useEffect` (+ cleanup) | Cursor, Particles, Navbar, Reveal |
| `useRef` | Reveal, MusicPlayer, Particles, Cursor |
| Custom hooks | `src/hooks/` (useTyping, useActiveSection, useReducedMotion) |
| Lists with `.map()` and `key` | Skills, Certificates, Projects, Navbar |
| Conditional rendering | Projects (live demo button), Education (note) |
| Controlled form inputs | Contact |

## Folder structure

```
boomi-portfolio/
├── index.html              # the one HTML page (React draws inside #root)
├── package.json            # project info + scripts + dependencies
├── vite.config.js          # Vite settings
├── public/
│   └── assets/             # images, certificates, music (served as /assets/...)
└── src/
    ├── main.jsx            # entry point
    ├── App.jsx             # root component (page order)
    ├── components/         # Navbar, Hero, About, Skills, ... MusicPlayer
    ├── hooks/              # custom hooks
    ├── data/               # skills, certificates, projects, education, timeline
    └── styles/             # style.css, animations.css, responsive.css
```

## Run locally

Requires **Node.js 20.19+** (22 LTS recommended).

```bash
npm install      # download dependencies (first time only)
npm run dev      # start the dev server  ->  http://localhost:5173
```

## Build for production

```bash
npm run build    # creates the optimised "dist" folder
npm run preview  # test the production build locally
```

## Customising

| I want to…                 | Edit…                                                         |
| -------------------------- | ------------------------------------------------------------- |
| Add/change education       | `src/data/education.js`                                       |
| Add a certificate image    | save `public/assets/certificates/<id>.jpg` (id from `certificates.js`) |
| Add a project              | `src/data/projects.js`                                        |
| Change a skill level       | `src/data/skills.js`                                          |
| Change colours             | `:root { ... }` in `src/styles/style.css`                     |
| Add a song                 | `tracks` array in `src/components/MusicPlayer.jsx`            |

## Backend / API / environment variables

Not applicable yet. In the MERN phase the contact form will POST to an Express REST API that stores messages in MongoDB.
Secrets will live in `.env` files that are listed in `.gitignore` (front-end variables must start with `VITE_`, and must never hold real secrets).

## Deployment (Vercel)

- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

Every push to `main` redeploys automatically. Pushing another branch creates a **preview deployment**.

- **Live demo:** _add your Vercel URL here_
- **Repository:** https://github.com/Boomish08/boomi-portfolio

## Author

**Boomish V (BOOMI.)** — B.Sc. Computer Technology, KPR College of Arts, Science and Research

- GitHub: https://github.com/Boomish08
- LinkedIn: https://www.linkedin.com/in/boomish2013
- Instagram: https://www.instagram.com/_b.o.o.m.i.s.h_13
- Email: minecrusher82@gmail.com

## Future improvements

- Node.js + Express REST API and MongoDB for contact messages and projects
- Real project screenshots, certificate images and a downloadable résumé
- Deploy frontend and backend separately
