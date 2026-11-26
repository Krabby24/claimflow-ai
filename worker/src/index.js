// ClaimFlow AI - minimal, read-only MCP bridge for Liquid AI d1.2
// Cloudflare Workers module format; no external dependencies.
const TOOL = {
  name: "assess_claim_systemone",
  description: "Classify the next evidence-processing step for a SYNTHETIC logistics claim using Liquid AI d1.2. Read-only. Does not approve, deny, pay, or update claims.",
  inputSchema: {
    type: "object",
    properties: {
      claim_id: { type: "string", description: "Synthetic claim identifier, e.g. CLM-0001" },
      shipment_id: { type: "string", description: "Synthetic shipment identifier, e.g. SHP-1001" },
      claim_type: { type: "string", description: "Reported type, e.g. damaged, lost, delayed" },
      shipment_status: { type: "string", description: "Verified shipment status from the operational database" },
      evidence_summary: { type: "string", description: "Only verified evidence and what is still missing; no invented facts" }
    },
    required: ["claim_id", "shipment_id", "claim_type", "shipment_status", "evidence_summary"],
    additionalProperties: false
  }
};



// Visual evidence is stored privately in a Cloudflare KV binding named EVIDENCE_KV.
// Fleet passes only an evidence ID, never image bytes or untrusted external URLs.
const VISUAL_TOOL = {
  name: "assess_claim_visual_systemone",
  description: "Inspect one privately stored SYNTHETIC demo photograph with Liquid AI d1.2. Returns the model's probability of visible physical damage; never proves authenticity or authorizes settlement. Requires prior evidence upload.",
  inputSchema: {
    type: "object",
    properties: {
      claim_id: { type: "string", description: "Synthetic claim identifier, e.g. CLM-VIS-001" },
      evidence_id: { type: "string", description: "Private uploaded image identifier, e.g. EV-VIS-001" },
      item_description: { type: "string", description: "Reported item type, e.g. light bulb; not visually verified" },
      evidence_context: { type: "string", description: "Provenance and limitations, e.g. internet-sourced demo photo, unverified as customer evidence" }
    },
    required: ["claim_id", "evidence_id", "item_description", "evidence_context"],
    additionalProperties: false
  }
};

const MAX_IMAGE_BYTES = 512 * 1024;
const IMAGE_TTL_SECONDS = 30 * 24 * 60 * 60;
const EVIDENCE_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{2,63}$/;
const CLAIM_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{2,63}$/;

function mimeFromBytes(bytes) {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes.length >= 8 && [137,80,78,71,13,10,26,10].every((b,i)=>bytes[i]===b)) return "image/png";
  if (bytes.length >= 12 && String.fromCharCode(...bytes.slice(0,4)) === "RIFF" && String.fromCharCode(...bytes.slice(8,12)) === "WEBP") return "image/webp";
  return null;
}

// Avoid using the spread operator with large Uint8Arrays.
function toBase64(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 8192) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  }
  return btoa(binary);
}

async function saveEvidence(request, env, evidenceId) {
  if (!env.EVIDENCE_KV) return new Response("EVIDENCE_KV binding missing", { status: 503 });
  const claimId = request.headers.get("X-Claim-ID") || "";
  const sourceLabel = request.headers.get("X-Source-Label") || "";
  if (!CLAIM_ID_PATTERN.test(claimId) || !/^[a-z0-9_-]{3,64}$/.test(sourceLabel)) {
    return new Response("Invalid X-Claim-ID or X-Source-Label", { status: 400 });
  }
  const declaredSize = Number(request.headers.get("Content-Length") || "0");
  if (declaredSize > MAX_IMAGE_BYTES) return new Response("Image too large", { status: 413 });
  const mime = (request.headers.get("Content-Type") || "").split(";")[0].trim().toLowerCase();
  if (!["image/jpeg", "image/png", "image/webp"].includes(mime)) {
    return new Response("Only JPEG, PNG and WebP images are supported", { status: 415 });
  }
  const body = new Uint8Array(await request.arrayBuffer());
  if (!body.length || body.length > MAX_IMAGE_BYTES) return new Response("Image size outside allowed range", { status: 413 });
  if (mimeFromBytes(body) !== mime) return new Response("Image MIME/signature mismatch", { status: 415 });
  const metadata = {
    mime, bytes: body.length, claim_id: claimId, source_label: sourceLabel,
    uploaded_at: new Date().toISOString(),
    verified_customer_evidence: false
  };
  try {
    await env.EVIDENCE_KV.put(`image:${evidenceId}`, body.buffer, {
      expirationTtl: IMAGE_TTL_SECONDS,
      metadata
    });
  } catch (_error) {
    return new Response("Private image storage failed", { status: 502 });
  }
  return new Response(JSON.stringify({ evidence_id: evidenceId, stored: true, metadata, expires_after_days: 30 }), {
    status: 201, headers: JSON_HEADERS
  });
}

function validateVisualArguments(args) {
  if (!args || typeof args !== "object" || Array.isArray(args)) return "Object required";
  for (const key of VISUAL_TOOL.inputSchema.required) {
    if (typeof args[key] !== "string" || !args[key].trim() || args[key].length > 900) return `Invalid or missing: ${key}`;
  }
  if (!CLAIM_ID_PATTERN.test(args.claim_id) || !EVIDENCE_ID_PATTERN.test(args.evidence_id)) return "Invalid identifiers";
  if (Object.keys(args).some(k => !(k in VISUAL_TOOL.inputSchema.properties))) return "Unexpected field";
  return null;
}

async function assessClaimVisual(args, env) {
  const invalid = validateVisualArguments(args);
  if (invalid) return toolError(`Visual tool arguments rejected: ${invalid}.`);
  if (!env.EVIDENCE_KV) return toolError("EVIDENCE_KV binding is not configured; no visual decision made.");

  let stored;
  try {
    stored = await env.EVIDENCE_KV.getWithMetadata(`image:${args.evidence_id}`, "arrayBuffer");
  } catch (_error) { return toolError("Cannot read private evidence store."); }
  if (!stored?.value) return toolError(`No uploaded image found for ${args.evidence_id}. No visual decision made.`);
  const metadata = stored.metadata || {};
  if (metadata.claim_id !== args.claim_id) return toolError("Evidence-to-claim binding mismatch; no analysis performed.");
  const bytes = new Uint8Array(stored.value);
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES || mimeFromBytes(bytes) !== metadata.mime) {
    return toolError("Stored image failed integrity checks.");
  }
  const payload = {
    model: "d1.2",
    images: [`data:${metadata.mime};base64,${toBase64(bytes)}`],
    state: [
      "Academic synthetic visual evidence assessment only. This photograph is NOT verified customer evidence.",
      `Claim ID: ${args.claim_id}; evidence ID: ${args.evidence_id}`,
      `Reported item: ${args.item_description}`,
      `Evidence provenance: ${metadata.source_label}`,
      `Evaluator context: ${args.evidence_context}`,
      "Inspect only visible physical damage. Do not infer cause, authenticity, shipping identity, eligibility or monetary compensation."
    ].join("\n"),
    questions: {
      visible_damage: {
        type: "noul",
        instructions: "Does the attached photograph clearly show visible physical damage to the reported item?",
        criteria: {
          true: "Broken glass, cracks, missing parts or other clearly visible physical damage can be observed.",
          false: "Item appears intact or photograph does not clearly demonstrate physical damage."
        }
      }
    }
  };
  try {
    const response = await fetch("https://api.liquid.ai/decisions/v1/systemone", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.LIQUID_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) return toolError(`Liquid AI returned HTTP ${response.status}. No claim was changed.`);
    const data = await response.json();
    const answer = data?.answers?.visible_damage;
    const p = answer?.noul;
    if (typeof p !== "number" || !Number.isFinite(p) || p < 0 || p > 1) {
      return toolError("Liquid AI visual response has unexpected schema; no assessment recorded.");
    }
    const output = {
      claim_id: args.claim_id,
      evidence_id: args.evidence_id,
      model: data.model || "d1.2",
      visual_question: "Clearly visible physical damage?",
      probability_yes: p,
      probability_no: 1 - p,
      confidence: answer.confidence ?? null,
      usage: data.usage ?? null,
      image_processed: true,
      image_bytes: bytes.length,
      image_mime: metadata.mime,
      evidence_source: metadata.source_label,
      verified_customer_evidence: false,
      limitation: "Visual observation only. No authenticity or compensation decision.",
      effect: "read_only_no_claim_or_policy_changes"
    };
    return { content: [{ type: "text", text: JSON.stringify(output) }], structuredContent: output };
  } catch (_error) {
    return toolError("Liquid AI visual inference failed. No claim or policy updated.");
  }
}

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store"
};

function rpc(id, result) {
  return new Response(JSON.stringify({ jsonrpc: "2.0", id, result }), { headers: JSON_HEADERS });
}
function rpcError(id, code, message, status = 200) {
  return new Response(JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } }),
    { status, headers: JSON_HEADERS });
}
function toolError(message) {
  return { isError: true, content: [{ type: "text", text: message }] };
}

async function assessClaim(args, env) {
  if (!args || typeof args !== "object" || Array.isArray(args)) {
    return toolError("Invalid arguments: object required.");
  }
  for (const key of TOOL.inputSchema.required) {
    if (typeof args[key] !== "string" || !args[key].trim() || args[key].length > 1500) {
      return toolError(`Invalid or missing field: ${key} (nonempty string, max 1500 chars).`);
    }
  }
  if (Object.keys(args).some(k => !(k in TOOL.inputSchema.properties))) {
    return toolError("Unexpected argument field.");
  }

  // Fixed options and criteria: the caller cannot redefine company policy.
  const state = [
    "Academic prototype: synthetic logistics claim. Evidence triage only.",
    `Claim ID: ${args.claim_id}`,
    `Shipment ID: ${args.shipment_id}`,
    `Claim type reported: ${args.claim_type}`,
    `Verified shipment status: ${args.shipment_status}`,
    `Verified evidence summary: ${args.evidence_summary}`,
    "No settlement, refund or claim rejection is authorized by this classification."
  ].join("\n");
  const payload = {
    model: "d1.2",
    state,
    questions: {
      next_step: {
        type: "choice",
        instructions: "Which evidence-processing step is justified by the verified facts? Do not assume missing documentation exists.",
        criteria: {
          request_evidence: "Supporting evidence needed for assessment is missing and should be requested.",
          ready_for_assessment: "Relevant supporting evidence is available and has actually been inspected.",
          escalate: "There is a verified shipment identity conflict, or ambiguous inspected visual evidence requiring human escalation."
        }
      }
    }
  };

  try {
    const response = await fetch("https://api.liquid.ai/decisions/v1/systemone", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.LIQUID_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) return toolError(`Liquid AI API returned HTTP ${response.status}. No case was changed.`);
    const data = await response.json();
    const answer = data?.answers?.next_step;
    const choices = ["request_evidence", "ready_for_assessment", "escalate"];
    if (!answer || !choices.includes(answer.choice)) {
      return toolError("Liquid AI returned an unexpected response format. No decision recorded.");
    }
    const output = {
      claim_id: args.claim_id,
      shipment_id: args.shipment_id,
      model: data.model || "d1.2",
      selected_action: answer.choice,
      probabilities: answer.probabilities || null,
      confidence: answer.confidence ?? null,
      usage: data.usage || null,
      scope: "synthetic_evidence_triage_only",
      effect: "read_only_no_claim_or_policy_changes"
    };
    return {
      content: [{ type: "text", text: JSON.stringify(output) }],
      structuredContent: output
    };
  } catch (_error) {
    // Never put API keys, request headers or raw provider errors in MCP tool responses.
    return toolError("Liquid AI request failed. No decision or case update performed.");
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/" && request.method === "GET") {
      return new Response("ClaimFlow System One MCP bridge: running", {
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" }
      });
    }
    // Every non-health endpoint is private; authenticate before reading image bytes.
    if (url.pathname !== "/mcp" && !url.pathname.startsWith("/evidence/")) {
      return new Response("Not Found", { status: 404 });
    }

    // Fleet makes server-to-server requests; browser-origin requests are not needed.
    if (request.headers.has("Origin")) return new Response("Forbidden", { status: 403 });
    if (!env.MCP_ACCESS_TOKEN || !env.LIQUID_API_KEY) {
      return new Response("Worker secrets not configured", { status: 503 });
    }
    if (request.headers.get("Authorization") !== `Bearer ${env.MCP_ACCESS_TOKEN}`) {
      return new Response("Unauthorized", { status: 401, headers: { "WWW-Authenticate": "Bearer" } });
    }
    if (url.pathname.startsWith("/evidence/")) {
      const evidenceId = url.pathname.slice("/evidence/".length);
      if (!EVIDENCE_ID_PATTERN.test(evidenceId) || url.search) return new Response("Invalid evidence ID", { status: 400 });
      if (request.method !== "PUT") return new Response("Method Not Allowed", { status: 405, headers: { "Allow": "PUT" } });
      return saveEvidence(request, env, evidenceId);
    }
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: { "Allow": "POST" } });
    }
    if (!(request.headers.get("Content-Type") || "").includes("application/json")) {
      return rpcError(null, -32600, "Content-Type must be application/json", 415);
    }
    const raw = await request.text();
    if (raw.length > 16000) return rpcError(null, -32600, "Request too large", 413);
    let msg;
    try { msg = JSON.parse(raw); } catch { return rpcError(null, -32700, "Parse error", 400); }
    if (!msg || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") {
      return rpcError(msg?.id ?? null, -32600, "Invalid JSON-RPC request", 400);
    }
    if (!Object.prototype.hasOwnProperty.call(msg, "id")) {
      return new Response(null, { status: 202 }); // MCP client notification
    }
    const id = msg.id;
    if (msg.method === "initialize") {
      const requested = msg.params?.protocolVersion;
      const version = ["2025-03-26", "2025-06-18", "2025-11-25"].includes(requested)
        ? requested : "2025-11-25";
      return rpc(id, {
        protocolVersion: version,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "claimflow-systemone-mcp", version: "0.2.0" },
        instructions: "Synthetic claim evidence triage only. No payments, approvals, or data writes."
      });
    }
    if (msg.method === "ping") return rpc(id, {});
    if (msg.method === "tools/list") return rpc(id, { tools: [TOOL, VISUAL_TOOL] });
    if (msg.method === "tools/call") {
      if (msg.params?.name === TOOL.name) return rpc(id, await assessClaim(msg.params.arguments, env));
      if (msg.params?.name === VISUAL_TOOL.name) return rpc(id, await assessClaimVisual(msg.params.arguments, env));
      return rpcError(id, -32602, "Unknown tool name");
    }
    return rpcError(id, -32601, "Method not found");
  }
};
