/**
 * Selection is synchronous; actions live on the slice. Re-export for a stable `actions/` import path.
 */
export {
  clearSelection,
  pruneSelectionToValidIds,
  selectAllVisible,
  toggleSelectPet,
} from '@/redux/slices/selectionSlice'
