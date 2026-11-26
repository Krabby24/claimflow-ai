# ClaimFlow AI — implemented architecture and workflow

**Updated:** 26 November 2026. **Status:** As-built Fleet prototype with observed tests; not a production service.

## Runtime components

| Component | Responsibility | Observed status |
| --- | --- | --- |
| ClaimFlow Orchestrator (Fleet) | Coordinate subagent delegations, read external state, request human review and persist authorised actions | Tested on `CLM-0004` |
| `evidence-collector` | Separate reported issue from inspected evidence; enumerate missing documents and provenance | Invoked in end-to-end test |
| `claim-assessment` | Assess sufficiency from reported/verified facts; optionally call Liquid AI via MCP | Invoked; text/visual MCP tested on separate runs |
| `claim-resolution` | Read draft policy and approved memory; recommend the next action with safe limits | Invoked; **used `MEM-0001` rev 0.2** on `CLM-0004` |
| `knowledge-curator` | Propose versioned reusable lessons from operator feedback and test fixtures | Tested; proposed `KFL-0001` and revised memory |
| Sheets | Tabs `Guide`, `Shipments`, `Claims`, `Evidence`, `Decisions`, `Case_Memory`, `Knowledge_Flags`, `Audit_Log` | Reads/writes tested |
| Google Docs | Synthetic policy `demo-v0.1`, **Draft / Pending team approval** | Read tested |
| Slack `#claimflow-demo` | Human-review channel / Fleet teammate | Post and human thread response observed |
| Cloudflare MCP + Liquid AI | Authenticated on-demand System One text decision and VLM visual damage observation | Both actually tested |
| Fleet weekly schedule | Monday 09:00 local browser timezone: pending-evidence read-only report | **Configured & paused; never run** |

## Observed end-to-end integration path

```mermaid
sequenceDiagram
    participant Op as Fleet Orchestrator
    participant DB as Google Sheets
    participant EC as Evidence Collector
    participant CA as Claim Assessment
    participant Policy as Google Docs
    participant CR as Claims Resolution
    participant Slack as Slack review channel
    Op->>DB: Read CLM-0004, SHP-1004, Evidence, approved memory
    DB-->>Op: Claims + MEM-0001 rev 0.2
    Op->>EC: Check evidence availability
    EC-->>Op: No inspected evidence; four missing items
    Op->>CA: Fact-based assessment (no Liquid call)
    CA-->>Op: Insufficient evidence / evidence_needed recommendation
    Op->>Policy: Read demo-v0.1 Draft
    Policy-->>Op: Synthetic restrictions
    Op->>CR: Case + policy + approved MEM-0001
    CR-->>Op: request_more_evidence; no compensation
    Op->>Slack: One human-review request
    Op->>DB: Claims.proposed_action + Audit_Log AUD-0006
    Note over Slack,DB: Operator replied in Slack AFTER run; reply not yet ingested to DB
```

In the `CLM-0004` run, `Claims.proposed_action` was updated to `request_more_evidence`, `approval_decision` remained `pending`, and `Audit_Log` entry `AUD-0006` was appended and verified. Do **not** assert the claim status was changed or the operator's reply was persisted; neither occurred in that run.

## Knowledge Factory — human-supervised and versioned

`CLM-0001` operator feedback -> `Dec-2001` operational instruction -> `KFL-0001` candidate -> Curator identifies duplicate evidence requests and authority precedence gaps -> revised checklist `0.2` -> four **limited synthetic fixture responses** using the resolution subagent -> human approval -> `Case_Memory.MEM-0001` revision `0.2` -> confirmed Sheets read -> **actually used by resolution subagent for CLM-0004**.

Memory only supports **evidence collection** for damaged-delivery claims, requests only *missing* items, defers to verified carrier/company requirements, and does not authorise settlements. `KFL-0001.deployed_revision` was intentionally left empty; an approved memory read in one run is not proof of a globally deployed policy/skill change.

## Separately verified visual pathway

A photo was privately uploaded to Cloudflare KV and bound to `CLM-VIS-001 / EV-VIS-001`; the `claim-assessment` subagent called MCP visual System One and Liquid AI d1.2 returned `image_processed=true`, `probability_yes=0.9949372593402376` for **visible physical damage**. The image was **third-party internet demonstration material**, not verified customer evidence, and is **not connected to the CLM-0001 desk-lamp or CLM-0004 mug cases**. Model probability is not calibrated confidence or proof of authenticity.

## Work ownership (unchanged from team plan)

- Marco: integration, shared architecture, final deliverables.
- Riccardo: Fleet / System One integration and debugging.
- Member 3: Evidence Collector and synthetic evidence.
- Member 4: resolution/policy/Slack interaction specification.
- Member 5: Knowledge Curator, memory/evaluation.
- Member 6: market/TAM, System of Record / moat and pitch materials.

## Important gaps and safety

- Slack's **human reply has not yet been read back and persisted** by a new Fleet run.
- The schedule is **paused** and has not run automatically.
- No automatic customer messages, settlement payments, production policy sync or full event-driven claims lifecycle.
- No production-grade authz, idempotency guarantees or exhaustive regression harness; duplicate checks are agent-level safeguards.
- Cloudflare KV images expire after ~30 days and are external to Fleet exports.
- The group's real Fleet ZIP still needs to be downloaded, checked for secrets, and added under `fleet/` when ready.
