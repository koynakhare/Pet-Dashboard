import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import { Paper, Typography } from '@mui/material'
import map from 'lodash/map'
import type { DownloadRow } from '../mockData'
import './DownloadsCard.css'

type DownloadsCardProps = {
  rows: DownloadRow[]
  skeleton?: boolean
}

export function DownloadsCard({ rows, skeleton }: DownloadsCardProps) {
  if (skeleton) {
    return (
      <Paper elevation={0} className="dash-widget dash-widget-downloads glass-surface dash-widget-skel">
        <span className="dash-skel dash-skel-line dash-skel-line-lg" />
        {map([1, 2, 3], (key) => (
          <span key={key} className="dash-skel dash-download-row-skel" />
        ))}
      </Paper>
    )
  }

  return (
    <Paper elevation={0} className="dash-widget dash-widget-downloads glass-surface">
      <div className="dash-widget-head">
        <DownloadRoundedIcon className="dash-widget-icon" />
        <Typography component="h3" className="dash-widget-title">
          Recent downloads
        </Typography>
      </div>
      <ul className="dash-download-list">
        {map(rows, (row) => (
          <li key={row.id} className="dash-download-row">
            <div>
              <Typography component="p" className="dash-download-name">
                {row.name}
              </Typography>
              <Typography component="p" className="dash-download-meta">
                {row.size} · {row.time}
              </Typography>
            </div>
          </li>
        ))}
      </ul>
    </Paper>
  )
}
