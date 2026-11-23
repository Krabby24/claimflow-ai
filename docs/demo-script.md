# Draft end-to-end demo script

This is a proposed demonstration, **not** a claim of observed Fleet behavior.

1. Send a fully synthetic damaged shipment report with a sample photo and matching shipment identifier.
2. Inspect extracted fields and evidence provenance.
3. Show a System One-style structured classification with explicit uncertainty.
4. Show policy-referenced proposed action in Slack; have a team member approve/reject.
5. Record the decision and outcome in the simulated claim ledger.
6. Trigger a second claim with missing evidence. Capture the failure/missing-knowledge flag.
7. Curator proposes a concrete skill checklist change; supervisor reviews the diff.
8. Re-run a similar claim after approval; show any measurable improvement and regression test outcome.
9. Demonstrate an ambiguous or malicious-instruction input being safely escalated.

**Evidence to capture:** screenshots/run trace IDs, expected vs actual outcomes, approval messages and skill diffs. Never stage fictional screenshots as real results.
