// Mechanical check for ADR-010 §3: "A promotion missing any required field
// is invalid." Hand-rolled against the fixed field set in
// promotion-record.schema.json rather than a general schema engine, since
// the field set is small and fixed.

const REQUIRED_FIELDS = [
  "artifactDigest",
  "artifactVersion",
  "fsdVersionImplemented",
  "gateResults",
  "promotedBy",
  "promotedAt",
  "migrations",
];

const MIGRATION_PHASES = new Set(["expand", "migrate", "contract"]);

export function validatePromotionRecord(record) {
  const errors = [];

  for (const field of REQUIRED_FIELDS) {
    if (record[field] === undefined || record[field] === null || record[field] === "") {
      errors.push(`missing required field: ${field}`);
    }
  }

  if (Array.isArray(record.gateResults)) {
    if (record.gateResults.length === 0) {
      errors.push("gateResults must not be empty");
    }
    record.gateResults.forEach((g, i) => {
      if (!g || typeof g !== "object") {
        errors.push(`gateResults[${i}] must be an object`);
        return;
      }
      for (const f of ["gate", "passed", "evidence"]) {
        if (g[f] === undefined || g[f] === null || g[f] === "") {
          errors.push(`gateResults[${i}] missing field: ${f}`);
        }
      }
    });
  }

  if (Array.isArray(record.migrations)) {
    record.migrations.forEach((m, i) => {
      if (!m || typeof m !== "object") {
        errors.push(`migrations[${i}] must be an object`);
        return;
      }
      if (!m.name) errors.push(`migrations[${i}] missing field: name`);
      if (!MIGRATION_PHASES.has(m.phase)) {
        errors.push(`migrations[${i}] phase must be one of expand/migrate/contract`);
      }
    });
  }

  return { valid: errors.length === 0, errors };
}
