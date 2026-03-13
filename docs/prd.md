# Product Requirements Document (PRD)

## 1. Problem Statement & Vision

### Problem Statement
Developers with expertise in one domain (e.g., backend, data engineering) struggle to learn new languages or frontend frameworks because existing platforms either (a) start from absolute beginner level ignoring existing knowledge, (b) rely on static, predefined curricula that don't adapt to how a specific person learns, or (c) are so interview-focused they miss the conceptual understanding needed for real-world development. The result: experienced developers plateau or quit before reaching proficiency in new domains.

### Vision Statement
Skillban is the learning platform that meets you where you are, learns how you think, and adapts in real time — so every developer can master any language at their own pace, in their own style.

---

## 2. Target Audience & User Personas

### Persona 1
- **Name & Role:** Falcon — Senior Data Engineer
- **Background:** Strong Python, Apache Spark, distributed systems. Understands data structures and algorithms. Zero frontend experience.
- **Goal:** Master JavaScript fundamentals and React to build frontend skills independently of LLM assistance.
- **Pain Point:** Existing platforms are either too beginner-focused (boring) or too interview-focused (irrelevant). Static curricula don't respect prior knowledge.
- **How they'd use the app:** Self-directed learning sessions. Skip or breeze through concepts they already understand by analogy. Spend more time on genuinely new abstractions like the DOM, async patterns, React's component model.

### Persona 2
- **Name & Role:** Alex — Backend Developer wanting to go mobile
- **Background:** Java/Spring experience. Wants to learn Kotlin for Android or Swift for iOS.
- **Goal:** Understand mobile development paradigms — lifecycle, state management, UI patterns.
- **Pain Point:** Mobile development has a steep learning curve and most resources assume no prior programming knowledge.
- **How they'd use the app:** Use existing OOP/Java knowledge as a bridge. Get challenges that explicitly map mobile concepts to familiar backend patterns.

### Persona 3
- **Name & Role:** Maya — Bootcamp grad leveling up
- **Goal:** Go beyond the basics — deepen JavaScript knowledge into async patterns, closures, prototypal inheritance.
- **Pain Point:** Finished a bootcamp but doesn't feel confident. Needs more reps on specific concepts, not a full course restart.

---

## 3. Scope & High-Level Features

### In Scope (MVP)
| # | Feature | Description | Priority |
|---|---------|-------------|----------|
| 1 | User Authentication | Register, log in, session management | High |
| 2 | Language Selection | User selects JavaScript as their learning path | High |
| 3 | AI Challenge Generation | AI dynamically generates concept-appropriate coding challenges and analogy questions | High |
| 4 | In-Browser Code Runner | User writes code in editor; automated test runner evaluates correctness | High |
| 5 | Adaptive Engine (MVP) | Track per-concept performance; adjust difficulty and volume of subsequent challenges | High |
| 6 | Progress Persistence | User's challenge history, scores, and concept mastery stored per account | High |
| 7 | Streak System | Daily streak tracking, visual indicator, basic gamification | Medium |
| 8 | Concept Skill Map | Visual overview of which JS concepts the user has attempted and their assessed mastery level | Medium |

### Out of Scope (Future Releases)
| # | Feature | Reason for Deferral |
|---|---------|-------------------|
| 1 | Additional languages (React, Swift, Kotlin, Java) | MVP validates the AI engine on JS first |
| 2 | Subscription / payments | Validate product before monetizing |
| 3 | Leaderboards / social features | Not core to adaptive learning loop |
| 4 | Video or written lesson content | Concept-first challenge approach tested first |
| 5 | Mobile app | Web-first |
| 6 | Interview prep mode | Different product positioning; Phase 2+ |

---

## 4. Assumptions, Constraints & Dependencies

### Assumptions
- Users have basic programming literacy in at least one language
- AI APIs (DeepSeek, Qwen, Gemini) can reliably generate high-quality, contextually relevant challenges
- In-browser code execution can be securely sandboxed without a heavy infrastructure footprint
- Freemium monetization is sufficient to cover infrastructure at scale

### Constraints
- Solo developer — scope must remain tightly controlled
- No hard launch deadline — quality of AI adaptive engine takes priority over speed
- Budget must remain self-sustaining (~$35–135/mo infrastructure target)

### Dependencies
- AI API access: DeepSeek / Qwen / Gemini (at least one provider operational at launch)
- Secure code execution: Piston API, Judge0, or WASM sandbox
- Auth: NextAuth.js or Supabase Auth
- Hosting: AWS (ECS/EC2 + RDS/Aurora/CockroachDB)

---

## 5. Success Metrics & KPIs

| Metric | Definition | Target | Measurement Method |
|--------|-----------|--------|-------------------|
| Challenge Completion Rate | % of started challenges completed | >70% | DB events |
| Adaptive Trigger Rate | % of sessions where difficulty was adjusted by AI | >50% | AI engine logs |
| Daily Active Usage | Founder uses app daily for personal JS learning | 5+ days/week | Session logs |
| Concept Mastery Progression | User shows measurable improvement on previously failed concept areas | Improvement in 2+ concepts within first week | Adaptive engine scoring |
| Session Length | Average time spent per learning session | 15–30 min | Session timestamps |
