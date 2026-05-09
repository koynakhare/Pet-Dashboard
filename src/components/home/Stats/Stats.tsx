import { Paper, Typography } from '@mui/material'
import map from 'lodash/map'
import './Stats.css'

export type HomeStat = {
  id: string
  label: string
  value: string
}

type StatsProps = {
  stats: HomeStat[]
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className="home-stats-section fade-in-up">
      <div className="home-stats-grid">
        {map(stats, (stat) => (
          <Paper key={stat.id} elevation={0} className="home-stat-card glass-surface">
            <Typography component="p" className="home-stat-value">
              {stat.value}
            </Typography>
            <Typography component="p" className="home-stat-label">
              {stat.label}
            </Typography>
          </Paper>
        ))}
      </div>
    </section>
  )
}
