import type { ReactNode } from 'react'
import { Route } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

export function mapRouteObjects(routes: RouteObject[]): ReactNode[] {
  return routes.map((route, index) => {
    const routeKey = route.id ?? route.path ?? `route-${index}`

    if (route.index) {
      return <Route key={routeKey} index element={route.element} />
    }

    return (
      <Route
        key={routeKey}
        {...(route.path != null ? { path: route.path } : {})}
        element={route.element}
      >
        {route.children && route.children.length > 0 ? mapRouteObjects(route.children) : null}
      </Route>
    )
  })
}
