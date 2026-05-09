import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/redux/hooks'
import { selectIsAuthenticated } from '@/redux/slices/authSlice'
import { RoutePath } from '@/utils/enums/routePath'
import './ProtectedRoute.css'

export function ProtectedRoute() {
  const authed = useAppSelector(selectIsAuthenticated)

  if (!authed) {
    return <Navigate to={RoutePath.Login} replace />
  }

  return <Outlet />
}
