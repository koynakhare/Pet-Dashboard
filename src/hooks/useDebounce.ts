import debounce from 'lodash/debounce'
import { useEffect, useMemo, useState } from 'react'

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value)
  const queue = useMemo(
    () => debounce((next: T) => setDebounced(next), delayMs),
    [delayMs],
  )
  useEffect(() => {
    queue(value)
  }, [value, queue])
  
  useEffect(
    () => () => {
      queue.cancel()
    },
    [queue],
  )
  return debounced
}
