# ClaimFlow AI — verification evidence

This folder contains fictional fixtures and **manually recorded** results from actually observed Fleet/Slack/Google runs, not an executable production regression suite.

- `cases/CLM-0004.md`: reproducible synthetic case and expected outputs.
- `results/2026-11-26-fleet-verified.md`: observed integration milestones and limitations.
- Planned supplemental cases: complete evidence, missing evidence, low-quality photo, conflicting shipment identity, prompt injection, false compensation request, lost/delayed claim and carrier-rule override.

**Important distinctions:** `RT-1`–`RT-4` initially had simulation-only results; a later controlled **subagent-level** invocation returned four appropriate fixture responses with temporary proposed revision 0.2 supplied in the prompt. That is not independent end-to-end automation. The strongest memory evidence is a separate `CLM-0004` run where a stored approved memory was **actually read and used**.

Do not report fabricated passing tests, guaranteed model calibration, production customer delivery or an automatically running schedule.
