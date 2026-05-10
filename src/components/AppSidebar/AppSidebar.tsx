import { RoutePath } from '@/utils/enums/routePath'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import PetsIcon from '@mui/icons-material/Pets'
import map from 'lodash/map'
import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import './AppSidebar.css'

type SidebarLink = {
  to: string
  label: string
  description: string
  icon: ReactElement
}

const SIDEBAR_LINKS: SidebarLink[] = [
  {
    to: RoutePath.Home,
    label: 'Home',
    description: 'Welcome & project overview',
    icon: <HomeRoundedIcon />,
  },
  {
    to: RoutePath.Pets,
    label: 'Gallery',
    description: 'Browse & curate pets',
    icon: <PetsIcon />,
  },
  {
    to: RoutePath.Favorites,
    label: 'Favorites',
    description: 'Saved picks & mood boards',
    icon: <FavoriteRoundedIcon />,
  },
  {
    to: RoutePath.About,
    label: 'About me',
    description: 'Project story, stack & contact',
    icon: <PersonOutlineRoundedIcon />,
  },
]

export function AppSidebar() {
  return (
    <aside className="app-sidebar glass-surface" aria-label="Section navigation">
      <p className="app-sidebar-kicker">Navigate</p>
      <ul className="app-sidebar-list">
        {map(SIDEBAR_LINKS, (item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className="app-sidebar-link"
              end={item.to === RoutePath.Home || item.to === RoutePath.Pets}
            >
              <span className="app-sidebar-link-icon">{item.icon}</span>
              <span className="app-sidebar-link-text">
                <span className="app-sidebar-link-label">{item.label}</span>
                <span className="app-sidebar-link-desc">{item.description}</span>
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}
