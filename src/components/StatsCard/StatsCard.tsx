import type { ReactNode } from 'react'
import { Paper, Typography } from '@mui/material'
import './StatsCard.css'

type StatsCardProps = {
  label: string
  value: string
  hint?: string
  icon?: ReactNode
  variant?: 'default' | 'gradient'
}

export function StatsCard({
  label,
  value,
  hint,
  icon,
  variant = 'default',
}: StatsCardProps) {
  const rootClass =
    variant === 'gradient' ? 'ui-stats-card ui-stats-card-gradient glass-surface' : 'ui-stats-card glass-surface'
  return (
    <Paper elevation={0} className={rootClass}>
      {icon ? <div className="ui-stats-card-icon">{icon}</div> : null}
      <Typography component="p" className="ui-stats-card-label">
        {label}
      </Typography>
      <Typography component="p" className="ui-stats-card-value">
        {value}
      </Typography>
      {hint ? (
        <Typography component="p" className="ui-stats-card-hint">
          {hint}
        </Typography>
      ) : null}
    </Paper>
  )
}
