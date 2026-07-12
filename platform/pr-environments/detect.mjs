// CLI entry: reads a newline-delimited changed-files list (path given as
// argv[2]) and prints the resolution plan (one entry per touched service)
// as JSON to stdout. Kept separate from resolve-service-compose.mjs so that
// module stays pure and unit-testable.

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { detectTouchedServices, resolveComposeDefinition } from "./resolve-service-compose.mjs";

const BOM = String.fromCharCode(0xfeff);

const dir = path.dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(path.join(dir, "config.json"), "utf8"));

const changedFilesPath = process.argv[2];
const changedFiles = changedFilesPath
  ? readFileSync(changedFilesPath, "utf8")
      .replace(BOM, "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
  : [];

const services = detectTouchedServices(changedFiles, config.servicesRoot);
const plan = services.map((service) => resolveComposeDefinition(service, config));

process.stdout.write(JSON.stringify(plan));
