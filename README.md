# Islands of Adventure Wait Times

Dark-themed operations dashboard for Universal's Islands of Adventure. Live queue times refresh every 60 seconds via [Queue-Times](https://queue-times.com/).

## Features

- Headline attractions hero (Hagrid's, VelociCoaster, Hulk, Spider-Man)
- Wait times grouped by park land
- Color-coded waits (green / amber / red)
- Mobile-responsive card layout

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Data

Wait times are proxied through `/api/wait-times` from Queue-Times park ID 64. Not affiliated with Universal.

## Deploy

Works on [Vercel](https://vercel.com) or any Node host that supports Next.js.

```bash
npm run build
npm start
```
