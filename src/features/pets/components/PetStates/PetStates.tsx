import PetsIcon from '@mui/icons-material/Pets'
import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
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

export function PetEmptyState() {
  return (
    <EmptyState
      className="pet-states-empty"
      icon={<PetsIcon className="pet-states-empty-icon" color="primary" />}
      title="No pets match your filters"
      description="Adjust search, sorting, or favorites filter to discover more."
    />
  )
}
