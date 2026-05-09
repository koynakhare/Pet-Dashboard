import { Typography } from '@mui/material'
import map from 'lodash/map'
import { memo } from 'react'
import './PetMeta.css'

export type PetMetaRow = {
  id: string
  label: string
  value: string
}

type PetMetaProps = {
  rows: PetMetaRow[]
}

function PetMetaComponent({ rows }: PetMetaProps) {
  return (
    <section className="pet-detail-meta-panel glass-surface" aria-label="Asset metadata">
      <Typography component="h2" className="pet-detail-meta-heading">
        Metadata
      </Typography>
      <dl className="pet-detail-meta-list">
        {map(rows, (row) => (
          <div key={row.id} className="pet-detail-meta-row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export const PetMeta = memo(PetMetaComponent)
