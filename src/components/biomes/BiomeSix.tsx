import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useScrollTween } from "../scroll/ScrollContext";
import TiltCard from "../ui/TiltCard";

export default function BiomeSix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const tween = useScrollTween();

  useEffect(() => {
    if (!tween || !containerRef.current || !counterRef.current) return;

    const ctx = gsap.context(() => {
      // Counter animation
      gsap.to(counterRef.current, {
        innerHTML: 2300000,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: "power2.out",
        onUpdate: function() {
          const val = Math.round(Number(this.targets()[0].innerHTML));
          // Format with commas
          this.targets()[0].innerHTML = val.toLocaleString();
        },
        scrollTrigger: {
          trigger: containerRef.current,
          containerAnimation: tween,
          start: "left center",
          toggleActions: "play none none reverse"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [tween]);

  return (
    <section ref={containerRef} className="relative w-[200vw] h-full flex items-center justify-center shrink-0 z-10 pointer-events-auto overflow-hidden">
      
      {/* Massive Tower Placeholder */}
      <div className="absolute bottom-0 w-[40vw] h-[120vh] bg-charcoal border-x-8 border-t-8 border-viral-red flex flex-col justify-end p-8 gap-4 shadow-[0_0_100px_rgba(230,57,70,0.2)]">
        {/* Placeholder screens inside the tower */}
        {Array.from({length: 6}).map((_, i) => (
          <div key={i} className="w-full h-32 bg-midnight-ink rounded-lg border border-cream-paper/10 flex items-center justify-center opacity-50">
             <span className="text-4xl animate-pulse delay-[{i*100}ms]">📱</span>
          </div>
        ))}
      </div>

      {/* Counter UI overlay */}
      <TiltCard className="relative z-20 text-center bg-midnight-ink/80 p-12 rounded-3xl backdrop-blur-xl border border-viral-red/50 shadow-2xl">
        <h2 className="font-display text-2xl text-cream-paper mb-4 uppercase tracking-widest">Viral Valley</h2>
        <div className="font-mono text-7xl md:text-9xl text-viral-red font-bold tracking-tighter drop-shadow-lg mb-6">
          <span ref={counterRef}>0</span>
        </div>
        <p className="font-sans text-xl max-w-lg mx-auto text-cream-paper/80">
          Social Media Content Manager • Hit 2.3M cumulative views across two viral videos. Collabs with major meme creators.
        </p>
      </TiltCard>

    </section>
  );
}
