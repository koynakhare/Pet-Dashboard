import { SectionHeader } from '@/components/SectionHeader'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { Chip, Link, Paper, Typography } from '@mui/material'
import map from 'lodash/map'
import type { ReactNode } from 'react'
import '../Dashboard/DashboardPage.css'

const CREDITS = [
  {
    id: 'pexels',
    name: 'Pexels images',
    description: 'Bundled/offline thumbnails and many live URLs originate from images.pexels.com.',
    href: 'https://www.pexels.com',
  },
  {
    id: 'api',
    name: 'Demo API',
    description:
      'Hackathon `/pets` JSON from `API_BASE_URL` in `src/config.ts`; offline bundle when unreachable.',
    href: 'https://eulerity-hackathon.appspot.com/',
  },
  {
    id: 'mui',
    name: 'MUI',
    description: 'Accessibility-first layout primitives and theming via Emotion.',
    href: 'https://mui.com',
  },
  {
    id: 'redux',
    name: 'Redux Toolkit',
    description: 'Async thunks plus memoized selectors for filters, sort, and selection.',
    href: 'https://redux-toolkit.js.org',
  },
]

const TECH_STACK = [
  { id: 'react', name: 'React 19', detail: 'Concurrent UI & hooks' },
  { id: 'ts', name: 'TypeScript', detail: 'Strict typing end-to-end' },
  { id: 'mui', name: 'MUI', detail: 'Accessible components' },
  { id: 'emotion', name: 'Emotion', detail: 'MUI default CSS-in-JS runtime' },
  {
    id: 'sc',
    name: 'styled-components',
    detail: 'Gallery surfaces with ThemeProvider integration',
  },
  { id: 'css', name: 'Co-located CSS', detail: 'Global design tokens & module styles' },
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

export default function AboutMePage() {
  return (
    <div className="about-page anim-fade-in">
      <SectionHeader
        kicker="Overview"
        title="About this project"
        subtitle="What it is and what I spent time on."
      />
      <Paper elevation={0} className="about-panel about-panel-wide glass-surface">
        <div className="about-panel-icon-wrap">
          <CodeRoundedIcon className="about-panel-icon" />
        </div>
        <div className="about-panel-copy">
          <Typography component="p" variant="body1" sx={{ mb: 2 }}>
            Pet Gallery Dashboard is a single-page app for browsing a pet catalog: async loads,
            clear empty and error states, and keyboard shortcuts. Data comes from a REST API with a
            local fallback when the network fails.
          </Typography>
          <Typography component="p" variant="body1" sx={{ mb: 2 }}>
            State lives in Redux Toolkit (thunks, memoized selectors, stable sorts). Routes are
            split with React Router lazy loading so Home can prefetch before the gallery chunk runs.
          </Typography>
          <Typography component="p" variant="subtitle2" sx={{ mb: 1.5 }}>
            Highlights
          </Typography>
          <BoxList>
            Fetch from the API; if it fails, the app falls back to bundled sample rows (Pexels-style
            thumbnails).
          </BoxList>
          <BoxList>
            Home prefetches catalog data so opening `/gallery` is less likely to wait on an extra
            round trip.
          </BoxList>
          <BoxList>
            Images decode and fade in without loading a separate placeholder blob for each URL.
          </BoxList>
          <BoxList>
            ZIP downloads run in the browser (JSZip and file-saver) without freezing the UI when you
            are not exporting.
          </BoxList>
        </div>
      </Paper>

      <SectionHeader
        kicker="Stack"
        title="Tech stack"
        subtitle="Libraries and tools in this repo."
      />

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
        kicker="Credits"
        title="Attribution"
        subtitle="APIs, assets, and frameworks this project depends on."
      />
      <div className="about-credits">
        {map(CREDITS, (credit) => (
          <Paper
            key={credit.id}
            component="a"
            elevation={0}
            href={credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="about-credit-card glass-surface"
          >
            <span className="about-credit-body">
              <span className="about-credit-name">{credit.name}</span>
              <span className="about-credit-desc">{credit.description}</span>
            </span>
            <OpenInNewRoundedIcon className="about-credit-launch" fontSize="small" aria-hidden />
          </Paper>
        ))}
      </div>

      <SectionHeader
        kicker="Contact"
        title="Get in touch"
        subtitle="Collaborations, interviews, or a quick demo of this project."
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

      <Typography
        variant="body2"
        color="text.secondary"
        component="p"
        sx={{ textAlign: 'center', mt: 5 }}
      >
        Credits: images from{' '}
        <Link href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">
          Pexels
        </Link>
        {' & '}
        pet data from{' '}
        <Link href="https://eulerity.com" target="_blank" rel="noopener noreferrer">
          Eulerity
        </Link>
        .
      </Typography>
    </div>
  )
}

function BoxList({ children }: { children: ReactNode }) {
  return (
    <Typography
      component="p"
      variant="body2"
      color="text.secondary"
      sx={{ mb: 1 }}
      className="about-panel-bullet"
    >
      <strong className="about-panel-bullet-strong">✦ </strong>
      {children}
    </Typography>
  )
}

function TypographyLikeTitle({ children }: { children: ReactNode }) {
  return <p className="about-tech-name">{children}</p>
}
