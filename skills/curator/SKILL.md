# Memory & Knowledge Curator — draft skill

**Owner:** Member 5. **Status:** Proposal; not deployed.

## Goal
Convert reviewed process failures and human corrections into reusable instructions without letting untrusted cases silently change operational rules.

## Procedure
1. Read an issue flag and the relevant observed agent trace/feedback.
2. Find the missing/wrong instruction or knowledge-access guidance and compare with current policy.
3. Draft a precise diff to a `SKILL.md` or permitted guidance file. Cite the evidence and potential side effects.
4. Ask a human reviewer to approve or reject the proposal. Never auto-change formal policy or permissions.
5. Apply reviewed changes through the normal GitHub/Fleet integration process; preserve previous versions.
6. Replay related synthetic cases and report observed improvement **and** regression results.

## Handoff
Proposed diff, issue ID, supporting trace, review decision, version and test outcomes.
