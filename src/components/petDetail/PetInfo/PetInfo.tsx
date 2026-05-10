import type { Pet } from '@/features/pets/petsTypes'
import { Typography } from '@mui/material'
import { memo, useMemo } from 'react'
import './PetInfo.css'

type PetInfoProps = {
  pet: Pet
}

function PetInfoComponent({ pet }: PetInfoProps) {
  const createdDisplay = useMemo(
    () =>
      new Date(pet.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    [pet.createdAt],
  )

  const fileSizeDisplay = useMemo(() => {
    if (pet.estimatedSizeMb > 0) {
      return `${pet.estimatedSizeMb.toFixed(2)} MB`
    }
    if (pet.fileSizeKb > 0) {
      return `${pet.fileSizeKb.toLocaleString()} KB`
    }
    return null
  }, [pet.estimatedSizeMb, pet.fileSizeKb])

  return (
    <header className="pet-detail-info fade-in-up">
      <Typography component="h1" className="pet-detail-info-title">
        {pet.title}
      </Typography>
      <Typography component="p" className="pet-detail-info-description">
        {pet.description}
      </Typography>

      <section className="pet-detail-info-metadata" aria-label="Information">
        <Typography component="h2" className="pet-detail-info-metadata-heading">
          Information
        </Typography>
        <dl className="pet-detail-info-metadata-list">
          <div className="pet-detail-info-metadata-row">
            <dt>Created</dt>
            <dd>{createdDisplay}</dd>
          </div>
          {fileSizeDisplay ? (
            <div className="pet-detail-info-metadata-row">
              <dt>File size</dt>
              <dd>{fileSizeDisplay}</dd>
            </div>
          ) : null}
        </dl>
      </section>
    </header>
  )
}

export const PetInfo = memo(PetInfoComponent)
