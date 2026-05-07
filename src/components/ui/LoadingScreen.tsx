import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [faded, setFaded] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Simulate smooth loading since we use no external GLBs
    let frame: number
    let start = performance.now()
    const duration = 2000

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(Math.round(eased * 100))

      if (p < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setFaded(true)
          setTimeout(() => setHidden(true), 800)
        }, 300)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  if (hidden) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        opacity: faded ? 0 : 1,
        transition: 'opacity 0.8s ease-out',
        pointerEvents: faded ? 'none' : 'auto',
        background: 'linear-gradient(to bottom, #2D2A4A 0%, #5B3A6B 40%, #FF8A5B 75%, #FFD56B 100%)',
      }}
    >
      {/* Sun rising */}
      <div
        className="w-28 h-28 rounded-full mb-10 shadow-[0_0_80px_rgba(255,213,107,0.7)]"
        style={{
          background: 'radial-gradient(circle, #FFD56B 30%, #FF8A5B 100%)',
          transform: `translateY(${(1 - progress / 100) * 40}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <h1 className="font-display text-5xl text-ui-text tracking-widest mb-3 drop-shadow-lg">
        SUBHANKAR WORLD
      </h1>
      <p className="font-mono text-sm text-sun-core/80 mb-10 tracking-wider">
        loading the island...
      </p>
      <div className="w-72 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full rounded-full transition-all duration-200"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #FF8A5B, #FFD56B)',
          }}
        />
      </div>
      <p className="font-mono text-xs text-ui-text/40 mt-3">{progress}%</p>
    </div>
  )
}
