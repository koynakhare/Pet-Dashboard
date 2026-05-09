import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import PieChartOutlineRoundedIcon from '@mui/icons-material/PieChartOutlineRounded'
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded'
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded'
import { Alert, Button, Paper, Typography } from '@mui/material'
import map from 'lodash/map'
import max from 'lodash/max'
import sumBy from 'lodash/sumBy'
import type {
  CategorySlice,
  DownloadBar,
  GalleryActivityPoint,
  UploadTrendPoint,
} from '../mockData'
import './ActivityChart.css'

type ActivityChartProps = {
  uploads: UploadTrendPoint[]
  downloads: DownloadBar[]
  categories: CategorySlice[]
  activity: GalleryActivityPoint[]
  error?: boolean
  onRetry?: () => void
  skeleton?: boolean
}

const CHART_W = 320
const CHART_H = 120
const BAR_SVG_W = 280
const BAR_SVG_H = 140
const DONUT_R = 52
const DONUT_CX = 64
const DONUT_CY = 64

function buildLinePoints(data: UploadTrendPoint[]) {
  const peak = max(map(data, 'value')) ?? 1
  const step = data.length > 1 ? CHART_W / (data.length - 1) : CHART_W
  return map(data, (point, index) => {
    const x = index * step
    const y = CHART_H - (point.value / peak) * (CHART_H - 8) - 4
    return `${x},${y}`
  }).join(' ')
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

function donutSlicePath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1
  return [
    'M',
    cx,
    cy,
    'L',
    start.x,
    start.y,
    'A',
    r,
    r,
    0,
    largeArc,
    0,
    end.x,
    end.y,
    'Z',
  ].join(' ')
}

function buildDonutSlices(slices: CategorySlice[]) {
  const total = sumBy(slices, 'value') || 1
  let angle = 0
  return map(slices, (slice) => {
    const span = (slice.value / total) * 360
    const start = angle
    const end = angle + span
    angle = end
    return {
      id: slice.label,
      path: donutSlicePath(DONUT_CX, DONUT_CY, DONUT_R, start, end),
      color: slice.color,
      label: slice.label,
      pct: slice.value,
      swatchClass: slice.swatchClass,
    }
  })
}

export function ActivityChart({
  uploads,
  downloads,
  categories,
  activity,
  error,
  onRetry,
  skeleton,
}: ActivityChartProps) {
  if (skeleton) {
    return (
      <section className="dash-charts-section">
        <Typography component="h2" className="dash-section-title">
          Analytics
        </Typography>
        <div className="dash-charts-grid">
          {map([1, 2, 3, 4], (key) => (
            <Paper key={key} elevation={0} className="dash-chart-card glass-surface dash-chart-skel">
              <span className="dash-skel dash-skel-line dash-skel-line-lg" />
              <span className="dash-skel dash-chart-skel-body" />
            </Paper>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="dash-charts-section fade-in-up">
        <Typography component="h2" className="dash-section-title">
          Analytics
        </Typography>
        <Alert
          severity="error"
          className="dash-chart-error glass-surface"
          action={
            onRetry ? (
              <Button className="dash-chart-retry" onClick={onRetry} color="inherit" size="small">
                Retry
              </Button>
            ) : undefined
          }
        >
          We couldn’t refresh chart data. Check your connection and try again.
        </Alert>
      </section>
    )
  }

  const linePoints = buildLinePoints(uploads)
  const dlMax = max(map(downloads, 'value')) ?? 1
  const actMax = max(map(activity, 'value')) ?? 1
  const barSlotW = BAR_SVG_W / downloads.length
  const barWidth = Math.max(12, barSlotW * 0.45)
  const donutSlices = buildDonutSlices(categories)

  return (
    <section className="dash-charts-section fade-in-up">
      <Typography component="h2" className="dash-section-title">
        Analytics
      </Typography>
      <div className="dash-charts-grid">
        <Paper elevation={0} className="dash-chart-card glass-surface dash-chart-float">
          <div className="dash-chart-card-head">
            <ShowChartRoundedIcon className="dash-chart-card-icon" />
            <Typography component="h3" className="dash-chart-card-title">
              Uploads trend
            </Typography>
          </div>
          <svg
            className="dash-line-chart"
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="dashLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6e5bff" />
                <stop offset="100%" stopColor="#12d6ff" />
              </linearGradient>
            </defs>
            <polyline
              className="dash-line-chart-fill"
              points={`0,${CHART_H} ${linePoints} ${CHART_W},${CHART_H}`}
            />
            <polyline className="dash-line-chart-stroke" points={linePoints} fill="none" />
          </svg>
          <div className="dash-chart-labels">
            {map(uploads, (point) => (
              <span key={point.label} className="dash-chart-tick">
                {point.label}
              </span>
            ))}
          </div>
        </Paper>

        <Paper elevation={0} className="dash-chart-card glass-surface dash-chart-float">
          <div className="dash-chart-card-head">
            <BarChartRoundedIcon className="dash-chart-card-icon" />
            <Typography component="h3" className="dash-chart-card-title">
              Downloads
            </Typography>
          </div>
          <svg
            className="dash-bar-svg"
            viewBox={`0 0 ${BAR_SVG_W} ${BAR_SVG_H}`}
            role="img"
            aria-label="Downloads by week"
          >
            {map(downloads, (bar, index) => {
              const h = (bar.value / dlMax) * (BAR_SVG_H - 28)
              const x = index * barSlotW + (barSlotW - barWidth) / 2
              const y = BAR_SVG_H - h - 20
              return (
                <rect
                  key={bar.label}
                  className="dash-bar-rect"
                  x={x}
                  y={y}
                  width={barWidth}
                  height={h}
                  rx={8}
                />
              )
            })}
          </svg>
          <div className="dash-chart-labels dash-chart-labels-bars">
            {map(downloads, (bar) => (
              <span key={bar.label} className="dash-chart-tick">
                {bar.label}
              </span>
            ))}
          </div>
        </Paper>

        <Paper elevation={0} className="dash-chart-card glass-surface dash-chart-float">
          <div className="dash-chart-card-head">
            <PieChartOutlineRoundedIcon className="dash-chart-card-icon" />
            <Typography component="h3" className="dash-chart-card-title">
              Pet categories
            </Typography>
          </div>
          <div className="dash-donut-row">
            <svg className="dash-donut-svg" viewBox="0 0 128 128" aria-hidden="true">
              {map(donutSlices, (slice) => (
                <path key={slice.id} d={slice.path} className="dash-donut-slice" fill={slice.color} />
              ))}
              <circle className="dash-donut-hole" cx={DONUT_CX} cy={DONUT_CY} r={28} />
            </svg>
            <ul className="dash-donut-legend">
              {map(donutSlices, (slice) => (
                <li key={slice.id} className="dash-donut-legend-item">
                  <span className={`dash-donut-swatch ${slice.swatchClass}`} />
                  <span>{slice.label}</span>
                  <span className="dash-donut-pct">{slice.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Paper>

        <Paper elevation={0} className="dash-chart-card glass-surface dash-chart-float">
          <div className="dash-chart-card-head">
            <TimelineRoundedIcon className="dash-chart-card-icon" />
            <Typography component="h3" className="dash-chart-card-title">
              Gallery activity
            </Typography>
          </div>
          <svg
            className="dash-spark-svg"
            viewBox={`0 0 ${BAR_SVG_W} ${BAR_SVG_H}`}
            role="img"
            aria-label="Gallery activity by hour"
          >
            {map(activity, (cell, index) => {
              const h = (cell.value / actMax) * (BAR_SVG_H - 28)
              const x = index * barSlotW + (barSlotW - barWidth) / 2
              const y = BAR_SVG_H - h - 20
              return (
                <rect
                  key={cell.label}
                  className="dash-spark-rect"
                  x={x}
                  y={y}
                  width={barWidth}
                  height={h}
                  rx={6}
                />
              )
            })}
          </svg>
          <div className="dash-chart-labels dash-chart-labels-bars">
            {map(activity, (cell) => (
              <span key={cell.label} className="dash-chart-tick">
                {cell.label}
              </span>
            ))}
          </div>
        </Paper>
      </div>
    </section>
  )
}
