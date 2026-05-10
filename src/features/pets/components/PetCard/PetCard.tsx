import { OptimizedImage } from '@/components/OptimizedImage'
import type { Pet } from '@/features/pets/petsTypes'
import { optimizeImageUrl } from '@/utils/imageOptimizer'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Checkbox, IconButton, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { memo } from 'react'
import styled from 'styled-components'

const StyledCard = styled.article`
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: ${(p) =>
    p.theme.mode === 'dark' ? 'rgba(16, 23, 47, 0.88)' : 'rgba(255, 255, 255, 0.78)'};
  border: 1px solid
    ${(p) => (p.theme.mode === 'dark' ? 'rgba(130, 152, 255, 0.22)' : 'rgba(255, 255, 255, 0.52)')};
  box-shadow: var(--shadow-soft);
  transition: transform 220ms ease, box-shadow 220ms ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-elevated);

    .pet-card-image-root img {
      transform: scale(1.05);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 3px;
  }

  .pet-card-image-root {
    position: relative;
    z-index: 0;
  }
`

const Overlay = styled.div`
  position: absolute;
  z-index: 2;
  top: var(--space-3);
  left: var(--space-3);
  right: var(--space-3);
  display: flex;
  justify-content: space-between;

  .pet-card-checkbox,
  .pet-card-favorite-button {
    background: ${(p) =>
      p.theme.mode === 'dark' ? 'rgba(16, 23, 47, 0.92)' : 'rgba(255, 255, 255, 0.9)'};
    border-radius: var(--radius-sm);
    border: 1px solid
      ${(p) => (p.theme.mode === 'dark' ? 'rgba(130, 152, 255, 0.2)' : 'rgba(110, 91, 255, 0.12)')};
  }

  .pet-card-checkbox .MuiSvgIcon-root {
    filter: contrast(1.08);
  }
`

const ContentStack = styled(Stack).attrs({ spacing: 1.2 })`
  padding: var(--space-4);
`

const TitleTypography = styled(Typography).attrs({
  variant: 'subtitle1',
  noWrap: true,
})`
  font-weight: 700;
`

const DescriptionTypography = styled(Typography).attrs({
  variant: 'body2',
  color: 'text.secondary',
})`
  min-height: 42px;
`

type PetCardProps = {
  pet: Pet
  selected: boolean
  index: number
  imageStaggerDelayMs?: number
  onSelect: (id: number) => void
  onFavorite: (id: number) => void
  onOpenDetail: (id: number) => void
}

export const PetCard = memo(function PetCard({
  pet,
  selected,
  index,
  imageStaggerDelayMs = 150,
  onSelect,
  onFavorite,
  onOpenDetail,
}: PetCardProps) {
  const titleId = `pet-card-title-${pet.id}`
  const optimizedSrc = optimizeImageUrl(pet.url, 'card')

  return (
    <StyledCard
      tabIndex={0}
      aria-labelledby={titleId}
      onClick={() => onOpenDetail(pet.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          onOpenDetail(pet.id)
          return
        }
        if (event.key === ' ' || event.code === 'Space') {
          event.preventDefault()
          onSelect(pet.id)
        }
      }}
    >
      <OptimizedImage
        key={`${pet.id}-${optimizedSrc}`}
        src={optimizedSrc}
        alt=""
        className="pet-card-image-root"
        index={index}
        staggerDelay={imageStaggerDelayMs}
      />
      <Overlay>
        <Checkbox
          className="pet-card-checkbox"
          checked={selected}
          slotProps={{
            input: {
              'aria-label': `Select ${pet.title} for download`,
            },
          }}
          onChange={(event) => {
            event.stopPropagation()
            onSelect(pet.id)
          }}
          onClick={(event) => event.stopPropagation()}
        />
        <IconButton
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation()
            onFavorite(pet.id)
          }}
          className="pet-card-favorite-button"
          aria-label={
            pet.favorite ? `Remove ${pet.title} from favorites` : `Add ${pet.title} to favorites`
          }
          aria-pressed={pet.favorite}
        >
          {pet.favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </Overlay>
      <ContentStack>
        <TitleTypography id={titleId}>{pet.title}</TitleTypography>
        <DescriptionTypography>{pet.description}</DescriptionTypography>
        <Typography variant="caption" color="text.secondary" component="p">
          {dayjs(pet.createdAt).format('DD MMM YYYY')}
        </Typography>
      </ContentStack>
    </StyledCard>
  )
})
