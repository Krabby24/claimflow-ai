# Integrations, deployment and credential boundaries

**As-built academic prototype, 26 Nov 2026.** The Fleet ZIP, GitHub repository, Slack workspace, Google account, Cloudflare Worker and KV namespace are **separate resources**.

## Connected services

| Service | Actual use | Security / limitations |
| --- | --- | --- |
| LangSmith Fleet | Main `ClaimFlow Orchestrator` and 4 subagents; permissions on external tools | Coordinator / co-manager manage central Fleet export. Tool writes require review. |
| Slack | `#claimflow-demo` review requests and teammate interaction; separate `#claimflow-development` coordination | Invite teammates as members, not shared-account password recipients; channel replies are not necessarily automatically processed. |
| Google Sheets | Native spreadsheet with 8 tabs and versioned memory | Use **native Google Sheets** ID; Excel IDs can return unsupported-document errors. Authorise only requested access; avoid duplicate writes. |
| Google Docs | `ClaimFlow AI – Claims Policy – demo-v0.1` | Draft / pending team approval, no automatic modification by Curator. |
| Google Drive | Shared project files and references | An OAuth connection or file search alone does not prove access to a particular Sheet. |
| Cloudflare Worker MCP | Authenticated tools `assess_claim_systemone` and `assess_claim_visual_systemone`, hosted as external integration | Worker code in `worker/src/index.js`. Secrets are stored **only in Cloudflare**, not committed. |
| Cloudflare KV | Private image bytes with evidence-to-claim binding and ~30-day expiry | Not a durable verified customer evidence store or public gallery. |
| Liquid AI | `d1.2` Decision API, text/visual System One classifications | Model probabilities do not verify authenticity, policy eligibility, or approval. |

## System One specification

**Text tool:** `assess_claim_systemone(claim_id, shipment_id, claim_type, shipment_status, evidence_summary)`; uses `state`, typed question (`choice` where appropriate), `instructions`, and `criteria` for a narrow evidence-processing recommendation.

**Visual tool:** `assess_claim_visual_systemone(claim_id, evidence_id, item_description, evidence_context)`; looks up a privately stored and claim-bound image, sends it to the Liquid decision API and returns probability of **visible damage only**. `confidence:null` is a legitimate result and must not be re-labelled as model confidence. Both tools have been invoked live in controlled tests.

The Worker accepts authenticated `PUT /evidence/{id}` uploads. It checks claim ID, source label, image signature/MIME and maximum size. The demonstration image was sourced from the internet; **do not commit or redistribute it without image rights**.

## What is needed to reproduce this elsewhere

1. Recreate a **dedicated** workspace with authenticated Fleet and Google/Slack OAuth connectors.
2. Copy the native Google Sheets tab schema; populate fictional fixtures only. Do not assume the shared Google Sheet is in this repo.
3. Supply the fictional draft policy document in Google Docs.
4. Deploy the reviewed `worker/src/index.js` to a Cloudflare Worker, provision KV binding `EVIDENCE_KV`, and set the Cloudflare secrets `LIQUID_API_KEY` and `MCP_ACCESS_TOKEN`. Use unique credentials for any new environment. The `worker/wrangler.example.toml` file has placeholders only.
5. Connect Fleet MCP using the deployed Worker `/mcp` endpoint and the correct **bearer token**, with tool-call approval enabled. Never publish live MCP URLs with credentials in the repository.
6. Configure subagent responsibilities and connect the actual Fleet-exported skills/tools. The repository files in `skills/` are team drafts.
7. Configure weekly Monday 09:00 pending-evidence schedule and leave **Paused** by default. Local browser time is converted to UTC on save; DST behaviour should be verified before activation.
8. Validate independently using approved synthetic fixtures. A read-only / one-time demo is not production-ready or a full automatic claim settlement system.

## Known integration errors and mitigations

- **Google Sheets 404 / item not accessible**: OAuth needs reconnecting or the authenticated account lacks access; check the shared account and file permissions first.
- **`document must not be an Office file`**: an Excel (`.xlsx`) file ID was supplied instead of the native Google Sheets ID. Use the actual native sheet, not a drive search of the Excel copy.
- **`Evidence-to-claim binding mismatch`**: `CLM-VIS-001` must match image `EV-VIS-001` metadata. The unrelated `CLM-0001` desk-lamp case must never be attached to the bulb image.
- **Tool visible in workspace but missing from agent**: refresh MCP tool list, verify permissions and reattach tool to relevant agent if needed.
- **Uncertain Google write**: do a targeted read and deduplicate by IDs before retry. Sheets is **not an immutable audit log** without additional controls.
- **Fleet credits**: do not activate high-frequency schedules or unbounded model calls, especially while the team is conducting tests.

## Security checklist before a public push

- No `.env`, `.dev.vars`, `LIQUID_API_KEY`, `MCP_ACCESS_TOKEN`, OAuth JSON, access tokens, personal credentials, real customer documents, raw private Sheets exports or unlicensed image files.
- Keep screenshots with workspace identifiers and reviewer account names in a **restricted team folder** unless publication is approved.
- GitHub repo was **public** during this update. Consider switching to **private** and giving teammates Collaborator access.
- The native Fleet ZIP is **not** the same as the worker source: deliver both with explanatory documentation, not embedded secrets.
