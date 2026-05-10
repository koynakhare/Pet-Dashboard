import { PrimaryLinkButton } from '@/components/buttons'
import { RoutePath } from '@/utils/enums/routePath'
import PetsIcon from '@mui/icons-material/Pets'
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded'
import map from 'lodash/map'
import { Link as RouterLink } from 'react-router-dom'
import './NotFoundPage.css'

const SUGGESTED_LINKS = [
  { id: 'home', label: 'Home', to: RoutePath.Home },
  { id: 'gallery', label: 'Gallery', to: RoutePath.Pets },
  { id: 'favorites', label: 'Favorites', to: RoutePath.Favorites },
  { id: 'about', label: 'About me', to: RoutePath.About },
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
        <PrimaryLinkButton
          to={RoutePath.Pets}
          size="large"
          startIcon={<PetsIcon />}
          className="not-found-page-cta"
        >
          Back to gallery
        </PrimaryLinkButton>
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
