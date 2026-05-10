import { MainLayout } from '@/layouts'
import { RoutePath } from '@/utils/enums/routePath'
import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const PetsPage = lazy(async () => import('@/pages/pets'))
const PetDetailPage = lazy(async () => import('@/pages/PetDetail'))
const FavoritesPage = lazy(async () => import('@/pages/Favorites'))
const DashboardPage = lazy(async () => import('@/pages/Dashboard'))
const AboutMePage = lazy(async () => import('@/pages/AboutMe'))
const GamePage = lazy(async () => import('@/pages/Game'))
const NotFoundPage = lazy(async () => import('@/pages/NotFound'))

export const routeConfig: RouteObject[] = [
  {
    id: 'main-layout',
    element: <MainLayout />,
    children: [
      { id: 'route-home', index: true, element: <DashboardPage /> },
      { id: 'route-gallery', path: 'gallery', element: <PetsPage /> },
      { id: 'route-pet-detail', path: 'pets/:id', element: <PetDetailPage /> },
      { id: 'route-pets-redirect', path: 'pets', element: <Navigate to="/gallery" replace /> },
      { id: 'route-favorites', path: 'favorites', element: <FavoritesPage /> },
      { id: 'route-game', path: 'game', element: <GamePage /> },
      { id: 'route-about', path: 'about', element: <AboutMePage /> },
    ],
  },
  { id: 'route-404', path: '404', element: <NotFoundPage /> },
  {
    id: 'route-wildcard',
    path: '*',
    element: <Navigate to={RoutePath.NotFound} replace />,
  },
]
