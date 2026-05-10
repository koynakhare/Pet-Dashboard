export const RoutePath = {
  Home: '/',
  Pets: '/gallery',
  Game: '/game',
  PetDetail: '/pets/:id',
  Favorites: '/favorites',
  About: '/about',
  NotFound: '/404',
} as const

export type RoutePathValue = (typeof RoutePath)[keyof typeof RoutePath]
