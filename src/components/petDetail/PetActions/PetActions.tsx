import { Button } from '@mui/material'
import map from 'lodash/map'
import { memo, type ReactNode } from 'react'
import './PetActions.css'

export type PetActionItem = {
  id: string
  label: string
  icon: ReactNode
  onClick: () => void
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
}

type PetActionsProps = {
  actions: PetActionItem[]
}

function PetActionsComponent({ actions }: PetActionsProps) {
  return (
    <div className="pet-detail-actions-root">
      <div className="pet-detail-actions-grid">
        {map(actions, (action) => (
          <Button
            key={action.id}
            variant={action.variant ?? 'outlined'}
            color={action.color ?? 'inherit'}
            startIcon={action.icon}
            onClick={action.onClick}
            className="pet-detail-action-btn anim-hover-lift"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export const PetActions = memo(PetActionsComponent)
