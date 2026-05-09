import { Typography } from '@mui/material'
import { DashboardGradientBg } from '../DashboardGradientBg'
import './DashboardHero.css'

type DashboardHeroProps = {
  userLabel: string
  summaryLine: string
}

export function DashboardHero({ userLabel, summaryLine }: DashboardHeroProps) {
  return (
    <section className="dash-hero glass-surface fade-in-up">
      <DashboardGradientBg />
      <div className="dash-hero-inner">
        <Typography component="p" className="dash-hero-kicker">
          Analytics overview
        </Typography>
        <Typography component="h1" className="dash-hero-title">
          {userLabel}
        </Typography>
        <Typography component="p" className="dash-hero-summary">
          {summaryLine}
        </Typography>
      </div>
    </section>
  )
}
