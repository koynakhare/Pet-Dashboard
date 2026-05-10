import { selectSelectedPets } from '@/features/pets/petsSelectors'
import { downloadPetsQuick } from '@/features/pets/services/downloadService'
import { useAppSelector } from '@/redux/hooks'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import { Button, CircularProgress, Fade } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import toast from 'react-hot-toast'
import styled, { css, keyframes } from 'styled-components'

const FLOATING_DOWNLOAD_Z = 1400

const slideInBounce = keyframes`
  0% {
    transform: translate3d(120px, 0, 0) scale(0.96);
    opacity: 0;
  }
  64% {
    transform: translate3d(-6px, 0, 0) scale(1.01);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
`

const iconPulse = keyframes`
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.72;
  }
`

const FloatingButton = styled(Button)<{ $busy: boolean }>`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: ${FLOATING_DOWNLOAD_Z};

  min-width: 200px;
  height: auto;
  min-height: 72px;
  border-radius: 20px;
  padding: 16px 24px;

  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;

  text-transform: none;

  background: ${(p) =>
    p.$busy
      ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)'
      : p.disabled
        ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
        : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #c026d3 100%)'};
  border: 2px solid rgba(255, 255, 255, 0.2);

  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0 10px 15px -3px rgba(79, 70, 229, 0.4),
    0 20px 25px -5px rgba(124, 58, 237, 0.3),
    0 0 40px rgba(192, 38, 211, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);

  backdrop-filter: blur(12px);
  color: #fff;

  animation: ${slideInBounce} 0.52s cubic-bezier(0.34, 1.56, 0.64, 1) both;

  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    background 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.3s ease,
    opacity 0.24s ease;

  ${(p) =>
    p.theme.mode === 'dark' &&
    css`
      border-color: rgba(255, 255, 255, 0.15);
      box-shadow:
        0 0 0 1px rgba(0, 0, 0, 0.2),
        0 10px 15px -3px rgba(79, 70, 229, 0.5),
        0 22px 28px -5px rgba(124, 58, 237, 0.42),
        0 0 52px rgba(192, 38, 211, 0.32),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    `}

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
    transform: translateY(-4px) scale(1.02);
    border-color: rgba(255, 255, 255, 0.28);
    box-shadow: ${(p) =>
      p.theme.mode === 'dark'
        ? `0 0 0 1px rgba(0, 0, 0, 0.22),
      0 22px 28px -5px rgba(79, 70, 229, 0.52),
      0 34px 44px -10px rgba(124, 58, 237, 0.42),
      0 0 68px rgba(217, 70, 239, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.14)`
        : `0 0 0 1px rgba(0, 0, 0, 0.05),
      0 20px 25px -5px rgba(79, 70, 229, 0.45),
      0 28px 35px -8px rgba(124, 58, 237, 0.38),
      0 0 56px rgba(192, 38, 211, 0.28),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)`};
  }

  &:active:not(:disabled) {
    transform: translateY(-2px) scale(1.01);
  }

  &:disabled {
    transform: none;
    color: #fff !important;
    -webkit-text-fill-color: #fff !important;
  }

  &:disabled:is([data-busy-download='true']) {
    cursor: wait;
    opacity: 0.94;
    border-color: rgba(255, 255, 255, 0.22);
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.06),
      0 14px 22px -4px rgba(79, 70, 229, 0.38),
      0 0 48px rgba(192, 38, 211, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.14);
  }

  @media (max-width: 600px) {
    bottom: 24px;
    right: 24px;
    min-width: 180px;
    min-height: 64px;
    padding: 12px 20px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    left: var(--space-4);
    right: var(--space-4);
    bottom: var(--space-4);
    min-width: 0;
    width: auto;
    min-height: 56px;
    padding: 12px 16px;
  }

  &.MuiButton-root {
    line-height: 1.2;
  }
`

const IconWrapper = styled.div<{ $busy: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.18);

  svg {
    width: 24px;
    height: 24px;
    color: white;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  ${(p) =>
    p.$busy &&
    css`
      animation: ${iconPulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    `}

  /* Center CircularProgress regardless of spinner size utility */
  .MuiCircularProgress-root {
    color: #fff;
  }
`

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  flex: 1;
  min-width: 0;
  text-align: left;
`

const MainText = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.01em;

  @media (max-width: 600px) {
    font-size: 15px;
  }
`

const SubText = styled.span`
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  color: rgba(255, 255, 255, 0.88);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);

  @media (max-width: 600px) {
    font-size: 12px;
  }
`

function formatEstimatedMb(totalMb: number): string {
  return totalMb >= 10 ? totalMb.toFixed(1) : totalMb.toFixed(2)
}

export function FloatingDownloadButton() {
  const selectedPets = useAppSelector(selectSelectedPets)
  const count = selectedPets.length
  const [busy, setBusy] = useState(false)
  const [portalTarget] = useState<HTMLElement | null>(() =>
    typeof document !== 'undefined' ? document.body : null,
  )

  const totalSizeMb = useMemo(
    () => selectedPets.reduce((sum, pet) => sum + pet.estimatedSizeMb, 0),
    [selectedPets],
  )
  const sizeDisplay = formatEstimatedMb(totalSizeMb)

  const handleClick = useCallback(async () => {
    if (count === 0 || busy) {
      return
    }
    setBusy(true)
    try {
      const { saved, failed } = await downloadPetsQuick(selectedPets)
      if (failed > 0) {
        toast.success(`Saved ${saved} — ${failed} could not be fetched`)
      } else {
        toast.success(count === 1 ? 'Download started' : `ZIP with ${saved} images ready`)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Download failed')
    } finally {
      setBusy(false)
    }
  }, [busy, count, selectedPets])

  const itemWord = count === 1 ? 'item' : 'items'
  const ariaLabel = busy
    ? 'Downloading selected images'
    : `Download ${count} selected ${itemWord}, total size about ${sizeDisplay} megabytes`

  const floating = (
    <Fade in={count > 0} timeout={280} unmountOnExit>
      <FloatingButton
        type="button"
        variant="contained"
        disableElevation
        disabled={busy}
        data-busy-download={busy ? 'true' : undefined}
        $busy={busy}
        onClick={() => {
          void handleClick()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            void handleClick()
          }
        }}
        aria-busy={busy}
        aria-live="polite"
        aria-label={ariaLabel}
      >
        <IconWrapper $busy={busy} aria-hidden>
          {busy ? (
            <CircularProgress size={24} thickness={4} aria-hidden />
          ) : (
            <DownloadRoundedIcon aria-hidden />
          )}
        </IconWrapper>
        <TextContent>
          <MainText>{busy ? 'Downloading…' : `Download ${count} ${itemWord}`}</MainText>
          <SubText>{busy ? `${count} ${itemWord}` : `${sizeDisplay} MB`}</SubText>
        </TextContent>
      </FloatingButton>
    </Fade>
  )

  if (!portalTarget) {
    return null
  }

  return createPortal(floating, portalTarget)
}
