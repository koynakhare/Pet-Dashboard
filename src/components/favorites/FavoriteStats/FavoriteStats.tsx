import Typography from '@mui/material/Typography'
import map from 'lodash/map'
import './FavoriteStats.css'

export type FavoriteStatItem = {
  id: string
  label: string
  value: string
}

type FavoriteStatsProps = {
  stats: FavoriteStatItem[]
}

const STAGGER_CLASSES = ['anim-stagger-1', 'anim-stagger-2', 'anim-stagger-3', 'anim-stagger-4']

export function FavoriteStats({ stats }: FavoriteStatsProps) {
  return (
    <div className="favorite-stats">
      {map(stats, (stat, index) => (
        <div
          key={stat.id}
          className={`favorite-stats-card glass-surface anim-slide-up ${STAGGER_CLASSES[index % STAGGER_CLASSES.length] ?? ''}`}
        >
          <Typography component="p" className="favorite-stats-label">
            {stat.label}
          </Typography>
          <Typography component="p" className="favorite-stats-value">
            {stat.value}
          </Typography>
        </div>
      ))}
    </div>
  )
}
