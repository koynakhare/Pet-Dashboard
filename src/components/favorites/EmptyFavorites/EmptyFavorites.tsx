import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded'
import { Typography } from '@mui/material'
import map from 'lodash/map'
import { Link as RouterLink } from 'react-router-dom'
import { OutlineButton, PrimaryButton } from '@/components/buttons'
import { RoutePath } from '@/utils/enums/routePath'
import './EmptyFavorites.css'

const FEATURES = [
  { id: 'sync', label: 'Synced across gallery & detail views' },
  { id: 'curate', label: 'Curate export-ready mood boards' },
  { id: 'glass', label: 'Glassmorphism UI tuned for focus' },
]

export function EmptyFavorites() {
  return (
    <div className="empty-favorites glass-surface-strong anim-scale-in">
      <div className="empty-favorites-visual" aria-hidden="true">
        <span className="empty-favorites-blob empty-favorites-blob-a" />
        <span className="empty-favorites-blob empty-favorites-blob-b" />
        <svg className="empty-favorites-illustration" viewBox="0 0 320 220" role="img">
          <title>No favorites yet</title>
          <defs>
            <linearGradient id="ef-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6e5bff" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#12d6ff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ff7dd1" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <rect x="24" y="36" width="272" height="148" rx="22" fill="rgba(255,255,255,0.08)" />
          <rect x="44" y="58" width="92" height="72" rx="14" fill="url(#ef-grad)" opacity="0.45" />
          <circle cx="214" cy="92" r="34" fill="url(#ef-grad)" opacity="0.55" />
          <path
            d="M68 148h184"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M68 170h128"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
        <span className="empty-favorites-sparkle">
          <AutoAwesomeRoundedIcon fontSize="large" />
        </span>
      </div>

      <div className="empty-favorites-copy">
        <Typography component="h2" className="empty-favorites-title">
          Start building your favorites
        </Typography>
        <Typography component="p" className="empty-favorites-subtitle">
          Tap the heart on any pet card — your picks appear here instantly with gallery-grade polish.
        </Typography>

        <ul className="empty-favorites-features">
          {map(FEATURES, (feature) => (
            <li key={feature.id} className="empty-favorites-feature">
              <span className="empty-favorites-dot" />
              {feature.label}
            </li>
          ))}
        </ul>

        <div className="empty-favorites-actions">
          <PrimaryButton
            component={RouterLink}
            to={RoutePath.Pets}
            size="large"
            endIcon={<ExploreRoundedIcon />}
            className="empty-favorites-cta"
          >
            Browse the gallery
          </PrimaryButton>
          <OutlineButton component={RouterLink} to={RoutePath.Home} size="large" className="empty-favorites-cta">
            Back to home
          </OutlineButton>
        </div>
      </div>
    </div>
  )
}
