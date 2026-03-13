# Skillban

An AI-first adaptive coding learning platform.

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Database:** CockroachDB (Postgres-compatible) with Prisma ORM
- **Authentication:** NextAuth.js (Auth.js v5)
- **Validation:** Zod
- **Styling:** Tailwind CSS

## Prerequisites

- Node.js 18+
- npm or yarn
- CockroachDB instance (or any Postgres-compatible database)

## Getting Started

### 1. Clone and Install Dependencies

```bash
git clone <repo-url>
cd skillban
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Configure the following required variables in `.env`:

- `DATABASE_URL` - Your CockroachDB/Postgres connection string
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - `http://localhost:3000` for development

### 3. Database Setup

Run Prisma migrations to create the database schema:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. (Optional) Seed Database

To seed initial languages and concepts:

```bash
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new user account |
| POST | `/api/auth/[...nextauth]` | NextAuth.js handlers (login, session, etc.) |

### Challenges

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/challenge/next` | Get next adaptive challenge |
| POST | `/api/challenge/submit` | Submit code for evaluation |

### Progress

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/progress/skill-map` | Get user's concept skill map |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Route Handlers
│   │   ├── auth/          # Authentication endpoints
│   │   ├── challenge/     # Challenge endpoints
│   │   └── progress/      # Progress endpoints
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/                    # Shared utilities
│   ├── auth.ts            # NextAuth.js configuration
│   ├── prisma.ts          # Prisma client singleton
│   └── validators.ts      # Zod validation schemas
└── types/                  # TypeScript type definitions
prisma/
├── schema.prisma          # Database schema
└── migrations/            # Database migrations
```

## Development Notes

### MVP Scaffold Status

This scaffold includes:

- ✅ Next.js 14 with App Router and TypeScript
- ✅ Prisma ORM with full database schema
- ✅ NextAuth.js v5 for authentication
- ✅ API routes with Zod validation
- ✅ Mock challenge generation/evaluation (AI integration pending)

### Coming Soon

- AI-powered challenge generation (DeepSeek, Qwen, Gemini)
- Piston API integration for code execution
- Adaptive learning engine
- Frontend UI components

## Database Schema

The database consists of 6 core tables:

1. **users** - User accounts and profile data
2. **languages** - Programming languages (JavaScript, React, etc.)
3. **concepts** - Learning concepts per language
4. **user_concept_skills** - User's skill level per concept
5. **challenges** - Coding challenges linked to concepts
6. **user_challenge_attempts** - User submissions and results

## Contributing

This is an MVP scaffold. Please ensure all changes include:

1. TypeScript types
2. Zod validation for API inputs
3. Prisma schema updates (if applicable)

## License

Private - All rights reserved
