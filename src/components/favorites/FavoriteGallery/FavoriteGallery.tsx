import type { Pet } from '@/features/pets/petsTypes'
import map from 'lodash/map'
import { FavoriteCard } from '../FavoriteCard'
import './FavoriteGallery.css'

export type FavoriteGalleryProps = {
  pets: Pet[]
  onToggleFavorite: (id: number) => void
}

export function FavoriteGallery({ pets, onToggleFavorite }: FavoriteGalleryProps) {
  return (
    <div className="favorite-gallery">
      <div className="favorite-gallery-grid">
        {map(pets, (pet, index) => (
          <FavoriteCard key={pet.id} pet={pet} index={index} onToggleFavorite={onToggleFavorite} />
        ))}
      </div>
    </div>
  )
}
