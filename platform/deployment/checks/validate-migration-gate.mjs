// Mechanical check for ADR-010 §7 / Blueprint §19: "Never a destructive
// schema change in the same release as the code that stops using the
// column." A release manifest fails this gate if any migration tagged
// "contract" for a column coincides, in the same manifest, with a code
// change that stops using that same column.

export function validateMigrationGate(releaseManifest) {
  const errors = [];
  const migrations = Array.isArray(releaseManifest.migrations) ? releaseManifest.migrations : [];
  const codeChanges = Array.isArray(releaseManifest.codeChanges) ? releaseManifest.codeChanges : [];

  const stoppedUsingColumns = new Set(
    codeChanges.filter((c) => c && c.type === "stop-using-column" && c.column).map((c) => c.column),
  );

  migrations
    .filter((m) => m && m.phase === "contract" && m.column)
    .forEach((m) => {
      if (stoppedUsingColumns.has(m.column)) {
        errors.push(
          `destructive migration co-released with dependent code removal for column: ${m.column}`,
        );
      }
    });

  return { valid: errors.length === 0, errors };
}
