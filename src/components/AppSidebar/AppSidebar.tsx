import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import PetsIcon from '@mui/icons-material/Pets'
import map from 'lodash/map'
import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { RoutePath } from '@/utils/enums/routePath'
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
    description: 'Landing & highlights',
    icon: <HomeOutlinedIcon />,
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
    to: RoutePath.Dashboard,
    label: 'Dashboard',
    description: 'Analytics & insights',
    icon: <DashboardOutlinedIcon />,
  },
  {
    to: RoutePath.About,
    label: 'About',
    description: 'Profile & stack',
    icon: <InfoOutlinedIcon />,
  },
]

export function AppSidebar() {
  return (
    <aside className="app-sidebar glass-surface" aria-label="Section navigation">
      <p className="app-sidebar-kicker">Navigate</p>
      <ul className="app-sidebar-list">
        {map(SIDEBAR_LINKS, (item) => (
          <li key={item.to}>
            <NavLink to={item.to} className="app-sidebar-link" end={item.to === RoutePath.Home}>
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
