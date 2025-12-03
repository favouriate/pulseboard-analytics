## Pulseboard Analytics

SaaS subscription analytics dashboard built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **TanStack Table**, and (soon) **Firebase**.

### Features

- **Subscription KPIs**: MRR, active customers, churn, ARPU
- **Interactive charts** with filters (date range, plan, segment)
- **Data tables** powered by TanStack Table (sorting, filtering, pagination)
- **Responsive layout** with sidebar navigation and top bar
- **Theme system** with light/dark mode and accent color picker

### Tech Stack

- Next.js (App Router) + React Server Components
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Table
- (Planned) Firebase Auth & Firestore

### Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

### Project Structure

- `src/app` – routes and layouts
- `src/components` – UI and feature components
- `src/lib` – utilities (e.g. `cn`, firebase config)
- `src/hooks` – reusable React hooks

### Roadmap

- [ ] Firebase Auth (email/password)
- [ ] Firestore-backed customers and subscriptions
- [ ] Real-time dashboard metrics
- [ ] Team and workspace settings
