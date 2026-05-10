import { Button } from '@mui/material'
import map from 'lodash/map'
import { type ReactNode, memo } from 'react'
import './PetActions.css'

export type PetActionItem = {
  id: string
  label: string
  icon: ReactNode
  onClick: () => void
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  className?: string
}

type PetActionsProps = {
  actions: PetActionItem[]
}

export const PetActions = memo(function PetActions({ actions }: PetActionsProps) {
  return (
    <div className="pet-detail-actions-root">
      <div className="pet-detail-actions-grid">
        {map(actions, (action) => (
          <Button
            key={action.id}
            fullWidth
            variant={action.variant ?? 'outlined'}
            color={action.color ?? 'inherit'}
            startIcon={action.icon}
            onClick={action.onClick}
            className={`pet-detail-action-btn anim-hover-lift${action.className ? ` ${action.className}` : ''}`}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
})
