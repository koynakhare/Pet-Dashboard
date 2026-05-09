import './GradientBackground.css'

export function GradientBackground() {
  return (
    <div className="home-gradient-bg" aria-hidden="true">
      <span className="home-gradient-blob home-gradient-blob-primary" />
      <span className="home-gradient-blob home-gradient-blob-secondary" />
      <span className="home-gradient-blob home-gradient-blob-accent" />
    </div>
  )
}
