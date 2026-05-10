import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
import { OutlineLinkButton } from '@/components/buttons'
import { RoutePath } from '@/utils/enums/routePath'
import PetsIcon from '@mui/icons-material/Pets'
import './PetStates.css'

type ErrorStateProps = {
  message: string
  onRetry: () => void
}

export function PetErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <ErrorState
      className="pet-states-error"
      title="Unable to load pets"
      message={message}
      onRetry={onRetry}
    />
  )
}

type PetEmptyStateProps = {
  favoritesOnly?: boolean
}

export function PetEmptyState({ favoritesOnly }: PetEmptyStateProps) {
  if (favoritesOnly) {
    return (
      <EmptyState
        className="pet-states-empty"
        icon={<PetsIcon className="pet-states-empty-icon" color="primary" />}
        title="No favorites yet"
        description="Browse the gallery and tap the heart on any pet to save it here."
        action={
          <OutlineLinkButton to={RoutePath.Pets} size="large">
            Browse gallery
          </OutlineLinkButton>
        }
      />
    )
  }

  return (
    <EmptyState
      className="pet-states-empty"
      icon={<PetsIcon className="pet-states-empty-icon" color="primary" />}
      title="No pets match your filters"
      description="Try adjusting search, sorting, or turning off favorites-only to see more pets."
    />
  )
}
