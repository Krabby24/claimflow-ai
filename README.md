# ClaimFlow AI — DTU Applied AI for Entrepreneurs

**Status:** Planning and controlled prototyping. The features in this repository are *design proposals*, not confirmed working Fleet integrations.

ClaimFlow AI is a proposed multi-agent logistics claims assistant. It takes simulated damaged/lost/delayed shipment claims, structures evidence, assesses issues with a VLM and narrowly scoped System One decisions, checks policies, requests human review in Slack, and captures approved knowledge for future cases.

## Start here

1. Read [`docs/reference/ClaimFlow_AI_Master_Project_Context.md`](docs/reference/ClaimFlow_AI_Master_Project_Context.md) in full.
2. Read [`docs/reference/ClaimFlow_AI_Team_Work_Plan.pdf`](docs/reference/ClaimFlow_AI_Team_Work_Plan.pdf) for **owners and deadlines**.
3. Choose your assigned role (Marco, Riccardo, Member 3, 4, 5 or 6). See the handoffs in [`docs/architecture.md`](docs/architecture.md).
4. Work on your own Git branch and submit a pull request for review. Do **not** commit passwords, API keys, OAuth tokens, real customer data, or private Fleet credentials.
5. Agree on [`docs/data-contract.md`](docs/data-contract.md) before changing agent inputs/outputs.

## Where things live

| Location | Purpose |
| --- | --- |
| `docs/` | Architecture, contracts, decisions, demo plan and reference material |
| `skills/` | Draft agent procedures; **not** proof that Fleet agents are deployed |
| `policies/` | Fictional company policies used for the demo |
| `data/synthetic/` | Synthetic sample input only |
| `tests/` | Expected outcomes and later measured results |
| `fleet/` | Later: real, reviewed Fleet export snapshots, without credentials |
| `research/` | Cited academic/business references |
| `pitch/` | Pitch-deck working material |
| `one-pagers/` | Individual one-page reports |

## Important milestone dates (2026)

- **24 Nov:** shared claim schema / workspace agreement.
- **25 Nov:** Fleet -> tool -> Slack feasibility check, plus vision and export check.
- **27 Nov:** role-specific first deliverables.
- **29 Nov:** first end-to-end demo.
- **1 Dec:** memory / supervised Curator demonstration and tests.
- **2 Dec:** deck and six one-pagers drafted.
- **3 Dec:** cross-review and scope freeze.
- **4 Dec:** target early submission; **6 Dec** official deadline.

## What counts as done

A tested, reproducible claim lifecycle with evidence provenance, structured visual decision(s), policy-aware recommendation, human review in Slack, traceable memory, and a supervised knowledge-improvement loop. Tell apart **expected**, **implemented** and **observed** behavior at all times.

## Fleet export warning

The professor asks for `AGENTS.md`, `config.json`, `SKILL.md`, and `tools.json`. This repo contains *draft skills* and a development [`AGENTS.md`](AGENTS.md); do not present these as the final Fleet export. Once Fleet is configured and tested, capture its actual export in `fleet/` and verify the required files before submission.
