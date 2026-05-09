import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import { Chip, Typography } from '@mui/material'
import './DashboardHeader.css'

type DashboardHeaderProps = {
  title: string
  subtitle: string
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <header className="dash-page-header fade-in-up">
      <div>
        <Typography component="h2" className="dash-page-header-title">
          {title}
        </Typography>
        <Typography component="p" className="dash-page-header-subtitle">
          {subtitle}
        </Typography>
      </div>
      <Chip
        icon={<FiberManualRecordRoundedIcon className="dash-live-dot" />}
        label="Live metrics"
        className="dash-live-chip glass-surface"
        variant="outlined"
      />
    </header>
  )
}
