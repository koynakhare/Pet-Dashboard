import { Button, type ButtonProps } from '@mui/material'
import { forwardRef } from 'react'
import './Buttons.css'

export const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(function PrimaryButton(
  { className, ...rest },
  ref,
) {
  const cn = className ? `ui-btn ui-btn-primary ${className}` : 'ui-btn ui-btn-primary'
  return <Button ref={ref} className={cn} {...rest} />
})
