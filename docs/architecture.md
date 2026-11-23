# ClaimFlow AI — proposed architecture (not yet deployed)

## Intended claim workflow

1. Intake: a synthetic email/document/photo claim arrives.
2. Evidence Collector (Member 3): extract fields, source and missing information.
3. Assessment / System One (Riccardo): VLM observation then constrained classification (`state`, `type`, `instructions`, `criteria`), with uncertainty.
4. Resolution Agent (Member 4): compare assessment against versioned fictional policy; propose action or request more evidence.
5. Human teammate in Slack: operator approves, rejects or escalates consequential actions; all demo settlement actions are gated.
6. Follow-up: update the claim ledger and audit trail; preserve tool errors.
7. Memory / Curator (Member 5): learn *approved* case-specific lessons; flag gaps; propose, review and regression-test skill changes.
8. Orchestrator (Marco): coordinates transitions, tool calls and authority boundaries.

## Role ownership

- Marco: overall architecture, common schema, integration, final delivery.
- Riccardo: Fleet integration, tools, System One/VLM assessment, debugging.
- Member 3: synthetic evidence and Evidence skill.
- Member 4: claims policy, resolution skill, Slack interaction specification.
- Member 5: memory, Curator skill, evaluation and tests.
- Member 6: TAM, market research, SoR, defensible moat, pitch coordination.

## Acceptance rules

- Never confuse model observation with an established fact.
- Reject/flag missing evidence and unknown statuses, rather than guessing.
- Require actual recorded human approval for consequential actions.
- Preserve case ID, provenance, policy version and action audit trail.
- Verify that later-case improvement comes from an *approved* change and does not break earlier tests.
