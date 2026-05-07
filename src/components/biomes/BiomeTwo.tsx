import { useRef, useEffect } from "react";
import gsap from "gsap";

import { useScrollTween } from "../scroll/ScrollContext";

export default function BiomeTwo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const smitCardRef = useRef<HTMLDivElement>(null);
  const dpsCardRef = useRef<HTMLDivElement>(null);
  const tween = useScrollTween();

  useEffect(() => {
    if (!tween || !containerRef.current || !smitCardRef.current || !dpsCardRef.current) return;

    const ctx = gsap.context(() => {
      // SMIT Card Reveal
      gsap.fromTo(smitCardRef.current, 
        { y: 100, opacity: 0, rotate: -10 },
        {
          y: 0, opacity: 1, rotate: 0,
          scrollTrigger: {
            trigger: smitCardRef.current,
            containerAnimation: tween,
            start: "left center",
            toggleActions: "play none none reverse",
          }
        }
      );

      // DPS Card Reveal
      gsap.fromTo(dpsCardRef.current, 
        { y: 100, opacity: 0, rotate: 10 },
        {
          y: 0, opacity: 1, rotate: 0,
          scrollTrigger: {
            trigger: dpsCardRef.current,
            containerAnimation: tween,
            start: "left center",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [tween]);

  return (
    <section ref={containerRef} className="relative w-[150vw] h-full flex items-center justify-evenly shrink-0 z-10 pointer-events-auto px-12">
      
      {/* Floating Island Geometry Placeholder */}
      <div className="absolute bottom-20 left-1/4 right-1/4 h-32 bg-deep-teal/40 rounded-[100%] blur-3xl -z-10" />

      {/* SMIT Book Pickup */}
      <div ref={smitCardRef} className="w-80 p-6 bg-charcoal/80 backdrop-blur-md rounded-2xl border border-cream-paper/20 shadow-2xl">
        <div className="w-12 h-12 bg-afternoon-gold rounded-lg mb-4 flex items-center justify-center text-charcoal font-bold text-2xl">📘</div>
        <h3 className="font-display text-2xl text-cream-paper mb-2">SMIT</h3>
        <p className="font-mono text-sm text-cream-paper/70">
          Sikkim Manipal Institute of Technology<br />
          BBA, Marketing & Finance (2021–2025)
        </p>
      </div>

      {/* DPS Book Pickup */}
      <div ref={dpsCardRef} className="w-80 p-6 bg-charcoal/80 backdrop-blur-md rounded-2xl border border-cream-paper/20 shadow-2xl mt-48">
        <div className="w-12 h-12 bg-mint-highlight rounded-lg mb-4 flex items-center justify-center text-charcoal font-bold text-2xl">📗</div>
        <h3 className="font-display text-2xl text-cream-paper mb-2">DPS Siliguri</h3>
        <p className="font-mono text-sm text-cream-paper/70">
          Higher Secondary<br />
          (2019–2021)
        </p>
      </div>

    </section>
  );
}
