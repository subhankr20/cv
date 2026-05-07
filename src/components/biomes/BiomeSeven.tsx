import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useScrollTween } from "../scroll/ScrollContext";

export default function BiomeSeven() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
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

    return () => ctx.revert();
  }, [tween]);

  return (
    <section ref={containerRef} className="relative w-[150vw] h-full flex items-center justify-center shrink-0 z-10 pointer-events-auto overflow-hidden px-12">
      
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
          <a href="tel:7602516810" className="hover:text-sunset-coral transition-colors">📞 76025-16810</a>
          <a href="mailto:patrasubhankar997@gmail.com" className="hover:text-sunset-coral transition-colors">📧 Email Me</a>
        </div>

        <div className="flex gap-4 mb-8">
          <button className="px-8 py-4 bg-sunset-coral text-cream-paper font-bold uppercase tracking-wider rounded-full hover:scale-105 transition-transform shadow-lg">
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
              <div key={tool} className="px-4 py-2 bg-charcoal/5 rounded-lg font-mono text-sm hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
