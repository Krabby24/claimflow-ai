# Memory & Knowledge Curator — draft skill

**Owner:** Member 5. **Status:** Repository-maintained draft; corresponding Fleet subagent has been configured and tested. This file is NOT a native Fleet export.

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

## Verified deployment note (26 November)

Curator reviewed `KFL-0001`, found missing duplicate-evidence avoidance and authoritative rule precedence, helped revise procedural guidance 0.2, and the human approved `MEM-0001` in Sheets. Four subagent-level synthetic fixture responses were observed; no independent automated benchmark or policy edit was performed.
