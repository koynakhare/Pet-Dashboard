import type { ReactElement } from 'react'
import { Box, Chip, CircularProgress, Typography } from '@mui/material'
import map from 'lodash/map'
import './SelectionToolbar.css'

export type SelectionToolbarAction = {
  id: string
  label: string
  icon: ReactElement
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  loadingLabel?: string
}

type SelectionToolbarProps = {
  summary: string
  actions: SelectionToolbarAction[]
}

export function SelectionToolbar({ summary, actions }: SelectionToolbarProps) {
  return (
    <div className="selection-toolbar-row">
      <Typography component="p" variant="body2" className="selection-toolbar-summary">
        {summary}
      </Typography>
      <Box className="selection-toolbar-spacer" />
      <div className="selection-toolbar-actions">
        {map(actions, (action) => {
          const showSpinner = Boolean(action.loading)
          const blocked = Boolean(action.loading || action.disabled)
          const label = action.loading ? (action.loadingLabel ?? action.label) : action.label
          return (
            <Chip
              key={action.id}
              icon={
                showSpinner ? (
                  <CircularProgress size={14} className="selection-toolbar-spinner" />
                ) : (
                  action.icon
                )
              }
              label={label}
              clickable={!blocked}
              onClick={blocked ? undefined : action.onClick}
              disabled={Boolean(action.disabled) && !action.loading}
              className={
                action.loading
                  ? 'selection-toolbar-chip selection-toolbar-chip-loading'
                  : 'selection-toolbar-chip'
              }
            />
          )
        })}
      </div>
    </div>
  )
}
