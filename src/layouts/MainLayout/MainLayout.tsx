import { Container } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import './MainLayout.css'

export function MainLayout() {
  const location = useLocation()
  return (
    <div className="main-layout">
      <Navbar />
      <div className="main-layout-shell">
        <main className="main-layout-main">
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
