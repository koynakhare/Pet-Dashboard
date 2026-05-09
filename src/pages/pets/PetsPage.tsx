import { Stack } from '@mui/material'
import map from 'lodash/map'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { InfiniteScrollLoader } from '@/components/InfiniteScrollLoader'
import { PetEmptyState, PetErrorState } from '@/features/pets/components/PetStates'
import { PetGallery } from '@/features/pets/components/PetGallery'
import { PetSkeletonGrid } from '@/features/pets/components/PetSkeletonGrid'
import { PetToolbar } from '@/features/pets/components/PetToolbar'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { usePets } from '@/hooks/usePets'
import { useSearch } from '@/hooks/useSearch'
import { useSelection } from '@/hooks/useSelection'
import { toggleFavorite } from '@/redux/slices/petsSlice'
import { useAppDispatch } from '@/redux/hooks'
import './PetsPage.css'

export default function PetsPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const petsData = usePets()
  const search = useSearch()

  const scopeIds = useMemo(
    () => map(petsData.displayPets, (pet) => pet.id),
    [petsData.displayPets],
  )
  const selection = useSelection(scopeIds)

  const infinite = useInfiniteScroll(petsData.displayPets, { chunkSize: 24 })

  const showInitialLoader = useMemo(
    () =>
      !petsData.hasFetched &&
      petsData.uiStatus !== 'error' &&
      (petsData.uiStatus === 'idle' || petsData.uiStatus === 'loading'),
    [petsData.hasFetched, petsData.uiStatus],
  )
  const handleOpenDetail = useCallback(
    (id: number) => navigate(`/pets/${id}`),
    [navigate],
  )

  const handleFavorite = useCallback(
    (id: number) => {
      dispatch(toggleFavorite(id))
    },
    [dispatch],
  )

  return (
    <Stack spacing={2.25} className="pets-page-root anim-fade-in">
      <PetToolbar
        query={search.searchInput}
        sortBy={petsData.sortBy}
        selectionSummary={selection.selectionSummary}
        downloadProgressLabel={selection.downloadProgressLabel}
        isDownloading={selection.isDownloading}
        selectedCount={selection.selectedCount}
        favoritesOnly={petsData.favoritesOnly}
        totalCount={petsData.galleryStats.visibleCount}
        onQueryChange={search.setSearchInput}
        onSortChange={petsData.setSortByOption}
        onFavoritesToggle={petsData.setFavoritesOnly}
        onSelectAll={selection.selectAllInScope}
        onClearSelection={selection.clear}
        onDownloadSelected={selection.downloadSelected}
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
      {!showInitialLoader && petsData.uiStatus === 'empty' ? <PetEmptyState /> : null}
      {!showInitialLoader && petsData.uiStatus === 'success' ? (
        <PetGallery
          pets={infinite.visibleItems}
          selectedIds={selection.selectedIds}
          onSelect={selection.toggle}
          onFavorite={handleFavorite}
          onOpenDetail={handleOpenDetail}
          listFooter={infinite.hasMore ? <InfiniteScrollLoader /> : null}
          scrollSentinelRef={infinite.sentinelRef}
        />
      ) : null}
    </Stack>
  )
}
