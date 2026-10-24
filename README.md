# Barbershop Live

A responsive, mobile-first web app for a barbershop, built with React (Vite),
Tailwind CSS and React Router.

## Project goals

- **Live queue** — customers see their place in line and an estimated wait time
  in real time; barbers call the next customer from their own view.
- **Loyalty stats** — customers see how many times they have had a haircut.
- **Swish payment UI** — pay for the visit with Swish straight from the phone.
  The real integration must run through a backend using the Swish Commerce API.

## Status

Frontend only — there is no backend, login, or real payment yet.

- **Live shop status** works with a mock service
  (`src/services/shopStatusService.js`). The barber view controls status, queue
  and chairs; the customer view updates instantly. Changes sync between browser
  tabs on the same device. A demo simulation adds fake customer traffic and can
  be switched off in the barber view. Syncing between devices needs a backend
  (e.g. Supabase Realtime) — only that service file has to change.
- Loyalty and service data are mocked in `src/data/mockData.js`.

## Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build into dist/
npm run lint     # lint with oxlint
```

## Folder structure

```
src/
├── main.jsx                  # Entry point, wraps the app in BrowserRouter
├── App.jsx                   # Route table
├── index.css                 # Tailwind import + brand theme tokens
├── components/
│   ├── layout/               # Shared shell: Layout, Header, BottomNav
│   └── ui/                   # Reusable building blocks (Card)
├── features/
│   ├── dashboard/            # Customer view: visit count, Swish button
│   ├── admin/                # Barber view page
│   └── shopStatus/           # Live status widget (customer) + barber controls
├── services/                 # Data sources — swap these for a real backend
├── hooks/                    # React hooks that read from the services
├── pages/                    # Standalone pages (404)
└── data/                     # Mock data until a backend exists
```

## Routes

| Path         | View                    |
| ------------ | ----------------------- |
| `/dashboard` | Customer dashboard      |
| `/admin`     | Barber / admin view     |
| `*`          | 404 page                |
