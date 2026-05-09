import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { MainLayout, ProtectedRoute } from '@/layouts'
import { RoutePath } from '@/utils/enums/routePath'

const HomePage = lazy(async () => import('@/pages/Home'))
const PetsPage = lazy(async () => import('@/pages/pets'))
const PetDetailPage = lazy(async () => import('@/pages/PetDetail'))
const AboutPage = lazy(async () => import('@/pages/About'))
const LoginPage = lazy(async () => import('@/pages/Login'))
const DashboardPage = lazy(async () => import('@/pages/Dashboard'))
const FavoritesPage = lazy(async () => import('@/pages/Favorites'))
const NotFoundPage = lazy(async () => import('@/pages/NotFound'))

export const routeConfig: RouteObject[] = [
  {
    path: RoutePath.Home,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'pets', element: <PetsPage /> },
      { path: 'pets/:id', element: <PetDetailPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'about', element: <AboutPage /> },
      {
        path: 'dashboard',
        element: <ProtectedRoute />,
        children: [{ index: true, element: <DashboardPage /> }],
      },
    ],
  },
  { path: 'login', element: <LoginPage /> },
  { path: '404', element: <NotFoundPage /> },
  { path: '*', element: <Navigate to={RoutePath.NotFound} replace /> },
]
