import { InfiniteScrollLoader } from '@/components/InfiniteScrollLoader'
import { FloatingDownloadButton } from '@/features/pets/components/FloatingDownloadButton'
import { PetGallery } from '@/features/pets/components/PetGallery'
import { PetSkeletonGrid } from '@/features/pets/components/PetSkeletonGrid'
import { PetEmptyState, PetErrorState } from '@/features/pets/components/PetStates'
import { PetToolbar } from '@/features/pets/components/PetToolbar'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { usePets } from '@/hooks/usePets'
import { useSearch } from '@/hooks/useSearch'
import { useSelection } from '@/hooks/useSelection'
import { useAppDispatch } from '@/redux/hooks'
import { toggleFavorite } from '@/redux/slices/petsSlice'
import { SESSION_STORAGE_KEYS } from '@/utils/constants/storageKeys'
import { RoutePath } from '@/utils/enums/routePath'
import { optimizeImageUrl } from '@/utils/imageOptimizer'
import { Alert, Stack } from '@mui/material'
import map from 'lodash/map'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import './PetsPage.css'

const GALLERY_IMAGE_STAGGER_MS = 150

function readFallbackBannerDismissed(): boolean {
  try {
    return sessionStorage.getItem(SESSION_STORAGE_KEYS.PETS_FALLBACK_BANNER_DISMISSED) === '1'
  } catch {
    return false
  }
}

export default function PetsPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const petsData = usePets()
  const search = useSearch()
  const [fallbackBannerDismissed, setFallbackBannerDismissed] = useState(
    readFallbackBannerDismissed,
  )

  const scopeIds = useMemo(() => map(petsData.displayPets, (pet) => pet.id), [petsData.displayPets])
  const selection = useSelection(scopeIds)
  const { selectAllInScope, clear: clearSelection } = selection
  const hasActiveFilters = useMemo(
    () => search.committedQuery.trim().length > 0 || petsData.favoritesOnly,
    [search.committedQuery, petsData.favoritesOnly],
  )

  const infinite = useInfiniteScroll(petsData.displayPets, {
    chunkSize: 12,
    rootMargin: '200px',
    loop: !hasActiveFilters,
  })

  useEffect(() => {
    const first = petsData.displayPets[0]
    if (!first) {
      return
    }
    const href = optimizeImageUrl(first.url, 'card')
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = href
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [petsData.displayPets])

  const onPetsGallery = Boolean(useMatch({ path: RoutePath.Pets, end: true }))
  const focusGallerySearch = useCallback(() => {
    document.getElementById('pets-gallery-search')?.focus()
  }, [])

  const galleryKeyboardShortcuts = useMemo(
    () => [
      {
        code: 'KeyA',
        ctrlOrCmd: true as const,
        handler: () => {
          selectAllInScope()
        },
      },
      {
        code: 'Escape',
        ctrlOrCmd: false as const,
        handler: () => clearSelection(),
      },
      {
        code: 'KeyF',
        ctrlOrCmd: true as const,
        handler: () => focusGallerySearch(),
      },
    ],
    [selectAllInScope, clearSelection, focusGallerySearch],
  )

  useKeyboardShortcuts(galleryKeyboardShortcuts, onPetsGallery && petsData.uiStatus === 'success')

  const showInitialLoader = useMemo(
    () =>
      !petsData.hasFetched &&
      petsData.uiStatus !== 'error' &&
      (petsData.uiStatus === 'idle' || petsData.uiStatus === 'loading'),
    [petsData.hasFetched, petsData.uiStatus],
  )
  const handleOpenDetail = useCallback((id: number) => navigate(`/pets/${id}`), [navigate])

  const handleFavorite = useCallback(
    (id: number) => {
      dispatch(toggleFavorite(id))
    },
    [dispatch],
  )

  const showFallbackBanner = useMemo(
    () =>
      petsData.isFallbackMode &&
      petsData.hasFetched &&
      petsData.uiStatus === 'success' &&
      !fallbackBannerDismissed,
    [petsData.isFallbackMode, petsData.hasFetched, petsData.uiStatus, fallbackBannerDismissed],
  )

  const handleDismissFallbackBanner = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEYS.PETS_FALLBACK_BANNER_DISMISSED, '1')
    } catch {
      /* quota / private mode */
    }
    setFallbackBannerDismissed(true)
  }, [])

  return (
    <Stack spacing={2.25} className="pets-page-root anim-fade-in">
      {showFallbackBanner ? (
        <Alert severity="warning" variant="outlined" onClose={handleDismissFallbackBanner}>
          Unable to connect to server. Showing offline data.
        </Alert>
      ) : null}
      <PetToolbar
        query={search.searchInput}
        sortBy={petsData.sortBy}
        selectedCount={selection.selectedCount}
        favoritesOnly={petsData.favoritesOnly}
        totalCount={petsData.galleryStats.visibleCount}
        onQueryChange={search.setSearchInput}
        onSortChange={petsData.setSortByOption}
        onFavoritesToggle={petsData.setFavoritesOnly}
        onSelectAll={selection.selectAllInScope}
        onClearSelection={selection.clear}
      />

      {showInitialLoader ? (
        <div className="pets-page-skeleton-wrap anim-fade-in">
          <PetSkeletonGrid count={12} />
          <InfiniteScrollLoader label="Loading gallery" />
        </div>
      ) : null}
      {!showInitialLoader && petsData.uiStatus === 'error' ? (
        <PetErrorState message={petsData.error ?? 'Unknown error'} onRetry={petsData.retryFetch} />
      ) : null}
      {!showInitialLoader && petsData.uiStatus === 'empty' ? (
        <PetEmptyState favoritesOnly={petsData.favoritesOnly} />
      ) : null}
      {!showInitialLoader && petsData.uiStatus === 'success' ? (
        <PetGallery
          pets={infinite.visibleItems}
          selectedIds={selection.selectedIds}
          imageStaggerDelayMs={GALLERY_IMAGE_STAGGER_MS}
          onSelect={selection.toggle}
          onFavorite={handleFavorite}
          onOpenDetail={handleOpenDetail}
          listFooter={infinite.hasMore ? <InfiniteScrollLoader /> : null}
          scrollSentinelRef={infinite.sentinelRef}
        />
      ) : null}
      {petsData.uiStatus === 'success' ? <FloatingDownloadButton /> : null}
    </Stack>
  )
}
