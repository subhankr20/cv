import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useScrollTween } from "../scroll/ScrollContext";
import TiltCard from "../ui/TiltCard";

export default function BiomeFour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const tween = useScrollTween();

  useEffect(() => {
    if (!tween || !containerRef.current || !textRef.current) return;

    // Typewriter effect setup
    const text = textRef.current;
    const chars = text.innerText.split("");
    text.innerText = "";
    
    chars.forEach(char => {
      const span = document.createElement("span");
      span.innerText = char;
      span.style.opacity = "0";
      text.appendChild(span);
    });

    const ctx = gsap.context(() => {
      gsap.to(text.children, {
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          containerAnimation: tween,
          start: "left center",
          toggleActions: "play none none none"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [tween]);

  return (
    <section ref={containerRef} className="relative w-[150vw] h-full flex items-center justify-center shrink-0 z-10 pointer-events-auto px-20">
      <TiltCard ref={cardRef} className="relative z-10 w-full max-w-xl bg-charcoal/90 backdrop-blur-xl border border-mint-highlight/20 p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,255,200,0.15)]">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-mint-highlight rounded-lg flex items-center justify-center text-charcoal font-bold text-2xl">M</div>
          <h2 className="font-display text-4xl text-cream-paper">MyDigital.io</h2>
        </div>
        <h3 className="font-sans text-xl text-cream-paper mb-8">AI Content & Copywriter • Mar–May 2024</h3>
        
        <p ref={textRef} className="font-mono text-2xl text-cream-paper leading-relaxed mb-8">
          "Keyword-density-optimized copy with high CTR."
        </p>

        <div className="grid grid-cols-2 gap-4">
          {["Performance", "Search", "Optimization", "Growth"].map((tag) => (
            <div key={tag} className="px-4 py-3 bg-mint-highlight/5 border border-mint-highlight/20 rounded-xl font-mono text-xs text-mint-highlight uppercase tracking-wider text-center">
              {tag}
            </div>
          ))}
        </div>
      </TiltCard>
    </section>
  );
}
