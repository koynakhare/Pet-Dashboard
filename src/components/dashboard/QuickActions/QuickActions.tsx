import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import { Button, Paper, Typography } from '@mui/material'
import map from 'lodash/map'
import { Link as RouterLink } from 'react-router-dom'
import type { QuickActionItem } from '../mockData'
import './QuickActions.css'

type QuickActionsProps = {
  items: QuickActionItem[]
  skeleton?: boolean
}

export function QuickActions({ items, skeleton }: QuickActionsProps) {
  if (skeleton) {
    return (
      <section className="dash-quick-section">
        <Typography component="h2" className="dash-section-title">
          Quick actions
        </Typography>
        <div className="dash-quick-grid">
          {map([1, 2, 3, 4], (key) => (
            <Paper key={key} elevation={0} className="dash-quick-card glass-surface dash-quick-skel">
              <span className="dash-skel dash-skel-icon" />
              <span className="dash-skel dash-skel-line dash-skel-line-lg" />
              <span className="dash-skel dash-skel-line dash-skel-line-sm" />
            </Paper>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="dash-quick-section fade-in-up">
      <Typography component="h2" className="dash-section-title">
        Quick actions
      </Typography>
      <div className="dash-quick-grid">
        {map(items, (item) => {
          const Icon = item.icon
          return (
            <Paper key={item.id} elevation={0} className="dash-quick-card glass-surface">
              <div className="dash-quick-icon">
                <Icon fontSize="small" />
              </div>
              <Typography component="h3" className="dash-quick-title">
                {item.label}
              </Typography>
              <Typography component="p" className="dash-quick-desc">
                {item.description}
              </Typography>
              <Button
                component={RouterLink}
                to={item.to}
                endIcon={<ArrowOutwardRoundedIcon />}
                className="dash-quick-button"
                variant="text"
              >
                Open
              </Button>
            </Paper>
          )
        })}
      </div>
    </section>
  )
}
