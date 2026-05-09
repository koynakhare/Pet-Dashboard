import { Box, CircularProgress, Typography } from '@mui/material'
import './InfiniteScrollLoader.css'

type InfiniteScrollLoaderProps = {
  label?: string
}

export function InfiniteScrollLoader({ label = 'Loading more' }: InfiniteScrollLoaderProps) {
  return (
    <Box className="ui-infinite-scroll-loader" role="status" aria-live="polite">
      <CircularProgress size={22} className="ui-infinite-scroll-loader-spinner" />
      <Typography component="span" className="ui-infinite-scroll-loader-label">
        {label}
      </Typography>
    </Box>
  )
}
