import { Typography } from '@mui/material'
import map from 'lodash/map'
import { memo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthHero } from '@/components/auth/AuthHero'
import { LoginForm } from '@/components/auth/LoginForm'
import { SocialLogin } from '@/components/auth/SocialLogin'
import { RoutePath } from '@/utils/enums/routePath'
import './LoginPage.css'

const FOOTER_LINKS = [
  { id: 'terms', label: 'Terms', to: '#' as const },
  { id: 'privacy', label: 'Privacy', to: '#' as const },
  { id: 'security', label: 'Security', to: '#' as const },
  { id: 'help', label: 'Help Center', to: '#' as const },
]

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-page-hero">
        <AuthHero />
      </div>
      <div className="login-page-panel">
        <div className="login-page-panel-inner fade-in-up">
          <AuthCard>
            <Typography component="h1" className="login-page-welcome-title">
              Welcome back
            </Typography>
            <Typography component="p" className="login-page-welcome-sub">
              Sign in to continue curating your premium pet gallery experience.
            </Typography>
            <LoginForm />
            <div className="login-page-divider">
              <span className="login-page-divider-line" />
              <span className="login-page-divider-text">or continue with</span>
              <span className="login-page-divider-line" />
            </div>
            <SocialLogin />
          </AuthCard>
          <nav className="login-page-footer-nav" aria-label="Legal">
            <ul className="login-page-footer-list">
              {map(FOOTER_LINKS, (item) => (
                <li key={item.id}>
                  <a href={item.to} className="login-page-footer-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <RouterLink to={RoutePath.Home} className="login-page-back-home">
              ← Back to website
            </RouterLink>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default memo(LoginPage)
