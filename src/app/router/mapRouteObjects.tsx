import type { ReactNode } from 'react'
import { Route } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

/**
 * Maps a `RouteObject[]` tree to `<Route />` elements (enterprise-style route tables).
 */
export function mapRouteObjects(routes: RouteObject[]): ReactNode[] {
  return routes.map((route, index) => {
    if (route.index) {
      return (
        <Route
          key={`route-index-${index}`}
          index
          element={route.element}
        />
      )
    }

    return (
      <Route
        key={route.path ?? `route-${index}`}
        path={route.path}
        element={route.element}
      >
        {route.children && route.children.length > 0
          ? mapRouteObjects(route.children)
          : null}
      </Route>
    )
  })
}
