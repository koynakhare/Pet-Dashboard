import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded'
import { Paper, Typography } from '@mui/material'
import map from 'lodash/map'
import './GalleryInsights.css'

export type GalleryInsightLine = {
  id: string
  text: string
}

type GalleryInsightsProps = {
  lines: GalleryInsightLine[]
  skeleton?: boolean
}

export function GalleryInsights({ lines, skeleton }: GalleryInsightsProps) {
  if (skeleton) {
    return (
      <Paper elevation={0} className="dash-widget dash-widget-insights glass-surface dash-widget-skel">
        <span className="dash-skel dash-skel-line dash-skel-line-lg" />
        {map([1, 2, 3], (key) => (
          <span key={key} className="dash-skel dash-insight-line-skel" />
        ))}
      </Paper>
    )
  }

  return (
    <Paper elevation={0} className="dash-widget dash-widget-insights glass-surface">
      <div className="dash-widget-head">
        <AutoGraphRoundedIcon className="dash-widget-icon" />
        <Typography component="h3" className="dash-widget-title">
          Gallery insights
        </Typography>
      </div>
      <ul className="dash-insight-list">
        {map(lines, (line) => (
          <li key={line.id} className="dash-insight-item">
            {line.text}
          </li>
        ))}
      </ul>
    </Paper>
  )
}
