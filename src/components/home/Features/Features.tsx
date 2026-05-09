import type { ComponentType } from 'react'
import { Typography } from '@mui/material'
import map from 'lodash/map'
import { FeatureCard } from '../FeatureCard'
import './Features.css'

export type HomeFeature = {
  id: string
  title: string
  description: string
  icon: ComponentType
}

type FeaturesProps = {
  features: HomeFeature[]
}

export function Features({ features }: FeaturesProps) {
  return (
    <section className="home-features-section fade-in-up">
      <Typography component="h2" className="home-section-heading">
        Built for speed, crafted for delight.
      </Typography>
      <div className="home-features-grid">
        {map(features, (feature) => {
          const Icon = feature.icon
          return (
            <FeatureCard
              key={feature.id}
              icon={<Icon />}
              title={feature.title}
              description={feature.description}
            />
          )
        })}
      </div>
    </section>
  )
}
