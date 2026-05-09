import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded'
import { Button, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { RoutePath } from '@/utils/enums/routePath'
import { FloatingCards, type FloatingPetCard } from '../FloatingCards'
import { GradientBackground } from '../GradientBackground'
import './Hero.css'

type HeroProps = {
  title: string
  highlightedText: string
  subtitle: string
  cards: FloatingPetCard[]
}

export function Hero({ title, highlightedText, subtitle, cards }: HeroProps) {
  return (
    <section className="home-hero-section fade-in-up">
      <GradientBackground />
      <div className="home-hero-grid">
        <div className="home-hero-content">
          <Typography component="p" className="home-hero-kicker">
            Premium Pet Curation Platform
          </Typography>
          <Typography component="h1" className="home-hero-title">
            {title}
            <span className="home-hero-title-gradient"> {highlightedText}</span>
          </Typography>
          <Typography component="p" className="home-hero-subtitle">
            {subtitle}
          </Typography>
          <div className="home-hero-actions">
            <Button
              component={RouterLink}
              to={RoutePath.Pets}
              variant="contained"
              endIcon={<ArrowOutwardRoundedIcon />}
              className="home-hero-action home-hero-action-primary"
            >
              Explore the Gallery
            </Button>
            <Button
              component={RouterLink}
              to={RoutePath.Dashboard}
              variant="outlined"
              endIcon={<ExploreRoundedIcon />}
              className="home-hero-action home-hero-action-secondary"
            >
              Open Dashboard
            </Button>
          </div>
        </div>
        <div className="home-hero-visual glass-surface">
          <div className="home-hero-visual-image" />
          <FloatingCards cards={cards} />
        </div>
      </div>
    </section>
  )
}
