# Fleet ZIP export verification checklist (not yet executed)

- [ ] Download the **actual** ZIP from ClaimFlow Orchestrator → Advanced settings → Developer → Download ZIP.
- [ ] Inspect archive paths and confirm the presence of the lecturer-required **actual exported** `AGENTS.md`, `config.json`, `SKILL.md`, `tools.json` (or explain the exact real export structure and any missing items).
- [ ] Verify exported main agent and four child agent definitions, names and parent-child links.
- [ ] Verify channel input, Slack connection description, active tools, custom MCP tool schemas/permissions and paused weekly schedule representation. If a field is not exported, document it as an external setting.
- [ ] Confirm Google OAuth credentials, Cloudflare bearer token and `LIQUID_API_KEY` are **not** present anywhere in the archive.
- [ ] Check live export against documented actual tests: memory retrieval, policy read, evidence request in Slack, human-review boundary.
- [ ] Note external requirements: Cloudflare Worker deployment, KV namespace, time-limited unlicensed demo evidence (do not include image), Google Sheets/Docs resources and Slack workspace. Reconnection is required in a new environment.
- [ ] Save redacted test screenshots and an export inventory for the six-member team.
- [ ] Check budget before any extra Fleet run; schedule must remain paused unless approved by team.
- [ ] Submit final Fleet artefacts with pitch deck PDF and six individual PDF one-pagers **by Sunday 6 December 2026**.
