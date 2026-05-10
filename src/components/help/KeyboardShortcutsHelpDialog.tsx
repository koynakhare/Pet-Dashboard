import CloseIcon from '@mui/icons-material/Close'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import map from 'lodash/map'

const isMac =
  typeof navigator !== 'undefined' && /\b(?:Mac|iPhone|iPod|iPad)\b/i.test(navigator.platform)

const modLabel = isMac ? '⌘' : 'Ctrl'

type KeyboardShortcutsHelpDialogProps = {
  open: boolean
  onClose: () => void
}

const SHORTCUT_ROWS: ReadonlyArray<{
  id: string
  shortcut: string
  description: string
}> = [
  {
    id: 'select-all',
    shortcut: `${modLabel}+A`,
    description: 'Select all visible pets (Gallery page only)',
  },
  {
    id: 'clear',
    shortcut: 'Escape',
    description: 'Clear current selection',
  },
  {
    id: 'search',
    shortcut: `${modLabel}+F`,
    description: 'Focus gallery search field',
  },
]

export function KeyboardShortcutsHelpDialog({ open, onClose }: KeyboardShortcutsHelpDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="keyboard-shortcuts-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="keyboard-shortcuts-dialog-title" sx={{ pr: 5 }}>
        Keyboard shortcuts
        <IconButton
          aria-label="Close keyboard shortcuts"
          onClick={onClose}
          sx={{ position: 'absolute', right: 12, top: 12 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} component="p">
          These shortcuts apply on the main Pets gallery (<strong>/gallery</strong>) except when
          typing in a field or inside a modal.
        </Typography>
        <Table size="small" aria-label="Keyboard shortcuts reference">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="col" width={140}>
                Shortcut
              </TableCell>
              <TableCell component="th" scope="col">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(SHORTCUT_ROWS, (row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ whiteSpace: 'nowrap', fontFamily: 'inherit' }}>
                  <kbd>{row.shortcut}</kbd>
                </TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}
