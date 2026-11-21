<div align="center">

# BOOMI<span style="color:#D4AF37">.</span>

**LESS TALK. MORE WORK.**
*Observe. Learn. Adapt. Build.*

Personal developer portfolio of **Boomish V** — Royal Black & Gold theme.

</div>

---

## About the project

A single-page portfolio built with plain **HTML, CSS and JavaScript** as part of my Full-Stack MERN learning journey (and my Letter of Recommendation project with Maiyyam Inc.). It showcases my education, skills, certificates, projects and what I am currently learning.

The site will grow with my course: first HTML/CSS/JS, then React, then a Node.js + Express + MongoDB backend.

## Objectives

- Present my identity, education, skills and certificates professionally
- Practise real web development: layout, responsive design, DOM scripting
- Keep the code simple enough that I can explain every line

## Features

- Royal black & gold theme with premium typography
- Hero with typing animation, floating portrait and gold dust particles
- Sticky navigation with smooth scrolling and active-section highlight
- Mobile hamburger menu
- Skills (honest student-level indicators) and a separate "Currently Exploring" section
- Learning-journey timeline
- Project showcase built from a JavaScript array (easy to add projects)
- Certificate gallery with a details pop-up (images can be added later)
- Contact form with validation and a copy-email button
- Floating music player — **no autoplay**, play/pause, mute and volume
- Subtle custom gold cursor (desktop only)
- Fully responsive; respects `prefers-reduced-motion`

## Technologies

HTML5 · CSS3 (variables, grid, flexbox, animations) · Vanilla JavaScript (DOM, events, arrays/objects)

**Planned:** React · Node.js · Express.js · MongoDB

## Folder structure

```
BOOMI-PORTFOLIO/
├── index.html
├── css/
│   ├── style.css          # colours, layout, components
│   ├── animations.css     # all movement + reduced-motion rules
│   └── responsive.css     # tablet & phone layouts
├── js/
│   ├── main.js            # data arrays, card rendering, modal, contact form
│   ├── navigation.js      # navbar, mobile menu, active link, progress bar
│   ├── cursor.js          # custom gold cursor
│   ├── animations.js      # scroll reveal, typing effect, particles
│   └── music.js           # music player
├── assets/
│   ├── images/            # profile photo, project screenshot
│   ├── certificates/      # certificate images (add later)
│   ├── icons/
│   ├── music/
│   └── documents/
├── docs/                  # code-explanation + commands PDFs (coming next)
├── README.md
└── .gitignore
```

## Run locally

1. Install [VS Code](https://code.visualstudio.com/) and the **Live Server** extension.
2. Open the `BOOMI-PORTFOLIO` folder in VS Code.
3. Right-click `index.html` → **Open with Live Server**.
4. The site opens at `http://127.0.0.1:5500`.

No build step or `npm install` is needed for this version.

## Customising

| I want to…                    | Edit…                                                |
| ----------------------------- | ---------------------------------------------------- |
| Add a project                 | `projects` array in `js/main.js`                     |
| Add a certificate image       | Put file in `assets/certificates/`, set `image:` in `js/main.js` |
| Change a skill level          | `skills` array in `js/main.js`                       |
| Change colours                | `:root { ... }` at the top of `css/style.css`        |
| Add a song                    | `tracks` array in `js/music.js`                      |

## Backend / API / environment variables

Not applicable yet. In the MERN phase the contact form will POST to an Express REST API that stores messages in MongoDB. Secrets will live in a `.env` file that is listed in `.gitignore` and is never uploaded.

## Deployment

Static deployment on **Vercel** by importing the GitHub repository (Framework preset: *Other*, no build command, output directory = project root). Every `git push` to `main` redeploys automatically.

- **Live demo:** _add your Vercel URL here after deployment_
- **Repository:** https://github.com/Boomish08/boomi-portfolio

## Screenshots

_Add screenshots here after running the site locally (`docs/screenshots/`)._

## Author

**Boomish V (BOOMI.)** — B.Sc. Computer Technology, KPR College of Arts, Science and Research

- GitHub: https://github.com/Boomish08
- LinkedIn: https://www.linkedin.com/in/boomish2013
- Instagram: https://www.instagram.com/_b.o.o.m.i.s.h_13
- Email: minecrusher82@gmail.com

## Future improvements

- Convert the frontend to React components
- Node.js + Express REST API and MongoDB for contact messages and projects
- Add real project screenshots, certificate images and a downloadable résumé
- Deploy frontend and backend separately
