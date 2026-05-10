import { GalleryGrid } from '@/components/GalleryGrid'
import type { Pet } from '@/features/pets/petsTypes'
import { Box } from '@mui/material'
import type { RefObject } from 'react'
import { type ReactNode, memo } from 'react'
import { PetCard } from '../PetCard'
import './PetGallery.css'

type PetGalleryProps = {
  pets: Pet[]
  selectedIds: number[]
  imageStaggerDelayMs?: number
  onSelect: (id: number) => void
  onFavorite: (id: number) => void
  onOpenDetail: (id: number) => void
  listFooter?: ReactNode
  scrollSentinelRef?: RefObject<HTMLDivElement | null>
}

function PetGalleryComponent({
  pets,
  selectedIds,
  imageStaggerDelayMs = 150,
  onSelect,
  onFavorite,
  onOpenDetail,
  listFooter,
  scrollSentinelRef,
}: PetGalleryProps) {
  return (
    <Box className="gallery-root">
      <GalleryGrid>
        {pets.map((pet, index) => (
          <PetCard
            key={`${pet.id}-${index}`}
            pet={pet}
            selected={selectedIds.includes(pet.id)}
            index={index}
            imageStaggerDelayMs={imageStaggerDelayMs}
            onSelect={onSelect}
            onFavorite={onFavorite}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </GalleryGrid>
      {listFooter ? <div className="gallery-list-footer">{listFooter}</div> : null}
      <div ref={scrollSentinelRef} className="gallery-infinite-sentinel" aria-hidden="true" />
    </Box>
  )
}

export const PetGallery = memo(PetGalleryComponent)
