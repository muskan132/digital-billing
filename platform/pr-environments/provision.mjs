// CLI entry: given the plan JSON from detect.mjs, starts a compose project
// for each touched service that has a compose definition. Services with no
// compose definition are left untouched (no infrastructure is invented).
// Writes the list of services actually started to startedOutPath so
// teardown.mjs can always find and stop exactly what this step started.

import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const BOM = String.fromCharCode(0xfeff);

const [planPath, startedOutPath] = process.argv.slice(2);
const plan = JSON.parse(readFileSync(planPath, "utf8").replace(BOM, ""));

const started = [];
for (const entry of plan) {
  if (!entry.found) continue;
  const projectName = `pr-env-${entry.service}`;
  execSync(`docker compose -f ${entry.composePath} -p ${projectName} up -d --wait`, {
    stdio: "inherit",
  });
  started.push({ ...entry, projectName });
}

writeFileSync(startedOutPath, JSON.stringify(started));
