# Project Synopsis

## Title
**QuizSprint** — An Online MCQ Quiz Test Platform

## Overview
QuizSprint is a frontend-based Multiple Choice Question (MCQ) quiz platform that allows users to take timed tests, answer questions, and view their results instantly. It focuses purely on client-side implementation — UI/UX, state management, routing, and responsive design — without a custom backend. Quiz and question data are served via a mock/public REST API or local JSON, making the project easy to run, demo, and extend.

## Problem Statement
Most academic quiz tools are either desktop-based, tightly coupled to a backend, or lack real-world concerns like timers, instant scoring, and responsive design. QuizSprint isolates the frontend layer to demonstrate strong UI engineering, state management, and component architecture — skills directly relevant to frontend/full-stack interviews.

## Objectives
- Build a production-quality, responsive MCQ quiz UI from scratch
- Implement client-side state management for quiz progress, timer, and scoring
- Demonstrate routing, lazy loading, and performance optimization
- Practice component reusability and clean architecture patterns
- Integrate with a public/mock API for realistic quiz data flow

## Core Features
- **Category & Difficulty Selection** — choose subject, topic, and difficulty level before starting
- **Quiz Engine** — question navigation, single/multi-select MCQs, countdown timer, auto-submit on timeout
- **Instant Results** — score calculation, correct/incorrect breakdown, answer review screen
- **Progress Tracking** — question-by-question status (answered/skipped/marked for review)
- **Leaderboard (UI only)** — local ranking of past attempts persisted via localStorage
- **Authentication (UI only)** — login/signup forms with client-side validation
- **Responsive Design** — mobile-first layout, works across breakpoints
- **Dark/Light Theme** — user-toggleable theme persisted across sessions

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | React + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| State Management | Redux Toolkit / Zustand |
| Routing | React Router |
| HTTP Client | Axios / Fetch API |
| Data Source | Open Trivia DB / Mock JSON (mock backend) |
| Testing | Vitest + React Testing Library |
| Deployment | Vercel / Netlify |

## Scope & Limitations
- No real backend, database, or server-side question bank — all data flows are simulated or mocked
- Authentication is UI-only (no real session/token backend)
- Intended as a college/portfolio demo project, not production-ready for large-scale examinations

## Target Outcomes
- A polished, deployable demo suitable for a college project submission and portfolio showcase
- A reusable component library (buttons, cards, modals, timers, forms)
- Clean Git history with meaningful commits, suitable for resume and viva discussion
