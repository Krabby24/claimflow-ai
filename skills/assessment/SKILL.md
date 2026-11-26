# Assessment & System One — draft skill

**Owner:** Riccardo. **Status:** Repository-maintained draft; corresponding Fleet subagent has been configured and tested. This file is NOT a native Fleet export.

## Goal
Transform evidence into constrained, inspectable observations and claim classifications, using VLM input when genuinely available.

## Decision specification
- `state`: supported observations and shipping metadata from Evidence Collector, with provenance.
- `type`: use `noul` for a narrowly defined yes/no question or `choice` for exclusive claim classes where supported; this is *our conceptual interface*, not a guaranteed provider request format.
- `instructions`: single precise question, e.g. "Does the supplied photo visibly show packaging damage?".
- `criteria`: conditions for yes/no, damage/lost/delayed/unclear and when to abstain.

## Safety/quality
Separate photo observation from evidence-supported claim inference. Never invent probability/confidence. If a provider returns probabilities, log them, but do not claim calibration without experiments. Do not authorize refunds, set policy or modify source records.

## Handoff
Structured assessment + uncertainty + source references for Resolution.

## Verified deployment note (26 November)

The working Fleet agent uses a custom Cloudflare MCP bridge to **Liquid AI d1.2** for `assess_claim_systemone` and `assess_claim_visual_systemone`; both were invoked in separate actual tests. The visual test used `CLM-VIS-001`, an unverified internet photograph, and did not verify authenticity or approve payment. Fleet rights and external config are not stored in this draft.
