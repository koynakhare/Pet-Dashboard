import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Root = styled.div<{ $revealed: boolean }>`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: translateX(-100%);
    animation: optimized-image-shimmer 1s infinite;
    opacity: ${(p) => (p.$revealed ? 0 : 1)};
    pointer-events: none;
    transition: opacity 280ms ease;
  }

  @keyframes optimized-image-shimmer {
    to {
      transform: translateX(100%);
    }
  }
`

const StyledImage = styled.img<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  z-index: 2;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transform: ${(p) => (p.$visible ? 'scale(1)' : 'scale(0.95)')};
  transition: opacity 0.4s ease, transform 0.4s ease;
`

const Fallback = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3);
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #991b1b;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
`

type OptimizedImageProps = {
  src: string
  alt: string
  className?: string
  index?: number
  staggerDelay?: number
  onLoad?: () => void
}

export function OptimizedImage({
  src,
  alt,
  className,
  index = 0,
  staggerDelay = 150,
  onLoad,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!loaded) {
      return
    }
    const delayMs = index * staggerDelay
    const timer = window.setTimeout(() => {
      setVisible(true)
    }, delayMs)
    return () => window.clearTimeout(timer)
  }, [loaded, index, staggerDelay])

  if (error) {
    return (
      <Fallback className={className} role="img" aria-label={alt || 'Image unavailable'}>
        Image unavailable
      </Fallback>
    )
  }

  return (
    <Root $revealed={visible} className={className}>
      <StyledImage
        src={src}
        alt={alt}
        loading={index < 6 ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={index < 4 ? 'high' : 'auto'}
        $visible={visible}
        onLoad={() => {
          setLoaded(true)
          onLoad?.()
        }}
        onError={() => setError(true)}
      />
    </Root>
  )
}
