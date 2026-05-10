import { SectionHeader } from '@/components/SectionHeader'
import { OutlineLinkButton, PrimaryLinkButton } from '@/components/buttons'
import { fetchPets } from '@/redux/actions/petsActions'
import { useAppDispatch } from '@/redux/hooks'
import { RoutePath } from '@/utils/enums/routePath'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import PetsRoundedIcon from '@mui/icons-material/PetsRounded'
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded'
import { Avatar, Paper } from '@mui/material'
import map from 'lodash/map'
import { useEffect } from 'react'
import './DashboardPage.css'

const PROJECT_INFO = {
  name: 'Pet Gallery Dashboard',
  repo: 'https://github.com/koynakhare/Pet-Dashboard',
  demo: null as string | null,
  description:
    'A responsive pet gallery built with React 19 and Redux Toolkit: cached catalog fetch, progressive images, infinite scroll, multi-select with ZIP download, favorites, and detail routes.',
}

const PROJECT_STATS = [
  { label: 'Main routes', value: '7+' },
  { label: 'Gallery columns', value: '1→4' },
  { label: 'Redux slices', value: '2' },
  { label: 'Search debounce', value: '~280 ms' },
]

const KEY_FEATURES = [
  {
    id: 'sequential',
    title: 'Progressive reveal',
    description:
      'Gallery images decode off-screen then reveal in order with staggered timing for a deliberate, calm load.',
    icon: '🎬',
  },
  {
    id: 'search',
    title: 'Search & filters',
    description:
      'Debounced query against titles and descriptions — plus favorites-only mode and deterministic sort.',
    icon: '🔍',
  },
  {
    id: 'selection',
    title: 'Multi-selection & ZIP',
    description:
      'Select visible pets with live counts, approximate download size hints, and client-side ZIP packaging.',
    icon: '✓',
  },
  {
    id: 'favorites',
    title: 'Favorites',
    description:
      'Toggle favorites anywhere in the app with state kept in Redux (persists flows match existing slices).',
    icon: '❤️',
  },
  {
    id: 'infinite',
    title: 'Chunked infinite scroll',
    description:
      'IntersectionObserver grows the rendered list so the DOM stays smaller than loading the entire catalog.',
    icon: '∞',
  },
  {
    id: 'quiz',
    title: 'Pet quiz',
    description:
      'Name pets from photos: five rounds, three choices each, score saved in the browser.',
    icon: '🎮',
    isNew: true,
  },
  {
    id: 'responsive',
    title: 'Responsive grid',
    description:
      'CSS grid breakpoints from mobile through desktop with shared tokens and cohesive glass styling.',
    icon: '📱',
  },
]

export default function DashboardPage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(fetchPets())
  }, [dispatch])

  return (
    <div className="about-page anim-fade-in">
      <section className="about-hero glass-surface fade-in-up">
        <div className="about-hero-glow" aria-hidden="true" />
        <Avatar className="about-hero-avatar" sx={{ fontSize: '2.25rem' }} aria-hidden>
          🐾
        </Avatar>
        <h1 className="about-hero-title">{PROJECT_INFO.name}</h1>
        <p className="about-hero-lead">{PROJECT_INFO.description}</p>
        <div className="about-hero-actions about-hero-actions--wrap">
          <OutlineLinkButton
            to={RoutePath.Pets}
            className="about-hero-secondary"
            size="large"
            startIcon={<PetsRoundedIcon />}
          >
            Try gallery
          </OutlineLinkButton>
          <PrimaryLinkButton
            to={RoutePath.Game}
            size="large"
            startIcon={<SportsEsportsRoundedIcon />}
          >
            Play quiz
          </PrimaryLinkButton>
          <OutlineLinkButton
            to={RoutePath.Favorites}
            className="about-hero-secondary"
            size="large"
            startIcon={<FavoriteRoundedIcon />}
          >
            Favourite Pets
          </OutlineLinkButton>
        </div>
      </section>

      <SectionHeader
        kicker="Highlights"
        title="At a glance"
        subtitle="Straightforward codebase facts — not synthetic Lighthouse scores."
      />
      <ul className="about-stats-grid">
        {map(PROJECT_STATS, (stat) => (
          <li key={stat.label}>
            <Paper elevation={0} className="about-stat-card glass-surface">
              <p className="about-stat-value">{stat.value}</p>
              <p className="about-stat-label">{stat.label}</p>
            </Paper>
          </li>
        ))}
      </ul>

      <SectionHeader
        kicker="Gallery"
        title="Key features"
        subtitle="What this app actually does in the shipping UI."
      />
      <ul className="about-features-grid">
        {map(KEY_FEATURES, (feature) => (
          <li key={feature.id}>
            <Paper
              elevation={0}
              className={`about-feature-card glass-surface${'isNew' in feature && feature.isNew ? ' about-feature-card--new' : ''}`}
            >
              {'isNew' in feature && feature.isNew ? (
                <span className="about-feature-new-pill" aria-label="New feature">
                  NEW
                </span>
              ) : null}
              <span className="about-feature-icon" aria-hidden>
                {feature.icon}
              </span>
              <p className="about-feature-title">{feature.title}</p>
              <p className="about-feature-body">{feature.description}</p>
            </Paper>
          </li>
        ))}
      </ul>
    </div>
  )
}
