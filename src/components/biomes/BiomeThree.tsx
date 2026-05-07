import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useScrollTween } from "../scroll/ScrollContext";

export default function BiomeThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const door1Ref = useRef<HTMLDivElement>(null);
  const door2Ref = useRef<HTMLDivElement>(null);
  const door3Ref = useRef<HTMLDivElement>(null);
  const tween = useScrollTween();

  useEffect(() => {
    if (!tween || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const createCounter = (triggerRef: React.RefObject<HTMLDivElement>, targetValue: number, suffix: string = "") => {
        const counterEl = triggerRef.current?.querySelector('.counter-value');
        if (!counterEl) return;
        
        gsap.to(counterEl, {
          innerHTML: targetValue,
          duration: 1,
          snap: { innerHTML: 1 },
          onUpdate: function() {
            counterEl.innerHTML = Math.round(Number(this.targets()[0].innerHTML)) + suffix;
          },
          scrollTrigger: {
            trigger: triggerRef.current,
            containerAnimation: tween,
            start: "left 70%",
            toggleActions: "play none none reverse"
          }
        });
      };

      createCounter(door1Ref, 30, "/day");
      createCounter(door2Ref, 20, "%");
      createCounter(door3Ref, 300, "+");

    }, containerRef);

    return () => ctx.revert();
  }, [tween]);

  return (
    <section ref={containerRef} className="relative w-[200vw] h-full flex flex-col items-center justify-center shrink-0 z-10 pointer-events-auto">
      <div className="absolute top-1/4 w-full text-center">
        <h2 className="font-display text-4xl text-afternoon-gold mb-2">Zeomax R.O. Systems</h2>
        <p className="font-mono text-cream-paper/70">Marketing Associate • May 2024 – Dec 2025</p>
      </div>

      <div className="flex gap-32 mt-32">
        {[
          { ref: door1Ref, label: "Presentations" },
          { ref: door2Ref, label: "Sales Increase" },
          { ref: door3Ref, label: "Interactions" }
        ].map((door, i) => (
          <div key={i} ref={door.ref} className="group relative w-64 h-96 bg-charcoal border-4 border-deep-teal rounded-t-xl flex items-center justify-center overflow-hidden shadow-2xl">
            {/* Door front sprite that "opens" on scroll */}
            <div className="absolute inset-0 z-30 transition-transform duration-700 group-hover:-translate-x-full group-hover:opacity-0 origin-left">
               <img src={`${import.meta.env.BASE_URL}assets/door.png`} className="w-full h-full object-cover" alt="Door" />
            </div>
            
            <div className="text-center z-10">
              <div className="counter-value font-mono text-5xl text-mint-highlight font-bold mb-4">0</div>
              <div className="text-cream-paper uppercase tracking-wider text-sm font-bold">{door.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
