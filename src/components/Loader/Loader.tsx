import { Box, CircularProgress } from '@mui/material'
import './Loader.css'

type LoaderProps = {
  label?: string
  variant?: 'inline' | 'page'
}

export function Loader({ label = 'Loading', variant = 'inline' }: LoaderProps) {
  const rootClass = variant === 'page' ? 'loader-root loader-root-page' : 'loader-root'
  return (
    <Box role="status" aria-label={label} className={rootClass}>
      <CircularProgress />
    </Box>
  )
}
