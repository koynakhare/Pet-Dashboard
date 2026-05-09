import type { ReactNode } from 'react'
import { Paper, Typography } from '@mui/material'
import './EmptyState.css'

export type EmptyStateProps = {
  className?: string
  icon?: ReactNode
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ className, icon, title, description, action }: EmptyStateProps) {
  const rootClass = className ? `ui-empty-state ${className}` : 'ui-empty-state'
  return (
    <Paper className={rootClass} elevation={0}>
      {icon ? <div className="ui-empty-state-icon-wrap">{icon}</div> : null}
      <Typography component="h2" className="ui-empty-state-title">
        {title}
      </Typography>
      <Typography component="p" className="ui-empty-state-description">
        {description}
      </Typography>
      {action ? <div className="ui-empty-state-action">{action}</div> : null}
    </Paper>
  )
}
