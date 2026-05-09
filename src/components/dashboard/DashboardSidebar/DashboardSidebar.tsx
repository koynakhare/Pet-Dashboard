import type { DownloadRow } from '../mockData'
import type { GalleryInsightLine } from '../GalleryInsights'
import { DownloadsCard } from '../DownloadsCard'
import { GalleryInsights } from '../GalleryInsights'
import { SelectionOverview } from '../SelectionOverview'
import { StorageCard } from '../StorageCard'
import './DashboardSidebar.css'

type DashboardSidebarProps = {
  storage: { usedLabel: string; totalLabel: string; percent: number }
  downloads: DownloadRow[]
  selection: { selected: number; capacity: number }
  insights: GalleryInsightLine[]
  skeleton?: boolean
}

export function DashboardSidebar({
  storage,
  downloads,
  selection,
  insights,
  skeleton,
}: DashboardSidebarProps) {
  return (
    <aside className="dash-sidebar fade-in-up">
      <StorageCard
        usedLabel={storage.usedLabel}
        totalLabel={storage.totalLabel}
        percent={storage.percent}
        skeleton={skeleton}
      />
      <DownloadsCard rows={downloads} skeleton={skeleton} />
      <SelectionOverview
        selected={selection.selected}
        capacity={selection.capacity}
        skeleton={skeleton}
      />
      <GalleryInsights lines={insights} skeleton={skeleton} />
    </aside>
  )
}
