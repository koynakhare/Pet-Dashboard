import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import PetsRoundedIcon from '@mui/icons-material/PetsRounded'
import { Alert, Avatar, Button, Paper, Typography } from '@mui/material'
import map from 'lodash/map'
import { Link as RouterLink } from 'react-router-dom'
import { RoutePath } from '@/utils/enums/routePath'
import type { RecentPetItem } from '../mockData'
import './RecentPets.css'

type RecentPetsProps = {
  pets: RecentPetItem[]
  error?: boolean
  onRetry?: () => void
  skeleton?: boolean
}

export function RecentPets({ pets, error, onRetry, skeleton }: RecentPetsProps) {
  if (skeleton) {
    return (
      <section className="dash-recent-section">
        <Typography component="h2" className="dash-section-title">
          Recent pets
        </Typography>
        <div className="dash-recent-grid">
          {map([1, 2, 3, 4], (key) => (
            <Paper key={key} elevation={0} className="dash-recent-card glass-surface dash-recent-skel">
              <span className="dash-skel dash-recent-skel-avatar" />
              <span className="dash-skel dash-skel-line dash-skel-line-lg" />
              <span className="dash-skel dash-skel-line dash-skel-line-sm" />
            </Paper>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="dash-recent-section fade-in-up">
        <Typography component="h2" className="dash-section-title">
          Recent pets
        </Typography>
        <Alert
          severity="error"
          className="dash-recent-error glass-surface"
          action={
            onRetry ? (
              <Button className="dash-recent-retry" onClick={onRetry} color="inherit" size="small">
                Retry
              </Button>
            ) : undefined
          }
        >
          Recent pets could not be loaded.
        </Alert>
      </section>
    )
  }

  if (pets.length === 0) {
    return (
      <section className="dash-recent-section fade-in-up">
        <Typography component="h2" className="dash-section-title">
          Recent pets
        </Typography>
        <Paper elevation={0} className="dash-recent-empty glass-surface">
          <PetsRoundedIcon className="dash-recent-empty-icon" />
          <Typography component="p" className="dash-recent-empty-title">
            No recent pets yet
          </Typography>
          <Typography component="p" className="dash-recent-empty-desc">
            Browse the gallery to populate this list with your latest activity.
          </Typography>
          <Button
            component={RouterLink}
            to={RoutePath.Pets}
            variant="contained"
            className="dash-recent-empty-cta"
            endIcon={<OpenInNewRoundedIcon />}
          >
            Go to gallery
          </Button>
        </Paper>
      </section>
    )
  }

  return (
    <section className="dash-recent-section fade-in-up">
      <Typography component="h2" className="dash-section-title">
        Recent pets
      </Typography>
      <div className="dash-recent-grid">
        {map(pets, (pet) => (
          <Paper key={pet.id} elevation={0} className="dash-recent-card glass-surface">
            <Avatar src={pet.image} alt={pet.name} className="dash-recent-avatar" variant="rounded" />
            <div className="dash-recent-body">
              <Typography component="h3" className="dash-recent-name">
                {pet.name}
              </Typography>
              <Typography component="p" className="dash-recent-breed">
                {pet.breed}
              </Typography>
              <Typography component="p" className="dash-recent-meta">
                Updated {pet.updatedAt}
              </Typography>
            </div>
            <Button
              component={RouterLink}
              to={`${RoutePath.Pets.replace(/\/$/, '')}/${pet.id}`}
              size="small"
              className="dash-recent-link"
              endIcon={<OpenInNewRoundedIcon />}
            >
              View
            </Button>
          </Paper>
        ))}
      </div>
    </section>
  )
}
