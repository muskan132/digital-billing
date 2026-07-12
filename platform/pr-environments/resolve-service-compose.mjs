// Pure resolution logic for the F-04 ephemeral per-PR environment mechanism.
// The compose filename/servicesRoot convention is repository configuration
// (config.json), not hardcoded here, so it can evolve without a code change.

import { existsSync } from "node:fs";
import path from "node:path";

export function detectTouchedServices(changedFiles, servicesRoot) {
  const prefix = `${servicesRoot}/`;
  const services = new Set();
  for (const file of changedFiles) {
    const normalized = file.replace(/\\/g, "/");
    if (normalized.startsWith(prefix)) {
      const serviceName = normalized.slice(prefix.length).split("/")[0];
      if (serviceName) services.add(serviceName);
    }
  }
  return [...services].sort();
}

export function resolveComposeDefinition(serviceName, config, checkExists = existsSync) {
  const composePath = path.posix.join(config.servicesRoot, serviceName, config.composeFilename);
  return {
    service: serviceName,
    composeFilename: config.composeFilename,
    composePath,
    found: checkExists(composePath),
  };
}
