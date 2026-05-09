/**
 * Deterministic mock download size in MB per pet (client requirement: ~1–5 MB).
 * Stable for the same id across sessions.
 */
export function mockEstimatedSizeMb(id: number): number {
  const mixed = ((id * 9301 + 49297) % 233280) / 233280
  const mb = 1 + mixed * 4
  return Math.round(mb * 100) / 100
}
