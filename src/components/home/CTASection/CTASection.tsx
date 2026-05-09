import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { Button, Paper, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { RoutePath } from '@/utils/enums/routePath'
import './CTASection.css'

export function CTASection() {
  return (
    <section className="home-cta-section fade-in-up">
      <Paper elevation={0} className="home-cta-card">
        <Typography component="h2" className="home-cta-title">
          Explore the Gallery
        </Typography>
        <Typography component="p" className="home-cta-description">
          Dive into a premium visual collection crafted for teams that care about quality
          and speed.
        </Typography>
        <Button
          component={RouterLink}
          to={RoutePath.Pets}
          variant="contained"
          endIcon={<ArrowForwardRoundedIcon />}
          className="home-cta-button"
        >
          Start Exploring
        </Button>
      </Paper>
    </section>
  )
}
