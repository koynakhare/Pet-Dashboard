import { Box } from '@mui/material'
import type { RefObject } from 'react'
import { memo, type ReactNode } from 'react'
import { GalleryGrid } from '@/components/GalleryGrid'
import type { Pet } from '@/features/pets/petsTypes'
import { PetCard } from '../PetCard'
import './PetGallery.css'

type PetGalleryProps = {
  pets: Pet[]
  selectedIds: number[]
  onSelect: (id: number) => void
  onFavorite: (id: number) => void
  onOpenDetail: (id: number) => void
  listFooter?: ReactNode
  scrollSentinelRef?: RefObject<HTMLDivElement | null>
}

function PetGalleryComponent({
  pets,
  selectedIds,
  onSelect,
  onFavorite,
  onOpenDetail,
  listFooter,
  scrollSentinelRef,
}: PetGalleryProps) {
  return (
    <Box className="gallery-root">
      <GalleryGrid>
        {pets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            selected={selectedIds.includes(pet.id)}
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
