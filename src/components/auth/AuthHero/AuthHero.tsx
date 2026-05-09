import map from 'lodash/map'
import { FLOATING_MINI_CARDS } from '../promoContent'
import { FeatureHighlights } from '../FeatureHighlights'
import { FloatingShapes } from '../FloatingShapes'
import './AuthHero.css'

export function AuthHero() {
  return (
    <div className="auth-hero">
      <FloatingShapes />
      <div className="auth-hero-inner fade-in-up">
        <p className="auth-hero-kicker">Pet Gallery Dashboard</p>
        <h1 className="auth-hero-title">
          Sign in to your
          <span className="auth-hero-title-gradient"> creative workspace</span>
        </h1>
        <p className="auth-hero-subtitle">
          A refined authentication surface inspired by Linear, Stripe, and Apple — minimal chrome,
          maximum clarity. Manage sessions, protect routes, and ship gallery-grade experiences.
        </p>
        <div className="auth-hero-float-cards">
          {map(FLOATING_MINI_CARDS, (card) => (
            <div key={card.id} className={`auth-float-card glass-surface ${card.accentClass}`}>
              <p className="auth-float-card-label">{card.label}</p>
              <p className="auth-float-card-meta">{card.meta}</p>
            </div>
          ))}
        </div>
        <FeatureHighlights />
      </div>
    </div>
  )
}
