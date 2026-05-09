
export const RoutePath = {
  Home: '/',
  Pets: '/pets',
  PetDetail: '/pets/:id',
  Favorites: '/favorites',
  About: '/about',
  Login: '/login',
  Dashboard: '/dashboard',
  NotFound: '/404',
} as const

export type RoutePathValue = (typeof RoutePath)[keyof typeof RoutePath]
