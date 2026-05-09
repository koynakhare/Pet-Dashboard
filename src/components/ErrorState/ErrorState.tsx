import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { Button, Paper, Typography } from '@mui/material'
import './ErrorState.css'

export type ErrorStateProps = {
  className?: string
  title: string
  message: string
  retryLabel?: string
  onRetry?: () => void
}

export function ErrorState({
  className,
  title,
  message,
  retryLabel = 'Try again',
  onRetry,
}: ErrorStateProps) {
  const rootClass = className ? `ui-error-state ${className}` : 'ui-error-state'
  return (
    <Paper className={rootClass} elevation={0}>
      <ErrorOutlineOutlinedIcon className="ui-error-state-icon" aria-hidden="true" />
      <Typography component="h2" className="ui-error-state-title">
        {title}
      </Typography>
      <Typography component="p" className="ui-error-state-message">
        {message}
      </Typography>
      {onRetry ? (
        <Button className="ui-error-state-retry" variant="contained" onClick={onRetry}>
          {retryLabel}
        </Button>
      ) : null}
    </Paper>
  )
}
