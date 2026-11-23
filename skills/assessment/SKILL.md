# Assessment & System One — draft skill

**Owner:** Riccardo. **Status:** Proposal; provider/tool to be verified.

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
