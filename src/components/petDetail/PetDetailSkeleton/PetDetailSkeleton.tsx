import { Skeleton, Stack } from '@mui/material'
import map from 'lodash/map'
import { memo } from 'react'
import './PetDetailSkeleton.css'

const STRIP_COUNT = 5

function PetDetailSkeletonComponent() {
  return (
    <div className="pet-detail-skeleton-root anim-fade-in">
      <div className="pet-detail-skeleton-top">
        <Skeleton variant="rounded" height={40} width={160} className="pet-detail-skeleton-back" />
      </div>
      <div className="pet-detail-skeleton-split">
        <div className="pet-detail-skeleton-media">
          <Skeleton
            variant="rounded"
            height="100%"
            className="pet-detail-skeleton-hero anim-skeleton-block"
          />
        </div>
        <Stack spacing={2} className="pet-detail-skeleton-aside">
          <Skeleton variant="text" height={28} width="55%" />
          <Skeleton variant="text" height={22} width="100%" />
          <Skeleton variant="text" height={22} width="92%" />
          <Skeleton variant="rounded" height={100} width="100%" className="anim-skeleton-block" />
          <div className="pet-detail-skeleton-chips">
            {map(Array.from({ length: 4 }), (_, i) => (
              <Skeleton key={i} variant="rounded" width={72} height={28} />
            ))}
          </div>
          {map(Array.from({ length: 3 }), (_, i) => (
            <Skeleton key={`btn-${i}`} variant="rounded" height={48} />
          ))}
        </Stack>
      </div>
      <div className="pet-detail-skeleton-strip">
        {map(Array.from({ length: STRIP_COUNT }), (_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width={120}
            height={120}
            className="pet-detail-skeleton-thumb"
          />
        ))}
      </div>
    </div>
  )
}

export const PetDetailSkeleton = memo(PetDetailSkeletonComponent)
