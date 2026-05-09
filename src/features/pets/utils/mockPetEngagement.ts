/**
 * Deterministic mock engagement metrics for showcase UI (API does not provide these).
 */
export type PetEngagementMetrics = {
  views: number
  downloads: number
  curatorSaves: number
}

export function getPetEngagementMetrics(petId: number): PetEngagementMetrics {
  const n = ((petId * 1_103_515_245 + 12_345) >>> 0) % 1_000_000
  return {
    views: 1_800 + (n % 420_000),
    downloads: 35 + (n % 8_500),
    curatorSaves: 12 + (n % 1_200),
  }
}
