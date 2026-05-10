import {
  selectEstimatedSelectedSizeKb,
  selectEstimatedSelectedSizeMb,
  selectSelectedCount,
  selectSelectedIds,
  selectSelectedPets,
} from '@/features/pets/petsSelectors'
import {
  type PetDownloadPhase,
  type PetDownloadRowModel,
  createInitialDownloadRows,
  executeTrackedPetDownload,
} from '@/features/pets/services/downloadService'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { clearSelection, selectAllVisible, toggleSelectPet } from '@/redux/slices/selectionSlice'
import { extractErrorMessage } from '@/utils/errors/errorUtils'
import { useCallback, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'

export type PetsDownloadDialogSnapshot = {
  open: boolean
  rows: PetDownloadRowModel[]
  phase: PetDownloadPhase | 'idle'
}

const closedDialogState: PetsDownloadDialogSnapshot = {
  open: false,
  rows: [],
  phase: 'idle',
}

export type UseSelectionResult = {
  selectedIds: number[]
  selectedCount: number
  estimatedTotalMb: number
  estimatedSizeKb: number
  toggle: (id: number) => void
  selectAllInScope: () => void
  clear: () => void
  isSelected: (id: number) => boolean
  downloadSelected: () => Promise<void>
  isDownloading: boolean
  downloadProgressLabel: string
  downloadDialog: PetsDownloadDialogSnapshot
  cancelDownload: () => void
  closeDownloadDialog: () => void
}

export function useSelection(scopeIds: number[]): UseSelectionResult {
  const dispatch = useAppDispatch()
  const selectedIds = useAppSelector(selectSelectedIds)
  const selectedCount = useAppSelector(selectSelectedCount)
  const estimatedTotalMb = useAppSelector(selectEstimatedSelectedSizeMb)
  const estimatedSizeKb = useAppSelector(selectEstimatedSelectedSizeKb)
  const selectedPets = useAppSelector(selectSelectedPets)

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])

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

  const downloadAbortRef = useRef<AbortController | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgressLabel, setDownloadProgressLabel] = useState('')
  const [downloadDialog, setDownloadDialog] =
    useState<PetsDownloadDialogSnapshot>(closedDialogState)

  const patchDownloadRow = useCallback(
    (index: number, patch: Partial<Pick<PetDownloadRowModel, 'status' | 'errorMessage'>>) => {
      setDownloadDialog((prev) =>
        prev.open
          ? {
              ...prev,
              rows: prev.rows.map((row, idx) => (idx === index ? { ...row, ...patch } : row)),
            }
          : prev,
      )
    },
    [],
  )

  const cancelDownload = useCallback(() => {
    downloadAbortRef.current?.abort()
  }, [])

  const closeDownloadDialog = useCallback(() => {
    setDownloadDialog(closedDialogState)
  }, [])

  const downloadSelected = useCallback(async () => {
    if (selectedPets.length === 0) {
      toast.error('Select at least one image to download.')
      return
    }

    downloadAbortRef.current = new AbortController()
    const { signal } = downloadAbortRef.current

    setIsDownloading(true)
    setDownloadProgressLabel(
      selectedPets.length === 1 ? 'Preparing download…' : 'Downloading images…',
    )

    const rows = createInitialDownloadRows(selectedPets)
    setDownloadDialog({
      open: true,
      rows,
      phase: 'fetching',
    })

    const toastId = toast.loading('Preparing download…')

    try {
      await executeTrackedPetDownload(selectedPets, {
        signal,
        onPatchRow: patchDownloadRow,
        onPhase: (phase) => {
          setDownloadDialog((prev) => ({ ...prev, phase }))
          if (phase === 'zipping') {
            setDownloadProgressLabel('Building ZIP…')
          }
        },
      })

      toast.success(
        selectedPets.length === 1
          ? 'Image downloaded successfully.'
          : `ZIP with ${selectedPets.length} downloads finished.`,
        { id: toastId },
      )
    } catch (error: unknown) {
      const aborted =
        signal.aborted || (error instanceof DOMException && error.name === 'AbortError')
      const msg = extractErrorMessage(error)
      if (aborted) {
        toast('Download cancelled.', { id: toastId })
      } else if (msg) {
        toast.error(msg, { id: toastId })
      } else {
        toast.error('Download failed.', { id: toastId })
      }
    } finally {
      downloadAbortRef.current = null
      setIsDownloading(false)
      setDownloadProgressLabel('')
    }
  }, [patchDownloadRow, selectedPets])

  return {
    selectedIds,
    selectedCount,
    estimatedTotalMb,
    estimatedSizeKb,
    toggle,
    selectAllInScope,
    clear,
    isSelected,
    downloadSelected,
    isDownloading,
    downloadProgressLabel,
    downloadDialog,
    cancelDownload,
    closeDownloadDialog,
  }
}
