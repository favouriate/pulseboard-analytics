# Pulseboard Analytics

SaaS subscription analytics dashboard built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **TanStack Table**, and **Supabase**.

## Features

- **Subscription KPIs**: MRR, active customers, churn, ARPU
- **Interactive charts** with filters (date range, plan, segment)
- **Data tables** powered by TanStack Table (sorting, filtering, pagination)
- **Responsive layout** with sidebar navigation and top bar
- **Theme system** with light/dark mode and accent color picker
- **Authentication** with Supabase Auth (email/password)
- **Route protection** with Next.js middleware
- **Session management** with server and client-side utilities
- **Loading states** with skeleton screens and overlays
- **Error handling** with error boundaries and user-friendly messages
- **Real-time capabilities** ready for live dashboard updates

## Tech Stack

- **Next.js 16** (App Router) + React Server Components
- **TypeScript** for type safety
- **Tailwind CSS** + **shadcn/ui** for styling
- **Supabase** for authentication, database, and real-time features
- **TanStack Table** for advanced data tables
- **Zod** for form validation and schema validation
- **@supabase/ssr** for server-side rendering and route protection

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- A Supabase account (free tier works great)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd dashboard
npm install
```

### 2. Set Up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **API** in your Supabase dashboard
4. Copy your **Project URL** and **anon/public key**

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Note:** Never commit `.env.local` to version control. It's already included in `.gitignore`.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Create Your First User

1. Navigate to the registration page
2. Sign up with your email and password
3. Check your email for the confirmation link (if email confirmation is enabled)
4. Sign in and access the dashboard

## Project Structure

```
.
├── src/
│   ├── app/                    # Next.js App Router routes
│   │   ├── auth/
│   │   │   ├── login/          # Login page
│   │   │   ├── register/       # Registration page
│   │   │   └── forgot-password/ # Password reset page
│   │   ├── dashboard/          # Main dashboard (protected)
│   │   ├── layout.tsx          # Root layout with providers
│   │   └── page.tsx            # Landing page
│   ├── components/              # Reusable UI components
│   │   ├── auth/               # Auth-specific components
│   │   ├── loading/            # Loading skeletons and overlays
│   │   ├── providers/          # Context providers
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/                    # Utilities and configurations
│   │   ├── supabase.ts         # Supabase browser client
│   │   ├── supabase-server.ts  # Supabase server client
│   │   ├── utils.ts            # Helper functions
│   │   ├── errors.ts           # Error handling utilities
│   │   ├── validations.ts      # Zod validation schemas
│   │   └── env.ts              # Environment variable validation
│   ├── types/                  # TypeScript type definitions
│   │   ├── index.ts            # Central type exports
│   │   ├── auth.ts             # Authentication types
│   │   ├── user.ts             # User-related types
│   │   ├── api.ts              # API response types
│   │   ├── common.ts           # Common utility types
│   │   ├── dashboard.ts        # Dashboard data types
│   │   └── supabase.ts         # Supabase database types
│   ├── styles/                 # Design system tokens
│   │   └── README.md           # Token documentation
│   └── hooks/                  # Custom React hooks
│       ├── use-auth.ts         # Authentication operations
│       ├── use-session.ts      # Session management
│       └── use-loading.ts      # Loading state management
├── middleware.ts               # Next.js middleware for route protection
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## Design System

This project uses a **three-layer token architecture**:

1. **Foundation Tokens** → Raw values (colors, spacing, typography)
2. **Semantic Tokens** → Meaning-based tokens (bg-surface, text-default)
3. **Component Tokens** → Component-specific tokens (button-primary-bg)

See `src/styles/README.md` for detailed documentation.

### Brand Colors

- **Primary**: `#1B3C53` (Dark teal)
- **Surface**: `#FAF3E1` (Cream)
- **Text on Dark**: `#FFF8DE` (Warm off-white)

## Supabase Setup

### Database Schema

Supabase automatically creates the `auth.users` table. For custom tables, use the Supabase SQL Editor:

```sql
-- Example: Create a customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see only their own customers
CREATE POLICY "Users can view own customers"
  ON customers FOR SELECT
  USING (auth.uid() = user_id);
```

### Authentication

Supabase Auth handles:
- User registration and login
- Email verification
- Password reset
- Session management
- JWT tokens

**Route Protection:**
- Protected routes (`/dashboard`) require authentication
- Unauthenticated users are redirected to `/auth/login`
- Authenticated users accessing auth routes are redirected to `/dashboard`
- Middleware validates Supabase sessions using `@supabase/ssr`
- Session validation happens on every request for protected routes

**Session Management:**
- Server-side: Use `getServerUser()` or `getServerSession()` in server components
- Client-side: Use `useSession()` hook in client components
- Automatic session refresh via middleware
- Sessions are stored in HTTP-only cookies for security

### Real-time Features

Supabase provides real-time subscriptions out of the box:

```typescript
const { data, error } = await supabase
  .channel('customers')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'customers' },
    (payload) => console.log('New customer!', payload.new)
  )
  .subscribe();
```

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Authentication Flow

1. **Registration**: User signs up → Supabase creates account → Email confirmation (if enabled) → Auto sign-in or redirect to check email
2. **Login**: User signs in → Supabase validates credentials → Session created → Tokens stored in cookies → Redirect to dashboard
3. **Route Protection**: Middleware validates session on each request → Redirects unauthenticated users → Refreshes expired sessions
4. **Session Management**: Server components use `getServerUser()`, client components use `useSession()` hook

### Error Handling

- **Error Boundaries**: React Error Boundaries catch component errors
- **User-Friendly Messages**: Supabase errors are mapped to readable messages
- **Development Logging**: Errors logged to console in development
- **Production Ready**: Error handling can be extended with services like Sentry

### Loading States

- **Route Loading**: Next.js `loading.tsx` files for route transitions
- **Component Skeletons**: Dashboard skeleton components for better UX
- **Global Loading**: `LoadingProvider` for app-wide loading states
- **Auth Loading**: Loading overlays during authentication operations

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- **Netlify**: Use Next.js build settings
- **Railway**: Automatic Next.js detection
- **AWS Amplify**: Configure build settings for Next.js
- **Docker**: Use Next.js official Docker image

**Important:** Always set environment variables in your deployment platform's settings.

## Troubleshooting

### Authentication Issues

**Problem:** Users can't sign in after registration
- **Solution:** Check if email confirmation is enabled in Supabase. If enabled, users must confirm their email before signing in.

**Problem:** Middleware redirects authenticated users
- **Solution:** Verify environment variables are set correctly. Check browser console for errors.

**Problem:** Session expires immediately
- **Solution:** Ensure cookies are being set correctly. Check browser DevTools → Application → Cookies.

### Build Issues

**Problem:** `Missing required environment variables` error
- **Solution:** Create `.env.local` file with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

**Problem:** TypeScript errors after installation
- **Solution:** Run `npm install` again and ensure all dependencies are installed.

### Development Issues

**Problem:** Hot reload not working
- **Solution:** Restart the dev server with `npm run dev`.

**Problem:** Styling not applying
- **Solution:** Clear `.next` folder and restart: `rm -rf .next && npm run dev`.

## Security Best Practices

- ✅ Environment variables are never committed to version control
- ✅ Supabase sessions are validated on every request via middleware
- ✅ HTTP-only cookies for session storage (handled by `@supabase/ssr`)
- ✅ Security headers configured in `next.config.ts`
- ✅ Error messages don't expose sensitive information
- ✅ Input validation with Zod schemas
- ✅ TypeScript strict mode enabled

## Performance Considerations

- **Server Components**: Used for data fetching to reduce client bundle size
- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Use Next.js `Image` component for optimized images
- **Lazy Loading**: Components loaded on demand
- **Caching**: Supabase client instances are optimized for SSR

## Roadmap

- [x] Supabase authentication (email/password)
- [x] Route protection with middleware
- [x] Password reset functionality
- [ ] Customer and subscription data models
- [ ] Real-time dashboard metrics
- [ ] Advanced analytics and reporting
- [ ] Team and workspace settings
- [ ] Export functionality (CSV, PDF)
- [ ] Email notifications
- [ ] Two-factor authentication

## Contributing

This is a portfolio project demonstrating professional full-stack development practices. Feel free to:

- Fork the repository
- Submit issues and feature requests
- Create pull requests for improvements
- Use as a template for your own projects

## License

MIT
