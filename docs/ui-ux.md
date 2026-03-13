# UI/UX Design Specifications

## 1. Information Architecture & Sitemap

```
Landing Page (public)
├── /login
├── /register
└── /app (authenticated)
    ├── /app/dashboard          — Skill map + streak + next challenge CTA
    ├── /app/challenge          — Active challenge view (editor + test runner + preview)
    ├── /app/progress           — Detailed concept breakdown and history
    └── /app/settings           — Profile, language selection, account
```

### Public vs Authenticated
- `/`, `/login`, `/register` — public
- All `/app/*` routes — require authenticated session; redirect to `/login` if unauthenticated

---

## 2. Wireframes

### Screen 1: Dashboard
```
┌───────────────────────────────────────────────────────────┐
│  [Skillban logo]              [Streak 🔥 7]   [Avatar ▼] │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  JavaScript Skill Map                                     │
│                                                           │
│  ○ Variables & Types    ●●● Proficient                    │
│  ○ Functions            ●●○ In Progress                   │
│  ○ Closures             ●○○ Struggling                    │
│  ○ Promises / Async     ○○○ Not Started                   │
│  ○ DOM Manipulation     ○○○ Not Started                   │
│  ...                                                      │
│                                                           │
│  ┌──────────────────────────────┐                        │
│  │  Ready for your next         │                        │
│  │  challenge?                  │                        │
│  │                              │                        │
│  │  Topic: Closures 🎯          │                        │
│  │  Difficulty: ★★☆☆☆           │                        │
│  │                              │                        │
│  │  [  Start Challenge  ]       │                        │
│  └──────────────────────────────┘                        │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Screen 2: Challenge View (Code Challenge)
```
┌───────────────────────────────────────────────────────────┐
│  [← Dashboard]   Closures — Challenge 3/5    [🔥 7]      │
├──────────────────────────────┬────────────────────────────┤
│                              │                            │
│  Problem Statement           │  Output / Test Results     │
│  ─────────────────           │  ───────────────────────   │
│  "Imagine a backpack that    │                            │
│  remembers what you packed   │  [Run Code]                │
│  even after you leave home.  │                            │
│  Write a function that        │  ✅ Test 1: Passed         │
│  creates a counter using     │  ❌ Test 2: Expected 3,    │
│  closure..."                 │     got undefined          │
│                              │  ❌ Test 3: Failed         │
│  ─────────────────           │                            │
│                              │  [Hint]  [Skip]            │
│  Code Editor (Monaco)        │                            │
│  ─────────────────           │                            │
│  function makeCounter() {    │                            │
│    // your code here         │                            │
│  }                           │                            │
│                              │                            │
│                              │                            │
│  [  Run & Submit  ]          │                            │
│                              │                            │
└──────────────────────────────┴────────────────────────────┘
```

### Screen 3: Challenge View (DOM / Live Preview)
```
┌───────────────────────────────────────────────────────────┐
│  [← Dashboard]   DOM Events — Challenge 1    [🔥 7]      │
├──────────────────────────────┬────────────────────────────┤
│                              │                            │
│  Problem Statement           │  Live Preview              │
│  ─────────────────           │  ────────────              │
│  "Make the button change     │  ┌──────────────────────┐  │
│  its text when clicked."     │  │                      │  │
│                              │  │  [  Click me!  ]     │  │
│  Code Editor (Monaco)        │  │                      │  │
│  ─────────────────           │  └──────────────────────┘  │
│  document.querySelector      │                            │
│    ('button')                │  Test Results              │
│    .addEventListener(        │  ────────────              │
│      'click', () => {        │  ⏳ Run code to evaluate   │
│        // your code          │                            │
│      }                       │  [Hint]  [Skip]            │
│    );                        │                            │
│                              │                            │
│  [  Run & Submit  ]          │                            │
└──────────────────────────────┴────────────────────────────┘
```

### Screen 4: Analogy / Conceptual Question
```
┌───────────────────────────────────────────────────────────┐
│  [← Dashboard]   Promises — Warmup           [🔥 7]      │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Quick question before we dive in:                        │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                                                     │  │
│  │  You need to make breakfast:                        │  │
│  │  boil eggs, toast bread, and brew coffee.           │  │
│  │                                                     │  │
│  │  Do you prefer to:                                  │  │
│  │                                                     │  │
│  │  ○  Do one thing at a time, wait for each          │  │
│  │     to finish before starting the next             │  │
│  │                                                     │  │
│  │  ○  Start all three at once and wait for           │  │
│  │     all to finish (breakfast is ready faster)      │  │
│  │                                                     │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│                             [  Continue →  ]              │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## 3. Design System Guidelines

### Visual Tone
Dark, focused, and technical — like a game UI meets a modern code editor. Inspired by VS Code dark theme + game HUD elements. Not corporate. Not playful. Sharp and purposeful.

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#6366F1` | Buttons, active states, highlights (Indigo) |
| Primary Hover | `#4F46E5` | Interactive hover |
| Secondary | `#F59E0B` | Streak, gamification accents (Amber) |
| Background | `#0F0F13` | Page background (near-black) |
| Surface | `#1A1A24` | Cards, panels, editor background |
| Surface Raised | `#24243A` | Modals, dropdowns |
| Text Primary | `#F1F5F9` | Headings, body text |
| Text Secondary | `#94A3B8` | Captions, metadata, placeholders |
| Success | `#22C55E` | Passed tests, proficient concepts |
| Warning | `#F59E0B` | Struggling concepts, hints |
| Error | `#EF4444` | Failed tests, errors |
| Border | `#2E2E45` | Dividers, card outlines |

### Typography
| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 | Inter | 2rem | 700 |
| H2 | Inter | 1.5rem | 600 |
| H3 | Inter | 1.25rem | 600 |
| Body | Inter | 1rem | 400 |
| Caption | Inter | 0.875rem | 400 |
| Code | JetBrains Mono | 0.9rem | 400 |
| Button | Inter | 0.9rem | 600 |

### Spacing Scale
Base unit: 4px → Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96

### Component States
| Component | Default | Hover | Active | Disabled |
|-----------|---------|-------|--------|----------|
| Button (Primary) | Indigo bg | Darker indigo | Scale 0.98 | 40% opacity |
| Button (Secondary) | Surface bg, indigo border | Indigo bg 10% | Scale 0.98 | 40% opacity |
| Input | Surface bg, border | Border brightens | Indigo border | 40% opacity |
| Challenge Card | Surface | Surface Raised | — | — |

### Responsive Breakpoints
| Breakpoint | Width | Layout Changes |
|------------|-------|---------------|
| Mobile | < 768px | Single column; editor full-width; preview below |
| Tablet | 768–1024px | Two-column challenge view, narrower split |
| Desktop | > 1024px | Full two-column split; sidebar skill map visible |

---

## 4. Interaction & Animation Guidelines

### Transitions
- Page transitions: Fade + slight upward slide, 200ms ease-out
- Modal open/close: Scale from 0.95 → 1.0 + fade, 150ms
- Test result reveal: Staggered per-test-case animation (50ms delay between each)
- Concept mastery change: Pulse animation on skill map node + color transition

### Loading States
- Challenge generation: Skeleton loader in problem statement area + "Generating your challenge..." text with animated dots
- Code execution: Spinner in test results panel + "Running..." label
- Page load: Full-page skeleton matching dashboard layout

### Notifications / Toasts
- Position: Bottom-right
- Duration: 3s auto-dismiss (errors: 5s, require manual dismiss)
- Types: Success (green), Error (red), Info (indigo), Warning (amber)
- Dismiss: Click X or swipe right

### Gamification Moments
- First challenge passed: Confetti burst (react-confetti, 2s)
- Streak milestone (7, 30 days): Full-screen modal with animated badge reveal
- Concept mastered: Skill map node pulses + "Mastered!" toast
- Session complete: Summary card slides up from bottom with stats
