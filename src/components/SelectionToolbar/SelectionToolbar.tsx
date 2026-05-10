import { Box, Chip, CircularProgress } from '@mui/material'
import map from 'lodash/map'
import type { ReactElement } from 'react'
import styled, { css } from 'styled-components'

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

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
`

/* Native element: matches MUI Typography body2 sizing without Emotion prop conflicts. */
const Summary = styled.p`
  margin: 0;
  color: var(--color-muted);
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.43;
`

const Spacer = styled(Box)`
  flex: 1;
  min-width: var(--space-4);
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
`

const ToolbarSpinner = styled(CircularProgress)`
  margin-left: var(--space-2);
  color: ${(p) => p.theme.color.primary};
`

type ToolbarChipProps = {
  $loading?: boolean
}

const ToolbarChip = styled(Chip)<ToolbarChipProps>`
  font-weight: 600;
  transition:
    transform 200ms ease,
    box-shadow 200ms ease;

  &.MuiChip-clickable:not(.Mui-disabled):hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-soft);
  }

  ${(props) =>
    props.$loading &&
    css`
      border-color: ${props.theme.color.primary};
      background: rgba(110, 91, 255, 0.08);
    `}
`

export function SelectionToolbar({ summary, actions }: SelectionToolbarProps) {
  return (
    <Row>
      <Summary>{summary}</Summary>
      <Spacer />
      <Actions>
        {map(actions, (action) => {
          const showSpinner = Boolean(action.loading)
          const blocked = Boolean(action.loading || action.disabled)
          const label = action.loading ? (action.loadingLabel ?? action.label) : action.label
          return (
            <ToolbarChip
              key={action.id}
              icon={showSpinner ? <ToolbarSpinner size={14} /> : action.icon}
              label={label}
              clickable={!blocked}
              onClick={blocked ? undefined : action.onClick}
              disabled={Boolean(action.disabled) && !action.loading}
              $loading={Boolean(action.loading)}
            />
          )
        })}
      </Actions>
    </Row>
  )
}
