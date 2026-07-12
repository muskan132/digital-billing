import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { validatePromotionRecord } from "./validate-promotion-record.mjs";
import { validateMigrationGate } from "./validate-migration-gate.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name) => JSON.parse(readFileSync(path.join(dir, "fixtures", name), "utf8"));

test("promotion record with full evidence passes", () => {
  const result = validatePromotionRecord(fixture("valid-promotion-record.json"));
  assert.equal(result.valid, true, result.errors.join("; "));
});

test("promotion record missing required evidence is rejected mechanically", () => {
  const result = validatePromotionRecord(fixture("invalid-promotion-record.json"));
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.includes("fsdVersionImplemented")));
  assert.ok(result.errors.some((e) => e.includes("gateResults must not be empty")));
  assert.ok(result.errors.some((e) => e.includes("migrations[0] phase")));
});

test("expand-only release manifest passes the migration gate", () => {
  const result = validateMigrationGate(fixture("valid-release-manifest.json"));
  assert.equal(result.valid, true, result.errors.join("; "));
});

test("destructive migration co-released with dependent code removal fails the migration gate", () => {
  const result = validateMigrationGate(fixture("invalid-release-manifest.json"));
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.includes("legacy_x")));
});
