# Verified demonstration record — 26 November 2026

**Evidence basis:** reported Fleet tool outcomes and shared screenshots from the actual group prototype. This is a human-maintained run report, not a machine-extracted or cryptographically signed trace.

## A. External integration test history

| Test | Result | Source limitation |
| --- | --- | --- |
| Slack Fleet teammate messaging | Real message sent / received | Does not guarantee automatic reply ingestion |
| Google Docs policy read | Success | Policy `demo-v0.1` is Draft |
| Google Sheets read/write/readback | Success | Source is native Google Sheet, not imported `.xlsx` |
| Text System One MCP / Liquid d1.2 | Live tool call success | Read-only and model-generated probability |
| Visual System One MCP / Liquid d1.2 | Live tool call success | `CLM-VIS-001 / EV-VIS-001` internet image; not verified customer evidence |
| Visual `image_processed` | `true` | `image/jpeg`, 35,882 bytes |
| Visual `probability_yes` | `0.9949372593402376` | **Visible damage**, not authenticity or liability |
| Visual `confidence` | `null` | Do not relabel probability as confidence |
| Visual `usage` | 450 input tokens, USD `0.000009` | Provider-reported for this one inference |
| Knowledge Factory | `KFL-0001`, human-approved `MEM-0001` rev 0.2 | Limited subagent fixture tests; not independent regression harness |

## B. End-to-end test: CLM-0004 / SHP-1004

| Step | Observed outcome |
| --- | --- |
| Native Google Sheets case, shipment, evidence, memory read | **Succeeded** |
| Evidence Collector called | **Succeeded**; no inspected physical evidence, 4 missing items |
| Claim Assessment called | **Succeeded**; evidence insufficient; no Liquid MCP call in this run |
| Draft Google Docs policy read | **Succeeded** |
| Approved memory retrieved | **`MEM-0001`, rev `0.2`** |
| Claims Resolution called | **Succeeded**; **used** approved procedural memory, recommended `request_more_evidence` |
| Slack duplicate check | **Succeeded** in inspected window |
| Slack review post | **Succeeded**; provider timestamp `1795710566.679689` |
| Claim record update | `Claims!H5 = request_more_evidence`; `approval_decision` remained `pending` |
| Audit | `AUD-0006` appended and read back |
| Human reply | Posted afterward in Slack thread, limited to evidence collection; **not yet ingested into Sheets by Fleet** |
| Compensation or settlement | **Not approved** |

## C. Curator process record

1. `Decisions` record written/read back as **`Dec-2001`** (not the originally submitted `DEC-0001`; cause unknown).
2. `KFL-0001` initially `pending_review` proposed a four-item checklist.
3. Curator's simulation review flagged redundant requests and precedence conflicts: simulated RT-1 PASS / RT-2 FAIL / RT-3 PASS / RT-4 INCONCLUSIVE.
4. Candidate updated to revision 0.2: **request only missing evidence**; prefer authoritative carrier/company requirements; escalate unresolved conflict; never treat it as settlement policy.
5. Subsequent **subagent-level** fixture invocation returned four appropriate RT-1–RT-4 responses. This was limited test-context behaviour, not a completely independent regression framework.
6. Human operator in Fleet explicitly approved procedural demo memory only; `MEM-0001` rev 0.2 persisted, `KFL-0001` marked approved and audit events `AUD-0003`–`AUD-0005` recorded.
7. Later independent `CLM-0004` processing retrieved and used `MEM-0001`, proving **cross-execution memory reuse**.

## D. Unfinished and paused items

- Reply ingestion: Slack operator reply to `CLM-0004` was not yet processed by a new Fleet run and was not marked approved in `Claims.approval_decision`.
- Monday 09:00 pending-evidence schedule **configured but Paused**; no recurring run was observed.
- Final Fleet ZIP and four required export artefacts: **not yet exported/verified**.
- No production-quality testing, customer communication, claim eligibility or settlement decisions.

## E. Integration incident lessons

- The first visual test failed safely because claim ID `CLM-0001` did not match the privately uploaded `CLM-VIS-001` image metadata; a corrected call succeeded.
- An early Google Sheets read failed because of Google account permissions; reconnection restored the read.
- The first `CLM-0004` end-to-end attempt used an Excel file ID, returning **Office file not supported**; the corrected native Google Sheet ID succeeded. No writes occurred in the failed attempt.

**Privacy:** exact Google file IDs, bearer tokens, private URLs and unlicensed demo image are deliberately not committed here. Store raw Fleet logs and screenshots privately for the team's final review.
