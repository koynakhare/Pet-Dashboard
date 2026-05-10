export function shouldIgnoreShortcutsForTarget(element: EventTarget | null): boolean {
  if (!(element instanceof Element)) {
    return false
  }

  const el = element
  const tagName = el.tagName
  const role = el.getAttribute('role')

  if (el.closest('[aria-modal="true"]')) {
    return true
  }

  if (
    tagName === 'INPUT' ||
    tagName === 'TEXTAREA' ||
    tagName === 'SELECT' ||
    tagName === 'BUTTON' ||
    role === 'listbox'
  ) {
    return true
  }

  if (el.closest('[role="dialog"]')) {
    return true
  }

  if ('isContentEditable' in el && (el as HTMLElement).isContentEditable) {
    return true
  }

  return false
}
