import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import type { ReactNode } from 'react'
import { OutlineButton } from '@/components/buttons'
import './ConfirmDialog.css'

export type ConfirmDialogProps = {
  open: boolean
  title: string
  /** Plain text description (preferred for a11y). Use `children` for richer content. */
  description?: string
  /** Optional rich content below the title (e.g. lists). Ignored when `description` is set. */
  children?: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  /** When true, confirm button shows loading state and is disabled. */
  loading?: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  children,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  loading = false,
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!loading) {
          onClose()
        }
      }}
      className="confirm-dialog-root"
      aria-labelledby="confirm-dialog-title"
      aria-describedby={description ? 'confirm-dialog-desc' : undefined}
      PaperProps={{ className: 'confirm-dialog-paper glass-surface-strong' }}
    >
      <DialogTitle id="confirm-dialog-title" className="confirm-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent className="confirm-dialog-content">
        {description ? (
          <DialogContentText id="confirm-dialog-desc" className="confirm-dialog-text">
            {description}
          </DialogContentText>
        ) : (
          children
        )}
      </DialogContent>
      <DialogActions className="confirm-dialog-actions">
        <OutlineButton onClick={onClose} disabled={loading} className="confirm-dialog-cancel">
          {cancelLabel}
        </OutlineButton>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
          className="confirm-dialog-confirm"
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
