# Technical Specifications Document (TSD)

## 1. Technology Stack

### Frontend
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 14 (App Router) | SSR/SSG flexibility, React ecosystem, file-based routing, API routes |
| Language | TypeScript | Type safety across full stack; reduces runtime errors |
| Styling | Tailwind CSS | Utility-first, fast iteration, no context switching |
| Code Editor | Monaco Editor (VS Code engine) | Industry-standard, syntax highlighting, JS/TS support out of the box |
| State Management | Zustand | Lightweight, minimal boilerplate for session/challenge state |
| Key Libraries | React Query (server state), Framer Motion (animations), React Confetti (gamification moments) |

### Backend
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Runtime | Node.js (via Next.js API routes) | Unified codebase; no separate backend service for MVP |
| Framework | Next.js API Routes / Route Handlers | Sufficient for MVP; avoids microservice overhead |
| ORM | Prisma | Type-safe DB access, excellent Postgres support, migration tooling |
| Authentication | NextAuth.js (Auth.js v5) | Battle-tested, session management, easy OAuth expansion |
| Validation | Zod | Schema validation for API inputs and AI response shapes |
| AI Abstraction | Vercel AI SDK | Unified interface for multiple LLM providers; streaming support |

### Infrastructure
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Database | CockroachDB Serverless (or Aurora Serverless v2) | Scales to zero, Postgres-compatible, cost-effective at low traffic |
| Hosting | AWS ECS (Fargate) or AWS App Runner | Containerized Next.js; auto-scaling; no server management |
| Code Execution Sandbox | Piston API (self-hosted or public) | Open-source, multi-language sandboxed execution; avoids security complexity |
| File Storage | AWS S3 | Static assets, user avatars (future) |
| CI/CD | GitHub Actions | Automated test + deploy pipeline |
| Monitoring | AWS CloudWatch + Sentry | Error tracking and infra metrics |
| CDN | AWS CloudFront | Edge caching for static assets |

---

## 2. System Architecture

```
┌─────────────────────────────────────────────┐
│              Browser Client                  │
│  Next.js (React) — Monaco Editor            │
│  Zustand state | React Query cache          │
└──────────────────┬──────────────────────────┘
                   │ HTTPS (REST / Server Actions)
┌──────────────────▼──────────────────────────┐
│           Next.js Server (AWS)               │
│  API Routes / Route Handlers                 │
│  NextAuth.js (session middleware)            │
│  Vercel AI SDK (LLM abstraction layer)       │
│  Prisma ORM                                  │
└────────┬──────────────┬───────────────┬──────┘
         │              │               │
┌────────▼───┐  ┌───────▼──────┐  ┌────▼──────────────┐
│  CockroachDB│  │  AI APIs     │  │  Piston API        │
│  (Postgres) │  │  DeepSeek    │  │  (Code Execution   │
│             │  │  Qwen        │  │   Sandbox)         │
│             │  │  Gemini      │  │                    │
└─────────────┘  └──────────────┘  └────────────────────┘
```

### Key Architectural Decisions
- **Monolith for MVP:** Single Next.js app handles frontend + backend. No microservices until scale demands it.
- **AI provider abstraction:** All LLM calls routed through a single `ai-service` module; provider swapped via env config with no code changes.
- **Sandboxed execution isolated:** Piston API runs in a separate container; Next.js server never executes user code directly.
- **Adaptive engine as a server-side service module:** Not a separate microservice, but isolated as `lib/adaptive-engine` for future extraction.

---

## 3. Database Schema

### Entity: Users
```sql
CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    display_name  TEXT,
    streak_count  INT DEFAULT 0,
    last_active   TIMESTAMPTZ,
    tier          TEXT DEFAULT 'free',    -- 'free' | 'base' | 'advanced'
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### Entity: Languages
```sql
CREATE TABLE languages (
    id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug  TEXT UNIQUE NOT NULL,   -- 'javascript', 'react', 'swift', etc.
    name  TEXT NOT NULL,
    active BOOLEAN DEFAULT true
);
```

### Entity: Concepts
```sql
CREATE TABLE concepts (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    language_id  UUID REFERENCES languages(id),
    slug         TEXT NOT NULL,           -- 'promises', 'closures', 'dom-events'
    name         TEXT NOT NULL,
    description  TEXT,
    difficulty   INT CHECK (difficulty BETWEEN 1 AND 5),
    prerequisites UUID[],                 -- concept IDs that should be learned first
    created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

### Entity: UserConceptSkill (Adaptive Engine State)
```sql
CREATE TABLE user_concept_skills (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
    concept_id   UUID REFERENCES concepts(id),
    score        INT DEFAULT 0 CHECK (score BETWEEN 0 AND 100),
    attempts     INT DEFAULT 0,
    last_attempt TIMESTAMPTZ,
    status       TEXT DEFAULT 'unseen',  -- 'unseen' | 'struggling' | 'in_progress' | 'proficient'
    UNIQUE(user_id, concept_id)
);
```

### Entity: Challenges
```sql
CREATE TABLE challenges (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    concept_id   UUID REFERENCES concepts(id),
    prompt       TEXT NOT NULL,          -- The problem statement shown to user
    analogy      TEXT,                   -- Optional analogy framing
    scaffold     TEXT,                   -- Starter code in editor
    test_cases   JSONB NOT NULL,         -- Array of {input, expected, description}
    difficulty   INT CHECK (difficulty BETWEEN 1 AND 5),
    generated_by TEXT,                   -- 'ai' | 'manual'
    ai_provider  TEXT,                   -- 'deepseek' | 'qwen' | 'gemini'
    created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

### Entity: UserChallengeAttempts
```sql
CREATE TABLE user_challenge_attempts (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES challenges(id),
    code         TEXT NOT NULL,          -- User's submitted code
    passed       BOOLEAN NOT NULL,
    test_results JSONB,                  -- Per-test-case results
    time_taken   INT,                    -- Seconds
    hint_used    BOOLEAN DEFAULT false,
    attempted_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Entity Relationship Summary
- `users` has many `user_concept_skills` (one per concept)
- `users` has many `user_challenge_attempts`
- `languages` has many `concepts`
- `concepts` has many `challenges`
- `challenges` has many `user_challenge_attempts`

---

## 4. API Specifications

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/api/auth/register` | Create new user account | No |
| POST | `/api/auth/login` | Authenticate and issue session | No |
| POST | `/api/auth/logout` | Invalidate session | Yes |
| GET | `/api/auth/session` | Return current session user | Yes |

### Challenge Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| GET | `/api/challenge/next` | Get AI-generated next challenge for user | Yes |
| POST | `/api/challenge/submit` | Submit code solution for evaluation | Yes |
| GET | `/api/challenge/hint` | Request AI-generated hint for current challenge | Yes |

### Progress Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| GET | `/api/progress/skill-map` | Return user's concept skill scores | Yes |
| GET | `/api/progress/streak` | Return current streak and history | Yes |

### Error Response Format
```json
{
  "error": {
    "code": "CHALLENGE_GENERATION_FAILED",
    "message": "Unable to generate a challenge at this time. Please try again.",
    "details": {}
  }
}
```

---

## 5. Security Requirements

### Security Checklist
- [x] HTTPS enforced on all endpoints (AWS ALB + ACM)
- [x] Passwords hashed with bcrypt (cost factor 12)
- [x] CSRF protection via NextAuth.js built-in tokens
- [x] All API routes require valid session token
- [x] Input validation via Zod on all API route handlers
- [x] Rate limiting on AI generation endpoints (10 req/min per user)
- [x] SQL injection prevention via Prisma parameterized queries
- [x] XSS prevention: Monaco editor output sanitized; iframe sandbox attribute on preview pane
- [x] User code executed in isolated Piston sandbox — never on Next.js server
- [x] AI API keys stored in AWS Secrets Manager / environment variables only

---

## 6. Performance & Scalability

### Performance Targets
| Metric | Target |
|--------|--------|
| Page Load (LCP) | < 2.5s |
| API Response (p95) | < 500ms (excl. AI generation) |
| AI Challenge Generation | < 5s (streaming response preferred) |
| Code Execution Round-trip | < 3s |
| Initial JS Bundle | < 150KB gzipped |
| Error Rate | < 1% |

### Scaling Strategy
- **Phase 1 (0–100 users):** Single ECS task or App Runner instance. CockroachDB serverless. Piston public API or single container.
- **Phase 2 (100–1K users):** Add read replica. Cache frequent AI-generated challenges per concept/difficulty. Rate limit AI API calls.
- **Phase 3 (1K+ users):** Extract adaptive engine to separate service. Redis for session/challenge caching. Horizontal ECS scaling.
