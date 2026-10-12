# বাজার দর | BazarDor

**BazarDor** helps people in Bangladesh check everyday product prices and compare rates across local markets. Browse in Bengali, see how prices have changed, and explore market-by-market details.

## Key features

1. **Today’s prices at a glance** — Browse everyday products with current prices and their increase, decrease, or no-change status.
2. **Price movement highlights** — See products with the biggest price rises and falls on the home page.
3. **Browse by category** — Explore products by category and sort them from lowest to highest price, or vice versa.
4. **Compare market prices** — View a product’s minimum, maximum, and average price, with market- and division-level price ranges.
5. **Accounts and profile** — Sign up and sign in with email and password or configured Google and GitHub providers; signed-in users can update their profile.

## Technologies

- **Next.js 16** — App Router and server-rendered pages
- **React 19** — UI components and interactive client-side features
- **Tailwind CSS 4** — Styling and responsive layouts
- **Better Auth** — Email/password and social authentication
- **MongoDB** — Authentication data storage
- **React Icons**, **React Hot Toast**, and **react-marquee-text** — Icons, notifications, and scrolling market updates
- **BazarDor product API** — Product, category, and market-price data

## Getting started

### Requirements

- Node.js and npm
- A MongoDB database for authentication
- A BazarDor product API endpoint (the app has a default endpoint and fallback)

### Install and run

```bash
npm ci
```

Create `.env.local` in the project root and add the required values:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017
BETTER_AUTH_SECRET=replace-with-a-random-secret-at-least-32-characters-long
BETTER_AUTH_URL=http://localhost:3000
```

`BETTER_AUTH_SECRET` must contain at least 32 characters. For a hosted MongoDB deployment, use its connection URI for `MONGODB_URI`.

Then start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable                                    | Required               | Purpose                                                             |
| ------------------------------------------- | ---------------------- | ------------------------------------------------------------------- |
| `MONGODB_URI`                               | Yes for authentication | MongoDB connection URI                                              |
| `BETTER_AUTH_SECRET`                        | Yes for authentication | Better Auth secret; at least 32 characters                          |
| `BETTER_AUTH_URL`                           | Recommended            | App origin used by Better Auth; defaults to `http://localhost:3000` |
| `MONGODB_DATABASE`                          | No                     | Authentication database name; defaults to `bazardor-db`             |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | No                     | Enable GitHub sign-in when both are set                             |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | No                     | Enable Google sign-in when both are set                             |
| `BAZARDOR_API_URL`                          | No                     | Override the primary product API endpoint                           |

Configure the callback URL for each social provider as `<BETTER_AUTH_URL>/api/auth/callback/<provider>` (for example, `/api/auth/callback/github`). Social sign-in is available only when that provider’s client ID and secret are configured.

## Available scripts

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm run start  # Serve the production build
npm run lint   # Run ESLint
```

## Project Live Link

https://bazar-dor-app-gamma.vercel.app/
