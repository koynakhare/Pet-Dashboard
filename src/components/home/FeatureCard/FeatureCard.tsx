import type { ReactNode } from 'react'
import { Paper, Typography } from '@mui/material'
import './FeatureCard.css'

type FeatureCardProps = {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Paper elevation={0} className="home-feature-card glass-surface">
      <div className="home-feature-card-icon">{icon}</div>
      <Typography component="h3" className="home-feature-card-title">
        {title}
      </Typography>
      <Typography component="p" className="home-feature-card-description">
        {description}
      </Typography>
    </Paper>
  )
}
