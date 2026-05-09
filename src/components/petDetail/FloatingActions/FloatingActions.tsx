import { Fab, Tooltip } from '@mui/material'
import map from 'lodash/map'
import { memo, type ReactNode } from 'react'
import './FloatingActions.css'

export type FloatingActionConfig = {
  id: string
  label: string
  icon: ReactNode
  onClick: () => void
}

type FloatingActionsProps = {
  actions: FloatingActionConfig[]
}

function FloatingActionsComponent({ actions }: FloatingActionsProps) {
  return (
    <div className="pet-detail-floating" role="toolbar" aria-label="Quick actions">
      {map(actions, (action) => (
        <Tooltip key={action.id} title={action.label} placement="left">
          <Fab
            size="medium"
            color="default"
            aria-label={action.label}
            onClick={action.onClick}
            className="pet-detail-floating-fab glass-surface-strong anim-hover-lift"
          >
            {action.icon}
          </Fab>
        </Tooltip>
      ))}
    </div>
  )
}

export const FloatingActions = memo(FloatingActionsComponent)
