import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useScrollTween } from "../scroll/ScrollContext";

export default function BiomeSeven() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const tween = useScrollTween();

  useEffect(() => {
    if (!tween || !containerRef.current || !portalRef.current || !modalRef.current) return;

    const ctx = gsap.context(() => {
      // Zoom into the portal
      gsap.to(portalRef.current, {
        scale: 20,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          containerAnimation: tween,
          start: "center center",
          end: "right center",
          scrub: true,
          onUpdate: (self) => {
            // Trigger particle burst near the end
            if (self.progress > 0.8 && particlesRef.current && particlesRef.current.childElementCount === 0) {
              createParticles();
            }
          }
        }
      });

      // Slide up the contact modal
      gsap.fromTo(modalRef.current,
        { y: "100%", opacity: 0 },
        {
          y: "0%", opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            containerAnimation: tween,
            start: "center center",
            end: "right center",
            scrub: true,
          }
        }
      );
    }, containerRef);

    const createParticles = () => {
      if (!particlesRef.current) return;
      for (let i = 0; i < 50; i++) {
        const p = document.createElement("div");
        p.className = "absolute w-2 h-2 bg-afternoon-gold rounded-full";
        particlesRef.current.appendChild(p);
        
        gsap.fromTo(p, 
          { x: 0, y: 0, scale: 1 },
          { 
            x: (Math.random() - 0.5) * 1000, 
            y: (Math.random() - 0.5) * 1000, 
            scale: 0, 
            duration: 1 + Math.random(), 
            ease: "power2.out",
            onComplete: () => p.remove()
          }
        );
      }
    };

    return () => ctx.revert();
  }, [tween]);

  return (
    <section ref={containerRef} className="relative w-[150vw] h-full flex items-center justify-center shrink-0 z-10 pointer-events-auto overflow-hidden px-12">
      
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center" />

      {/* Giant HIRE ME Portal Sprite */}
      <div ref={portalRef} className="absolute inset-0 m-auto w-[600px] h-[600px] flex items-center justify-center">
        <img 
          src={`${import.meta.env.BASE_URL}assets/portal.png`} 
          alt="Portal" 
          className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(255,215,0,0.5)] animate-pulse" 
        />
      </div>

      {/* The Final Modal */}
      <div ref={modalRef} className="relative z-20 w-full max-w-2xl bg-cream-paper rounded-3xl p-12 shadow-2xl text-charcoal flex flex-col items-center border-t-[16px] border-sunset-coral">
        <h2 className="font-display text-5xl mb-6">Let's Talk</h2>
        
        <div className="flex gap-8 mb-8 text-xl font-mono">
          <a href="tel:7602516810" className="hover:text-sunset-coral transition-colors underline decoration-sunset-coral/30">📞 76025-16810</a>
          <a href="mailto:patrasubhankar997@gmail.com" className="hover:text-sunset-coral transition-colors underline decoration-sunset-coral/30">📧 Email Me</a>
        </div>

        <div className="flex gap-4 mb-8">
          <button className="px-10 py-5 bg-sunset-coral text-cream-paper font-bold uppercase tracking-wider rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_rgba(255,138,91,0.4)]">
            Download CV
          </button>
        </div>

        <p className="font-sans text-sm text-charcoal/60 uppercase tracking-widest mb-12">
          Speaks: English • Hindi • Bengali
        </p>

        {/* Tools Rack */}
        <div className="w-full border-t border-charcoal/10 pt-8">
          <h3 className="font-sans font-bold text-center mb-6 uppercase text-charcoal/40 tracking-widest">Tools & Skills</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Photoshop", "Illustrator", "Premiere Pro", "Meta Ads", "Excel", "Word"].map((tool) => (
              <div key={tool} className="px-5 py-3 bg-charcoal/5 rounded-xl font-mono text-sm hover:bg-sunset-coral hover:text-cream-paper hover:-translate-y-2 transition-all cursor-default shadow-sm hover:shadow-md">
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
