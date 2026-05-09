import { Paper, Typography } from '@mui/material'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { PrimaryButton } from '@/components/buttons'
import filter from 'lodash/filter'
import flatMap from 'lodash/flatMap'
import uniq from 'lodash/uniq'
import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import {
  EmptyFavorites,
  FavoriteGallery,
  FavoriteHero,
  FavoriteStats,
  FavoritesToolbar,
} from '@/components/favorites'
import type { FavoriteStatItem } from '@/components/favorites/FavoriteStats'
import { PetErrorState } from '@/features/pets/components/PetStates'
import { PetSkeletonGrid } from '@/features/pets/components/PetSkeletonGrid'
import { selectFavoriteAggregate, selectFavoritePets } from '@/features/pets/petsSelectors'
import type { PetSortOption } from '@/hooks/usePets'
import { useDebouncedValue } from '@/hooks/useDebounce'
import { usePets } from '@/hooks/usePets'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { clearAllFavorites, selectSortedPets, toggleFavorite } from '@/redux/slices/petsSlice'
import './FavoritesPage.css'

export default function FavoritesPage() {
  const dispatch = useAppDispatch()
  const petsData = usePets()
  const favoritesAll = useAppSelector(selectFavoritePets)
  const aggregate = useAppSelector(selectFavoriteAggregate)

  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState<PetSortOption>('newest')
  const [tagFilter, setTagFilter] = useState('')
  const [clearFavoritesOpen, setClearFavoritesOpen] = useState(false)
  const debouncedQuery = useDebouncedValue(query, 280)

  const tagOptions = useMemo(
    () => uniq(flatMap(favoritesAll, (pet) => pet.tags)).sort((a, b) => a.localeCompare(b)),
    [favoritesAll],
  )

  const filteredPets = useMemo(() => {
    let list = favoritesAll
    const lowered = debouncedQuery.trim().toLowerCase()
    if (lowered) {
      list = filter(list, (pet) => {
        const haystack = [pet.title, pet.description, pet.tags.join(' ')].join(' ').toLowerCase()
        return haystack.includes(lowered)
      })
    }
    if (tagFilter) {
      list = filter(list, (pet) => pet.tags.includes(tagFilter))
    }
    return selectSortedPets(list, sortBy)
  }, [debouncedQuery, favoritesAll, sortBy, tagFilter])

  const stats = useMemo((): FavoriteStatItem[] => {
    return [
      {
        id: 'saved',
        label: 'Saved pets',
        value: String(aggregate.count),
      },
      {
        id: 'volume',
        label: 'Est. volume',
        value: `${aggregate.totalMb.toFixed(1)} MB`,
      },
      {
        id: 'tags',
        label: 'Unique tags',
        value: String(aggregate.uniqueTagCount),
      },
    ]
  }, [aggregate])

  const filtersActive = Boolean(query.trim() || tagFilter)

  const clearFilters = useCallback(() => {
    setQuery('')
    setTagFilter('')
  }, [])

  const handleClearAllFavorites = useCallback(() => {
    if (aggregate.count === 0) {
      return
    }
    setClearFavoritesOpen(true)
  }, [aggregate.count])

  const handleConfirmClearAllFavorites = useCallback(() => {
    dispatch(clearAllFavorites())
    toast.success('All favorites cleared')
    setClearFavoritesOpen(false)
  }, [dispatch])

  const handleCloseClearFavoritesDialog = useCallback(() => {
    setClearFavoritesOpen(false)
  }, [])

  const handleToggleFavorite = useCallback(
    (id: number) => {
      dispatch(toggleFavorite(id))
    },
    [dispatch],
  )

  if (petsData.uiStatus === 'idle' || petsData.uiStatus === 'loading') {
    return (
      <div className="favorites-page-root anim-fade-in">
        <FavoriteHero />
        <PetSkeletonGrid />
      </div>
    )
  }

  if (petsData.uiStatus === 'error') {
    return (
      <div className="favorites-page-root anim-fade-in">
        <FavoriteHero />
        <PetErrorState message={petsData.error ?? 'Unable to load favorites'} onRetry={petsData.retryFetch} />
      </div>
    )
  }

  return (
    <div className="favorites-page-root anim-fade-in">
      <FavoriteHero />

      {favoritesAll.length > 0 ? <FavoriteStats stats={stats} /> : null}

      {favoritesAll.length > 0 ? (
        <FavoritesToolbar
          query={query}
          onQueryChange={setQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          tagFilter={tagFilter}
          tagOptions={tagOptions}
          onTagChange={setTagFilter}
          onClearFilters={clearFilters}
          filtersActive={filtersActive}
          onClearAllFavorites={handleClearAllFavorites}
          clearAllDisabled={aggregate.count === 0}
        />
      ) : null}

      {favoritesAll.length === 0 ? (
        <EmptyFavorites />
      ) : filteredPets.length === 0 ? (
        <Paper className="favorites-page-empty-filter glass-surface anim-slide-up">
          <Typography component="h3" className="favorites-page-empty-title">
            No matches in your favorites
          </Typography>
          <Typography component="p" className="favorites-page-empty-sub">
            Try another keyword, tag, or reset filters to see your whole collection.
          </Typography>
          <PrimaryButton className="favorites-page-empty-reset" onClick={clearFilters}>
            Reset filters
          </PrimaryButton>
        </Paper>
      ) : (
        <FavoriteGallery pets={filteredPets} onToggleFavorite={handleToggleFavorite} />
      )}

      <ConfirmDialog
        open={clearFavoritesOpen}
        onClose={handleCloseClearFavoritesDialog}
        onConfirm={handleConfirmClearAllFavorites}
        title="Clear all favorites?"
        description="Remove every favorite? Your gallery data stays intact."
        cancelLabel="Keep favorites"
        confirmLabel="Clear all"
      />
    </div>
  )
}
