import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import PetsIcon from '@mui/icons-material/Pets'
import { AppBar, Avatar, Button, IconButton, Toolbar } from '@mui/material'
import map from 'lodash/map'
import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { useColorMode } from '@/hooks/useColorMode'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { logout, selectIsAuthenticated } from '@/redux/slices/authSlice'
import { APP_NAME } from '@/utils/constants/app'
import { RoutePath } from '@/utils/enums/routePath'
import './Navbar.css'

export type NavLinkItem = {
  to: string
  label: string
  icon: ReactElement
}

const MAIN_NAV_LINKS: NavLinkItem[] = [
  { to: RoutePath.Home, label: 'Home', icon: <HomeOutlinedIcon /> },
  { to: RoutePath.Pets, label: 'Gallery', icon: <PetsIcon /> },
  { to: RoutePath.Favorites, label: 'Favorites', icon: <FavoriteRoundedIcon /> },
  { to: RoutePath.Dashboard, label: 'Dashboard', icon: <DashboardOutlinedIcon /> },
  { to: RoutePath.About, label: 'About', icon: <InfoOutlinedIcon /> },
]

export function Navbar() {
  const dispatch = useAppDispatch()
  const authed = useAppSelector(selectIsAuthenticated)
  const { mode, toggleMode } = useColorMode()

  return (
    <AppBar position="sticky" color="transparent" elevation={0} className="app-navbar">
      <Toolbar className="app-navbar-toolbar">
        <div className="app-navbar-brand">
          <Avatar className="app-navbar-logo">P</Avatar>
          <span className="app-navbar-title">{APP_NAME}</span>
        </div>
        <nav className="app-navbar-links" aria-label="Primary">
          {map(MAIN_NAV_LINKS, (link) => (
            <Button
              key={link.to}
              component={NavLink}
              to={link.to}
              end={link.to === RoutePath.Home}
              startIcon={link.icon}
              className="app-navbar-link anim-navbar-underline"
            >
              {link.label}
            </Button>
          ))}
        </nav>
        <div className="app-navbar-actions">
          <IconButton
            onClick={toggleMode}
            color="inherit"
            className="app-navbar-theme-toggle"
            aria-label={mode === 'light' ? 'Dark mode' : 'Light mode'}
          >
            {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
          <Avatar className="app-navbar-user-avatar">A</Avatar>
          {!authed ? (
            <Button
              component={NavLink}
              to={RoutePath.Login}
              startIcon={<LoginIcon />}
              color="inherit"
              className="app-navbar-auth"
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={() => dispatch(logout())}
              startIcon={<LogoutIcon />}
              color="inherit"
              className="app-navbar-auth"
            >
              Logout
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}
