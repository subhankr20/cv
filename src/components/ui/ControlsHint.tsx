import { useState, useEffect } from 'react'

export default function ControlsHint() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const hide = () => setVisible(false)
    window.addEventListener('click', hide, { once: true })
    window.addEventListener('touchstart', hide, { once: true })
    return () => {
      window.removeEventListener('click', hide)
      window.removeEventListener('touchstart', hide)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="px-6 py-3 rounded-full bg-[rgba(20,24,36,0.7)] backdrop-blur-md border border-white/10">
        <p className="text-ui-text text-sm font-body tracking-wider text-center">
          Click anywhere to walk · Drag sky to look around
        </p>
      </div>
    </div>
  )
}
