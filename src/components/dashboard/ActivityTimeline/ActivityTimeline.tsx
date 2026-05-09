import { Paper, Typography } from '@mui/material'
import map from 'lodash/map'
import type { ActivityItem } from '../mockData'
import './ActivityTimeline.css'

type ActivityTimelineProps = {
  items: ActivityItem[]
  skeleton?: boolean
}

export function ActivityTimeline({ items, skeleton }: ActivityTimelineProps) {
  if (skeleton) {
    return (
      <section className="dash-timeline-section">
        <Typography component="h2" className="dash-section-title">
          Activity
        </Typography>
        <Paper elevation={0} className="dash-timeline-card glass-surface">
          {map([1, 2, 3, 4], (key) => (
            <div key={key} className="dash-timeline-skel-row">
              <span className="dash-skel dash-timeline-dot-skel" />
              <div className="dash-timeline-skel-lines">
                <span className="dash-skel dash-skel-line dash-skel-line-lg" />
                <span className="dash-skel dash-skel-line dash-skel-line-sm" />
              </div>
            </div>
          ))}
        </Paper>
      </section>
    )
  }

  return (
    <section className="dash-timeline-section fade-in-up">
      <Typography component="h2" className="dash-section-title">
        Activity
      </Typography>
      <Paper elevation={0} className="dash-timeline-card glass-surface">
        <ul className="dash-timeline-list">
          {map(items, (item) => (
            <li key={item.id} className={`dash-timeline-item dash-timeline-tone-${item.tone}`}>
              <div className="dash-timeline-rail">
                <span className="dash-timeline-dot" />
              </div>
              <div className="dash-timeline-content">
                <div className="dash-timeline-head">
                  <Typography component="h3" className="dash-timeline-title">
                    {item.title}
                  </Typography>
                  <Typography component="span" className="dash-timeline-time">
                    {item.time}
                  </Typography>
                </div>
                <Typography component="p" className="dash-timeline-detail">
                  {item.detail}
                </Typography>
              </div>
            </li>
          ))}
        </ul>
      </Paper>
    </section>
  )
}
