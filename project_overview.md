# TGF — The Green Finance Project

**Status:** private, pre-MVP. Objective: build a web-first platform that helps startups and SMEs adopt sustainable finance practices without drowning in jargon.

## Problem
Green finance is fragmented, hard to start, and harder to measure. Teams need simple tools to set a baseline, simulate impact, and track progress toward recognized standards.

## Vision
A practical, modular toolkit that makes sustainability decisions measurable and business-friendly, with a future path to mobile and selective open tooling.

## Initial Deliverable (Web MVP)
- Landing + auth (email/password to start).
- “Impact Estimator” v0.1: quick calculator for CO₂e reduction and cost savings from basic actions.
- Profile with a simple sustainability baseline (sector, size, current practices).
- Resources hub: curated links and internal docs.

## Guardrails
- Private repo, no license (default copyright).
- Keep core logic & data models in private modules.
- Consider open-sourcing non-core utilities later.

## Tech Direction (tentative)
- Backend: FastAPI or Express (to be finalized).
- Frontend: React.
- DB: PostgreSQL.
- API-first so mobile can reuse.

## Milestones (draft)
- M0: Repo structure and docs ✅
- M1: Web scaffold (auth, layout)
- M2: Impact Estimator v0.1
- M3: Beta with metrics dashboard

## Next Action
Set `.gitignore`, then scaffold backend/frontend.
