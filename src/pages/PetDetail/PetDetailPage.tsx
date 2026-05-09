import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import PetsIcon from '@mui/icons-material/Pets'
import { Typography } from '@mui/material'
import dayjs from 'dayjs'
import filter from 'lodash/filter'
import intersection from 'lodash/intersection'
import orderBy from 'lodash/orderBy'
import { useCallback, useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { EmptyState } from '@/components/EmptyState'
import {
  DownloadCard,
  FloatingActions,
  PetActions,
  PetDetailSkeleton,
  PetGalleryPreview,
  PetHero,
  PetInfo,
  PetMeta,
  PetStats,
  RelatedPets,
} from '@/components/petDetail'
import type { PetActionItem } from '@/components/petDetail/PetActions'
import type { FloatingActionConfig } from '@/components/petDetail/FloatingActions'
import type { PetMetaRow } from '@/components/petDetail/PetMeta'
import type { PetStatItem } from '@/components/petDetail/PetStats'
import { OutlineButton, PrimaryButton } from '@/components/buttons'
import { PetErrorState } from '@/features/pets/components/PetStates'
import { getPetEngagementMetrics } from '@/features/pets/utils/mockPetEngagement'
import { selectSelectedIds } from '@/features/pets/petsSelectors'
import { usePets } from '@/hooks/usePets'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { toggleFavorite } from '@/redux/slices/petsSlice'
import { toggleSelectPet } from '@/redux/slices/selectionSlice'
import './PetDetailPage.css'

function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat(undefined, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export default function PetDetailPage() {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const petsData = usePets()
  const { catalogPets, hasFetched, uiStatus, error, retryFetch } = petsData
  const selectedIds = useAppSelector(selectSelectedIds)
  const id = Number(params.id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const activePet = useMemo(
    () => catalogPets.find((entry) => entry.id === id),
    [catalogPets, id],
  )

  const engagement = useMemo(() => (activePet ? getPetEngagementMetrics(activePet.id) : null), [activePet])

  const relatedPets = useMemo(() => {
    if (!activePet) {
      return []
    }
    const others = filter(catalogPets, (p) => p.id !== activePet.id)
    const scored = others.map((pet) => ({
      pet,
      score: intersection(activePet.tags, pet.tags).length,
    }))
    return orderBy(
      scored,
      ['score', (row) => new Date(row.pet.createdAt).getTime()],
      ['desc', 'desc'],
    )
      .slice(0, 10)
      .map((row) => row.pet)
  }, [activePet, catalogPets])

  const previewPets = useMemo(() => {
    if (!activePet) {
      return []
    }
    const others = filter(catalogPets, (p) => p.id !== activePet.id)
    const ordered = orderBy(others, [(p) => new Date(p.createdAt).getTime()], ['desc']).slice(0, 7)
    return [activePet, ...ordered]
  }, [activePet, catalogPets])

  const metaRows = useMemo((): PetMetaRow[] => {
    if (!activePet) {
      return []
    }
    return [
      { id: 'created', label: 'Created', value: dayjs(activePet.createdAt).format('DD MMM YYYY') },
      { id: 'est', label: 'Est. download', value: `${activePet.estimatedSizeMb.toFixed(2)} MB` },
      { id: 'size', label: 'Asset (KB)', value: `${activePet.fileSizeKb} KB` },
      { id: 'id', label: 'Asset ID', value: String(activePet.id) },
      {
        id: 'type',
        label: 'Category',
        value: activePet.tags[0] ?? 'Gallery',
      },
    ]
  }, [activePet])

  const statItems = useMemo((): PetStatItem[] => {
    if (!activePet || !engagement) {
      return []
    }
    return [
      {
        id: 'views',
        label: 'Views',
        value: formatCompactNumber(engagement.views),
        icon: <VisibilityRoundedIcon />,
      },
      {
        id: 'downloads',
        label: 'Downloads',
        value: formatCompactNumber(engagement.downloads),
        icon: <CloudDownloadRoundedIcon />,
      },
      {
        id: 'loves',
        label: 'Community saves',
        value: formatCompactNumber(engagement.curatorSaves),
        icon: <FavoriteRoundedIcon />,
      },
      {
        id: 'upload',
        label: 'Upload date',
        value: dayjs(activePet.createdAt).format('MMM D, YYYY'),
        icon: <CalendarTodayRoundedIcon />,
      },
    ]
  }, [activePet, engagement])

  const handleShare = useCallback(() => {
    if (!activePet) {
      return
    }
    const url = window.location.href
    if (navigator.share) {
      void navigator
        .share({ title: activePet.title, text: activePet.description, url })
        .catch(() => {
          /* user cancelled */
        })
    } else {
      void navigator.clipboard.writeText(url).then(() => {
        toast.success('Link copied to clipboard')
      })
    }
  }, [activePet])

  const openOriginal = useCallback(() => {
    if (!activePet) {
      return
    }
    window.open(activePet.url, '_blank', 'noopener,noreferrer')
  }, [activePet])

  const sidebarActions = useMemo((): PetActionItem[] => {
    if (!activePet) {
      return []
    }
    return [
      {
        id: 'back',
        label: 'Back to gallery',
        icon: <ArrowBackIcon />,
        onClick: () => navigate('/pets'),
        variant: 'outlined',
      },
      {
        id: 'favorite',
        label: activePet.favorite ? 'Saved' : 'Favorite',
        icon: activePet.favorite ? <FavoriteRoundedIcon color="error" /> : <FavoriteBorderRoundedIcon />,
        onClick: () => dispatch(toggleFavorite(activePet.id)),
        variant: 'outlined',
      },
      {
        id: 'share',
        label: 'Share',
        icon: <IosShareRoundedIcon />,
        onClick: handleShare,
        variant: 'outlined',
      },
      {
        id: 'select',
        label: selectedIds.includes(activePet.id) ? 'In selection' : 'Select for download',
        icon: <CloudDownloadRoundedIcon />,
        onClick: () => dispatch(toggleSelectPet(activePet.id)),
        variant: 'outlined',
      },
      {
        id: 'open',
        label: 'Open original',
        icon: <OpenInNewRoundedIcon />,
        onClick: openOriginal,
        variant: 'outlined',
      },
    ]
  }, [activePet, dispatch, handleShare, navigate, openOriginal, selectedIds])

  const floatingActions = useMemo((): FloatingActionConfig[] => {
    if (!activePet) {
      return []
    }
    return [
      {
        id: 'fab-favorite',
        label: activePet.favorite ? 'Remove favorite' : 'Add favorite',
        icon: activePet.favorite ? <FavoriteRoundedIcon color="error" /> : <FavoriteBorderRoundedIcon />,
        onClick: () => dispatch(toggleFavorite(activePet.id)),
      },
      {
        id: 'fab-share',
        label: 'Share',
        icon: <IosShareRoundedIcon />,
        onClick: handleShare,
      },
      {
        id: 'fab-open',
        label: 'Open original',
        icon: <OpenInNewRoundedIcon />,
        onClick: openOriginal,
      },
    ]
  }, [activePet, dispatch, handleShare, openOriginal])

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
            <PrimaryButton onClick={() => navigate('/pets')}>Go to gallery</PrimaryButton>
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
            <PrimaryButton onClick={() => navigate('/pets')}>Browse gallery</PrimaryButton>
          }
        />
      </div>
    )
  }

  const isSelected = selectedIds.includes(activePet.id)

  return (
    <div className="pet-detail-page-root anim-fade-in">
      <div className="pet-detail-page-inner">
        <nav className="pet-detail-nav glass-surface" aria-label="Pet detail">
          <OutlineButton
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/pets')}
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
              <PetStats items={statItems} />
              <PetMeta rows={metaRows} />
              <PetActions actions={sidebarActions} />
              <DownloadCard
                estimatedSizeMb={activePet.estimatedSizeMb}
                selected={isSelected}
                onToggleSelection={() => dispatch(toggleSelectPet(activePet.id))}
                onOpenOriginal={openOriginal}
              />
            </div>
          </aside>
        </div>

        <PetGalleryPreview
          title="Session gallery"
          subtitle="Jump across recent captures without leaving the showcase."
          pets={previewPets}
          activeId={activePet.id}
          onSelectPet={(petId) => navigate(`/pets/${petId}`)}
        />

        <RelatedPets
          title="Curated for you"
          subtitle="Similar energy based on shared tags and freshness."
          pets={relatedPets}
          onOpen={(petId) => navigate(`/pets/${petId}`)}
          onFavorite={(petId) => dispatch(toggleFavorite(petId))}
        />
      </div>

      <FloatingActions actions={floatingActions} />
    </div>
  )
}
