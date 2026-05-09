import AppleIcon from '@mui/icons-material/Apple'
import GitHubIcon from '@mui/icons-material/GitHub'
import GoogleIcon from '@mui/icons-material/Google'
import { Button } from '@mui/material'
import map from 'lodash/map'
import toast from 'react-hot-toast'
import type { SocialProviderId } from '../promoContent'
import { SOCIAL_PROVIDERS } from '../promoContent'
import './SocialLogin.css'

const ICONS: Record<SocialProviderId, typeof GoogleIcon> = {
  google: GoogleIcon,
  github: GitHubIcon,
  apple: AppleIcon,
}

export function SocialLogin() {
  const handleDemo = (label: string) => {
    toast('Social sign-in is a demo in this build.', { icon: 'ℹ️' })
  }

  return (
    <div className="auth-social">
      {map(SOCIAL_PROVIDERS, (provider) => {
        const Icon = ICONS[provider.id]
        return (
          <Button
            key={provider.id}
            type="button"
            variant="outlined"
            fullWidth
            className="auth-social-button"
            startIcon={<Icon fontSize="small" />}
            onClick={() => handleDemo(provider.label)}
          >
            {provider.label}
          </Button>
        )
      })}
    </div>
  )
}
