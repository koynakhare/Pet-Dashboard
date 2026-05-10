import type { Pet } from '@/features/pets/petsTypes'
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded'
import { Typography } from '@mui/material'
import map from 'lodash/map'
import { type ReactNode, type RefObject, memo } from 'react'
import './PetGalleryPreview.css'

type PetGalleryPreviewProps = {
  title: string
  subtitle: string
  pets: Pet[]
  activeId: number
  onSelectPet: (id: number) => void
  listFooter?: ReactNode
  scrollSentinelRef?: RefObject<HTMLDivElement | null>
}

function PetGalleryPreviewComponent({
  title,
  subtitle,
  pets,
  activeId,
  onSelectPet,
  listFooter,
  scrollSentinelRef,
}: PetGalleryPreviewProps) {
  if (pets.length === 0) {
    return null
  }
  return (
    <section className="pet-detail-gallery-preview glass-surface" aria-label={title}>
      <div className="pet-detail-gallery-preview-head">
        <CollectionsRoundedIcon className="pet-detail-gallery-preview-icon" aria-hidden />
        <div>
          <Typography component="h2" className="pet-detail-gallery-preview-title">
            {title}
          </Typography>
          <Typography component="p" className="pet-detail-gallery-preview-sub">
            {subtitle}
          </Typography>
        </div>
      </div>
      <div className="pet-detail-gallery-preview-grid">
        {map(pets, (pet) => (
          <button
            key={pet.id}
            type="button"
            className={`pet-detail-gallery-preview-thumb${pet.id === activeId ? ' pet-detail-gallery-preview-thumb--active' : ''}`}
            onClick={() => onSelectPet(pet.id)}
            aria-current={pet.id === activeId ? 'true' : undefined}
            aria-label={`Open ${pet.title}`}
          >
            <img src={pet.url} alt="" className="pet-detail-gallery-preview-img" loading="lazy" />
            <span className="pet-detail-gallery-preview-label">{pet.title}</span>
          </button>
        ))}
      </div>
      {listFooter ? <div className="pet-detail-gallery-preview-footer">{listFooter}</div> : null}
      <div
        ref={scrollSentinelRef}
        className="pet-detail-gallery-preview-sentinel"
        aria-hidden="true"
      />
    </section>
  )
}

export const PetGalleryPreview = memo(PetGalleryPreviewComponent)
