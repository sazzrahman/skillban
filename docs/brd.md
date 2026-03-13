# Business Requirements Document (BRD)

## 1. Executive Summary

### Summary
Skillban is an AI-first adaptive learning web application that teaches programming concepts through hands-on challenges — not passive reading. Unlike static curriculum platforms (Codecademy, Exercism, Scrimba), Skillban dynamically generates problems, analogies, and learning paths tailored to each individual user's behavior and performance. The core differentiator is an AI engine that recognizes a learner's style and continuously adapts — much like how different players complete the same video game through entirely different strategies. The platform targets developers who already have programming foundations in one domain and want to expand into new languages or frameworks.

---

## 2. Business Objectives

### Primary Objectives
1. Build a self-sustaining, affordable learning platform funded by subscription revenue sufficient to cover infrastructure costs.
2. Validate the adaptive AI learning algorithm as the core product innovation — MVP is explicitly an experiment in AI-driven personalization.
3. Establish a personal learning tool for the founder while simultaneously building a product others can benefit from.

### Revenue Model
| Tier | Price | Includes |
|------|-------|----------|
| Free | $0 | Limited challenges, single language (JS), no adaptive AI |
| Base Subscription | ~$5–10/mo (TBD) | All standard courses, streak system, gamification, basic AI adaptation |
| Advanced Course Add-on | Per course (TBD) | Fully dynamic AI evaluation, deeper adaptive engine, advanced topics |

### Revenue Projections
| Timeframe | Milestone | Revenue Estimate |
|-----------|-----------|-----------------|
| Month 1–3 | MVP live, founder + early testers | ~$0 (self-funded validation) |
| Month 4–6 | First paying users, JS course stable | Cover hosting costs |
| Month 7–12 | Additional languages, refined AI engine | Early recurring revenue |
| Year 2 | Multi-language catalog, community features | Growth phase |

---

## 3. Market & Competitor Analysis

### Market Context
- Market size: Global e-learning market projected at $400B+ by 2026; developer education is a high-growth segment.
- Growth trends: AI-powered personalization is an emerging differentiator; most incumbents still rely on static curricula.
- Key drivers: Demand for self-paced learning, LLM-assisted development increasing need for conceptual understanding over syntax memorization.

### Competitor Landscape
| Competitor | Type | Strengths | Weaknesses |
|-----------|------|-----------|------------|
| Codecademy | Interactive learning | Polished UX, broad course catalog | Static curriculum, no real adaptation |
| LeetCode | Interview prep | Large problem set, community | Interview-focused, not concept-first |
| Exercism | Practice-based | Mentor feedback, multi-language | No AI, slow feedback loop |
| Scrimba | Video + code | Engaging format | Video-dependent, not adaptive |
| Brilliant | Concept-first learning | Strong analogy-driven teaching | Not code-execution focused |

### Your Differentiators
1. **AI-first adaptive engine** — dynamically generates challenges, adjusts difficulty, and recognizes individual learning styles in real time.
2. **Concept-first, analogy-driven pedagogy** — abstract concepts introduced through real-world analogies before code, not the other way around.
3. **No predefined question banks** — content is generated on the fly; the platform never runs out of problems or repeats itself.

---

## 4. Project Timeline & Budget

### Phase 1: MVP Development
| Milestone | Deliverable |
|-----------|------------|
| Week 1 | Auth, user accounts, basic UI shell |
| Week 1–2 | JavaScript challenge engine + in-browser code runner |
| Week 2 | AI evaluation layer (challenge generation + answer assessment) |
| Week 2–3 | Basic adaptive logic (track performance, adjust difficulty) |
| Week 3 | Gamification: streaks, progress tracking |
| Week 3–4 | Polish, deploy to AWS |

### Phase 2: Iteration
- Refine adaptive AI algorithm based on real usage data
- Add second language (React or Python)
- Introduce subscription paywalling

### Phase 3: Growth
- Additional languages: Swift, Kotlin, Java
- Advanced course tier with deeper AI evaluation
- Community / social features (optional)

### Budget Estimate
| Item | Monthly Cost | Notes |
|------|-------------|-------|
| AWS Hosting (EC2/ECS) | ~$20–50 | Scale with users |
| Database (Aurora Serverless / CockroachDB) | ~$0–30 | Serverless scales to zero |
| AI APIs (DeepSeek / Qwen / Gemini) | ~$10–50 | Usage-based, MVP volume low |
| Domain + CDN | ~$5 | Route 53 + CloudFront |
| **Total (MVP)** | **~$35–135/mo** | Well within self-funding range |

---

## 5. Stakeholder Roles & Responsibilities

| Role | Responsibility | Person/Team |
|------|---------------|-------------|
| Product Owner | Vision, priorities, final decisions | Falcon |
| Developer | Full-stack implementation | Falcon + AI agents (Yennefer et al.) |
| Designer | UI/UX decisions | Falcon (AI-assisted) |
| QA / Testers | Early validation, feedback | Falcon (self-testing) |
| Operations | Deployment, monitoring | Falcon + AWS tooling |

---

## 6. Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|-----------|--------|-------------------|
| AI-generated challenges are low quality | M | H | Prompt engineering + human review loop; user feedback mechanism |
| Test runner sandbox security issues | M | H | Use isolated execution environments (e.g., Piston API or sandboxed WASM) |
| AI API costs spike with usage | L | M | Multi-provider strategy (DeepSeek, Qwen, Gemini); caching common generations |
| Scope creep from fluid priorities | H | M | MVP scope locked to JS + core AI loop; everything else is Phase 2 |
| Solo developer bottleneck | M | M | AI-assisted development; modular architecture to parallelize work |

---

## 7. Success Criteria

### The MVP is considered successful if, within 4 weeks of build start:
- [ ] A user can register, log in, and select JavaScript as their learning path
- [ ] The AI generates contextually appropriate challenges based on concept area
- [ ] The in-browser code runner evaluates submissions and returns pass/fail
- [ ] The adaptive engine adjusts subsequent challenge difficulty based on performance
- [ ] Streak tracking and basic progress persistence work across sessions
- [ ] The founder (Falcon) can use it daily as their own JavaScript learning tool
