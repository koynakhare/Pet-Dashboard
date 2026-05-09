import type { SvgIconProps } from '@mui/material/SvgIcon'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded'
import type { ComponentType } from 'react'

export type HighlightItem = {
  id: string
  title: string
  description: string
  icon: ComponentType<SvgIconProps>
}

export const FEATURE_HIGHLIGHTS: HighlightItem[] = [
  {
    id: 'secure',
    title: 'Secure Login',
    description: 'Session-aware tokens and encrypted transport patterns.',
    icon: LockRoundedIcon,
  },
  {
    id: 'fast',
    title: 'Fast Performance',
    description: 'Lazy routes and optimized bundles for instant loads.',
    icon: BoltRoundedIcon,
  },
  {
    id: 'responsive',
    title: 'Responsive Design',
    description: 'Flawless layouts from mobile kiosks to ultrawide desks.',
    icon: SmartphoneRoundedIcon,
  },
  {
    id: 'gallery',
    title: 'Smart Gallery',
    description: 'Curate, search, and export visual assets in one flow.',
    icon: CollectionsRoundedIcon,
  },
]

export type FloatingMiniCard = {
  id: string
  label: string
  meta: string
  accentClass: string
}

export const FLOATING_MINI_CARDS: FloatingMiniCard[] = [
  { id: 'c1', label: 'Studio Pack', meta: 'Ready to sync', accentClass: 'auth-float-card-a' },
  { id: 'c2', label: 'Campaign assets', meta: '12 selections', accentClass: 'auth-float-card-b' },
  { id: 'c3', label: 'Exports', meta: 'ZIP queued', accentClass: 'auth-float-card-c' },
]

export type SocialProviderId = 'google' | 'github' | 'apple'

export type SocialProvider = {
  id: SocialProviderId
  label: string
}

export const SOCIAL_PROVIDERS: SocialProvider[] = [
  { id: 'google', label: 'Continue with Google' },
  { id: 'github', label: 'Continue with GitHub' },
  { id: 'apple', label: 'Continue with Apple' },
]
