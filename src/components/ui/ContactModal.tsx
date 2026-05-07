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
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.6, delay: 0.8, pointerEvents: 'auto' })
      gsap.fromTo(contentRef.current,
        { y: 60, scale: 0.92 },
        { y: 0, scale: 1, duration: 0.7, delay: 0.8, ease: 'back.out(1.2)' }
      )
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.35, pointerEvents: 'none' })
    }
  }, [mode])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none bg-[rgba(15,27,45,0.88)] backdrop-blur-xl"
    >
      <div
        ref={contentRef}
        className="bg-[rgba(20,24,36,0.7)] border border-white/20 rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl relative overflow-hidden"
      >
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-phone-booth/15 blur-[60px] pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <div className="text-5xl mb-4">📞</div>
          <h2 className="font-display text-3xl md:text-4xl text-ui-text drop-shadow-md">
            GET IN TOUCH
          </h2>
          <p className="font-body text-xl font-semibold text-ui-text mt-3">{CV_DATA.candidate.name}</p>
          <p className="font-mono text-sun-core text-sm mt-1">Sales · Marketing · Storytelling</p>
        </div>

        {/* Contact buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8 relative z-10">
          <a
            href={`mailto:${CV_DATA.candidate.email}`}
            className="px-6 py-3 bg-white/5 hover:bg-white/15 border border-white/20 rounded-full font-mono text-sm transition-all flex items-center justify-center gap-2 hover:scale-105"
          >
            📧 {CV_DATA.candidate.email}
          </a>
          <a
            href={`tel:${CV_DATA.candidate.phone}`}
            className="px-6 py-3 bg-white/5 hover:bg-white/15 border border-white/20 rounded-full font-mono text-sm transition-all flex items-center justify-center gap-2 hover:scale-105"
          >
            📞 {CV_DATA.candidate.phone}
          </a>
        </div>

        {/* Info grid */}
        <div className="space-y-5 relative z-10">
          <div className="border-t border-white/10 pt-5">
            <h4 className="font-mono text-xs text-ui-text/50 uppercase tracking-widest mb-3 text-center">Languages</h4>
            <div className="flex justify-center gap-4">
              {CV_DATA.candidate.languages.map(l => (
                <span key={l} className="text-sm font-body text-ui-text/90 px-3 py-1 bg-white/5 rounded-full border border-white/10">{l}</span>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-5">
            <h4 className="font-mono text-xs text-ui-text/50 uppercase tracking-widest mb-3 text-center">Certifications</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {CV_DATA.certifications.map((cert, i) => (
                <span key={i} className="px-3 py-1 bg-sun-core/10 rounded-full font-mono text-xs text-sun-core border border-sun-core/20 hover:scale-105 transition-transform cursor-default">
                  {cert.split('|')[0].trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-5">
            <h4 className="font-mono text-xs text-ui-text/50 uppercase tracking-widest mb-3 text-center">Tools & Skills</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {CV_DATA.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-white/5 rounded-md font-mono text-xs text-ui-text/80 border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setMode('explore')}
          className="mt-8 mx-auto flex items-center justify-center gap-2 text-ui-text/50 hover:text-ui-text transition-all font-mono text-sm relative z-10 group hover:scale-105"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to World
        </button>
      </div>
    </div>
  )
}
