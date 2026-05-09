import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import {
  selectEstimatedSelectedSizeKb,
  selectEstimatedSelectedSizeMb,
  selectSelectedCount,
  selectSelectedIds,
  selectSelectedPets,
} from '@/features/pets/petsSelectors'
import { downloadSelectedPetImages } from '@/features/pets/services/downloadService'
import { extractErrorMessage } from '@/utils/errors/errorUtils'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  clearSelection,
  selectAllVisible,
  toggleSelectPet,
} from '@/redux/slices/selectionSlice'

export type UseSelectionResult = {
  selectedIds: number[]
  selectedCount: number
  estimatedTotalMb: number
  selectionSummary: string
  estimatedSizeKb: number
  toggle: (id: number) => void
  selectAllInScope: () => void
  clear: () => void
  isSelected: (id: number) => boolean
  downloadSelected: () => Promise<void>
  isDownloading: boolean
  downloadProgressLabel: string
}

export function useSelection(scopeIds: number[]): UseSelectionResult {
  const dispatch = useAppDispatch()
  const selectedIds = useAppSelector(selectSelectedIds)
  const selectedCount = useAppSelector(selectSelectedCount)
  const estimatedTotalMb = useAppSelector(selectEstimatedSelectedSizeMb)
  const estimatedSizeKb = useAppSelector(selectEstimatedSelectedSizeKb)
  const selectedPets = useAppSelector(selectSelectedPets)

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])

  const selectionSummary = useMemo(() => {
    const mbLabel =
      estimatedTotalMb >= 10
        ? estimatedTotalMb.toFixed(1)
        : estimatedTotalMb.toFixed(2)
    return `${selectedCount} Selected • ${mbLabel} MB`
  }, [selectedCount, estimatedTotalMb])

  const toggle = useCallback(
    (id: number) => {
      dispatch(toggleSelectPet(id))
    },
    [dispatch],
  )

  const selectAllInScope = useCallback(() => {
    dispatch(selectAllVisible(scopeIds))
  }, [dispatch, scopeIds])

  const clear = useCallback(() => {
    dispatch(clearSelection())
  }, [dispatch])

  const isSelected = useCallback((id: number) => selectedSet.has(id), [selectedSet])

  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgressLabel, setDownloadProgressLabel] = useState('')

  const downloadSelected = useCallback(async () => {
    if (selectedPets.length === 0) {
      toast.error('Select at least one image to download.')
      return
    }
    setIsDownloading(true)
    setDownloadProgressLabel('Preparing…')
    const toastId = toast.loading('Preparing download…')
    try {
      await downloadSelectedPetImages(selectedPets, (done, total, label) => {
        setDownloadProgressLabel(`${done} / ${total} — ${label}`)
      })
      toast.success(
        selectedPets.length === 1
          ? 'Image downloaded successfully.'
          : `ZIP with ${selectedPets.length} images saved.`,
        { id: toastId },
      )
    } catch (error: unknown) {
      toast.error(extractErrorMessage(error), { id: toastId })
    } finally {
      setIsDownloading(false)
      setDownloadProgressLabel('')
    }
  }, [selectedPets])

  return {
    selectedIds,
    selectedCount,
    estimatedTotalMb,
    selectionSummary,
    estimatedSizeKb,
    toggle,
    selectAllInScope,
    clear,
    isSelected,
    downloadSelected,
    isDownloading,
    downloadProgressLabel,
  }
}
