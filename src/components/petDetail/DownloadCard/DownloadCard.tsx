import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import { Typography } from '@mui/material'
import { memo } from 'react'
import { PrimaryButton } from '@/components/buttons'
import './DownloadCard.css'

type DownloadCardProps = {
  estimatedSizeMb: number
  selected: boolean
  onToggleSelection: () => void
  onOpenOriginal: () => void
}

function DownloadCardComponent({
  estimatedSizeMb,
  selected,
  onToggleSelection,
  onOpenOriginal,
}: DownloadCardProps) {
  return (
    <section className="pet-detail-download-card glass-surface-strong surface-ring-hover">
      <div className="pet-detail-download-card-head">
        <CloudDownloadIcon className="pet-detail-download-card-icon" />
        <div>
          <Typography component="h2" className="pet-detail-download-card-title">
            Export-ready
          </Typography>
          <Typography component="p" className="pet-detail-download-card-sub">
            Add to your selection for batch download (~{estimatedSizeMb.toFixed(1)} MB est.).
          </Typography>
        </div>
      </div>
      <div className="pet-detail-download-card-actions">
        <PrimaryButton fullWidth className="pet-detail-download-primary" onClick={onToggleSelection}>
          {selected ? 'Remove from selection' : 'Add to selection'}
        </PrimaryButton>
        <button type="button" className="pet-detail-download-link" onClick={onOpenOriginal}>
          Open original in new tab
        </button>
      </div>
    </section>
  )
}

export const DownloadCard = memo(DownloadCardComponent)
