# Shared claim data contract — draft v0.1

**Owner:** Marco + Riccardo. **Approval target:** 24 November 2026. No team member should assume this is a Fleet-native JSON schema.

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

Allowed state labels: `received`, `evidence_needed`, `assessed`, `pending_approval`, `approved`, `rejected`, `escalated`, `closed`. Add exact transition rules before integration. Use `null` or `unknown` rather than fabricated data. All financial numbers and shipping policies in tests are synthetic assumptions.

**Change process:** edit via pull request; Marco and Riccardo approve changes. Update affected skills and tests together.
