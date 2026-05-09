import type { ReactNode } from 'react'
import { Typography } from '@mui/material'
import './SectionHeader.css'

type SectionHeaderProps = {
  title: string
  subtitle?: string
  kicker?: string
  action?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeader({
  title,
  subtitle,
  kicker,
  action,
  align = 'left',
}: SectionHeaderProps) {
  const rowClass =
    align === 'center'
      ? 'ui-section-header ui-section-header-center'
      : 'ui-section-header'
  return (
    <div className={rowClass}>
      <div className="ui-section-header-text">
        {kicker ? (
          <Typography component="p" className="ui-section-header-kicker">
            {kicker}
          </Typography>
        ) : null}
        <Typography component="h2" className="ui-section-header-title">
          {title}
        </Typography>
        {subtitle ? (
          <Typography component="p" className="ui-section-header-subtitle">
            {subtitle}
          </Typography>
        ) : null}
      </div>
      {action ? <div className="ui-section-header-action">{action}</div> : null}
    </div>
  )
}
