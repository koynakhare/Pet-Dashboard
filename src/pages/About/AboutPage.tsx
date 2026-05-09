import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import { Avatar, Chip, Paper } from '@mui/material'
import map from 'lodash/map'
import type { ReactNode } from 'react'
import { OutlineButton, PrimaryButton } from '@/components/Buttons'
import { SectionHeader } from '@/components/SectionHeader'
import { RoutePath } from '@/utils/enums/routePath'
import { Link as RouterLink } from 'react-router-dom'
import './AboutPage.css'

const TECH_STACK = [
  { id: 'react', name: 'React 19', detail: 'Concurrent UI & hooks' },
  { id: 'ts', name: 'TypeScript', detail: 'Strict typing end-to-end' },
  { id: 'mui', name: 'MUI', detail: 'Accessible components' },
  { id: 'styled', name: 'Styled Components', detail: 'Scoped component styling' },
  { id: 'redux', name: 'Redux Toolkit', detail: 'Normalized async state' },
  { id: 'vite', name: 'Vite', detail: 'Fast DX & builds' },
  { id: 'rr', name: 'React Router', detail: 'Lazy routes & code splitting' },
]

const SKILLS = [
  'Product-ready UI',
  'Performance-focused lists',
  'Design systems',
  'REST integration',
  'State architecture',
  'Accessibility',
]

const SOCIAL_CARDS = [
  {
    id: 'gh',
    title: 'GitHub',
    subtitle: 'Open-source & experiments',
    icon: <GitHubIcon />,
    href: 'https://github.com/koynakhare',
    cta: 'View profile',
  },
  {
    id: 'li',
    title: 'LinkedIn',
    subtitle: 'Professional updates',
    icon: <LinkedInIcon />,
    href: 'https://www.linkedin.com/in/koyna-khare-81178b214/',
    cta: 'Connect',
  },
  {
    id: 'mail',
    title: 'Email',
    subtitle: 'Collaborations welcome',
    icon: <MailOutlineRoundedIcon />,
    href: 'mailto:koynakhare29@gmail.com',
    cta: 'Say hello',
  },
]

export default function AboutPage() {
  return (
    <div className="about-page anim-fade-in">
      <section className="about-hero glass-surface fade-in-up">
        <div className="about-hero-glow" aria-hidden="true" />
        <Avatar className="about-hero-avatar">PG</Avatar>
        <h1 className="about-hero-title">Crafting gallery-grade pet experiences</h1>
        <p className="about-hero-lead">
          Full-stack oriented frontend engineer focused on polished dashboards, resilient data
          layers, and interfaces that feel as premium as the products they ship.
        </p>
        <div className="about-hero-actions">
          <PrimaryButton component={RouterLink} to={RoutePath.Pets} endIcon={<RocketLaunchRoundedIcon />}>
            Open gallery
          </PrimaryButton>
          <OutlineButton component={RouterLink} to={RoutePath.Home} className="about-hero-secondary">
            Back to home
          </OutlineButton>
        </div>
      </section>

      <SectionHeader
        kicker="Overview"
        title="Pet Gallery Dashboard"
        subtitle="A portfolio-grade application showcasing Redux Toolkit, single-fetch caching, infinite scroll, and a cohesive visual language inspired by Apple, Pinterest, and modern SaaS analytics."
      />

      <Paper elevation={0} className="about-panel glass-surface">
        <div className="about-panel-icon-wrap">
          <CodeRoundedIcon className="about-panel-icon" />
        </div>
        <p className="about-panel-body">
          This project demonstrates enterprise patterns: declarative routing with lazy-loaded pages,
          optimistic-friendly selection state, debounced search against cached catalogs, and dashboard
          analytics built from deterministic demo data — all without sacrificing aesthetic depth.
        </p>
      </Paper>

      <SectionHeader kicker="Stack" title="Tech stack" subtitle="Tools chosen for scale and clarity." />

      <ul className="about-tech-grid">
        {map(TECH_STACK, (item) => (
          <li key={item.id}>
            <Paper elevation={0} className="about-tech-card glass-surface">
              <TypographyLikeTitle>{item.name}</TypographyLikeTitle>
              <p className="about-tech-detail">{item.detail}</p>
            </Paper>
          </li>
        ))}
      </ul>

      <SectionHeader kicker="Skills" title="What I bring" />

      <div className="about-skills">
        {map(SKILLS, (skill) => (
          <Chip key={skill} label={skill} className="about-skill-chip" variant="outlined" />
        ))}
      </div>

      <SectionHeader
        kicker="Contact"
        title="Let’s build something memorable"
        subtitle="Reach out for collaborations, interviews, or product demos."
        align="center"
      />

      <div className="about-social-grid">
        {map(SOCIAL_CARDS, (card) => (
          <a key={card.id} href={card.href} className="about-social-card glass-surface">
            <span className="about-social-icon">{card.icon}</span>
            <span className="about-social-title">{card.title}</span>
            <span className="about-social-sub">{card.subtitle}</span>
            <span className="about-social-cta">
              {card.cta}
              <LanguageRoundedIcon fontSize="small" />
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

function TypographyLikeTitle({ children }: { children: ReactNode }) {
  return <p className="about-tech-name">{children}</p>
}
