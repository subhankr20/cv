import { useWorld } from '@/store/useWorld'
import { CV_DATA } from '@/data/cv'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ContactModal() {
  const mode = useWorld(state => state.mode)
  const setMode = useWorld(state => state.setMode)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return

    if (mode === 'contact') {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.5, delay: 0.8, pointerEvents: 'auto' })
      gsap.fromTo(contentRef.current, 
        { y: 50, scale: 0.95 },
        { y: 0, scale: 1, duration: 0.6, delay: 0.8, ease: 'back.out(1.2)' }
      )
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none' })
    }
  }, [mode])

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none bg-[rgba(15,27,45,0.85)] backdrop-blur-xl"
    >
      <div 
        ref={contentRef}
        className="bg-[rgba(20,24,36,0.65)] border border-white/20 rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-phone-booth/20 blur-[50px] pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <h2 className="font-display text-4xl text-ui-text flex items-center justify-center gap-3 drop-shadow-md">
            <span className="text-phone-booth">📞</span> GET IN TOUCH
          </h2>
          <p className="font-body text-xl font-medium text-ui-text mt-4">{CV_DATA.candidate.name}</p>
          <p className="font-mono text-sun-core text-sm mt-1">Sales · Marketing · Storytelling</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-10 relative z-10">
          <a href={`mailto:${CV_DATA.candidate.email}`} className="px-6 py-3 bg-white/5 hover:bg-white/15 border border-white/20 rounded-full font-mono text-sm transition-colors flex items-center justify-center gap-2">
            📧 Email
          </a>
          <a href={`tel:${CV_DATA.candidate.phone}`} className="px-6 py-3 bg-white/5 hover:bg-white/15 border border-white/20 rounded-full font-mono text-sm transition-colors flex items-center justify-center gap-2">
            📞 Call
          </a>
          {/* CV download disabled for now since file isn't created, using placeholder */}
          <button className="px-6 py-3 bg-phone-booth hover:bg-phone-booth/90 text-white rounded-full font-mono text-sm transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(230,57,70,0.4)]">
            📄 CV.PDF
          </button>
        </div>

        <div className="space-y-6 relative z-10">
          <div className="border-t border-white/10 pt-6">
            <h4 className="font-mono text-xs text-ui-text/50 uppercase tracking-widest mb-3 text-center">Speaks</h4>
            <div className="flex justify-center gap-3">
              {CV_DATA.candidate.languages.map(l => (
                <span key={l} className="text-sm font-body text-ui-text/90">{l}</span>
              ))}
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6">
            <h4 className="font-mono text-xs text-ui-text/50 uppercase tracking-widest mb-3 text-center">Tools</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {CV_DATA.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-white/5 rounded-md font-mono text-xs text-ui-text/80 border border-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={() => setMode('explore')}
          className="mt-10 mx-auto flex items-center justify-center gap-2 text-ui-text/50 hover:text-ui-text transition-colors font-mono text-sm relative z-10 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to World
        </button>
      </div>
    </div>
  )
}
