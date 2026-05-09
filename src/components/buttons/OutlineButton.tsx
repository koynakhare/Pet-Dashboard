import { Button, type ButtonProps } from '@mui/material'
import { forwardRef } from 'react'
import './Buttons.css'

export const OutlineButton = forwardRef<HTMLButtonElement, ButtonProps>(function OutlineButton(
  { className, ...rest },
  ref,
) {
  const cn = className ? `ui-btn ui-btn-outline ${className}` : 'ui-btn ui-btn-outline'
  return <Button ref={ref} variant="outlined" className={cn} {...rest} />
})
