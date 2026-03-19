# GoodNews Web App

A news aggregator web application built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Environment Variables

```bash
# Server API URL (optional, defaults to http://localhost:3001)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Architecture

Phase 3 architecture:
- Webapp (port 3000): UI and session management via NextAuth
- Server (port 3001): API endpoints for feeds, auth, bookmarks, comments
- RSS fallback: If server unavailable, webapp fetches RSS directly

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Inter (Google Fonts)
