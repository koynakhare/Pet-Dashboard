import { shouldIgnoreShortcutsForTarget } from '@/utils/ui/shortcutGuards'
import { useEffect } from 'react'

export type KeyboardShortcutDef = {
  code: string
  ctrlOrCmd?: boolean
  handler: (event: KeyboardEvent) => void
  enabled?: boolean
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcutDef[], enabled: boolean): void {
  useEffect(() => {
    if (!enabled || shortcuts.length === 0) {
      return undefined
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (shouldIgnoreShortcutsForTarget(event.target)) {
        return
      }

      const mod = event.ctrlKey || event.metaKey

      for (const def of shortcuts) {
        if (def.enabled === false) {
          continue
        }
        if (event.code !== def.code) {
          continue
        }
        if (def.ctrlOrCmd === true && !mod) {
          continue
        }
        if (def.ctrlOrCmd === false && mod) {
          continue
        }

        event.preventDefault()
        def.handler(event)
        break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [enabled, shortcuts])
}
