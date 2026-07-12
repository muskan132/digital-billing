// CLI entry: renders the plan (and, if present, the started list) as a
// Markdown table for the GitHub Actions job summary — showing, per touched
// service, whether a compose definition was found, whether an environment
// was started or skipped, and why.

import { existsSync, readFileSync } from "node:fs";

const BOM = String.fromCharCode(0xfeff);

const [planPath, startedPath] = process.argv.slice(2);
const plan = JSON.parse(readFileSync(planPath, "utf8").replace(BOM, ""));
const started =
  startedPath && existsSync(startedPath)
    ? JSON.parse(readFileSync(startedPath, "utf8").replace(BOM, ""))
    : [];
const startedServices = new Set(started.map((s) => s.service));

const lines = [
  "### Ephemeral PR Environment",
  "",
  "| Service | Compose definition | Action | Reason |",
  "|---|---|---|---|",
];

if (plan.length === 0) {
  lines.push("| — | — | skipped | no `services/*` directory was touched by this PR |");
} else {
  for (const entry of plan) {
    if (!entry.found) {
      lines.push(
        `| ${entry.service} | not found (\`${entry.composePath}\`) | skipped | no compose definition exists for this service yet |`,
      );
    } else if (startedServices.has(entry.service)) {
      lines.push(
        `| ${entry.service} | found (\`${entry.composePath}\`) | started | environment provisioned; torn down at job end |`,
      );
    } else {
      lines.push(
        `| ${entry.service} | found (\`${entry.composePath}\`) | failed | provisioning did not complete — see job log |`,
      );
    }
  }
}

process.stdout.write(lines.join("\n") + "\n");
