import { OutlineButton } from '@/components/buttons'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import type { ReactNode } from 'react'
import './ConfirmDialog.css'

export type ConfirmDialogProps = {
  open: boolean
  title: string
  description?: string
  children?: ReactNode
  cancelLabel?: string
  confirmLabel?: string
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
      slotProps={{ paper: { className: 'confirm-dialog-paper glass-surface-strong' } }}
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
