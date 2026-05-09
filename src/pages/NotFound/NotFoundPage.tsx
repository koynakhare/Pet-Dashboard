import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded'
import map from 'lodash/map'
import { PrimaryButton } from '@/components/Buttons'
import { RoutePath } from '@/utils/enums/routePath'
import { Link as RouterLink } from 'react-router-dom'
import './NotFoundPage.css'

const SUGGESTED_LINKS = [
  { id: 'home', label: 'Home', to: RoutePath.Home },
  { id: 'pets', label: 'Gallery', to: RoutePath.Pets },
  { id: 'about', label: 'About', to: RoutePath.About },
]

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-page-bg" aria-hidden="true">
        <span className="not-found-page-blob not-found-page-blob-a floating-element" />
        <span className="not-found-page-blob not-found-page-blob-b floating-element" />
      </div>
      <div className="not-found-page-panel glass-surface fade-in-up">
        <div className="not-found-page-icon-wrap">
          <TravelExploreRoundedIcon className="not-found-page-icon" />
        </div>
        <p className="not-found-page-code">404</p>
        <h1 className="not-found-page-title">This page drifted away</h1>
        <p className="not-found-page-desc">
          The URL might be mistyped, or the resource moved. Pick a destination below or head back to
          the gallery hub.
        </p>
        <PrimaryButton
          component={RouterLink}
          to={RoutePath.Home}
          size="large"
          startIcon={<HomeRoundedIcon />}
          className="not-found-page-cta"
        >
          Back to home
        </PrimaryButton>
        <nav className="not-found-page-links" aria-label="Suggested pages">
          <ul className="not-found-page-link-list">
            {map(SUGGESTED_LINKS, (link) => (
              <li key={link.id}>
                <RouterLink to={link.to} className="not-found-page-link">
                  {link.label}
                </RouterLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
