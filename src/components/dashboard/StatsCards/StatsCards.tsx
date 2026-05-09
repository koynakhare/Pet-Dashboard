import { Paper, Typography } from '@mui/material'
import map from 'lodash/map'
import type { DashboardStatItem } from '../mockData'
import './StatsCards.css'

type StatsCardsProps = {
  items: DashboardStatItem[]
  skeleton?: boolean
}

export function StatsCards({ items, skeleton }: StatsCardsProps) {
  if (skeleton) {
    return (
      <div className="dash-stats-grid">
        {map(items, (item) => (
          <Paper
            key={item.id}
            elevation={0}
            className="dash-stat-card dash-stat-card-skeleton glass-surface"
          >
            <span className="dash-skel dash-skel-icon" />
            <span className="dash-skel dash-skel-line dash-skel-line-lg" />
            <span className="dash-skel dash-skel-line dash-skel-line-sm" />
          </Paper>
        ))}
      </div>
    )
  }

  return (
    <div className="dash-stats-grid fade-in-up">
      {map(items, (item) => {
        const Icon = item.icon
        return (
          <Paper
            key={item.id}
            elevation={0}
            className={`dash-stat-card glass-surface ${item.accentClass}`}
          >
            <div className="dash-stat-icon-wrap">
              <Icon className="dash-stat-icon" fontSize="small" />
            </div>
            <Typography component="p" className="dash-stat-label">
              {item.label}
            </Typography>
            <Typography component="p" className="dash-stat-value dash-animated-value">
              {item.value}
            </Typography>
            <Typography
              component="p"
              className={
                item.deltaPositive ? 'dash-stat-delta dash-stat-delta-up' : 'dash-stat-delta dash-stat-delta-down'
              }
            >
              {item.delta}
            </Typography>
          </Paper>
        )
      })}
    </div>
  )
}
