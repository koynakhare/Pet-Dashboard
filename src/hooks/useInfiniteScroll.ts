import { type RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type UseInfiniteScrollOptions = {
  chunkSize?: number
  rootMargin?: string
  root?: Element | null
  revealRemainderOnIntersect?: boolean
  loop?: boolean
  maxLoopRows?: number
}

export type UseInfiniteScrollResult<T> = {
  visibleItems: T[]
  sentinelRef: RefObject<HTMLDivElement | null>
  hasMore: boolean
  loadedCount: number
  totalCount: number
}

export function useInfiniteScroll<T>(
  items: T[],
  options: UseInfiniteScrollOptions = {},
): UseInfiniteScrollResult<T> {
  const chunkSize = options.chunkSize ?? 24
  const rootMargin = options.rootMargin ?? '80px'
  const root = options.root ?? null
  const revealRemainderOnIntersect = options.revealRemainderOnIntersect ?? false
  const loop = options.loop ?? false
  const maxLoopRows = options.maxLoopRows ?? 500

  const itemsSignature = useMemo(() => {
    if (items.length === 0) {
      return '0'
    }
    const first = items[0] as { id?: unknown }
    const last = items[items.length - 1] as { id?: unknown }
    return `${items.length}:${String(first?.id)}:${String(last?.id)}`
  }, [items])

  const [visibleCount, setVisibleCount] = useState(() => Math.min(chunkSize, items.length))

  useEffect(() => {
    setVisibleCount(Math.min(chunkSize, items.length))
  }, [itemsSignature, chunkSize, items.length])

  const visibleItems = useMemo(() => {
    if (items.length === 0) {
      return []
    }
    if (loop) {
      const n = Math.min(visibleCount, maxLoopRows)
      return Array.from({ length: n }, (_, i) => items[i % items.length] as T)
    }
    return items.slice(0, visibleCount)
  }, [items, visibleCount, loop, maxLoopRows])

  const hasMore = useMemo(() => {
    if (items.length === 0) {
      return false
    }
    if (loop) {
      return visibleCount < maxLoopRows
    }
    return visibleCount < items.length
  }, [items.length, loop, maxLoopRows, visibleCount])

  const unlockRef = useRef(false)

  const loadNextChunk = useCallback(() => {
    if (unlockRef.current) {
      return
    }
    unlockRef.current = true
    setVisibleCount((current) => {
      if (loop) {
        return Math.min(current + chunkSize, maxLoopRows)
      }
      if (revealRemainderOnIntersect) {
        return items.length
      }
      return Math.min(current + chunkSize, items.length)
    })
    window.requestAnimationFrame(() => {
      unlockRef.current = false
    })
  }, [chunkSize, items.length, loop, maxLoopRows, revealRemainderOnIntersect])

  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = sentinelRef.current
    if (!(node && hasMore)) {
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const shouldLoad = entries.some((entry) => entry.isIntersecting)
        if (shouldLoad) {
          loadNextChunk()
        }
      },
      { root, rootMargin, threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, loadNextChunk, root, rootMargin, visibleCount, items.length])

  return {
    visibleItems,
    sentinelRef,
    hasMore,
    loadedCount: visibleItems.length,
    totalCount: items.length,
  }
}
