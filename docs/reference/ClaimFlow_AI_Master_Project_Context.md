---
title: "CLAIMFLOW AI | MASTER PROJECT CONTEXT"
subtitle: "A shared source of truth for the six-person Applied AI for Entrepreneurs team"
author: "ClaimFlow AI — DTU Module 4 Group Project"
date: "23 November 2026 | Version 1.0"
lang: en-GB
---

> **READ THIS FIRST.** This document is the common project context for all six team members and their AI assistants. Upload it **together with** `ClaimFlow_AI_Team_Work_Plan.pdf` (or its Word version), then tell your assistant which role you have. The team plan controls **who does what and when**; this document explains **what we are building, why, and how work should fit together**. Work is provisional wherever a tool or the fourth teaching pack has not yet been verified.

**Status as of 23 November 2026:** Startup concept selected; detailed implementation, integrations, test results, market research and commercial claims are **not yet validated**. We have the three lecture packs dated 12, 19 and 26 November; the fourth pack for the four-week module is **not yet available to the team**. Do not present anticipated features as working features.

# 1. THE PROJECT IN 60 SECONDS

**ClaimFlow AI** is a proposed B2B startup that helps logistics, distribution and e-commerce teams manage claims about **damaged, lost or delayed shipments**. Instead of a single chatbot, ClaimFlow is a coordinated team of AI agents: it collects evidence, interprets photos and documents, makes structured assessments, checks company policy, collaborates with employees in Slack, follows up on claims and learns from approved resolutions.

**The differentiator to demonstrate:** each claim is both an operational task and an opportunity to build reusable company knowledge. A separate **Curator/Knowledge Factory** process looks at flagged gaps, agent traces and human feedback, then proposes *reviewed* improvements to skills and operational knowledge. It does **not** silently rewrite policies.

**Proposed minimum demo:** (1) a new claim arrives; (2) evidence is extracted and assessed using VLM + structured System One reasoning; (3) a policy-aware recommendation is made and an employee approves/escalates it in Slack; (4) an approved lesson is recorded; (5) a second claim benefits from that lesson. Also show an incomplete or unsafe claim being stopped and escalated.

**Our operating principle:** one central Fleet project, versioned team assets in GitHub, realistic synthetic data, shared Slack/Drive, two primary Fleet integrators (Marco and Riccardo), and every member owning a substantial deliverable.

# 2. WHAT THE PROFESSOR ACTUALLY ASKS

The wording below is drawn from the Module 4 brief repeated in the three lecture decks; the newest version is on **slide 21 of `38113lecture261126.pdf`**.

## 2.1 Explicit course requirements — do not omit

1. **Outline a self-driving, multiplayer AI startup**, taking inspiration from Andon Labs, Masad and, in the newest brief, DeepMind. Explain how **teams and AI agents** work together.
2. **Use System One models with structured components**: `state`, `type`, `instructions`, `criteria`. Integrate this approach with **VLMs (vision-language models)**. Explain the fusion of **human and token capital**.
3. Produce a **pitch deck** covering **problem, solution, value and moat**. Discuss **TAM** (total addressable market) and a **SoR** (System of Record) for both agents and people.
4. Explain how **data + workflows become memories**, enabling a **learning loop** and, potentially, a competitive advantage. Connect the choices to the assigned readings (including Anthropic, Nadella, Dorsey and other course examples).
5. Translate the concept into **harness engineering / workflow components in LangSmith Fleet**. The brief explicitly calls for a prompt specifying the intended outcome, **channel input, schedule triggers, tools**, and integration as a **teammate in Slack**. Liquid AI d1 is mentioned as an **example tool**, not a confirmed mandatory model.
6. Submit the **group agentic design** with the named files **`AGENTS.md`, `config.json`, `SKILL.md`, `tools.json`**; a **PDF pitch deck**; and **one one-page PDF per group member** that relates a design choice to articles across **weeks 10, 11, 12 and 13**.
7. **Official deadline: Sunday 6 December 2026**.

## 2.2 Team interpretation — valuable, but NOT a written professor rule

We aim to show a *working, bounded end-to-end demonstration* rather than a slide-only concept; measurable tests rather than unsupported claims; and an explicit Curator Agent as suggested by the third deck. The brief **does not** specify a minimum number of agents, a fixed slide count, a mandatory production deployment, a particular dataset size, or guaranteed use of d1. Do not attribute our own design choices to the professor.

## 2.3 Definitions everyone must use consistently

- **Agent:** an AI-powered worker with a goal, instructions, tools, state and clear authority boundaries; multiple independent models are not automatically a coordinated team.
- **VLM:** a model able to interpret visual input (e.g., photographs/scanned delivery documents); not a substitute for policy or financial checks.
- **System One:** narrowly scoped, structured judgments over provided `state`, with specified question `type`, `instructions` and `criteria`; not vague free-form reasoning.
- **Human-in-the-loop (HITL):** a person approves, rejects or requests changes before consequential actions.
- **Token capital:** model inference and agent work; **human capital** contributes judgment, contextual knowledge, accountability and exception handling.
- **TAM:** the total addressable spending opportunity under stated assumptions; separate from SAM and SOM if you present them.
- **SoR:** trusted operational record of claims, evidence, states, decisions, approvals, actions and outcomes; not merely a chatbot history.
- **Moat:** a difficult-to-copy competitive advantage. Simply saying “we use AI” or “we have memory” is **not** enough.
- **Learning loop:** observed outcome -> feedback -> selected persistent knowledge -> safer or better future execution. **No model fine-tuning is assumed.**

# 3. HOW THE THREE LECTURE PACKS CONNECT TO CLAIMFLOW

Use the **slide numbers below**, not just unsourced buzzwords, in the pitch and one-pagers. Original articles are listed in Section 17. The slide decks are course teaching sources; original articles provide additional depth.

## 3.1 Deck: `38113lecture121126.pdf` (19 slides)

**Slide 2–7 — TypeSafe and the decision-model metaphor.** Decision systems resemble circuits: inputs describing a state flow into deliberately constrained logic, which produces useful values for downstream code. The readings introduce primitives/questions, confidence and design patterns. **ClaimFlow application:** make damage classification and routing explicit, inspectable decision steps, separated from the business action.

**Slide 8–11 — Noul and Choice.** Break broad judgments into narrow questions. A **Noul** is a yes/no judgment returning a probability; a **Choice** selects among described options with probabilities/confidence. **ClaimFlow:** “Is visible damage present?” (Noul) and “Which claim category best fits?” (Choice: damaged / lost / delayed / unclear). Avoid answering questions that the evidence cannot support.

**Slide 12–16 — NVIDIA VFlash / structured visual primitives.** System One-style vision can use structured outputs such as points, bounding boxes and trajectories, with implications for low-latency visual/physical AI. **ClaimFlow:** represent evidence from photos in structured fields; do not claim we use 3D motion or VFlash unless we genuinely implement it.

**Slide 18 — Project brief.** Repeats the required startup, Fleet, Slack and submission elements.

## 3.2 Deck: `38113lecture191126.pdf` (26 slides)

**Slide 2–5 — AI R&D acceleration and representations.** Examples about AI-assisted development and research on internal representations / global workspace. **ClaimFlow:** use as background context on why agents are becoming useful; do not claim consciousness, human-level understanding or a specific productivity uplift for ClaimFlow.

**Slide 6–10 — From passive tools to persistent, cooperative agents.** DeepMind essays discuss agents as participants in a social ecosystem and intelligence arising from coordinated models, personas, skills, tools and memories. **ClaimFlow:** agents have distinct roles and persistent operational state; each is accountable within a governed workflow.

**Slide 11–17 — Anthropic: components of agent memory.** Operational memory can include transcripts, notes, structured representations and information brought into future sessions. Failure review and “dreaming” across sessions can reveal patterns missed during one task. **ClaimFlow:** keep case records, trace/feedback flags and curated lessons *separate*. A later claim retrieves relevant lessons, not an unrestricted dump of past conversations.

**Slide 18–23 — GBrain memory and the idea miner.** Shared memory, human-team context, plain-text/Markdown files and turning past notes into reusable tasks/skills. **ClaimFlow:** preserve knowledge in versioned Markdown skills and readable policy/decision notes, rather than hidden, unreviewable chat history.

**Slide 25 — Updated brief.** Adds attention to a learning loop and articles such as Dorsey.

## 3.3 Deck: `38113lecture261126.pdf` (22 slides)

**Slide 2–11 — DeepMind, “The economics of intelligence.”** Complementary/mosaic skills, different human/AI cooperation regimes, potential organizational changes when agents collaborate rather than work independently, and possible changes to returns to scale. **ClaimFlow:** make clear *why collaboration* between Evidence, Assessment, Resolution, Follow-up, Curator and people beats an isolated classifier. If feasible, compare coordinated workflow against a simpler baseline on the same small test cases. Do not turn economic theory into measured savings without evidence.

**Slide 12–15 — LangChain, “How to build a knowledge factory.”** Better AI at work requires knowing how the company operates. Distinguish: **Skills** (how to work), **Domain knowledge** (policy and business facts), **Data access guidance** (where to get current information). **ClaimFlow:** store each separately and document ownership and update methods.

**Slide 16–19 — Curator loop.** Working agents flag missing/wrong knowledge; traces and human comments are evidence; a curator consolidates these and proposes updates to the knowledge store. **ClaimFlow:** implement at least one reviewable improvement from a failed/incomplete case to an approved procedural lesson, followed by a repeat test. Human validation of changes is our governance decision, not a promise of automatic self-editing.

**Slide 21 — Latest course brief.** Explicitly includes DeepMind; other required deliverables and deadline remain the same.

**Critical conceptual distinction:** **Case memory** stores *what happened*; the **Knowledge Factory** improves *how the organization works*. Both matter; one does not replace the other.

# 4. THE STARTUP: PROBLEM, USERS, VALUE, SCOPE

## 4.1 Problem and target users

Companies handling many shipments receive fragmented reports of damage, loss or delay across emails, photos, delivery notes, order systems and spreadsheets. Employees spend time collecting missing evidence, identifying the right rules, contacting colleagues and carriers, and documenting the outcome. Decisions may be inconsistent and lessons may disappear in inboxes.

**Initial ideal customer profile (hypothesis, not research result):** mid-sized B2B distributors or e-commerce/logistics operations teams processing repetitive shipment claims and already using email, spreadsheets and Slack. **Primary buyer:** claims/operations manager; **day-to-day users:** customer support, logistics, finance and supervisors. Business lead must validate these choices against real evidence.

## 4.2 Product promise (not a measured claim)

ClaimFlow aims to shorten claim-handling effort, make evidence and decisions auditable, reduce preventable mistakes and preserve operational know-how. Automation is **bounded**: agents prepare work and handle routine low-risk steps, while humans retain approval authority over financial commitments, policy exceptions and ambiguous evidence.

## 4.3 Scope for the course prototype

**IN:** damage-claim happy path; photo/PDF/email evidence; a small synthetic shipment table; structured assessment; policy check; Slack approval; status tracking; case memory; supervised Curator loop; test suite; pitch and business case. **OPTIONAL:** lost/delayed variants, scheduled follow-up, mocked carrier emails. **OUT:** full ERP integration, real insurance payout, live carrier API, autonomous refunds, customer-facing production SaaS, legal adjudication, guaranteed fraud detection, retraining a foundation model.

**Do not promise:** “100% accuracy,” “instant settlement,” “no human intervention,” “proven cost savings,” “we are the first,” or “a defensible moat already exists” without evidence.

# 5. TARGET OPERATING WORKFLOW

An end-to-end **claim** is the unit of work and receives one stable `claim_id` throughout the system.

1. **Trigger & intake:** a synthetic customer email or Slack message arrives, possibly with photos and invoice/delivery-document attachments. An intake schedule can check for unresolved claims; during testing use manual/safe triggers first.
2. **Evidence Collector:** extracts shipment ID, sender, order/delivery information, dates, visible damage descriptions, supplied photos, and missing documents. It flags low-quality or contradictory inputs.
3. **Assessment / System One step:** a VLM summarizes what the image *visibly supports*. Structured Noul/Choice judgments classify claim type, evidence completeness and apparent severity; uncertainty is preserved.
4. **Deterministic validation:** code or spreadsheet lookups check whether the shipment ID exists, dates/status match, the claim meets policy windows, and numeric amounts are valid. Do not delegate arithmetic or authoritative policy lookup to vague model opinion.
5. **Resolution Agent:** uses policy and prior approved lessons to propose `request_more_evidence`, `approve_recommendation`, `reject_with_reason` or `escalate`. It must show the policy reference and evidence used.
6. **Human teammate (Slack):** an operator reviews a concise card with claim ID, evidence, recommendation, uncertainties, proposed action and Approve/Reject options. Consequential external actions remain gated.
7. **Follow-up / audit:** record the human decision and outcome; update a simulated source-of-record; draft or send only permitted internal/mock follow-up; timestamp each action.
8. **Memory write:** store a minimal structured record of the case and its resolution, evidence provenance and approved reusable observation.
9. **Knowledge Factory:** the operational agents flag gaps; a Curator reviews flags, traces and human corrections, drafts a proposed update to a skill/guide, and requests approval before applying it. Compare subsequent behavior on a related test case.

**Example:** Shipment `SHP-1007` was reported damaged. The photo looks damaged but the packing slip is missing. The agent should request the missing document or escalate—not invent evidence. A supervisor supplies the correct procedure, and the Curator proposes to add a “missing packing slip” check to the evidence skill. After review, a second similar claim is handled correctly from the start.

# 6. PROPOSED AGENT ARCHITECTURE AND RESPONSIBILITIES

The architecture may be implemented as Fleet agents, sub-agents, structured skills or tool stages, depending on what Fleet actually supports in the shared workspace. **Do not claim multiple independently running agents if the implementation is only one prompt.** Make boundaries visible in the export and demo.

| Component | Input | Main responsibility | Output / authority |
|:---|:---|:---|:---|
| **Orchestrator — Marco** | new claim and current case state | sequence work; call specialists; enforce escalation and state transitions | case state + trace; cannot bypass approvals |
| **Evidence Collector — Member 3** | email, photos, document files | extract fields, cite origins, identify missing/unclear evidence | structured evidence record; cannot approve claims |
| **Assessment / System One — Riccardo** | evidence record, permitted visual analysis | narrowly scoped visual/classification judgments + confidence | assessment; cannot set policy or make payment |
| **Resolution & Slack — Member 4** | assessment, policy, historical lessons | propose actions, prepare Slack decision, respect authorization | proposed resolution, human decision |
| **Memory & Curator — Member 5** | cases, traces, flags, approved feedback | preserve outcomes; propose knowledge updates | versioned lesson proposals; no automatic policy change |
| **Business & pitch — Member 6** | product design, tests, research | ICP, TAM/SAM/SOM, SoR, value and moat narrative | sourced business case and pitch deck |

**Inter-agent rules:** every step accepts structured inputs; every decision includes rationale and provenance; agents do not overwrite others' authoritative fields; errors are represented as errors; a failed tool call must not be treated as success; the orchestrator may retry safely but must preserve duplicate protections.

# 7. SHARED DATA CONTRACT — PROPOSED V1

Every member should design against one shared contract, approved by Marco and Riccardo **on 24 November**. The following is an illustrative schema, **not a professor-defined API or a verified Fleet native format**.

```json
{
  "claim_id": "CLM-0007",
  "shipment_id": "SHP-1007",
  "claim_type": "damaged",
  "status": "needs_human_review",
  "received_at": "2026-11-27T10:30:00Z",
  "source_channel": "email",
  "evidence": [
    {"kind": "photo", "reference": "sample/damage_07.jpg", "source": "customer_email"},
    {"kind": "delivery_note", "reference": null, "source": "missing"}
  ],
  "extracted_facts": {"item": "desk lamp", "quantity": 1},
  "assessment": {
    "visible_damage": "likely",
    "damage_class": "packaging_damage",
    "confidence": null,
    "limitations": ["product itself not fully visible"]
  },
  "policy_check": {"policy_version": "v1", "result": "insufficient_evidence"},
  "proposed_action": "request_more_evidence",
  "approval": {"required": true, "decision": "pending"},
  "knowledge_flags": ["missing_delivery_note_procedure"],
  "audit_events": []
}
```

**Minimum lifecycle states:** `received`, `evidence_needed`, `assessed`, `pending_approval`, `approved`, `rejected`, `escalated`, `closed`. Write explicit allowed transitions and distinguish claim outcome from technical workflow success. Values and policy thresholds are **fictional test fixtures**, not logistics-industry standards.

**Evidence rules:** for each relevant extracted value, maintain its source reference; use `unknown`/`null` for missing facts; preserve originals; separate image observation (“cardboard torn”) from inference (“product damaged”). Keep claim IDs and document names consistent across everyone's data.

# 8. SYSTEM ONE + VLM DESIGN REQUIREMENTS

**Structured decision pattern (design example, not a confirmed Liquid API payload):**

- **`state`:** the documented facts about shipment, images, extracted text and applicable policy version; do not include fabricated facts.
- **`type: "noul"`:** e.g., “Is damage visibly present in the supplied photo?” with clear positive/negative criteria; collect probability where the chosen provider supports it.
- **`type: "choice"`:** e.g., claim category among `damaged`, `lost`, `delayed`, `insufficient_information`, with descriptive option criteria.
- **`instructions`:** one explicit decision question, not “solve the entire case.”
- **`criteria`:** what each classification means, exclusions, and what to do when the evidence is insufficient.

**Example decision:** `state = image summary + shipment facts`; `type = choice`; `instructions = "Classify the evidence-supported reason for this claim"`; `criteria = {damaged: "visible damage evidence", lost: "confirmed missing delivery evidence", delayed: "delivery after expected date", insufficient_information: "none can be supported"}`. Require a *separate* policy check and explicit human escalation for ambiguity.

**Critical distinction:** a VLM may extract/describe observations, a System One question may classify them, and deterministic logic checks eligibility. **No uncalibrated model probability should be treated as an insurance-grade confidence guarantee.** Report which provider was actually used, the prompt, example inputs and test limitations. Liquid AI d1 is a **possible** tool if access/integration is verified; another credible VLM/structured model can be used transparently if not.

# 9. MEMORY AND KNOWLEDGE FACTORY — NON-NEGOTIABLE DIFFERENCE

## 9.1 Three distinct knowledge layers

1. **Case memory (episodic / SoR):** original claim, evidence, approvals, correspondence and outcomes. This is an auditable historical record; approved outcomes are not universal policies.
2. **Domain knowledge (facts and business policy):** synthetic refund thresholds, permitted actions, missing-evidence rules, carrier claim windows; each has a version, author and effective date. Only an authorized human changes formal policies.
3. **Procedural knowledge (skills + data access guidance):** `SKILL.md` and related notes explaining *how* to triage, where to read shipment status, how to ask for missing evidence and when to escalate.

## 9.2 Curator loop to demonstrate

**Operational claim → flag missing/wrong knowledge → capture trace + operator feedback → Curator drafts specific change → human reviews diff → approved skill/guide version updated → replay the original problem on a new case → compare against baseline.**

The Curator must attach: (i) problem observed, (ii) claim/trace supporting it, (iii) exact file/section to improve, (iv) proposed replacement text, (v) potential side effects, (vi) reviewer decision. Do not overwrite the old version; use Git history. Untrusted customer documents must never become policy instructions by themselves.

**Suggested smallest measurable example:** Baseline Evidence Collector fails to flag a missing delivery note; operator corrects it; Curator proposes a checklist addition; the modified skill catches the omission on a second synthetic claim. Show screenshots/traces and expected vs observed outputs. This is **procedural learning**, not automatic retraining.

**Memory selection:** retrieve only related, reviewed, non-sensitive observations. Old cases are context, not binding authority. If a previous resolution conflicts with current policy, current policy wins and the conflict becomes a flag.

# 10. WORKSPACE, VERSIONING AND FLEET DISCIPLINE

## 10.1 Shared environment

- **Dedicated project Gmail:** administrator identity and controlled synthetic claim inbox; use fictional data only.
- **One central LangSmith Fleet project:** integrated agent architecture, tool links, channels, safe triggers, memory and final export. **Marco and Riccardo** are the primary operators, reducing collisions and unplanned usage.
- **Slack workspace:** team collaboration + demo environment for @agent messages, approval threads and simulated case handling. Invite people individually where possible.
- **Google Drive / Docs / Slides / Sheets:** shared teaching packs, draft slide deck and one-pagers, synthetic shipment/policy tables.
- **GitHub private repository:** technical source of truth for prompts, skills, mock data, schemas, tests, documentation and reviewed changes.

**Security:** one central project does **not** require six people to share one password. Prefer individual invitations and permissions. Store credentials in secure service settings; do not put OAuth tokens, passwords, `.env`, customer PII or API keys in GitHub, documents or LLM prompts.

## 10.2 Suggested repository structure (team proposal)

```text
claimflow-ai/
  README.md
  docs/architecture.md
  docs/data-contract.md
  docs/decisions.md
  docs/demo-script.md
  fleet/                   # reviewed export snapshots; no secrets
  skills/evidence/SKILL.md
  skills/assessment/SKILL.md
  skills/resolution/SKILL.md
  skills/curator/SKILL.md
  policies/synthetic-claims-policy.md
  data/synthetic/          # images, emails, shipment data, labels
  tests/cases/             # inputs + expected outcomes
  tests/results/           # recorded observations + trace IDs
  research/sources.md
  pitch/
  one-pagers/
```

The exact Fleet export may organize files differently; **preserve Fleet's native format rather than inventing a false export structure**. The official Fleet export can include `AGENTS.md`, `config.json`, `tools.json`, optional `subagents/` and `skills/` directories. Verify that an actual `SKILL.md` is included/identified for the final professor checklist.

## 10.3 Workflow and safe credit use

All members draft and review in GitHub/Drive. Marco/Riccardo integrate reviewed files into Fleet, run planned single-case tests, record observed results and export snapshots. Use meaningful branches and pull requests; require at least one reviewer for policy, prompts or tool changes. Keep a brief `docs/decisions.md` log of alternatives and why chosen. Avoid uncontrolled recurring triggers and repeated model calls; turn scheduled tests on only when intentionally evaluating them. **Fleet is where the integrated system is tested, not the only place people can contribute.**

**Critical early check:** verify the actual Fleet account supports vision input, the intended model/tool, the Slack integration, approval controls, schedules and export in the specific workspace. Do not claim capabilities merely because documentation mentions them. A fallback is legitimate if disclosed.

# 11. WHO OWNS WHAT — MATCH THE TEAM WORK PLAN

**Marco — Project Coordinator & AI Architect.** Create environments; own `docs/architecture.md`, shared data contract, orchestrator instructions, top-level `AGENTS.md`/`config.json`, scope and milestone tracking; integrate with Riccardo; own final export and submission. Review everything for consistency.

**Riccardo — Fleet & AI Integration.** Run a Fleet capability test; configure visual input and the System One-like assessment; implement/connect tools and `tools.json`; help turn reviewed team skills into working agents; troubleshoot and document actual integration behavior. Joint owner of technical demo with Marco.

**Member 3 — Evidence & Documents.** Create realistic *synthetic* emails, photos, shipment records and attachments with ground-truth answers; define field extraction; write `skills/evidence/SKILL.md`; provide complete, partial and ambiguous evidence tests.

**Member 4 — Claims Resolution & Slack.** Write clear synthetic claims policy; encode proposal/escalation/approval rules; prepare concise Slack interactions and messages; write `skills/resolution/SKILL.md`; create negative tests for non-authorized settlement, missing evidence and policy conflicts.

**Member 5 — Memory, Learning & Evaluation.** Define case-history schema and retriever; write/coordinate `skills/curator/SKILL.md`; design trace flags, reviewer approval and the update diff; create evaluation matrix and the “case 1 -> feedback -> approved update -> case 2” comparison; maintain results.

**Member 6 — Business Strategy & Pitch.** Research target customer and competitors; define bottom-up market sizing and a cautious business case; explain why ClaimFlow's governed claim/decision history may evolve into a SoR and moat; coordinate pitch deck content and collect trace/screenshots/results from technical owners. Edit the six one-pagers for consistency **without writing them for everyone**.

**Every member:** provide (a) a concrete artifact, (b) how to test or review it, (c) at least one design rationale grounded in teaching sources, and (d) a **personal one-page PDF** describing their own actual decisions.

# 12. DEADLINES — ALIGNED WITH THE EXISTING TEAM PLAN

**All dates are in 2026; official submission is Sunday 6 December.** Upload the promised artifact by the end of its date, not merely a verbal status update. These milestones **replace the older provisional November 22 schedule**; the accompanying `ClaimFlow_AI_Team_Work_Plan` remains the operational reference.

| Date | Responsible | Required checkpoint / definition of done |
|:---|:---|:---|
| **Tue 24 Nov** | Marco + everyone | Accounts, repository/Drive/Slack, six roles, one agreed demonstration case and a signed-off common claim data contract. |
| **Wed 25 Nov** | Marco + Riccardo | Fleet feasibility proof: agent -> tool -> Slack; visual input, structured choice, approval and export checked. Record limitations and fallback. |
| **Fri 27 Nov** | Members 3–6 | Evidence dataset + skill; resolution policy + skill + Slack flow; memory/Curator design + tests; sourced market research + pitch outline. All files reviewable. |
| **Sun 29 Nov** | Marco + Riccardo + Members 3–4 | First complete demo: intake -> evidence -> assessment -> recommendation -> Slack approval/escalation. Capture reproducible proof. |
| **Tue 1 Dec** | Member 5 + technical team | Supervised Curator loop and later-case improvement; happy, ambiguous and rejected/escalated tests; initial metrics. |
| **Wed 2 Dec** | Everyone; Member 6 coordinates | Pitch deck draft; six complete individual one-pagers; technical docs, demo screenshots and references ready for review. |
| **Thu 3 Dec** | Everyone | Cross-review: consistency, theory, tested claims, citations, filenames and demo. Scope freeze; fix defects only. |
| **Fri 4 Dec** | Marco + Riccardo + everyone | Verified export ZIP (`AGENTS.md`, `config.json`, relevant `SKILL.md`, `tools.json`) + final pitch PDF + 6 one-pager PDFs. Submit early if ready. |
| **Sat 5 Dec** | Backup only | Contingency for errors; no untested new features. |
| **Sun 6 Dec** | Official course deadline | Absolute hand-in deadline; do not plan to finish content today. |

**Dependency warning:** if the 25 November Fleet capability check fails, activate a documented fallback immediately rather than blocking everyone. If the fourth teaching pack arrives late, integrate its content into the theory map and one-pagers **without changing validated agent behavior unnecessarily**.

# 13. TEST DATA, VALIDATION AND EVIDENCE

**Recommended test pack:** start with around **10–15 fictional claims**, not hundreds. Assign expected labels, expected next actions, evidence availability, and approval requirements. Include variations with damaged packaging vs visibly damaged goods; clear vs blurry images; valid vs missing order ID; missing delivery note; inconsistent dates; attempted unauthorized refund; a delayed or lost shipment as an extension; at least one hostile/instructional string embedded in a document; and two linked cases designed to test the Curator improvement.

**Suggested measures** (calculate only from executed cases):

- **Field extraction accuracy:** correctly extracted required fields / evaluated required fields, with missing fields handled explicitly.
- **Claim classification accuracy:** correct categorical outcomes / labelled cases; include an `unclear` class.
- **Escalation correctness:** fraction of cases that truly required review and were routed to a human; report false escalations too.
- **Policy safety:** count of unauthorized approvals/actions (desired: zero in the test suite).
- **Workflow completion:** successful end-to-end cases / attempted test cases; include tool failures.
- **Learning effect:** same kind of case before/after an *approved skill update*, showing specific improvement and whether regression tests still pass.
- **Efficiency:** observed steps, tool/model calls or handling time; distinguish measurements from assumptions. Record Fleet usage if visible.

**Minimum proof pack:** a test-case table, input examples, actual trace IDs/screenshots or run logs, Slack approval evidence, knowledge-update diff/review, and failure cases. No cherry-picking: show one limitation and how the design handles it. Do not label a fabricated run a real Fleet result.

# 14. BUSINESS MODEL, TAM, SoR AND MOAT

**Positioning hypothesis:** “The AI claims-operations teammate that turns scattered shipment evidence into governed resolutions and reusable logistics knowledge.” The customer buys fewer manual handoffs, faster case preparation and organizational consistency—not a model API.

**Market research tasks:** define the paying customer, who currently solves the problem, substitute workflows and direct competitors; cite dates and reputable sources; explain why a first segment is reachable. Possible pricing hypotheses include per-seat + claim-volume tiers, per-processed-claim fees, or a base SaaS contract with volume limits. These are **scenarios**, not validated willingness to pay.

**Transparent TAM approach (illustrative):** `eligible firms × plausible annual contract value` OR `addressable annual claims × price per claim`—choose a defensible method, define geography and eligible segment, avoid double counting, state source and assumptions, and show a reasonable range. Do not use total parcel-shipping revenue as though every euro were claims-software revenue. Separate TAM / SAM / SOM if the deck has space.

**System of Record:** a governed claims ledger with evidence provenance, policy version, model suggestion, human approval, status transitions and eventual outcome. Existing ERPs/CRMs remain systems of record for their own domains; ClaimFlow is an *operational SoR for claims decisions* only if customers adopt it as the trusted record.

**Potential moat (not yet proven):** a permissioned, historical library linking claim types, evidence quality, carrier patterns, human decisions, procedure revisions and final outcomes. As volume rises, specialized reusable instructions and team workflows can become more accurate and costly to reproduce. Explain **why data rights, integration depth, feedback density and workflow adoption** matter; avoid asserting that memory alone is durable defensibility.

**Illustrative value story:** “The system collects 5 pieces of evidence automatically and routes the one ambiguous policy decision to a human.” Replace with measured figures only after tests; do not invent customer ROI percentages.

# 15. PITCH DECK — RECOMMENDED STORY, NOT MANDATED SLIDE COUNT

1. **Title + one-sentence promise:** ClaimFlow AI, autonomous logistics claims team.
2. **Problem:** fragmented shipping claims workflow and why current handoffs are costly; one evidence-backed example.
3. **Target customer + market:** ICP, buyer, TAM method and assumptions.
4. **Solution:** claim from email/photo to a traceable resolution; clear boundaries.
5. **Multiplayer agent workflow:** specialist roles, handoffs and human capital/token capital interplay.
6. **System One + VLM:** show `state/type/instructions/criteria`, visual evidence and deterministic checks.
7. **Fleet and Slack demo:** actual workflow, triggers, tools, approvals and traces.
8. **Memory + Knowledge Factory:** case memory, flags, Curator proposal, approved skill update, later-case benefit.
9. **SoR + moat:** trusted decision ledger and how compounding know-how may differentiate the product.
10. **Business model + evidence + roadmap:** initial tests, limitations, next steps; no fabricated traction.

**Visual discipline:** use screenshots of the actual prototype; diagrams should match the real implementation. Attribute market facts. Use *one problem/claim journey* throughout the deck to keep it coherent. Presenter claims must match documented test results.

# 16. INDIVIDUAL ONE-PAGERS AND HOW TO WORK WITH AN LLM

## 16.1 Six complementary one-page topics

- **Marco:** orchestrating specialist agents and human/token capital; connect to DeepMind cooperation and harness engineering.
- **Riccardo:** System One primitives, VLM integration, tool boundaries and why structured decisions are inspectable; connect to TypeSafe / NVIDIA.
- **Member 3:** evidence quality, data provenance, visual processing, uncertainty and the importance of reliable inputs; connect to the System One slides.
- **Member 4:** agent-human collaboration, approvals, escalation and operating rules; connect to DeepMind's agent ecosystem and the startup brief.
- **Member 5:** memory vs curated knowledge, Anthropic dreaming, LangChain's Knowledge Factory and a measured before/after change.
- **Member 6:** TAM, System of Record, defensible learning-loop moat and why cooperative AI changes the organizational value proposition; connect to DeepMind economics and course business references.

**Recommended one-page structure:** chosen design decision -> concrete ClaimFlow implementation -> link to a named article + lecture slide -> expected benefit and limitation -> evidence or test -> short source references. Each person writes about **what they really built/researched**; every one-pager should include **source-accurate citations**, not generic AI enthusiasm. Across the six reports and deck, incorporate weeks 10–13 once all materials exist.

## 16.2 Source and instruction priority for any LLM

1. **The professor's exact assignment / original lecture PDFs** govern what is explicitly required.
2. **The team's latest work plan** governs owners, deliverables and dates.
3. **This master context** governs the agreed product design and proposed standards.
4. **Actual Fleet UI/export, real test results and authoritative product docs** govern claims about implemented features.
5. **The model's own suggestions** are hypotheses until validated.

If materials contradict, point out the conflict; **do not silently rewrite the brief**. Do not assume a tool, document, credential or fourth lecture pack exists unless supplied. Ask the role owner for a missing dependency when it is genuinely necessary, while offering a safe partial result. Never disclose keys or invent results.

## 16.3 Copy-paste opening prompt for every team member

> I am **[Marco / Riccardo / Member 3 / Member 4 / Member 5 / Member 6]**, responsible for **[role]** in the DTU Applied AI for Entrepreneurs project **ClaimFlow AI**. I have uploaded **ClaimFlow_AI_Master_Project_Context** and **ClaimFlow_AI_Team_Work_Plan**, plus any available lecture PDFs. Read them fully. Treat the professor's exact requirements as authoritative; distinguish mandatory tasks from team proposals. Use the role assignment and dates from the team plan. First: (1) state precisely what I own, my next deadline, and dependencies; (2) identify the files and acceptance tests I must produce; (3) propose the smallest practical implementation sequence; (4) help me create each deliverable in a form ready for GitHub/Drive/Fleet; (5) check it against the course theory, especially System One/VLM, cooperation, memory and the Knowledge Factory. Never invent working integrations, test results, citations, market numbers or undocumented policy. Keep outputs consistent with the shared data contract. Before considering my task finished, provide a verification checklist and a concise handoff note for Marco and Riccardo.

## 16.4 Standard handoff message (post in Slack with every milestone)

**Owner / item / date:** ...  
**Files changed (GitHub/Drive):** ...  
**What works or is ready for review:** ...  
**Test performed and evidence link:** ...  
**What is only planned / unverified:** ...  
**Dependencies or blockers for another member:** ...  
**Next action / deadline:** ...

# 17. READING MAP AND REFERENCED DOCUMENTS

**Authoritative course files (already received):**

- `38113lecture121126.pdf` — TypeSafe decision primitives and NVIDIA VFlash; Module 4 instructions on slide 18.
- `38113lecture191126.pdf` — agent ecosystems, Anthropic memory and GBrain; instructions on slide 25.
- `38113lecture261126.pdf` — DeepMind economics, LangChain Knowledge Factory; newest instructions on slide 21.
- **Fourth teaching pack / week 13:** pending. **Do not invent its contents or claim it has been analyzed.** Update this document when received.
- `ClaimFlow_AI_Team_Work_Plan.pdf` (and `.docx`) — the agreed team ownership and milestones as of 23 November.

**Key original reading links introduced in the slides:**

- TypeSafe, “Don't Call It a Decision Model”: https://typesafe.ai/blog/dont-call-it-a-decision-model
- TypeSafe primitives / Noul / Choice / confidence / patterns: https://docs.typesafe.ai/primitives ; https://docs.typesafe.ai/primitives/noul ; https://docs.typesafe.ai/primitives/choice ; https://docs.typesafe.ai/confidence ; https://docs.typesafe.ai/patterns
- NVIDIA VFlash: https://research.nvidia.com/labs/lpr/vflash/
- DeepMind Institute, “Consider the agent”: https://institute.deepmind.com/essays/consider-the-agent/
- DeepMind Institute, “Artificial symbiotic intelligence”: https://institute.deepmind.com/essays/artificial-symbiotic-intelligence/
- Anthropic, “The components of agent memory”: https://www.anthropic.com/research/components-of-agent-memory
- GBrain product/memory/idea miner examples: https://gbrain.io/features ; https://gbrain.io/memory/features/every-assistant ; https://gbrain.io/memory/features/plain-text-files ; https://gbrain.io/s/idea-miner-what-to-build-rrhjgv
- DeepMind Institute, “The economics of intelligence”: course-deck reference; verify the exact original publication/link before quoting numbers or graphics.
- LangChain, “How to build a knowledge factory” (21 Nov 2026): https://www.langchain.com/blog/knowledge-factory

**Platform implementation references, not professor requirements:**

- Official LangSmith Fleet announcement, sharing and Slack agents: https://www.langchain.com/blog/introducing-langsmith-fleet
- LangSmith Fleet export guide/source: https://github.com/langchain-ai/docs/blob/main/src/langsmith/fleet/code.mdx
- Fleet export example/runtime: https://github.com/langchain-ai/fleet-deepagents-export

**Caution on citations:** Nadella, Dorsey, a16z, Andon Labs and Masad appear in the brief, but the exact relevant publications are **not fully identified in the three supplied lecture decks**. Member 6 and the one-pager owners should find and cite the precise articles before making claims about them, rather than inventing titles or quotations.

# 18. FINAL PRE-SUBMISSION QUALITY GATE

- [ ] We can explain the problem, buyer, solution, market assumptions and why it is a *multiplayer* AI startup.
- [ ] The exported architecture and real demo show who does each task and how the work is coordinated.
- [ ] At least one real visual input and a structured `state/type/instructions/criteria` decision are shown, or an honest documented integration limitation/fallback is supplied.
- [ ] Workflow prompt, input channel, planned/actual schedule trigger, tools and Slack teammate behavior are specified.
- [ ] Human approvals, rejection/escalation and audit trail work; ambiguous or missing evidence never silently becomes certainty.
- [ ] Case memory is distinguished from Curator-managed skills/knowledge, and the learning loop includes a before/after validation.
- [ ] The claims SoR and proposed moat are explained without overstating competitive differentiation.
- [ ] Test cases, expected outputs, actual results, screenshots/traces and limitations are present.
- [ ] The pitch deck PDF is complete, coherent, cited and faithful to the implementation.
- [ ] Each of six people has a separate **one-page PDF** tied to actual design choices and the provided literature.
- [ ] Fleet export includes/identifies **`AGENTS.md`, `config.json`, `SKILL.md` and `tools.json`**, with working links/configuration checked and no secrets.
- [ ] Weeks 10–13 are considered; pending fourth pack is incorporated as soon as supplied.
- [ ] Cross-review completed on **3 December**, files finalised by **4 December**, submission made before **6 December 2026**.

**Success means a coherent, testable, well-evidenced design.** This guide is intended to support a high-quality academic submission; it is **not** an official grading rubric and no document can guarantee the maximum grade.
