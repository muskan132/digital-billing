// CLI entry: tears down every compose project recorded by provision.mjs.
// Run with if: always() in the workflow so nothing is ever left running,
// regardless of whether the provisioning or smoke-check step failed.

import { existsSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";

const BOM = String.fromCharCode(0xfeff);

const [startedPath] = process.argv.slice(2);

if (!startedPath || !existsSync(startedPath)) {
  process.exit(0);
}

const started = JSON.parse(readFileSync(startedPath, "utf8").replace(BOM, ""));
for (const entry of started) {
  execSync(`docker compose -f ${entry.composePath} -p ${entry.projectName} down -v`, {
    stdio: "inherit",
  });
}
