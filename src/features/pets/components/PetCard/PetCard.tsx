import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Checkbox, Chip, IconButton, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { memo } from 'react'
import type { Pet } from '@/features/pets/petsTypes'
import './PetCard.css'

type PetCardProps = {
  pet: Pet
  selected: boolean
  onSelect: (id: number) => void
  onFavorite: (id: number) => void
  onOpenDetail: (id: number) => void
}

function PetCardComponent({
  pet,
  selected,
  onSelect,
  onFavorite,
  onOpenDetail,
}: PetCardProps) {
  return (
    <article className="pet-card" onClick={() => onOpenDetail(pet?.id)}>
      <img className="pet-card-image" src={pet.url} alt={pet.title} loading="lazy" />
      <div className="pet-card-overlay">
        <Checkbox
          className="pet-card-checkbox"
          checked={selected}
          onChange={() => onSelect(pet.id)}
        />
        <IconButton onClick={() => onFavorite(pet.id)} className="pet-card-favorite-button">
          {pet.favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
      <Stack spacing={1.2} className="pet-card-content">
        <Typography variant="subtitle1" noWrap className="pet-card-title">
          {pet.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="pet-card-description">
          {pet.description}
        </Typography>
        <Stack direction="row" spacing={1} className="pet-card-tag-row">
          {pet.tags.slice(0, 3).map((tag) => (
            <Chip key={`${pet.id}-${tag}`} label={tag} size="small" />
          ))}
        </Stack>
        <Stack direction="row" className="pet-card-meta-row">
          <Typography variant="caption" color="text.secondary">
            {dayjs(pet.createdAt).format('DD MMM YYYY')}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ~{pet.estimatedSizeMb.toFixed(1)} MB
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          {[
            { icon: <VisibilityOutlinedIcon fontSize="small" />, label: 'View' },
          ].map((action) => (
            <Chip
              key={`${pet.id}-${action.label}`}
              icon={action.icon}
              label={action.label}
              clickable
              onClick={() => onOpenDetail(pet.id)}
              className="pet-card-action-chip"
            />
          ))}
        </Stack>
      </Stack>
    </article>
  )
}

export const PetCard = memo(PetCardComponent)
