import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded'
import { Avatar, Paper, Typography } from '@mui/material'
import './Testimonial.css'

export function Testimonial() {
  return (
    <section className="home-testimonial-section fade-in-up">
      <Paper elevation={0} className="home-testimonial-card glass-surface">
        <FormatQuoteRoundedIcon className="home-testimonial-quote" />
        <Typography component="p" className="home-testimonial-text">
          Pet Gallery Dashboard made our pet content strategy feel effortless. The visual
          quality, smart search, and download flow helped our team ship campaigns 3x
          faster.
        </Typography>
        <div className="home-testimonial-author-row">
          <Avatar
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
            alt="Maya Wilson"
            className="home-testimonial-author-avatar"
          />
          <div>
            <Typography component="p" className="home-testimonial-author-name">
              Maya Wilson
            </Typography>
            <Typography component="p" className="home-testimonial-author-role">
              Creative Director, PawStudio
            </Typography>
          </div>
        </div>
      </Paper>
    </section>
  )
}
