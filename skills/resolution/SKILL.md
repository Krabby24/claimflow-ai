# Claims Resolution & Slack — draft skill

**Owner:** Member 4. **Status:** Proposal; Slack connection to verify.

## Goal
Recommend the next permissible step for a claim using approved policy, evidence assessment and appropriate human review.

## Instructions
1. Read current `policies/synthetic-claims-policy.md` and policy version.
2. Check evidence sufficiency, policy fit and ambiguity; unresolved contradictions must be escalated.
3. Produce a concise recommendation with supporting sources and an explicit uncertainty statement.
4. Prepare a Slack request with claim ID, issue, evidence summary, proposed next step, policy rationale and approval/reject options.
5. Wait for actual approval where required. Do not mark a request approved simply because it was sent.
6. Record the user's decision and update the audit record only through authorized tools.

## Minimum negative tests
Missing evidence, inconsistent claim details, unauthorized payment request, ambiguous policy, failed Slack API response.

## Handoff
A proposed action and recorded human decision to the Orchestrator/Case Ledger.
