# Design decision log

## ADR-001 — One integrated Fleet environment

**Date:** 23 November 2026
**Status:** Implemented / tested (26 November 2026)

One centrally managed Fleet workspace, with Marco and Riccardo as primary integrators. Other team members contribute skills, policies, synthetic data, tests, research and documentation through GitHub and Drive. Invite individual teammates to Slack rather than sharing passwords.

## ADR-002 — Controlled memory and knowledge curation

**Date:** 23 November 2026
**Status:** Demonstrated for one approved procedural lesson (26 November 2026)

A case-history entry is not an authorised policy. Curator improvements are versioned, reviewed and tested before reuse. Demonstrated `KFL-0001` -> approved `MEM-0001` rev 0.2. The memory was actually retrieved and used on `CLM-0004`; this does not change policy or approve settlement.

## ADR-003 — Cloudflare external MCP for Liquid AI d1.2

**Date:** 25–26 November 2026
**Status:** Implemented and separately tested

Provide `assess_claim_systemone` and `assess_claim_visual_systemone` as authenticated MCP tools on a Cloudflare Worker. Visual demo bytes live privately in Cloudflare KV, bound to the synthetic claim ID, and expire. Provider secrets remain Cloudflare secrets, never committed. Text and visual integrations were actually used in separate Fleet traces, not inside the last `CLM-0004` end-to-end run.

## ADR-004 — Human supervision and narrow write scope

**Date:** 26 November 2026
**Status:** Request tested; downstream reply ingestion pending

The orchestrator posts a proposed action in Slack; an operator may explicitly approve evidence collection without approving compensation. The `CLM-0004` case was updated with `proposed_action=request_more_evidence` and `approval_decision=pending`; a human replied later. Do not present Slack replies as committed decision outcomes until a later agent ingests and persists them.

## ADR-005 — Cost-controlled scheduled monitoring

**Date:** 26 November 2026
**Status:** Configured but paused / not run

Fleet schedule `ClaimFlow - Pending Evidence Monitor`, Monday 09:00 local browser time, monitors pending evidence read-only. Keep **Paused** until the group explicitly allocates Fleet credits and approves its activation. No automated customer messaging or unbounded retry loop.

## ADR-006 — Real Fleet export as source of truth

**Date:** 26 November 2026
**Status:** Pending export and review

The repository's `AGENTS.md` and `skills/*/SKILL.md` are contributor-maintained sources, not evidence that Fleet's real exported configuration contains matching versions. Download and review Fleet ZIP only when ready; verify `AGENTS.md`, `config.json`, `SKILL.md`, `tools.json` from actual export and document external dependencies.
