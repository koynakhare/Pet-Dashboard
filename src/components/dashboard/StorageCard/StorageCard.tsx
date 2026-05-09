import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded'
import { Paper, Typography } from '@mui/material'
import './StorageCard.css'

type StorageCardProps = {
  usedLabel: string
  totalLabel: string
  percent: number
  skeleton?: boolean
}

export function StorageCard({ usedLabel, totalLabel, percent, skeleton }: StorageCardProps) {
  if (skeleton) {
    return (
      <Paper elevation={0} className="dash-widget dash-widget-storage glass-surface dash-widget-skel">
        <span className="dash-skel dash-skel-line dash-skel-line-lg" />
        <span className="dash-skel dash-storage-bar-skel" />
      </Paper>
    )
  }

  const clamped = Math.min(100, Math.max(0, percent))

  return (
    <Paper elevation={0} className="dash-widget dash-widget-storage glass-surface">
      <div className="dash-widget-head">
        <CloudQueueRoundedIcon className="dash-widget-icon" />
        <Typography component="h3" className="dash-widget-title">
          Storage usage
        </Typography>
      </div>
      <Typography component="p" className="dash-storage-labels">
        <span>{usedLabel}</span>
        <span className="dash-storage-of">of {totalLabel}</span>
      </Typography>
      <svg
        className="dash-storage-svg"
        viewBox="0 0 100 8"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <defs>
          <linearGradient id="dashStorageGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6e5bff" />
            <stop offset="100%" stopColor="#12d6ff" />
          </linearGradient>
        </defs>
        <rect className="dash-storage-bg" x="0" y="0" width="100" height="8" rx="4" />
        <rect className="dash-storage-fill" x="0" y="0" width={clamped} height="8" rx="4" />
      </svg>
      <Typography component="p" className="dash-storage-foot">
        {clamped}% utilized · autoscaled backups on
      </Typography>
    </Paper>
  )
}
