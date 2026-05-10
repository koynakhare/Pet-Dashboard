import { Navbar } from '@/components/Navbar'
import { Container } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import './MainLayout.css'

export function MainLayout() {
  const location = useLocation()
  return (
    <div className="main-layout">
      <a href="#main-content" className="main-layout-skip-link">
        Skip to main content
      </a>
      <Navbar />
      <div className="main-layout-shell">
        <main id="main-content" className="main-layout-main" tabIndex={-1}>
          <Container maxWidth="xl" className="main-layout-content">
            <div key={location.pathname} className="main-layout-outlet page-route-enter">
              <Outlet />
            </div>
          </Container>
        </main>
      </div>
    </div>
  )
}
