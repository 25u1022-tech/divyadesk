# Divya's Desk

An interactive, game-like personal portfolio site styled as a cozy, explorable desktop scene. 

## Features

- **Interactive Desk Scene**: Clickable hotspots to explore portfolio sections.
- **Paint Mode**: An easter egg that lets you click to splash pastel paint on the desk.
- **Responsive Design**: On mobile, it reflows into a neat, scrollable list.
- **Retro OS Styling**: Content pop-ups use a charming desktop-OS window chrome.
- **Offline Ready / Client Side**: Fully static and deployable anywhere.

## Development

This project was built with React, Vite, Tailwind CSS, and Framer Motion.

To start the development server:
```bash
npm install
npm run dev
```

## Deployment to Vercel

Since this is a client-side React SPA, it's extremely easy to deploy to Vercel:

1. Push the code to a GitHub repository.
2. Log into [Vercel](https://vercel.com).
3. Click "Add New Project" and import your repository.
4. Vercel will automatically detect that it's a Vite project.
5. The build command will be `npm run build` and output directory `dist`.
6. Click **Deploy**.

## Customizing Assets

The project currently uses `lucide-react` icons for the hotspots. For a more authentic "desk" feel, you can replace the `<Icon />` components in `Hotspot.tsx` and the `icon` references in `src/data/portfolio.tsx` with actual SVG illustrations of a coffee cup, sticky notes, paint palette, etc.
