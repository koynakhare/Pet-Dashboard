import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded'
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded'
import TrendingFlatRoundedIcon from '@mui/icons-material/TrendingFlatRounded'
import { Paper, Typography } from '@mui/material'
import map from 'lodash/map'
import type { AnalyticsInsightItem } from '../mockData'
import './AnalyticsCards.css'

type AnalyticsCardsProps = {
  items: AnalyticsInsightItem[]
  skeleton?: boolean
}

function TrendIcon({ trend }: { trend: AnalyticsInsightItem['trend'] }) {
  if (trend === 'up') return <NorthEastRoundedIcon className="dash-analytics-trend dash-analytics-trend-up" />
  if (trend === 'down') return <TrendingDownRoundedIcon className="dash-analytics-trend dash-analytics-trend-down" />
  return <TrendingFlatRoundedIcon className="dash-analytics-trend dash-analytics-trend-flat" />
}

export function AnalyticsCards({ items, skeleton }: AnalyticsCardsProps) {
  if (skeleton) {
    return (
      <section className="dash-analytics-section">
        <Typography component="h2" className="dash-section-title">
          Insights
        </Typography>
        <div className="dash-analytics-grid">
          {map([1, 2, 3], (key) => (
            <Paper key={key} elevation={0} className="dash-analytics-card glass-surface dash-analytics-skel">
              <span className="dash-skel dash-skel-line dash-skel-line-sm" />
              <span className="dash-skel dash-skel-line dash-skel-line-lg" />
            </Paper>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="dash-analytics-section fade-in-up">
      <Typography component="h2" className="dash-section-title">
        Insights
      </Typography>
      <div className="dash-analytics-grid">
        {map(items, (item) => (
          <Paper key={item.id} elevation={0} className="dash-analytics-card glass-surface">
            <div className="dash-analytics-head">
              <Typography component="h3" className="dash-analytics-title">
                {item.title}
              </Typography>
              <TrendIcon trend={item.trend} />
            </div>
            <Typography component="p" className="dash-analytics-value">
              {item.value}
            </Typography>
            <Typography component="p" className="dash-analytics-hint">
              {item.hint}
            </Typography>
          </Paper>
        ))}
      </div>
    </section>
  )
}
