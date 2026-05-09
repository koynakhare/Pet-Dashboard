import { Typography } from '@mui/material'
import map from 'lodash/map'
import { memo, type ReactNode } from 'react'
import './PetStats.css'

export type PetStatItem = {
  id: string
  label: string
  value: string
  icon: ReactNode
}

type PetStatsProps = {
  items: PetStatItem[]
}

const STAGGER = [
  'anim-stagger-1',
  'anim-stagger-2',
  'anim-stagger-3',
  'anim-stagger-4',
]

function PetStatsComponent({ items }: PetStatsProps) {
  return (
    <div className="pet-detail-stats">
      {map(items, (item, index) => (
        <div
          key={item.id}
          className={`pet-detail-stat-card glass-surface anim-slide-up ${STAGGER[index % STAGGER.length] ?? ''}`}
        >
          <span className="pet-detail-stat-icon anim-icon-spin-hover" aria-hidden="true">
            {item.icon}
          </span>
          <div className="pet-detail-stat-copy">
            <Typography component="p" className="pet-detail-stat-value">
              {item.value}
            </Typography>
            <Typography component="p" className="pet-detail-stat-label">
              {item.label}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  )
}

export const PetStats = memo(PetStatsComponent)
