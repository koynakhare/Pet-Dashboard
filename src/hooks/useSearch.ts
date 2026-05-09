import debounce from 'lodash/debounce'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setSearchQuery } from '@/redux/slices/petsSlice'
import { selectSearchQuery } from '@/features/pets/petsSelectors'

const SEARCH_DEBOUNCE_MS = 280

export type UseSearchResult = {
  /** Immediate value bound to the search field */
  searchInput: string
  setSearchInput: (value: string) => void
  /** Last value committed to Redux (drives local filtering) */
  committedQuery: string
}

/**
 * Local search field state with lodash-debounced writes to Redux (single source for filtering).
 */
export function useSearch(): UseSearchResult {
  const dispatch = useAppDispatch()
  const committedQuery = useAppSelector(selectSearchQuery)
  const [searchInput, setSearchInputState] = useState(committedQuery)

  const commit = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setSearchQuery(value))
      }, SEARCH_DEBOUNCE_MS),
    [dispatch],
  )

  const setSearchInput = useCallback(
    (value: string) => {
      setSearchInputState(value)
      commit(value)
    },
    [commit],
  )

  useEffect(
    () => () => {
      commit.cancel()
    },
    [commit],
  )

  return { searchInput, setSearchInput, committedQuery }
}
