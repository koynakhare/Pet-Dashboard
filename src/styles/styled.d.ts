import type { StyledAppTheme } from './styledComponentsTheme'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- styled-components DefaultTheme augmentation
  export interface DefaultTheme extends StyledAppTheme {}
}
