import { useWorld } from '@/store/useWorld'
import { LANDMARKS } from '@/data/cv'
import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

export default function InfoPanel() {
  const activePanel = useWorld(state => state.activePanel)
  const mode = useWorld(state => state.mode)
  const [panelData, setPanelData] = useState<any>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!panelRef.current || !backdropRef.current) return

    if (activePanel && LANDMARKS[activePanel as keyof typeof LANDMARKS]) {
      setPanelData(LANDMARKS[activePanel as keyof typeof LANDMARKS])
      
      // Slide in panel
      gsap.to(panelRef.current, { x: '0%', opacity: 1, duration: 0.5, ease: 'back.out(1.1)' })
      
      // Blur background (using CSS variable interpolation via gsap to avoid inline style fights)
      gsap.to(document.documentElement, {
        '--backdrop-blur': '8px',
        duration: 0.5,
        ease: 'power2.out'
      })
    } else {
      // Slide out panel
      gsap.to(panelRef.current, { x: '100%', opacity: 0, duration: 0.4, ease: 'power2.in' })
      
      gsap.to(document.documentElement, {
        '--backdrop-blur': '0px',
        duration: 0.4,
        ease: 'power2.in'
      })
    }
  }, [activePanel])

  // Hide entirely if we are in contact mode (ContactModal takes over)
  if (mode === 'contact') return null

  return (
    <>
      {/* The backdrop blur overlay */}
      <div 
        ref={backdropRef}
        className="fixed inset-0 pointer-events-none z-10" 
        style={{ backdropFilter: 'blur(var(--backdrop-blur, 0px))' }} 
      />
      
      {/* The sliding panel */}
      <div 
        ref={panelRef}
        className="fixed right-0 top-0 h-full w-[85%] md:w-[30%] p-6 md:p-12 transform translate-x-full opacity-0 pointer-events-none flex flex-col justify-center z-20"
      >
        <div className="bg-[rgba(20,24,36,0.65)] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl pointer-events-auto">
          {panelData && (
            <>
              <div className="text-4xl mb-4">{panelData.icon}</div>
              <h2 className="font-display text-3xl md:text-4xl text-ui-text mb-2 drop-shadow-md">{panelData.title}</h2>
              <h3 className="font-body font-medium text-lg text-sun-core mb-4">{panelData.subtitle}</h3>
              <p className="font-body text-ui-text/80 leading-relaxed mb-6">
                {panelData.body}
              </p>
              
              {panelData.stats && panelData.stats.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {panelData.stats.map((stat: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-white/10 rounded-full font-mono text-xs border border-white/20 text-accent-glow">
                      {stat}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border border-ui-text/40 flex items-center justify-center font-mono text-[10px] text-ui-text/40">i</span>
                <span className="text-xs font-mono text-ui-text/40 tracking-wider uppercase">Walk away to close</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
