import { EmptyState } from '@/components/EmptyState'
import { InfiniteScrollLoader } from '@/components/InfiniteScrollLoader'
import { OutlineButton, PrimaryButton } from '@/components/buttons'
import {
  PetActions,
  PetDetailSkeleton,
  PetGalleryPreview,
  PetHero,
  PetInfo,
} from '@/components/petDetail'
import type { PetActionItem } from '@/components/petDetail/PetActions'
import { PetErrorState } from '@/features/pets/components/PetStates'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { usePets } from '@/hooks/usePets'
import { useAppDispatch } from '@/redux/hooks'
import { toggleFavorite } from '@/redux/slices/petsSlice'
import { RoutePath } from '@/utils/enums/routePath'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import PetsIcon from '@mui/icons-material/Pets'
import { Typography } from '@mui/material'
import orderBy from 'lodash/orderBy'
import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './PetDetailPage.css'

const SESSION_GALLERY_CHUNK = 9

export default function PetDetailPage() {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const petsData = usePets()
  const { catalogPets, hasFetched, uiStatus, error, retryFetch } = petsData
  const id = Number(params.id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const activePet = useMemo(() => catalogPets.find((entry) => entry.id === id), [catalogPets, id])

  const sessionGalleryPets = useMemo(
    () => orderBy(catalogPets, [(p) => new Date(p.createdAt).getTime()], ['desc']),
    [catalogPets],
  )

  const sessionGalleryScroll = useInfiniteScroll(sessionGalleryPets, {
    chunkSize: SESSION_GALLERY_CHUNK,
  })

  const sidebarActions = useMemo((): PetActionItem[] => {
    if (!activePet) {
      return []
    }
    return [
      {
        id: 'back',
        label: 'Back to gallery',
        icon: <ArrowBackIcon />,
        onClick: () => navigate(RoutePath.Pets),
        variant: 'outlined',
      },
      {
        id: 'favorite',
        label: activePet.favorite ? 'Favorited' : 'Add to favorites',
        icon: activePet.favorite ? (
          <FavoriteRoundedIcon color="error" />
        ) : (
          <FavoriteBorderRoundedIcon />
        ),
        onClick: () => dispatch(toggleFavorite(activePet.id)),
        variant: activePet.favorite ? 'contained' : 'outlined',
        color: activePet.favorite ? 'error' : 'inherit',
      },
    ]
  }, [activePet, dispatch, navigate])

  if (uiStatus === 'error') {
    return (
      <div className="pet-detail-page-root pet-detail-page-root--states">
        <PetErrorState message={error ?? 'Unknown error'} onRetry={retryFetch} />
      </div>
    )
  }

  if (!hasFetched || uiStatus === 'loading' || uiStatus === 'idle') {
    return (
      <div className="pet-detail-page-root pet-detail-page-root--states">
        <PetDetailSkeleton />
      </div>
    )
  }

  if (hasFetched && catalogPets.length === 0) {
    return (
      <div className="pet-detail-page-root pet-detail-page-root--states">
        <EmptyState
          className="pet-detail-empty-state"
          icon={<PetsIcon color="primary" />}
          title="No pets available"
          description="We could not load any pets into the gallery cache yet."
          action={
            <PrimaryButton onClick={() => navigate(RoutePath.Pets)}>Go to gallery</PrimaryButton>
          }
        />
      </div>
    )
  }

  if (!activePet) {
    return (
      <div className="pet-detail-page-root pet-detail-page-root--states">
        <EmptyState
          className="pet-detail-empty-state"
          icon={<PetsIcon color="primary" />}
          title="Pet not found"
          description="This asset is not in your current gallery session."
          action={
            <PrimaryButton onClick={() => navigate(RoutePath.Pets)}>Browse gallery</PrimaryButton>
          }
        />
      </div>
    )
  }

  const sessionSubtitle = `All ${catalogPets.length} pets in this session, newest first. Scroll down to load more thumbnails.`

  return (
    <div className="pet-detail-page-root anim-fade-in">
      <div className="pet-detail-page-inner">
        <nav className="pet-detail-nav glass-surface" aria-label="Pet detail">
          <OutlineButton
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(RoutePath.Pets)}
            className="pet-detail-nav-back"
          >
            Gallery
          </OutlineButton>
          <Typography component="p" className="pet-detail-nav-crumb">
            Pets / <span className="pet-detail-nav-crumb-active">{activePet.title}</span>
          </Typography>
        </nav>

        <div className="pet-detail-split">
          <div className="pet-detail-split-media fade-in-up">
            <PetHero pet={activePet} />
          </div>
          <aside className="pet-detail-aside-col">
            <div className="pet-detail-aside-stack glass-surface-strong surface-ring-hover">
              <PetInfo pet={activePet} />
              <PetActions actions={sidebarActions} />
            </div>
          </aside>
        </div>

        <PetGalleryPreview
          title="Session gallery"
          subtitle={sessionSubtitle}
          pets={sessionGalleryScroll.visibleItems}
          activeId={activePet.id}
          onSelectPet={(petId) => navigate(`/pets/${petId}`)}
          scrollSentinelRef={sessionGalleryScroll.sentinelRef}
          listFooter={
            sessionGalleryScroll.hasMore ? (
              <InfiniteScrollLoader label="Loading more thumbnails" />
            ) : null
          }
        />
      </div>
    </div>
  )
}
