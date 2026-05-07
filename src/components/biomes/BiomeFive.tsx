import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useScrollTween } from "../scroll/ScrollContext";
import TiltCard from "../ui/TiltCard";

export default function BiomeFive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const tween = useScrollTween();

  useEffect(() => {
    if (!tween || !containerRef.current || !playheadRef.current) return;

    const ctx = gsap.context(() => {
      // Move the playhead across the timeline as the container scrolls
      gsap.to(playheadRef.current, {
        x: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          containerAnimation: tween,
          start: "left right",
          end: "right left",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [tween]);

  return (
    <section ref={containerRef} className="relative w-[150vw] h-full flex flex-col items-center justify-center shrink-0 z-10 pointer-events-auto px-20">
      
      <TiltCard ref={cardRef} className="relative z-10 w-full max-w-xl bg-midnight-ink/80 backdrop-blur-md border border-afternoon-gold/30 p-12 rounded-2xl shadow-2xl overflow-hidden">
        {/* Film grain effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <h2 className="font-display text-4xl text-cream-paper mb-4 relative z-10">Hanwong International</h2>
        <p className="font-mono text-cream-paper/70">Video Creator & Editor • 2024–2025 (Freelance)</p>
        <p className="font-sans text-sm text-afternoon-gold/60 uppercase tracking-[0.2em] relative z-10">
          Professional Editor & Content Creator
        </p>
      </TiltCard>

      {/* Premiere Pro style timeline placeholder */}
      <div className="w-[80vw] h-64 bg-[#1e1e1e] border border-[#333] rounded-lg mt-32 relative overflow-hidden flex flex-col pt-8">
        
        {/* Playhead */}
        <div ref={playheadRef} className="absolute top-0 bottom-0 w-px bg-viral-red z-20 origin-top">
          <div className="w-3 h-4 bg-viral-red -ml-[5px] rounded-b-sm" />
        </div>

        {/* Tracks */}
        <div className="flex-1 border-b border-[#333] flex items-center px-4 gap-2 opacity-80">
          <div className="w-1/4 h-1/2 bg-[#2d5a8f] rounded-sm" />
          <div className="w-1/2 h-1/2 bg-[#2d5a8f] rounded-sm" />
        </div>
        <div className="flex-1 border-b border-[#333] flex items-center px-4 gap-2 opacity-80">
          <div className="w-1/3 h-1/2 bg-[#8f2d5a] rounded-sm ml-12" />
        </div>
        <div className="flex-1 flex items-center px-4 gap-2 opacity-80">
          <div className="w-full h-1/2 bg-[#2d8f5a] rounded-sm" />
        </div>

      </div>

    </section>
  );
}
