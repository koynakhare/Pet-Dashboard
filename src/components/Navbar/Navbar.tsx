import { KeyboardShortcutsHelpDialog } from '@/components/help/KeyboardShortcutsHelpDialog'
import { useColorMode } from '@/hooks/useColorMode'
import { RoutePath } from '@/utils/enums/routePath'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import PetsIcon from '@mui/icons-material/Pets'
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded'
import {
  AppBar,
  Box,
  Button,
  Chip,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import map from 'lodash/map'
import type { ElementType, ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

export type NavLinkItem = {
  to: string
  label: string
  icon: ReactElement
  badgeText?: string
}

const MAIN_NAV_LINKS: NavLinkItem[] = [
  { to: RoutePath.Home, label: 'Home', icon: <HomeRoundedIcon /> },
  { to: RoutePath.Pets, label: 'Gallery', icon: <PetsIcon /> },
  { to: RoutePath.Favorites, label: 'Favorites', icon: <FavoriteRoundedIcon /> },
  {
    to: RoutePath.Game,
    label: 'Game',
    icon: <SportsEsportsRoundedIcon />,
    badgeText: 'NEW',
  },
  { to: RoutePath.About, label: 'About me', icon: <PersonOutlineRoundedIcon /> },
]

function navLinkEnd(path: string): boolean {
  return path === RoutePath.Home || path === RoutePath.Pets || path === RoutePath.Game
}

export function Navbar() {
  const { mode, toggleMode } = useColorMode()
  const [shortcutsHelpOpen, setShortcutsHelpOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()
  const isCompactNav = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()

  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  const renderLinkButton = (link: NavLinkItem, isDrawer?: boolean) => (
    <Button
      key={link.to}
      component={NavLink as ElementType}
      to={link.to}
      end={navLinkEnd(link.to)}
      startIcon={link.icon}
      className={isDrawer ? 'app-navbar-drawer-link' : 'app-navbar-link anim-navbar-underline'}
      fullWidth={Boolean(isDrawer)}
      onClick={isDrawer ? () => setDrawerOpen(false) : undefined}
      sx={
        isDrawer
          ? {
              justifyContent: 'flex-start',
              py: 1.25,
              minHeight: 48,
              textTransform: 'none',
              fontWeight: 600,
            }
          : undefined
      }
    >
      <span className="app-navbar-link-label">{link.label}</span>
      {link.badgeText ? (
        <Chip label={link.badgeText} size="small" className="app-navbar-new-pill" />
      ) : null}
    </Button>
  )

  return (
    <AppBar position="sticky" color="transparent" elevation={0} className="app-navbar">
      <KeyboardShortcutsHelpDialog
        open={shortcutsHelpOpen}
        onClose={() => setShortcutsHelpOpen(false)}
      />
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: { className: 'app-navbar-drawer-paper' },
        }}
      >
        <Box component="nav" className="app-navbar-drawer-inner" aria-label="Primary navigation">
          {map(MAIN_NAV_LINKS, (link) => renderLinkButton(link, true))}
        </Box>
      </Drawer>

      <Toolbar className="app-navbar-toolbar">
        {isCompactNav ? (
          <IconButton
            color="inherit"
            edge="start"
            aria-label="Open navigation menu"
            onClick={() => setDrawerOpen(true)}
            className="app-navbar-menu-trigger"
          >
            <MenuRoundedIcon />
          </IconButton>
        ) : (
          <div className="app-navbar-balance" aria-hidden />
        )}
        {!isCompactNav ? (
          <nav className="app-navbar-links" aria-label="Primary">
            {map(MAIN_NAV_LINKS, (link) => renderLinkButton(link, false))}
          </nav>
        ) : null}
        {isCompactNav ? <div className="app-navbar-balance" aria-hidden /> : null}
        <div className="app-navbar-actions">
          <IconButton
            color="inherit"
            className="app-navbar-help"
            aria-label="Show keyboard shortcuts"
            onClick={() => setShortcutsHelpOpen(true)}
          >
            <HelpOutlineRoundedIcon />
          </IconButton>
          <IconButton
            onClick={toggleMode}
            color="inherit"
            className="app-navbar-theme-toggle"
            aria-label={mode === 'light' ? 'Dark mode' : 'Light mode'}
          >
            {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}
