export type OptimizedImageSize = 'thumbnail' | 'card' | 'hero'

const DIMENSIONS = {
  thumbnail: { width: 400, height: 267 },
  card: { width: 800, height: 533 },
  hero: { width: 1600, height: 1067 },
} as const

export function optimizeImageUrl(url: string, size: OptimizedImageSize = 'card'): string {
  if (!url || url.startsWith('data:')) {
    return url
  }

  const { width, height } = DIMENSIONS[size]

  if (url.includes('images.pexels.com')) {
    const base = url.split('?')[0]
    return `${base}?auto=compress&cs=tinysrgb&fit=crop&h=${height}&w=${width}`
  }

  if (url.includes('unsplash.com')) {
    const base = url.split('?')[0]
    return `${base}?w=${width}&h=${height}&q=80&fit=crop&auto=format`
  }

  return url
}
