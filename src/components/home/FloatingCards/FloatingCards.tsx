import { Avatar, Paper, Typography } from '@mui/material'
import map from 'lodash/map'
import './FloatingCards.css'

export type FloatingPetCard = {
  id: string
  name: string
  breed: string
  image: string
}

type FloatingCardsProps = {
  cards: FloatingPetCard[]
}

export function FloatingCards({ cards }: FloatingCardsProps) {
  return (
    <div className="home-floating-cards">
      {map(cards, (card, index) => (
        <Paper
          key={card.id}
          elevation={0}
          className={`home-floating-card glass-surface home-floating-card-${index + 1}`}
        >
          <Avatar src={card.image} alt={card.name} className="home-floating-card-avatar" />
          <div>
            <Typography className="home-floating-card-title">{card.name}</Typography>
            <Typography className="home-floating-card-subtitle">{card.breed}</Typography>
          </div>
        </Paper>
      ))}
    </div>
  )
}
