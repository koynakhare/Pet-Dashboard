import type { SvgIconProps } from '@mui/material/SvgIcon'
import type { ComponentType } from 'react'
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded'
import ImageRoundedIcon from '@mui/icons-material/ImageRounded'
import PetsRoundedIcon from '@mui/icons-material/PetsRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import type { GalleryInsightLine } from './GalleryInsights'

export type DashboardStatItem = {
  id: string
  label: string
  value: string
  delta: string
  deltaPositive: boolean
  icon: ComponentType<SvgIconProps>
  accentClass: string
}

export type AnalyticsInsightItem = {
  id: string
  title: string
  value: string
  hint: string
  trend: 'up' | 'down' | 'flat'
}

export type QuickActionItem = {
  id: string
  label: string
  description: string
  to: string
  icon: ComponentType<SvgIconProps>
}

export type RecentPetItem = {
  id: string
  name: string
  breed: string
  image: string
  updatedAt: string
}

export type ActivityItem = {
  id: string
  title: string
  detail: string
  time: string
  tone: 'success' | 'info' | 'warning'
}

export type DownloadRow = {
  id: string
  name: string
  size: string
  time: string
}

export type UploadTrendPoint = { label: string; value: number }
export type DownloadBar = { label: string; value: number }
export type CategorySlice = { label: string; value: number; color: string; swatchClass: string }
export type GalleryActivityPoint = { label: string; value: number }

export const dashboardStats: DashboardStatItem[] = [
  {
    id: 'total-pets',
    label: 'Total Pets',
    value: '12,842',
    delta: '+12.4%',
    deltaPositive: true,
    icon: PetsRoundedIcon,
    accentClass: 'dash-stat-accent-violet',
  },
  {
    id: 'selected',
    label: 'Selected Pets',
    value: '186',
    delta: '+8.1%',
    deltaPositive: true,
    icon: ImageRoundedIcon,
    accentClass: 'dash-stat-accent-cyan',
  },
  {
    id: 'downloads',
    label: 'Downloads',
    value: '48,290',
    delta: '+22.0%',
    deltaPositive: true,
    icon: CloudDownloadRoundedIcon,
    accentClass: 'dash-stat-accent-mint',
  },
  {
    id: 'favorites',
    label: 'Favorites',
    value: '9,104',
    delta: '+3.2%',
    deltaPositive: true,
    icon: FavoriteRoundedIcon,
    accentClass: 'dash-stat-accent-rose',
  },
  {
    id: 'views',
    label: 'Gallery Views',
    value: '1.2M',
    delta: '-1.1%',
    deltaPositive: false,
    icon: VisibilityRoundedIcon,
    accentClass: 'dash-stat-accent-amber',
  },
  {
    id: 'storage',
    label: 'Storage Used',
    value: '38.4 GB',
    delta: '+410 MB',
    deltaPositive: false,
    icon: FolderOpenRoundedIcon,
    accentClass: 'dash-stat-accent-slate',
  },
]

export const analyticsInsights: AnalyticsInsightItem[] = [
  {
    id: 'conv',
    title: 'Selection → download',
    value: '64%',
    hint: 'Last 30 days',
    trend: 'up',
  },
  {
    id: 'latency',
    title: 'Avg. export time',
    value: '1.8s',
    hint: 'P95 across regions',
    trend: 'down',
  },
  {
    id: 'retention',
    title: 'Returning curators',
    value: '81%',
    hint: 'WoW change +4pts',
    trend: 'up',
  },
]

export const quickActions: QuickActionItem[] = [
  {
    id: 'upload',
    label: 'Upload',
    description: 'Add assets to the gallery',
    to: '/pets',
    icon: ImageRoundedIcon,
  },
  {
    id: 'download-selected',
    label: 'Download Selected',
    description: 'Zip your current picks',
    to: '/pets',
    icon: CloudDownloadRoundedIcon,
  },
  {
    id: 'favorites',
    label: 'View Favorites',
    description: 'Open saved collections',
    to: '/pets',
    icon: FavoriteRoundedIcon,
  },
  {
    id: 'manage',
    label: 'Manage Gallery',
    description: 'Organize categories & tags',
    to: '/pets',
    icon: FolderOpenRoundedIcon,
  },
]

export const recentPets: RecentPetItem[] = [
  {
    id: 'rp-1',
    name: 'Nala',
    breed: 'Golden Retriever',
    image:
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=200&q=80',
    updatedAt: '2m ago',
  },
  {
    id: 'rp-2',
    name: 'Milo',
    breed: 'Husky',
    image:
      'https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=200&q=80',
    updatedAt: '18m ago',
  },
  {
    id: 'rp-3',
    name: 'Luna',
    breed: 'Persian',
    image:
      'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=200&q=80',
    updatedAt: '1h ago',
  },
  {
    id: 'rp-4',
    name: 'Oliver',
    breed: 'Corgi',
    image:
      'https://images.unsplash.com/photo-1612536846250-8623ce2b0349?auto=format&fit=crop&w=200&q=80',
    updatedAt: '3h ago',
  },
]

export const activityTimeline: ActivityItem[] = [
  {
    id: 'a1',
    title: 'Bulk export completed',
    detail: '24 assets zipped to marketing@studio.io',
    time: '12:40',
    tone: 'success',
  },
  {
    id: 'a2',
    title: 'Gallery sync',
    detail: 'New category “Studio” propagated to all clients',
    time: '11:05',
    tone: 'info',
  },
  {
    id: 'a3',
    title: 'Rate limit warning',
    detail: 'Search API throttled for 12s — auto-recovered',
    time: '09:22',
    tone: 'warning',
  },
  {
    id: 'a4',
    title: 'Favorites milestone',
    detail: '9k hearts — +320 in the last 24h',
    time: 'Yesterday',
    tone: 'success',
  },
]

export const recentDownloads: DownloadRow[] = [
  { id: 'd1', name: 'spring-drop.zip', size: '842 MB', time: 'Just now' },
  { id: 'd2', name: 'campaign-a-assets.zip', size: '1.1 GB', time: 'Today' },
  { id: 'd3', name: 'favorites-mix.zip', size: '260 MB', time: 'Yesterday' },
]

export const uploadsTrend: UploadTrendPoint[] = [
  { label: 'Mon', value: 120 },
  { label: 'Tue', value: 190 },
  { label: 'Wed', value: 150 },
  { label: 'Thu', value: 240 },
  { label: 'Fri', value: 210 },
  { label: 'Sat', value: 280 },
  { label: 'Sun', value: 320 },
]

export const downloadsByDay: DownloadBar[] = [
  { label: 'W1', value: 420 },
  { label: 'W2', value: 510 },
  { label: 'W3', value: 390 },
  { label: 'W4', value: 640 },
]

export const petCategories: CategorySlice[] = [
  { label: 'Dogs', value: 48, color: '#6e5bff', swatchClass: 'dash-swatch-violet' },
  { label: 'Cats', value: 32, color: '#12d6ff', swatchClass: 'dash-swatch-cyan' },
  { label: 'Other', value: 20, color: '#ff7dd1', swatchClass: 'dash-swatch-rose' },
]

export const galleryActivity: GalleryActivityPoint[] = [
  { label: '00', value: 12 },
  { label: '04', value: 8 },
  { label: '08', value: 44 },
  { label: '12', value: 62 },
  { label: '16', value: 38 },
  { label: '20', value: 28 },
]

export const galleryInsightLines: GalleryInsightLine[] = [
  { id: 'gi-1', text: 'Top cohort: “Studio” assets drive 38% of downloads this week.' },
  { id: 'gi-2', text: 'Peak traffic lands between 12:00–16:00 UTC — scale workers accordingly.' },
  { id: 'gi-3', text: 'Favorites correlate with +19% repeat sessions within 7 days.' },
]
