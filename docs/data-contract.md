# Shared claim data contract — draft v0.1 and observed storage

**Owner:** Marco + Riccardo. The original conceptual JSON structure below remains a team contract, not a guaranteed Fleet-native JSON schema. The actual runtime data source is a **native Google Sheets workbook** with the tab structure documented after the example.

## Conceptual claim contract (team draft)

```json
{
  "claim_id": "CLM-0007",
  "shipment_id": "SHP-1007",
  "claim_type": "damaged",
  "status": "evidence_needed",
  "source_channel": "email",
  "evidence": [{"kind": "photo", "reference": "photo_07.jpg", "source": "claim_email"}],
  "extracted_facts": {"item": "desk lamp", "quantity": 1},
  "assessment": {"damage_class": "unknown", "confidence": null, "limitations": ["product obscured"]},
  "policy_check": {"policy_version": "demo-v0.1", "result": "insufficient_evidence"},
  "proposed_action": "request_more_evidence",
  "approval": {"required": true, "decision": "pending"},
  "knowledge_flags": ["missing_delivery_note_procedure"],
  "audit_events": []
}
```

Potential status labels in the conceptual design: `received`, `evidence_needed`, `assessed`, `pending_approval`, `approved`, `rejected`, `escalated`, `closed`. **Do not imply transitions are implemented** just because the labels appear here. Missing facts stay `null`, `unknown` or blank as appropriate; no fabricated evidence.

## Verified Google Sheets table contracts (26 Nov)

Columns are ordered as stored. Work with the specific tab and original column order; use unique IDs and read-back verification.

| Tab | Columns in order |
| --- | --- |
| `Claims` | `claim_id`, `shipment_id`, `claim_type`, `status`, `source_channel`, `reported_issue`, `policy_version`, `proposed_action`, `approval_required`, `approval_decision`, `created_at_utc`, `updated_at_utc`, `fixture_note` |
| `Shipments` | `shipment_id`, `tracking_number`, `carrier`, `origin`, `destination`, `item_description`, `quantity`, `declared_value_eur`, `promised_delivery_date`, `actual_delivery_date`, `last_scan_date`, `tracking_status`, `fixture_note` |
| `Evidence` | `evidence_id`, `claim_id`, `shipment_id`, `kind`, `reference`, `source_channel`, `reported_or_observed`, `fact_or_observation`, `source_accessible`, `inspection_method`, `limitations`, `recorded_at_utc` |
| `Decisions` | `decision_id`, `claim_id`, `policy_version`, `recommended_action`, `reviewer`, `review_channel`, `human_decision`, `decision_reference`, `decision_time_utc`, `rationale` |
| `Case_Memory` | `memory_id`, `source_claim_id`, `lesson`, `applies_to`, `approval_status`, `approved_by`, `approved_at_utc`, `source_reference`, `revision` |
| `Knowledge_Flags` | `flag_id`, `claim_id`, `issue_type`, `issue_description`, `source_reference`, `proposed_change`, `review_status`, `reviewer`, `regression_status`, `deployed_revision` |
| `Audit_Log` | `audit_id`, `claim_id`, `event_time_utc`, `actor`, `event_type`, `source_reference`, `outcome`, `details` |
| `Guide` | Workbook instructions; not a business-record table |

**Observed integration:** `CLM-0004 / SHP-1004` had zero inspected Evidence rows, and its `proposed_action` was updated to `request_more_evidence`. The `approval_decision` field **remained `pending`** even though a human later replied in Slack; no later ingestion has been performed.

**ID anomaly:** the actual persisted `Decisions.decision_id` for the first feedback was `Dec-2001`, despite the initial proposed ID `DEC-0001`. Use the observed value in references. Cause not verified.

**Draft vs approved:** `demo-v0.1` is still a draft formal policy. `MEM-0001`, revision `0.2`, is approved **procedural demo memory**, not a change to financial or legal policies.

**Spreadsheet caveat:** dates may be returned as numerical Sheets serial values depending on formatting. Preserve the actual time type and timezone; audit events should use the recording event's real UTC timestamp and original source times should remain references.

**Change process:** schema changes require coordinated PR review by Marco and Riccardo. Update associated skills and test fixtures together; avoid replacing human-approved historical records.
