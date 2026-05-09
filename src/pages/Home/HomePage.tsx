import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded'
import { Container } from '@mui/material'
import { memo } from 'react'
import {
  CTASection,
  Features,
  Hero,
  PreviewGallery,
  Stats,
  Testimonial,
  type FloatingPetCard,
  type GalleryPreviewItem,
  type HomeFeature,
  type HomeStat,
} from '@/components/home'
import './HomePage.css'

const heroCards: FloatingPetCard[] = [
  {
    id: 'hero-card-1',
    name: 'Nala',
    breed: 'Golden Retriever',
    image:
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=220&q=80',
  },
  {
    id: 'hero-card-2',
    name: 'Milo',
    breed: 'Siberian Husky',
    image:
      'https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=220&q=80',
  },
  {
    id: 'hero-card-3',
    name: 'Luna',
    breed: 'Persian Cat',
    image:
      'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=220&q=80',
  },
]

const stats: HomeStat[] = [
  { id: 'total-pets', label: 'Total Pets', value: '12.8K+' },
  { id: 'downloads', label: 'Downloads', value: '1.4M+' },
  { id: 'categories', label: 'Categories', value: '95+' },
  { id: 'favorites', label: 'Favorites', value: '280K+' },
]

const features: HomeFeature[] = [
  {
    id: 'smart-search',
    title: 'Smart Search',
    description: 'Find exact pet moments with lightning-fast semantic filters.',
    icon: SearchRoundedIcon,
  },
  {
    id: 'fast-downloads',
    title: 'Fast Downloads',
    description: 'One-click exports optimized for design, web, and campaign workflows.',
    icon: DownloadForOfflineRoundedIcon,
  },
  {
    id: 'selection-persistence',
    title: 'Selection Persistence',
    description: 'Keep curated selections intact across sessions without losing context.',
    icon: FavoriteBorderRoundedIcon,
  },
  {
    id: 'infinite-gallery',
    title: 'Infinite Gallery',
    description: 'Scroll effortlessly through an ever-growing premium visual library.',
    icon: ViewQuiltRoundedIcon,
  },
  {
    id: 'responsive-design',
    title: 'Responsive Design',
    description: 'A polished product experience on desktop, tablet, and mobile.',
    icon: DevicesRoundedIcon,
  },
  {
    id: 'ai-curation',
    title: 'AI-Powered Curation',
    description: 'Intelligent ranking helps your teams pick the highest-impact visuals.',
    icon: AutoAwesomeRoundedIcon,
  },
]

const previewItems: GalleryPreviewItem[] = [
  {
    id: 'gallery-1',
    title: 'Adventure Pup',
    image:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'gallery-2',
    title: 'Curious Kitten',
    image:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'gallery-3',
    title: 'City Walk',
    image:
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'gallery-4',
    title: 'Lazy Sunday',
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'gallery-5',
    title: 'Studio Portrait',
    image:
      'https://images.unsplash.com/photo-1574293876203-7d5ccf14d5f6?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'gallery-6',
    title: 'Colorful Mood',
    image:
      'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=900&q=80',
  },
]

const heroSubtitle =
  'A premium dashboard inspired by Apple minimalism, Pinterest curation, and Unsplash-level visual storytelling. Discover, organize, and download gallery-ready pet content in seconds.'

function HomePage() {
  return (
    <div className="home-page-root anim-fade-in">
      <Container maxWidth="xl">
        <Hero
          title="Design-grade pet visuals for"
          highlightedText="modern product teams."
          subtitle={heroSubtitle}
          cards={heroCards}
        />
        <Stats stats={stats} />
        <Features features={features} />
        <PreviewGallery items={previewItems} />
        <Testimonial />
        <CTASection />
      </Container>
    </div>
  )
}

export default memo(HomePage)
