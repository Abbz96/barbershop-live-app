# Barbershop Live

A responsive, mobile-first web app for a barbershop, built with React (Vite),
Tailwind CSS and React Router.

## Project goals

- **Live queue** — customers see their place in line and an estimated wait time
  in real time; barbers call the next customer from their own view.
- **Loyalty stats** — a digital stamp card that tracks visits and unlocks
  rewards (e.g. every 10th cut free).
- **Swish payment UI** — pay for the visit with Swish straight from the phone.
  The real integration must run through a backend using the Swish Commerce API.

## Status

Frontend boilerplate only. All data is mocked in `src/data/mockData.js`; there
is no backend, login, or real payment yet.

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
│   ├── dashboard/            # Customer view: queue, stamp card, Swish button
│   └── admin/                # Barber view: queue manager, stats
├── pages/                    # Standalone pages (404)
└── data/                     # Mock data until a backend exists
```

## Routes

| Path         | View                    |
| ------------ | ----------------------- |
| `/dashboard` | Customer dashboard      |
| `/admin`     | Barber / admin view     |
| `*`          | 404 page                |
