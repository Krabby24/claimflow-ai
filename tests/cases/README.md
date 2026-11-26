# Synthetic case fixtures

All fixtures are fictional and specify source, claim IDs, evidence status and expected safe next steps. Never mix sample photos with unrelated claims.

- `CLM-0004.md`: **actually run** end-to-end through Fleet, Slack human review request and audit logging; manual human thread reply was not yet ingested into Sheets.
- Other edge cases (lost/delayed, conflicting records, prompt injection, incomplete policy and carrier override) remain candidates for additional tests. Distinguish hypothetical fixtures from observed agent runs.

See `../results/2026-11-26-fleet-verified.md` for the dated result record. Never claim a test passed unless an actual tool or subagent execution is traceable.
