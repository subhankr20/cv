import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useScrollTween } from "../scroll/ScrollContext";

export default function BiomeFour() {
  const containerRef = useRef<HTMLDivElement>(null);
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
      <div className="w-full max-w-4xl p-12 bg-midnight-ink/80 border border-mint-highlight/30 rounded-lg backdrop-blur-md relative overflow-hidden">
        {/* Cyberpunk Code Rain Placeholder */}
        <div className="absolute inset-0 opacity-10 font-mono text-xs text-mint-highlight whitespace-pre overflow-hidden flex flex-col justify-center select-none pointer-events-none">
          {Array.from({length: 20}).map((_, i) => (
            <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
              01010101 01101011 01100101 01111001 01110111 01101111 01110010 01100100
            </div>
          ))}
        </div>

        <h2 className="font-display text-4xl text-mint-highlight mb-4 relative z-10">My Digital.io</h2>
        <h3 className="font-sans text-xl text-cream-paper mb-8 relative z-10">AI Content & Copywriter • Mar–May 2024</h3>
        
        <p ref={textRef} className="font-mono text-2xl text-cream-paper leading-relaxed relative z-10">
          "Keyword-density-optimized copy with high CTR."
        </p>
      </div>
    </section>
  );
}
