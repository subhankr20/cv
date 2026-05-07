import { useEffect, useRef, useCallback } from 'react'

/**
 * Returns a Set of currently-pressed keys, updated in real time.
 * Components use this via useFrame to poll keys every frame
 * instead of triggering React re-renders on every keypress.
 */
export function useKeyboard() {
  const keys = useRef(new Set<string>())

  const onDown = useCallback((e: KeyboardEvent) => {
    keys.current.add(e.code)
  }, [])

  const onUp = useCallback((e: KeyboardEvent) => {
    keys.current.delete(e.code)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [onDown, onUp])

  return keys
}
