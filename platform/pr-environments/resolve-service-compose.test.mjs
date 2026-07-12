import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { detectTouchedServices, resolveComposeDefinition } from "./resolve-service-compose.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(path.join(dir, "config.json"), "utf8"));

test("detects a single touched service from changed file paths", () => {
  const changed = ["services/ingestion/src/index.ts", "services/ingestion/README.md"];
  assert.deepEqual(detectTouchedServices(changed, config.servicesRoot), ["ingestion"]);
});

test("detects multiple distinct touched services, deduped and sorted", () => {
  const changed = ["services/dispatch/a.ts", "services/ingestion/b.ts", "services/dispatch/c.ts"];
  assert.deepEqual(detectTouchedServices(changed, config.servicesRoot), ["dispatch", "ingestion"]);
});

test("ignores changed files outside servicesRoot", () => {
  const changed = ["docs/README.md", "libs/common/index.ts"];
  assert.deepEqual(detectTouchedServices(changed, config.servicesRoot), []);
});

// No fixture/placeholder compose file is created for this test. The repo
// currently has no compose definition for any service — this assertion
// checks that real, current state, not a fabricated one.
test("resolves to not-found when no compose definition exists (current real repo state)", () => {
  const result = resolveComposeDefinition("ingestion", config);
  assert.equal(result.found, false);
  assert.equal(result.composePath, "services/ingestion/docker-compose.ci.yml");
});

// The "found" branch is proven with an injected existence check rather than
// a real file, so no placeholder infrastructure is added to the repo.
test("resolves to found when a compose definition exists (injected check, no fixture file)", () => {
  const result = resolveComposeDefinition("ingestion", config, () => true);
  assert.equal(result.found, true);
});
