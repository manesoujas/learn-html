# Learn HTML — DevClub Level Up 2.0

An interactive, self-paced HTML course built for **DevClub's Level Up 2.0** program. Instead of lectures, students work through short explanations, live-rendered demos, and a built-in code playground — then sit a shuffled 30-question assessment to earn a certificate.

**Live demo:** _add your Vercel URL here once deployed_

---

## Features

- **14 topics** covering HTML from document structure through accessibility basics
- **Live demo previews** — every code example renders in a real sandboxed iframe, not a static screenshot
- **Experiment mode** — a built-in playground where students edit code and see the output update instantly
- **Progress tracking** — sidebar shows completion per topic as students work through the course
- **Final Assessment** — 30 multiple-choice questions, shuffled (questions *and* options) on every page load and every retake
- **Certificate generation** — students who score 70%+ can generate and print/save a completion certificate
- **Responsive layout** — usable on desktop, tablet, and mobile

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/) — build tool and dev server
- [lucide-react](https://lucide.dev/) — icons
- Plain CSS-in-JS (no Tailwind/UI framework — custom design system)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node)

### Installation
```bash
git clone https://github.com/<your-username>/learn-html.git
cd learn-html
npm install
```

### Run locally
```bash
npm run dev
```
Open the URL shown in the terminal (usually `http://localhost:5173`).

### Build for production
```bash
npm run build
```
Output goes to the `dist/` folder.

## Deployment

This project deploys as a static site — no backend or database required.

**Vercel (recommended):**
1. Push this repo to GitHub.
2. Import it at [vercel.com](https://vercel.com) → Add New Project.
3. Vercel auto-detects the Vite config. Defaults work as-is:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy. Every push to `main` redeploys automatically.

## Project Structure
```
learn-html/
├── src/
│   ├── App.jsx        # Entire app — lessons, playground, quiz, certificate
│   ├── main.jsx        # React entry point
│   └── index.css       # Global reset + base styles
├── index.html
├── package.json
└── README.md
```

All lesson content, quiz questions, and the certificate logic live inside `App.jsx` in a few data arrays (`TOPICS`, `QUIZ_QUESTIONS`) — adding or editing content doesn't require touching the layout code.

## Roadmap

- [ ] Persistent progress tracking (survive page refresh / cross-device)
- [ ] Certificate verification / completion registry for DevClub records
- [ ] Additional modules using the same engine: CSS, JavaScript, Git & GitHub
- [ ] Syntax-highlighted code editor in Experiment mode

## About Level Up 2.0

Level Up 2.0 is DevClub's peer-mentored technical training program: 2nd/3rd-year students mentor 1st-year B.Sc. IT/CS students through task-based, project-driven learning — building a self-sustaining pipeline of developers ready for hackathons, internships, and open-source contribution.

## License

Built for internal use by DevClub. Add a license here if you plan to open-source it.