import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded'
import { Paper, Typography } from '@mui/material'
import './SelectionOverview.css'

type SelectionOverviewProps = {
  selected: number
  capacity: number
  skeleton?: boolean
}

export function SelectionOverview({ selected, capacity, skeleton }: SelectionOverviewProps) {
  if (skeleton) {
    return (
      <Paper elevation={0} className="dash-widget dash-widget-selection glass-surface dash-widget-skel">
        <span className="dash-skel dash-skel-line dash-skel-line-lg" />
        <span className="dash-skel dash-selection-ring-skel" />
      </Paper>
    )
  }

  const pct = capacity > 0 ? Math.min(100, Math.round((selected / capacity) * 100)) : 0
  const r = 36
  const c = 2 * Math.PI * r
  const dash = (pct / 100) * c

  return (
    <Paper elevation={0} className="dash-widget dash-widget-selection glass-surface">
      <div className="dash-widget-head">
        <ChecklistRoundedIcon className="dash-widget-icon" />
        <Typography component="h3" className="dash-widget-title">
          Active selections
        </Typography>
      </div>
      <div className="dash-selection-body">
        <svg className="dash-selection-ring" viewBox="0 0 96 96" aria-hidden="true">
          <defs>
            <linearGradient id="dashRingGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6e5bff" />
              <stop offset="100%" stopColor="#12d6ff" />
            </linearGradient>
          </defs>
          <circle className="dash-selection-track" cx="48" cy="48" r={r} />
          <circle
            className="dash-selection-progress"
            cx="48"
            cy="48"
            r={r}
            strokeDasharray={`${dash} ${c}`}
          />
        </svg>
        <div>
          <Typography component="p" className="dash-selection-count">
            {selected}
            <span className="dash-selection-cap"> / {capacity}</span>
          </Typography>
          <Typography component="p" className="dash-selection-hint">
            {pct}% of batch quota · synced across devices
          </Typography>
        </div>
      </div>
    </Paper>
  )
}
