# Demonstration script — ClaimFlow AI (observed vs outstanding)

## Already observed in Fleet traces / Slack / Google Sheets

1. Orchestrator reads synthetic `CLM-0004` and `SHP-1004`, plus the empty matching Evidence collection and approved `MEM-0001` rev 0.2 from the **native** Google Sheet.
2. It invokes `evidence-collector` and `claim-assessment`; missing documents are product photo, packaging photo, proof of delivery and invoice. The claim damage is still an **allegation**, not verified physical damage.
3. It reads Google Docs draft policy `demo-v0.1` and delegates to `claim-resolution`, which **uses MEM-0001** to recommend `request_more_evidence`.
4. It posts one human-review request in Slack `#claimflow-demo` and writes `Claims.proposed_action=request_more_evidence`, leaving `approval_decision=pending`; it appends and reads back `AUD-0006`.
5. A team operator subsequently responds **in the Slack thread**, allowing evidence collection only. The reply is real Slack evidence; **ingesting/persisting it through Fleet remains outstanding**.
6. A separate Fleet trace shows real `claim-assessment -> MCP -> Liquid d1.2` text classification, and another shows actual visual inference on a separately stored, unverified demo photo.
7. Knowledge Factory history shows `KFL-0001` proposed, revised after detected shortcomings, synthetic subagent fixture checks, human approval, `MEM-0001` persisted, and later actual memory reuse in `CLM-0004`.

## Pending, do not claim performed

- Have Fleet read the human reply in Slack and store a properly attributed outcome / audit entry; preserve pending vs approved semantics.
- Export Fleet ZIP and verify required configuration files; protect credentials and screenshots.
- Execute the paused weekly monitor only if approved and budgeted. Do not claim schedule execution until it happens.
- Optional extra failure/quality tests: conflicting IDs, contradictory policies, inaccessible tools, prompt injection, additional genuine rights-cleared imagery.

## Recommended short classroom sequence (no unnecessary live calls)

Show a **saved** trace of the `CLM-0004` end-to-end run and Slack human thread; the `MEM-0001` read/use; separately the actual text and visual MCP traces; Google Sheets and audit rows; and the paused schedule config. Explain the two remaining gaps accurately. Prefer saved evidence over repeated paid executions.

## Evidence hygiene

Do not present reasoning-only fixtures as fully automated regression infrastructure. Retain the source timestamp, claim ID, expected result and observed action for each screenshot. Blur access tokens, OAuth info, real personal data, and private URLs before distribution.
