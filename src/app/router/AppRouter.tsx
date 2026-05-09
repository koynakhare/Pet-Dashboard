import { Suspense } from 'react'
import { Routes } from 'react-router-dom'
import { mapRouteObjects } from '@/app/router/mapRouteObjects'
import { Loader } from '@/components'
import { routeConfig } from '@/routes/routeConfig'

/**
 * Application router: declarative route table + Suspense for lazy pages.
 */
export function AppRouter() {
  return (
    <Suspense fallback={<Loader variant="page" />}>
      <Routes>{mapRouteObjects(routeConfig)}</Routes>
    </Suspense>
  )
}
