import type {
  PetDownloadPhase,
  PetDownloadRowModel,
} from '@/features/pets/services/downloadService'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import map from 'lodash/map'

export type DownloadProgressDialogProps = {
  open: boolean
  rows: PetDownloadRowModel[]
  phase: PetDownloadPhase | 'idle'
  onCancel: () => void
  onClose: () => void
}

function rowIcon(row: PetDownloadRowModel) {
  if (row.status === 'success') {
    return <CheckCircleIcon color="success" fontSize="small" aria-hidden />
  }
  if (row.status === 'error') {
    return <ErrorOutlinedIcon color="error" fontSize="small" aria-hidden />
  }
  return <HourglassEmptyIcon fontSize="small" color="action" aria-hidden />
}

function secondaryText(row: PetDownloadRowModel): string {
  if (row.status === 'pending') {
    return 'Pending'
  }
  if (row.status === 'downloading') {
    return 'Downloading…'
  }
  if (row.status === 'success') {
    return 'Downloaded successfully'
  }
  return row.errorMessage ?? 'Failed'
}

export function DownloadProgressDialog({
  open,
  rows,
  phase,
  onCancel,
  onClose,
}: DownloadProgressDialogProps) {
  const busy = phase === 'fetching' || phase === 'zipping'
  const showIndeterminateZip = phase === 'zipping'

  return (
    <Dialog
      open={open}
      onClose={(_event, reason) => {
        if (busy && reason === 'backdropClick') {
          return
        }
        if (busy) {
          onCancel()
          return
        }
        onClose()
      }}
      aria-labelledby="download-progress-title"
      fullWidth
      maxWidth="sm"
      scroll="paper"
    >
      <DialogTitle id="download-progress-title">Downloading images</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Fetching assets in parallel. You can cancel in-flight downloads; files already fetched may
          still be included when creating the archive.
        </Typography>
        {showIndeterminateZip ? (
          <LinearProgress
            aria-label="Creating zip archive"
            sx={{ mb: 2 }}
            variant="indeterminate"
          />
        ) : null}
        <List
          dense
          aria-label="Per-image download status"
          sx={{ maxHeight: 320, overflow: 'auto' }}
        >
          {map(rows, (row) => (
            <ListItem key={`${row.pet.id}-${row.index}`}>
              <ListItemIcon sx={{ minWidth: 38 }}>{rowIcon(row)}</ListItemIcon>
              <ListItemText
                primary={row.pet.title}
                secondary={secondaryText(row)}
                slotProps={{
                  primary: {
                    sx: {
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    },
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        {busy ? (
          <Button onClick={onCancel} aria-label="Cancel download">
            Cancel
          </Button>
        ) : (
          <Button onClick={onClose} variant="contained" aria-label="Close download dialog">
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
