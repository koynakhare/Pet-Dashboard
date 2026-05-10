import { Button, type ButtonProps } from '@mui/material'
import { type ElementType, forwardRef } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import './Buttons.css'

export type RouterLinkButtonProps = Omit<ButtonProps, 'component' | 'href'> &
  Pick<LinkProps, 'to' | 'replace' | 'state'>

export const RouterLinkButton = forwardRef<HTMLAnchorElement, RouterLinkButtonProps>(
  ({ to, replace, state, className = '', ...props }, ref) => (
    <Button
      ref={ref as ButtonProps['ref']}
      component={Link as ElementType}
      to={to}
      replace={replace}
      state={state}
      className={className.trim() || undefined}
      {...props}
    />
  ),
)
RouterLinkButton.displayName = 'RouterLinkButton'

export const PrimaryLinkButton = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkButtonProps, 'variant' | 'color'>
>(({ className = '', ...props }, ref) => (
  <RouterLinkButton
    ref={ref}
    variant="contained"
    color="primary"
    className={`ui-btn ui-btn-primary ${className}`.trim()}
    {...props}
  />
))
PrimaryLinkButton.displayName = 'PrimaryLinkButton'

export const OutlineLinkButton = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkButtonProps, 'variant' | 'color'>
>(({ className = '', ...props }, ref) => (
  <RouterLinkButton
    ref={ref}
    variant="outlined"
    color="primary"
    className={`ui-btn ui-btn-outline ${className}`.trim()}
    {...props}
  />
))
OutlineLinkButton.displayName = 'OutlineLinkButton'
