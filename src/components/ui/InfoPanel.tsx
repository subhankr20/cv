import { useWorld } from '@/store/useWorld'
import { LANDMARKS } from '@/data/cv'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function InfoPanel() {
  const activePanel = useWorld(state => state.activePanel)
  const mode = useWorld(state => state.mode)
  const panelRef = useRef<HTMLDivElement>(null)
  const [visibleData, setVisibleData] = useState<any>(null)
  const [isShowing, setIsShowing] = useState(false)
  const tlRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!panelRef.current) return

    // Kill any running animation
    if (tlRef.current) tlRef.current.kill()

    if (activePanel && LANDMARKS[activePanel]) {
      setVisibleData(LANDMARKS[activePanel])
      setIsShowing(true)

      tlRef.current = gsap.to(panelRef.current, {
        x: '0%',
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      })
    } else if (isShowing) {
      tlRef.current = gsap.to(panelRef.current, {
        x: '110%',
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => setIsShowing(false),
      })
    }
  }, [activePanel])

  if (mode === 'contact') return null

  return (
    <div
      ref={panelRef}
      className="fixed right-0 top-0 h-full w-[88%] md:w-[32%] p-5 md:p-10 flex flex-col justify-center z-20 pointer-events-none"
      style={{ transform: 'translateX(110%)', opacity: 0 }}
    >
      <div className="bg-[rgba(20,24,36,0.7)] backdrop-blur-xl border border-white/15 rounded-2xl p-7 shadow-2xl pointer-events-auto">
        {visibleData && (
          <>
            <div className="text-4xl mb-3">{visibleData.icon}</div>
            <h2 className="font-display text-2xl md:text-3xl text-ui-text mb-1 leading-tight">{visibleData.title}</h2>
            <h3 className="font-body font-medium text-sm text-sun-core mb-4">{visibleData.subtitle}</h3>
            <p className="font-body text-ui-text/80 text-sm leading-relaxed mb-5">{visibleData.body}</p>

            {visibleData.stats.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {visibleData.stats.map((stat: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-white/10 rounded-full font-mono text-xs border border-white/15 text-accent-glow">
                    {stat}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-2">
              <span className="text-xs font-mono text-ui-text/30 tracking-wider uppercase">Walk away to close</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
