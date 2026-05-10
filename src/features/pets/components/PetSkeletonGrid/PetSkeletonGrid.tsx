import { Skeleton, Stack } from '@mui/material'
import './PetSkeletonGrid.css'

type PetSkeletonGridProps = {
  count?: number
}

export function PetSkeletonGrid({ count = 8 }: PetSkeletonGridProps) {
  return (
    <Stack className="gallery-skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton placeholders have fixed order (count only).
        <Stack key={index} spacing={1} className="gallery-skeleton-item">
          <Skeleton variant="rounded" height={190} />
          <Skeleton variant="text" height={28} />
          <Skeleton variant="text" />
          <Skeleton variant="rounded" height={36} />
        </Stack>
      ))}
    </Stack>
  )
}
