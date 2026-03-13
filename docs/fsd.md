# Functional Specifications Document (FSD)

## 1. User Stories & Use Cases

### Epic 1: Account Management
| ID | User Story | Acceptance Criteria | Priority |
|----|-----------|-------------------|----------|
| US-01 | As a new user, I want to register with email and password so I can have a persistent learning profile | Registration form validates email format, password min 8 chars; account created in DB; user redirected to onboarding | High |
| US-02 | As a returning user, I want to log in so I can resume my learning progress | Login with valid credentials issues session token; invalid credentials show error; session persists across browser refresh | High |
| US-03 | As a logged-in user, I want to log out so my session is terminated | Session token invalidated server-side; user redirected to landing page | High |

### Epic 2: Onboarding & Language Selection
| ID | User Story | Acceptance Criteria | Priority |
|----|-----------|-------------------|----------|
| US-10 | As a new user, I want to select a programming language to learn so the platform can tailor my experience | User presented with available languages (MVP: JavaScript only); selection stored to profile | High |
| US-11 | As a new user, I want to optionally declare prior experience so the AI can calibrate starting difficulty | Short self-assessment (e.g., "Do you know what a callback is?"); responses used to seed initial skill model | Medium |

### Epic 3: Challenge Engine
| ID | User Story | Acceptance Criteria | Priority |
|----|-----------|-------------------|----------|
| US-20 | As a learner, I want to receive a challenge that tests a JavaScript concept so I can practice actively | AI generates a challenge with a clear problem statement, optional analogy framing, and a code editor scaffold | High |
| US-21 | As a learner, I want to write code in a browser editor and run it so I can test my solution | Monaco/CodeMirror editor with syntax highlighting; "Run" button executes code in sandbox; output shown in side panel | High |
| US-22 | As a learner, I want to see whether my solution passed or failed automated tests so I know if I understood the concept | Test runner returns pass/fail per test case with descriptive messages; overall result recorded to user profile | High |
| US-23 | As a learner, I want an optional hint if I'm stuck so I don't give up | "Hint" button requests AI-generated contextual hint; hint shown without revealing the full answer | Medium |
| US-24 | As a learner, I want to see a live preview panel for DOM-related challenges so I can see my code affect the UI | Sandboxed iframe renders HTML/CSS/JS output in real time as user edits code | High |

### Epic 4: Adaptive Engine
| ID | User Story | Acceptance Criteria | Priority |
|----|-----------|-------------------|----------|
| US-30 | As a learner, I want the platform to recognize when I'm struggling with a concept and give me more practice on it | AI engine detects repeated failures on a concept; generates additional problems of varying difficulty on same concept | High |
| US-31 | As a learner, I want the platform to recognize when I've mastered a concept and move me forward | AI engine detects consistent success; marks concept as proficient; introduces next concept in learning graph | High |
| US-32 | As a learner, I want my learning style to influence how problems are presented | Engine identifies preference patterns (analogy-first vs. code-first, trial-and-error vs. methodical); adapts presentation accordingly | Medium |

### Epic 5: Gamification & Progress
| ID | User Story | Acceptance Criteria | Priority |
|----|-----------|-------------------|----------|
| US-40 | As a learner, I want to see my daily streak so I'm motivated to return each day | Streak count displayed on dashboard; increments on daily challenge completion; resets after missed day | Medium |
| US-41 | As a learner, I want to see a skill map of JavaScript concepts so I understand my overall progress | Visual map of JS concept nodes (e.g., Variables, Functions, Closures, Promises, DOM); each node colored by mastery level | Medium |
| US-42 | As a learner, I want to earn perks or badges for milestones so learning feels rewarding | Milestones: first challenge, first concept mastered, 7-day streak, etc.; badges displayed on profile | Low |

---

## 2. Detailed User Flows

### Flow 1: New User Registration & Onboarding
1. User lands on marketing/landing page
2. Clicks "Get Started" → Registration form
3. Enters email + password → Account created
4. Redirected to onboarding: "What do you want to learn?" → Selects JavaScript
5. Optional: Short self-assessment (3–5 questions to calibrate starting skill model)
6. Redirected to dashboard → First challenge generated and presented

### Flow 2: Challenge Session (Core Loop)
1. User arrives at dashboard; AI selects next concept based on skill model
2. Challenge presented: problem statement + optional analogy + code editor (pre-scaffolded)
3. User writes solution in editor
4. User clicks "Run" → code executes in sandbox → test results shown
5. **Pass path:** Success feedback shown; performance recorded; next challenge queued
6. **Fail path:** Failure feedback shown with descriptive test output; hint available; user may retry or skip
7. After N challenges in session, session summary shown: concepts covered, pass rate, streak status

### Flow 3: Adaptive Engine Triggering
1. User fails same concept 2+ times consecutively
2. Engine flags concept as "struggling"
3. AI generates: (a) a simpler version of the same problem, (b) an analogy-driven question on the concept, (c) a related foundational concept challenge
4. User works through simplified problems
5. On recovery (2+ consecutive passes), engine resumes normal progression

### Flow 4: DOM Manipulation Challenge (Live Preview)
1. Challenge loaded with split-pane layout: editor left, live preview right
2. User edits JS/HTML in editor
3. Preview iframe updates in real time (debounced)
4. Test runner validates DOM state (e.g., element exists, event fires correctly)
5. Pass/fail reported

---

## 3. System Behavior & Business Rules

### Challenge Generation Rules
- The AI must always specify the target concept being tested in challenge metadata (not shown to user, used for tracking)
- Challenges must include at least 2 automated test cases
- Analogy-framing is used for abstract concepts (async, closures, prototypes) and is optional for syntax-level challenges
- A challenge may not repeat exactly within a user's session history (AI seeded with prior challenge IDs)

### Adaptive Engine Rules
- Concept skill score: 0–100, updated after each challenge (weighted by recency and difficulty)
- Score < 40: concept flagged as "struggling" → generate easier variants + more reps
- Score 40–70: concept "in progress" → continue normal difficulty progression
- Score > 70: concept "proficient" → advance to next concept in dependency graph
- Difficulty adjustment is per-concept, not global

### Authentication & Authorization Rules
- All challenge, progress, and profile routes require authentication
- Free tier: access to first 3 concepts per language; further concepts require subscription (MVP: no paywall enforced — all content free during validation phase)
- Sessions expire after 7 days of inactivity

---

## 4. Error Handling & Edge Cases

| Scenario | Expected Behavior | User Feedback |
|----------|-------------------|---------------|
| AI API fails to generate challenge | Retry once; fallback to cached challenge pool | "Having trouble generating your challenge. Trying again..." |
| Code execution timeout (infinite loop) | Kill process after 5s | "Your code timed out. Check for infinite loops." |
| Code execution throws runtime error | Capture stderr, return to user | Show error message and line number in editor |
| User submits empty editor | Block submission | "Write some code before running!" |
| Network disconnection mid-session | Local state preserved; resync on reconnect | "Reconnecting..." banner |
| Session expires during challenge | Prompt re-login; preserve current challenge state in localStorage | "Your session expired. Log back in to continue." |
| User attempts unauthorized route | Redirect to login | N/A (silent redirect) |
| AI generates malformed challenge JSON | Validate schema server-side; reject and retry | Transparent to user; retry happens server-side |
