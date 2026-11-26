# Cloudflare MCP Worker — source for real Liquid AI d1.2 integration

The Worker source in [`src/index.js`](src/index.js) is a reviewed copy of the group's **v0.2 demonstration Worker**. Its text and visual MCP tool pathways were actually invoked from Fleet. It is not a general production claims backend.

## Exposed tools

1. `assess_claim_systemone` — structured System One decision from synthetic claim facts; read-only.
2. `assess_claim_visual_systemone` — reads one private image from Cloudflare KV using matching evidence/claim IDs; returns Liquid d1.2 model observation probability and limitations; read-only with respect to claims.

Authenticated upload endpoint: `PUT /evidence/{id}` with `X-Claim-ID`, `X-Source-Label`, appropriate `Content-Type`, and bearer auth. Only JPEG/PNG/WebP ≤512 KiB with valid signatures. KV TTL is 30 days. No automatic photo ingestion from a customer/email is implemented.

## Deployment prerequisites

- Cloudflare Worker (JavaScript module).
- Cloudflare KV namespace bound as **`EVIDENCE_KV`**.
- Cloudflare **secrets** (never GitHub variables or checked-in files): **`LIQUID_API_KEY`** and **`MCP_ACCESS_TOKEN`**.
- Environment-specific Cloudflare account / KV IDs; see `wrangler.example.toml` for placeholder structure. If updating a real deployed Worker, **back up the working version and review the diff before deployment**.
- Fleet MCP connection pointing to your controlled HTTPS Worker `/mcp`, with bearer token and **Ask** permissions on sensitive tools.

No secret values, API keys, sample stock photo, or images are included in this repository. Demo visual evidence originally resided in external private KV and expires after 30 days. The source code does not recreate KV records or the existing Fleet MCP connection.

**Do not store actual customer images** using this academic workflow; it has limited identity, consent, data-retention and governance controls. Model outputs are not proof of authenticity or settlement eligibility. Always require human approval where necessary.
