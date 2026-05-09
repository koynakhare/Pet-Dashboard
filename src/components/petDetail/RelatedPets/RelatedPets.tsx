import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { IconButton, Typography } from '@mui/material'
import map from 'lodash/map'
import { memo } from 'react'
import type { Pet } from '@/features/pets/petsTypes'
import './RelatedPets.css'

type RelatedPetsProps = {
  title: string
  subtitle: string
  pets: Pet[]
  onOpen: (id: number) => void
  onFavorite: (id: number) => void
}

function RelatedPetsComponent({ title, subtitle, pets, onOpen, onFavorite }: RelatedPetsProps) {
  if (pets.length === 0) {
    return null
  }
  return (
    <section className="pet-detail-related" aria-labelledby="pet-detail-related-title">
      <div className="pet-detail-related-head">
        <div>
          <Typography id="pet-detail-related-title" component="h2" className="pet-detail-related-title">
            {title}
          </Typography>
          <Typography component="p" className="pet-detail-related-sub">
            {subtitle}
          </Typography>
        </div>
        <ArrowForwardIosRoundedIcon className="pet-detail-related-chevron" aria-hidden />
      </div>
      <div className="pet-detail-related-track">
        {map(pets, (pet) => (
          <article key={pet.id} className="pet-detail-related-card glass-surface anim-hover-lift">
            <button type="button" className="pet-detail-related-media" onClick={() => onOpen(pet.id)}>
              <img src={pet.url} alt="" className="pet-detail-related-img" loading="lazy" />
              <span className="pet-detail-related-scrim" aria-hidden="true" />
            </button>
            <div className="pet-detail-related-body">
              <Typography component="h3" className="pet-detail-related-name">
                {pet.title}
              </Typography>
              <div className="pet-detail-related-row">
                <Typography component="p" className="pet-detail-related-meta">
                  ~{pet.estimatedSizeMb.toFixed(1)} MB
                </Typography>
                <IconButton
                  size="small"
                  aria-label={pet.favorite ? 'Remove favorite' : 'Add favorite'}
                  className="pet-detail-related-fav"
                  onClick={() => onFavorite(pet.id)}
                >
                  {pet.favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export const RelatedPets = memo(RelatedPetsComponent)
