# Implementation status and evidence inventory

**Snapshot:** 26 November 2026 | **Context:** DTU Applied AI for Entrepreneurs, six-person group.

| Capability | Verified fact | Important boundary |
| --- | --- | --- |
| Fleet orchestrator and four subagents | Configured, delegated in controlled runs | This repo's skill drafts are not the Fleet-exported skill definitions |
| Google Sheets | Native spreadsheet read; write/read-back for `Dec-2001`, `KFL-0001`, `MEM-0001`, audit records, `CLM-0004` proposed action | An imported Excel file returned a Sheets-API unsupported-document error; use the native sheet |
| Google Docs | Read draft `demo-v0.1` claims policy | Policy is pending team approval |
| Slack | Fleet posted human review request for `CLM-0004`; operator replied in its thread | No demonstrated ingestion of that reply into `Decisions` or `Claims.approval_decision` |
| System One text | `claim-assessment` invoked live `assess_claim_systemone` via custom MCP, Liquid d1.2 returned an evidence request | Provider-side probability is not verified claim accuracy |
| System One visual | `claim-assessment` invoked live `assess_claim_visual_systemone`; `image_processed=true`, model `d1.2` | Internet-sourced unverified broken-bulb demonstration image; no authenticity or settlement conclusion |
| Knowledge Factory | `KFL-0001` -> human-approved `MEM-0001` rev 0.2; verified actual retrieval and use on `CLM-0004` | Four limited fixture responses, not a fully independent automated benchmark |
| Human review workflow | Slack recommendation and reply; no compensation | Reply not yet ingested by an agent |
| Weekly schedule | `ClaimFlow - Pending Evidence Monitor`, Monday 09:00 browser-local | **Paused and not executed**; schedule is read-only by design |
| End-to-end test | `CLM-0004` succeeded through Slack request and `Claims!H5`/`AUD-0006` persistence | Manual run, no live Liquid inference inside it, no final human approval persistence |
| Fleet export | UI shows **Download ZIP** | Not yet retrieved or validated for required four files |

## Key synthetic identifiers (not live customer data)

- **Damaged-lamp source:** `CLM-0001 / SHP-1001`.
- **Curator record:** `KFL-0001`, revision candidate `0.2`, stored approved memory `MEM-0001`.
- **Decision ID anomaly:** the original tool submission requested `DEC-0001`, but the actual stored value was `Dec-2001`. References should use the **persisted** value until root cause is diagnosed; do not silently rewrite history.
- **Successful new-case run:** `CLM-0004 / SHP-1004`, updated proposed action `request_more_evidence`, Slack request sent, `AUD-0006` appended.
- **Separate visual demo:** `CLM-VIS-001 / EV-VIS-001`; not customer evidence, different from desk lamp and mug.

## Evidence to preserve privately

1. Fleet trace of text MCP integration, then visual MCP integration and provider usage.
2. Screenshots of Google Sheets `Dec-2001`, `KFL-0001`, `MEM-0001`, `AUD-0003`–`AUD-0006`, without revealing non-demo records.
3. Evidence of real `CLM-0004` subagent delegations and `MEM-0001` read/use.
4. Slack post and its operator thread reply; annotate that downstream ledger ingestion is pending.
5. Schedule screenshot showing **Paused**.
6. Later Fleet exported ZIP + a redacted directory listing and export verification results.

**Cost control:** Fleet workspace credits are limited; retain runs and avoid repeating already verified Liquid and visual calls. The last user-reported remaining balance before the final test was 2 Fleet credits; current post-run balance must be checked in Fleet, not inferred from this document.
