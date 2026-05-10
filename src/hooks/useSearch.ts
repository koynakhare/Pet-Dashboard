import { selectSearchQuery } from '@/features/pets/petsSelectors'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setSearchQuery } from '@/redux/slices/petsSlice'
import debounce from 'lodash/debounce'
import { useCallback, useEffect, useMemo, useState } from 'react'

const SEARCH_DEBOUNCE_MS = 280

export type UseSearchResult = {
  searchInput: string
  setSearchInput: (value: string) => void
  committedQuery: string
}

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
